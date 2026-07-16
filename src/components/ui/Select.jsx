import React, { useState } from 'react';
import { C, FONTS, TRANSITION } from '../../styles/tokens';

export default function Select({
  label,
  error,
  options = [],
  value,
  onChange,
  placeholder,
  id,
  style: extraStyle = {},
  selectStyle: extraSelectStyle = {},
  fullWidth = true,
  ...rest
}) {
  const [focused, setFocused] = useState(false);
  const selectId = id || `select-${Math.random().toString(36).slice(2, 7)}`;

  const wrapStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    ...(fullWidth ? { width: '100%' } : {}),
    ...extraStyle,
  };

  const labelStyle = {
    fontSize: '13px',
    fontWeight: 600,
    color: error ? C.error : C.textMid,
    fontFamily: FONTS.body,
  };

  const selectBaseStyle = {
    width: '100%',
    background: C.card,
    border: `1px solid ${error ? C.error : focused ? C.amber : C.border}`,
    color: value ? C.text : C.textLo,
    padding: '12px 40px 12px 16px',
    borderRadius: '8px',
    fontFamily: FONTS.body,
    fontSize: '15px',
    outline: 'none',
    transition: TRANSITION.fast,
    appearance: 'none',
    WebkitAppearance: 'none',
    cursor: 'pointer',
    backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L6 7L11 1' stroke='%235C5650' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 14px center',
    ...extraSelectStyle,
  };

  const helperStyle = {
    fontSize: '12px',
    color: C.error,
    fontFamily: FONTS.body,
  };

  return (
    <div style={wrapStyle}>
      {label && <label htmlFor={selectId} style={labelStyle}>{label}</label>}
      <select
        id={selectId}
        style={selectBaseStyle}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        {...rest}
      >
        {placeholder && (
          <option value="" disabled style={{ color: C.textLo, background: C.card }}>
            {placeholder}
          </option>
        )}
        {options.map(opt => {
          const optValue = typeof opt === 'object' ? opt.value : opt;
          const optLabel = typeof opt === 'object' ? opt.label : opt;
          return (
            <option
              key={optValue}
              value={optValue}
              style={{ background: C.card, color: C.text }}
            >
              {optLabel}
            </option>
          );
        })}
      </select>
      {error && <span style={helperStyle}>{error}</span>}
    </div>
  );
}