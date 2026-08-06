import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCartContext } from '../../context/CartContext';
import { useWishlistContext } from '../../context/WishlistContext';
import { useAuthContext } from '../../context/AuthContext';
import { useUIContext } from '../../context/UIContext';
import { C, FONTS, Z, TRANSITION } from '../../styles/tokens';
import {
  Guitar,
  Piano,
  Mic2,
  Headphones,
  Package,
  BadgePercent,
  Heart,
  ShoppingCart,
  Phone,
  Info,
  ChevronRight,
} from "lucide-react";

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Shop', href: '/category/guitars' },
  { label: 'Deals', href: '/category/guitars?sale=true' },
  { label: 'Contact', href: '/contact' },
  { label: 'About', href: '/about' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const { itemCount } = useCartContext();
  const { itemCount: wishCount } = useWishlistContext();
  const { isAuthenticated, user } = useAuthContext();
  const { openCart, openSearch } = useUIContext();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const MenuItem = ({ icon, label, to }) => (
    <Link
      to={to}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '15px 22px',
        textDecoration: 'none',
        color: location.pathname === to ? C.amber : C.text,
        transition: '.2s',
        borderBottom: `1px solid ${C.border}`,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        {icon}
        <span>{label}</span>
      </div>
      <ChevronRight size={16} color={C.textMid} />
    </Link>
  );

  const iconBtnStyle = {
    width: '38px',
    height: '38px',
    borderRadius: '8px',
    border: 'none',
    background: 'transparent',
    color: C.textMid,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: TRANSITION.fast,
    position: 'relative',
    flexShrink: 0,
  };

  return (
    <>
      {/* ── NAV SHELL ─────────────────────────────────────────── */}
      <nav
        aria-label="Main navigation"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: Z.nav,
          background: scrolled ? 'rgba(255,255,255,0.97)' : 'rgba(255,255,255,0.92)',
          backdropFilter: 'blur(16px)',
          borderBottom: `1px solid ${scrolled ? C.border : 'transparent'}`,
          boxShadow: scrolled ? '0 1px 12px rgba(0,0,0,0.08)' : 'none',
          transition: 'all 0.3s ease',
        }}
      >
        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '0 24px',
          }}
        >

          {/* ── ROW 1: hamburger · logo · actions ─────────────── */}
          <div
            style={{
              height: '64px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            {/* Hamburger — always visible */}
            <button
              onClick={() => setMobileOpen(v => !v)}
              aria-label="Open menu"
              style={{
                ...iconBtnStyle,
                flexShrink: 0,
                color: C.text,
              }}
              onMouseEnter={e => e.currentTarget.style.background = C.amberLo}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" viewBox="0 0 24 24">
                <path d="M3 6h18M3 12h18M3 18h18" />
              </svg>
            </button>

            {/* Logo */}
            <Link
              to="/"
              style={{
                display: 'flex',
                alignItems: 'center',
                textDecoration: 'none',
                flexShrink: 0,
                gap: '8px',
              }}
            >
              <img
                src="/logo-transparent.png"
                alt="Maecky Sounds"
                style={{ height: '42px', width: 'auto' }}
              />
              <span
                className="nav-logo-text"
                style={{
                  fontFamily: FONTS.display,
                  fontWeight: 800,
                  fontSize: '20px',
                  color: C.text,
                  whiteSpace: 'nowrap',
                }}
              >
                Maecky <span style={{ color: C.amber }}>Sounds</span>
              </span>
            </Link>

            {/* Search — desktop only (hidden on mobile via CSS) */}
            <div
              className="nav-search-desktop"
              style={{
                flex: 1,
                maxWidth: '520px',
                position: 'relative',
                margin: '0 16px',
              }}
            >
              <SearchBox openSearch={openSearch} />
            </div>

            {/* Spacer pushes actions to the right on desktop */}
            <div style={{ flex: 1 }} className="nav-spacer-mobile-hide" />

            {/* Actions */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', flexShrink: 0 }}>

              {/* Wishlist */}
              <button
                style={iconBtnStyle}
                onClick={() => navigate('/wishlist')}
                aria-label={`Wishlist (${wishCount} items)`}
                onMouseEnter={e => { e.currentTarget.style.background = C.amberLo; e.currentTarget.style.color = C.amber; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = C.textMid; }}
              >
                <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                </svg>
                {wishCount > 0 && (
                  <span style={{
                    position: 'absolute', top: '4px', right: '4px',
                    width: '16px', height: '16px',
                    background: C.amber, color: '#000',
                    fontSize: '10px', fontWeight: 700,
                    borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    {wishCount > 9 ? '9+' : wishCount}
                  </span>
                )}
              </button>

              {/* Account — desktop only */}
              <button
                className="nav-account-btn"
                style={iconBtnStyle}
                onClick={() => navigate(isAuthenticated ? '/account' : '/login')}
                aria-label={isAuthenticated ? 'My account' : 'Sign in'}
                onMouseEnter={e => { e.currentTarget.style.background = C.amberLo; e.currentTarget.style.color = C.amber; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = C.textMid; }}
              >
                {isAuthenticated && user ? (
                  <div style={{
                    width: '28px', height: '28px', borderRadius: '50%',
                    background: C.amberLo, border: `1.5px solid rgba(232,135,26,0.4)`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: FONTS.display, fontWeight: 700, fontSize: '11px', color: C.amber,
                  }}>
                    {(user.full_name || user.name)?.[0]?.toUpperCase() || 'U'}
                  </div>
                ) : (
                  <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                )}
              </button>

              {/* Cart */}
              <button
                onClick={openCart}
                aria-label={`Cart (${itemCount} items)`}
                style={{
                  background: C.amber,
                  color: '#000',
                  height: '42px',
                  padding: '0 18px',
                  borderRadius: '8px',
                  border: 'none',
                  fontWeight: 700,
                  fontSize: '14px',
                  fontFamily: FONTS.body,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: TRANSITION.fast,
                  flexShrink: 0,
                }}
                onMouseEnter={e => e.currentTarget.style.background = C.amberHi}
                onMouseLeave={e => e.currentTarget.style.background = C.amber}
              >
                <svg width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 01-8 0" />
                </svg>
                {/* Hide "Cart" text on small screens */}
                <span className="cart-label">Cart</span>
                {itemCount > 0 && (
                  <span style={{
                    background: 'rgba(0,0,0,0.22)',
                    borderRadius: '99px',
                    padding: '1px 7px',
                    fontSize: '12px',
                    fontWeight: 800,
                  }}>
                    {itemCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* ── ROW 2: search — mobile only ───────────────────── */}
          <div className="nav-search-mobile" style={{ paddingBottom: '12px' }}>
            <SearchBox openSearch={openSearch} />
          </div>

        </div>
      </nav>

      {/* ── SLIDE-IN DRAWER ───────────────────────────────────── */}
      <aside
        style={{
          position: 'fixed',
          top: 0, left: 0,
          width: '320px',
          maxWidth: '90vw',
          height: '100vh',
          background: '#fff',
          transform: mobileOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.35s cubic-bezier(0.22,1,0.36,1)',
          boxShadow: '8px 0 30px rgba(0,0,0,0.12)',
          zIndex: Z.nav + 21,
          display: 'flex',
          flexDirection: 'column',
          overflowY: 'auto',
        }}
      >
        {/* Drawer header */}
        <div style={{
          height: 72,
          padding: '0 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: `1px solid ${C.border}`,
          flexShrink: 0,
        }}>
          <div>
            <div style={{ fontFamily: FONTS.display, fontWeight: 800, fontSize: 20, color: C.text }}>
              Maecky Sounds
            </div>
            <div style={{ color: C.textMid, fontSize: 13 }}>A Complete Tune</div>
          </div>
          <button
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
            style={{
              width: 40, height: 40,
              borderRadius: 8,
              border: `1px solid ${C.border}`,
              background: 'transparent',
              cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: C.text, fontSize: 18,
            }}
          >
            ✕
          </button>
        </div>

        {/* Account row */}
        <div style={{ padding: 20, borderBottom: `1px solid ${C.border}` }}>
          <div style={{ fontWeight: 700, marginBottom: 8, color: C.text, fontSize: 15 }}>
            {isAuthenticated ? `Hello, ${user?.full_name || user?.name || 'there'}` : 'Welcome'}
          </div>
          <button
            onClick={() => { navigate(isAuthenticated ? '/account' : '/login'); setMobileOpen(false); }}
            style={{
              background: C.amber, color: '#000',
              border: 'none', borderRadius: 8,
              padding: '10px 18px',
              fontWeight: 700, fontSize: 14,
              fontFamily: FONTS.body,
              cursor: 'pointer',
            }}
          >
            {isAuthenticated ? 'My Account' : 'Sign In'}
          </button>
        </div>

        {/* Shop links */}
        <div style={{ paddingTop: 18 }}>
          <SectionLabel>SHOP</SectionLabel>
          <MenuItem icon={<Guitar size={20} />} label="Guitars" to="/category/guitars" location={location} />
          <MenuItem icon={<Piano size={20} />} label="Keyboards & Pianos" to="/category/keyboards-pianos" location={location} />
          <MenuItem icon={<Mic2 size={20} />} label="Studio & Recording" to="/category/studio-recording" location={location} />
          <MenuItem icon={<Headphones size={20} />} label="DJ Equipment" to="/category/dj-equipment" location={location} />
          <MenuItem icon={<Package size={20} />} label="Accessories" to="/category/accessories" location={location} />
        </div>

        {/* Discover */}
        <div style={{ paddingTop: 20 }}>
          <SectionLabel>DISCOVER</SectionLabel>
          <MenuItem icon={<BadgePercent size={20} />} label="Deals" to="/category/guitars" location={location} />
          <MenuItem icon={<Heart size={20} />} label="Wishlist" to="/wishlist" location={location} />
          <MenuItem icon={<ShoppingCart size={20} />} label="Cart" to="/cart" location={location} />
        </div>

        {/* Info */}
        <div style={{ paddingTop: 20 }}>
          <SectionLabel>INFORMATION</SectionLabel>
          <MenuItem icon={<Phone size={20} />} label="Contact Us" to="/contact" location={location} />
          <MenuItem icon={<Info size={20} />} label="About Maecky Sounds" to="/about" location={location} />
        </div>

        {/* Footer */}
        <div style={{
          marginTop: 'auto',
          padding: 20,
          fontSize: 12,
          color: C.textMid,
          borderTop: `1px solid ${C.border}`,
          lineHeight: 1.8,
        }}>
          © 2026 Maecky Sounds<br />Your Complete Tune
        </div>
      </aside>

      {/* Backdrop */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          style={{
            position: 'fixed', inset: 0,
            background: 'rgba(0,0,0,0.35)',
            zIndex: Z.nav + 20,
          }}
        />
      )}

      {/* ── RESPONSIVE STYLES ─────────────────────────────────── */}
      <style>{`
        /* Desktop: show search in row 1, hide row 2 search */
        .nav-search-desktop { display: block; }
        .nav-search-mobile  { display: none;  }
        .nav-spacer-mobile-hide { display: flex; }

        /* Desktop: show account button */
        .nav-account-btn { display: flex; }

        /* Desktop: show logo text */
        .nav-logo-text { display: inline; }

        /* Desktop: show cart label */
        .cart-label { display: inline; }

        /* ── Tablet ── */
        @media (max-width: 900px) {
          .nav-logo-text { font-size: 16px !important; }
        }

        /* ── Mobile ── */
        @media (max-width: 768px) {
          /* Move search to row 2 */
          .nav-search-desktop { display: none !important; }
          .nav-search-mobile  { display: block !important; }

          /* Remove spacer so actions sit right after logo */
          .nav-spacer-mobile-hide { display: none !important; }

          /* Hide logo text on small phones */
          .nav-logo-text { display: none !important; }

          /* Hide account icon — accessed via drawer */
          .nav-account-btn { display: none !important; }

          /* Hide cart text label */
          .cart-label { display: none !important; }

          /* Container padding */
          nav > div { padding: 0 16px !important; }
        }

        @media (max-width: 480px) {
          .cart-label { display: none !important; }
        }
      `}</style>
    </>
  );
}

/* ── Shared sub-components ──────────────────────────────────────────────── */

function SearchBox({ openSearch }) {
  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <svg
        width="18" height="18"
        fill="none" stroke="#9090A0" strokeWidth="2"
        viewBox="0 0 24 24"
        style={{
          position: 'absolute', left: '16px',
          top: '50%', transform: 'translateY(-50%)',
          pointerEvents: 'none', zIndex: 2,
        }}
      >
        <circle cx="11" cy="11" r="8" />
        <path d="M21 21l-4.35-4.35" />
      </svg>
      <input
        readOnly
        onClick={openSearch}
        placeholder="Search instruments, gear & accessories"
        style={{
          width: '100%',
          height: '44px',
          padding: '0 48px 0 46px',
          background: '#F9F9F9',
          border: '1px solid #E5E7EB',
          borderRadius: '999px',
          fontSize: '14px',
          fontFamily: 'Inter, sans-serif',
          color: '#111113',
          outline: 'none',
          cursor: 'pointer',
          boxSizing: 'border-box',
          transition: 'all 0.2s ease',
        }}
        onMouseEnter={e => {
          e.target.style.background = '#fff';
          e.target.style.borderColor = '#E8871A';
          e.target.style.boxShadow = '0 4px 16px rgba(232,135,26,0.12)';
        }}
        onMouseLeave={e => {
          e.target.style.background = '#F9F9F9';
          e.target.style.borderColor = '#E5E7EB';
          e.target.style.boxShadow = 'none';
        }}
      />
      <kbd style={{
        position: 'absolute', right: '14px',
        top: '50%', transform: 'translateY(-50%)',
        background: '#fff', border: '1px solid #E5E7EB',
        borderRadius: '6px', padding: '2px 8px',
        fontSize: '11px', color: '#9090A0',
        fontFamily: 'JetBrains Mono, monospace',
        pointerEvents: 'none',
      }}>
        /
      </kbd>
    </div>
  );
}

function SectionLabel({ children }) {
  return (
    <div style={{
      padding: '0 22px 10px',
      fontSize: 11,
      fontWeight: 700,
      letterSpacing: 1.2,
      color: '#9090A0',
      fontFamily: 'Inter, sans-serif',
    }}>
      {children}
    </div>
  );
}

function MenuItem({ icon, label, to, location }) {
  return (
    <Link
      to={to}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '15px 22px',
        textDecoration: 'none',
        color: location.pathname === to ? '#E8871A' : '#111113',
        borderBottom: '1px solid #E2E2E8',
        transition: 'background 0.15s',
        fontSize: 15,
      }}
      onMouseEnter={e => e.currentTarget.style.background = '#FFF8F0'}
      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        {icon}
        <span>{label}</span>
      </div>
      <ChevronRight size={16} color="#9090A0" />
    </Link>
  );
}