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
      <Link to="/" className="nav-brand">
        PetShop Gestão
      </Link>

      <div className="nav-links">{renderLinks()}</div>

      <span className="nav-date">{formatToday()}</span>

      <button
        className="nav-toggle"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Menu"
      >
        <i className={`bi ${menuOpen ? "bi-x-lg" : "bi-list"}`}></i>
      </button>

      {menuOpen && <div className="nav-links-mobile">{renderLinks()}</div>}

      <style>{`
        .appnav {
          position: sticky;
          top: 0;
          z-index: 1000;
          background: var(--color-nav-bg);
          height: 44px;
          display: flex;
          align-items: center;
          gap: 32px;
          padding: 0 32px;
        }
        .nav-brand {
          font-size: 14px;
          font-weight: 600;
          color: #ffffff;
          letter-spacing: 0.01em;
          text-decoration: none;
        }
        .nav-links {
          display: flex;
          align-items: center;
          gap: 24px;
        }
        .nav-link {
          font-size: 13px;
          font-weight: 400;
          color: var(--color-nav-text);
          text-decoration: none;
        }
        .nav-link:hover { color: var(--color-nav-active); }
        .nav-link.active { color: var(--color-nav-active); font-weight: 500; }
        .nav-date {
          margin-left: auto;
          font-size: 12px;
          color: var(--color-nav-text);
          opacity: 0.7;
          white-space: nowrap;
        }
        .nav-toggle {
          display: none;
          margin-left: auto;
          background: transparent;
          border: none;
          color: #ffffff;
          font-size: 20px;
          cursor: pointer;
          padding: 2px 4px;
        }
        .nav-links-mobile {
          display: none;
          position: absolute;
          top: 44px;
          left: 0;
          right: 0;
          flex-direction: column;
          gap: 0;
          background: var(--color-nav-bg);
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          padding: 4px 32px 10px;
          animation: fadeIn 0.15s ease;
        }
        .nav-links-mobile .nav-link { padding: 9px 0; }
        @media (max-width: 640px) {
          .appnav { gap: 16px; padding: 0 16px; }
          .nav-links, .nav-date { display: none; }
          .nav-toggle { display: block; }
          .nav-links-mobile { display: flex; padding: 4px 16px 10px; }
        }
      `}</style>
    </nav>
  );
}

export default Navbar;
