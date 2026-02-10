"use client";

import { useEffect, useState } from "react";

export default function HistoricoPage() {
  const [historico, setHistorico] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/historico")
      .then(res => res.json())
      .then(data => {
        setHistorico(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <p>Carregando histórico...</p>;

  return (
    <div style={{ padding: 20 }}>
      <h1>Histórico de Avaliações</h1>

      {historico.length === 0 && <p>Nenhuma avaliação registrada.</p>}

      {historico.map(item => (
        <div
          key={item.id}
          style={{
            border: "1px solid #ddd",
            marginBottom: 12,
            padding: 12,
            borderRadius: 6
          }}
        >
          <strong>{item.local}</strong> — {item.avaliador}<br />
          <small>{new Date(item.data).toLocaleString()}</small>

          <p>Total: {item.pontuacao_total}</p>

          <ul>
            {item.criterios.map((c, i) => (
              <li key={i}>
                {c.nome}: {c.valor}
              </li>
            ))}
          </ul>

          {item.observacoes && (
            <em>Obs: {item.observacoes}</em>
          )}
        </div>
      ))}
    </div>
  );
}