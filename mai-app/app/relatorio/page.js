"use client";
import { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'; // <--- CORREÇÃO 1: Importação nomeada

export default function Relatorio() {
  const router = useRouter();
  const [dados, setDados] = useState({});
  const [mostrarDetalhes, setMostrarDetalhes] = useState(false);
  const COLORS = ['#2e6c38', '#516350', '#b3f2bb', '#8c9e8a'];

  // 1. Carrega os dados do localStorage ao iniciar
  useEffect(() => {
    const dadosSalvos = localStorage.getItem('mai_dados');
    if (dadosSalvos) {
      setDados(JSON.parse(dadosSalvos));
    }
  }, []);

  // 2. Cálculo da Média Geral (MAI)
  const estatisticas = useMemo(() => {
    let somaTotal = 0;
    let contadorItens = 0;
    const chartData = [];

    Object.keys(dados).forEach((catId) => {
      const itensCategoria = dados[catId];
      let somaCat = 0;
      let countCat = 0;

      Object.values(itensCategoria).forEach((nota) => {
        somaTotal += nota;
        contadorItens++;
        somaCat += nota;
        countCat++;
      });

      if (countCat > 0) {
        chartData.push({
          name: catId.charAt(0).toUpperCase() + catId.slice(1),
          value: parseFloat((somaCat / countCat).toFixed(1))
        });
      }
    });

    const mai = contadorItens > 0 ? (somaTotal / contadorItens).toFixed(1) : "0.0";

    return { mai, chartData };
  }, [dados]);

  // 3. Funcionalidade: Baixar Excel (.xls)
  const baixarExcel = () => {
    const linhas = [];
    Object.entries(dados).forEach(([categoria, itens]) => {
      Object.entries(itens).forEach(([item, nota]) => {
        linhas.push({ Categoria: categoria, Item: item, Nota: nota });
      });
    });

    const worksheet = XLSX.utils.json_to_sheet(linhas);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Levantamento MAI");
    XLSX.writeFile(workbook, "Relatorio_MAI.xlsx");
  };

  // 4. Funcionalidade: Baixar PDF (CORRIGIDA)
  const baixarPDF = () => {
    const doc = new jsPDF();
    
    // Título
    doc.setFontSize(18);
    doc.setTextColor(46, 108, 56);
    doc.text("Relatório de Acessibilidade (MAI)", 14, 22);
    
    // Índice MAI
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text(`Índice Geral Calculado: ${estatisticas.mai}`, 14, 32);

    // Preparar dados da tabela
    const tableRows = [];
    Object.entries(dados).forEach(([categoria, itens]) => {
      Object.entries(itens).forEach(([item, nota]) => {
        tableRows.push([categoria.toUpperCase(), item, nota]);
      });
    });

    // CORREÇÃO 2: Chamada direta da função autoTable passando o doc
    autoTable(doc, {
      head: [['Categoria', 'Critério Avaliado', 'Nota']],
      body: tableRows,
      startY: 40,
      theme: 'grid',
      headStyles: { fillColor: [46, 108, 56] }
    });

    doc.save("Relatorio_MAI.pdf");
  };

  return (
    <div className="min-h-screen bg-[#f7fbf2] p-6 flex flex-col font-sans">
      <header className="mb-6 flex items-center gap-4">
         <button onClick={() => router.back()} className="w-10 h-10 rounded-full bg-[#e1e5dd] flex items-center justify-center hover:bg-[#d4e8d0] transition">←</button>
         <h1 className="text-3xl font-normal text-[#181d18]">Resultado</h1>
      </header>

      {/* Card do Gráfico */}
      <div className="bg-[#f0f4eb] p-6 rounded-[2.5rem] mb-6 flex flex-col items-center relative shadow-sm border border-white/50">
        {estatisticas.chartData.length > 0 ? (
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={estatisticas.chartData}
                  innerRadius={65}
                  outerRadius={85}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {estatisticas.chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} cornerRadius={8} />
                  ))}
                </Pie>
                <Legend verticalAlign="bottom" height={36} iconType="circle"/>
              </PieChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="h-64 w-full flex items-center justify-center text-[#516350]">
            Nenhum dado coletado ainda.
          </div>
        )}
        
        <div className="absolute inset-0 top-[-2rem] flex flex-col items-center justify-center pointer-events-none">
            <span className="text-5xl font-bold text-[#2e6c38]">{estatisticas.mai}</span>
            <span className="text-sm text-[#516350] font-medium">Índice MAI</span>
        </div>
      </div>

      <h3 className="text-[#181d18] font-bold text-lg mb-4 ml-2">Ações e Exportação</h3>

      <div className="space-y-3 pb-10">
        <ActionItem 
          icon="📊" 
          title="Ver Detalhes Completos" 
          color="#d4e8d0" 
          onClick={() => setMostrarDetalhes(true)}
        />
        <ActionItem 
          icon="📄" 
          title="Baixar Planilha (.xlsx)" 
          color="#f0f4eb" 
          onClick={baixarExcel}
        />
        <ActionItem 
          icon="📑" 
          title="Baixar Relatório PDF" 
          color="#f0f4eb" 
          onClick={baixarPDF}
        />
      </div>

      {/* Modal de Detalhes */}
      {mostrarDetalhes && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#f7fbf2] w-full max-w-md max-h-[80vh] rounded-[2rem] p-6 shadow-2xl flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-[#181d18]">Detalhamento</h3>
              <button onClick={() => setMostrarDetalhes(false)} className="w-8 h-8 bg-[#e1e5dd] rounded-full flex items-center justify-center text-[#414941]">✕</button>
            </div>
            
            <div className="overflow-y-auto flex-1 space-y-4 pr-2 custom-scrollbar">
              {Object.entries(dados).length === 0 && <p className="text-center text-gray-500">Sem dados.</p>}
              
              {Object.entries(dados).map(([categoria, itens]) => (
                <div key={categoria} className="bg-white p-4 rounded-xl border border-[#e1e5dd]">
                  <h4 className="font-bold text-[#2e6c38] capitalize mb-2 border-b border-[#f0f4eb] pb-1">{categoria}</h4>
                  <ul className="space-y-2">
                    {Object.entries(itens).map(([item, nota]) => (
                      <li key={item} className="flex justify-between text-sm">
                        <span className="text-[#516350]">{item}</span>
                        <span className="font-bold text-[#181d18]">{nota}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

function ActionItem({ icon, title, color, onClick }) {
  return (
    <button 
        onClick={onClick}
        style={{ backgroundColor: color }}
        className="w-full flex items-center gap-4 p-5 rounded-[1.5rem] text-left transition hover:brightness-95 active:scale-[0.98] shadow-sm"
    >
      <span className="text-2xl">{icon}</span>
      <span className="font-medium text-[#181d18] text-lg">{title}</span>
      <div className="flex-1 text-right text-[#516350]">→</div>
    </button>
  );
}