import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  criarServico,
  buscarServico,
  atualizarServico,
} from "../../services/servicoService";

/* ── style tokens ── */
const labelStyle = { fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 600, color: "#2d6a4f", marginBottom: 6, display: "block" };
const inputStyle = { width: "100%", padding: "10px 14px", border: "1.5px solid #e0e8e4", borderRadius: 8, fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 400, color: "#0d1b2a", background: "#fff", transition: "border-color 0.2s, box-shadow 0.2s", outline: "none" };
const inputFocusStyle = { borderColor: "#40916c", boxShadow: "0 0 0 3px rgba(64,145,108,0.12)" };
const prefixStyle = { background: "#f7faf8", border: "1.5px solid #e0e8e4", borderRight: "none", borderRadius: "8px 0 0 8px", padding: "10px 12px", fontSize: 13, fontWeight: 600, color: "#52796f", display: "flex", alignItems: "center" };
const inputWithPrefixStyle = { ...inputStyle, borderRadius: "0 8px 8px 0" };
const btnSave = { background: "linear-gradient(135deg, #2d6a4f, #1b4332)", color: "#fff", border: "none", borderRadius: 8, padding: "10px 20px", fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 14, boxShadow: "0 2px 8px rgba(29,99,66,0.25)", cursor: "pointer", transition: "all 0.2s ease", flex: "none" };
const btnCancel = { background: "#ffffff", color: "#52796f", border: "1px solid #e0e8e4", borderRadius: 8, padding: "10px 20px", fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 14, cursor: "pointer", transition: "background 0.15s", textDecoration: "none", display: "inline-block", textAlign: "center", flex: "none" };
const breadcrumbStyle = { fontSize: 13, color: "#74c69d", marginBottom: 8 };
const breadcrumbLink = { color: "#52796f", cursor: "pointer", textDecoration: "none" };
const breadcrumbSep = { margin: "0 8px", color: "#b7d5c4" };
const breadcrumbCurrent = { color: "#0d1b2a", fontWeight: 500 };

const shimmerRow = {
  height: 48,
  background: "linear-gradient(90deg, #f0f4f0 25%, #e0e8e4 50%, #f0f4f0 75%)",
  backgroundSize: "200% 100%",
  animation: "shimmer 1.5s infinite",
  borderRadius: 6,
  marginBottom: 8,
};

function ServicoForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    descricao: "",
    preco: "",
    duracaoHoras: "",
  });
  const [loading, setLoading] = useState(!!id);

  useEffect(() => {
    if (id) {
      buscarServico(id)
        .then((res) => { setForm(res.data); setLoading(false); })
        .catch(() => { toast.error("Erro ao buscar serviço!"); setLoading(false); });
    }
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await atualizarServico(id, form);
        toast.success("Serviço atualizado com sucesso!");
      } else {
        await criarServico(form);
        toast.success("Serviço cadastrado com sucesso!");
      }
      navigate("/servicos");
    } catch (err) {
      toast.error("Erro ao salvar serviço!");
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
        <span style={breadcrumbLink} onClick={() => navigate("/servicos")}>
          Serviços
        </span>
        <span style={breadcrumbSep}>&rsaquo;</span>
        <span style={breadcrumbCurrent}>
          {id ? "Editar Serviço" : "Novo Serviço"}
        </span>
      </nav>

      <h1 className="page-title" style={{ marginBottom: 24 }}>
        {id ? "Editar Serviço" : "Novo Serviço"}
      </h1>

      <form onSubmit={handleSubmit} className="form-container">
        <div style={{ marginBottom: 20 }}>
          <label style={labelStyle}>Descrição</label>
          <input
            name="descricao"
            value={form.descricao}
            onChange={handleChange}
            style={inputStyle}
            onFocus={handleFocus}
            onBlur={handleBlur}
            required
          />
        </div>

        <div style={{ marginBottom: 20 }}>
          <label style={labelStyle}>Preço</label>
          <div style={{ display: "flex" }}>
            <span style={prefixStyle}>R$</span>
            <input
              name="preco"
              type="number"
              step="0.01"
              value={form.preco}
              onChange={handleChange}
              style={inputWithPrefixStyle}
              onFocus={handleFocus}
              onBlur={handleBlur}
              required
            />
          </div>
        </div>

        <div style={{ marginBottom: 28 }}>
          <label style={labelStyle}>Duração (horas)</label>
          <input
            name="duracaoHoras"
            type="number"
            step="0.5"
            value={form.duracaoHoras}
            onChange={handleChange}
            style={inputStyle}
            onFocus={handleFocus}
            onBlur={handleBlur}
            required
          />
        </div>

        <div className="form-actions">
          <button type="button" style={btnCancel} onClick={() => navigate("/servicos")}>
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

export default ServicoForm;
