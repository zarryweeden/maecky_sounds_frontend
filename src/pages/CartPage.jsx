import React from 'react';
import { useNavigate } from 'react-router-dom';
import { C, FONTS } from '../styles/tokens';
import PageWrapper from '../components/layout/PageWrapper';
import CartItem from '../components/cart/CartItem';
import CartSummary from '../components/cart/CartSummary';
import Button from '../components/ui/Button';
import { useCart } from '../hooks/useCart';

export default function CartPage() {
  const navigate = useNavigate();
  const { items, clearCart } = useCart();

  return (
    <PageWrapper>
      <div className="section">
        <div className="container">
          <h1 style={{ fontFamily: FONTS.display, fontWeight: 800, fontSize: 'clamp(26px, 4vw, 36px)', letterSpacing: '-0.02em', marginBottom: '32px', color: C.text }}>
            Shopping Cart
            {items.length > 0 && (
              <span style={{ fontFamily: FONTS.body, fontWeight: 400, fontSize: '16px', color: C.textMid, marginLeft: '12px' }}>
                ({items.length} {items.length === 1 ? 'item' : 'items'})
              </span>
            )}
          </h1>

          {items.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 0' }}>
              <div style={{ fontSize: '72px', marginBottom: '20px', lineHeight: 1 }}>🛒</div>
              <h2 style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: '26px', marginBottom: '12px', color: C.text }}>
                Your cart is empty
              </h2>
              <p style={{ fontSize: '16px', color: C.textMid, marginBottom: '28px', maxWidth: '340px', margin: '0 auto 28px', lineHeight: 1.6 }}>
                Discover world-class instruments and start building your setup.
              </p>
              <Button variant="primary" size="lg" onClick={() => navigate('/category/guitars')}>
                Start Shopping
              </Button>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '32px', alignItems: 'start' }} className="cart-layout">
              {/* Items */}
              <div>
                <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: '12px', padding: '8px 24px' }}>
                  {items.map(item => <CartItem key={item.id} item={item} />)}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px' }}>
                  <Button variant="ghost" size="sm" onClick={() => navigate('/category/guitars')}>
                    ← Continue Shopping
                  </Button>
                  <button
                    onClick={clearCart}
                    style={{ background: 'none', border: 'none', fontSize: '13px', color: C.textLo, cursor: 'pointer', fontFamily: FONTS.body }}
                    onMouseEnter={e => e.currentTarget.style.color = C.error}
                    onMouseLeave={e => e.currentTarget.style.color = C.textLo}
                  >
                    Clear cart
                  </button>
                </div>
              </div>

              {/* Summary */}
              <div style={{ position: 'sticky', top: '80px' }}>
                <CartSummary />
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .cart-layout { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </PageWrapper>
  );
}