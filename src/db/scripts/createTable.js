import {
    createBookScript,
    creatChapterScript,
    creatIpAssetScript,
    createCharacter
} from './createTableScript';
import { connectDB, createTable } from './utils';
import { DB_TABLE_NAME, DB_PATH } from './constants';

const tableScriptMapping = {
    [DB_TABLE_NAME.BOOK]: createBookScript,
    [DB_TABLE_NAME.CHAPTER]: creatChapterScript,
    [DB_TABLE_NAME.IP_ASSET]: creatIpAssetScript,
    [DB_TABLE_NAME.CHARACTER]: createCharacter
}

async function createTableByTableName(tableName) {
    try {
        const DB = await connectDB(DB_PATH)
        const sql = tableScriptMapping[tableName];
        createTable(DB, sql);
        DB.close();
        console.log(`Table ${tableName} Created!`);
    }
    catch (err) {
        console.log(err)
    }
}

createTableByTableName(DB_TABLE_NAME.BOOK)