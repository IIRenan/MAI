"use client";
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

export default function Relatorio() {
  const data = [
    { name: 'Meio Urbano', value: 30 },
    { name: 'Edificações', value: 45 },
    { name: 'Transporte', value: 25 },
  ];
  
  // Cores da paleta Material Green (Tonalidades)
  const COLORS = ['#2e6c38', '#b3f2bb', '#516350']; 

  return (
    <div className="min-h-screen bg-[#f7fbf2] p-6 flex flex-col font-sans">
      <header className="mb-8 flex items-center gap-4">
         <button onClick={() => window.history.back()} className="w-10 h-10 rounded-full bg-[#e1e5dd] flex items-center justify-center">←</button>
         <h1 className="text-3xl font-normal text-[#181d18]">Resultado</h1>
      </header>

      {/* Card do Gráfico - Surface Variant */}
      <div className="bg-[#f0f4eb] p-8 rounded-[2.5rem] mb-8 flex flex-col items-center relative shadow-sm">
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                innerRadius={70}
                outerRadius={90}
                paddingAngle={4}
                dataKey="value"
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} cornerRadius={10} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-5xl font-bold text-[#2e6c38]">7.8</span>
            <span className="text-sm text-[#516350] font-medium">Índice MAI</span>
        </div>
      </div>

      <h3 className="text-[#181d18] font-bold text-lg mb-4 ml-2">Ações</h3>

      {/* Lista de Ações */}
      <div className="space-y-3">
        <ActionItem icon="📊" title="Detalhes Completos" color="#d4e8d0" />
        <ActionItem icon="📄" title="Baixar Planilha (.xls)" color="#f0f4eb" />
        <ActionItem icon="📑" title="Baixar PDF" color="#f0f4eb" />
      </div>
    </div>
  );
}

function ActionItem({ icon, title, color }) {
  return (
    <button 
        style={{ backgroundColor: color }}
        className="w-full flex items-center gap-4 p-5 rounded-[1.5rem] text-left transition active:scale-[0.98]"
    >
      <span className="text-2xl">{icon}</span>
      <span className="font-medium text-[#181d18] text-lg">{title}</span>
      <div className="flex-1 text-right text-[#516350]">→</div>
    </button>
  );
}