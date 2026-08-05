import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCartContext } from '../../context/CartContext';
import { useWishlistContext } from '../../context/WishlistContext';
import { useAuthContext } from '../../context/AuthContext';
import { useUIContext } from '../../context/UIContext';
import { C, FONTS, Z, TRANSITION } from '../../styles/tokens';

function LogoMark({ className = '' }) {
  return (
    <svg className={className} width="32" height="32" viewBox="0 0 32 32" fill="none">
      <rect width="32" height="32" rx="8" fill={C.amber} fillOpacity="0.15" />
      <path
        d="M8 22V10l8 4 8-4v12"
        stroke={C.amber}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="8" cy="22" r="2.5" fill={C.amber} />
      <circle cx="24" cy="22" r="2.5" fill={C.amber} />
    </svg>
  );
}

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
    background: scrolled ? 'rgba(255,255,255,0.96)' : 'rgba(255,255,255,0.85)',
    backdropFilter: 'blur(16px)',
    borderBottom: `1px solid ${scrolled ? C.border : 'transparent'}`,
    boxShadow: scrolled ? '0 1px 12px rgba(0,0,0,0.08)' : 'none',
  };

  const iconBtnStyle = (active = false) => ({
    width: '38px',
    height: '38px',
    borderRadius: '8px',
    border: 'none',
    background: active ? C.amberLo : 'transparent',
    color: active ? C.amber : C.textMid,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: TRANSITION.fast,
    position: 'relative',
    flexShrink: 0,
  });

  return (
    <>
      <nav style={navStyle} aria-label="Main navigation">
        <div style={{
          maxWidth: "1280px",
          width: "100%",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "20px",
        }}>
          {/* Logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
            flexShrink: 0,
          }}
        >

          {/* Hamburger */}

          <button
            className="desktop-hamburger"
            onClick={() => setMobileOpen(v => !v)}
            style={{
              width: "44px",
              height: "44px",
              border: "none",
              background: "transparent",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: TRANSITION.fast,
            }}
          >
            <svg
              width="24"
              height="24"
              fill="none"
              stroke={C.text}
              strokeWidth="2.6"
              viewBox="0 0 24 24"
            >
              <path d="M3 6h18M3 12h18M3 18h18"/>
            </svg>
          </button>

          {/* Logo */}

          <Link
            to="/"
            style={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
            }}
          >
              <img
                  src="/logo-transparent.png"
                  alt="Maecky Sounds"
                  style={{
                      height: "44px",
                      width: "auto",
                  }}
              />
          </Link>

        </div>

        <div
            className="navbar-search"
            style={{
                flex: 1,
                maxWidth: "620px",
                position: "relative",
                marginLeft:'auto'
            }}
        >

            <svg
                width="18"
                height="18"
                fill="none"
                stroke={C.textMid}
                strokeWidth="2"
                viewBox="0 0 24 24"
                style={{
                    position: "absolute",
                    left: "16px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    pointerEvents: "none",
                    zIndex: 2,
                }}
            >
                <circle cx="11" cy="11" r="8"/>
                <path d="M21 21l-4.35-4.35"/>
            </svg>

            <input
                readOnly
                onClick={openSearch}
                placeholder="Search guitars, keyboards, microphones..."
                style={{
                    width: "100%",
                    height: "46px",

                    padding: "0 56px 0 46px",

                    background: "#F9F9F9",

                    border: "1px solid #E5E7EB",

                    borderRadius: "999px",

                    fontSize: "15px",

                    fontFamily: FONTS.body,

                    color: C.text,

                    outline: "none",

                    cursor: "pointer",

                    transition: "all .25s ease",

                    boxSizing: "border-box",

                    boxShadow: "0 2px 8px rgba(0,0,0,.04)",
                }}

                onMouseEnter={e=>{
                    e.target.style.background="#fff";
                    e.target.style.borderColor=C.amber;
                    e.target.style.boxShadow="0 8px 25px rgba(232,135,26,.12)";
                }}

                onMouseLeave={e=>{
                    e.target.style.background="#F9F9F9";
                    e.target.style.borderColor="#E5E7EB";
                    e.target.style.boxShadow="0 2px 8px rgba(0,0,0,.04)";
                }}
            />

            <kbd
                style={{
                    position: "absolute",
                    right: "14px",
                    top: "50%",
                    transform: "translateY(-50%)",

                    background: "#fff",

                    border: "1px solid #E5E7EB",

                    borderRadius: "6px",

                    padding: "2px 8px",

                    fontSize: "11px",

                    color: C.textMid,

                    fontFamily: FONTS.mono,
                }}
            >
                /
            </kbd>

        </div>


          {/* Action buttons */}
          <div   className="navbar-actions"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                marginLeft: '0',
                flexShrink: 0,
              }}>


            {/* Wishlist */}
            <button
              style={iconBtnStyle()}
              onClick={() => navigate('/wishlist')}
              aria-label={`Wishlist (${wishCount} items)`}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = C.text; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = C.textMid; }}
            >
              <svg width="19" height="19" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
              </svg>
              {wishCount > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '4px',
                  right: '4px',
                  width: '16px',
                  height: '16px',
                  background: C.amber,
                  color: '#000',
                  fontSize: '10px',
                  fontWeight: 700,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: FONTS.body,
                }}>
                  {wishCount > 9 ? '9+' : wishCount}
                </span>
              )}
            </button>

            {/* Account */}
            <button
              style={iconBtnStyle()}
              onClick={() => navigate(isAuthenticated ? '/account' : '/login')}
              aria-label={isAuthenticated ? `My account (${user?.name})` : 'Sign in'}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = C.text; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = C.textMid; }}
            >
              {isAuthenticated && user ? (
                <div style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  background: C.amberLo,
                  border: `1.5px solid rgba(232,135,26,0.4)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: FONTS.display,
                  fontWeight: 700,
                  fontSize: '11px',
                  color: C.amber,
                }}>
                  {user.name?.[0]?.toUpperCase() || 'U'}
                </div>
              ) : (
                <svg width="19" height="19" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" />
                </svg>
              )}
            </button>

            {/* Cart */}
            <button
              onClick={openCart}
              aria-label={`Shopping cart (${itemCount} items)`}
              style={{
                  background: C.amber,
                  color: '#000',
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
              onMouseEnter={e => { e.currentTarget.style.background = C.amberHi; }}
              onMouseLeave={e => { e.currentTarget.style.background = C.amber; }}
            >
              <svg width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 01-8 0" />
              </svg>
              Cart
              {itemCount > 0 && (
                <span style={{
                  background: 'rgba(0,0,0,0.25)',
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
              style={{ ...iconBtnStyle(), display: 'none' }}
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
        top: '64px',
        left: 0,
        right: 0,
        background: 'rgba(255,255,255,0.98)',
        borderBottom: `1px solid ${C.border}`,
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
              color: location.pathname === link.href ? C.amber : C.textMid,
              textDecoration: 'none',
              borderBottom: `1px solid ${C.border}`,
            }}
          >
            {link.label}
          </Link>
        ))}
      </div>

      <style>{`
        @media (max-width:768px){

          .navbar-top{
              display:flex;
              align-items:center;
          }

          .navbar-search{
              order:2;
              width:100%;
              max-width:none;
              margin-top:12px;
          }

      }
        }
      `}</style>
    </>
  );
}