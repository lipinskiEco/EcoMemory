// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import { ERC721 } from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import { SafeERC20 } from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

/**
 * @title EcoMemory
 * @notice Memorial NFTs minted for USDC. Visitors can leave micro-donations
 *         that are split between the memorial fund and a tree-planting fund.
 */
contract EcoMemory is ERC721, Ownable {
    using SafeERC20 for IERC20;

    /// @notice ERC20 used for payments (USDC on ARC Testnet).
    IERC20 public immutable paymentToken;

    /// @notice Price to mint a single memorial NFT. 0.10 USDC with 6 decimals.
    uint256 public constant MINT_PRICE = 100_000; // 0.10 USDC (6 decimals)

    /// @notice Minimum donation amount. 0.05 USDC.
    uint256 public constant MIN_DONATION = 50_000; // 0.05 USDC

    /// @notice Maximum donation amount. 0.10 USDC.
    uint256 public constant MAX_DONATION = 100_000; // 0.10 USDC

    /// @notice Share directed to the tree-planting fund. 50% expressed in basis points.
    uint16 public constant TREE_FUND_BPS = 5000;

    /// @notice Basis points denominator.
    uint16 public constant BPS_MAX = 10000;

    /// @notice Address that receives the tree-planting share.
    address public treeFundRecipient;

    /// @notice Total number of memorials minted.
    uint256 public totalMemorials;

    struct Memorial {
        string name;
        string birthDate;
        string deathDate;
        string message;
        address beneficiary;
        uint256 totalDonations;
        uint256 createdAt;
    }

    /// @notice tokenId => memorial data.
    mapping(uint256 => Memorial) public memorials;

    /// @notice Event emitted when a memorial is minted.
    event MemorialMinted(
        uint256 indexed tokenId,
        address indexed owner,
        string name,
        uint256 price
    );

    /// @notice Event emitted when a donation is made.
    event Donation(
        uint256 indexed tokenId,
        address indexed donor,
        uint256 amount,
        uint256 memorialShare,
        uint256 treeShare
    );

    /// @notice Event emitted when a tree-fund recipient is updated.
    event TreeFundRecipientUpdated(address indexed newRecipient);

    /**
     * @param _paymentToken ERC20 token accepted for payments.
     * @param _treeFundRecipient Address receiving the tree-planting share.
     * @param _owner Contract owner.
     */
    constructor(
        address _paymentToken,
        address _treeFundRecipient,
        address _owner
    ) ERC721("EcoMemory", "ECOMEM") Ownable(_owner) {
        require(_paymentToken != address(0), "Invalid payment token");
        require(_treeFundRecipient != address(0), "Invalid tree fund recipient");
        paymentToken = IERC20(_paymentToken);
        treeFundRecipient = _treeFundRecipient;
    }

    /**
     * @notice Mint a new memorial NFT.
     * @param _name Name of the memorialized person or pet.
     * @param _birthDate Birth date as a string (e.g. 1990-01-01).
     * @param _deathDate Death date as a string (e.g. 2024-05-20).
     * @param _message Short message for the memorial page.
     * @param _beneficiary Address that receives future donations for this memorial.
     */
    function mint(
        string calldata _name,
        string calldata _birthDate,
        string calldata _deathDate,
        string calldata _message,
        address _beneficiary
    ) external returns (uint256 tokenId) {
        require(bytes(_name).length > 0, "Name required");
        require(bytes(_message).length > 0, "Message required");
        require(bytes(_message).length <= 512, "Message too long");
        require(_beneficiary != address(0), "Invalid beneficiary");

        paymentToken.safeTransferFrom(msg.sender, address(this), MINT_PRICE);

        tokenId = totalMemorials;
        totalMemorials++;

        memorials[tokenId] = Memorial({
            name: _name,
            birthDate: _birthDate,
            deathDate: _deathDate,
            message: _message,
            beneficiary: _beneficiary,
            totalDonations: 0,
            createdAt: block.timestamp
        });

        _safeMint(msg.sender, tokenId);

        emit MemorialMinted(tokenId, msg.sender, _name, MINT_PRICE);
    }

    /**
     * @notice Donate to a memorial. Amount is split between the beneficiary
     *         and the tree-planting fund.
     * @param _tokenId Memorial to donate to.
     * @param _amount USDC amount to donate.
     */
    function donate(uint256 _tokenId, uint256 _amount) external {
        require(_ownerOf(_tokenId) != address(0), "Memorial does not exist");
        require(_amount >= MIN_DONATION && _amount <= MAX_DONATION, "Invalid donation amount");

        Memorial storage memorial = memorials[_tokenId];
        uint256 treeShare = (_amount * TREE_FUND_BPS) / BPS_MAX;
        uint256 memorialShare = _amount - treeShare;

        paymentToken.safeTransferFrom(msg.sender, memorial.beneficiary, memorialShare);
        paymentToken.safeTransferFrom(msg.sender, treeFundRecipient, treeShare);

        memorial.totalDonations += _amount;

        emit Donation(_tokenId, msg.sender, _amount, memorialShare, treeShare);
    }

    /**
     * @notice Update the address that receives the tree-planting share.
     */
    function setTreeFundRecipient(address _newRecipient) external onlyOwner {
        require(_newRecipient != address(0), "Invalid recipient");
        treeFundRecipient = _newRecipient;
        emit TreeFundRecipientUpdated(_newRecipient);
    }

    /**
     * @notice Withdraw accumulated mint payments from the contract.
     */
    function withdraw() external onlyOwner {
        uint256 balance = paymentToken.balanceOf(address(this));
        require(balance > 0, "No balance");
        paymentToken.safeTransfer(owner(), balance);
    }

    /**
     * @notice Get full memorial data for the frontend.
     */
    function getMemorial(
        uint256 _tokenId
    )
        external
        view
        returns (
            string memory name,
            string memory birthDate,
            string memory deathDate,
            string memory message,
            address beneficiary,
            uint256 totalDonations,
            uint256 createdAt,
            address owner
        )
    {
        Memorial memory m = memorials[_tokenId];
        owner = _ownerOf(_tokenId);
        require(owner != address(0), "Memorial does not exist");
        return (
            m.name,
            m.birthDate,
            m.deathDate,
            m.message,
            m.beneficiary,
            m.totalDonations,
            m.createdAt,
            owner
        );
    }

    /**
     * @notice Build a tokenURI that returns on-chain JSON metadata.
     */
    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        _requireOwned(tokenId);
        Memorial memory m = memorials[tokenId];

        string memory json = string(
            abi.encodePacked(
                '{"name":"EcoMemory #', uint256ToString(tokenId), '",',
                '"description":"On-chain memorial for ', escapeJson(m.name), '",',
                '"attributes":[',
                '{"trait_type":"Name","value":"', escapeJson(m.name), '"},',
                '{"trait_type":"Birth","value":"', escapeJson(m.birthDate), '"},',
                '{"trait_type":"Death","value":"', escapeJson(m.deathDate), '"},',
                '{"trait_type":"Donations","display_type":"number","value":', uint256ToString(m.totalDonations), '}],',
                '"message":"', escapeJson(m.message), '"}'
            )
        );

        return string(
            abi.encodePacked(
                "data:application/json;base64,",
                base64Encode(bytes(json))
            )
        );
    }

    // ------------------------------------------------------------------
    // Helpers
    // ------------------------------------------------------------------

    function uint256ToString(uint256 value) internal pure returns (string memory) {
        if (value == 0) return "0";
        uint256 temp = value;
        uint256 digits;
        while (temp != 0) {
            digits++;
            temp /= 10;
        }
        bytes memory buffer = new bytes(digits);
        while (value != 0) {
            digits--;
            buffer[digits] = bytes1(uint8(48 + (value % 10)));
            value /= 10;
        }
        return string(buffer);
    }

    function escapeJson(string memory str) internal pure returns (string memory) {
        bytes memory b = bytes(str);
        bytes memory result = new bytes(b.length * 2);
        uint256 index;
        for (uint256 i = 0; i < b.length; i++) {
            bytes1 char = b[i];
            if (char == '"') {
                result[index++] = "\\";
                result[index++] = '"';
            } else if (char == "\\") {
                result[index++] = "\\";
                result[index++] = "\\";
            } else if (uint8(char) == 0x08) {
                result[index++] = "\\";
                result[index++] = "b";
            } else if (uint8(char) == 0x0C) {
                result[index++] = "\\";
                result[index++] = "f";
            } else if (uint8(char) == 0x0A) {
                result[index++] = "\\";
                result[index++] = "n";
            } else if (uint8(char) == 0x0D) {
                result[index++] = "\\";
                result[index++] = "r";
            } else if (uint8(char) == 0x09) {
                result[index++] = "\\";
                result[index++] = "t";
            } else {
                result[index++] = char;
            }
        }
        bytes memory trimmed = new bytes(index);
        for (uint256 i = 0; i < index; i++) {
            trimmed[i] = result[i];
        }
        return string(trimmed);
    }

    function base64Encode(bytes memory data) internal pure returns (string memory) {
        string memory TABLE = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
        uint256 len = data.length;
        if (len == 0) return "";

        uint256 encodedLen = 4 * ((len + 2) / 3);
        bytes memory result = new bytes(encodedLen + 32);

        bytes memory table = bytes(TABLE);

        assembly ("memory-safe") {
            let tablePtr := add(table, 1)
            let resultPtr := add(result, 32)

            for {
                let i := 0
            } lt(i, len) {

            } {
                i := add(i, 3)
                let input := and(mload(add(data, i)), 0xffffff)

                let out := mload(add(tablePtr, and(shr(18, input), 0x3C)))
                out := shl(8, out)
                out := add(out, and(mload(add(tablePtr, and(shr(12, input), 0x3C))), 0xFF))
                out := shl(8, out)
                out := add(out, and(mload(add(tablePtr, and(shr(6, input), 0x3C))), 0xFF))
                out := shl(8, out)
                out := add(out, and(mload(add(tablePtr, and(input, 0x3C))), 0xFF))
                out := shl(224, out)

                mstore(resultPtr, out)

                resultPtr := add(resultPtr, 4)
            }

            switch mod(len, 3)
            case 1 {
                mstore(sub(resultPtr, 2), shl(240, 0x3d3d))
            }
            case 2 {
                mstore(sub(resultPtr, 1), shl(248, 0x3d))
            }
        }

        return string(result);
    }
}
