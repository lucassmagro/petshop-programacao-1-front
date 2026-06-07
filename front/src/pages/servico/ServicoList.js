import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { listarServicos, deletarServico } from "../../services/servicoService";
import ConfirmModal from "../../components/ConfirmModal";

function formatDuration(h) {
  const hours = Math.floor(h);
  const mins = Math.round((h - hours) * 60);
  if (hours === 0) return `${mins}min`;
  if (mins === 0) return `${hours}h`;
  return `${hours}h ${mins}min`;
}

function formatCurrency(v) {
  return Number(v).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

function ServicoList() {
  const [servicos, setServicos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busca, setBusca] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

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

  const handleDeletar = (id) => {
    setDeleteId(id);
    setModalOpen(true);
  };

  const confirmarExclusao = async () => {
    try {
      await deletarServico(deleteId);
      toast.success("Serviço excluído com sucesso!");
      carregar();
    } catch (err) {
      toast.error("Erro ao excluir serviço!");
    } finally {
      setModalOpen(false);
      setDeleteId(null);
    }
  };

  const filtrados = useMemo(() => {
    const termo = busca.trim().toLowerCase();
    if (!termo) return servicos;
    return servicos.filter((s) =>
      String(s.descricao).toLowerCase().includes(termo),
    );
  }, [servicos, busca]);

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Serviços</h1>
          <p className="page-subtitle">
            Cadastro dos serviços oferecidos pelo pet shop.
          </p>
        </div>
        <Link to="/servico/novo" className="btn-primary">
          Novo serviço
        </Link>
      </div>

      {!loading && servicos.length > 0 && (
        <div className="filter-bar">
          <div className="search-box">
            <i className="bi bi-search"></i>
            <input
              type="text"
              placeholder="Buscar por descrição..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
          </div>
          <span className="result-count">
            {filtrados.length} de {servicos.length}{" "}
            {servicos.length === 1 ? "registro" : "registros"}
          </span>
        </div>
      )}

      {loading ? (
        <div>
          <div className="skeleton-row"></div>
          <div className="skeleton-row"></div>
          <div className="skeleton-row"></div>
        </div>
      ) : servicos.length === 0 ? (
        <div className="empty-state">
          <p className="empty-state__title">Nenhum serviço cadastrado.</p>
          <p className="empty-state__hint">
            Clique em "Novo serviço" para adicionar o primeiro registro.
          </p>
        </div>
      ) : filtrados.length === 0 ? (
        <div className="empty-state">
          <p className="empty-state__title">Nenhum resultado para "{busca}".</p>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th style={{ width: 60 }}>Cód.</th>
                <th>Descrição</th>
                <th className="col-num">Preço</th>
                <th className="col-num">Duração</th>
                <th className="col-actions" style={{ width: 120 }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filtrados.map((s) => (
                <tr key={s.id}>
                  <td>
                    <span className="id-ref">#{s.id}</span>
                  </td>
                  <td style={{ whiteSpace: "normal" }}>{s.descricao}</td>
                  <td className="col-num">
                    <span className="amount">{formatCurrency(s.preco)}</span>
                  </td>
                  <td className="col-num">{formatDuration(s.duracaoHoras)}</td>
                  <td className="col-actions">
                    <Link
                      to={`/servico/editar/${s.id}`}
                      className="btn-link"
                    >
                      <i className="bi bi-pencil" style={{ marginRight: 4 }}></i>Editar
                    </Link>
                    <span className="action-separator">·</span>
                    <button
                      onClick={() => handleDeletar(s.id)}
                      className="btn-link btn-link-danger"
                    >
                      <i className="bi bi-trash" style={{ marginRight: 4 }}></i>Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <ConfirmModal
        isOpen={modalOpen}
        title="Confirmar exclusão"
        message="Tem certeza que deseja excluir este serviço? Esta ação não pode ser desfeita."
        onConfirm={confirmarExclusao}
        onCancel={() => {
          setModalOpen(false);
          setDeleteId(null);
        }}
      />
    </div>
  );
}

export default ServicoList;
