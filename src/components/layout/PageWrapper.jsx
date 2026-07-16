import React from 'react';
import { C } from '../../styles/tokens';

export default function PageWrapper({ children, style: extraStyle = {}, maxWidth = '1280px' }) {
  return (
    <main
      style={{
        paddingTop: '64px',
        minHeight: '100vh',
        flex: 1,
        ...extraStyle,
      }}
    >
      {children}
    </main>
  );
}

export function PageHero({ children, style: extraStyle = {} }) {
  return (
    <div style={{
      padding: '48px 0',
      background: C.surface,
      borderBottom: `1px solid ${C.border}`,
      ...extraStyle,
    }}>
      <div className="container">
        {children}
      </div>
    </div>
  );
}