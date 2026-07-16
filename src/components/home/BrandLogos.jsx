import React, { useEffect, useState } from 'react';
import { C, FONTS, TRANSITION } from '../../styles/tokens';
import { brandService } from '../../services/api';

function BrandItem({ brand }) {
  const [hovered, setHovered] = useState(false);
  return (
    <span
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: '17px', color: hovered ? C.textMid : C.textLo, whiteSpace: 'nowrap', cursor: 'default', transition: TRANSITION.fast, letterSpacing: '-0.01em' }}
    >
      {brand.name}
    </span>
  );
}

export default function BrandLogos() {
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    brandService.getAll()
      .then(data => {
        const list = Array.isArray(data) ? data : data.results || [];
        setBrands(list);
      })
      .catch(() => setBrands([]));
  }, []);

  if (!brands.length) return null;

  return (
    <section style={{ paddingTop: 0 }} className="section">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '24px', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.12em', color: C.textLo, fontWeight: 600, fontFamily: FONTS.body }}>
          Trusted Brands
        </div>
        <div style={{ borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, padding: '20px 0' }}>
          <div className="hide-scrollbar" style={{ display: 'flex', alignItems: 'center', gap: '40px', overflowX: 'auto', padding: '4px 0' }}>
            {brands.map(brand => <BrandItem key={brand.id} brand={brand} />)}
          </div>
        </div>
      </div>
    </section>
  );
}