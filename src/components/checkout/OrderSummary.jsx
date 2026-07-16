import React, { useState } from 'react';
import { C, FONTS } from '../../styles/tokens';
import { formatPrice, truncate } from '../../utils/formatters';
import { useCart } from '../../hooks/useCart';

export default function OrderSummary({ collapsed = false }) {
  const { items, subtotal, discountAmount, shipping, total, couponCode } = useCart();
  const [expanded, setExpanded] = useState(!collapsed);

  return (
    <div style={{
      background: C.surface,
      border: `1px solid ${C.border}`,
      borderRadius: '12px',
      overflow: 'hidden',
    }}>
      {/* Header toggle */}
      <button
        onClick={() => setExpanded(v => !v)}
        style={{
          width: '100%',
          padding: '16px 20px',
          background: 'none',
          border: 'none',
          borderBottom: expanded ? `1px solid ${C.border}` : 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: 'pointer',
          color: C.text,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <svg width="16" height="16" fill="none" stroke={C.amber} strokeWidth="1.8" viewBox="0 0 24 24">
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 01-8 0" />
          </svg>
          <span style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: '15px' }}>
            Order Summary ({items.length} {items.length === 1 ? 'item' : 'items'})
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontFamily: FONTS.mono, fontWeight: 600, fontSize: '16px', color: C.amber }}>
            {formatPrice(total)}
          </span>
          <svg
            width="14" height="14"
            fill="none" stroke={C.textMid} strokeWidth="2" viewBox="0 0 24 24"
            style={{ transform: expanded ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }}
          >
            <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </button>

      {/* Items */}
      {expanded && (
        <div style={{ padding: '16px 20px' }}>
          {items.map(item => (
            <div key={item.id} style={{
              display: 'flex',
              gap: '12px',
              paddingBottom: '12px',
              marginBottom: '12px',
              borderBottom: `1px solid ${C.border}`,
            }}>
              <div style={{
                width: '52px',
                height: '52px',
                borderRadius: '8px',
                background: C.card,
                border: `1px solid ${C.border}`,
                overflow: 'hidden',
                flexShrink: 0,
              }}>
                <img
                  src={item.images?.[0]}
                  alt={item.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: '13px', fontWeight: 600, color: C.text, lineHeight: 1.3 }}>
                  {truncate(item.name, 40)}
                </div>
                <div style={{ fontSize: '12px', color: C.textMid, marginTop: '3px' }}>
                  Qty: {item.qty}
                </div>
              </div>
              <div style={{ fontFamily: FONTS.mono, fontSize: '13px', color: C.text, flexShrink: 0 }}>
                {formatPrice((item.salePrice || item.price) * item.qty)}
              </div>
            </div>
          ))}

          {/* Totals */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <TotalRow label="Subtotal" value={formatPrice(subtotal)} />
            {discountAmount > 0 && (
              <TotalRow
                label={`Discount${couponCode ? ` (${couponCode})` : ''}`}
                value={`−${formatPrice(discountAmount)}`}
                valueColor={C.success}
              />
            )}
            <TotalRow
              label="Shipping"
              value={shipping === 0 ? 'Free' : formatPrice(shipping)}
              valueColor={shipping === 0 ? C.success : undefined}
            />
            <div style={{
              borderTop: `1px solid ${C.border}`,
              marginTop: '4px',
              paddingTop: '12px',
              display: 'flex',
              justifyContent: 'space-between',
            }}>
              <span style={{ fontWeight: 700, fontSize: '15px', color: C.text }}>Total</span>
              <span style={{ fontFamily: FONTS.mono, fontWeight: 600, fontSize: '18px', color: C.amber }}>
                {formatPrice(total)}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function TotalRow({ label, value, valueColor }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <span style={{ fontSize: '13px', color: C.textMid }}>{label}</span>
      <span style={{ fontSize: '13px', fontFamily: FONTS.mono, color: valueColor || C.text }}>{value}</span>
    </div>
  );
}