import React, { useState } from 'react';
import { C, TRANSITION } from '../../styles/tokens';

export default function ProductImageGallery({ images = [], productName = '', fallbackImage = '' }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  // Normalise: filter out any falsy entries, fall back to fallbackImage
  const validImages = images.filter(Boolean);
  const imageList = validImages.length > 0 ? validImages : fallbackImage ? [fallbackImage] : [];

  // Keep activeIndex in bounds if imageList changes
  const safeIndex = Math.min(activeIndex, Math.max(0, imageList.length - 1));
  const currentImage = imageList[safeIndex] || 'https://placehold.co/600x600/18181C/5C5650?text=No+Image';

  if (imageList.length === 0) {
    return (
      <div style={{
        background: C.surface,
        borderRadius: '12px',
        border: `1px solid ${C.border}`,
        aspectRatio: '1',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: C.textLo,
        fontSize: '14px',
      }}>
        No image available
      </div>
    );
  }

  const handleMouseMove = (e) => {
    if (!zoomed) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  const handlePrev = () => {
    setActiveIndex(i => Math.max(0, i - 1));
  };

  const handleNext = () => {
    setActiveIndex(i => Math.min(imageList.length - 1, i + 1));
  };

  return (
    <div >
      {/* Main Image */}
      <div
        onMouseEnter={() => setZoomed(true)}
        onMouseLeave={() => setZoomed(false)}
        onMouseMove={handleMouseMove}
        style={{
          position: 'relative',
          background: C.surface,
          borderRadius: '12px',
          overflow: 'hidden',
          aspectRatio: '1',
          marginBottom: '12px',
          cursor: zoomed ? 'zoom-out' : 'zoom-in',
          border: `1px solid ${C.border}`,
        }}
      >
        <img
          src={currentImage}
          alt={`${productName} — image ${safeIndex + 1}`}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            padding: '20px',
            transition: zoomed ? 'none' : TRANSITION.mid,
            transformOrigin: `${mousePos.x}% ${mousePos.y}%`,
            transform: zoomed ? 'scale(1.12)' : 'scale(1)',
          }}
        />

        {/* Navigation arrows (only if multiple images) */}
        {imageList.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              disabled={safeIndex === 0}
              aria-label="Previous image"
              style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: 'rgba(10,10,11,0.75)',
                border: `1px solid ${C.border}`,
                color: C.text,
                cursor: safeIndex === 0 ? 'not-allowed' : 'pointer',
                opacity: safeIndex === 0 ? 0.3 : 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: TRANSITION.fast,
                zIndex: 2,
              }}
            >
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              onClick={handleNext}
              disabled={safeIndex === imageList.length - 1}
              aria-label="Next image"
              style={{
                position: 'absolute',
                right: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: 'rgba(10,10,11,0.75)',
                border: `1px solid ${C.border}`,
                color: C.text,
                cursor: safeIndex === imageList.length - 1 ? 'not-allowed' : 'pointer',
                opacity: safeIndex === imageList.length - 1 ? 0.3 : 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: TRANSITION.fast,
                zIndex: 2,
              }}
            >
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </>
        )}

        {/* Image count indicator */}
        {imageList.length > 1 && (
          <div style={{
            position: 'absolute',
            bottom: '12px',
            right: '12px',
            background: 'rgba(10,10,11,0.7)',
            border: `1px solid ${C.border}`,
            borderRadius: '99px',
            padding: '3px 10px',
            fontSize: '11px',
            color: C.textMid,
            fontFamily: "'JetBrains Mono', monospace",
          }}>
            {safeIndex + 1}/{imageList.length}
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {imageList.length > 1 && (
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {imageList.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              aria-label={`View image ${i + 1}`}
              aria-pressed={i === safeIndex}
              style={{
                width: '72px',
                height: '72px',
                borderRadius: '8px',
                borderWidth: '2px',
                borderStyle: 'solid',borderColor: i === safeIndex ? C.amber : C.border,
                background: C.surface,
                overflow: 'hidden',
                cursor: 'pointer',
                padding: 0,
                transition: TRANSITION.fast,
                flexShrink: 0,
              }}
              onMouseEnter={e => {
                if (i !== safeIndex) e.currentTarget.style.borderColor = C.borderHi;
              }}
              onMouseLeave={e => {
                if (i !== safeIndex) e.currentTarget.style.borderColor = C.border;
              }}
            >
              <img
                src={img}
                alt={`${productName} thumbnail ${i + 1}`}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}