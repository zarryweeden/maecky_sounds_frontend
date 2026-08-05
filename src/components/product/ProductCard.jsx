import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { C, FONTS, SHADOW, TRANSITION } from '../../styles/tokens';
import { formatPrice, formatDiscount, truncate } from '../../utils/formatters';
import { useCart } from '../../hooks/useCart';
import { useWishlist } from '../../hooks/useWishlist';
import StarRating from '../ui/StarRating';
import Badge from '../ui/Badge';

export default function ProductCard({ product, variant = 'grid' }) {
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();
  const { addToCartWithFeedback } = useCart();
  const { toggleWithFeedback, isInWishlist } = useWishlist();

  const {
    id,
    slug,
    name,
    brand,
    primary_image,
    price,
    sale_price,
    average_rating,
    review_count,
    in_stock,
    stock_count,
    is_new,
    is_on_sale,
    is_hot,
  } = product;

  const primaryImage =
    primary_image ||
    'https://placehold.co/600x600/18181C/5C5650?text=No+Image';

  const salePrice = sale_price;

  const rating = Number(average_rating || 0);

  const reviewCount = review_count || 0;

  const inStock = in_stock;

  const stockCount = stock_count || 0;

  const isNew = is_new;

  const isSale = is_on_sale;

  const isHot = is_hot;

  const displayPrice = salePrice || price;

  const inWish = isInWishlist(id);

  const handleCardClick = () => navigate(`/product/${slug}`);
  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (inStock) addToCartWithFeedback(product);
  };
  const handleWishlist = (e) => {
    e.stopPropagation();
    toggleWithFeedback(product);
  };

  if (variant === 'list') {
    return (
      <div
        onClick={handleCardClick}
        style={{
          display: 'flex',
          gap: '20px',
          background: '#fff',
          border: `1px solid ${hovered ? '#D9D9D9' : '#ECECEC'}`,
          borderRadius: '12px',
          overflow: 'hidden',
          cursor: 'pointer',
          transition: TRANSITION.mid,
          transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
          boxShadow: hovered
          ? '0 12px 30px rgba(0,0,0,.12)'
          : '0 2px 8px rgba(0,0,0,.05)',
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div style={{ width: '140px', flexShrink: 0, background: C.surface, overflow: 'hidden' }}>
          <img
            src={primaryImage}
            alt={name}
            loading="lazy"
            style={{
              width: '100%',
              height: '120px',
              objectFit: 'cover',
              transition: 'transform 0.35s ease',
              transform: hovered ? 'scale(1.08)' : 'scale(1)',
            }}
          />
        </div>
        <div style={{ flex: 1, padding: '16px 16px 16px 0', minWidth: 0 }}>
          <div style={{ fontSize: '11px', fontFamily: FONTS.mono, color: C.amber, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '3px' }}>{brand?.name}</div>
          <div style={{ fontFamily: FONTS.display, fontWeight: 600, fontSize: '15px', color: C.text, lineHeight: 1.3, marginBottom: '6px' }}>{name}</div>
          <StarRating rating={rating} showCount count={reviewCount} style={{ marginBottom: '8px' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontFamily: FONTS.mono, fontWeight: 600, fontSize: '17px', color: salePrice ? C.crimson : C.text }}>{formatPrice(displayPrice)}</span>
            {salePrice && <span style={{ fontFamily: FONTS.mono, fontSize: '13px', color: C.textLo, textDecoration: 'line-through' }}>{formatPrice(price)}</span>}
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '16px', gap: '8px', flexShrink: 0 }}>
          <button
            onClick={handleAddToCart}
            disabled={!inStock}
            style={{
              background: C.amber,
              color: '#000',
              border: 'none',
              borderRadius: '8px',
              padding: '9px 16px',
              fontSize: '13px',
              fontWeight: 700,
              fontFamily: FONTS.body,
              cursor: inStock ? 'pointer' : 'not-allowed',
              opacity: inStock ? 1 : 0.5,
              whiteSpace: 'nowrap',
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    );
  }

  return (
    <article
      onClick={handleCardClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: C.card,
        border: `1px solid ${hovered ? 'rgba(232,135,26,0.35)' : C.border}`,
        borderRadius: '12px',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: TRANSITION.mid,
        transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
        boxShadow: hovered ? SHADOW.cardHover : SHADOW.card,
        position: 'relative',
        display:'flex',
        flexDirection:'column',
        flexGrow: 1,
        
      }}
      aria-label={`${name} — ${formatPrice(displayPrice)}`}
    >
      {/* Image */}
      <div style={{ position: 'relative', background:'#FAFAFA', aspectRatio: '1', overflow: 'hidden',padding:'12px',display:'flex',alignItems:'center',justifyContent:'center' }}>
        <img
          src={primaryImage}
          alt={name}
          loading="lazy"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            transition: 'transform 0.35s ease',
            transform: hovered ? 'scale(1.08)' : 'scale(1)',
          }}
        />

        {/* Badges */}
        <div style={{ position: 'absolute', top: '10px', left: '10px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {!inStock ? (
              <Badge variant="outofstock" />
          ) : isSale ? (
              <Badge variant="sale" />
          ) : isNew ? (
              <Badge variant="new" />
          ) : isHot ? (
              <Badge variant="hot" />
          ) : stockCount <= 3 ? (
              <Badge variant="lowstock" />
          ) : null}
        </div>

        {/* Discount tag */}
        {salePrice && (
          <div style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            background: C.crimson,
            color: '#fff',
            fontSize: '11px',
            fontWeight: 700,
            padding: '3px 7px',
            borderRadius: '4px',
            fontFamily: FONTS.body,
          }}>
            {formatDiscount(price, salePrice)}
          </div>
        )}

        {/* Wishlist button */}
        <button
          onClick={handleWishlist}
          aria-label={inWish ? 'Remove from wishlist' : 'Add to wishlist'}
          style={{
            position: 'absolute',
            top: '8px',
            right: salePrice ? '54px' : '8px',
            width: '32px',
            height: '32px',
            borderRadius: '8px',
            background: "#fff",
            border: "1px solid #E5E7EB",
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: "0 4px 10px rgba(0,0,0,.08)",
            color: inWish ? "#EF4444" : "#6B7280",
            transition: TRANSITION.fast,
            opacity: 1

          }}
          onMouseEnter={e => e.currentTarget.style.background="#fff"}
          onMouseLeave={e => e.currentTarget.style.color=C.amber}
        >
          <svg width="15" height="14" fill={inWish ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
          </svg>
        </button>

        {/* Quick add overlay */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: '10px',
          background:'linear-gradient(to top, rgba(255,255,255,.95), transparent)',
          transform: hovered ? 'translateY(0)' : 'translateY(100%)',
          transition: TRANSITION.mid,
        }}>
          <button
            onClick={handleAddToCart}
            disabled={!inStock}
            style={{
              width: '100%',
              background: inStock ? C.amber : C.surface,
              color: inStock ? '#000' : C.textMid,
              border: 'none',
              borderRadius: '7px',
              padding: '10px',
              fontSize: '13px',
              fontWeight: 700,
              fontFamily: FONTS.body,
              cursor: inStock ? 'pointer' : 'not-allowed',
              transition: TRANSITION.fast,
            }}
            onMouseEnter={e => { if (inStock) e.currentTarget.style.background = C.amberHi; }}
            onMouseLeave={e => { if (inStock) e.currentTarget.style.background = C.amber; }}
          >
            {inStock ? 'Add to Cart' : 'Out of Stock'}
          </button>
        </div>
      </div>

      {/* Info */}
      <div style={{ padding: '14px' }}>
        <div style={{
          fontFamily: FONTS.mono,
          fontSize: '10px',
          fontWeight: 400,
          color: C.amber,
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          marginBottom: '8px',
        }}>
          {brand?.name}
        </div>

        <div style={{
          fontFamily: FONTS.display,
          fontWeight: 700,
          fontSize: '16px',
          color: C.text,
          marginBottom: '7px',
          lineHeight: 1.3,
        }}>
          {truncate(name, 42)}
        </div>

        <StarRating rating={rating} showCount count={reviewCount} style={{ marginBottom: '9px' }} />

        <div style={{ display: 'flex', alignItems: 'center', gap: '7px', flexWrap: 'wrap' }}>
          <span style={{
            fontFamily: FONTS.mono,
            fontWeight: 700,
            fontSize: '18px',
            color: salePrice ? C.crimson : C.text,
          }}>
            {formatPrice(displayPrice)}
          </span>
          {salePrice && (
            <span style={{
              fontFamily: FONTS.mono,
              fontSize: '12px',
              color: C.textLo,
              textDecoration: 'line-through',
            }}>
              {formatPrice(price)}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}