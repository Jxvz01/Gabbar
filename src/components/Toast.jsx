import React from 'react';
import { motion } from 'framer-motion';
import { Shield, CheckCircle, AlertTriangle, Info } from 'lucide-react';

export const Toast = ({ title, msg, type }) => {
  const icons = {
    success: <CheckCircle size={18} color="var(--accent-emerald)" />,
    error: <AlertTriangle size={18} color="var(--accent-rose)" />,
    warning: <AlertTriangle size={18} color="#f59e0b" />,
    info: <Info size={18} color="var(--primary)" />
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
      className={`toast-v30 ${type}`}
    >
      <div className="toast-icon-v30" style={{ opacity: 0.8 }}>{icons[type]}</div>
      <div className="toast-content-v30">
        <div className="toast-title-v30" style={{ fontFamily: 'var(--font-mono)', fontSize: '11px' }}>{title}</div>
        <div className="toast-msg-v30" style={{ fontSize: '13px', opacity: 0.7 }}>{msg}</div>
      </div>
    </motion.div>
  );
};

