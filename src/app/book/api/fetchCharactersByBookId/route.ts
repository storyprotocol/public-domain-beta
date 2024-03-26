import { connectDB } from "../utils";

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
    const db = await connectDB();
    try {
        const result = await db?.all(`select * from character where belongs_to = '${id}'`, []);
        db?.close();
        return Response.json({ data: result });
    } catch (err) {
        return Response.json({ data: err })
    }
}