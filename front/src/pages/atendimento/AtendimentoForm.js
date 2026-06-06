import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  criarAtendimento,
  buscarAtendimento,
  atualizarAtendimento,
} from "../../services/atendimentoService";
import { listarServicos } from "../../services/servicoService";

function formatCurrency(v) {
  return Number(v).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
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

  if (loading) {
    return (
      <div className="page-card">
        <div className="skeleton-row"></div>
        <div className="skeleton-row"></div>
        <div className="skeleton-row"></div>
      </div>
    );
  }

  return (
    <div className="page-card">
      <nav className="crumbs">
        <button
          type="button"
          className="crumbs__link"
          onClick={() => navigate("/atendimentos")}
        >
          Atendimentos
        </button>
        <span className="crumbs__sep">›</span>
        <span>{id ? `Editar atendimento #${id}` : "Novo atendimento"}</span>
      </nav>

      <div className="page-header">
        <h1 className="page-title">
          {id ? "Editar atendimento" : "Novo atendimento"}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="form">
        <div className="field">
          <label className="field-label">Nome do pet</label>
          <input
            name="nomePet"
            value={form.nomePet}
            onChange={handleChange}
            className="input"
            required
          />
        </div>

        <div className="field">
          <label className="field-label">Nome do dono</label>
          <input
            name="nomeDono"
            value={form.nomeDono}
            onChange={handleChange}
            className="input"
            required
          />
        </div>

        <div className="field">
          <label className="field-label">Serviço</label>
          <select
            name="idservico"
            value={form.idservico}
            onChange={handleChange}
            className="select"
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

        <div className="notice">
          <i className="bi bi-info-circle"></i>
          <span>
            O valor total e o tempo estimado são calculados automaticamente
            com base no serviço selecionado.
          </span>
        </div>

        <div className="form-actions" style={{ marginTop: 20 }}>
          <button
            type="button"
            className="ui-btn ui-btn--secondary"
            onClick={() => navigate("/atendimentos")}
          >
            Cancelar
          </button>
          <button type="submit" className="ui-btn ui-btn--primary">
            <i className="bi bi-check-lg"></i> Salvar
          </button>
        </div>
      </form>
    </div>
  );
}

export default AtendimentoForm;
