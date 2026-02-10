import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Usuário hard coded (para testes) REMOVER!
export const usuariosMock = [
  {
    id: 1,
    email: "admin",
    senha: "admin",
    nome: "Administrador",
    tipo: "ADMIN"
  }
];

export default pool;