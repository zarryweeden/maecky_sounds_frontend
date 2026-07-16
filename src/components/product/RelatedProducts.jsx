import React, { useRef } from 'react';
import { C, FONTS, TRANSITION } from '../../styles/tokens';
import ProductCard from './ProductCard';

export default function RelatedProducts({ products = [], title = 'You Might Also Like' }) {
  const scrollRef = useRef(null);

  const scroll = (dir) => {
    scrollRef.current?.scrollBy({ left: dir * 260, behavior: 'smooth' });
  };

  if (!products.length) return null;

  return (
    <div>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '24px',
      }}>
        <h2 style={{
          fontFamily: FONTS.display,
          fontWeight: 700,
          fontSize: '24px',
          color: C.text,
          letterSpacing: '-0.02em',
        }}>
          {title}
        </h2>

        <div style={{ display: 'flex', gap: '8px' }}>
          {[-1, 1].map(dir => (
            <button
              key={dir}
              onClick={() => scroll(dir)}
              aria-label={dir === -1 ? 'Scroll left' : 'Scroll right'}
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: C.card,
                border: `1px solid ${C.border}`,
                color: C.textMid,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: TRANSITION.fast,
              }}
              onMouseEnter={e => { e.currentTarget.style.background = C.cardHi; e.currentTarget.style.borderColor = C.amber; e.currentTarget.style.color = C.amber; }}
              onMouseLeave={e => { e.currentTarget.style.background = C.card; e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.textMid; }}
            >
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                {dir === -1
                  ? <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                  : <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
                }
              </svg>
            </button>
          ))}
        </div>
      </div>

      <div
        ref={scrollRef}
        className="hide-scrollbar"
        style={{
          display: 'flex',
          gap: '20px',
          overflowX: 'auto',
          paddingBottom: '4px',
        }}
      >
        {products.map(product => (
          <div key={product.id} style={{ minWidth: '220px', flexShrink: 0 }}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}