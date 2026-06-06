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
  { icon: "bi-list-check", title: "Cadastro do serviço", desc: "Defina descrição, preço e duração." },
  { icon: "bi-journal-plus", title: "Registro do atendimento", desc: "Informe pet, dono e serviço prestado." },
  { icon: "bi-calculator", title: "Cálculo automático", desc: "Valor total e tempo estimado gerados pelo sistema." },
  { icon: "bi-clock-history", title: "Histórico", desc: "Consulta dos atendimentos realizados." },
  { icon: "bi-check2-circle", title: "Finalização", desc: "Atendimento concluído e contabilizado." },
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
        /* falha silenciosa no portal; as telas próprias tratam o erro */
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
      {/* ── Identificação do sistema ── */}
      <div className="home__intro">
        <h1 className="page-title">Painel operacional</h1>
        <p className="home__lead">
          Sistema de gestão para controle de <strong>serviços</strong> e{" "}
          <strong>atendimentos</strong> do pet shop. Utilizado por atendentes,
          recepcionistas e responsáveis pelos serviços para registrar o
          trabalho do dia a dia e acompanhar o histórico de atendimentos.
        </p>
      </div>

      <div className="home__grid">
        {/* ── Coluna principal ── */}
        <div className="home__main">
          {/* Serviços disponíveis */}
          <section className="panel">
            <div className="panel__head">
              <h2>Serviços disponíveis</h2>
              <Link to="/servicos" className="panel__link">
                Gerenciar serviços
              </Link>
            </div>
            <div className="panel__body">
              {loading ? (
                <div>
                  <div className="skeleton-row"></div>
                  <div className="skeleton-row"></div>
                </div>
              ) : totalServicos === 0 ? (
                <p className="home__muted">
                  Nenhum serviço cadastrado.{" "}
                  <Link to="/servico/novo" className="panel__link">
                    Cadastrar o primeiro
                  </Link>
                  .
                </p>
              ) : (
                <div className="table-responsive">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Serviço</th>
                        <th className="col-num">Preço</th>
                        <th className="col-num">Duração</th>
                      </tr>
                    </thead>
                    <tbody>
                      {servicos.map((s) => (
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

          {/* Fluxo de atendimento */}
          <section className="panel">
            <div className="panel__head">
              <h2>Fluxo de atendimento</h2>
            </div>
            <div className="panel__body">
              <ol className="flow">
                {fluxo.map((step, i) => (
                  <li className="flow__step" key={i}>
                    <span className="flow__num">{i + 1}</span>
                    <div className="flow__text">
                      <span className="flow__title">
                        <i className={`bi ${step.icon}`}></i> {step.title}
                      </span>
                      <span className="flow__desc">{step.desc}</span>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </section>
        </div>

        {/* ── Coluna lateral ── */}
        <aside className="home__aside">
          {/* Informações operacionais (dados reais) */}
          <section className="panel">
            <div className="panel__head">
              <h2>Informações operacionais</h2>
            </div>
            <div className="panel__body">
              <dl className="kv">
                <div className="kv__row">
                  <dt>Serviços cadastrados</dt>
                  <dd>{loading ? "—" : totalServicos}</dd>
                </div>
                <div className="kv__row">
                  <dt>Atendimentos registrados</dt>
                  <dd>{loading ? "—" : totalAtendimentos}</dd>
                </div>
                <div className="kv__row">
                  <dt>Total dos atendimentos</dt>
                  <dd>{loading ? "—" : formatCurrency(faturamento)}</dd>
                </div>
              </dl>
            </div>
          </section>

          {/* Acesso rápido */}
          <section className="panel">
            <div className="panel__head">
              <h2>Acesso rápido</h2>
            </div>
            <nav className="quick">
              <Link to="/servicos" className="quick__item">
                <i className="bi bi-list-check"></i>
                <span>Serviços</span>
                <i className="bi bi-chevron-right quick__arrow"></i>
              </Link>
              <Link to="/servico/novo" className="quick__item">
                <i className="bi bi-plus-lg"></i>
                <span>Novo serviço</span>
                <i className="bi bi-chevron-right quick__arrow"></i>
              </Link>
              <Link to="/atendimentos" className="quick__item">
                <i className="bi bi-journal-text"></i>
                <span>Atendimentos</span>
                <i className="bi bi-chevron-right quick__arrow"></i>
              </Link>
              <Link to="/atendimento/novo" className="quick__item">
                <i className="bi bi-journal-plus"></i>
                <span>Novo atendimento</span>
                <i className="bi bi-chevron-right quick__arrow"></i>
              </Link>
            </nav>
          </section>
        </aside>
      </div>

      <style>{`
        .home__intro {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 6px;
          padding: 16px 20px;
          margin-bottom: 18px;
        }
        .home__lead {
          font-size: 14px;
          color: var(--text-2);
          max-width: 760px;
          margin-top: 6px;
        }
        .home__lead strong { color: var(--text); font-weight: 600; }
        .home__grid {
          display: grid;
          grid-template-columns: minmax(0, 1fr) 320px;
          gap: 18px;
          align-items: stretch;
        }
        .home__main, .home__aside {
          display: flex;
          flex-direction: column;
        }
        /* última seção de cada coluna cresce para alinhar as bases dos cards */
        .home__main > .panel:last-child,
        .home__aside > .panel:last-child {
          flex: 1;
        }
        .home__muted { color: var(--text-2); font-size: 13px; }

        /* Fluxo */
        .flow {
          list-style: none;
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 0;
        }
        .flow__step {
          display: flex;
          flex-direction: column;
          gap: 8px;
          padding: 0 16px;
          border-left: 1px solid var(--border);
        }
        .flow__step:first-child { border-left: none; padding-left: 0; }
        .flow__num {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 24px;
          height: 24px;
          border-radius: 4px;
          background: var(--accent-soft);
          color: var(--accent-2);
          font-size: 12px;
          font-weight: 700;
        }
        .flow__title {
          display: block;
          font-size: 13px;
          font-weight: 600;
          color: var(--text);
        }
        .flow__title .bi { color: var(--accent-2); margin-right: 2px; }
        .flow__desc {
          display: block;
          font-size: 12px;
          color: var(--text-2);
          margin-top: 2px;
        }

        /* Lista chave/valor */
        .kv { display: flex; flex-direction: column; }
        .kv__row {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          gap: 10px;
          padding: 9px 0;
          border-bottom: 1px solid var(--border);
        }
        .kv__row:last-child { border-bottom: none; }
        .kv dt { font-size: 13px; color: var(--text-2); }
        .kv dd {
          font-size: 15px;
          font-weight: 700;
          color: var(--text);
          font-variant-numeric: tabular-nums;
        }

        /* Acesso rápido */
        .quick { display: flex; flex-direction: column; }
        .quick__item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 11px 16px;
          border-bottom: 1px solid var(--border);
          color: var(--text);
          text-decoration: none;
          font-size: 13px;
          font-weight: 500;
        }
        .quick__item:last-child { border-bottom: none; }
        .quick__item:hover { background: var(--surface-2); }
        .quick__item > .bi:first-child { color: var(--accent-2); font-size: 15px; }
        .quick__arrow { margin-left: auto; color: var(--text-3); font-size: 12px; }

        @media (max-width: 920px) {
          .home__grid { grid-template-columns: 1fr; }
          .flow { grid-template-columns: 1fr 1fr; gap: 16px; }
          .flow__step { border-left: none; padding: 0; }
        }
        @media (max-width: 520px) {
          .flow { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}

export default LandingPage;
