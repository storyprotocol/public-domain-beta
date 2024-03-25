import { open } from 'sqlite'
import { verbose } from "sqlite3";
export async function connectDB() {
    const sqlite3 = verbose();
    let DB = null;
    try {
        DB = await open({
            filename: 'src/db/public_10book.db',
            driver: sqlite3.Database
        });
        console.log('DB connection is ready');
    }
    catch (err) {
        console.log(err)
    }
    return DB;
}