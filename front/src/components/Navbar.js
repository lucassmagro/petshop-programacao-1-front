import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { to: "/", label: "Início", match: (p) => p === "/" },
  { to: "/servicos", label: "Serviços", match: (p) => p.startsWith("/servico") },
  {
    to: "/atendimentos",
    label: "Atendimentos",
    match: (p) => p.startsWith("/atendimento"),
  },
];

const WEEKDAYS = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
const MONTHS = [
  "Jan", "Fev", "Mar", "Abr", "Mai", "Jun",
  "Jul", "Ago", "Set", "Out", "Nov", "Dez",
];

function formatToday() {
  const d = new Date();
  const wd = WEEKDAYS[d.getDay()];
  const dd = String(d.getDate()).padStart(2, "0");
  const mo = MONTHS[d.getMonth()];
  return `${wd}, ${dd} ${mo}. ${d.getFullYear()}`;
}

function Navbar() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const renderLinks = () =>
    navItems.map((item) => (
      <Link
        key={item.to}
        to={item.to}
        className={`nav-link${item.match(location.pathname) ? " active" : ""}`}
        onClick={() => setMenuOpen(false)}
      >
        {item.label}
      </Link>
    ));

  return (
    <nav className="appnav">
      <div className="appnav__content">
        <Link to="/" className="nav-brand">
          PetShop
        </Link>

        <div className="nav-links">{renderLinks()}</div>

        <span className="nav-date">{formatToday()}</span>

        <button
          className="nav-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          ☰
        </button>
      </div>

      {menuOpen && <div className="nav-links-mobile">{renderLinks()}</div>}

      <style>{`
        .appnav {
          position: sticky;
          top: 0;
          z-index: 1000;
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-bottom: 1px solid var(--color-border);
          box-shadow: 0 1px 3px rgba(0,0,0,0.02);
        }
        .appnav__content {
          height: 60px;
          display: flex;
          align-items: center;
          gap: 32px;
          padding: 0 32px;
          max-width: 1280px;
          margin: 0 auto;
        }
        .nav-brand {
          font-size: 16px;
          font-weight: 700;
          color: var(--color-accent);
          letter-spacing: -0.02em;
          text-decoration: none;
        }
        .nav-links {
          display: flex;
          align-items: center;
          gap: 28px;
        }
        .nav-link {
          font-size: 14px;
          font-weight: 500;
          color: var(--color-text-secondary);
          text-decoration: none;
          transition: color 0.2s ease;
        }
        .nav-link:hover { color: var(--color-text-primary); }
        .nav-link.active { color: var(--color-accent); font-weight: 600; }
        .nav-date {
          margin-left: auto;
          font-size: 13px;
          font-weight: 500;
          color: var(--color-text-muted);
          white-space: nowrap;
        }
        .nav-toggle {
          display: none;
          margin-left: auto;
          background: transparent;
          border: none;
          color: var(--color-text-primary);
          font-size: 20px;
          cursor: pointer;
          padding: 4px;
        }
        .nav-links-mobile {
          display: none;
          position: absolute;
          top: 60px;
          left: 0;
          right: 0;
          flex-direction: column;
          gap: 0;
          background: rgba(255, 255, 255, 0.98);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid var(--color-border);
          padding: 8px 32px 16px;
          box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);
          animation: fadeIn 0.15s ease;
        }
        .nav-links-mobile .nav-link { padding: 12px 0; border-bottom: 1px solid var(--color-border-light); }
        .nav-links-mobile .nav-link:last-child { border-bottom: none; }
        @media (max-width: 640px) {
          .appnav__content { gap: 16px; padding: 0 20px; height: 56px; }
          .nav-links, .nav-date { display: none; }
          .nav-toggle { display: block; }
          .nav-links-mobile { display: flex; padding: 4px 20px 12px; }
        }
      `}</style>
    </nav>
  );
}

export default Navbar;
