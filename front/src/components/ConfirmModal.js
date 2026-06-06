import React, { useEffect } from "react";

function ConfirmModal({ isOpen, title, message, onConfirm, onCancel }) {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onCancel();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleEsc);
    }
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <div style={headerStyle}>
          <span style={{ color: "var(--color-danger)", fontSize: 14, fontWeight: 600 }}>⚠</span>
          <h3 style={titleStyle}>{title}</h3>
        </div>
        <div style={bodyStyle}>
          <p style={messageStyle}>{message}</p>
        </div>
        <div style={footerStyle}>
          <button style={btnCancelStyle} onClick={onCancel}>
            Cancelar
          </button>
          <button style={btnConfirmStyle} onClick={onConfirm}>
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
}

const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: "rgba(0, 0, 0, 0.7)",
  backdropFilter: "blur(4px)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 9999,
};

const modalStyle = {
  background: "var(--color-surface)",
  border: "1px solid var(--color-border)",
  borderRadius: 8,
  width: "100%",
  maxWidth: 400,
  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.5)",
  overflow: "hidden",
  animation: "modalIn 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
};

const headerStyle = {
  padding: "20px 24px 12px",
  display: "flex",
  alignItems: "center",
  gap: 10,
};

const titleStyle = {
  fontSize: 14,
  fontWeight: 600,
  color: "var(--color-text-primary)",
  margin: 0,
};

const bodyStyle = {
  padding: "0 24px 24px",
};

const messageStyle = {
  fontSize: 13,
  color: "var(--color-text-secondary)",
  margin: 0,
  lineHeight: 1.5,
};

const footerStyle = {
  padding: "16px 24px",
  background: "var(--color-bg)",
  borderTop: "1px solid var(--color-border)",
  display: "flex",
  justifyContent: "flex-end",
  gap: 12,
};

const btnCancelStyle = {
  background: "transparent",
  color: "var(--color-text-secondary)",
  border: "1px solid var(--color-border)",
  borderRadius: 4,
  padding: "6px 14px",
  fontSize: 13,
  cursor: "pointer",
  transition: "all 0.2s ease",
};

const btnConfirmStyle = {
  background: "var(--color-danger)",
  color: "#ffffff",
  border: "1px solid var(--color-danger)",
  borderRadius: 4,
  padding: "6px 14px",
  fontSize: 13,
  fontWeight: 500,
  cursor: "pointer",
  transition: "all 0.2s ease",
};

export default ConfirmModal;
