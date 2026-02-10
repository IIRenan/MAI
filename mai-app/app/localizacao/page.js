"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

const MapPicker = dynamic(() => import('../../components/MapPicker'), { 
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-[#e1e5dd]">
      <span className="text-[#2e6c38] font-bold animate-pulse">Carregando...</span>
    </div>
  )
});

export default function Localizacao() {
  const router = useRouter();
  const [coords, setCoords] = useState({ lat: -10.9252, lng: -37.1026 });

  return (
    // MUDANÇA CRUCIAL: 'h-screen' em vez de 'min-h-screen'
    <div className="h-screen w-screen relative bg-[#e1e5dd] overflow-hidden">
      
      {/* Container do Mapa: Garante que ele pegue todo o espaço disponível */}
      <div className="absolute inset-0 z-0 h-full w-full">
        <MapPicker onLocationChange={setCoords} />
      </div>

      {/* Header Flutuante */}
      <div className="absolute top-4 left-4 right-4 z-10 pointer-events-none">
        <div className="mx-auto max-w-sm p-4 bg-[#f7fbf2]/90 backdrop-blur-md shadow-lg rounded-[2rem] flex flex-col items-center justify-center border border-white/40">
           <h2 className="font-medium text-[#181d18] text-sm">Local Selecionado</h2>
           <p className="text-[#2e6c38] font-mono text-xs font-bold mt-1">
              {coords.lat.toFixed(4)}, {coords.lng.toFixed(4)}
           </p>
        </div>
      </div>

      {/* Bottom Sheet */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        <div className="bg-[#f7fbf2] p-6 pb-8 rounded-t-[2.5rem] shadow-[0_-10px_40px_rgba(0,0,0,0.1)] flex flex-col items-center gap-4 animate-slide-up">
          <div className="w-12 h-1.5 bg-[#727970] rounded-full opacity-30 mb-2"></div>
          <div className="text-center w-full px-4">
               <h3 className="text-xl font-normal text-[#181d18]">Confirmar Localização</h3>
               <p className="text-[#516350] text-sm mt-1">Toque no mapa para selecionar</p>
          </div>
          <button 
            onClick={() => {
            {/* Salva o usuario e a localizacao */}
            localStorage.setItem("mai_local", JSON.stringify(coords));
            router.push('/levantamento');
            }}
            className="w-full max-w-sm bg-[#2e6c38] text-white font-medium text-lg h-14 rounded-full hover:bg-[#25572d] transition shadow-md flex items-center justify-center gap-2 mt-2 active:scale-[0.98]"
          >
            Iniciar Levantamento
          </button>
        </div>
      </div>
      
    </div>
  );
}