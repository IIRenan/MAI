export default function Home() {
  return (
    // Um container centralizado com fundo claro (referência ao design limpo)
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-50">
      
      {/* Título do Projeto (Identidade do MAI) */}
      <h1 className="text-4xl font-bold text-green-600 mb-4">
        MAI Digital
      </h1>
      
      <p className="text-gray-600 mb-8 text-center max-w-md">
        Plataforma de auxílio à avaliação e implantação do desenho universal.
      </p>

      {/* Botões simulando o fluxo do usuário */}
      <div className="flex gap-4">
        <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition">
          Entrar (Login)
        </button>
        
        <button className="border border-green-600 text-green-600 px-6 py-3 rounded-lg hover:bg-green-50">
          Novo Cadastro
        </button>
      </div>

    </main>
  );
}