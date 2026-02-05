"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Levantamento() {
  const router = useRouter();
  
  // Categorias extraídas do documento [cite: 286-292]
  const categorias = [
    { id: 'transporte', label: 'Transporte', sub: '5 subtópicos', icon: '🚌' },
    { id: 'acesso', label: 'Acesso Interno', sub: '', icon: '🚪' },
    { id: 'escadas', label: 'Escadas', sub: '2 subtópicos', icon: '🪜' },
    { id: 'sanitarios', label: 'Sanitários', sub: '', icon: '🚻' }
  ];

  const [ativo, setAtivo] = useState(null);
  const [pontos, setPontos] = useState({});

  // Simula a interface de input numérico do protótipo 
  const renderInput = () => (
    <div className="fixed inset-0 bg-black/50 flex items-end z-20">
      <div className="bg-white w-full rounded-t-3xl p-6 pb-10 animate-slide-up">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-800">{ativo.label}</h3>
          <button onClick={() => setAtivo(null)} className="text-gray-400">✕</button>
        </div>
        
        {/* Slider visual simulado */}
        <div className="mb-6 px-2">
          <input 
            type="range" min="0" max="10" step="0.1"
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-yellow-400"
            onChange={(e) => setPontos({...pontos, [ativo.id]: e.target.value})}
          />
          <div className="text-center mt-2 text-4xl font-mono text-gray-800">
            {pontos[ativo.id] || "0.00"}
          </div>
        </div>

        {/* Botões de ação (Foto e Confirmar) [cite: 295] */}
        <div className="flex gap-4">
          <button className="flex-1 bg-green-100 text-green-800 py-3 rounded-xl font-medium flex items-center justify-center gap-2">
            📷 Anexar Foto
          </button>
          <button 
            onClick={() => setAtivo(null)}
            className="flex-1 bg-green-500 text-white py-3 rounded-xl font-bold"
          >
            Confirmar →
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="p-4 flex items-center gap-4 border-b bg-white">
        <button onClick={() => router.back()}>←</button>
        <h1 className="text-xl font-bold">Levantamento</h1>
      </header>

      <main className="flex-1 p-4 space-y-4">
        <p className="text-sm text-gray-500 mb-4">Clique nos itens para inserir os dados obtidos.</p>
        
        {/* Lista de Categorias */}
        {categorias.map((cat) => (
          <div 
            key={cat.id}
            onClick={() => setAtivo(cat)}
            className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow-sm border border-gray-100 cursor-pointer hover:bg-gray-50 transition"
          >
            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl ${pontos[cat.id] ? 'bg-green-100' : 'bg-gray-100'}`}>
              {cat.icon}
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-gray-700">{cat.label}</h3>
              {cat.sub && <p className="text-xs text-gray-400">{cat.sub}</p>}
            </div>
            {pontos[cat.id] && <span className="font-mono font-bold text-green-600">{pontos[cat.id]}</span>}
          </div>
        ))}
      </main>

      <div className="p-4 bg-white border-t">
        <button 
          onClick={() => router.push('/relatorio')}
          className="w-full bg-green-200 text-green-900 font-bold py-4 rounded-xl hover:bg-green-300 transition"
        >
          ✓ Concluir Levantamento
        </button>
      </div>

      {ativo && renderInput()}
    </div>
  );
}