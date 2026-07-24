import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { C, FONTS, TRANSITION } from '../../styles/tokens';
import { categoryService } from '../../services/api';

function CategoryCard({ category, index }) {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onClick={() => navigate(`/category/${category.slug}`)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`animate-fadeUp delay-${Math.min(index + 1, 5)}`}
      style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden', cursor: 'pointer', aspectRatio: '3/2', border: `1px solid ${hovered ? 'rgba(232,135,26,0.5)' : C.border}`, transition: TRANSITION.mid, transform: hovered ? 'translateY(-3px)' : 'translateY(0)', boxShadow: hovered ? '0 8px 32px rgba(0,0,0,0.5)' : '0 2px 8px rgba(0,0,0,0.3)' }}
      role="link"
      aria-label={`Browse ${category.name}`}
    >
      {category.image ? (
        <img src={category.image} alt={category.name} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease', transform: hovered ? 'scale(1.06)' : 'scale(1)' }} />
      ) : (
        <div style={{ width: '100%', height: '100%', background: C.card, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '48px' }}>
          {category.icon || '🎵'}
        </div>
      )}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,11,0.92) 0%, rgba(10,10,11,0.2) 60%, transparent 100%)' }} />
      <div style={{ position: 'absolute', bottom: '16px', left: '16px', right: '16px', transform: hovered ? 'translateY(-3px)' : 'translateY(0)', transition: TRANSITION.mid }}>
        <div style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: '15px', color: C.text, marginBottom: '3px' }}>{category.name}</div>
        <div style={{ fontSize: '12px', color: C.textMid }}>{category.product_count || 0} products</div>
      </div>
      <div style={{ position: 'absolute', inset: 0, border: `2px solid ${C.amber}`, borderRadius: '12px', opacity: hovered ? 0.5 : 0, transition: TRANSITION.mid, pointerEvents: 'none' }} />
    </div>
  );
}

export default function CategoryGrid() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    categoryService.getAll({ featured: true })
      .then(data => {
        const list = Array.isArray(data) ? data : data.results || [];
        setCategories(list);
      })
      .catch(() => setCategories([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="section" id="categories">
      <div className="container">
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '40px' }}>
          <h2 style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: 'clamp(22px, 3vw, 32px)', letterSpacing: '-0.02em', color: C.text }}>
            Shop By Instrument
          </h2>
        </div>
        {loading ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
            {Array.from({ length: 8 }, (_, i) => (
              <div key={i} className="skeleton" style={{ aspectRatio: '3/2', borderRadius: '12px' }} />
            ))}
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
            {categories.map((cat, i) => (
              <CategoryCard key={cat.id} category={cat} index={i} />
            ))}
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 1024px) {
          #categories .container > div:last-child { grid-template-columns: repeat(3, 1fr) !important; }
        }
        @media (max-width: 768px) {
          #categories .container > div:last-child { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </section>
  );
}