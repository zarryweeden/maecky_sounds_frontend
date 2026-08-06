import React from 'react';

export default function PageWrapper({ children, flush = false, className = '' }) {
  const classes = ['page-wrapper', flush && 'page-wrapper--flush', className]
    .filter(Boolean)
    .join(' ');

  return (
    <main className={classes}>
      {children}
    </main>
  );
}

export function PageHero({ children, style: extraStyle = {} }) {
  return (
    <div className="page-hero" style={extraStyle}>
      <div className="container">
        {children}
      </div>
    </div>
  );
}
