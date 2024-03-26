# Public Domain Beta

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000/book](http://localhost:3000/book) with your browser to see the result.

## DB

We use the SQLite DB, you can install a DBeaver or a VSCode extension to view it.

## Run DB Script

You can run the `src/db/scripts` by using npm.

```bash
npm run script src/db/scripts/insertNewIpAssetFromOtherTable.js
```

You also can write your script to run, the `npm run script filePath` will run under the node env.

In the `src/db/scripts/insertNewIpAssetFromCharacterTable.js`, you need to fill in the `bookId` in the `runProcess` function from the book table to handle the characters one by one book.

## Mint NFT & Register Ip Asset

In the `src/chain`, there are scripts for minting NFT and registering NFT to IP Asset with the DB `ip_asset` table.

In the `mintNftAndRegisterIpa`, two things need to be filled in, then you can run the script.
```js
const WALLET_PRIVATE_KEY = ""; // wallet private key you used
const CONTRACT_ADDRESS = ""; // smart contract address you used
```
In this file the default `CONTRACT_ADDRESS` is `ERC721_CONTRACT_ADDRESS`.

When starting the `mintNftAndRegisterIpa` process, the rows queried will be processed as a queue item one by one by using `async.js/series`.