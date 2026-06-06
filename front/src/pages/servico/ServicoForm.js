import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  criarServico,
  buscarServico,
  atualizarServico,
} from "../../services/servicoService";

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
        .then((res) => {
          setForm(res.data);
          setLoading(false);
        })
        .catch(() => {
          toast.error("Erro ao buscar serviço!");
          setLoading(false);
        });
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
          onClick={() => navigate("/servicos")}
        >
          Serviços
        </button>
        <span className="crumbs__sep">›</span>
        <span>{id ? `Editar serviço #${id}` : "Novo serviço"}</span>
      </nav>

      <div className="page-header">
        <h1 className="page-title">
          {id ? "Editar serviço" : "Novo serviço"}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="form">
        <div className="field">
          <label className="field-label">Descrição</label>
          <input
            name="descricao"
            value={form.descricao}
            onChange={handleChange}
            className="input"
            required
          />
        </div>

        <div className="field">
          <label className="field-label">Preço</label>
          <div className="field-affix">
            <span className="field-affix__label">R$</span>
            <input
              name="preco"
              type="number"
              step="0.01"
              value={form.preco}
              onChange={handleChange}
              className="input"
              required
            />
          </div>
        </div>

        <div className="field">
          <label className="field-label">Duração (horas)</label>
          <input
            name="duracaoHoras"
            type="number"
            step="0.5"
            value={form.duracaoHoras}
            onChange={handleChange}
            className="input"
            required
          />
          <p className="field-hint">
            Use frações para minutos — ex.: 0.5 = 30min, 1.5 = 1h 30min.
          </p>
        </div>

        <div className="form-actions">
          <button
            type="button"
            className="ui-btn ui-btn--secondary"
            onClick={() => navigate("/servicos")}
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

export default ServicoForm;
