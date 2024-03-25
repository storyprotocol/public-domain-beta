import { open } from 'sqlite'
import { verbose } from "sqlite3";
const sqlite3 = verbose();

export interface Chapter {
    id: string,
    belongs_to: string,
    chapter_num: number,
    chapter_name: string,
    content: string,
    nft_ip_id: string
}

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
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id');
    const db = await connectDB();
    try {
        const result = await db?.all(`select * from chapter where belongs_to = '${id}'`, []);
        db?.close();
        return Response.json({ data: result });
    } catch (err) {
        return Response.json({ data: err })
    }
}