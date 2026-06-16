import { expect } from 'chai';
import hre from 'hardhat';
import { parseUnits, zeroAddress } from 'viem';

describe('EcoMemory', () => {
  async function deployFixture() {
    const [owner, user, beneficiary, treeFund] = await hre.viem.getWalletClients();
    const publicClient = await hre.viem.getPublicClient();

    // Deploy a mock ERC20 with 6 decimals to simulate USDC.
    const usdc: any = await hre.viem.deployContract('MockUSDC', []);

    // Fund user with USDC.
    await usdc.write.mint([user.account.address, parseUnits('100', 6)]);

    const ecoMemory: any = await hre.viem.deployContract('EcoMemory', [
      usdc.address,
      treeFund.account.address,
      owner.account.address,
    ]);

    return { ecoMemory, usdc, owner, user, beneficiary, treeFund, publicClient };
  }

  it('should deploy with correct constants', async () => {
    const { ecoMemory, usdc } = await deployFixture();
    expect((await ecoMemory.read.paymentToken()).toLowerCase()).to.equal(usdc.address.toLowerCase());
    expect(await ecoMemory.read.MINT_PRICE()).to.equal(BigInt(100_000)); // 0.10 USDC
    expect(await ecoMemory.read.MIN_DONATION()).to.equal(BigInt(50_000)); // 0.05 USDC
    expect(await ecoMemory.read.MAX_DONATION()).to.equal(BigInt(100_000)); // 0.10 USDC
  });

  it('should mint a memorial for 0.10 USDC', async () => {
    const { ecoMemory, usdc, user, beneficiary } = await deployFixture();
    const publicClient = await hre.viem.getPublicClient();

    const price = (await ecoMemory.read.MINT_PRICE()) as bigint;
    await usdc.write.approve([ecoMemory.address, price], { account: user.account });

    const hash = await ecoMemory.write.mint(
      ['Jane Doe', '1990-01-01', '2024-05-20', 'Forever in our hearts.', beneficiary.account.address],
      { account: user.account }
    );

    await publicClient.waitForTransactionReceipt({ hash });

    const memorial = (await ecoMemory.read.getMemorial([BigInt(0)])) as [
      string,
      string,
      string,
      string,
      string,
      bigint,
      bigint,
      string,
    ];
    expect(memorial[0]).to.equal('Jane Doe');
    expect(memorial[4].toLowerCase()).to.equal(beneficiary.account.address.toLowerCase());
    expect(await ecoMemory.read.totalMemorials()).to.equal(BigInt(1));
    expect((await ecoMemory.read.ownerOf([BigInt(0)])).toLowerCase()).to.equal(user.account.address.toLowerCase());
  });

  it('should reject mint with zero beneficiary', async () => {
    const { ecoMemory, usdc, user } = await deployFixture();
    const price = (await ecoMemory.read.MINT_PRICE()) as bigint;
    await usdc.write.approve([ecoMemory.address, price], { account: user.account });

    await expect(
      ecoMemory.write.mint(['Jane Doe', '1990-01-01', '2024-05-20', 'Message', zeroAddress], {
        account: user.account,
      })
    ).to.be.rejected;
  });

  it('should donate and split between beneficiary and tree fund', async () => {
    const { ecoMemory, usdc, user, beneficiary, treeFund } = await deployFixture();
    const publicClient = await hre.viem.getPublicClient();

    const price = (await ecoMemory.read.MINT_PRICE()) as bigint;
    await usdc.write.approve([ecoMemory.address, price + parseUnits('1', 6)], { account: user.account });

    await ecoMemory.write.mint(
      ['Jane Doe', '1990-01-01', '2024-05-20', 'Forever in our hearts.', beneficiary.account.address],
      { account: user.account }
    );

    const donationAmount = parseUnits('0.07', 6);
    await usdc.write.approve([ecoMemory.address, donationAmount], { account: user.account });

    const hash = await ecoMemory.write.donate([BigInt(0), donationAmount], { account: user.account });
    await publicClient.waitForTransactionReceipt({ hash });

    const memorial = (await ecoMemory.read.getMemorial([BigInt(0)])) as [
      string,
      string,
      string,
      string,
      string,
      bigint,
      bigint,
      string,
    ];
    expect(memorial[5]).to.equal(donationAmount);

    const beneficiaryBalance = (await usdc.read.balanceOf([beneficiary.account.address])) as bigint;
    const treeBalance = (await usdc.read.balanceOf([treeFund.account.address])) as bigint;
    const expectedMemorialShare = donationAmount / BigInt(2);
    const expectedTreeShare = donationAmount - expectedMemorialShare;
    expect(beneficiaryBalance).to.equal(expectedMemorialShare);
    expect(treeBalance).to.equal(expectedTreeShare);
  });

  it('should reject donations outside of the allowed range', async () => {
    const { ecoMemory, usdc, user, beneficiary } = await deployFixture();
    const price = (await ecoMemory.read.MINT_PRICE()) as bigint;
    await usdc.write.approve([ecoMemory.address, price], { account: user.account });
    await ecoMemory.write.mint(
      ['Jane Doe', '1990-01-01', '2024-05-20', 'Message', beneficiary.account.address],
      { account: user.account }
    );

    await usdc.write.approve([ecoMemory.address, parseUnits('0.04', 6)], { account: user.account });
    await expect(ecoMemory.write.donate([BigInt(0), parseUnits('0.04', 6)], { account: user.account })).to.be.rejected;

    await usdc.write.approve([ecoMemory.address, parseUnits('0.11', 6)], { account: user.account });
    await expect(ecoMemory.write.donate([BigInt(0), parseUnits('0.11', 6)], { account: user.account })).to.be.rejected;
  });

  it('should allow owner to withdraw mint payments', async () => {
    const { ecoMemory, usdc, owner, user, beneficiary } = await deployFixture();
    const publicClient = await hre.viem.getPublicClient();

    const price = (await ecoMemory.read.MINT_PRICE()) as bigint;
    await usdc.write.approve([ecoMemory.address, price], { account: user.account });
    await ecoMemory.write.mint(
      ['Jane Doe', '1990-01-01', '2024-05-20', 'Message', beneficiary.account.address],
      { account: user.account }
    );

    const ownerBalanceBefore = (await usdc.read.balanceOf([owner.account.address])) as bigint;
    const hash = await ecoMemory.write.withdraw({ account: owner.account });
    await publicClient.waitForTransactionReceipt({ hash });
    const ownerBalanceAfter = (await usdc.read.balanceOf([owner.account.address])) as bigint;

    expect(ownerBalanceAfter - ownerBalanceBefore).to.equal(price);
  });

  it('should emit MemorialMinted event', async () => {
    const { ecoMemory, usdc, user, beneficiary } = await deployFixture();
    const publicClient = await hre.viem.getPublicClient();
    const price = (await ecoMemory.read.MINT_PRICE()) as bigint;
    await usdc.write.approve([ecoMemory.address, price], { account: user.account });

    const hash = await ecoMemory.write.mint(
      ['Jane Doe', '1990-01-01', '2024-05-20', 'Forever.', beneficiary.account.address],
      { account: user.account }
    );
    const receipt = await publicClient.waitForTransactionReceipt({ hash });
    const logs = await publicClient.getLogs({
      address: ecoMemory.address,
      event: {
        type: 'event',
        name: 'MemorialMinted',
        inputs: [
          { indexed: true, name: 'tokenId', type: 'uint256' },
          { indexed: true, name: 'owner', type: 'address' },
          { indexed: false, name: 'name', type: 'string' },
          { indexed: false, name: 'price', type: 'uint256' },
        ],
      },
      fromBlock: receipt.blockNumber,
      toBlock: receipt.blockNumber,
    });
    expect(logs.length).to.equal(1);
    expect(logs[0].args.tokenId).to.equal(BigInt(0));
    expect(logs[0].args.owner?.toLowerCase()).to.equal(user.account.address.toLowerCase());
  });
});
