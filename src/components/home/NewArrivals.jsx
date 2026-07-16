import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { C, FONTS, TRANSITION } from '../../styles/tokens';
import { productService } from '../../services/api';
import ProductCard from '../product/ProductCard';
import { SkeletonProductCard } from '../ui/Skeleton';

export default function NewArrivals() {
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    productService.getNewArrivals()
      .then(data => {
        const list = Array.isArray(data) ? data : data.results || [];
        setProducts(list);
      })
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, []);

  const scroll = (dir) => {
    scrollRef.current?.scrollBy({ left: dir * 320, behavior: 'smooth' });
  };

  return (
    <section className="section" style={{ paddingTop: 0 }}>
      <div className="container">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
          <h2 style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: 'clamp(22px, 3vw, 32px)', letterSpacing: '-0.02em', color: C.text }}>
            Just Arrived
          </h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button onClick={() => navigate('/category/guitars')} style={{ background: 'none', border: 'none', color: C.amber, fontSize: '14px', cursor: 'pointer', fontFamily: FONTS.body, fontWeight: 500 }}
              onMouseEnter={e => e.currentTarget.style.color = C.amberHi}
              onMouseLeave={e => e.currentTarget.style.color = C.amber}
            >
              View All →
            </button>
            <div style={{ display: 'flex', gap: '6px' }}>
              {[-1, 1].map(dir => (
                <button key={dir} onClick={() => scroll(dir)} aria-label={dir === -1 ? 'Scroll left' : 'Scroll right'} style={{ width: '34px', height: '34px', borderRadius: '50%', background: C.card, border: `1px solid ${C.border}`, color: C.textMid, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: TRANSITION.fast }}
                  onMouseEnter={e => { e.currentTarget.style.background = C.cardHi; e.currentTarget.style.borderColor = C.amber; e.currentTarget.style.color = C.amber; }}
                  onMouseLeave={e => { e.currentTarget.style.background = C.card; e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.textMid; }}
                >
                  <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    {dir === -1
                      ? <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                      : <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
                    }
                  </svg>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div ref={scrollRef} className="hide-scrollbar" style={{ display: 'flex', gap: '20px', overflowX: 'auto', paddingBottom: '8px' }}>
          {loading
            ? Array.from({ length: 5 }, (_, i) => (
                <div key={i} style={{ width: '300px', minWidth: '300px', maxWidth: '300px', flexShrink: 0 }}>
                  <SkeletonProductCard />
                </div>
              ))
            : products.map(product => (
                <div key={product.id} style={{ width: '300px', minWidth: '300px', maxWidth: '300px', flexShrink: 0 }}>
                  <ProductCard product={product} />
                </div>
              ))
          }
        </div>
      </div>
    </section>
  );
}