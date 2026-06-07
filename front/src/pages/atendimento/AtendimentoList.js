import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  listarAtendimentos,
  deletarAtendimento,
} from "../../services/atendimentoService";
import { listarServicos } from "../../services/servicoService";
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

function AtendimentoList() {
  const [atendimentos, setAtendimentos] = useState([]);
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
      const [resAtend, resServ] = await Promise.all([
        listarAtendimentos(),
        listarServicos(),
      ]);
      setAtendimentos(resAtend.data);
      setServicos(resServ.data || []);
    } catch (err) {
      toast.error("Erro ao carregar atendimentos!");
    } finally {
      setLoading(false);
    }
  };

  const servicoMap = useMemo(() => {
    const map = {};
    servicos.forEach((s) => {
      map[s.id] = s.descricao;
    });
    return map;
  }, [servicos]);

  const handleDeletar = (id) => {
    setDeleteId(id);
    setModalOpen(true);
  };

  const confirmarExclusao = async () => {
    try {
      await deletarAtendimento(deleteId);
      toast.success("Atendimento excluído com sucesso!");
      carregar();
    } catch (err) {
      toast.error("Erro ao excluir atendimento!");
    } finally {
      setModalOpen(false);
      setDeleteId(null);
    }
  };

  const filtrados = useMemo(() => {
    const termo = busca.trim().toLowerCase();
    if (!termo) return atendimentos;
    return atendimentos.filter(
      (a) =>
        String(a.nomePet).toLowerCase().includes(termo) ||
        String(a.nomeDono).toLowerCase().includes(termo),
    );
  }, [atendimentos, busca]);

  const totalPeriodo = useMemo(
    () => filtrados.reduce((acc, a) => acc + Number(a.valorTotal || 0), 0),
    [filtrados],
  );

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Atendimentos</h1>
          <p className="page-subtitle">
            Registro dos atendimentos realizados no pet shop.
          </p>
        </div>
        <Link to="/atendimento/novo" className="btn-primary">
          Novo atendimento
        </Link>
      </div>

      {!loading && atendimentos.length > 0 && (
        <div className="filter-bar">
          <div className="search-box">
            <i className="bi bi-search"></i>
            <input
              type="text"
              placeholder="Buscar por pet ou dono..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
          </div>
          <span className="result-count">
            {filtrados.length} de {atendimentos.length}{" "}
            {atendimentos.length === 1 ? "registro" : "registros"} · total{" "}
            <strong>{formatCurrency(totalPeriodo)}</strong>
          </span>
        </div>
      )}

      {loading ? (
        <div>
          <div className="skeleton-row"></div>
          <div className="skeleton-row"></div>
          <div className="skeleton-row"></div>
        </div>
      ) : atendimentos.length === 0 ? (
        <div className="empty-state">
          <p className="empty-state__title">Nenhum atendimento cadastrado.</p>
          <p className="empty-state__hint">
            Clique em "Novo atendimento" para adicionar o primeiro registro.
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
                <th>Pet</th>
                <th>Dono</th>
                <th>Serviço</th>
                <th className="col-num">Valor total</th>
                <th className="col-num">Tempo est.</th>
                <th className="col-actions" style={{ width: 120 }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filtrados.map((a) => (
                <tr key={a.id}>
                  <td>
                    <span className="id-ref">#{a.id}</span>
                  </td>
                  <td style={{ fontWeight: 500, color: "var(--color-text-primary)" }}>{a.nomePet}</td>
                  <td style={{ color: "var(--color-text-secondary)" }}>{a.nomeDono}</td>
                  <td style={{ color: "var(--color-text-secondary)" }}>
                    {servicoMap[a.idservico] || `Serviço #${a.idservico}`}
                  </td>
                  <td className="col-num">
                    <span className="amount">
                      {formatCurrency(a.valorTotal)}
                    </span>
                  </td>
                  <td className="col-num" style={{ color: "var(--color-text-secondary)" }}>{formatDuration(a.tempoEstimado)}</td>
                  <td className="col-actions">
                    <Link
                      to={`/atendimento/editar/${a.id}`}
                      className="btn-link"
                    >
                      <i className="bi bi-pencil" style={{ marginRight: 4 }}></i>Editar
                    </Link>
                    <span className="action-separator">·</span>
                    <button
                      onClick={() => handleDeletar(a.id)}
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
        message="Tem certeza que deseja excluir este atendimento? Esta ação não pode ser desfeita."
        onConfirm={confirmarExclusao}
        onCancel={() => {
          setModalOpen(false);
          setDeleteId(null);
        }}
      />
    </div>
  );
}

export default AtendimentoList;
