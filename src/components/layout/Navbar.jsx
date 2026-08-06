import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCartContext } from '../../context/CartContext';
import { useWishlistContext } from '../../context/WishlistContext';
import { useAuthContext } from '../../context/AuthContext';
import { useUIContext } from '../../context/UIContext';
import { C, FONTS, Z, TRANSITION } from '../../styles/tokens';
import {
  Home,
  Guitar,
  Piano,
  Mic2,
  Headphones,
  Package,
  BadgePercent,
  Heart,
  ShoppingCart,
  User,
  Truck,
  RotateCcw,
  CircleHelp,
  Phone,
  Info,
  ChevronRight,
} from "lucide-react";

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
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";

    return () => {
        document.body.style.overflow = "";
    };
}, [mobileOpen]);

  const navStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    minHeight: '64px',
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
const MenuItem = ({ icon, label, to }) => (
  <Link
    to={to}
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "15px 22px",
      textDecoration: "none",
      color: location.pathname === to ? C.amber : C.text,
      transition: ".2s",
      borderBottom: `1px solid ${C.border}`,
    }}
  >
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: '14px',
      }}
    >
      {icon}
      <span>{label}</span>
    </div>

    <ChevronRight
      size={16}
      color={C.textMid}
    />
  </Link>
);

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

<div className="navbar-inner">

    <div className="navbar-top">

        <div className="navbar-brand">

            <button
                className="desktop-hamburger"
                onClick={() => setMobileOpen(v => !v)}
            >
                <svg
                    width="28"
                    height="28"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    viewBox="0 0 24 24"
                >
                    <path d="M3 6h18"/>
                    <path d="M3 12h18"/>
                    <path d="M3 18h18"/>
                </svg>
            </button>

            <Link to="/" className="navbar-logo">

                <img
                    src="/logo-transparent.png"
                    alt="Maecky Sounds"
                    className="navbar-logo-image"
                />

                <span className="navbar-logo-text">
                    Maecky <span style={{color:C.amber}}>Sounds</span>
                </span>

            </Link>

        </div>

        <div className="navbar-actions">

            {/* Wishlist */}

            <button
                style={iconBtnStyle()}
                onClick={()=>navigate("/wishlist")}
            >

                <svg
                    width="22"
                    height="22"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    viewBox="0 0 24 24"
                >
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
                </svg>

                {wishCount>0 &&
                    <span className="navbar-badge">
                        {wishCount>9?"9+":wishCount}
                    </span>
                }

            </button>

            {/* Account */}

            <button
                style={iconBtnStyle()}
                onClick={()=>navigate(isAuthenticated?"/account":"/login")}
            >

                {isAuthenticated && user ? (

                    <div className="navbar-avatar">
                        {user.name?.[0]?.toUpperCase() || "U"}
                    </div>

                ) : (

                    <svg
                        width="22"
                        height="22"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        viewBox="0 0 24 24"
                    >
                        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
                        <circle cx="12" cy="7" r="4"/>
                    </svg>

                )}

            </button>

            {/* Cart */}

            <button
                className="navbar-cart-btn"
                onClick={openCart}
            >

                <svg
                    width="17"
                    height="17"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                >
                    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                    <line x1="3" y1="6" x2="21" y2="6"/>
                    <path d="M16 10a4 4 0 01-8 0"/>
                </svg>

                <span className="cart-text">
                    Cart
                </span>

                {itemCount>0 &&
                    <span className="cart-count">
                        {itemCount}
                    </span>
                }

            </button>

        </div>

    </div>

    <div className="navbar-search">

        <input
            readOnly
            onClick={openSearch}
            placeholder="Search instruments, gear & accessories"
            className="navbar-search-input"
        />

        <kbd className="navbar-search-shortcut">
            /
        </kbd>

    </div>

</div>

</nav>

      {/* Mobile Menu */}
<aside 
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "320px",
            maxWidth: "90vw",
            height: "100vh",
            background: "#fff",
            transform: mobileOpen
              ? "translateX(0)"
              : "translateX(-100%)",

            transition: "transform .35s ease",
            willChange: "transform",
            transition: "transform .35s ease",
            boxShadow: "8px 0 30px rgba(0,0,0,.15)",
            zIndex: Z.nav + 21,
            display: "flex",
            flexDirection: "column",
            overflowY: "auto",
          }}

>
  {/* Header */}
<div
  style={{
    height: 72,
    padding: "0 20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottom: `1px solid ${C.border}`,
    flexShrink: 0,
  }}
>
  <div>
    <div
      style={{
        fontFamily: FONTS.display,
        fontWeight: 800,
        fontSize: 20,
      }}
    >
      Maecky Sounds
    </div>

    <div
      style={{
        color: C.textMid,
        fontSize: 13,
      }}
    >
      Complete Tune
    </div>
  </div>

  <button
    onClick={() => setMobileOpen(false)}
    style={{
      width: 40,
      height: 40,
      borderRadius: 8,
      border: "none",
      background: "transparent",
      cursor: "pointer",
    }}
  >
    ✕
  </button>
</div>

{/* Account */}
<div
  style={{
    padding: 20,
    borderBottom: `1px solid ${C.border}`,
  }}
>
  <div
    style={{
      fontWeight: 700,
      marginBottom: 6,
    }}
  >
    {isAuthenticated ? `Hello, ${user.name}` : "Welcome"}
  </div>

  <button
    onClick={() =>
      navigate(isAuthenticated ? "/account" : "/login")
    }
    style={{
      background: C.amber,
      color: "#000",
      border: "none",
      borderRadius: 8,
      padding: "10px 18px",
      fontWeight: 700,
      cursor: "pointer",
    }}
  >
    {isAuthenticated ? "My Account" : "Sign In"}
  </button>
</div>

<div style={{ paddingTop: 18 }}>

<div
style={{
padding:"0 22px 10px",
fontSize:12,
fontWeight:700,
letterSpacing:1,
color:C.textMid
}}
>
SHOP
</div>

<MenuItem
icon={<Guitar size={20}/>}
label="Guitars"
to="/category/guitars"
/>

<MenuItem
icon={<Piano size={20}/>}
label="Keyboards"
to="/category/keyboards"
/>

<MenuItem
icon={<Mic2 size={20}/>}
label="Microphones"
to="/category/microphones"
/>

<MenuItem
icon={<Headphones size={20}/>}
label="Studio Equipment"
to="/category/studio"
/>

<MenuItem
icon={<Package size={20}/>}
label="Accessories"
to="/category/accessories"
/>

</div>

<div style={{ paddingTop:20 }}>

<div
style={{
padding:"0 22px 10px",
fontSize:12,
fontWeight:700,
letterSpacing:1,
color:C.textMid
}}
>
DISCOVER
</div>

<MenuItem
icon={<BadgePercent size={20}/>}
label="Deals"
to="/deals"
/>

<MenuItem
icon={<Heart size={20}/>}
label="Wishlist"
to="/wishlist"
/>

<MenuItem
icon={<ShoppingCart size={20}/>}
label="Cart"
to="/cart"
/>

</div>
<div style={{ paddingTop:20 }}>

<div
style={{
padding:"0 22px 10px",
fontSize:12,
fontWeight:700,
letterSpacing:1,
color:C.textMid
}}
>
INFORMATION
</div>


<MenuItem
icon={<Phone size={20}/>}
label="Contact Us"
to="/contact"
/>

<MenuItem
icon={<Info size={20}/>}
label="About Maecky Sounds"
to="/about"
/>

</div>

<div
style={{
marginTop:"auto",
padding:20,
fontSize:12,
color:C.textMid,
borderTop:`1px solid ${C.border}`,
}}
>
© 2026 Maecky Sounds
<br/>
Your Complete Tune
</div>

</aside>
      
{mobileOpen && (
  <div
    onClick={() => setMobileOpen(false)}
    style={{
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,.35)",
      zIndex: Z.nav + 20,
    }}
  />
)}
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
  
      `}</style>
    </>
  );
}