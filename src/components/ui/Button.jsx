import React from 'react';
import { C, FONTS, SHADOW, TRANSITION } from '../../styles/tokens';

const BASE = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
  fontFamily: FONTS.body,
  fontWeight: 600,
  cursor: 'pointer',
  border: 'none',
  borderRadius: '8px',
  transition: TRANSITION.fast,
  textDecoration: 'none',
  whiteSpace: 'nowrap',
  position: 'relative',
  outline: 'none',
  userSelect: 'none',
};

const SIZES = {
  sm: { padding: '8px 16px', fontSize: '13px' },
  md: { padding: '12px 24px', fontSize: '15px' },
  lg: { padding: '14px 32px', fontSize: '16px' },
};

const VARIANTS = {
  primary: {
    background: C.amber,
    color: '#000',
    border: 'none',
  },
  secondary: {
    background: C.surface,
    color: C.amber,
    border: `1px solid ${C.amber}`,
  },
  ghost: {
    background: 'transparent',
    color: C.textMid,
    border: `1px solid ${C.border}`,
  },
  danger: {
    background: C.errorLo,
    color: C.error,
    border: `1px solid rgba(239,68,68,0.3)`,
  },
  dark: {
    background: C.card,
    color: C.text,
    border: `1px solid ${C.border}`,
  },
};

const HOVER_STYLES = {
  primary:   { background: C.amberHi, boxShadow: SHADOW.amberGlow },
  secondary: { background: C.amberLo },
  ghost:     { borderColor: C.amber, color: C.amber, background: 'rgba(232,135,26,0.05)' },
  danger:    { background: 'rgba(239,68,68,0.18)' },
  dark:      { background: C.cardHi, borderColor: C.borderHi },
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  disabled = false,
  iconLeft = null,
  iconRight = null,
  onClick,
  type = 'button',
  style: extraStyle = {},
  as: Tag = 'button',
  ...rest
}) {
  const [hovered, setHovered] = React.useState(false);

  const isDisabled = disabled || loading;

  const style = {
    ...BASE,
    ...SIZES[size],
    ...VARIANTS[variant],
    ...(hovered && !isDisabled ? HOVER_STYLES[variant] : {}),
    ...(fullWidth ? { width: '100%' } : {}),
    ...(isDisabled ? { opacity: 0.5, cursor: 'not-allowed', pointerEvents: 'none' } : {}),
    ...extraStyle,
  };

  return (
    <Tag
      type={Tag === 'button' ? type : undefined}
      style={style}
      onClick={!isDisabled ? onClick : undefined}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      disabled={Tag === 'button' ? isDisabled : undefined}
      aria-disabled={isDisabled}
      {...rest}
    >
      {loading ? (
        <span
          style={{
            width: '16px',
            height: '16px',
            border: '2px solid rgba(0,0,0,0.2)',
            borderTopColor: variant === 'primary' ? '#000' : C.amber,
            borderRadius: '50%',
            animation: 'spin 0.7s linear infinite',
            display: 'inline-block',
            flexShrink: 0,
          }}
        />
      ) : (
        <>
          {iconLeft && <span style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>{iconLeft}</span>}
          {children}
          {iconRight && <span style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>{iconRight}</span>}
        </>
      )}
    </Tag>
  );
}