import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { C, FONTS } from '../styles/tokens';
import PageWrapper from '../components/layout/PageWrapper';
import Button from '../components/ui/Button';
import { formatDate } from '../utils/formatters';

export default function OrderConfirmationPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { orderId, estimatedDelivery } = location.state || {
    orderId: 'MS-' + Math.floor(100000 + Math.random() * 900000),
    estimatedDelivery: new Date(Date.now() + 5 * 86400000).toISOString().split('T')[0],
  };

  return (
    <PageWrapper>
      <div className="section">
        <div className="container" style={{ maxWidth: '560px', textAlign: 'center', padding: '40px 32px' }}>
          {/* Checkmark animation */}
          <div
            className="animate-confirm"
            style={{
              width: '88px', height: '88px', borderRadius: '50%',
              background: 'rgba(34,197,94,0.15)', border: `2px solid rgba(34,197,94,0.5)`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 28px',
            }}
          >
            <svg width="40" height="36" fill="none" stroke={C.success} strokeWidth="2.5" viewBox="0 0 24 24">
              <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          <h1 style={{ fontFamily: FONTS.display, fontWeight: 800, fontSize: '36px', color: C.success, letterSpacing: '-0.02em', marginBottom: '10px' }}>
            Order Confirmed!
          </h1>
          <p style={{ fontSize: '16px', color: C.textMid, lineHeight: 1.7, marginBottom: '32px' }}>
            Thank you for shopping with Maecky Sounds! Your instruments are being prepared for dispatch.
          </p>

          {/* Order info card */}
          <div style={{
            background: C.surface, border: `1px solid ${C.border}`,
            borderRadius: '12px', padding: '24px', marginBottom: '32px', textAlign: 'left',
          }}>
            {[
              { label: 'Order Number', value: orderId, mono: true, amber: true },
              { label: 'Estimated Delivery', value: formatDate(estimatedDelivery) },
              { label: 'Delivery Method', value: 'Standard Delivery (Free)' },
            ].map(row => (
              <div key={row.label} style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '10px 0', borderBottom: `1px solid ${C.border}`,
              }}>
                <span style={{ fontSize: '13px', color: C.textMid }}>{row.label}</span>
                <span style={{
                  fontFamily: row.mono ? FONTS.mono : FONTS.body,
                  fontWeight: 600, fontSize: row.amber ? '16px' : '14px',
                  color: row.amber ? C.amber : C.text,
                }}>
                  {row.value}
                </span>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button variant="secondary" onClick={() => navigate('/account/orders')}>
              View Order History
            </Button>
            <Button variant="primary" onClick={() => navigate('/')}>
              Continue Shopping
            </Button>
          </div>

          <p style={{ marginTop: '28px', fontSize: '14px', color: C.textMid, lineHeight: 1.7 }}>
            A confirmation email has been sent to your registered email address.
            Need help? <Link to="/contact" style={{ color: C.amber }}>Contact us</Link>.
          </p>
        </div>
      </div>
    </PageWrapper>
  );
}