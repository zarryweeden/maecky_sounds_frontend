import React from 'react';
import Badge from '../ui/Badge';

/**
 * Renders the appropriate set of product badges based on product state.
 * Used as an overlay on product images.
 */
export default function ProductBadge({ isNew, isSale, isHot, inStock, stockCount, direction = 'column' }) {
  const badges = [];

  if (isNew) badges.push(<Badge key="new" variant="new" />);
  if (isSale) badges.push(<Badge key="sale" variant="sale" />);
  if (isHot) badges.push(<Badge key="hot" variant="hot" />);
  if (!inStock) badges.push(<Badge key="oos" variant="outofstock" />);
  else if (stockCount <= 3 && stockCount > 0) badges.push(<Badge key="low" variant="lowstock" />);

  if (badges.length === 0) return null;

  return (
    <div style={{
      display: 'flex',
      flexDirection: direction,
      gap: '4px',
      flexWrap: direction === 'row' ? 'wrap' : 'nowrap',
    }}>
      {badges}
    </div>
  );
}