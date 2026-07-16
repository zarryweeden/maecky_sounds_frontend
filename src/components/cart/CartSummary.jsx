import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { C, FONTS, TRANSITION } from '../../styles/tokens';
import { formatPrice } from '../../utils/formatters';
import { useCart } from '../../hooks/useCart';
import Button from '../ui/Button';

export default function CartSummary({ showCheckoutButton = true, showCoupon = true }) {
  const navigate = useNavigate();
  const { subtotal, discountAmount, shipping, total, couponCode, applyCoupon, removeCoupon, items } = useCart();
  const [couponInput, setCouponInput] = useState('');
  const [couponStatus, setCouponStatus] = useState(null);
  const [couponLoading, setCouponLoading] = useState(false);

  const handleApplyCoupon = async () => {
    if (!couponInput.trim()) return;
    setCouponLoading(true);
    await new Promise(r => setTimeout(r, 400));
    const result = applyCoupon(couponInput.trim());
    setCouponStatus(result);
    setCouponLoading(false);
    if (result.success) setCouponInput('');
  };

  if (items.length === 0) return null;

  return (
    <div style={{
      background: C.surface,
      border: `1px solid ${C.border}`,
      borderRadius: '12px',
      padding: '24px',
    }}>
      <h3 style={{
        fontFamily: FONTS.display,
        fontWeight: 700,
        fontSize: '18px',
        color: C.text,
        marginBottom: '20px',
      }}>
        Order Summary
      </h3>

      {/* Line items */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' }}>
        <SummaryRow label="Subtotal" value={formatPrice(subtotal)} />
        {discountAmount > 0 && (
          <SummaryRow
            label={`Discount${couponCode ? ` (${couponCode})` : ''}`}
            value={`−${formatPrice(discountAmount)}`}
            valueColor={C.success}
          />
        )}
        <SummaryRow
          label="Shipping"
          value={shipping === 0 ? 'Free' : formatPrice(shipping)}
          valueColor={shipping === 0 ? C.success : undefined}
        />
      </div>

      {/* Divider */}
      <div style={{ borderTop: `1px solid ${C.border}`, margin: '16px 0' }} />

      {/* Total */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <span style={{ fontFamily: FONTS.body, fontWeight: 700, fontSize: '16px', color: C.text }}>Total</span>
        <span style={{ fontFamily: FONTS.mono, fontWeight: 600, fontSize: '22px', color: C.amber }}>
          {formatPrice(total)}
        </span>
      </div>

      {/* Coupon */}
      {showCoupon && (
        <div style={{ marginBottom: '16px' }}>
          {couponCode ? (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: C.successLo,
              border: `1px solid rgba(34,197,94,0.3)`,
              borderRadius: '8px',
              padding: '10px 14px',
            }}>
              <span style={{ fontSize: '13px', color: C.success }}>
                ✓ Coupon <strong>{couponCode}</strong> applied
              </span>
              <button
                onClick={removeCoupon}
                style={{ background: 'none', border: 'none', color: C.textMid, cursor: 'pointer', fontSize: '12px', fontFamily: FONTS.body }}
                onMouseEnter={e => e.currentTarget.style.color = C.error}
                onMouseLeave={e => e.currentTarget.style.color = C.textMid}
              >
                Remove
              </button>
            </div>
          ) : (
            <div>
              <div style={{ display: 'flex', gap: '8px', marginBottom: '6px' }}>
                <input
                  type="text"
                  value={couponInput}
                  onChange={e => { setCouponInput(e.target.value.toUpperCase()); setCouponStatus(null); }}
                  onKeyDown={e => e.key === 'Enter' && handleApplyCoupon()}
                  placeholder="Promo code"
                  style={{
                    flex: 1,
                    background: C.card,
                    border: `1px solid ${couponStatus?.success === false ? C.error : C.border}`,
                    color: C.text,
                    padding: '10px 14px',
                    borderRadius: '8px',
                    fontFamily: FONTS.mono,
                    fontSize: '13px',
                    outline: 'none',
                    letterSpacing: '0.05em',
                    transition: TRANSITION.fast,
                    minWidth: 0,
                  }}
                  onFocus={e => e.currentTarget.style.borderColor = C.amber}
                  onBlur={e => e.currentTarget.style.borderColor = couponStatus?.success === false ? C.error : C.border}
                />
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleApplyCoupon}
                  loading={couponLoading}
                  style={{ flexShrink: 0 }}
                >
                  Apply
                </Button>
              </div>
              {couponStatus && !couponStatus.success && (
                <div style={{ fontSize: '12px', color: C.error }}>{couponStatus.message}</div>
              )}
              <div style={{ fontSize: '11px', color: C.textLo }}>Try: MAECKY10, MUSIC20, NAIROBI15</div>
            </div>
          )}
        </div>
      )}

      {/* Checkout button */}
      {showCheckoutButton && (
        <>
          <Button
            variant="primary"
            size="lg"
            fullWidth
            onClick={() => navigate('/checkout')}
            iconRight={
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            }
          >
            Proceed to Checkout
          </Button>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            marginTop: '12px',
            fontSize: '12px',
            color: C.textLo,
          }}>
            <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            Secured with SSL encryption
          </div>
        </>
      )}

      {/* Payment icons */}
      <div style={{ display: 'flex', gap: '6px', justifyContent: 'center', marginTop: '14px', flexWrap: 'wrap' }}>
        {['Visa', 'Mastercard', 'M-Pesa', 'PayPal'].map(p => (
          <span key={p} style={{
            background: C.card,
            border: `1px solid ${C.border}`,
            borderRadius: '4px',
            padding: '3px 8px',
            fontSize: '10px',
            fontWeight: 600,
            color: C.textLo,
            fontFamily: FONTS.body,
          }}>
            {p}
          </span>
        ))}
      </div>
    </div>
  );
}

function SummaryRow({ label, value, valueColor }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <span style={{ fontSize: '14px', color: C.textMid, fontFamily: FONTS.body }}>{label}</span>
      <span style={{
        fontSize: '14px',
        fontFamily: FONTS.mono,
        color: valueColor || C.text,
        fontWeight: 500,
      }}>
        {value}
      </span>
    </div>
  );
}