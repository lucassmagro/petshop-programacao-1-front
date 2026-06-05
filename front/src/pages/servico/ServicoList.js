import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { listarServicos, deletarServico } from "../../services/servicoService";

function ServicoList() {
  const [servicos, setServicos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregar();
  }, []);

  const carregar = async () => {
    try {
      const res = await listarServicos();
      setServicos(res.data);
    } catch (err) {
      toast.error("Erro ao carregar serviços!");
    } finally {
      setLoading(false);
    }
  };

  const handleDeletar = async (id) => {
    if (!window.confirm("Deseja excluir este serviço?")) return;
    try {
      await deletarServico(id);
      toast.success("Serviço excluído com sucesso!");
      carregar();
    } catch (err) {
      toast.error("Erro ao excluir serviço!");
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Serviços</h2>
        <Link to="/servico/novo" className="btn btn-success">
          + Novo Serviço
        </Link>
      </div>

      {loading ? (
        <p>Carregando...</p>
      ) : servicos.length === 0 ? (
        <p>Nenhum serviço cadastrado.</p>
      ) : (
        <table className="table table-striped table-bordered">
          <thead className="table-success">
            <tr>
              <th>ID</th>
              <th>Descrição</th>
              <th>Preço (R$)</th>
              <th>Duração (h)</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {servicos.map((s) => (
              <tr key={s.id}>
                <td>{s.id}</td>
                <td>{s.descricao}</td>
                <td>{Number(s.preco).toFixed(2)}</td>
                <td>{s.duracaoHoras}h</td>
                <td>
                  <Link
                    to={`/servico/editar/${s.id}`}
                    className="btn btn-warning btn-sm me-2"
                  >
                    Editar
                  </Link>
                  <button
                    onClick={() => handleDeletar(s.id)}
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

export default ServicoList;
