import React, { useState } from 'react';
import { C, FONTS, TRANSITION } from '../../styles/tokens';
import { formatPrice, truncate } from '../../utils/formatters';
import { useCart } from '../../hooks/useCart';

export default function CartItem({ item }) {
  const { removeItem, updateQuantity } = useCart();
  const [removing, setRemoving] = useState(false);

  const handleRemove = async () => {
    setRemoving(true);
    await new Promise(r => setTimeout(r, 150));
    removeItem(item.id);
  };

  const handleQty = (delta) => {
    const newQty = item.qty + delta;
    if (newQty < 1) return;
    updateQuantity(item.id, newQty);
  };

  const lineTotal = (item.salePrice || item.price) * item.qty;

  return (
    <div style={{
      display: 'flex',
      gap: '14px',
      padding: '16px 0',
      borderBottom: `1px solid ${C.border}`,
      opacity: removing ? 0.4 : 1,
      transition: 'opacity 0.15s ease',
    }}>
      {/* Image */}
      <div style={{
        width: '64px',
        height: '64px',
        borderRadius: '8px',
        background: C.card,
        overflow: 'hidden',
        flexShrink: 0,
        border: `1px solid ${C.border}`,
      }}>
        <img
          src={item.images?.[0] || item.image}
          alt={item.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>

      {/* Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontSize: '11px',
          fontFamily: FONTS.mono,
          color: C.amber,
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          marginBottom: '3px',
        }}>
          {item.brand}
        </div>
        <div style={{
          fontFamily: FONTS.display,
          fontWeight: 600,
          fontSize: '14px',
          color: C.text,
          lineHeight: 1.3,
          marginBottom: '8px',
        }}>
          {truncate(item.name, 45)}
        </div>

        {/* Qty controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            border: `1px solid ${C.border}`,
            borderRadius: '6px',
            overflow: 'hidden',
          }}>
            <button
              onClick={() => handleQty(-1)}
              aria-label="Decrease quantity"
              style={{
                width: '28px',
                height: '28px',
                background: C.surface,
                border: 'none',
                color: C.textMid,
                cursor: item.qty <= 1 ? 'not-allowed' : 'pointer',
                fontSize: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: TRANSITION.fast,
                opacity: item.qty <= 1 ? 0.4 : 1,
              }}
              onMouseEnter={e => { if (item.qty > 1) e.currentTarget.style.background = C.card; }}
              onMouseLeave={e => { e.currentTarget.style.background = C.surface; }}
            >
              −
            </button>
            <span style={{
              width: '36px',
              height: '28px',
              background: C.card,
              borderLeft: `1px solid ${C.border}`,
              borderRight: `1px solid ${C.border}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: FONTS.mono,
              fontSize: '13px',
              color: C.text,
            }}>
              {item.qty}
            </span>
            <button
              onClick={() => handleQty(1)}
              aria-label="Increase quantity"
              disabled={item.qty >= item.stockCount}
              style={{
                width: '28px',
                height: '28px',
                background: C.surface,
                border: 'none',
                color: C.textMid,
                cursor: item.qty >= item.stockCount ? 'not-allowed' : 'pointer',
                fontSize: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: TRANSITION.fast,
                opacity: item.qty >= item.stockCount ? 0.4 : 1,
              }}
              onMouseEnter={e => { if (item.qty < item.stockCount) e.currentTarget.style.background = C.card; }}
              onMouseLeave={e => { e.currentTarget.style.background = C.surface; }}
            >
              +
            </button>
          </div>

          <button
            onClick={handleRemove}
            aria-label="Remove item"
            style={{
              background: 'none',
              border: 'none',
              fontSize: '12px',
              color: C.textLo,
              cursor: 'pointer',
              padding: '2px 4px',
              transition: TRANSITION.fast,
              fontFamily: FONTS.body,
            }}
            onMouseEnter={e => e.currentTarget.style.color = C.error}
            onMouseLeave={e => e.currentTarget.style.color = C.textLo}
          >
            Remove
          </button>
        </div>
      </div>

      {/* Price */}
      <div style={{
        flexShrink: 0,
        textAlign: 'right',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingTop: '2px',
      }}>
        <div style={{
          fontFamily: FONTS.mono,
          fontWeight: 600,
          fontSize: '15px',
          color: C.text,
        }}>
          {formatPrice(lineTotal)}
        </div>
        {item.qty > 1 && (
          <div style={{ fontSize: '11px', color: C.textLo, fontFamily: FONTS.mono }}>
            {formatPrice(item.salePrice || item.price)} each
          </div>
        )}
      </div>
    </div>
  );
}