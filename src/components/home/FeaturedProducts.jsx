import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { C, FONTS } from '../../styles/tokens';
import { productService } from '../../services/api';
import ProductGrid from '../product/ProductGrid';

export default function FeaturedProducts() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    productService.getFeatured()
      .then(data => {
        // Backend returns array directly for non-paginated endpoints
        const list = Array.isArray(data) ? data : data.results || [];
        setProducts(list.slice(0, 4));
      })
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="section" style={{ paddingTop: 0 }}>
      <div className="container">
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '40px' }}>
          <h2 style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: 'clamp(22px, 3vw, 32px)', letterSpacing: '-0.02em', color: C.text }}>
            Featured Instruments
          </h2>
          <button
            onClick={() => navigate('/category/guitars')}
            style={{ background: 'none', border: 'none', color: C.amber, fontSize: '14px', cursor: 'pointer', fontFamily: FONTS.body, fontWeight: 500, display: 'flex', alignItems: 'center', gap: '4px' }}
            onMouseEnter={e => e.currentTarget.style.color = C.amberHi}
            onMouseLeave={e => e.currentTarget.style.color = C.amber}
          >
            View All
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
        <ProductGrid products={products} loading={loading} skeletonCount={4} columns={4} />
      </div>
    </section>
  );
}