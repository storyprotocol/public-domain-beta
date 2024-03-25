
import cuid from 'cuid';
import { connectDB } from "./utils";
import { DB_PATH, DB_TABLE_NAME } from './constants';

async function readCharacterTable(DB, bookId) {
    const sql = `SELECT * FROM ${DB_TABLE_NAME.CHARACTER} where belongs_to = "${bookId}"`;
    const result = await DB.all(sql);
    result.forEach((row) => insertNewDB(DB, row));
}

async function insertNewDB(DB, row) {
    const result = await DB.run(`
        INSERT INTO ip_asset (
            id,
            name,
            source_from,
            source_id,
            ip_id,
            policies,
            licenses,
            image_url
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `, [
        cuid(),
        row.name || null,
        'character',
        row.id || null,
        row.nft_ip_id || null,
        null,
        null,
        row.image_url || null
    ]);
    console.log('Row: ', row);
    console.log('Insert result: ', result);
}

async function runProcess() {
    try {
        const DB = await connectDB(DB_PATH);
        const bookId = "7e02207e-f0e1-4eb7-acb2-cebd2fb868bd"; // need to change when you use it.
        readCharacterTable(DB, bookId);
    }
    catch (err) {
        console.log(err)
    }
}

runProcess();