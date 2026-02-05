"use client";
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'; // npm install recharts

export default function Relatorio() {
  // Dados mockados baseados no protótipo [cite: 299-301]
  const data = [
    { name: 'Meio Urbano', value: 30 },
    { name: 'Edificações', value: 45 },
    { name: 'Transporte', value: 25 },
  ];
  const COLORS = ['#d9f99d', '#86efac', '#fde047']; // Cores extraídas do visual (verdes/amarelos)

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col">
      <header className="mb-6 flex items-center justify-between">
         <button onClick={() => window.history.back()}>←</button>
         <h1 className="text-2xl font-bold text-gray-800">Gerar relatório</h1>
         <div className="w-6"></div>
      </header>

      {/* Gráfico Circular [cite: 308] */}
      <div className="bg-white p-6 rounded-3xl shadow-sm mb-6 flex flex-col items-center relative">
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        {/* Legenda do Gráfico */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="text-3xl font-bold text-gray-300">MAI</span>
        </div>
      </div>

      {/* Opções de Ação [cite: 302-307] */}
      <div className="space-y-4">
        <ActionItem icon="📊" title="Visualizar resultado detalhado" sub="Gráficos e métricas obtidas" />
        <ActionItem icon="📄" title="Exportar planilha" sub="Arquivo .xls" />
        <ActionItem icon="📑" title="Exportar arquivo PDF" sub="Documento formatado com resultados" />
        <ActionItem icon="✏️" title="Realizar alterações" sub="Edição rápida" />
      </div>
    </div>
  );
}

// Componente auxiliar para os botões de lista
function ActionItem({ icon, title, sub }) {
  return (
    <button className="w-full flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm hover:bg-gray-50 text-left transition">
      <span className="text-2xl">{icon}</span>
      <div>
        <h3 className="font-bold text-gray-700">{title}</h3>
        <p className="text-xs text-gray-400">{sub}</p>
      </div>
    </button>
  );
}