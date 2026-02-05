// lib/db.js
// Simula a tabela de usuários do banco de dados
export const usuariosMock = [
  {
    id: 1,
    nome: "Avaliador Padrão",
    email: "admin@mai.com",
    senha: "1234", // Na vida real, isso estaria criptografado (hash)
    tipo: "AVALIADOR"
  },
  {
    id: 2,
    nome: "Prefeitura de Aracaju",
    email: "inst@mai.com",
    senha: "abcd",
    tipo: "INSTITUICAO"
  }
];