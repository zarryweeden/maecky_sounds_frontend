import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { C, FONTS } from '../../styles/tokens';
import Button from '../ui/Button';

function getTimeUntilMidnight() {
  const now = new Date();
  const midnight = new Date(now);
  midnight.setHours(23, 59, 59, 999);
  const diff = midnight - now;
  return {
    h: Math.floor(diff / 3600000),
    m: Math.floor((diff % 3600000) / 60000),
    s: Math.floor((diff % 60000) / 1000),
  };
}

function TimerBlock({ value, label }) {
  return (
    <div style={{
      textAlign: 'center',
      background: 'rgba(0,0,0,0.4)',
      border: `1px solid ${C.border}`,
      borderRadius: '8px',
      padding: '10px 18px',
      minWidth: '68px',
    }}>
      <div style={{
        fontFamily: FONTS.mono,
        fontWeight: 600,
        fontSize: '30px',
        color: C.amber,
        lineHeight: 1,
        letterSpacing: '-0.02em',
      }}>
        {String(value).padStart(2, '0')}
      </div>
      <div style={{
        fontSize: '10px',
        color: C.textLo,
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        marginTop: '4px',
        fontFamily: FONTS.body,
      }}>
        {label}
      </div>
    </div>
  );
}

export default function PromoBanner() {
  const navigate = useNavigate();
  const [time, setTime] = useState(getTimeUntilMidnight());

  useEffect(() => {
    const interval = setInterval(() => setTime(getTimeUntilMidnight()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section style={{ paddingTop: 0 }} className="section">
      <div className="container">
        <div style={{
          background: 'linear-gradient(135deg, rgba(192,57,43,0.18) 0%, rgba(232,135,26,0.18) 100%)',
          border: `1px solid rgba(232,135,26,0.25)`,
          borderRadius: '16px',
          padding: '40px 48px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '32px',
          flexWrap: 'wrap',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Background glow */}
          <div style={{
            position: 'absolute',
            top: '-40px',
            right: '20%',
            width: '300px',
            height: '300px',
            background: 'radial-gradient(circle, rgba(232,135,26,0.12), transparent 65%)',
            borderRadius: '50%',
            pointerEvents: 'none',
          }} />

          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{
              fontSize: '11px',
              fontFamily: FONTS.mono,
              color: C.crimson,
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              marginBottom: '8px',
            }}>
              ● Live Sale
            </div>
            <h2 style={{
              fontFamily: FONTS.display,
              fontWeight: 800,
              fontSize: 'clamp(22px, 3vw, 34px)',
              letterSpacing: '-0.02em',
              color: C.text,
              marginBottom: '6px',
              lineHeight: 1.1,
            }}>
              Up to 30% Off — Weekend Sale
            </h2>
            <p style={{ color: C.textMid, fontSize: '15px', marginTop: '6px' }}>
              Exclusive deals on guitars, keyboards, studio gear and more.
            </p>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            position: 'relative',
            zIndex: 1,
            flexWrap: 'nowrap',
            justifyContent: 'center',
          }}>
            <TimerBlock value={time.h} label="Hours" />
            <span style={{ fontFamily: FONTS.mono, fontSize: '24px', color: C.amber, fontWeight: 600 }}>:</span>
            <TimerBlock value={time.m} label="Mins" />
            <span style={{ fontFamily: FONTS.mono, fontSize: '24px', color: C.amber, fontWeight: 600 }}>:</span>
            <TimerBlock value={time.s} label="Secs" />
          </div>

          <Button
            variant="primary"
            size="lg"
            onClick={() => navigate('/category/guitars')}
            style={{ position: 'relative', zIndex: 1, flexShrink: 0 }}
          >
            Shop Sale
          </Button>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .promo-inner { padding: 28px 24px !important; justify-content: center !important; text-align: center; }
        }
      `}</style>
    </section>
  );
}