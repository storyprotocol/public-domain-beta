import { deleteTable, connectDB } from './utils';
import { DB_TABLE_NAME, DB_PATH } from './constants';
async function deleteTableByName(tableName) {
    try {
        const DB = await connectDB(DB_PATH)
        deleteTable(DB, tableName);
        DB.close();
        console.log(`Table ${tableName} droped!`)
    }
    catch (err) {
        console.log(err)
    }
}
deleteTableByName(DB_TABLE_NAME.BOOK);