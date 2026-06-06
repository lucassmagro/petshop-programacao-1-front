import React, { useState, useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  criarAtendimento,
  buscarAtendimento,
  atualizarAtendimento,
  listarAtendimentos,
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
  const [atendimentos, setAtendimentos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Carrega lista de serviços para o select
    listarServicos()
      .then((res) => setServicos(res.data || []))
      .catch(() => toast.error("Erro ao carregar serviços!"));

    // Carrega últimos atendimentos para o sidebar
    listarAtendimentos()
      .then((res) => setAtendimentos(res.data || []))
      .catch(() => {});

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

  // Mapa de ID → descrição do serviço para lookup no sidebar
  const servicoMap = useMemo(() => {
    const map = {};
    servicos.forEach((s) => {
      map[s.id] = s.descricao;
    });
    return map;
  }, [servicos]);

  const totalAcumulado = useMemo(
    () => atendimentos.reduce((acc, a) => acc + Number(a.valorTotal || 0), 0),
    [atendimentos],
  );

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

      <div className="form-layout">
        {/* Coluna esquerda — formulário */}
        <div className="form-layout__main">
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

            <div className="info-block">
              O valor total e o tempo estimado são calculados automaticamente
              com base no serviço selecionado.
            </div>

            <div className="form-actions" style={{ marginTop: 20 }}>
              <button
                type="button"
                className="btn-secondary"
                onClick={() => navigate("/atendimentos")}
              >
                Cancelar
              </button>
              <button type="submit" className="btn-primary">
                Salvar
              </button>
            </div>
          </form>
        </div>

        {/* Coluna direita — últimos atendimentos */}
        <div className="form-layout__sidebar">
          <h3 className="sidebar-section-title">Últimos atendimentos</h3>
          {atendimentos.length === 0 ? (
            <p style={{ fontSize: 12, color: "var(--color-text-muted)" }}>
              Nenhum atendimento registrado ainda.
            </p>
          ) : (
            <>
              <div className="table-responsive">
                <table className="data-table table-compact">
                  <thead>
                    <tr>
                      <th>Pet</th>
                      <th>Serviço</th>
                      <th className="col-num">Valor</th>
                    </tr>
                  </thead>
                  <tbody>
                    {atendimentos.slice(0, 8).map((a) => (
                      <tr key={a.id}>
                        <td>{a.nomePet}</td>
                        <td style={{ color: "var(--color-text-secondary)" }}>
                          {servicoMap[a.idservico] || `#${a.idservico}`}
                        </td>
                        <td className="col-num">
                          <span className="amount">{formatCurrency(a.valorTotal)}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="sidebar-total">
                Total acumulado: <strong>{formatCurrency(totalAcumulado)}</strong>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default AtendimentoForm;
