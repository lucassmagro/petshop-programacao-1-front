import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  listarAtendimentos,
  deletarAtendimento,
} from "../../services/atendimentoService";
import ConfirmModal from "../../components/ConfirmModal";

/* ── style tokens ── */
const tableStyle = { width: "100%", borderCollapse: "separate", borderSpacing: 0, animation: "fadeIn 0.3s ease", minWidth: 800 };
const thStyle = { padding: "12px 16px", fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.6px", color: "#52796f", background: "#f7faf8", borderBottom: "2px solid #e0e8e4", whiteSpace: "nowrap" };
const tdStyle = { padding: "14px 16px", fontFamily: "'Inter', sans-serif", fontSize: 14, color: "#0d1b2a", verticalAlign: "middle", borderBottom: "1px solid #f0f4f0", whiteSpace: "nowrap" };
const idPill = { background: "#f0f4f0", color: "#52796f", padding: "2px 8px", borderRadius: 20, fontSize: 12, fontWeight: 600, fontFamily: "monospace" };
const priceStyle = { fontWeight: 600, color: "#1b4332" };
const durationBadge = { background: "#d8f3dc", color: "#1b4332", padding: "3px 10px", borderRadius: 20, fontSize: 12, fontWeight: 500 };
const btnPrimary = { background: "linear-gradient(135deg, #2d6a4f, #1b4332)", color: "#fff", border: "none", borderRadius: 8, padding: "10px 20px", fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 14, boxShadow: "0 2px 8px rgba(29,99,66,0.25)", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8, transition: "all 0.2s ease" };
const btnEdit = { background: "transparent", border: "1px solid #e9c46a", color: "#b78900", borderRadius: 6, padding: "5px 12px", fontSize: 13, fontWeight: 500, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 4, transition: "all 0.15s", cursor: "pointer" };
const btnDel = { background: "transparent", border: "1px solid #f4a0a0", color: "#d62828", borderRadius: 6, padding: "5px 12px", fontSize: 13, fontWeight: 500, display: "inline-flex", alignItems: "center", gap: 4, transition: "all 0.15s", cursor: "pointer" };

const shimmerRow = {
  height: 48,
  background: "linear-gradient(90deg, #f0f4f0 25%, #e0e8e4 50%, #f0f4f0 75%)",
  backgroundSize: "200% 100%",
  animation: "shimmer 1.5s infinite",
  borderRadius: 6,
  marginBottom: 8,
};

function formatDuration(h) {
  const hours = Math.floor(h);
  const mins = Math.round((h - hours) * 60);
  if (hours === 0) return `${mins}min`;
  if (mins === 0) return `${hours}h`;
  return `${hours}h ${mins}min`;
}

function formatCurrency(v) {
  return Number(v).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function AtendimentoList() {
  const [atendimentos, setAtendimentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

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

  return (
    <div className="page-card">
      <div className="page-header">
        <div>
          <h1 className="page-title">Atendimentos</h1>
          <p className="page-subtitle">Gerencie os atendimentos realizados.</p>
        </div>
        <Link to="/atendimento/novo" style={btnPrimary}>
          <i className="bi bi-plus-lg"></i> Novo Atendimento
        </Link>
      </div>

      {loading ? (
        <div>
          <div style={shimmerRow}></div>
          <div style={shimmerRow}></div>
          <div style={shimmerRow}></div>
        </div>
      ) : atendimentos.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px 20px", color: "#52796f" }}>
          <i className="bi bi-inbox" style={{ fontSize: 48, color: "#b7d5c4", display: "block", marginBottom: 16 }}></i>
          <p style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: 16, color: "#2d6a4f", margin: 0 }}>
            Nenhum atendimento cadastrado.
          </p>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: "#74c69d", marginTop: 6 }}>
            Clique em "Novo Atendimento" para adicionar o primeiro registro.
          </p>
        </div>
      ) : (
        <div className="table-responsive">
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>ID</th>
                <th style={thStyle}>Pet</th>
                <th style={thStyle}>Dono</th>
                <th style={thStyle}>Serviço</th>
                <th style={thStyle}>Valor Total</th>
                <th style={thStyle}>Tempo Est.</th>
                <th style={{ ...thStyle, textAlign: "right" }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {atendimentos.map((a) => (
                <tr key={a.id} style={{ transition: "background 0.15s ease" }} onMouseEnter={(e) => e.currentTarget.style.background = "#f7faf8"} onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}>
                  <td style={tdStyle}><span style={idPill}>#{a.id}</span></td>
                  <td style={tdStyle}>{a.nomePet}</td>
                  <td style={tdStyle}>{a.nomeDono}</td>
                  <td style={tdStyle}><span style={idPill}>#{a.idservico}</span></td>
                  <td style={tdStyle}><span style={priceStyle}>{formatCurrency(a.valorTotal)}</span></td>
                  <td style={tdStyle}><span style={durationBadge}>{formatDuration(a.tempoEstimado)}</span></td>
                  <td style={{ ...tdStyle, textAlign: "right" }}>
                    <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
                      <Link to={`/atendimento/editar/${a.id}`} style={btnEdit}>
                        <i className="bi bi-pencil-fill" style={{ fontSize: 12 }}></i> Editar
                      </Link>
                      <button onClick={() => handleDeletar(a.id)} style={btnDel}>
                        <i className="bi bi-trash3-fill" style={{ fontSize: 12 }}></i> Excluir
                      </button>
                    </div>
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
        onCancel={() => { setModalOpen(false); setDeleteId(null); }}
      />
    </div>
  );
}

export default AtendimentoList;
