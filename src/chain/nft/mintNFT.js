import { http, createWalletClient, createPublicClient } from 'viem'
import { sepolia } from 'viem/chains';

export default async function mintNFT(
    account,
    contractAddress,
    nftImgUrl
) {
    if (!account && !contractAddress && !nftImgUrl) return 'wrong params with mintNFT';
    const date = new Date().toLocaleString();
    console.log('Minting a new NFT..., start at', date);
    const publicClient = createPublicClient({
        chain: sepolia,
        transport: http()
    })
    const walletClient = createWalletClient({
        account,
        chain: sepolia,
        transport: http(),
    })
    const contractAbi = {
        inputs: [
            { internalType: 'address', name: 'to', type: 'address' },
            { internalType: 'string', name: 'customUri', type: 'string' }
        ],
        name: 'mint',
        outputs: [
            { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
    }

    // 3. Mint an NFT to your account
    const hash = await walletClient.writeContract({
        address: contractAddress,
        functionName: 'mint',
        args: [account.address, nftImgUrl],
        abi: [contractAbi]
    })

    const { logs } = await publicClient.waitForTransactionReceipt({
        hash: hash,
    });

    let tokenId
    if (logs[0].topics[3]) {
        tokenId = parseInt(logs[0].topics[3], 16);
    }

    console.log(`Minted NFT successful with hash: ${hash}`);
    console.log(`Minted NFT tokenId: ${tokenId}`);
    console.log(`End at: ${new Date().toLocaleString()}`)
    return String(tokenId);
}