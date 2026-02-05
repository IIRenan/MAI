"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

// 1. Defina seus usuários "do banco" aqui mesmo (Inseguro, mas funciona sem servidor)
const USUARIOS_MOCK = [
  { email: "admin@mai.com", senha: "1234", nome: "Avaliador Padrão" },
  { email: "inst@mai.com", senha: "abcd", nome: "Prefeitura" }
];

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  const handleLogin = (e) => {
    e.preventDefault(); // Impede o recarregamento da página
    setErro('');

    // 2. Busca o usuário na lista local (sem fetch, sem api, sem erro de conexão)
    const usuarioEncontrado = USUARIOS_MOCK.find(
      u => u.email === email && u.senha === senha
    );

    if (usuarioEncontrado) {
      // Login Sucesso: Salva no navegador e redireciona
      localStorage.setItem('mai_user', JSON.stringify(usuarioEncontrado));
      
      // FORÇA O REDIRECIONAMENTO IMEDIATO
      router.push('/localizacao'); 
    } else {
      // Login Falha
      setErro('Usuário ou senha incorretos (Tente: admin@mai.com / 1234)');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      {/* Cabeçalho / Logo */}
      <div className="mb-8 flex flex-col items-center">
        <div className="w-20 h-20 bg-green-200 rounded-full flex items-center justify-center mb-2">
          <span className="text-2xl font-bold text-green-800">MAI</span>
        </div>
        <h1 className="text-xl font-semibold text-gray-700">Acessibilidade Integrada</h1>
      </div>

      <form onSubmit={handleLogin} className="w-full max-w-xs space-y-4">
        {erro && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative text-sm">
            {erro}
          </div>
        )}

        <input 
          type="text" 
          placeholder="Email (admin@mai.com)" 
          className="w-full p-3 border rounded-lg bg-white shadow-sm"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input 
          type="password" 
          placeholder="Senha (1234)" 
          className="w-full p-3 border rounded-lg bg-white shadow-sm"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
        
        <button type="submit" className="w-full bg-green-300 hover:bg-green-400 text-green-900 font-bold py-3 rounded-full transition shadow-md">
          → Login
        </button>
      </form>
    </div>
  );
}