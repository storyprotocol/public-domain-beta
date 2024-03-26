import { connectPostgres } from "../utils";

export interface Chapter {
    id: string,
    belongs_to: string,
    chapter_num: number,
    chapter_name: string,
    content: string,
    nft_ip_id: string,
    image_url: string
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id');
    const db = await connectPostgres();
    if (db) {
        try {
            const { rows } = await db.query<Chapter>({
                text: 'select * from chapter where belongs_to = $1',
                values: [id]
            });
            db.end();
            return Response.json({ data: rows });
        } catch (err) {
            return Response.json({ data: err })
        }
    }
    return Response.json({ data: [] })
}