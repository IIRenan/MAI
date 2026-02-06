"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

// Mock de usuários
const USUARIOS_MOCK = [
  { email: "admin@mai.com", senha: "1234", nome: "Avaliador Padrão" },
];

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    setErro('');
    const usuario = USUARIOS_MOCK.find(u => u.email === email && u.senha === senha);
    if (usuario) {
      localStorage.setItem('mai_user', JSON.stringify(usuario));
      router.push('/localizacao'); 
    } else {
      setErro('Usuário ou senha incorretos');
    }
  };

  return (
    // Fundo Surface (#f7fbf2)
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f7fbf2] p-6 font-sans">
      
      {/* Container Logo - Formato Squircle (Rounded Large) */}
      <div className="mb-12 flex flex-col items-center">
        <div className="w-24 h-24 bg-[#b3f2bb] rounded-[2rem] flex items-center justify-center mb-4 shadow-sm">
          {/* Ícone ou Letra - Cor OnPrimaryContainer (#002107) */}
          <span className="text-4xl text-[#002107] font-bold">M</span>
        </div>
        <h1 className="text-2xl text-[#181d18] tracking-tight">Acessibilidade Integrada</h1>
        <p className="text-[#516350] text-sm mt-1">Bem-vindo de volta</p>
      </div>

      <form onSubmit={handleLogin} className="w-full max-w-sm space-y-6">
        {erro && (
          <div className="bg-red-100 text-red-900 px-4 py-3 rounded-2xl text-sm font-medium flex items-center">
            <span className="mr-2">⚠️</span> {erro}
          </div>
        )}

        {/* Inputs Estilo Material Filled - Fundo levemente mais escuro que a superfície */}
        <div className="relative group">
          <input 
            type="text" 
            placeholder=" " 
            className="peer w-full px-4 pt-6 pb-2 bg-[#e1e5dd] border-b-2 border-[#727970] rounded-t-xl text-[#181d18] placeholder-transparent focus:border-[#2e6c38] focus:bg-[#dce3d5] outline-none transition-all"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label className="absolute left-4 top-4 text-[#516350] text-base transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-xs peer-focus:text-[#2e6c38] peer-not-placeholder-shown:top-1 peer-not-placeholder-shown:text-xs">
            Email
          </label>
        </div>

        <div className="relative group">
          <input 
            type="password" 
            placeholder=" " 
            className="peer w-full px-4 pt-6 pb-2 bg-[#e1e5dd] border-b-2 border-[#727970] rounded-t-xl text-[#181d18] placeholder-transparent focus:border-[#2e6c38] focus:bg-[#dce3d5] outline-none transition-all"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
          <label className="absolute left-4 top-4 text-[#516350] text-base transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-xs peer-focus:text-[#2e6c38] peer-not-placeholder-shown:top-1 peer-not-placeholder-shown:text-xs">
            Senha
          </label>
        </div>
        
        {/* Botão Pill Shape (Primary Green) */}
        <button type="submit" className="w-full bg-[#2e6c38] text-white font-medium text-lg h-14 rounded-full shadow-md hover:shadow-lg active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-4">
          Entrar
        </button>

        <div className="text-center mt-6">
            <button type="button" className="text-[#2e6c38] font-medium text-sm hover:underline">
                Esqueci minha senha
            </button>
        </div>
      </form>
    </div>
  );
}