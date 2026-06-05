import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  criarAtendimento,
  buscarAtendimento,
  atualizarAtendimento,
} from "../../services/atendimentoService";
import { listarServicos } from "../../services/servicoService";

/* ── style tokens ── */
const labelStyle = { fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 600, color: "#2d6a4f", marginBottom: 6, display: "block" };
const inputStyle = { width: "100%", padding: "10px 14px", border: "1.5px solid #e0e8e4", borderRadius: 8, fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 400, color: "#0d1b2a", background: "#fff", transition: "border-color 0.2s, box-shadow 0.2s", outline: "none" };
const inputFocusStyle = { borderColor: "#40916c", boxShadow: "0 0 0 3px rgba(64,145,108,0.12)" };
const selectStyle = { ...inputStyle, appearance: "auto" };
const btnSave = { background: "linear-gradient(135deg, #2d6a4f, #1b4332)", color: "#fff", border: "none", borderRadius: 8, padding: "10px 20px", fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 14, boxShadow: "0 2px 8px rgba(29,99,66,0.25)", cursor: "pointer", transition: "all 0.2s ease", flex: "none" };
const btnCancel = { background: "#ffffff", color: "#52796f", border: "1px solid #e0e8e4", borderRadius: 8, padding: "10px 20px", fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 14, cursor: "pointer", transition: "background 0.15s", textDecoration: "none", display: "inline-block", textAlign: "center", flex: "none" };
const breadcrumbStyle = { fontSize: 13, color: "#74c69d", marginBottom: 8 };
const breadcrumbLink = { color: "#52796f", cursor: "pointer", textDecoration: "none" };
const breadcrumbSep = { margin: "0 8px", color: "#b7d5c4" };
const breadcrumbCurrent = { color: "#0d1b2a", fontWeight: 500 };
const alertStyle = { background: "#f0faf4", border: "1px solid #b7d5c4", borderRadius: 8, padding: "12px 16px", fontSize: 13, color: "#2d6a4f", marginTop: 8, display: "flex", alignItems: "flex-start", gap: 10 };

const shimmerRow = {
  height: 48,
  background: "linear-gradient(90deg, #f0f4f0 25%, #e0e8e4 50%, #f0f4f0 75%)",
  backgroundSize: "200% 100%",
  animation: "shimmer 1.5s infinite",
  borderRadius: 6,
  marginBottom: 8,
};

function formatCurrency(v) {
  return Number(v).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function AtendimentoForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nomePet: "",
    nomeDono: "",
    idservico: "",
  });
  const [servicos, setServicos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Carrega lista de serviços para o select
    listarServicos()
      .then((res) => setServicos(res.data))
      .catch(() => toast.error("Erro ao carregar serviços!"));

    // Se for edição, carrega dados do atendimento
    if (id) {
      buscarAtendimento(id)
        .then((res) =>
          setForm({
            nomePet: res.data.nomePet,
            nomeDono: res.data.nomeDono,
            idservico: res.data.idservico,
          }),
        )
        .catch(() => toast.error("Erro ao buscar atendimento!"));
    }

    setLoading(false);
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await atualizarAtendimento(id, form);
        toast.success("Atendimento atualizado com sucesso!");
      } else {
        await criarAtendimento(form);
        toast.success("Atendimento cadastrado com sucesso!");
      }
      navigate("/atendimentos");
    } catch (err) {
      toast.error("Erro ao salvar atendimento!");
    }
  };

  const handleFocus = (e) => {
    e.target.style.borderColor = inputFocusStyle.borderColor;
    e.target.style.boxShadow = inputFocusStyle.boxShadow;
  };
  const handleBlur = (e) => {
    e.target.style.borderColor = "#e0e8e4";
    e.target.style.boxShadow = "none";
  };

  if (loading) {
    return (
      <div className="page-card">
        <div style={shimmerRow}></div>
        <div style={shimmerRow}></div>
        <div style={shimmerRow}></div>
      </div>
    );
  }

  return (
    <div className="page-card">
      <nav style={breadcrumbStyle}>
        <span style={breadcrumbLink} onClick={() => navigate("/atendimentos")}>
          Atendimentos
        </span>
        <span style={breadcrumbSep}>&rsaquo;</span>
        <span style={breadcrumbCurrent}>
          {id ? "Editar Atendimento" : "Novo Atendimento"}
        </span>
      </nav>

      <h1 className="page-title" style={{ marginBottom: 24 }}>
        {id ? "Editar Atendimento" : "Novo Atendimento"}
      </h1>

      <form onSubmit={handleSubmit} className="form-container">
        <div style={{ marginBottom: 20 }}>
          <label style={labelStyle}>Nome do Pet</label>
          <input
            name="nomePet"
            value={form.nomePet}
            onChange={handleChange}
            style={inputStyle}
            onFocus={handleFocus}
            onBlur={handleBlur}
            required
          />
        </div>

        <div style={{ marginBottom: 20 }}>
          <label style={labelStyle}>Nome do Dono</label>
          <input
            name="nomeDono"
            value={form.nomeDono}
            onChange={handleChange}
            style={inputStyle}
            onFocus={handleFocus}
            onBlur={handleBlur}
            required
          />
        </div>

        <div style={{ marginBottom: 8 }}>
          <label style={labelStyle}>Serviço</label>
          <select
            name="idservico"
            value={form.idservico}
            onChange={handleChange}
            style={selectStyle}
            onFocus={handleFocus}
            onBlur={handleBlur}
            required
          >
            <option value="">Selecione um serviço</option>
            {servicos.map((s) => (
              <option key={s.id} value={s.id}>
                {s.descricao} — {formatCurrency(s.preco)} ({s.duracaoHoras}h)
              </option>
            ))}
          </select>
        </div>

        <div style={alertStyle}>
          <i className="bi bi-info-circle" style={{ fontSize: 16, color: "#2d6a4f", flexShrink: 0, marginTop: 1 }}></i>
          <span>O valor total e o tempo estimado serão calculados automaticamente com base no serviço selecionado.</span>
        </div>

        <div className="form-actions" style={{ marginTop: 28 }}>
          <button type="button" style={btnCancel} onClick={() => navigate("/atendimentos")}>
            Cancelar
          </button>
          <button type="submit" style={btnSave}>
            Salvar
          </button>
        </div>
      </form>

      <style>{`
        .form-container { max-width: 560px; }
        .form-actions { display: flex; justify-content: flex-end; gap: 10px; }
        @media (max-width: 768px) {
          .form-container { max-width: 100%; }
          .form-actions { flex-direction: column-reverse; }
          .form-actions button { width: 100%; }
        }
      `}</style>
    </div>
  );
}

export default AtendimentoForm;
