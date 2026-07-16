import React from 'react';
import { useNavigate } from 'react-router-dom';
import { C, FONTS } from '../../styles/tokens';
import { useUIContext } from '../../context/UIContext';
import { useCart } from '../../hooks/useCart';
import { formatPrice } from '../../utils/formatters';
import Drawer from '../ui/Drawer';
import CartItem from './CartItem';
import Button from '../ui/Button';

export default function CartDrawer() {
  const { cartDrawerOpen, closeCart } = useUIContext();
  const { items, subtotal, itemCount, clearCart } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    closeCart();
    navigate('/checkout');
  };

  const handleViewCart = () => {
    closeCart();
    navigate('/cart');
  };

  const drawerFooter = items.length > 0 ? (
    <div>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '14px',
      }}>
        <span style={{ fontSize: '15px', color: C.textMid, fontFamily: FONTS.body }}>Subtotal</span>
        <span style={{ fontFamily: FONTS.mono, fontWeight: 600, fontSize: '20px', color: C.amber }}>
          {formatPrice(subtotal)}
        </span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <Button variant="ghost" fullWidth onClick={handleViewCart}>
          View Cart
        </Button>
        <Button
          variant="primary"
          fullWidth
          onClick={handleCheckout}
          iconRight={
            <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          }
        >
          Checkout
        </Button>
      </div>
    </div>
  ) : null;

  return (
    <Drawer
      isOpen={cartDrawerOpen}
      onClose={closeCart}
      title={`Cart (${itemCount} ${itemCount === 1 ? 'item' : 'items'})`}
      footer={drawerFooter}
      side="right"
    >
      {items.length === 0 ? (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '60px 0',
          gap: '16px',
        }}>
          <div style={{ fontSize: '56px', lineHeight: 1 }}>🛒</div>
          <div>
            <p style={{
              fontFamily: FONTS.display,
              fontWeight: 700,
              fontSize: '18px',
              color: C.text,
              marginBottom: '6px',
            }}>
              Your cart is empty
            </p>
            <p style={{ fontSize: '14px', color: C.textMid }}>
              Discover instruments and add them here
            </p>
          </div>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => { closeCart(); navigate('/category/guitars'); }}
          >
            Start Shopping
          </Button>
        </div>
      ) : (
        <div>
          {items.map(item => (
            <CartItem key={item.id} item={item} />
          ))}
          {items.length > 1 && (
            <button
              onClick={clearCart}
              style={{
                background: 'none',
                border: 'none',
                color: C.textLo,
                fontSize: '12px',
                cursor: 'pointer',
                marginTop: '12px',
                fontFamily: FONTS.body,
                transition: 'color 0.15s',
              }}
              onMouseEnter={e => e.currentTarget.style.color = C.error}
              onMouseLeave={e => e.currentTarget.style.color = C.textLo}
            >
              Clear cart
            </button>
          )}
        </div>
      )}
    </Drawer>
  );
}