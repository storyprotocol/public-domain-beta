import { createPool } from '@vercel/postgres';

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