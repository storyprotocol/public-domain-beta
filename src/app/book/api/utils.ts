import { open } from 'sqlite'
import { verbose } from "sqlite3";

import { createPool } from '@vercel/postgres';
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

export async function connectPostgres() {
    const db = createPool({
        connectionString: `postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:5432/${process.env.POSTGRES_DATABASE}`,
    });
    try {
        await db.connect();
        return db;
    } catch (error) {
        console.error('Error executing query', error);
    }
}