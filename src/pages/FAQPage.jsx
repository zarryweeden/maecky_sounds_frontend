import React, { useState } from 'react';
import { C, FONTS, TRANSITION } from '../styles/tokens';
import PageWrapper from '../components/layout/PageWrapper';


function AccordionItem({ question, answer }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: `1px solid ${C.border}` }}>
      <button
        onClick={() => setOpen(v => !v)}
        style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 0', background: 'none', border: 'none', color: C.text, cursor: 'pointer', textAlign: 'left', gap: '16px' }}
        aria-expanded={open}
      >
        <span style={{ fontFamily: FONTS.body, fontWeight: 600, fontSize: '15px', lineHeight: 1.4 }}>{question}</span>
        <svg width="16" height="16" fill="none" stroke={open ? C.amber : C.textMid} strokeWidth="2" viewBox="0 0 24 24" style={{ flexShrink: 0, transform: open ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s, stroke 0.15s' }}>
          <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <div style={{ maxHeight: open ? '400px' : '0', overflow: 'hidden', transition: 'max-height 0.3s ease' }}>
        <p style={{ fontSize: '15px', color: C.textMid, lineHeight: 1.8, paddingBottom: '18px' }}>{answer}</p>
      </div>
    </div>
  );
}

export default function FAQPage() {
  const categories = Object.keys([]);
  const [activeTab, setActiveTab] = useState(categories[0]);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = [][activeTab]?.filter(item =>
    !searchQuery || item.q.toLowerCase().includes(searchQuery.toLowerCase()) || item.a.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  return (
    <PageWrapper>
      <div style={{ padding: '48px 0 36px', background: C.surface, borderBottom: `1px solid ${C.border}` }}>
        <div className="container">
          <h1 style={{ fontFamily: FONTS.display, fontWeight: 800, fontSize: 'clamp(28px, 4vw, 40px)', letterSpacing: '-0.02em', marginBottom: '8px', color: C.text }}>
            Frequently Asked Questions
          </h1>
          <p style={{ color: C.textMid, marginBottom: '24px', fontSize: '15px' }}>Find answers to common questions about orders, shipping, returns, and products.</p>
          <div style={{ position: 'relative', maxWidth: '480px' }}>
            <span style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: C.textMid, display: 'flex', pointerEvents: 'none' }}>
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35" strokeLinecap="round"/></svg>
            </span>
            <input
              type="search"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search FAQs…"
              style={{ width: '100%', background: C.card, border: `1px solid ${C.border}`, color: C.text, padding: '11px 16px 11px 44px', borderRadius: '8px', fontFamily: FONTS.body, fontSize: '14px', outline: 'none', transition: TRANSITION.fast }}
              onFocus={e => e.currentTarget.style.borderColor = C.amber}
              onBlur={e => e.currentTarget.style.borderColor = C.border}
            />
          </div>
        </div>
      </div>

      <div className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: '40px', alignItems: 'start' }} className="faq-layout">
            {/* Category tabs */}
            <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: '10px', overflow: 'hidden', position: 'sticky', top: '80px' }}>
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => { setActiveTab(cat); setSearchQuery(''); }}
                  style={{
                    width: '100%', padding: '13px 16px', background: activeTab === cat ? C.amberLo : 'none',
                    border: 'none', borderLeft: `3px solid ${activeTab === cat ? C.amber : 'transparent'}`,
                    color: activeTab === cat ? C.amber : C.textMid, cursor: 'pointer',
                    fontSize: '14px', fontWeight: 500, textAlign: 'left', fontFamily: FONTS.body, transition: TRANSITION.fast,
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* FAQ content */}
            <div>
              <h2 style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: '22px', color: C.text, marginBottom: '4px' }}>{activeTab}</h2>
              <p style={{ fontSize: '14px', color: C.textMid, marginBottom: '24px' }}>{filteredItems.length} {filteredItems.length === 1 ? 'question' : 'questions'}</p>
              {filteredItems.length === 0 ? (
                <p style={{ color: C.textMid, fontSize: '15px' }}>No results matching "{searchQuery}"</p>
              ) : (
                filteredItems.map((item, i) => (
                  <AccordionItem key={i} question={item.q} answer={item.a} />
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .faq-layout { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </PageWrapper>
  );
}