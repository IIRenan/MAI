This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

You will need to install PostgreSQL, NodeJS, and jsonwebtoken
TODO ADICIONAR COMANDOS DEPOIS (Também tem que lembrar de remover o usuário admin)

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


# PostgreSQL

## Open PostgreSQL as admin
```bash
sudo -u postgres psql
```

## Configure the .env.local file
 In the file:
 DATABASE_URL=postgresql://user:password@localhost:5432/databasename
 user -> database username
 password -> database password
 databasename -> database name used by the app

## Create user and database (if needed)
 In the PostgreSQL console:
```bash
CREATE USER user WITH PASSWORD 'password';
# or
ALTER USER user WITH PASSWORD 'password';

CREATE DATABASE databasename;
```

 If you want the user to be an admin
```bash
GRANT ALL PRIVILEGES ON DATABASE databasename TO user;
```

These are the tables used for the history screen
```bash
psql -U postgres -d mai

CREATE TABLE levantamento_historico (
  id SERIAL PRIMARY KEY,
  local VARCHAR(150),
  avaliador VARCHAR(100),
  data TIMESTAMP DEFAULT NOW(),
  pontuacao_total NUMERIC,
  observacoes TEXT
);

CREATE TABLE criterios_historico (
  id SERIAL PRIMARY KEY,
  levantamento_historico NUMERIC REFERENCES levantamento_historico(id) ON DELETE CASCADE,
  nome VARCHAR(150),
  valor NUMERIC
);
```

## Check the app port
 The app uses port 8080. Make sure the port is open in the firewall or network.

## ️Test the database connection
psql postgresql://user:password@localhost:5432/databasename

## Run
To run the app with the public ip
```bash
npm run build
npm run start -- -H 0.0.0.0 -p 8080
```