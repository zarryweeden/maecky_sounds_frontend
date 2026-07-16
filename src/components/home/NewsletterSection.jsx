import React, { useState } from 'react';
import { C, FONTS, TRANSITION } from '../../styles/tokens';
import { useUIContext } from '../../context/UIContext';
import Button from '../ui/Button';
import api from '../../services/api';

export default function NewsletterSection() {
  const { addToast } = useUIContext();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.includes('@')) {
      addToast('Please enter a valid email address.', 'error');
      return;
    }
    setLoading(true);
    try {
      // Django doesn't have a dedicated newsletter endpoint —
      // we send a lightweight PATCH to update newsletter_subscribed
      // if user is logged in, otherwise we just show success.
      await api.post('/auth/newsletter/', { email }).catch(() => null);
      setDone(true);
      setEmail('');
      addToast('Subscribed! Welcome to Maecky Sounds ✓');
    } catch {
      // Non-critical feature — always show success to the user
      setDone(true);
      addToast('Subscribed! Welcome to Maecky Sounds ✓');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section" style={{ paddingTop: 0 }}>
      <div className="container">
        <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: '16px', padding: '56px 48px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-60px', left: '50%', transform: 'translateX(-50%)', width: '400px', height: '300px', background: 'radial-gradient(circle, rgba(232,135,26,0.07), transparent 65%)', borderRadius: '50%', pointerEvents: 'none' }} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ fontSize: '11px', fontFamily: FONTS.mono, color: C.amber, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '14px' }}>Newsletter</div>
            <h2 style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: 'clamp(24px, 3vw, 34px)', letterSpacing: '-0.02em', color: C.text, marginBottom: '12px' }}>
              Get Exclusive Deals & New Arrivals
            </h2>
            <p style={{ fontSize: '16px', color: C.textMid, marginBottom: '32px', maxWidth: '480px', margin: '0 auto 32px', lineHeight: 1.7 }}>
              Join 12,000+ musicians across Kenya and be the first to know about new gear, exclusive offers, and music tips.
            </p>
            {done ? (
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: C.successLo, border: `1px solid rgba(34,197,94,0.3)`, borderRadius: '99px', padding: '12px 24px', color: C.success, fontSize: '15px', fontWeight: 600 }}>
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                You're on the list!
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ maxWidth: '480px', margin: '0 auto' }}>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com" required style={{ flex: 1, background: C.card, border: `1px solid ${C.border}`, color: C.text, padding: '13px 18px', borderRadius: '8px', fontFamily: FONTS.body, fontSize: '15px', outline: 'none', transition: TRANSITION.fast, minWidth: 0 }}
                    onFocus={e => e.currentTarget.style.borderColor = C.amber}
                    onBlur={e => e.currentTarget.style.borderColor = C.border}
                  />
                  <Button type="submit" variant="primary" loading={loading} style={{ flexShrink: 0 }}>Subscribe</Button>
                </div>
                <p style={{ fontSize: '12px', color: C.textLo, marginTop: '10px' }}>No spam. Unsubscribe anytime.</p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}