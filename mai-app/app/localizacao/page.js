"use client";
import { useRouter } from 'next/navigation';

export default function Localizacao() {
  const router = useRouter();

  return (
    <div className="min-h-screen relative bg-gray-200">
      {/* Cabeçalho Flutuante */}
      <div className="absolute top-0 left-0 w-full p-4 bg-white/90 backdrop-blur-sm shadow-md z-10 rounded-b-xl">
        <h2 className="text-center font-bold text-gray-800">Universidade Federal de Sergipe</h2>
      </div>

      {/* Simulação do Mapa (Fundo) */}
      <div className="w-full h-screen flex items-center justify-center bg-[url('https://maps.gstatic.com/mapfiles/api-3/images/map_error_1.png')] bg-cover">
         {/* Pin do Mapa */}
         <div className="text-red-500 animate-bounce">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="currentColor" className="drop-shadow-xl">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
         </div>
      </div>

      {/* Card Inferior de Ação */}
      <div className="absolute bottom-8 left-4 right-4 bg-white p-6 rounded-2xl shadow-xl flex flex-col items-center gap-3">
        <p className="text-gray-600 text-sm font-medium">Selecione uma localização para realizar o levantamento</p>
        <button 
          onClick={() => router.push('/levantamento')}
          className="w-full bg-green-500 text-white font-bold py-3 rounded-xl hover:bg-green-600 transition"
        >
          Confirmar Local
        </button>
      </div>
    </div>
  );
}