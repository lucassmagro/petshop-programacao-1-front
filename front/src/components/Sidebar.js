import React from "react";
import { Link, useLocation } from "react-router-dom";

const sidebarStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: 240,
  height: "100vh",
  background: "var(--brand)",
  borderRight: "1px solid var(--brand-2)",
  display: "flex",
  flexDirection: "column",
  zIndex: 1000,
};

const brandStyle = {
  padding: "28px 24px 20px",
  borderBottom: "1px solid rgba(255,255,255,0.08)",
};

const brandNameStyle = {
  fontWeight: 700,
  fontSize: 18,
  color: "#ffffff",
  margin: 0,
  lineHeight: 1,
};

const brandSubStyle = {
  fontWeight: 600,
  fontSize: 10,
  color: "#8fd3c2",
  textTransform: "uppercase",
  letterSpacing: "0.12em",
  marginTop: 6,
};

const navStyle = {
  padding: "20px 0",
  flex: 1,
};

const linkBase = {
  display: "flex",
  alignItems: "center",
  gap: 12,
  padding: "12px 20px",
  margin: "2px 12px",
  borderRadius: 4,
  textDecoration: "none",
  fontSize: 14,
  fontWeight: 500,
  transition: "all 0.2s ease",
  borderLeft: "3px solid transparent",
};

const linkInactive = {
  ...linkBase,
  color: "rgba(255,255,255,0.6)",
  background: "transparent",
};

const linkActive = {
  ...linkBase,
  color: "#ffffff",
  background: "rgba(255,255,255,0.12)",
  borderLeftColor: "var(--accent)",
};

const footerStyle = {
  padding: "16px 24px",
  borderTop: "1px solid rgba(255,255,255,0.08)",
};

const footerTextStyle = {
  fontSize: 10,
  color: "rgba(255,255,255,0.3)",
  margin: 0,
};

function Sidebar() {
  const location = useLocation();

  const isServicosActive =
    location.pathname === "/" || location.pathname.startsWith("/servico");
  const isAtendimentosActive =
    location.pathname.startsWith("/atendimento");

  const getLinkStyle = (active) => {
    const base = active ? linkActive : linkInactive;
    return base;
  };

  return (
    <div style={sidebarStyle}>
      <div style={brandStyle}>
        <div style={brandNameStyle}>PetShop</div>
        <div style={brandSubStyle}>Sistema de Gestao</div>
      </div>

      <nav style={navStyle}>
        <Link to="/" style={getLinkStyle(isServicosActive)}>
          <i className="bi bi-scissors" style={{ fontSize: 18 }}></i>
          Servicos
        </Link>
        <Link to="/atendimentos" style={getLinkStyle(isAtendimentosActive)}>
          <i className="bi bi-clipboard-heart" style={{ fontSize: 18 }}></i>
          Atendimentos
        </Link>
      </nav>

      <div style={footerStyle}>
        <p style={footerTextStyle}>v1.0.0</p>
        <p style={{ ...footerTextStyle, marginTop: 2 }}>PetShop &copy; 2026</p>
      </div>
    </div>
  );
}

export default Sidebar;
