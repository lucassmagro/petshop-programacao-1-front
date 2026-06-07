import React from "react";

function Footer() {
  return (
    <footer style={footerStyle}>
      <div style={contentStyle}>
        <div style={brandStyle}>
          <span style={logoTextStyle}>PetShop</span>
          <p style={footerTextStyle}>
            feito com &lt;3 por Lucas Santos Magro |{" "}
            <a 
              href="https://github.com/lucassmagro/petshop-programacao-1-front" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ color: "inherit", textDecoration: "underline" }}
            >
              Repositório no GitHub
            </a>
          </p>
        </div>
        <div style={copyStyle}>
          <p style={{ ...footerTextStyle, marginTop: 2 }}>PetShop &copy; {new Date().getFullYear()}</p>
        </div>
      </div>
    </footer>
  );
}

const footerStyle = {
  marginTop: "auto",
  borderTop: "1px solid var(--color-border)",
  background: "var(--color-surface)",
  padding: "32px 0",
};

const contentStyle = {
  maxWidth: 1280,
  margin: "0 auto",
  padding: "0 32px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexWrap: "wrap",
  gap: 20,
};

const brandStyle = {
  display: "flex",
  flexDirection: "column",
  gap: 4,
};

const logoTextStyle = {
  fontSize: 14,
  fontWeight: 600,
  color: "var(--color-text-primary)",
  letterSpacing: "-0.02em",
};

const footerTextStyle = {
  fontSize: 13,
  color: "var(--color-text-muted)",
  margin: 0,
};

const copyStyle = {
  textAlign: "right",
};

export default Footer;
