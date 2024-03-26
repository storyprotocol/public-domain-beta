import { connectPostgres } from "../utils";
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
    const db = await connectPostgres();
    if (db) {
        try {
            const { rows } = await db.query<Book>({
                text: 'select * from book'
            });
            db.end();
            return Response.json({ data: rows });
        } catch (err) {
            return Response.json({ data: err })
        }
    }
    return Response.json({ data: [] })
}