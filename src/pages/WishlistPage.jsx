import React from 'react';
import { useNavigate } from 'react-router-dom';
import { C, FONTS } from '../styles/tokens';
import PageWrapper from '../components/layout/PageWrapper';
import ProductGrid from '../components/product/ProductGrid';
import Button from '../components/ui/Button';
import { useWishlistContext } from '../context/WishlistContext';

export default function WishlistPage() {
  const navigate = useNavigate();
  const { items } = useWishlistContext();

  return (
    <PageWrapper>
      <div style={{ padding: '40px 0 28px', background: C.surface, borderBottom: `1px solid ${C.border}` }}>
        <div className="container">
          <h1 style={{ fontFamily: FONTS.display, fontWeight: 800, fontSize: 'clamp(24px, 4vw, 36px)', letterSpacing: '-0.02em', color: C.text }}>
            My Wishlist
            <span style={{ fontFamily: FONTS.body, fontWeight: 400, fontSize: '16px', color: C.textMid, marginLeft: '12px' }}>
              ({items.length} {items.length === 1 ? 'item' : 'items'})
            </span>
          </h1>
        </div>
      </div>

      <div className="section">
        <div className="container">
          {items.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 0' }}>
              <div style={{ fontSize: '72px', marginBottom: '20px', lineHeight: 1 }}>♥</div>
              <h2 style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: '26px', marginBottom: '12px', color: C.text }}>
                Your wishlist is empty
              </h2>
              <p style={{ fontSize: '16px', color: C.textMid, marginBottom: '28px', maxWidth: '360px', margin: '0 auto 28px', lineHeight: 1.6 }}>
                Browse our collection and tap the ♥ icon to save instruments you love.
              </p>
              <Button variant="primary" size="lg" onClick={() => navigate('/category/guitars')}>
                Browse Instruments
              </Button>
            </div>
          ) : (
            <ProductGrid products={items} columns={4} />
          )}
        </div>
      </div>
    </PageWrapper>
  );
}