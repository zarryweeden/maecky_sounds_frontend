import React from 'react';
import { C, FONTS } from '../../styles/tokens';

const VARIANT_STYLES = {
  new: {
    background: C.blueLo,
    color: C.blue,
    border: `1px solid rgba(59,130,246,0.3)`,
  },
  sale: {
    background: C.crimsonLo,
    color: '#e05c4d',
    border: `1px solid rgba(192,57,43,0.3)`,
  },
  hot: {
    background: 'linear-gradient(90deg, rgba(232,135,26,0.18), rgba(192,57,43,0.18))',
    color: C.amber,
    border: `1px solid rgba(232,135,26,0.3)`,
  },
  outofstock: {
    background: C.errorLo,
    color: C.error,
    border: `1px solid rgba(239,68,68,0.3)`,
  },
  lowstock: {
    background: C.warningLo,
    color: C.warning,
    border: `1px solid rgba(245,158,11,0.3)`,
  },
  instock: {
    background: C.successLo,
    color: C.success,
    border: `1px solid rgba(34,197,94,0.3)`,
  },
  default: {
    background: 'rgba(255,255,255,0.06)',
    color: C.textMid,
    border: `1px solid ${C.border}`,
  },
};

const LABELS = {
  new:        'New',
  sale:       'Sale',
  hot:        '🔥 Hot',
  outofstock: 'Out of Stock',
  lowstock:   'Low Stock',
  instock:    'In Stock',
};

export default function Badge({ variant = 'default', children, style: extraStyle = {} }) {
  const variantStyle = VARIANT_STYLES[variant] || VARIANT_STYLES.default;

  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    fontFamily: FONTS.body,
    fontSize: '11px',
    fontWeight: 600,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    padding: '3px 7px',
    borderRadius: '4px',
    lineHeight: 1,
    whiteSpace: 'nowrap',
    ...variantStyle,
    ...extraStyle,
  };

  return (
    <span style={base}>
      {children || LABELS[variant] || variant}
    </span>
  );
}