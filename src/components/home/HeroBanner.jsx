import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { C, FONTS } from '../../styles/tokens';
import Button from '../ui/Button';

export default function HeroBanner() {
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <section style={{
      position: 'relative',
      minHeight: '100vh',
      paddingTop: '64px',
      display: 'flex',
      alignItems: 'center',
      overflow: 'hidden',
    }}>
      {/* Ambient radial glow */}
      <div style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 60% 70% at 70% 50%, rgba(232,135,26,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
      }} />

      {/* Grid background */}
      <div style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `
              linear-gradient(rgba(0,0,80,0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,0,80,0.05) 1px, transparent 1px)
            `,
            backgroundSize: '56px 56px',
            maskImage: 'radial-gradient(ellipse 80% 60% at 50% 50%, black, transparent)',
            WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 50%, black, transparent)',
            pointerEvents: 'none',
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 2, width: '100%' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          alignItems: 'center',
          gap: '64px',
        }}>
          {/* Left — content */}
          <div style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.7s cubic-bezier(0.22,1,0.36,1), transform 0.7s cubic-bezier(0.22,1,0.36,1)',
          }}>
            <div style={{
              fontFamily: FONTS.mono,
              fontSize: '11px',
              fontWeight: 400,
              color: C.amber,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              marginBottom: '18px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}>
              <span style={{
                width: '24px',
                height: '1px',
                background: C.amber,
                display: 'inline-block',
              }} />
              Maecky Sounds · KISUMU , Kenya
            </div>

            <h1 style={{
              fontFamily: FONTS.display,
              fontWeight: 800,
              fontSize: 'clamp(40px, 5.5vw, 76px)',
              letterSpacing: '-0.03em',
              lineHeight: 1.04,
              color: C.text,
              marginBottom: '22px',
            }}>
              A Complete <br />
              <span style={{ color: C.amber }}>Tune</span>
            </h1>

            <p style={{
              fontSize: '17px',
              color: C.textMid,
              lineHeight: 1.75,
              marginBottom: '38px',
              maxWidth: '440px',
            }}>
              Kenya's premier music store. From stage-ready guitars to studio-grade recording gear — we bring the world's best instruments to East Africa.
            </p>

            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
              <Button
                variant="primary"
                size="lg"
                onClick={() => navigate('/category/guitars')}
                iconRight={
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                }
              >
                Shop Now
              </Button>
              <Button
                variant="ghost"
                size="lg"
                onClick={() => {
                  document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Explore Categories
              </Button>
            </div>

            {/* Trust indicators */}
            <div style={{
              display: 'flex',
              gap: '24px',
              marginTop: '48px',
              flexWrap: 'wrap',
            }}>
              {[
                { num: '2,000+', label: 'Products' },
                { num: '12K+', label: 'Customers' },
                { num: '50+', label: 'Top Brands' },
              ].map(stat => (
                <div key={stat.label}>
                  <div style={{
                    fontFamily: FONTS.mono,
                    fontWeight: 600,
                    fontSize: '22px',
                    color: C.amber,
                    lineHeight: 1,
                  }}>
                    {stat.num}
                  </div>
                  <div style={{ fontSize: '12px', color: C.textLo, marginTop: '4px' }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — hero image */}
          <div
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0) scale(1)' : 'translateY(16px) scale(0.98)',
              transition: 'opacity 0.9s cubic-bezier(0.22,1,0.36,1) 0.15s, transform 0.9s cubic-bezier(0.22,1,0.36,1) 0.15s',
            }}
            className="hero-image-wrap"
          >
            {/* Glow behind image */}
            <div style={{
              position: 'absolute',
              width: '380px',
              height: '380px',
              background: 'radial-gradient(circle, rgba(232,135,26,0.18), transparent 65%)',
              borderRadius: '50%',
              pointerEvents: 'none',
            }} />
            <img
              src="https://picsum.photos/seed/maecky_hero/520/520"
              alt="Featured Instrument"
              style={{
                width: '100%',
                maxWidth: '500px',
                objectFit: 'contain',
                position: 'relative',
                zIndex: 1,
                filter: 'drop-shadow(0 24px 64px rgba(0,0,0,0.85))',
                borderRadius: '16px',
              }}
            />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute',
        bottom: '32px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '6px',
        opacity: 0.4,
        animation: 'fadeUp 1s ease 1.2s both',
      }}>
        <span style={{ fontSize: '11px', color: C.textMid, letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: FONTS.body }}>Scroll</span>
        <div style={{
          width: '1px',
          height: '40px',
          background: `linear-gradient(to bottom, ${C.amber}, transparent)`,
        }} />
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .hero-image-wrap { display: none !important; }
        }
        @media (max-width: 768px) {
          section { min-height: 90vh; }
        }
      `}</style>
    </section>
  );
}