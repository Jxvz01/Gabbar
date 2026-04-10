import React from 'react';
import { motion } from 'framer-motion';
import { Shield, CheckCircle, AlertTriangle } from 'lucide-react';

export const Toast = ({ title, msg, type }) => {
  const icons = {
    success: <CheckCircle size={20} color="var(--accent-emerald)" />,
    error: <AlertTriangle size={20} color="#ef4444" />,
    warning: <AlertTriangle size={20} color="#f59e0b" />,
    info: <Shield size={20} color="var(--primary)" />
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 20, scale: 0.95 }}
      className={`toast-v30 ${type}`}
    >
      <div className="toast-icon-v30">{icons[type]}</div>
      <div className="toast-content-v30">
        <div className="toast-title-v30">{title}</div>
        <div className="toast-msg-v30">{msg}</div>
      </div>
    </motion.div>
  );
};
