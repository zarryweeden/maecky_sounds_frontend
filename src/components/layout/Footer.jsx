import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { C, FONTS, TRANSITION } from '../../styles/tokens';
import { newsletterService } from '../../services/api';
import { useUIContext } from '../../context/UIContext';
import {
  SiFacebook,
  SiInstagram,
  SiTiktok,
  SiYoutube,
  SiX
} from "react-icons/si";

const SHOP_LINKS = [
  { label: 'Guitars', href: '/category/guitars' },
  { label: 'Keyboards & Pianos', href: '/category/keyboards-pianos' },
  { label: 'Drums & Percussion', href: '/category/drums-percussion' },
  { label: 'Studio & Recording', href: '/category/studio-recording' },
  { label: 'DJ Equipment', href: '/category/dj-equipment' },
  { label: 'Accessories', href: '/category/accessories' },
];

const COMPANY_LINKS = [
  { label: 'About Us', href: '/about' },
  { label: 'Contact', href: '/contact' },

];



const socials = [
  {
    icon: <SiFacebook size={16} />,
    label: "Facebook",
    href: "https://web.facebook.com/emmanuel.inganga"
  },
  {
    icon: <SiInstagram size={16} />,
    label: "Instagram",
    href: "https://www.instagram.com/maeckysounds/"
  },
  {
    icon: <SiX size={16} />,
    label: "X"
  },
  {
    icon: <SiTiktok size={16} />,
    label: "Tiktok",
    href:"https://www.tiktok.com/@maeckysoundskisumu"
  }
];

function FooterLink({ href, children }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      to={href}
      style={{
        display: 'block',
        fontSize: '14px',
        color: hovered ? C.amber : C.textMid,
        textDecoration: 'none',
        marginBottom: '10px',
        transition: TRANSITION.fast,
        fontFamily: FONTS.body,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
    </Link>
  );
}

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribeState, setSubscribeState] = useState('idle');
  const { addToast } = useUIContext();

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email.includes('@')) return;
    setSubscribeState('loading');
    try {
      await newsletterService.subscribe(email);
      setSubscribeState('done');
      setEmail('');
      addToast('Subscribed! Welcome to Maecky Sounds ✓');
    } catch {
      setSubscribeState('idle');
      addToast('Something went wrong. Please try again.', 'error');
    }
  };

  return (
    <footer style={{
      background: C.surface,
      borderTop: `1px solid ${C.border}`,
      padding: '56px 0 24px',
      marginTop: 'auto',
    }}>
      <div className="container">
        {/* Main grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr 1fr',
          gap: '48px',
          marginBottom: '48px',
        }}>
          {/* Brand */}
          <div>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', marginBottom: '16px' }}>
            <img
              src="/logo-transparent.png"
              alt="Maecky Sounds — A Complete Tune"
              style={{
                height: '46px',
                width: 'auto',
                objectFit: 'contain',

              }}
            />
              <span style={{ fontFamily: FONTS.display, fontWeight: 800, fontSize: '17px', color: C.text }}>
                Maecky <span style={{ color: C.amber }}>Sounds</span>
              </span>
            </Link>

            <p style={{ fontSize: '14px', color: C.textMid, lineHeight: 1.75, maxWidth: '280px', marginBottom: '20px' }}>
              Kisumu's premier music store. Bringing world-class instruments to Kenyan musicians since 2015.
            </p>

            {/* Newsletter */}
            <form onSubmit={handleSubscribe} style={{ marginBottom: '20px' }}>
              <p style={{ fontSize: '13px', fontWeight: 600, color: C.textMid, marginBottom: '8px' }}>Get exclusive deals →</p>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  disabled={subscribeState === 'done'}
                  style={{
                    flex: 1,
                    background: C.card,
                    border: `1px solid ${C.border}`,
                    color: C.text,
                    padding: '9px 12px',
                    borderRadius: '8px',
                    fontFamily: FONTS.body,
                    fontSize: '13px',
                    outline: 'none',
                    minWidth: 0,
                  }}
                />
                <button
                  type="submit"
                  disabled={subscribeState !== 'idle'}
                  style={{
                    background: C.amber,
                    color: '#000',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '9px 14px',
                    fontSize: '13px',
                    fontWeight: 700,
                    fontFamily: FONTS.body,
                    cursor: subscribeState === 'idle' ? 'pointer' : 'default',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {subscribeState === 'loading' ? '…' : subscribeState === 'done' ? '✓' : 'Subscribe'}
                </button>
              </div>
            </form>

            {/* Social */}
            <div style={{ display: 'flex', gap: '8px' }}>
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    width: '36px',
                    height: '36px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: C.card,
                    border: `1px solid ${C.border}`,
                    borderRadius: '8px',
                    color: C.textMid,
                    cursor: 'pointer',
                    transition: TRANSITION.fast,
                    textDecoration: 'none',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = C.amber;
                    e.currentTarget.style.color = C.amber;
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = C.border;
                    e.currentTarget.style.color = C.textMid;
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 style={{
              fontFamily: FONTS.display,
              fontWeight: 700,
              fontSize: '13px',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: C.textMid,
              marginBottom: '16px',
            }}>
              Shop
            </h4>
            {SHOP_LINKS.map(l => <FooterLink key={l.href} href={l.href}>{l.label}</FooterLink>)}
          </div>

          {/* Company */}
          <div>
            <h4 style={{
              fontFamily: FONTS.display,
              fontWeight: 700,
              fontSize: '13px',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: C.textMid,
              marginBottom: '16px',
            }}>
              Company
            </h4>
            {COMPANY_LINKS.map(l => <FooterLink key={l.href} href={l.href}>{l.label}</FooterLink>)}
          </div>

          {/* Support */}
          <div>


            <div style={{
              marginTop: '20px',
              padding: '14px',
              background: C.card,
              border: `1px solid ${C.border}`,
              borderRadius: '8px',
            }}>
              <div style={{ fontSize: '12px', color: C.textMid, marginBottom: '4px' }}>Mon – Sat 9am – 7pm</div>
             <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                marginTop: '10px',
              }}
            >
              <a
                href="tel:+254721903906"
                style={{
                  fontSize: '14px',
                  fontWeight: 600,
                  color: C.amber,
                  textDecoration: 'none',
                }}
              >
                +254 721 903 906
              </a>

              <a
                href="tel:+254701210797"
                style={{
                  fontSize: '14px',
                  fontWeight: 600,
                  color: C.amber,
                  textDecoration: 'none',
                }}
              >
                +254 701 210 797
              </a>
            </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: `1px solid ${C.border}`,
          paddingTop: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
        }}>
          <span style={{ fontSize: '13px', color: C.textLo }}>
            © 2026 Maecky Sounds Ltd. All rights reserved. Kisumu, Kenya.
          </span>

        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          footer .container > div:first-child {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 640px) {
          footer .container > div:first-child {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
          footer .container > div:last-child {
            flex-direction: column !important;
            align-items: flex-start !important;
          }
        }
      `}</style>
    </footer>
  );
}