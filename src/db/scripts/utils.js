import { open } from 'sqlite'
import { verbose } from "sqlite3";

export async function createTable(db, createScript) {
    const result = await db.run(createScript);
    console.log('Running result: ', result);
}

export async function deleteTable(db, tableName) {
    const result = await db.run(`DROP TABLE ${tableName}`);
    console.log('Running result: ', result);
}

export async function connectDB(DBPath) {
    const sqlite3 = verbose();
    try {
        const DB = await open({
            filename: DBPath,
            driver: sqlite3.Database
        });
        console.log(`DB ${DBPath} connected!`);
        return DB;
    }
    catch (err) {
        console.log(err)
    }
}