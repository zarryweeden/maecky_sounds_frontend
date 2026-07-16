import React from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { C, FONTS } from '../styles/tokens';
import PageWrapper from '../components/layout/PageWrapper';
import Breadcrumb from '../components/ui/Breadcrumb';
import { useAuthContext } from '../context/AuthContext';
import { formatPrice, formatDateShort, truncate } from '../utils/formatters';
import { formatOrderStatus } from '../utils/helpers';
import Button from '../components/ui/Button';

export default function OrderHistoryPage() {
  const { isAuthenticated } = useAuthContext();
  const navigate = useNavigate();

  if (!isAuthenticated) return <Navigate to="/login" />;

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Account', href: '/account' },
    { label: 'Order History', href: '/account/orders' },
  ];

  return (
    <PageWrapper>
      <div style={{ padding: '40px 0 28px', background: C.surface, borderBottom: `1px solid ${C.border}` }}>
        <div className="container">
          <Breadcrumb items={breadcrumbs} style={{ marginBottom: '12px' }} />
          <h1 style={{ fontFamily: FONTS.display, fontWeight: 800, fontSize: '32px', letterSpacing: '-0.02em', color: C.text }}>
            Order History
          </h1>
        </div>
      </div>

      <div className="section">
        <div className="container">
          {[].length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 0' }}>
              <div style={{ fontSize: '64px', marginBottom: '16px' }}>📦</div>
              <h2 style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: '24px', marginBottom: '12px' }}>No orders yet</h2>
              <p style={{ color: C.textMid, marginBottom: '24px' }}>Your order history will appear here once you've made a purchase.</p>
              <Button variant="primary" onClick={() => navigate('/category/guitars')}>Start Shopping</Button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[].map(order => {
                const statusInfo = formatOrderStatus(order.status);
                return (
                  <div key={order.id} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: '12px', overflow: 'hidden' }}>
                    {/* Header */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', borderBottom: `1px solid ${C.border}`, flexWrap: 'wrap', gap: '12px', background: C.card }}>
                      <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
                        <div>
                          <div style={{ fontSize: '11px', color: C.textLo, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '3px' }}>Order</div>
                          <div style={{ fontFamily: FONTS.mono, fontWeight: 600, fontSize: '14px', color: C.amber }}>{order.id}</div>
                        </div>
                        <div>
                          <div style={{ fontSize: '11px', color: C.textLo, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '3px' }}>Placed</div>
                          <div style={{ fontSize: '14px', color: C.text }}>{formatDateShort(order.date)}</div>
                        </div>
                        <div>
                          <div style={{ fontSize: '11px', color: C.textLo, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '3px' }}>Total</div>
                          <div style={{ fontFamily: FONTS.mono, fontWeight: 600, fontSize: '14px', color: C.text }}>{formatPrice(order.total)}</div>
                        </div>
                      </div>
                      <span style={{ padding: '5px 12px', borderRadius: '4px', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', background: `${statusInfo.color}18`, color: statusInfo.color, border: `1px solid ${statusInfo.color}40` }}>
                        {statusInfo.label}
                      </span>
                    </div>

                    {/* Items */}
                    <div style={{ padding: '16px 20px' }}>
                      {order.items.map(item => (
                        <div key={item.id} style={{ display: 'flex', gap: '12px', padding: '8px 0', borderBottom: `1px solid ${C.border}` }}>
                          <img src={item.images?.[0]} alt={item.name} style={{ width: '52px', height: '52px', borderRadius: '6px', objectFit: 'cover', background: C.card }} />
                          <div style={{ flex: 1 }}>
                            <div style={{ fontSize: '14px', fontWeight: 600, color: C.text }}>{truncate(item.name, 50)}</div>
                            <div style={{ fontSize: '12px', color: C.textMid }}>Qty: {item.qty} · {formatPrice(item.salePrice || item.price)}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </PageWrapper>
  );
}