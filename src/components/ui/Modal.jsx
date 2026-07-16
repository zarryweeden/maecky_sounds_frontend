import React, { useEffect, useRef } from 'react';
import { C, SHADOW, Z, TRANSITION } from '../../styles/tokens';
import { lockScroll, unlockScroll } from '../../utils/helpers';

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = '560px',
  showClose = true,
  style: extraStyle = {},
}) {
  const modalRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      lockScroll();
      setTimeout(() => modalRef.current?.focus(), 50);
    } else {
      unlockScroll();
    }
    return () => unlockScroll();
  }, [isOpen]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape' && isOpen) onClose?.();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="animate-fadeIn"
      onClick={(e) => { if (e.target === e.currentTarget) onClose?.(); }}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.75)',
        backdropFilter: 'blur(6px)',
        zIndex: Z.modal,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
    >
      <div
        ref={modalRef}
        className="animate-scaleIn"
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'modal-title' : undefined}
        tabIndex={-1}
        style={{
          background: C.surface,
          border: `1px solid ${C.border}`,
          borderRadius: '16px',
          width: '100%',
          maxWidth,
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: SHADOW.modal,
          outline: 'none',
          ...extraStyle,
        }}
      >
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
              <h3
                id="modal-title"
                style={{
                  fontFamily: "'Raleway', sans-serif",
                  fontWeight: 700,
                  fontSize: '18px',
                  color: C.text,
                  margin: 0,
                }}
              >
                {title}
              </h3>
            )}
            {showClose && (
              <button
                onClick={onClose}
                aria-label="Close modal"
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
                  transition: TRANSITION.fast,
                  flexShrink: 0,
                  marginLeft: 'auto',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = C.cardHi;
                  e.currentTarget.style.borderColor = C.borderHi;
                  e.currentTarget.style.color = C.text;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = C.card;
                  e.currentTarget.style.borderColor = C.border;
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

        <div style={{ padding: '24px', overflowY: 'auto', flex: 1 }}>
          {children}
        </div>
      </div>
    </div>
  );
}