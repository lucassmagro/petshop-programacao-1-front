import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const navStyle = {
  position: "sticky",
  top: 0,
  zIndex: 1000,
  background: "linear-gradient(135deg, #0d1b2a 0%, #1b4332 100%)",
  boxShadow: "0 2px 12px rgba(0,0,0,0.15)",
};

const containerStyle = {
  maxWidth: 1100,
  margin: "0 auto",
  padding: "0 24px",
  display: "flex",
  alignItems: "center",
  height: 64,
  position: "relative",
};

const brandStyle = {
  display: "flex",
  alignItems: "baseline",
  gap: 10,
  textDecoration: "none",
};

const brandNameStyle = {
  fontFamily: "'Sora', sans-serif",
  fontWeight: 700,
  fontSize: 22,
  color: "#ffffff",
};

const brandSubStyle = {
  fontFamily: "'Inter', sans-serif",
  fontWeight: 400,
  fontSize: 10,
  color: "#74c69d",
  textTransform: "uppercase",
  letterSpacing: "1px",
};

const linksContainer = {
  display: "flex",
  alignItems: "center",
  gap: 4,
  marginLeft: "auto",
};

const linksContainerMobile = {
  position: "absolute",
  top: 64,
  left: 0,
  right: 0,
  background: "linear-gradient(135deg, #0d1b2a 0%, #1b4332 100%)",
  display: "flex",
  flexDirection: "column",
  padding: "8px 16px 16px",
  gap: 4,
  boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
  borderTop: "1px solid rgba(255,255,255,0.08)",
  animation: "fadeIn 0.2s ease",
};

const linkBase = {
  display: "flex",
  alignItems: "center",
  gap: 8,
  padding: "8px 16px",
  borderRadius: 8,
  textDecoration: "none",
  fontSize: 14,
  fontFamily: "'Inter', sans-serif",
  fontWeight: 500,
  transition: "all 0.2s ease",
};

const linkInactive = {
  ...linkBase,
  color: "rgba(255,255,255,0.65)",
  background: "transparent",
};

const linkActive = {
  ...linkBase,
  color: "#ffffff",
  background: "rgba(255,255,255,0.12)",
};

const hamburgerStyle = {
  display: "none",
  background: "transparent",
  border: "none",
  color: "#ffffff",
  fontSize: 24,
  cursor: "pointer",
  marginLeft: "auto",
  padding: "4px 8px",
};

function Navbar() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const isHome = location.pathname === "/";
  const isServicos = location.pathname.startsWith("/servico");
  const isAtendimentos = location.pathname.startsWith("/atendimento");

  const getLinkStyle = (active) => (active ? linkActive : linkInactive);

  const handleLinkClick = () => setMenuOpen(false);

  const links = (
    <>
      <Link to="/" style={getLinkStyle(isHome && !isServicos && !isAtendimentos)} onClick={handleLinkClick}>
        <i className="bi bi-house-door" style={{ fontSize: 16 }}></i>
        Início
      </Link>
      <Link to="/servicos" style={getLinkStyle(isServicos)} onClick={handleLinkClick}>
        <i className="bi bi-scissors" style={{ fontSize: 16 }}></i>
        Serviços
      </Link>
      <Link to="/atendimentos" style={getLinkStyle(isAtendimentos)} onClick={handleLinkClick}>
        <i className="bi bi-clipboard-heart" style={{ fontSize: 16 }}></i>
        Atendimentos
      </Link>
    </>
  );

  return (
    <nav style={navStyle}>
      <div style={containerStyle}>
        <Link to="/" style={brandStyle}>
          <span style={brandNameStyle}>PetShop</span>
          <span style={brandSubStyle}>Gestão</span>
        </Link>

        {/* Desktop links */}
        <div className="nav-links-desktop" style={linksContainer}>
          {links}
        </div>

        {/* Hamburger button */}
        <button
          className="nav-hamburger"
          style={hamburgerStyle}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <i className={`bi ${menuOpen ? "bi-x-lg" : "bi-list"}`}></i>
        </button>

        {/* Mobile dropdown */}
        {menuOpen && (
          <div className="nav-links-mobile" style={linksContainerMobile}>
            {links}
          </div>
        )}
      </div>

      {/* Inline responsive styles */}
      <style>{`
        @media (max-width: 768px) {
          .nav-links-desktop { display: none !important; }
          .nav-hamburger { display: block !important; }
        }
        @media (min-width: 769px) {
          .nav-links-mobile { display: none !important; }
          .nav-hamburger { display: none !important; }
        }
      `}</style>
    </nav>
  );
}

export default Navbar;
