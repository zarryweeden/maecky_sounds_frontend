import React, { useState } from 'react';
import { C, FONTS, TRANSITION } from '../styles/tokens';
import PageWrapper from '../components/layout/PageWrapper';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import Button from '../components/ui/Button';
import { useUIContext } from '../context/UIContext';

export default function ContactPage() {
  const { addToast } = useUIContext();
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 700));
    setLoading(false);
    setForm({ name: '', email: '', subject: '', message: '' });
    addToast("Message sent! We'll respond within 24 hours ✓");
  };

  const contactDetails = [
    { icon: '📍', label: 'Address', value: 'Oginga Odinga Street, Kisumu CBD, Kenya' },
    { icon: '📞', label: 'Phone', value: '+254 700 123 456', link: 'tel:+254700123456' },
    { icon: '📧', label: 'Email', value: 'hello@maeckysounds.co.ke', link: 'mailto:hello@maeckysounds.co.ke' },
    { icon: '🕐', label: 'Hours', value: 'Mon–Sat: 9am–7pm · Sun: 10am–4pm' },
  ];

  return (
    <PageWrapper>
      <div style={{ padding: '40px 0 28px', background: C.surface, borderBottom: `1px solid ${C.border}` }}>
        <div className="container">
          <h1 style={{ fontFamily: FONTS.display, fontWeight: 800, fontSize: 'clamp(28px, 4vw, 40px)', letterSpacing: '-0.02em', color: C.text }}>
            Get in <span style={{ color: C.amber }}>Touch</span>
          </h1>
          <p style={{ color: C.textMid, marginTop: '8px', fontSize: '15px' }}>We're here to help. Our team responds within 24 hours.</p>
        </div>
      </div>

      <div className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '56px' }} className="contact-layout">
            {/* Form */}
            <div>
              <h3 style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: '20px', color: C.text, marginBottom: '24px' }}>Send a Message</h3>
              <form onSubmit={handleSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                  <Input label="Your Name" value={form.name} onChange={e => set('name', e.target.value)} placeholder="John Kamau" required />
                  <Input label="Email Address" type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="john@email.com" required />
                </div>
                <div style={{ marginBottom: '16px' }}>
                  <Select
                    label="Subject"
                    value={form.subject}
                    onChange={e => set('subject', e.target.value)}
                    options={['General Enquiry', 'Product Question', 'Order Issue', 'Returns & Refunds', 'Partnership', 'Other']}
                    placeholder="Select a subject"
                  />
                </div>
                <div style={{ marginBottom: '24px' }}>
                  <label style={{ fontSize: '13px', fontWeight: 600, color: C.textMid, display: 'block', marginBottom: '6px' }}>Message *</label>
                  <textarea
                    value={form.message}
                    onChange={e => set('message', e.target.value)}
                    placeholder="How can we help you today?"
                    rows={6}
                    required
                    style={{ width: '100%', background: C.card, border: `1px solid ${C.border}`, color: C.text, padding: '12px 16px', borderRadius: '8px', fontFamily: FONTS.body, fontSize: '15px', outline: 'none', resize: 'vertical', transition: TRANSITION.fast, boxSizing: 'border-box' }}
                    onFocus={e => e.currentTarget.style.borderColor = C.amber}
                    onBlur={e => e.currentTarget.style.borderColor = C.border}
                  />
                </div>
                <Button type="submit" variant="primary" size="lg" loading={loading}>Send Message</Button>
              </form>
            </div>

            {/* Contact details */}
            <div>
              <h3 style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: '20px', color: C.text, marginBottom: '24px' }}>Contact Details</h3>
              {contactDetails.map(d => (
                <div key={d.label} style={{ display: 'flex', gap: '16px', marginBottom: '22px' }}>
                  <span style={{ fontSize: '22px', marginTop: '2px', flexShrink: 0 }}>{d.icon}</span>
                  <div>
                    <div style={{ fontSize: '11px', color: C.textLo, textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600, marginBottom: '3px' }}>{d.label}</div>
                    {d.link ? (
                      <a href={d.link} style={{ fontSize: '15px', color: C.amber, textDecoration: 'none' }}>{d.value}</a>
                    ) : (
                      <div style={{ fontSize: '15px', color: C.textMid }}>{d.value}</div>
                    )}
                  </div>
                </div>
              ))}

              {/* Map placeholder */}
              <div style={{ borderRadius: '12px', overflow: 'hidden', border: `1px solid ${C.border}`, marginTop: '24px' }}>
                <img src="https://picsum.photos/seed/nairobi_map/560/220" alt="Maecky Sounds location map" style={{ width: '100%', height: '220px', objectFit: 'cover', display: 'block' }} />
                <div style={{ padding: '14px 16px', background: C.card, fontSize: '13px', color: C.textMid }}>
                  Oginga Odinga Street, Nairobi CBD
                </div>
              </div>

              {/* Social */}
              <div style={{ marginTop: '24px' }}>
                <div style={{ fontSize: '12px', color: C.textLo, textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600, marginBottom: '12px' }}>Follow Us</div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  {['Facebook', 'Instagram', 'Twitter', 'YouTube'].map(s => (
                    <button key={s} title={s} style={{ width: '38px', height: '38px', background: C.card, border: `1px solid ${C.border}`, borderRadius: '8px', fontSize: '12px', fontWeight: 700, color: C.textMid, cursor: 'pointer', transition: TRANSITION.fast }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = C.amber; e.currentTarget.style.color = C.amber; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.textMid; }}
                    >
                      {s[0]}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .contact-layout { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </PageWrapper>
  );
}