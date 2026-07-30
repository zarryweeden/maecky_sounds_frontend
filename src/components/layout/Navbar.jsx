import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCartContext } from '../../context/CartContext';
import { useWishlistContext } from '../../context/WishlistContext';
import { useAuthContext } from '../../context/AuthContext';
import { useUIContext } from '../../context/UIContext';
import { C, FONTS, Z, TRANSITION } from '../../styles/tokens';

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Shop', href: '/category/guitars' },
  { label: 'Deals', href: '/category/guitars?sale=true' },
  { label: 'Blog', href: '/blog' },
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

  const navStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    height: '64px',
    zIndex: Z.nav,
    display: 'flex',
    alignItems: 'center',
    padding: '0 32px',
    transition: 'all 0.3s ease',
    background: scrolled ? 'rgba(10,10,11,0.96)' : 'transparent',
    backdropFilter: scrolled ? 'blur(16px)' : 'none',
    borderBottom: scrolled ? `1px solid rgba(26,26,232,0.2)` : '1px solid transparent',
  };

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
      <nav style={navStyle} aria-label="Main navigation">
        <div style={{
          maxWidth: '1280px',
          width: '100%',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          gap: '32px',
        }}>

          {/* ── Real Logo ──────────────────────────────────────── */}
          <Link
            to="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              textDecoration: 'none',
              flexShrink: 0,
            }}
            aria-label="Maecky Sounds home"
          >
            <img
              src="/logo.jpeg"
              alt="Maecky Sounds"
              style={{
                height: '46px',
                width: 'auto',
                objectFit: 'contain',
                // White background pill so the logo
                // is always readable on the dark navbar
                background: '#fff',
                borderRadius: '8px',
                padding: '4px 10px',
              }}
            />
          </Link>

          {/* ── Desktop Nav Links ───────────────────────────────── */}
          <div
            style={{ display: 'flex', alignItems: 'center', gap: '4px', marginLeft: 'auto' }}
            className="desktop-nav"
          >
            {NAV_LINKS.map(link => {
              const isActive = location.pathname === link.href;
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  style={{
                    fontSize: '14px',
                    fontWeight: 500,
                    fontFamily: FONTS.body,
                    color: isActive ? '#fff' : C.textMid,
                    padding: '8px 12px',
                    borderRadius: '6px',
                    textDecoration: 'none',
                    transition: TRANSITION.fast,
                    background: isActive ? 'rgba(26,26,232,0.15)' : 'transparent',
                    whiteSpace: 'nowrap',
                  }}
                  onMouseEnter={e => {
                    if (!isActive) {
                      e.currentTarget.style.color = '#fff';
                      e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                    }
                  }}
                  onMouseLeave={e => {
                    if (!isActive) {
                      e.currentTarget.style.color = C.textMid;
                      e.currentTarget.style.background = 'transparent';
                    }
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* ── Action Buttons ──────────────────────────────────── */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginLeft: '16px' }}>

            {/* Search */}
            <button
              style={iconBtnStyle}
              onClick={openSearch}
              aria-label="Open search"
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = '#fff'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = C.textMid; }}
            >
              <svg width="19" height="19" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" strokeLinecap="round" />
              </svg>
            </button>

            {/* Wishlist */}
            <button
              style={{ ...iconBtnStyle, position: 'relative' }}
              onClick={() => navigate('/wishlist')}
              aria-label={`Wishlist (${wishCount} items)`}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = '#fff'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = C.textMid; }}
            >
              <svg width="19" height="19" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
              </svg>
              {wishCount > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '4px', right: '4px',
                  width: '16px', height: '16px',
                  background: '#E81A1A',
                  color: '#fff',
                  fontSize: '10px', fontWeight: 700,
                  borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: FONTS.body,
                }}>
                  {wishCount > 9 ? '9+' : wishCount}
                </span>
              )}
            </button>

            {/* Account */}
            <button
              style={iconBtnStyle}
              onClick={() => navigate(isAuthenticated ? '/account' : '/login')}
              aria-label={isAuthenticated ? `My account` : 'Sign in'}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = '#fff'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = C.textMid; }}
            >
              {isAuthenticated && user ? (
                <div style={{
                  width: '28px', height: '28px',
                  borderRadius: '50%',
                  background: 'rgba(26,26,232,0.2)',
                  border: `1.5px solid rgba(26,26,232,0.5)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: FONTS.display, fontWeight: 700,
                  fontSize: '11px', color: '#6b6bff',
                }}>
                  {user.full_name?.[0]?.toUpperCase() || 'U'}
                </div>
              ) : (
                <svg width="19" height="19" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              )}
            </button>

            {/* Cart button — blue to match logo */}
            <button
              onClick={openCart}
              aria-label={`Shopping cart (${itemCount} items)`}
              style={{
                background: '#1A1AE8',
                color: '#fff',
                padding: '8px 16px',
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
              }}
              onMouseEnter={e => e.currentTarget.style.background = '#3333ff'}
              onMouseLeave={e => e.currentTarget.style.background = '#1A1AE8'}
            >
              <svg width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 01-8 0" />
              </svg>
              Cart
              {itemCount > 0 && (
                <span style={{
                  background: 'rgba(255,255,255,0.25)',
                  borderRadius: '99px',
                  padding: '1px 7px',
                  fontSize: '12px',
                  fontWeight: 800,
                }}>
                  {itemCount}
                </span>
              )}
            </button>

            {/* Mobile hamburger */}
            <button
              style={{ ...iconBtnStyle, display: 'none' }}
              onClick={() => setMobileOpen(v => !v)}
              aria-label="Toggle mobile menu"
              className="mobile-menu-btn"
            >
              {mobileOpen ? (
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
                </svg>
              ) : (
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M3 12h18M3 6h18M3 18h18" strokeLinecap="round" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div style={{
        position: 'fixed',
        top: '64px', left: 0, right: 0,
        background: 'rgba(10,10,11,0.98)',
        borderBottom: `1px solid rgba(26,26,232,0.2)`,
        zIndex: Z.nav - 1,
        transform: mobileOpen ? 'translateY(0)' : 'translateY(-100%)',
        opacity: mobileOpen ? 1 : 0,
        transition: 'transform 0.3s ease, opacity 0.2s ease',
        pointerEvents: mobileOpen ? 'all' : 'none',
        padding: '16px 24px 24px',
      }}>
        {NAV_LINKS.map(link => (
          <Link
            key={link.href}
            to={link.href}
            style={{
              display: 'block',
              padding: '12px 0',
              fontFamily: FONTS.body,
              fontSize: '16px',
              fontWeight: 500,
              color: location.pathname === link.href ? '#1A1AE8' : C.textMid,
              textDecoration: 'none',
              borderBottom: `1px solid ${C.border}`,
            }}
          >
            {link.label}
          </Link>
        ))}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </>
  );
}