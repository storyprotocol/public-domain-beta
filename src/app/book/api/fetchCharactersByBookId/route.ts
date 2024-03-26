import { connectPostgres } from "../utils";

export interface Character {
    id: string,
    belongs_to: string,
    name: string,
    nft_ip_id: string,
    image_url: string
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id');
    const db = await connectPostgres();
    if (db) {
        try {
            const { rows } = await db.query<Character>({
                text: 'select * from character where belongs_to = $1',
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