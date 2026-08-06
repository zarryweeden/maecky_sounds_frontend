import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { C } from '../../styles/tokens';
import Button from '../ui/Button';

export default function HeroBanner() {
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="hero-section">
      <div className="hero-section__glow" aria-hidden="true" />
      <div className="hero-section__grid-bg" aria-hidden="true" />

      <div className="container hero-section__inner">
        <div className="hero-grid">
          <div className={`hero-content${mounted ? ' hero-content--visible' : ''}`}>
            <div className="hero-eyebrow">
              <span className="hero-eyebrow__line" />
              Maecky Sounds · KISUMU , Kenya
            </div>

            <h1 className="hero-title">
              A Complete <br />
              <span className="hero-title__accent">Tune</span>
            </h1>

            <p className="hero-description">
              Kenya's premier music store. From stage-ready guitars to studio-grade recording gear — we bring the world's best instruments to East Africa.
            </p>

            <div className="hero-buttons">
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

            <div className="hero-stats">
              {[
                { num: '2,000+', label: 'Products' },
                { num: '12K+', label: 'Customers' },
                { num: '50+', label: 'Top Brands' },
              ].map(stat => (
                <div key={stat.label} className="hero-stat">
                  <div className="hero-stat__num">{stat.num}</div>
                  <div className="hero-stat__label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className={`hero-image-wrap${mounted ? ' hero-image-wrap--visible' : ''}`}>
            <div className="hero-image-wrap__glow" aria-hidden="true" />
            <img
              src="https://picsum.photos/seed/maecky_hero/520/520"
              alt="Featured Instrument"
              className="hero-image"
            />
          </div>
        </div>
      </div>

      <div className="hero-scroll-indicator">
        <span className="hero-scroll-indicator__label">Scroll</span>
        <div
          className="hero-scroll-indicator__line"
          style={{ background: `linear-gradient(to bottom, ${C.amber}, transparent)` }}
        />
      </div>
    </section>
  );
}
