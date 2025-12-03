import React, { useEffect } from "react";
import "./Toast.css";

const Toast = ({ message, onClose, duration = 3500 }) => {
  useEffect(() => {
    if (!message) return;
    const t = setTimeout(() => {
      onClose && onClose();
    }, duration);
    return () => clearTimeout(t);
  }, [message, duration, onClose]);

  if (!message) return null;

  return (
    <div className="toast" role="status" aria-live="polite">
      <div className="toast__message">{message}</div>
      <button className="toast__close" aria-label="Close notification" onClick={onClose}>
        ×
      </button>
    </div>
  );
};

export default Toast;
