import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUIContext } from '../../context/UIContext';
import { useSearch } from '../../hooks/useSearch';
import { C, FONTS, Z, TRANSITION } from '../../styles/tokens';
import { formatPrice } from '../../utils/formatters';

export default function SearchOverlay() {
  const { searchOpen, closeSearch } = useUIContext();
  const { query, results, isSearching, hasResults, search, clearSearch } = useSearch();
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      clearSearch();
    }
  }, [searchOpen]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape' && searchOpen) {
        closeSearch();
      }
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [searchOpen, closeSearch]);

  const handleProductClick = (product) => {
    closeSearch();
    clearSearch();
    navigate(`/product/${product.slug}`);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      closeSearch();
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      clearSearch();
    }
  };

  return (
    <div
      onClick={(e) => { if (e.target === e.currentTarget) closeSearch(); }}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.88)',
        backdropFilter: 'blur(8px)',
        zIndex: Z.overlay,
        opacity: searchOpen ? 1 : 0,
        pointerEvents: searchOpen ? 'all' : 'none',
        transition: 'opacity 0.2s ease',
        padding: '120px 32px 32px',
        overflowY: 'auto',
      }}
    >
      <div style={{ maxWidth: '640px', margin: '0 auto' }}>
        {/* Search Input */}
        <form onSubmit={handleSearchSubmit} style={{ marginBottom: '24px' }}>
          <div style={{ position: 'relative' }}>
            <span style={{
              position: 'absolute',
              left: '18px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: C.textMid,
              display: 'flex',
              pointerEvents: 'none',
            }}>
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
              </svg>
            </span>

            <input
              ref={inputRef}
              type="search"
              value={query}
              onChange={(e) => search(e.target.value)}
              placeholder="Search guitars, keyboards, microphones…"
              aria-label="Search products"
              style={{
                width: '100%',
                background: C.card,
                border: `1px solid ${C.border}`,
                borderRadius: '12px',
                padding: '16px 20px 16px 52px',
                fontFamily: FONTS.body,
                fontSize: '18px',
                color: C.text,
                outline: 'none',
                transition: TRANSITION.fast,
              }}
              onFocus={e => e.currentTarget.style.borderColor = C.amber}
              onBlur={e => e.currentTarget.style.borderColor = C.border}
            />

            {query && (
              <button
                type="button"
                onClick={clearSearch}
                style={{
                  position: 'absolute',
                  right: '16px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: C.cardHi,
                  border: 'none',
                  borderRadius: '50%',
                  width: '28px',
                  height: '28px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: C.textMid,
                  cursor: 'pointer',
                }}
                aria-label="Clear search"
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M1 1L11 11M11 1L1 11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </button>
            )}
          </div>
        </form>

        {/* Results */}
        {isSearching && (
          <div style={{ textAlign: 'center', padding: '20px', color: C.textMid, fontSize: '14px' }}>
            Searching…
          </div>
        )}

        {!isSearching && query.length >= 2 && !hasResults && (
          <div style={{ textAlign: 'center', padding: '32px', color: C.textMid }}>
            <div style={{ fontSize: '32px', marginBottom: '12px' }}>🎵</div>
            <p style={{ fontSize: '15px' }}>No results for "{query}"</p>
            <p style={{ fontSize: '13px', color: C.textLo, marginTop: '6px' }}>Try a different search term</p>
          </div>
        )}

        {!isSearching && hasResults && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {results.products.length > 0 && (
              <>
                <div style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: C.textLo,
                  padding: '4px 0 8px',
                }}>
                  Products
                </div>
                {results.products.map(product => (
                  <div
                    key={product.id}
                    onClick={() => handleProductClick(product)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '12px 16px',
                      background: C.card,
                      border: `1px solid ${C.border}`,
                      borderRadius: '8px',
                      cursor: 'pointer',
                      transition: TRANSITION.fast,
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = 'rgba(232,135,26,0.3)';
                      e.currentTarget.style.background = C.cardHi;
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = C.border;
                      e.currentTarget.style.background = C.card;
                    }}
                  >
                    <div style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '6px',
                      overflow: 'hidden',
                      background: C.surface,
                      flexShrink: 0,
                    }}>
                      <img
                        src={product.images?.[0] || product.image}
                        alt={product.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: '14px', fontWeight: 600, color: C.text }}>{product.name}</div>
                      <div style={{ fontSize: '12px', color: C.textMid, marginTop: '2px' }}>
                        {product.brand} · {formatPrice(product.salePrice || product.price)}
                      </div>
                    </div>
                    <svg width="16" height="16" fill="none" stroke={C.textLo} strokeWidth="1.5" viewBox="0 0 24 24">
                      <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                ))}
              </>
            )}

            {results.categories.length > 0 && (
              <>
                <div style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: C.textLo,
                  padding: '12px 0 8px',
                }}>
                  Categories
                </div>
                {results.categories.map(cat => (
                  <div
                    key={cat.id}
                    onClick={() => {
                      closeSearch();
                      navigate(`/category/${cat.slug}`);
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '10px 16px',
                      background: C.card,
                      border: `1px solid ${C.border}`,
                      borderRadius: '8px',
                      cursor: 'pointer',
                      transition: TRANSITION.fast,
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = 'rgba(232,135,26,0.3)';
                      e.currentTarget.style.background = C.cardHi;
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = C.border;
                      e.currentTarget.style.background = C.card;
                    }}
                  >
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '8px',
                      background: C.amberLo,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: C.amber,
                      flexShrink: 0,
                    }}>
                      <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                        <path d="M9 18V5l12-2v13" strokeLinecap="round" strokeLinejoin="round" />
                        <circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" />
                      </svg>
                    </div>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: 600, color: C.text }}>{cat.name}</div>
                      <div style={{ fontSize: '12px', color: C.textMid }}>{cat.count} products</div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        )}

        {!query && (
          <div style={{ color: C.textLo, fontSize: '13px', paddingTop: '4px' }}>
            Start typing to search instruments, brands, and categories…
          </div>
        )}
      </div>
    </div>
  );
}