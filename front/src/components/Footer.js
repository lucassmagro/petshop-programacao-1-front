import React from "react";

const footerStyle = {
  background: "linear-gradient(135deg, #0d1b2a 0%, #1b4332 100%)",
  padding: "24px 0",
  textAlign: "center",
};

const textStyle = {
  fontFamily: "'Inter', sans-serif",
  fontSize: 14,
  color: "rgba(255,255,255,0.55)",
  margin: 0,
};

const heartStyle = {
  color: "#52b788",
  fontSize: 14,
};

const nameStyle = {
  color: "#ffffff",
  fontWeight: 600,
};

function Footer() {
  return (
    <footer style={footerStyle}>
      <p style={textStyle}>
        Feito com <span style={heartStyle}>&lt;3</span> por{" "}
        <span style={nameStyle}>Lucas Santos Magro</span>
      </p>
    </footer>
  );
}

export default Footer;
