import { privateKeyToAccount } from 'viem/accounts'
import series from 'async/series';
import { connectDB } from '../db/scripts/utils';
import mintNFT from './nft/mintNFT';
import registerRootIpAsset from './ipAsset/registerRootIpAsset';
import { DB_PATH, DB_TABLE_NAME } from '../db/scripts/constants';

async function mintNftAndRegisterIpa(ipName, nftImgUrl) {
    const WALLET_PRIVATE_KEY = "";
    const CONTRACT_ADDRESS = "0x7ee32b8B515dEE0Ba2F25f612A04a731eEc24F49"; // ERC721_CONTRACT_ADDRESS
    const account = privateKeyToAccount(WALLET_PRIVATE_KEY);
    const tokenId = await mintNFT(
        account,
        CONTRACT_ADDRESS,
        nftImgUrl
    );
    const {
        ipId
    } = await registerRootIpAsset(
        tokenId,
        account,
        CONTRACT_ADDRESS,
        ipName,
        nftImgUrl
    );
    return {
        tokenId,
        ipId
    };
}

async function registerIpAssetFromIpAssetDB(db, id, callback) {
    try {
        const sql = `SELECT * FROM ${DB_TABLE_NAME.IP_ASSET} WHERE id="${id}"`;
        console.log(sql);
        const ipAsset = await db.get(sql);
        console.log('Ip Asset: ', ipAsset);
        const { ipId, tokenId } = await mintNftAndRegisterIpa(ipAsset.name, ipAsset.image_url);
        const result = await db.run(`
            UPDATE ${ipAsset.source_from}
            SET nft_ip_id = '${ipId}'
            WHERE id = '${ipAsset.source_id}'`
        );
        console.log(`Table ${ipAsset.source_from} updated.`, result);
        const ipAssetUpdateResult = await db.run(`
            UPDATE ${DB_TABLE_NAME.IP_ASSET}
            SET ip_id = '${ipId}'
            WHERE id = '${ipAsset.id}'`
        );
        console.log(`Table ${DB_TABLE_NAME.IP_ASSET} updated.`, ipAssetUpdateResult);
        callback(null, {
            ipAsset,
            result,
            tokenId,
            ipAssetUpdateResult
        })
    } catch (err) {
        console.log(err)
    }
}

async function runProcess(tableName) {
    try {
        const DB = await connectDB(DB_PATH);
        const sql = `select * from ${DB_TABLE_NAME.IP_ASSET} where source_from = '${tableName}' and ip_id IS NULL`;
        const ipAssetsWithNullIpId = await DB.all(sql, []);
        console.log('ipAssetsWithNullIpId', ipAssetsWithNullIpId)
        if (ipAssetsWithNullIpId.length) {
            const promises = ipAssetsWithNullIpId.map((r) => function (callback) {
                registerIpAssetFromIpAssetDB(DB, r.id, callback);
            });
            series(promises).then(res => console.log(res)).catch(err => console.log(err))
        }
    } catch (err) {
        console.log(err);
    }
}

runProcess(DB_TABLE_NAME.BOOK); // DB_TABLE_NAME.CHARACTER