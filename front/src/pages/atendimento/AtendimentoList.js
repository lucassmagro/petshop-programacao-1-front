import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  listarAtendimentos,
  deletarAtendimento,
} from "../../services/atendimentoService";

function AtendimentoList() {
  const [atendimentos, setAtendimentos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregar();
  }, []);

  const carregar = async () => {
    try {
      const res = await listarAtendimentos();
      setAtendimentos(res.data);
    } catch (err) {
      toast.error("Erro ao carregar atendimentos!");
    } finally {
      setLoading(false);
    }
  };

  const handleDeletar = async (id) => {
    if (!window.confirm("Deseja excluir este atendimento?")) return;
    try {
      await deletarAtendimento(id);
      toast.success("Atendimento excluído com sucesso!");
      carregar();
    } catch (err) {
      toast.error("Erro ao excluir atendimento!");
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Atendimentos</h2>
        <Link to="/atendimento/novo" className="btn btn-success">
          + Novo Atendimento
        </Link>
      </div>

      {loading ? (
        <p>Carregando...</p>
      ) : atendimentos.length === 0 ? (
        <p>Nenhum atendimento cadastrado.</p>
      ) : (
        <table className="table table-striped table-bordered">
          <thead className="table-success">
            <tr>
              <th>ID</th>
              <th>Pet</th>
              <th>Dono</th>
              <th>Serviço (ID)</th>
              <th>Valor Total (R$)</th>
              <th>Tempo Estimado (h)</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {atendimentos.map((a) => (
              <tr key={a.id}>
                <td>{a.id}</td>
                <td>{a.nomePet}</td>
                <td>{a.nomeDono}</td>
                <td>{a.idservico}</td>
                <td>R$ {Number(a.valorTotal).toFixed(2)}</td>
                <td>{a.tempoEstimado}h</td>
                <td>
                  <Link
                    to={`/atendimento/editar/${a.id}`}
                    className="btn btn-warning btn-sm me-2"
                  >
                    Editar
                  </Link>
                  <button
                    onClick={() => handleDeletar(a.id)}
                    className="btn btn-danger btn-sm"
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AtendimentoList;
