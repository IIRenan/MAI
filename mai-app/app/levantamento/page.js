"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Levantamento() {
  const router = useRouter();
  
  const categorias = [
    { 
      id: 'transporte', 
      label: 'Transporte e Calçadas', 
      icon: '🚌',
      metrics: ['Qualidade da Calçada', 'Rampas de Acesso', 'Sinalização Tátil', 'Estacionamento Prioritário', 'Proximidade Ponto de Ônibus']
    },
    { 
      id: 'acesso', 
      label: 'Acesso Interno', 
      icon: '🚪',
      metrics: ['Largura das Portas', 'Corredores Livres', 'Piso Tátil Interno', 'Balcão de Atendimento Baixo', 'Iluminação']
    },
    { 
      id: 'escadas', 
      label: 'Escadas e Rampas', 
      icon: '🪜',
      metrics: ['Corrimão Duplo', 'Sinalização nos Degraus', 'Inclinação da Rampa', 'Plataforma Elevatória']
    },
    { 
      id: 'sanitarios', 
      label: 'Sanitários Acessíveis', 
      icon: '🚻',
      metrics: ['Barras de Apoio', 'Espaço para Giro (Cadeira)', 'Altura da Pia', 'Botão de Emergência', 'Porta com Abertura Externa']
    }
  ];

  const [ativo, setAtivo] = useState(null); 
  const [detalhes, setDetalhes] = useState({});

  const getMedia = (catId) => {
    const notasCategoria = detalhes[catId];
    if (!notasCategoria) return null;

    const metricas = categorias.find(c => c.id === catId).metrics;
    let soma = 0;
    
    metricas.forEach(metrica => {
      soma += parseFloat(notasCategoria[metrica] || 0);
    });

    return (soma / metricas.length).toFixed(1);
  };

  const renderInput = () => {
    const mediaAtual = getMedia(ativo.id) || "0.0";
    
    return (
      <div className="fixed inset-0 bg-black/50 flex items-end z-50 backdrop-blur-sm transition-opacity animate-fade-in">
        {/* Aumentei a altura para 90vh para dar mais espaço */}
        <div className="bg-[#f7fbf2] w-full h-[90vh] rounded-t-[2rem] p-6 pb-0 shadow-2xl flex flex-col">
          
          {/* Cabeçalho do Modal */}
          <div className="flex justify-between items-start mb-2 flex-shrink-0">
            <div>
                <h3 className="text-2xl font-normal text-[#181d18] leading-tight">{ativo.label}</h3>
                <p className="text-sm text-[#516350] mt-1">Deslize para avaliar</p>
            </div>
            
            {/* AQUI: O botão de fechar agora é o "Concluir" no topo */}
            <button 
                onClick={() => setAtivo(null)} 
                className="bg-[#d4e8d0] text-[#002107] px-4 py-2 rounded-full font-bold text-sm hover:bg-[#b3f2bb] transition"
            >
                Concluir
            </button>
          </div>
          
          <div className="flex items-center gap-2 mb-4">
            <span className="text-sm text-[#516350]">Média Parcial:</span>
            <span className="text-2xl font-bold text-[#2e6c38]">{mediaAtual}</span>
          </div>
          
          <hr className="border-[#e1e5dd] mb-4" />

          {/* Lista de Métricas (Ocupa todo o resto do espaço) */}
          <div className="flex-1 overflow-y-auto space-y-8 pr-2 pb-10 custom-scrollbar">
            {ativo.metrics.map((metrica) => {
                const valor = detalhes[ativo.id]?.[metrica] || 0;
                
                return (
                    <div key={metrica} className="space-y-3">
                        <div className="flex justify-between items-end">
                            <label className="text-[#181d18] font-medium text-lg leading-none">{metrica}</label>
                            <span className="text-[#2e6c38] font-bold text-xl">{valor}</span>
                        </div>
                        <input 
                            type="range" min="0" max="10" step="0.5"
                            className="w-full h-6 bg-[#e1e5dd] rounded-full appearance-none cursor-pointer accent-[#2e6c38]"
                            value={valor}
                            onChange={(e) => {
                                setDetalhes({
                                    ...detalhes,
                                    [ativo.id]: {
                                        ...detalhes[ativo.id],
                                        [metrica]: parseFloat(e.target.value)
                                    }
                                });
                            }}
                        />
                    </div>
                );
            })}
          </div>
          
          {/* REMOVIDO: O footer com botão "Concluir Avaliação" não existe mais aqui */}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#f7fbf2] flex flex-col font-sans">
      <header className="p-6 pb-2 flex items-center gap-4">
        <button onClick={() => router.back()} className="w-10 h-10 rounded-full hover:bg-[#e1e5dd] flex items-center justify-center text-[#181d18] transition">←</button>
        <h1 className="text-2xl font-normal text-[#181d18]">Levantamento</h1>
      </header>

      <main className="flex-1 p-4 space-y-3 pb-32"> {/* pb-32 para não esconder atrás do botão flutuante */}
        <p className="text-sm text-[#516350] px-2 mb-2">Selecione uma categoria para detalhar</p>
        
        {categorias.map((cat) => {
            const media = getMedia(cat.id);
            const isFilled = media !== null;
            
            return (
                <div 
                    key={cat.id}
                    onClick={() => setAtivo(cat)}
                    className={`flex items-center gap-4 p-5 rounded-[1.5rem] cursor-pointer transition-all border border-transparent active:scale-[0.98]
                        ${isFilled ? 'bg-[#b3f2bb] text-[#002107]' : 'bg-[#f0f4eb] text-[#181d18] hover:bg-[#e1e5dd]'}`}
                >
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl transition-colors
                        ${isFilled ? 'bg-[#ffffff]/60' : 'bg-[#dce3d5]'}`}>
                    {cat.icon}
                    </div>
                    
                    <div className="flex-1">
                        <h3 className="font-medium text-lg">{cat.label}</h3>
                        <p className={`text-sm ${isFilled ? 'text-[#002107]/70' : 'text-[#516350]'}`}>
                            {cat.metrics.length} critérios
                        </p>
                    </div>
                    
                    {isFilled ? (
                        <span className="font-bold text-lg bg-[#2e6c38] text-white px-3 py-1 rounded-full shadow-sm">
                           {media}
                        </span>
                    ) : (
                        <span className="text-[#727970] text-2xl">→</span>
                    )}
                </div>
            );
        })}
      </main>

      {/* Botão Flutuante de Gerar Relatório */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#f7fbf2] via-[#f7fbf2] to-transparent pt-12">
        <button 
          onClick={() => {
            localStorage.setItem('mai_dados', JSON.stringify(detalhes));
            router.push('/relatorio');
          }}
          className="w-full bg-[#2e6c38] text-white font-bold h-16 rounded-[1.2rem] hover:bg-[#25572d] transition shadow-xl hover:shadow-2xl flex items-center justify-between px-6 active:scale-[0.98]"
        >
          <span>Gerar Relatório Final</span>
          <span className="bg-white/20 w-8 h-8 rounded-full flex items-center justify-center">→</span>
        </button>
      </div>

      {ativo && renderInput()}
    </div>
  );
}