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




  return (
  <div
    className={viewMode === 'list' ? '' : 'product-grid'}
    style={viewMode === 'list' ? getGridStyle(viewMode, columns) : {}}
  >
    {products.map((product) => (
      <ProductCard
        key={product.id}
        product={product}
        variant={viewMode === 'list' ? 'list' : 'grid'}
      />
    ))}
  </div>
  );
}
