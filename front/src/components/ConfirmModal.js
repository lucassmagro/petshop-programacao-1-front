import React from "react";

const backdropStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  background: "rgba(0,0,0,0.4)",
  backdropFilter: "blur(2px)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 2000,
  animation: "fadeIn 0.2s ease",
};

const modalBoxStyle = {
  background: "#ffffff",
  borderRadius: 12,
  padding: 28,
  maxWidth: 400,
  width: "90%",
  boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
};

const iconStyle = {
  fontSize: 32,
  color: "#d62828",
  marginBottom: 12,
};

const titleStyle = {
  fontFamily: "'Sora', sans-serif",
  fontWeight: 600,
  fontSize: 18,
  color: "#0d1b2a",
  margin: "0 0 8px 0",
};

const messageStyle = {
  fontFamily: "'Inter', sans-serif",
  fontSize: 14,
  color: "#52796f",
  marginBottom: 24,
  lineHeight: 1.5,
};

const btnRowStyle = {
  display: "flex",
  justifyContent: "flex-end",
  gap: 10,
};

const cancelBtnStyle = {
  padding: "9px 18px",
  borderRadius: 8,
  border: "1px solid #e0e8e4",
  background: "#ffffff",
  color: "#52796f",
  fontFamily: "'Inter', sans-serif",
  fontWeight: 600,
  fontSize: 14,
  cursor: "pointer",
  transition: "background 0.15s",
};

const confirmBtnStyle = {
  padding: "9px 18px",
  borderRadius: 8,
  border: "none",
  background: "#d62828",
  color: "#ffffff",
  fontFamily: "'Inter', sans-serif",
  fontWeight: 600,
  fontSize: 14,
  cursor: "pointer",
  transition: "background 0.15s",
};

function ConfirmModal({ isOpen, title, message, onConfirm, onCancel }) {
  if (!isOpen) return null;

  return (
    <div style={backdropStyle} onClick={onCancel}>
      <div style={modalBoxStyle} onClick={(e) => e.stopPropagation()}>
        <i className="bi bi-exclamation-triangle-fill" style={iconStyle}></i>
        <div style={titleStyle}>{title}</div>
        <div style={messageStyle}>{message}</div>
        <div style={btnRowStyle}>
          <button style={cancelBtnStyle} onClick={onCancel}>
            Cancelar
          </button>
          <button style={confirmBtnStyle} onClick={onConfirm}>
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
