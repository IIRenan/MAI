"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Levantamento() {
  const router = useRouter();
  
  const categorias = [
    { id: 'transporte', label: 'Transporte', sub: '5 subtópicos', icon: '🚌' },
    { id: 'acesso', label: 'Acesso Interno', sub: 'Corredores e portas', icon: '🚪' },
    { id: 'escadas', label: 'Escadas', sub: '2 subtópicos', icon: '🪜' },
    { id: 'sanitarios', label: 'Sanitários', sub: 'Box e pias', icon: '🚻' }
  ];

  const [ativo, setAtivo] = useState(null);
  const [pontos, setPontos] = useState({});

  const renderInput = () => (
    <div className="fixed inset-0 bg-black/40 flex items-end z-50 backdrop-blur-sm transition-opacity">
      <div className="bg-[#f7fbf2] w-full rounded-t-[2rem] p-6 pb-12 shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-normal text-[#181d18]">{ativo.label}</h3>
          <button onClick={() => setAtivo(null)} className="w-10 h-10 bg-[#e1e5dd] rounded-full flex items-center justify-center text-[#414941]">✕</button>
        </div>
        
        {/* Slider Material */}
        <div className="mb-8 px-2">
            <div className="flex justify-between mb-2">
                <span className="text-sm text-[#516350]">Avaliação</span>
                <span className="text-3xl font-bold text-[#2e6c38]">{pontos[ativo.id] || "0.0"}</span>
            </div>
            <input 
                type="range" min="0" max="10" step="0.1"
                className="w-full h-4 bg-[#e1e5dd] rounded-full appearance-none cursor-pointer accent-[#2e6c38]"
                value={pontos[ativo.id] || 0}
                onChange={(e) => setPontos({...pontos, [ativo.id]: e.target.value})}
            />
        </div>

        <div className="flex gap-4">
          <button className="flex-1 bg-[#d4e8d0] text-[#101f11] h-14 rounded-full font-medium flex items-center justify-center gap-2 hover:bg-[#c3e0bd]">
            📷 Foto
          </button>
          <button 
            onClick={() => setAtivo(null)}
            className="flex-1 bg-[#2e6c38] text-white h-14 rounded-full font-medium hover:bg-[#25572d] shadow-lg"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f7fbf2] flex flex-col font-sans">
      <header className="p-6 pb-2 flex items-center gap-4">
        <button onClick={() => router.back()} className="w-10 h-10 rounded-full hover:bg-[#e1e5dd] flex items-center justify-center text-[#181d18]">←</button>
        <h1 className="text-2xl font-normal text-[#181d18]">Levantamento</h1>
      </header>

      <main className="flex-1 p-4 space-y-3">
        <p className="text-sm text-[#516350] px-2 mb-2">Selecione uma categoria para avaliar</p>
        
        {categorias.map((cat) => {
            const isFilled = pontos[cat.id];
            return (
                <div 
                    key={cat.id}
                    onClick={() => setAtivo(cat)}
                    // Condicional de cor: Se preenchido, usa o Container Verde (Secondary Container)
                    className={`flex items-center gap-4 p-5 rounded-[1.5rem] cursor-pointer transition-all border border-transparent
                        ${isFilled ? 'bg-[#b3f2bb] text-[#002107]' : 'bg-[#f0f4eb] text-[#181d18] hover:bg-[#e1e5dd]'}`}
                >
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl 
                        ${isFilled ? 'bg-[#ffffff]/60' : 'bg-[#dce3d5]'}`}>
                    {cat.icon}
                    </div>
                    <div className="flex-1">
                    <h3 className="font-medium text-lg">{cat.label}</h3>
                    {cat.sub && <p className={`text-sm ${isFilled ? 'text-[#002107]/70' : 'text-[#516350]'}`}>{cat.sub}</p>}
                    </div>
                    {isFilled && <span className="font-bold text-lg bg-[#2e6c38] text-white px-3 py-1 rounded-full">{pontos[cat.id]}</span>}
                </div>
            );
        })}
      </main>

      <div className="p-4 bg-[#f0f4eb] rounded-t-[2rem]">
        <button 
          onClick={() => router.push('/relatorio')}
          className="w-full bg-[#2e6c38] text-white font-bold h-16 rounded-[1.2rem] hover:bg-[#25572d] transition shadow-md flex items-center justify-between px-6"
        >
          <span>Concluir Levantamento</span>
          <span>→</span>
        </button>
      </div>

      {ativo && renderInput()}
    </div>
  );
}