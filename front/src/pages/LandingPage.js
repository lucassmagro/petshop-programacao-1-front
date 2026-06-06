import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { listarServicos } from "../services/servicoService";
import { listarAtendimentos } from "../services/atendimentoService";

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

const fluxo = [
  { title: "Cadastro", desc: "Defina descrição e preço.", active: false },
  { title: "Atendimento", desc: "Informe pet e dono.", active: true },
  { title: "Cálculo", desc: "Valor total gerado.", active: false },
  { title: "Finalização", desc: "Serviço concluído.", active: false },
];

function LandingPage() {
  const [servicos, setServicos] = useState([]);
  const [atendimentos, setAtendimentos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([listarServicos(), listarAtendimentos()])
      .then(([rs, ra]) => {
        setServicos(rs.data || []);
        setAtendimentos(ra.data || []);
      })
      .catch(() => {
        /* falha silenciosa no portal */
      })
      .finally(() => setLoading(false));
  }, []);

  const totalServicos = servicos.length;
  const totalAtendimentos = atendimentos.length;
  const faturamento = atendimentos.reduce(
    (acc, a) => acc + Number(a.valorTotal || 0),
    0,
  );

  return (
    <div className="page home">
      {/* ── Cabeçalho do painel ── */}
      <div className="page-header">
        <div>
          <h1 className="page-title">PetShop</h1>
          <p className="page-description">
            Visão geral e controle rápido de serviços e atendimentos.
          </p>
        </div>
      </div>

      <div className="home__row">
        {/* Serviços disponíveis */}
        <section className="home__panel home__panel--main">
          <div className="home__panel-head">
            <h2 className="section-label">Serviços disponíveis</h2>
            <Link to="/servicos" className="home__manage-link">
              Ver todos →
            </Link>
          </div>
          <div className="home__panel-body">
            {loading ? (
              <div>
                <div className="skeleton-row"></div>
                <div className="skeleton-row"></div>
              </div>
            ) : totalServicos === 0 ? (
              <div className="empty-state">
                <p className="empty-state__title">Nenhum serviço cadastrado.</p>
                <p className="empty-state__hint">
                  <Link to="/servico/novo" style={{ color: "var(--color-accent)", textDecoration: "none" }}>
                    Cadastrar o primeiro
                  </Link>
                </p>
              </div>
            ) : (
              <div className="table-responsive" style={{ boxShadow: "none", border: "1px solid var(--color-border-light)", borderRadius: 8 }}>
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Serviço</th>
                      <th className="col-num">Preço</th>
                      <th className="col-num">Duração</th>
                    </tr>
                  </thead>
                  <tbody>
                    {servicos.slice(0, 5).map((s) => (
                      <tr key={s.id}>
                        <td>{s.descricao}</td>
                        <td className="col-num">
                          <span className="amount">
                            {formatCurrency(s.preco)}
                          </span>
                        </td>
                        <td className="col-num">
                          {formatDuration(s.duracaoHoras)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </section>

        {/* Resumo do dia */}
        <aside className="home__panel home__panel--side">
          <h2 className="section-label" style={{ marginBottom: 16 }}>Resumo operacional</h2>
          <dl className="kv">
            <div className="kv__row">
              <dt>Serviços disponíveis</dt>
              <dd>{loading ? "—" : totalServicos}</dd>
            </div>
            <div className="kv__row">
              <dt>Atendimentos hoje</dt>
              <dd>{loading ? "—" : totalAtendimentos}</dd>
            </div>
            <div className="kv__row kv__row--total">
              <dt>Total faturado</dt>
              <dd>{loading ? "—" : formatCurrency(faturamento)}</dd>
            </div>
          </dl>
          
          <div style={{ marginTop: "auto", paddingTop: 24 }}>
            <Link to="/atendimento/novo" className="btn-primary" style={{ width: "100%", justifyContent: "center" }}>
              Registrar novo atendimento
            </Link>
          </div>
        </aside>
      </div>

      <div className="home__row">
        {/* Fluxo de Atendimento (Timeline Stepper) */}
        <section className="home__panel home__panel--main">
          <h2 className="section-label" style={{ marginBottom: 24 }}>Fluxo de atendimento</h2>
          <div className="timeline">
            {fluxo.map((step, i) => (
              <div className={`timeline-item ${step.active ? "active" : ""}`} key={i}>
                <div className="timeline-marker">
                  <div className="timeline-dot">{i + 1}</div>
                  {i < fluxo.length - 1 && <div className="timeline-line"></div>}
                </div>
                <div className="timeline-content">
                  <span className="timeline-title">{step.title}</span>
                  <span className="timeline-desc">{step.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Acesso rápido */}
        <aside className="home__panel home__panel--side">
          <h2 className="section-label" style={{ marginBottom: 16 }}>Acesso rápido</h2>
          <nav className="quick">
            <Link to="/servicos" className="quick__item">
              <i className="bi bi-card-list" style={{ marginRight: 8 }}></i>
              Lista de Serviços
            </Link>
            <Link to="/servico/novo" className="quick__item">
              <i className="bi bi-plus-circle" style={{ marginRight: 8 }}></i>
              Cadastrar Serviço
            </Link>
            <Link to="/atendimentos" className="quick__item">
              <i className="bi bi-clock-history" style={{ marginRight: 8 }}></i>
              Histórico de Atendimentos
            </Link>
          </nav>
        </aside>
      </div>

      <style>{`
        /* ── Linhas do Grid ── */
        .home__row {
          display: grid;
          grid-template-columns: minmax(0, 1fr) 340px;
          gap: var(--space-xl);
          margin-bottom: var(--space-xl);
          align-items: stretch;
        }

        /* ── Painéis com alturas alinhadas ── */
        .home__panel {
          display: flex;
          flex-direction: column;
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: 12px;
          padding: var(--space-xl);
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px -1px rgba(0, 0, 0, 0.02);
        }
        
        .home__panel-head {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          margin-bottom: var(--space-lg);
        }
        .home__manage-link {
          font-size: 13px;
          font-weight: 500;
          color: var(--color-accent);
          text-decoration: none;
          transition: color 0.2s ease;
        }
        .home__manage-link:hover {
          color: var(--color-accent-hover);
          text-decoration: underline;
        }

        /* ── Coluna Lateral (KV) ── */
        .kv { display: flex; flex-direction: column; flex-grow: 1; }
        .kv__row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 0;
          border-bottom: 1px dashed var(--color-border);
          font-size: 14px;
        }
        .kv__row:last-child { border-bottom: none; }
        .kv dt { color: var(--color-text-secondary); font-weight: 500; }
        .kv dd {
          font-weight: 600;
          color: var(--color-text-primary);
          font-variant-numeric: tabular-nums;
        }
        .kv__row--total {
          margin-top: auto;
          background: var(--color-table-row-hover);
          padding: 16px;
          border-radius: 8px;
          border-bottom: none;
        }
        .kv__row--total dt { color: var(--color-text-primary); }
        .kv__row--total dd {
          font-weight: 700;
          font-size: 16px;
          color: var(--color-accent);
        }

        /* Acesso rápido */
        .quick { display: flex; flex-direction: column; gap: 8px; }
        .quick__item {
          display: flex;
          align-items: center;
          padding: 12px 16px;
          border-radius: 8px;
          color: var(--color-text-secondary);
          background: var(--color-bg);
          border: 1px solid var(--color-border-light);
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
          transition: all 0.2s ease;
        }
        .quick__item:hover { 
          color: var(--color-accent);
          border-color: var(--color-accent-dim);
          background: var(--color-surface);
          box-shadow: 0 2px 4px rgba(0,0,0,0.02);
          transform: translateY(-1px);
        }

        /* ── Timeline Stepper ── */
        .timeline {
          display: flex;
          justify-content: space-between;
          position: relative;
          margin-top: auto;
          margin-bottom: auto;
          padding: 16px 0;
        }
        .timeline-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          flex: 1;
          position: relative;
        }
        .timeline-marker {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          margin-bottom: 16px;
        }
        .timeline-dot {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: var(--color-surface);
          border: 2px solid var(--color-border);
          color: var(--color-text-muted);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: 600;
          position: relative;
          z-index: 2;
          transition: all 0.3s ease;
        }
        .timeline-line {
          position: absolute;
          top: 50%;
          left: calc(50% + 14px);
          right: calc(-50% + 14px);
          height: 2px;
          background: var(--color-border);
          z-index: 1;
        }
        .timeline-content {
          padding: 0 12px;
        }
        .timeline-title {
          display: block;
          font-size: 14px;
          font-weight: 600;
          color: var(--color-text-primary);
          margin-bottom: 4px;
        }
        .timeline-desc {
          display: block;
          font-size: 13px;
          color: var(--color-text-secondary);
          line-height: 1.4;
        }
        
        @media (max-width: 920px) {
          .home__row { grid-template-columns: 1fr; gap: var(--space-lg); }
          .timeline { flex-direction: column; align-items: flex-start; gap: 24px; }
          .timeline-item { flex-direction: row; text-align: left; align-items: flex-start; }
          .timeline-marker { width: auto; margin-bottom: 0; margin-right: 16px; flex-direction: column; }
          .timeline-line { left: 50%; top: calc(50% + 14px); bottom: calc(-100% - 14px); width: 2px; height: auto; right: auto; }
        }
      `}</style>
    </div>
  );
}

export default LandingPage;
