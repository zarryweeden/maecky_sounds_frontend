import React, { useCallback, useRef, useState, useEffect } from 'react';
import { C, FONTS } from '../../styles/tokens';
import { formatPrice } from '../../utils/formatters';

export default function RangeSlider({
  min = 0,
  max = 500000,
  value,                  // can be undefined on first render — handled below
  onChange,
  step = 1000,
  label = 'Price Range',
  formatValue = formatPrice,
}) {
  // Derive a safe initial value: if the parent passes [min,max]-shaped array use it,
  // otherwise fall back to the full range so we never read index 0 of undefined.
  const safeInitial = Array.isArray(value) && value.length === 2
    ? value
    : [min, max];

  const [localValue, setLocalValue] = useState(safeInitial);

  // Keep in sync when the parent passes a new value prop (e.g. on clearFilters)
  useEffect(() => {
    if (Array.isArray(value) && value.length === 2) {
      setLocalValue(value);
    }
  }, [value]);

  const [minVal, maxVal] = localValue;

  const minPercent = Math.max(0, Math.min(100, ((minVal - min) / (max - min)) * 100));
  const maxPercent = Math.max(0, Math.min(100, ((maxVal - min) / (max - min)) * 100));

  const handleMinChange = useCallback((e) => {
    const newMin = Math.min(Number(e.target.value), maxVal - step);
    const next = [newMin, maxVal];
    setLocalValue(next);
    onChange?.(next);
  }, [maxVal, step, onChange]);

  const handleMaxChange = useCallback((e) => {
    const newMax = Math.max(Number(e.target.value), minVal + step);
    const next = [minVal, newMax];
    setLocalValue(next);
    onChange?.(next);
  }, [minVal, step, onChange]);

  return (
    <div>
      {label && (
        <div style={{
          fontSize: '13px',
          fontWeight: 600,
          color: C.textMid,
          fontFamily: FONTS.body,
          marginBottom: '12px',
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
        }}>
          {label}
        </div>
      )}

      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '8px',
        fontFamily: FONTS.mono,
        fontSize: '12px',
        color: C.textMid,
      }}>
        <span>{formatValue(minVal)}</span>
        <span>{formatValue(maxVal)}</span>
      </div>

      {/* Thumb styles injected once */}
      <style>{`
        input[type="range"].ms-range-thumb::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 18px;
          height: 18px;
          background: ${C.amber};
          border-radius: 50%;
          cursor: pointer;
          pointer-events: all;
          border: 2px solid #000;
          box-shadow: 0 0 6px rgba(232,135,26,0.4);
        }
        input[type="range"].ms-range-thumb::-moz-range-thumb {
          width: 18px;
          height: 18px;
          background: ${C.amber};
          border-radius: 50%;
          cursor: pointer;
          pointer-events: all;
          border: 2px solid #000;
        }
      `}</style>

      {/* Track */}
      <div style={{
        position: 'relative',
        height: '4px',
        background: C.border,
        borderRadius: '99px',
        margin: '8px 0 16px',
      }}>
        {/* Filled range */}
        <div style={{
          position: 'absolute',
          height: '100%',
          background: C.amber,
          borderRadius: '99px',
          left: `${minPercent}%`,
          right: `${100 - maxPercent}%`,
        }} />

        {/* Min thumb input */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={minVal}
          onChange={handleMinChange}
          className="ms-range-thumb"
          style={{
            position: 'absolute',
            width: '100%',
            height: '4px',
            appearance: 'none',
            WebkitAppearance: 'none',
            background: 'transparent',
            pointerEvents: 'none',
            outline: 'none',
            top: 0,
            zIndex: minVal > max - (max - min) * 0.1 ? 5 : 3,
          }}
        />

        {/* Max thumb input */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={maxVal}
          onChange={handleMaxChange}
          className="ms-range-thumb"
          style={{
            position: 'absolute',
            width: '100%',
            height: '4px',
            appearance: 'none',
            WebkitAppearance: 'none',
            background: 'transparent',
            pointerEvents: 'none',
            outline: 'none',
            top: 0,
            zIndex: 4,
          }}
        />
      </div>
    </div>
  );
}