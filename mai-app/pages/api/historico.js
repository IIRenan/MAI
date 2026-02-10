import pool from "../../lib/db";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const client = await pool.connect();

    try {
      const { local, avaliador, pontuacao_total, criterios, observacoes } = req.body;

      await client.query("BEGIN");

      const result = await client.query(
        `INSERT INTO levantamento_historico 
         (local, avaliador, pontuacao_total, observacoes)
         VALUES ($1,$2,$3,$4) RETURNING id`,
        [local, avaliador, pontuacao_total, observacoes]
      );

      const levantamentoId = result.rows[0].id;

      for (const c of criterios) {
        await client.query(
          `INSERT INTO criterios_historico 
           (levantamento_historico, nome, valor)
           VALUES ($1,$2,$3)`,
          [levantamentoId, c.nome, c.valor]
        );
      }

      await client.query("COMMIT");

      res.status(201).json({ status: "salvo", id: levantamentoId });

    } catch (err) {
      await client.query("ROLLBACK");
      res.status(500).json({ error: err.message });

    } finally {
      client.release();
    }

  } else if (req.method === "GET") {
    try {
      const result = await pool.query(`
        SELECT 
          lh.id,
          lh.local,
          lh.avaliador,
          lh.data,
          lh.pontuacao_total,
          lh.observacoes,
          json_agg(
            json_build_object(
              'nome', ch.nome,
              'valor', ch.valor
            )
          ) AS criterios
        FROM levantamento_historico lh
        LEFT JOIN criterios_historico ch
          ON lh.id = ch.levantamento_historico
        GROUP BY lh.id
        ORDER BY lh.data DESC
      `);

      res.status(200).json(result.rows);

    } catch (err) {
      res.status(500).json({ error: err.message });
    }

  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
