import pool from '@/lib/db';

export async function GET() {
  try {
    const [rows] = await pool.query('SELECT 1 AS ok');
    return Response.json({
      connected: true,
      result: rows
    });
  } catch (error) {
    return Response.json(
      { connected: false, error: error.message },
      { status: 500 }
    );
  }
}
