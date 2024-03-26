import { StoryClient } from '@story-protocol/core-sdk'
import { http } from 'viem';
export default async function registerRootIpAsset(
    tokenId,
    account,
    contractAddress,
    ipName,
    uri
) {
    try {
        if (
            !account
            && !contractAddress
            && !tokenId
            && !ipName
        ) return 'wrong params with registerRootIp';
        console.log(`Start register root ipa at: ${new Date().toLocaleString()}`);
        const RPC_PROVIDER_URL = 'https://rpc.ankr.com/eth_sepolia';
        const config = {
            account,
            transport: http(RPC_PROVIDER_URL),
        }
        const storyClient = StoryClient.newClient(config);
        const response = await storyClient.ipAsset.registerRootIp({
            policyId: 0,
            tokenContractAddress: contractAddress,
            tokenId: tokenId,
            ipName,
            uri,
            txOptions: {
                waitForTransaction: true
            }
        })
        console.log('IP Asset registered: ', response);
        console.log(`End At: ${new Date().toLocaleString()}`);
        console.log('TokenId: ', tokenId);
        return response
    } catch (error) {
        console.log(error)
    }
}