> *In memory of a name, set in a place that does not erode —*
> *and in its shadow, the promise of a tree.*

# EcoMemory

Most remembrances are temporary by accident. A stone weathers. A guestbook closes. A tribute page survives exactly as long as the card on file keeps paying the host, and not a month longer. EcoMemory was built the other way around: the inscription is the permanent thing, and what fades is only the paper you print to point at it.

A person is recorded once. A name, two dates, a few sentences. The recording costs a dime. After that the entry answers to the Arc chain rather than to whoever happens to run the site this year — and anyone who later stops to remember can leave a small coin, half of which goes on to put a tree in the ground.

## The inscription

The thing engraved is a `Memorial` struct, written a single time when you call `mint(name, birthDate, deathDate, message, beneficiary)`. It holds:

- the **name** being kept,
- a **birthDate** and a **deathDate**, stored as free text — so a year alone, or a season, or "spring 1961" reads as cleanly as an exact day,
- a **message**, capped at 512 characters by the contract,
- the **beneficiary** address, which will receive the remembrance half of every gift that follows,
- and **createdAt**, the moment the block accepted it.

The carving costs `MINT_PRICE`, set to `100_000` — that is 0.10 USDC at six decimals, no more. In exchange the contract issues one ERC-721 token (collection *EcoMemory*, symbol `ECOMEM`). Its `tokenURI` is assembled inside the contract as base64-encoded JSON: the name, the dates, the message, and the donation tally are all folded into the token itself. No off-chain file is pinned, so there is no off-chain file to misplace. The record and the token are one object.

## How a memory is kept

Every entry is given its own address on the site, `/memorial/{tokenId}`, and that page draws a QR code in the browser. The code is not the memorial. It is a doorway to it — printable onto a card, set beside a photograph, tucked into a folded note. Whoever scans it lands on the page and reads what was written, drawn back through `getMemorial(tokenId)` exactly as the contract holds it.

The page cannot be quietly rewritten or pulled down by anyone — not by the author, not by us. The name, the dates, the words, and the running `totalDonations` are returned from the place they were stored and nowhere else. A website can fail; the inscription survives the website that displays it.

A small counter, `totalMemorials`, keeps the order in which names were added, so the very first entry stays the first and the latest knows where it falls. Nothing about an existing memorial is editable after the mint — there is no function in the contract that reaches back to change a name once it is set. What was written is what remains.

## Where a donation goes

A visitor who wishes to give calls `donate(tokenId, amount)`. The contract refuses anything below `MIN_DONATION` (0.05 USDC) or above `MAX_DONATION` (0.10 USDC) — the size of a coin, deliberately, not a fundraiser. The default the page offers is seven cents. At the instant the gift arrives it is divided by a fraction fixed in code, `TREE_FUND_BPS = 5000` of `BPS_MAX = 10000`:

- half is sent to the **beneficiary** named in the inscription,
- half is sent to the **treeFundRecipient**, the address that carries the gift toward a planting.

Nothing is pooled and nothing waits. Two transfers leave inside the one call, the memorial's `totalDonations` is raised by the full amount, and a `Donation` event is recorded so the giving can be tallied afterward. The donor's coins never come to rest inside the contract — there is no balance there to guard, and no custodian to extend trust to.

> *On what is here, and what is only hoped for:* the splitting of each gift, the QR doorway, and the permanent inscription are all built and working today. A quieter idea — donations that arrive on their own as a page is visited across a year — is something we would like to add, not something that runs now. Each gift today is made by a hand, on purpose, one at a time. There is no autonomous agent behind this and no machine-payment layer.

## On permanence

The whole gesture rests on a number staying small. Half of a seven-cent gift is three and a half cents; the planting share of a nickel is just over two. A memory page is meant to gather thousands of those across years — one coin, then another, each one cut in two before it lands anywhere. That only holds together on a settlement layer where moving the money costs a sliver of the coin itself. Where one transfer can swallow a whole dime, sending two of them out of a nickel is absurd, and the second coin simply never gets left.

Arc settles in USDC directly — the same dollar the gift is priced in. The giver is never sent to hold a separate fuel token, never asked to guess a price, never made to watch their five cents drift in worth between the tap and the confirmation. Five cents in is five cents counted, halved without rounding away the gesture, and delivered to two hands at once. That is the single condition under which a sub-dime gift, split two ways, is worth making at all — and lacking it, EcoMemory would be a tidy sketch of an idea that could never cover its own postage.

What little authority exists stays narrow: the owner may redirect the planting share (`setTreeFundRecipient`) and may sweep the gathered mint fees (`withdraw`). Neither touch can reach a donor's gift, which was never the contract's to hold.

---

*Arc testnet · chain 5042002 · settled in USDC (`0x3600000000000000000000000000000000000000`, six decimals, also the gas).*

*Engraved at `0x8B1279f0ad677a1e64596234aD6253B636528e56` — verified: https://testnet.arcscan.app/address/0x8B1279f0ad677a1e64596234aD6253B636528e56*

*Standing at https://ecomemory-arc.vercel.app — kept by Artur Lipinski.*
