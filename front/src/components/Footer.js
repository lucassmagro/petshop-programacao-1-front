import React from "react";

function Footer() {
  return (
    <footer className="appfooter">
      <span>PetShop Gestão · Sistema de controle de serviços e atendimentos</span>
      <span>v1.0 · Lucas Santos Magro</span>

      <style>{`
        .appfooter {
          border-top: 1px solid var(--color-border);
          background: var(--color-surface);
          padding: 10px 32px;
          display: flex;
          justify-content: space-between;
          gap: 12px;
          flex-wrap: wrap;
          font-size: 11px;
          color: var(--color-text-muted);
        }
        @media (max-width: 640px) {
          .appfooter { padding: 10px 16px; }
        }
      `}</style>
    </footer>
  );
}

export default Footer;
