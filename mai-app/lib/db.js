import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    // Isso aqui substitui a necessidade do arquivo 'global-bundle.pem'
    // Ele diz: "Use criptografia SSL, mas confie na AWS sem pedir o crachá dela"
    rejectUnauthorized: false, 
  },
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