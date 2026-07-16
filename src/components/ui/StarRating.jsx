import React, { useState } from 'react';
import { C } from '../../styles/tokens';

function StarIcon({ filled, half = false, size = 16 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {half ? (
        <>
          <defs>
            <linearGradient id="half-fill">
              <stop offset="50%" stopColor={C.amber} />
              <stop offset="50%" stopColor="transparent" />
            </linearGradient>
          </defs>
          <path
            d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
            fill="url(#half-fill)"
            stroke={C.amber}
            strokeWidth="1.5"
          />
        </>
      ) : (
        <path
          d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
          fill={filled ? C.amber : 'transparent'}
          stroke={filled ? C.amber : C.border}
          strokeWidth="1.5"
        />
      )}
    </svg>
  );
}

export default function StarRating({
  rating = 0,
  max = 5,
  size = 14,
  interactive = false,
  onChange,
  showValue = false,
  showCount = false,
  count = 0,
  style: extraStyle = {},
}) {
  const [hovered, setHovered] = useState(null);

  const displayRating = interactive && hovered !== null ? hovered : rating;

  const handleClick = (val) => {
    if (interactive && onChange) onChange(val);
  };

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '2px',
        ...extraStyle,
      }}
    >
      {Array.from({ length: max }, (_, i) => {
        const starVal = i + 1;
        const filled = displayRating >= starVal;
        const half = !filled && displayRating >= starVal - 0.5;

        return (
          <span
            key={i}
            onClick={() => handleClick(starVal)}
            onMouseEnter={() => interactive && setHovered(starVal)}
            onMouseLeave={() => interactive && setHovered(null)}
            style={{
              cursor: interactive ? 'pointer' : 'default',
              display: 'flex',
              alignItems: 'center',
              transition: 'transform 0.1s ease',
              transform: interactive && hovered === starVal ? 'scale(1.2)' : 'scale(1)',
            }}
          >
            <StarIcon filled={filled} half={half} size={size} />
          </span>
        );
      })}

      {showValue && (
        <span style={{
          fontSize: size - 2,
          fontWeight: 600,
          color: C.text,
          marginLeft: '4px',
          fontFamily: "'JetBrains Mono', monospace",
        }}>
          {rating.toFixed(1)}
        </span>
      )}

      {showCount && count > 0 && (
        <span style={{
          fontSize: size - 2,
          color: C.textMid,
          marginLeft: '2px',
        }}>
          ({count.toLocaleString()})
        </span>
      )}
    </div>
  );
}