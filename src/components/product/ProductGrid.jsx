import React from 'react';
import { C, FONTS } from '../../styles/tokens';
import ProductCard from './ProductCard';
import { SkeletonProductCard } from '../ui/Skeleton';
import Button from '../ui/Button';

export default function ProductGrid({
  products = [],
  loading = false,
  skeletonCount = 8,
  viewMode = 'grid',
  emptyTitle = 'No products found',
  emptyMessage = 'Try adjusting your filters or browse all products.',
  onClearFilters,
  columns = 4,
}) {
  if (loading) {
    return (
      <div style={getGridStyle(viewMode, columns)}>
        {Array.from({ length: skeletonCount }, (_, i) => (
          <SkeletonProductCard key={i} />
        ))}
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div style={{
        textAlign: 'center',
        padding: '80px 24px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '16px',
      }}>
        <div style={{ fontSize: '64px', lineHeight: 1 }}>🎵</div>
        <h3 style={{
          fontFamily: FONTS.display,
          fontWeight: 700,
          fontSize: '22px',
          color: C.text,
        }}>
          {emptyTitle}
        </h3>
        <p style={{ fontSize: '15px', color: C.textMid, maxWidth: '360px', lineHeight: 1.6 }}>
          {emptyMessage}
        </p>
        {onClearFilters && (
          <Button variant="secondary" size="sm" onClick={onClearFilters}>
            Clear All Filters
          </Button>
        )}
      </div>
    );
  }

  return (
    <div style={getGridStyle(viewMode, columns)}>
      {products.map((product, i) => (
        <ProductCard
          key={product.id}
          product={product}
          variant={viewMode === 'list' ? 'list' : 'grid'}
        />
      ))}
    </div>
  );
}

function getGridStyle(viewMode, columns) {
  if (viewMode === 'list') {
    return {
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
    };
  }
  return {
    display: 'grid',
    gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
    gap: '20px',
  };
}