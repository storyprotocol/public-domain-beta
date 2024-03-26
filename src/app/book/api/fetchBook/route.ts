import { connectDB } from "../utils";

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