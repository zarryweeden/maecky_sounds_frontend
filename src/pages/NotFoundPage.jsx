import React from 'react';
import { useNavigate } from 'react-router-dom';
import { C, FONTS } from '../styles/tokens';
import PageWrapper from '../components/layout/PageWrapper';
import Button from '../components/ui/Button';

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <PageWrapper>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '100px 32px',
        minHeight: 'calc(100vh - 64px)',
      }}>
        {/* Atmospheric broken guitar SVG */}
        <div style={{ marginBottom: '24px' }}>
          <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
            <circle cx="60" cy="60" r="58" stroke={C.border} strokeWidth="1" />
            <path d="M40 35 C40 35 50 45 60 60 C70 75 80 85 80 85" stroke={C.textLo} strokeWidth="3" strokeLinecap="round" />
            <path d="M80 35 C80 35 70 45 60 60 C50 75 40 85 40 85" stroke={C.textLo} strokeWidth="3" strokeLinecap="round" />
            <circle cx="60" cy="60" r="8" stroke={C.amber} strokeWidth="1.5" fill="none" opacity="0.4" />
            <path d="M55 58 L58 62 L65 55" stroke={C.amber} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.4" />
          </svg>
        </div>

        <h1 style={{
          fontFamily: FONTS.display,
          fontWeight: 800,
          fontSize: 'clamp(80px, 14vw, 140px)',
          letterSpacing: '-0.04em',
          color: C.border,
          lineHeight: 0.9,
          marginBottom: '8px',
        }}>
          404
        </h1>

        <h2 style={{
          fontFamily: FONTS.display,
          fontWeight: 700,
          fontSize: 'clamp(20px, 3vw, 28px)',
          letterSpacing: '-0.01em',
          color: C.text,
          marginBottom: '12px',
          marginTop: '-8px',
        }}>
          Nothing to Hear Here
        </h2>

        <p style={{
          fontSize: '16px',
          color: C.textMid,
          maxWidth: '380px',
          lineHeight: 1.7,
          marginBottom: '36px',
        }}>
          The page you're looking for doesn't exist. Maybe it took a wrong turn at the bridge section.
        </p>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Button variant="ghost" onClick={() => navigate(-1)}>
            ← Go Back
          </Button>
          <Button variant="primary" onClick={() => navigate('/')}>
            Back to Home
          </Button>
        </div>
      </div>
    </PageWrapper>
  );
}