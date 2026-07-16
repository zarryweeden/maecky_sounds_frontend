import React from 'react';
import { C, FONTS } from '../styles/tokens';
import PageWrapper from '../components/layout/PageWrapper';
import Button from '../components/ui/Button';
import { useNavigate } from 'react-router-dom';

export default function AboutPage() {
  const navigate = useNavigate();

  return (
    <PageWrapper>
      {/* Hero */}
      <div style={{ position: 'relative', minHeight: '360px', display: 'flex', alignItems: 'center', overflow: 'hidden', background: 'radial-gradient(ellipse at 60% 50%, rgba(232,135,26,0.08), transparent 65%)' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(rgba(42,42,50,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(42,42,50,0.3) 1px, transparent 1px)`, backgroundSize: '56px 56px', opacity: 0.5 }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ fontSize: '11px', fontFamily: FONTS.mono, color: C.amber, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '16px' }}>— Our Story</div>
          <h1 style={{ fontFamily: FONTS.display, fontWeight: 800, fontSize: 'clamp(36px, 6vw, 64px)', letterSpacing: '-0.03em', lineHeight: 1.05, color: C.text, maxWidth: '600px' }}>
            Bringing World-Class Gear to <span style={{ color: C.amber }}>East Africa</span>
          </h1>
          <p style={{ fontSize: '17px', color: C.textMid, maxWidth: '520px', marginTop: '16px', lineHeight: 1.75 }}>
            Born in Nairobi in 2015, Maecky Sounds was founded on a simple belief: Kenyan musicians deserve the same instruments as their heroes.
          </p>
        </div>
      </div>

      <div className="section">
        <div className="container">
          {/* Story */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '56px', alignItems: 'center', marginBottom: '72px' }} className="two-col">
            <div>
              <h2 style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: '30px', letterSpacing: '-0.02em', marginBottom: '18px', color: C.text }}>More Than a Store</h2>
              <p style={{ color: C.textMid, lineHeight: 1.85, marginBottom: '16px', fontSize: '15px' }}>
                We started with a single room in Nairobi's CBD, a handful of instruments, and a conviction that Kenya's music scene was about to explode. A decade later, we stock over 2,000 products from 50+ of the world's leading brands.
              </p>
              <p style={{ color: C.textMid, lineHeight: 1.85, marginBottom: '24px', fontSize: '15px' }}>
                Our team of working musicians hand-tests every product we carry. If we wouldn't play it ourselves on a professional stage, it doesn't make the cut. This commitment to quality has made us the most trusted music store in East Africa.
              </p>
              <Button variant="secondary" onClick={() => navigate('/contact')}>Visit Our Store</Button>
            </div>
            <div>
              <img src="https://picsum.photos/seed/about_store/600/420" alt="Maecky Sounds Nairobi Store" style={{ width: '100%', borderRadius: '12px', border: `1px solid ${C.border}`, objectFit: 'cover' }} />
            </div>
          </div>

          {/* Values */}
          <div style={{ marginBottom: '72px' }}>
            <h2 style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: '30px', letterSpacing: '-0.02em', marginBottom: '32px', textAlign: 'center', color: C.text }}>What We Stand For</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }} className="values-grid">
              {[
                { icon: '🎸', title: 'Expert Advice', text: 'Our staff are all working musicians who can guide your purchase with real-world experience.' },
                { icon: '✅', title: 'Quality Guaranteed', text: 'Every instrument we sell is personally tested. We stand behind every product with a full warranty.' },
                { icon: '🚀', title: 'Fast Delivery', text: 'Same-day dispatch for orders before 2pm. Free delivery on orders over KES 10,000 within Nairobi.' },
                { icon: '🤝', title: 'Music Community', text: 'Monthly jam sessions, workshops, and lessons at our store. All levels, all genres, all welcome.' },
              ].map(v => (
                <div key={v.title} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: '12px', padding: '24px', textAlign: 'center' }}>
                  <div style={{ fontSize: '36px', marginBottom: '12px' }}>{v.icon}</div>
                  <h4 style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: '16px', color: C.text, marginBottom: '8px' }}>{v.title}</h4>
                  <p style={{ fontSize: '14px', color: C.textMid, lineHeight: 1.65 }}>{v.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Team */}
          <div>
            <h2 style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: '30px', letterSpacing: '-0.02em', marginBottom: '32px', color: C.text }}>Meet the Team</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }} className="team-grid">
              {[
                { name: 'Maecky Ochieng', role: 'Founder & CEO', img: 'team1' },
                { name: 'Amina Hassan', role: 'Head of Guitars', img: 'team2' },
                { name: 'David Njoroge', role: 'Studio Gear Expert', img: 'team3' },
                { name: 'Fatuma Waweru', role: 'Customer Experience', img: 'team4' },
              ].map(t => (
                <div key={t.name} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: '12px', padding: '24px', textAlign: 'center' }}>
                  <img src={`https://picsum.photos/seed/${t.img}/200/200`} alt={t.name} style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', margin: '0 auto 14px', display: 'block', border: `2px solid rgba(232,135,26,0.3)` }} />
                  <div style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: '15px', color: C.text }}>{t.name}</div>
                  <div style={{ fontSize: '13px', color: C.textMid, marginTop: '4px' }}>{t.role}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .values-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .team-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 768px) {
          .two-col { grid-template-columns: 1fr !important; }
          .values-grid { grid-template-columns: 1fr 1fr !important; }
          .team-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </PageWrapper>
  );
}