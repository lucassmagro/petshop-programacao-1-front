import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  criarServico,
  buscarServico,
  atualizarServico,
  listarServicos,
} from "../../services/servicoService";

function formatCurrency(v) {
  return Number(v).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

function ServicoForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    descricao: "",
    preco: "",
    duracaoHoras: "",
  });
  const [loading, setLoading] = useState(!!id);
  const [servicos, setServicos] = useState([]);

  useEffect(() => {
    // Carrega lista de serviços existentes para o sidebar
    listarServicos()
      .then((res) => setServicos(res.data || []))
      .catch(() => {});

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
      <div className="page">
        <div className="skeleton-row"></div>
        <div className="skeleton-row"></div>
        <div className="skeleton-row"></div>
      </div>
    );
  }

  return (
    <div className="page">
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

      <div className="form-layout">
        {/* Coluna esquerda — formulário */}
        <div className="form-layout__main">
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
                className="btn-secondary"
                onClick={() => navigate("/servicos")}
              >
                Cancelar
              </button>
              <button type="submit" className="btn-primary">
                Salvar
              </button>
            </div>
          </form>
        </div>

        {/* Coluna direita — serviços cadastrados */}
        <div className="form-layout__sidebar">
          <h3 className="sidebar-section-title">Serviços cadastrados</h3>
          {servicos.length === 0 ? (
            <p style={{ fontSize: 12, color: "var(--color-text-muted)" }}>
              Nenhum serviço cadastrado ainda.
            </p>
          ) : (
            <>
              <div className="table-responsive">
                <table className="data-table table-compact">
                  <thead>
                    <tr>
                      <th>Descrição</th>
                      <th className="col-num">Preço</th>
                    </tr>
                  </thead>
                  <tbody>
                    {servicos.map((s) => (
                      <tr key={s.id}>
                        <td style={{ whiteSpace: "normal" }}>{s.descricao}</td>
                        <td className="col-num">
                          <span className="amount">{formatCurrency(s.preco)}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="sidebar-total">
                Total: <strong>{servicos.length} serviço{servicos.length !== 1 ? "s" : ""}</strong>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ServicoForm;
