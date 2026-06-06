import React from "react";

const backdropStyle = {
  position: "fixed",
  inset: 0,
  background: "rgba(15, 23, 28, 0.45)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 2000,
  animation: "fadeIn 0.12s ease",
  padding: 16,
};

const modalBoxStyle = {
  background: "var(--surface)",
  border: "1px solid var(--border-2)",
  borderRadius: 6,
  width: "100%",
  maxWidth: 420,
  boxShadow: "0 12px 32px rgba(15, 23, 28, 0.18)",
};

const headStyle = {
  display: "flex",
  alignItems: "center",
  gap: 9,
  padding: "13px 18px",
  borderBottom: "1px solid var(--border)",
};

const titleStyle = {
  fontSize: 15,
  fontWeight: 700,
  color: "var(--text)",
  margin: 0,
};

const bodyStyle = {
  padding: "16px 18px",
  fontSize: 14,
  color: "var(--text-2)",
  lineHeight: 1.5,
};

const footStyle = {
  display: "flex",
  justifyContent: "flex-end",
  gap: 9,
  padding: "12px 18px",
  borderTop: "1px solid var(--border)",
  background: "var(--surface-2)",
  borderRadius: "0 0 6px 6px",
};

function ConfirmModal({ isOpen, title, message, onConfirm, onCancel }) {
  if (!isOpen) return null;

  return (
    <div style={backdropStyle} onClick={onCancel}>
      <div style={modalBoxStyle} onClick={(e) => e.stopPropagation()}>
        <div style={headStyle}>
          <i
            className="bi bi-exclamation-triangle-fill"
            style={{ color: "var(--danger)", fontSize: 17 }}
          ></i>
          <h3 style={titleStyle}>{title}</h3>
        </div>
        <div style={bodyStyle}>{message}</div>
        <div style={footStyle}>
          <button className="ui-btn ui-btn--secondary" onClick={onCancel}>
            Cancelar
          </button>
          <button
            className="ui-btn ui-btn--danger"
            onClick={onConfirm}
            style={{ background: "var(--danger)", color: "#fff", borderColor: "var(--danger-2)" }}
          >
            <i className="bi bi-trash3"></i> Excluir
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
