// lib/authService.js
import jwt from 'jsonwebtoken';
import { usuariosMock } from './db';

const JWT_SECRET = 'minha-chave-secreta-super-segura'; // Em produção, usar process.env.JWT_SECRET

export class AuthService {
  
  static async login(email, senha) {
    // 1. Busca no "Banco" (Camada de Persistência)
    const usuario = usuariosMock.find(u => u.email === email);

    // 2. Validações (Regra de Negócio)
    if (!usuario) {
      throw new Error('Usuário não encontrado');
    }

    if (usuario.senha !== senha) {
      throw new Error('Senha incorreta');
    }

    // 3. Gerar Token (Sucesso)
    const token = jwt.sign(
      { id: usuario.id, nome: usuario.nome, tipo: usuario.tipo },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Retorna apenas dados não sensíveis + token
    return {
      token,
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email
      }
    };
  }
}