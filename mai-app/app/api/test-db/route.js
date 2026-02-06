import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET() {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT NOW()'); // Pede a hora pro banco
    client.release(); // Libera a conexão
    
    return NextResponse.json({ 
      status: 'Sucesso!', 
      hora_no_banco: result.rows[0].now 
    });
  } catch (error) {
    return NextResponse.json({ 
      status: 'Erro', 
      erro: error.message 
    }, { status: 500 });
  }
}
