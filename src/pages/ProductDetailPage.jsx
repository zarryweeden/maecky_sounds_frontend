import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { C, FONTS } from '../styles/tokens';
import PageWrapper from '../components/layout/PageWrapper';
import Breadcrumb from '../components/ui/Breadcrumb';
import ProductImageGallery from '../components/product/ProductImageGallery';
import ProductSpecsTable from '../components/product/ProductSpecsTable';
import ReviewCard from '../components/product/ReviewCard';
import ReviewForm from '../components/product/ReviewForm';
import RelatedProducts from '../components/product/RelatedProducts';
import StarRating from '../components/ui/StarRating';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Skeleton from '../components/ui/Skeleton';
import { productService } from '../services/api';
import { useCart } from '../hooks/useCart';
import { useWishlist } from '../hooks/useWishlist';
import { formatPrice, formatSavings, formatDate } from '../utils/formatters';
import { getStockColor, getStockLabel, ratingDistribution } from '../utils/helpers';

const TABS = ['description', 'specifications', 'reviews', 'shipping'];

export default function ProductDetailPage() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [reviews, setReviews] = useState([]);

  const { addToCartWithFeedback } = useCart();
  const { toggleWithFeedback, isInWishlist } = useWishlist();

  const rating = product?.rating ?? 0;
  const reviewCount = product?.reviewCount ?? 0;

  useEffect(() => {
    setLoading(true);
    setQty(1);
    setActiveTab('description');
    Promise.all([
      productService.getById(productId),
      productService.getRelated(productId),
    ]).then(([prod, rel]) => {
      setProduct(prod);
      setReviews(prod.reviews || []);
      setRelated(rel);
      setLoading(false);
    }).catch(() => navigate('/404'));
  }, [productId]);

  if (loading) {
    return (
      <PageWrapper>
        <div className="section">
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px' }}>
              <Skeleton height="500px" />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <Skeleton height="20px" width="40%" />
                <Skeleton height="36px" width="80%" />
                <Skeleton height="16px" width="60%" />
                <Skeleton height="32px" width="50%" />
              </div>
            </div>
          </div>
        </div>
      </PageWrapper>
    );
  }

  if (!product) return null;

  const displayPrice = product.salePrice || product.price;
  const inWish = isInWishlist(product.id);
  const dist = ratingDistribution(reviews);

  // Normalise image list — support both `images` array and single `image` field
  const imageList =
    Array.isArray(product.images) && product.images.length > 0
      ? product.images.map((img) => {
          if (typeof img === 'string') {
            return img;
          }

          return img.image;
        })
      : product.image
        ? [product.image]
        : [];
  
  
  console.log('product.images:', product.images);
  console.log('imageList:', imageList);
  const categoryName = product.category?.name || '';
  const categorySlug =
    product.category?.slug ||
    categoryName.toLowerCase().replace(/\s+/g, '-');

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    {
      label: categoryName,
      href: `/category/${categorySlug}`,
    },
    {
      label: product.name,
      href: `/product/${product.slug}`,
    },
  ];

  const tabContent = {
    description: (
      <div style={{ fontSize: '15px', color: C.textMid, lineHeight: 1.9, maxWidth: '680px' }}>
        <p>{product.description}</p>
        <div style={{ marginTop: '24px' }}>
          <h4 style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: '16px', color: C.text, marginBottom: '12px' }}>
            Key Features
          </h4>
          <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <li>Premium build quality designed for professional performance</li>
            <li>Exceptional tonal characteristics across all musical styles</li>
            <li>Backed by Maecky Sounds' comprehensive quality guarantee</li>
            <li>Full manufacturer's warranty included with purchase</li>
          </ul>
        </div>
      </div>
    ),
    specifications: <ProductSpecsTable specifications={product.specifications} />,
    reviews: (
      <div>
        {/* Rating overview */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '32px',
          padding: '24px', background: C.card, borderRadius: '12px',
          border: `1px solid ${C.border}`, marginBottom: '28px', flexWrap: 'wrap',
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: FONTS.mono, fontWeight: 600, fontSize: '52px', color: C.amber, lineHeight: 1 }}>
              {rating.toFixed(1)}
            </div>
            <StarRating rating={rating} style={{ justifyContent: 'center', margin: '6px 0' }} />
            <div style={{ fontSize: '13px', color: C.textMid }}>{reviewCount.toLocaleString()} reviews</div>
          </div>
          <div style={{ flex: 1, minWidth: '200px' }}>
            {[5, 4, 3, 2, 1].map(n => {
              const count = dist[n] || 0;
              const pct = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
              return (
                <div key={n} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                  <span style={{ fontSize: '12px', color: C.textMid, width: '8px', flexShrink: 0 }}>{n}</span>
                  <div style={{ flex: 1, height: '6px', background: C.border, borderRadius: '99px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', background: C.amber, borderRadius: '99px', width: `${pct}%`, transition: 'width 0.5s ease' }} />
                  </div>
                  <span style={{ fontSize: '11px', color: C.textLo, width: '24px', flexShrink: 0 }}>{count}</span>
                </div>
              );
            })}
          </div>
        </div>

        {reviews.map(r => <ReviewCard key={r.id} review={r} />)}

        <ReviewForm
          productId={product.id}
          onSubmit={newReview => setReviews(prev => [{ ...newReview, id: Date.now() }, ...prev])}
        />
      </div>
    ),
    shipping: (
      <div style={{ fontSize: '15px', color: C.textMid, lineHeight: 1.85, maxWidth: '560px' }}>
        <h4 style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: '16px', color: C.text, marginBottom: '12px' }}>Delivery Options</h4>
        {[
          { name: 'Standard Delivery (Free)', desc: '5–7 business days for Nairobi. 7–14 days for upcountry locations.' },
          { name: 'Express Delivery (KES 500)', desc: '2–3 business days. Available for Nairobi and major Kenyan towns.' },
          { name: 'Store Pickup (Free)', desc: 'Pick up same day from our Nairobi CBD store. Mon–Sat 9am–7pm.' },
        ].map(d => (
          <div key={d.name} style={{ marginBottom: '16px' }}>
            <strong style={{ color: C.text }}>{d.name}</strong>
            <p style={{ marginTop: '4px' }}>{d.desc}</p>
          </div>
        ))}
        <h4 style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: '16px', color: C.text, margin: '24px 0 12px' }}>Returns Policy</h4>
        <p>30-day hassle-free returns on all products in original condition. Contact us and we'll arrange collection or you can drop off at our store.</p>
      </div>
    ),
  };
  console.log(product);
  console.log(product.image);
  console.log(product.images);
  console.log(product.rating);
  console.log(product.reviewCount);



  return (
    <PageWrapper>
      <div className="section">
        <div className="container">
          <Breadcrumb items={breadcrumbs} style={{ marginBottom: '32px' }} />

          {/* 2-column layout */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1.1fr 0.9fr',
            gap: '52px',
            alignItems: 'start',
          }} className="pd-layout">
            {/* Gallery */}
            <ProductImageGallery
              images={imageList}
              productName={product.name}
              fallbackImage={product.image || ''}
            />

            {/* Info panel */}
            <div>
              <div style={{ fontFamily: FONTS.mono, fontSize: '11px', color: C.amber, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '8px' }}>
                {product.brand?.name}
              </div>

              <h1 style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: 'clamp(22px, 3vw, 28px)', lineHeight: 1.2, color: C.text, marginBottom: '6px' }}>
                {product.name}
              </h1>

              <div style={{ fontFamily: FONTS.mono, fontSize: '12px', color: C.textLo, marginBottom: '14px' }}>
                SKU: {product.sku}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '18px', flexWrap: 'wrap' }}>
                <StarRating
                    rating={rating}
                    showValue
                    showCount
                    count={reviewCount}
                />
                
                <button
                  onClick={() => setActiveTab('reviews')}
                  style={{ background: 'none', border: 'none', fontSize: '13px', color: C.amber, cursor: 'pointer', fontFamily: FONTS.body }}
                >
                  Read reviews →
                </button>
              </div>

              {/* Price block */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', marginBottom: '14px' }}>
                <span style={{ fontFamily: FONTS.mono, fontWeight: 600, fontSize: '30px', color: product.salePrice ? C.crimson : C.text }}>
                  {formatPrice(displayPrice)}
                </span>
                {product.salePrice && (
                  <>
                    <span style={{ fontFamily: FONTS.mono, fontSize: '18px', color: C.textLo, textDecoration: 'line-through' }}>
                      {formatPrice(product.price)}
                    </span>
                    <span style={{
                      background: 'rgba(192,57,43,0.15)', color: '#e05c4d',
                      border: '1px solid rgba(192,57,43,0.3)', padding: '4px 10px',
                      borderRadius: '4px', fontSize: '12px', fontWeight: 700,
                    }}>
                      {formatSavings(product.price, product.salePrice)}
                    </span>
                  </>
                )}
              </div>

              {/* Stock status */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '7px', marginBottom: '22px' }}>
                <div style={{
                  width: '8px', height: '8px', borderRadius: '50%',
                  background: getStockColor(product.stockCount, product.inStock),
                  animation: product.stockCount <= 3 && product.inStock ? 'pulse 2s infinite' : 'none',
                  flexShrink: 0,
                }} />
                <span style={{ fontSize: '14px', color: getStockColor(product.stockCount, product.inStock) }}>
                  {getStockLabel(product.stockCount, product.inStock)}
                </span>
              </div>

              {/* Badges row */}
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '22px' }}>
                {product.isNew && <Badge variant="new" />}
                {product.isSale && <Badge variant="sale" />}
                {product.isHot && <Badge variant="hot" />}
              </div>

              {/* Qty selector */}
              <div style={{ marginBottom: '16px' }}>
                <div style={{ fontSize: '13px', fontWeight: 600, color: C.textMid, marginBottom: '8px', fontFamily: FONTS.body }}>
                  Quantity
                </div>
                <div style={{ display: 'flex', alignItems: 'center', border: `1px solid ${C.border}`, borderRadius: '8px', overflow: 'hidden', width: 'fit-content' }}>
                  <button
                    onClick={() => setQty(q => Math.max(1, q - 1))}
                    aria-label="Decrease"
                    style={{ width: '44px', height: '46px', background: C.surface, border: 'none', color: C.text, fontSize: '20px', cursor: qty <= 1 ? 'not-allowed' : 'pointer', opacity: qty <= 1 ? 0.4 : 1, transition: 'background 0.15s' }}
                    onMouseEnter={e => { if (qty > 1) e.currentTarget.style.background = C.card; }}
                    onMouseLeave={e => { e.currentTarget.style.background = C.surface; }}
                  >
                    −
                  </button>
                  <span style={{ width: '56px', height: '46px', background: C.card, borderLeft: `1px solid ${C.border}`, borderRight: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONTS.mono, fontSize: '16px', color: C.text }}>
                    {qty}
                  </span>
                  <button
                    onClick={() => setQty(q => Math.min(product.stockCount, q + 1))}
                    aria-label="Increase"
                    style={{ width: '44px', height: '46px', background: C.surface, border: 'none', color: C.text, fontSize: '20px', cursor: qty >= product.stockCount ? 'not-allowed' : 'pointer', opacity: qty >= product.stockCount ? 0.4 : 1, transition: 'background 0.15s' }}
                    onMouseEnter={e => { if (qty < product.stockCount) e.currentTarget.style.background = C.card; }}
                    onMouseLeave={e => { e.currentTarget.style.background = C.surface; }}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action buttons */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
                <Button
                  variant="primary"
                  size="lg"
                  fullWidth
                  disabled={!product.inStock}
                  onClick={() => addToCartWithFeedback(product, qty)}
                >
                  {product.inStock ? `Add to Cart — ${formatPrice(displayPrice * qty)}` : 'Out of Stock'}
                </Button>
                <button
                  onClick={() => toggleWithFeedback(product)}
                  style={{
                    width: '100%', height: '48px', borderRadius: '8px',
                    background: inWish ? 'rgba(239,68,68,0.1)' : 'transparent',
                    border: `1px solid ${inWish ? 'rgba(239,68,68,0.4)' : C.border}`,
                    color: inWish ? '#EF4444' : C.textMid,
                    cursor: 'pointer', display: 'flex', alignItems: 'center',
                    justifyContent: 'center', gap: '8px', fontSize: '14px',
                    fontWeight: 600, fontFamily: FONTS.body, transition: 'all 0.15s',
                  }}
                >
                  <svg width="16" height="15" fill={inWish ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                  </svg>
                  {inWish ? 'In Wishlist' : 'Add to Wishlist'}
                </button>
              </div>

              {/* Meta info */}
              <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {[
                  { icon: <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>, text: 'Usually ships in 2–3 business days' },
                  { icon: <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>, text: 'Secured checkout with SSL encryption' },
                  { icon: <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 11-2.12-9.36L23 10"/></svg>, text: '30-day hassle-free returns' },
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: C.textMid }}>
                    <span style={{ color: C.amber, display: 'flex', flexShrink: 0 }}>{item.icon}</span>
                    {item.text}
                  </div>
                ))}

                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '4px' }}>
                  {['Visa', 'Mastercard', 'M-Pesa', 'PayPal'].map(p => (
                    <span key={p} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: '4px', padding: '3px 9px', fontSize: '11px', fontWeight: 600, color: C.textLo, fontFamily: FONTS.body }}>
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Tabs section */}
          <div style={{ marginTop: '64px' }}>
            <div className="tabs">
              {TABS.map(tab => (
                <button
                  key={tab}
                  className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  {tab === 'reviews' && ` (${reviews.length})`}
                </button>
              ))}
            </div>
            <div style={{ paddingTop: '32px' }}>
              {tabContent[activeTab]}
            </div>
          </div>

          {/* Related products */}
          {related.length > 0 && (
            <div style={{ marginTop: '72px', paddingTop: '48px', borderTop: `1px solid ${C.border}` }}>
              <RelatedProducts products={related} />
            </div>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .pd-layout { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </PageWrapper>
  );
}