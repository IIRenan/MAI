import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    // Isso aqui substitui a necessidade do arquivo 'global-bundle.pem'
    // Ele diz: "Use criptografia SSL, mas confie na AWS sem pedir o crachá dela"
    rejectUnauthorized: false, 
  },
});

export default pool;