// app/api/login/route.js
import { NextResponse } from 'next/server';
import { AuthService } from '@/lib/authService'; // O '@' aponta para a raiz do projeto

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, senha } = body;

    // Chama a Camada de Aplicação (AuthService)
    const resultado = await AuthService.login(email, senha);

    // Retorna 200 OK com o token
    return NextResponse.json(resultado, { status: 200 });

  } catch (error) {
    // Retorna 401 Unauthorized em caso de erro [cite: 104]
    return NextResponse.json(
      { error: error.message }, 
      { status: 401 }
    );
  }
}