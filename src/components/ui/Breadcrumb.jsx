import React from 'react';
import { Link } from 'react-router-dom';
import { C, FONTS, TRANSITION } from '../../styles/tokens';

export default function Breadcrumb({ items = [], style: extraStyle = {} }) {
  if (!items || items.length === 0) return null;

  return (
    <nav
      aria-label="Breadcrumb"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        flexWrap: 'wrap',
        ...extraStyle,
      }}
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <React.Fragment key={index}>
            {isLast ? (
              <span
                style={{
                  fontSize: '13px',
                  color: C.text,
                  fontFamily: FONTS.body,
                  fontWeight: 500,
                }}
                aria-current="page"
              >
                {item.label}
              </span>
            ) : (
              <Link
                to={item.href}
                style={{
                  fontSize: '13px',
                  color: C.textMid,
                  fontFamily: FONTS.body,
                  textDecoration: 'none',
                  transition: TRANSITION.fast,
                }}
                onMouseEnter={e => e.currentTarget.style.color = C.amber}
                onMouseLeave={e => e.currentTarget.style.color = C.textMid}
              >
                {item.label}
              </Link>
            )}

            {!isLast && (
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M4 2L8 6L4 10"
                  stroke={C.textLo}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}