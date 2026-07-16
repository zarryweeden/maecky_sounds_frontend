import React from 'react';

export default function Skeleton({
  width = '100%',
  height = '16px',
  borderRadius = '6px',
  style: extraStyle = {},
}) {
  return (
    <div
      className="skeleton"
      style={{ width, height, borderRadius, ...extraStyle }}
      aria-hidden="true"
    />
  );
}

export function SkeletonProductCard() {
  return (
    <div style={{
      background: '#18181C',
      border: '1px solid #2A2A32',
      borderRadius: '12px',
      overflow: 'hidden',
    }}>
      <Skeleton height="220px" borderRadius="0" />
      <div style={{ padding: '14px' }}>
        <Skeleton height="11px" width="60px" style={{ marginBottom: '8px' }} />
        <Skeleton height="15px" width="85%" style={{ marginBottom: '6px' }} />
        <Skeleton height="13px" width="50%" style={{ marginBottom: '10px' }} />
        <Skeleton height="18px" width="40%" />
      </div>
    </div>
  );
}

export function SkeletonText({ lines = 3, style: extraStyle = {} }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', ...extraStyle }}>
      {Array.from({ length: lines }, (_, i) => (
        <Skeleton
          key={i}
          height="14px"
          width={i === lines - 1 ? '65%' : '100%'}
        />
      ))}
    </div>
  );
}