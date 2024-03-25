import { open } from 'sqlite'
import { verbose } from "sqlite3";
export interface Book {
    id: string,
    title: string,
    publisher: string,
    authors: string,
    language: string,
    rights: string,
    issued_date: string,
    total_chapters: number,
    total_words: number,
    source_url: string,
    nft_ip_id: string,
    genre: string
}

const sqlite3 = verbose();

async function connectDB() {
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

export async function GET(request: Request) {
    const db = await connectDB();
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id');
    if (db) {
        try {
            const result = await db?.get(`select * from book where id = "${id}"`, []);
            db.close();
            return Response.json({ data: result });
        } catch (err) {
            return Response.json({ data: err })
        }
    }
    return Response.json({ data: [] })
}