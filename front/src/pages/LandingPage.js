import React from "react";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div style={{ margin: "-32px -32px 0 -32px" }}>
      {/* ── Hero ── */}
      <section style={{
        background: "linear-gradient(135deg, #0d1b2a 0%, #1b4332 60%, #2d6a4f 100%)",
        padding: "60px 20px 80px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
          background: "radial-gradient(circle at 30% 40%, rgba(82,183,136,0.15) 0%, transparent 60%), radial-gradient(circle at 70% 60%, rgba(64,145,108,0.1) 0%, transparent 50%)",
          pointerEvents: "none",
        }}></div>
        <div style={{ position: "relative", zIndex: 1, maxWidth: 700, margin: "0 auto" }}>
          <i className="bi bi-heart-pulse" style={{
            fontSize: 48, color: "#52b788", marginBottom: 16, display: "block",
            animation: "float 3s ease-in-out infinite",
          }}></i>
          <h1 className="hero-title" style={{
            fontFamily: "'Sora', sans-serif", fontWeight: 700, color: "#ffffff",
            lineHeight: 1.15, marginBottom: 16,
          }}>
            Cuide dos pets com <span style={{ color: "#52b788" }}>excelência</span>
          </h1>
          <p className="hero-sub" style={{
            fontFamily: "'Inter', sans-serif", color: "rgba(255,255,255,0.7)",
            lineHeight: 1.6, marginBottom: 32, maxWidth: 520, marginLeft: "auto", marginRight: "auto",
          }}>
            Sistema completo para gerenciar serviços e atendimentos do seu pet shop.
            Simples, rápido e profissional.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <Link to="/servicos" className="hero-btn-primary" style={{
              background: "linear-gradient(135deg, #52b788, #2d6a4f)", color: "#fff", border: "none",
              borderRadius: 10, padding: "14px 28px", fontFamily: "'Inter', sans-serif", fontWeight: 600,
              fontSize: 15, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8,
              boxShadow: "0 4px 16px rgba(82,183,136,0.35)", transition: "all 0.25s ease",
            }}>
              <i className="bi bi-scissors"></i> Ver Serviços
            </Link>
            <Link to="/atendimentos" className="hero-btn-secondary" style={{
              background: "rgba(255,255,255,0.08)", color: "#ffffff",
              border: "1px solid rgba(255,255,255,0.2)", borderRadius: 10, padding: "14px 28px",
              fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 15, textDecoration: "none",
              display: "inline-flex", alignItems: "center", gap: 8, transition: "all 0.25s ease",
            }}>
              <i className="bi bi-clipboard-heart"></i> Ver Atendimentos
            </Link>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <div style={{ background: "#ffffff", borderTop: "1px solid #e0e8e4", borderBottom: "1px solid #e0e8e4" }}>
        <div className="stats-grid" style={{
          maxWidth: 1100, margin: "0 auto", padding: "36px 20px",
          display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20, textAlign: "center",
        }}>
          <div>
            <div style={{ fontFamily: "'Sora', sans-serif", fontSize: 32, fontWeight: 700, color: "#1b4332", lineHeight: 1 }}>100%</div>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "#52796f", marginTop: 6 }}>Gratuito</div>
          </div>
          <div>
            <div style={{ fontFamily: "'Sora', sans-serif", fontSize: 32, fontWeight: 700, color: "#1b4332", lineHeight: 1 }}>2</div>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "#52796f", marginTop: 6 }}>Módulos integrados</div>
          </div>
          <div>
            <div style={{ fontFamily: "'Sora', sans-serif", fontSize: 32, fontWeight: 700, color: "#1b4332", lineHeight: 1 }}>24/7</div>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "#52796f", marginTop: 6 }}>Disponível sempre</div>
          </div>
          <div>
            <div style={{ fontFamily: "'Sora', sans-serif", fontSize: 32, fontWeight: 700, color: "#52b788", lineHeight: 1 }}>
              <i className="bi bi-heart-fill"></i>
            </div>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "#52796f", marginTop: 6 }}>Feito com carinho</div>
          </div>
        </div>
      </div>

      {/* ── Features ── */}
      <section style={{ maxWidth: 1100, margin: "0 auto", padding: "48px 20px" }}>
        <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: 24, fontWeight: 700, color: "#0d1b2a", textAlign: "center", marginBottom: 8 }}>
          O que o sistema oferece
        </h2>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, color: "#52796f", textAlign: "center", marginBottom: 40 }}>
          Tudo que você precisa para gerenciar seu pet shop em um só lugar.
        </p>
        <div className="features-grid" style={{
          display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20,
        }}>
          {[
            { icon: "bi-scissors", bg: "#d8f3dc", clr: "#1b4332", title: "Serviços", desc: "Cadastre e gerencie todos os serviços oferecidos, com preços e duração controlados de forma simples." },
            { icon: "bi-clipboard-heart", bg: "#e8f0fe", clr: "#1b4332", title: "Atendimentos", desc: "Registre atendimentos para cada pet, com cálculo automático de valor total e tempo estimado." },
            { icon: "bi-speedometer2", bg: "#fff3cd", clr: "#7a5600", title: "Rápido e Eficiente", desc: "Interface moderna e intuitiva para agilizar o dia a dia do seu pet shop." },
          ].map((f, i) => (
            <div key={i} style={{
              background: "#ffffff", borderRadius: 12, padding: "28px 24px",
              border: "1px solid #e0e8e4",
              boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.06)",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
            }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.1)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.06)"; }}
            >
              <div style={{ width: 48, height: 48, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16, fontSize: 22, background: f.bg, color: f.clr }}>
                <i className={`bi ${f.icon}`}></i>
              </div>
              <div style={{ fontFamily: "'Sora', sans-serif", fontSize: 17, fontWeight: 600, color: "#0d1b2a", marginBottom: 8 }}>{f.title}</div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: "#52796f", lineHeight: 1.6 }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Responsive overrides */}
      <style>{`
        .hero-title { font-size: 42px; }
        .hero-sub { font-size: 18px; }
        @media (max-width: 768px) {
          .hero-title { font-size: 28px !important; }
          .hero-sub { font-size: 15px !important; }
          .hero-btn-primary, .hero-btn-secondary { justify-content: center; }
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .features-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 480px) {
          .hero-title { font-size: 24px !important; }
          .hero-sub { font-size: 14px !important; }
        }
      `}</style>
    </div>
  );
}

export default LandingPage;
