import React from 'react';
import { C, FONTS, TRANSITION } from '../../styles/tokens';

export default function Checkbox({
  label,
  checked,
  onChange,
  id,
  disabled = false,
  style: extraStyle = {},
  labelStyle: extraLabelStyle = {},
  count,
}) {
  const checkId = id || `checkbox-${Math.random().toString(36).slice(2, 7)}`;

  const wrapStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
    userSelect: 'none',
    ...extraStyle,
  };

  const checkboxStyle = {
    width: '16px',
    height: '16px',
    borderRadius: '4px',
    border: `1.5px solid ${checked ? C.amber : C.border}`,
    background: checked ? C.amber : 'transparent',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    transition: TRANSITION.fast,
    cursor: disabled ? 'not-allowed' : 'pointer',
  };

  const labelBaseStyle = {
    fontSize: '14px',
    color: C.textMid,
    fontFamily: FONTS.body,
    flex: 1,
    transition: TRANSITION.fast,
    ...extraLabelStyle,
  };

  const countStyle = {
    fontSize: '12px',
    color: C.textLo,
    fontFamily: FONTS.body,
    marginLeft: 'auto',
  };

  return (
    <label htmlFor={checkId} style={wrapStyle}>
      <input
        id={checkId}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        style={{ display: 'none' }}
      />
      <div style={checkboxStyle}>
        {checked && (
          <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
            <path
              d="M1 4L3.5 6.5L9 1"
              stroke="#000"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>
      {label && <span style={labelBaseStyle}>{label}</span>}
      {count !== undefined && <span style={countStyle}>{count}</span>}
    </label>
  );
}