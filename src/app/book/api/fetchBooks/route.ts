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
    genre: string,
    img_url: string
}


export async function GET() {
    const db = await connectDB();
    if (db) {
        try {
            const result: Book[] = await db?.all('select * from book', []);
            db.close();
            return Response.json({ data: result });
        } catch (err) {
            return Response.json({ data: err })
        }
    }
    return Response.json({ data: [] })
}