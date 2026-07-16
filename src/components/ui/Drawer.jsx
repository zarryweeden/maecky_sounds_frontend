import React, { useEffect } from 'react';
import { C, SHADOW, Z } from '../../styles/tokens';
import { lockScroll, unlockScroll } from '../../utils/helpers';

export default function Drawer({
  isOpen,
  onClose,
  title,
  children,
  footer,
  side = 'right',
  width = 'min(420px, 95vw)',
  showClose = true,
}) {
  useEffect(() => {
    if (isOpen) lockScroll();
    else unlockScroll();
    return () => unlockScroll();
  }, [isOpen]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape' && isOpen) onClose?.();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  const slideFrom = side === 'right' ? 'translateX(100%)' : 'translateX(-100%)';

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.7)',
          zIndex: Z.drawer,
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? 'all' : 'none',
          transition: 'opacity 0.3s ease',
        }}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title || 'Panel'}
        style={{
          position: 'fixed',
          top: 0,
          [side]: 0,
          bottom: 0,
          width,
          background: C.surface,
          borderLeft: side === 'right' ? `1px solid ${C.border}` : 'none',
          borderRight: side === 'left' ? `1px solid ${C.border}` : 'none',
          zIndex: Z.drawer + 1,
          display: 'flex',
          flexDirection: 'column',
          transform: isOpen ? 'translateX(0)' : slideFrom,
          transition: 'transform 0.35s cubic-bezier(0.22, 1, 0.36, 1)',
          boxShadow: isOpen ? SHADOW.modal : 'none',
        }}
      >
        {/* Header */}
        {(title || showClose) && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '20px 24px',
            borderBottom: `1px solid ${C.border}`,
            flexShrink: 0,
          }}>
            {title && (
              <h3 style={{
                fontFamily: "'Raleway', sans-serif",
                fontWeight: 700,
                fontSize: '18px',
                color: C.text,
                margin: 0,
              }}>
                {title}
              </h3>
            )}
            {showClose && (
              <button
                onClick={onClose}
                aria-label="Close panel"
                style={{
                  background: C.card,
                  border: `1px solid ${C.border}`,
                  borderRadius: '6px',
                  color: C.textMid,
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  marginLeft: 'auto',
                  transition: 'all 0.15s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = C.cardHi;
                  e.currentTarget.style.color = C.text;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = C.card;
                  e.currentTarget.style.color = C.textMid;
                }}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </button>
            )}
          </div>
        )}

        {/* Body */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '20px 24px',
        }}>
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div style={{
            padding: '20px 24px',
            borderTop: `1px solid ${C.border}`,
            flexShrink: 0,
            background: C.surface,
          }}>
            {footer}
          </div>
        )}
      </div>
    </>
  );
}