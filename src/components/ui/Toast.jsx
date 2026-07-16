import React from 'react';
import { useUIContext } from '../../context/UIContext';
import { C, FONTS, SHADOW, Z } from '../../styles/tokens';

const TYPE_STYLES = {
  success: {
    iconBg: C.successLo,
    iconColor: C.success,
    icon: (
      <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
        <path d="M1 5L4 8L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  error: {
    iconBg: C.errorLo,
    iconColor: C.error,
    icon: (
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path d="M1 1L11 11M11 1L1 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  warning: {
    iconBg: C.warningLo,
    iconColor: C.warning,
    icon: (
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path d="M6 1L11 11H1L6 1Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M6 5V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="6" cy="9" r="0.5" fill="currentColor" stroke="currentColor" />
      </svg>
    ),
  },
  info: {
    iconBg: C.blueLo,
    iconColor: C.blue,
    icon: (
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M6 5V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="6" cy="3.5" r="0.5" fill="currentColor" stroke="currentColor" />
      </svg>
    ),
  },
};

function ToastItem({ toast, onRemove }) {
  const typeStyle = TYPE_STYLES[toast.type] || TYPE_STYLES.success;

  return (
    <div
      className="animate-slideInRight"
      style={{
        background: C.card,
        border: `1px solid ${C.border}`,
        borderRadius: '10px',
        padding: '12px 16px',
        minWidth: '280px',
        maxWidth: '380px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        boxShadow: SHADOW.modal,
        pointerEvents: 'all',
      }}
    >
      <div style={{
        width: '24px',
        height: '24px',
        borderRadius: '50%',
        background: typeStyle.iconBg,
        color: typeStyle.iconColor,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}>
        {typeStyle.icon}
      </div>

      <span style={{
        fontSize: '14px',
        fontWeight: 500,
        color: C.text,
        fontFamily: FONTS.body,
        flex: 1,
        lineHeight: 1.4,
      }}>
        {toast.message}
      </span>

      <button
        onClick={() => onRemove(toast.id)}
        aria-label="Dismiss notification"
        style={{
          background: 'none',
          border: 'none',
          color: C.textLo,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          padding: '2px',
          borderRadius: '4px',
          transition: 'color 0.15s',
          flexShrink: 0,
        }}
        onMouseEnter={e => e.currentTarget.style.color = C.textMid}
        onMouseLeave={e => e.currentTarget.style.color = C.textLo}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
}

export default function Toast() {
  const { activeToasts, removeToast } = useUIContext();

  if (activeToasts.length === 0) return null;

  return (
    <div
      aria-live="polite"
      aria-label="Notifications"
      style={{
        position: 'fixed',
        top: '80px',
        right: '20px',
        zIndex: Z.toast,
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        pointerEvents: 'none',
      }}
    >
      {activeToasts.map(toast => (
        <ToastItem key={toast.id} toast={toast} onRemove={removeToast} />
      ))}
    </div>
  );
}