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
    genre: string
}

export async function GET(request: Request) {
    const db = await connectPostgres();
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id');
    if (db) {
        try {
            const { rows } = await db.query<Book>({
                text: 'select * from book where id = $1',
                values: [id]
            });
            db.end();
            return Response.json({ data: rows[0] });
        } catch (err) {
            return Response.json({ data: err })
        }
    }
    return Response.json({ data: null })
}