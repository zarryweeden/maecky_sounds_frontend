import React, { useState, useEffect, useRef } from 'react';
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
} from 'lucide-react';

export default function Navbar() {
  const navRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const { itemCount } = useCartContext();
  const { itemCount: wishCount } = useWishlistContext();
  const { isAuthenticated, user } = useAuthContext();
  const { openCart, openSearch } = useUIContext();

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const updateHeight = () => {
      document.documentElement.style.setProperty(
        '--navbar-height',
        `${nav.offsetHeight}px`
      );
    };

    updateHeight();
    const ro = new ResizeObserver(updateHeight);
    ro.observe(nav);
    window.addEventListener('resize', updateHeight);

    return () => {
      ro.disconnect();
      window.removeEventListener('resize', updateHeight);
    };
  }, []);

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
      className="drawer-item"
      style={{
        color: location.pathname === to ? C.amber : C.text,
        borderBottom: `1px solid ${C.border}`,
      }}
    >
      <div className="drawer-item-left">
        <span className="drawer-icon">{icon}</span>
        <span className="drawer-label">{label}</span>
      </div>
      <ChevronRight size={16} color={C.textMid} className="drawer-chevron" />
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
      <nav
        ref={navRef}
        aria-label="Main navigation"
        className="navbar"
        style={{
          background: scrolled ? 'rgba(255,255,255,0.97)' : 'rgba(255,255,255,0.92)',
          borderBottom: `1px solid ${scrolled ? C.border : 'transparent'}`,
          boxShadow: scrolled ? '0 1px 12px rgba(0,0,0,0.08)' : 'none',
        }}
      >
        <div className="navbar-inner">
          <div className="navbar-top">
            <button
              onClick={() => setMobileOpen(v => !v)}
              aria-label="Open menu"
              className="navbar-hamburger"
              style={{
                ...iconBtnStyle,
                flexShrink: 0,
                color: C.text,
              }}
              onMouseEnter={e => { e.currentTarget.style.background = C.amberLo; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
            >
              <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" viewBox="0 0 24 24">
                <path d="M3 6h18M3 12h18M3 18h18" />
              </svg>
            </button>

            <Link to="/" className="navbar-logo">
              <img
                src="/logo-transparent.png"
                alt="Maecky Sounds"
                className="navbar-logo-img"
              />
              <span
                className="nav-logo-text"
                style={{
                  fontFamily: FONTS.display,
                  fontWeight: 800,
                  fontSize: '20px',
                  color: C.text,
                }}
              >
                Maecky <span style={{ color: C.amber }}>Sounds</span>
              </span>
            </Link>

            <div className="nav-search-desktop">
              <SearchBox openSearch={openSearch} />
            </div>

            <div className="nav-spacer-mobile-hide" />

            <div className="navbar-actions">
              <button
                style={iconBtnStyle}
                className="navbar-icon-btn"
                onClick={() => navigate('/wishlist')}
                aria-label={`Wishlist (${wishCount} items)`}
                onMouseEnter={e => { e.currentTarget.style.background = C.amberLo; e.currentTarget.style.color = C.amber; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = C.textMid; }}
              >
                <svg className="navbar-icon-svg" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                </svg>
                {wishCount > 0 && (
                  <span className="navbar-badge" style={{
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

              <button
                className="nav-account-btn navbar-icon-btn"
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

              <button
                onClick={openCart}
                aria-label={`Cart (${itemCount} items)`}
                className="navbar-cart-btn"
                style={{
                  background: C.amber,
                  color: '#000',
                  border: 'none',
                  fontWeight: 700,
                  fontSize: '14px',
                  fontFamily: FONTS.body,
                  cursor: 'pointer',
                  transition: TRANSITION.fast,
                }}
                onMouseEnter={e => { e.currentTarget.style.background = C.amberHi; }}
                onMouseLeave={e => { e.currentTarget.style.background = C.amber; }}
              >
                <svg className="navbar-icon-svg" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 01-8 0" />
                </svg>
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

          <div className="nav-search-mobile navbar-search-mobile">
            <SearchBox openSearch={openSearch} />
          </div>
        </div>
      </nav>

      <aside
        className="navbar-drawer"
        style={{
          transform: mobileOpen ? 'translateX(0)' : 'translateX(-100%)',
        }}
      >
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

        <div style={{ paddingTop: 18 }}>
          <SectionLabel>SHOP</SectionLabel>
          <MenuItem icon={<Guitar size={20} />} label="Guitars" to="/category/guitars" />
          <MenuItem icon={<Piano size={20} />} label="Keyboards & Pianos" to="/category/keyboards-pianos" />
          <MenuItem icon={<Mic2 size={20} />} label="Studio & Recording" to="/category/studio-recording" />
          <MenuItem icon={<Headphones size={20} />} label="DJ Equipment" to="/category/dj-equipment" />
          <MenuItem icon={<Package size={20} />} label="Accessories" to="/category/accessories" />
        </div>

        <div style={{ paddingTop: 20 }}>
          <SectionLabel>DISCOVER</SectionLabel>
          <MenuItem icon={<BadgePercent size={20} />} label="Deals" to="/category/guitars" />
          <MenuItem icon={<Heart size={20} />} label="Wishlist" to="/wishlist" />
          <MenuItem icon={<ShoppingCart size={20} />} label="Cart" to="/cart" />
        </div>

        <div style={{ paddingTop: 20 }}>
          <SectionLabel>INFORMATION</SectionLabel>
          <MenuItem icon={<Phone size={20} />} label="Contact Us" to="/contact" />
          <MenuItem icon={<Info size={20} />} label="About Maecky Sounds" to="/about" />
        </div>

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

      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="navbar-drawer-backdrop"
        />
      )}
    </>
  );
}

function SearchBox({ openSearch }) {
  return (
    <div className="search-box">
      <svg
        width="18" height="18"
        fill="none" stroke="#9090A0" strokeWidth="2"
        viewBox="0 0 24 24"
        className="search-box-icon"
      >
        <circle cx="11" cy="11" r="8" />
        <path d="M21 21l-4.35-4.35" />
      </svg>
      <input
        readOnly
        onClick={openSearch}
        placeholder="Search instruments, gear & accessories"
        className="search-box-input"
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
      <kbd className="search-kbd-hint">/</kbd>
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
