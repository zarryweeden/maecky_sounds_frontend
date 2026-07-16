import React, { useState } from 'react';
import { C, FONTS, TRANSITION } from '../../styles/tokens';

export default function Input({
  label,
  error,
  helperText,
  iconLeft,
  iconRight,
  onIconRightClick,
  type = 'text',
  id,
  style: extraStyle = {},
  inputStyle: extraInputStyle = {},
  fullWidth = true,
  ...rest
}) {
  const [focused, setFocused] = useState(false);
  const inputId = id || `input-${Math.random().toString(36).slice(2, 7)}`;

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

  const inputWrapStyle = {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  };

  const inputBaseStyle = {
    width: '100%',
    background: C.card,
    border: `1px solid ${error ? C.error : focused ? C.amber : C.border}`,
    color: C.text,
    padding: iconLeft ? '12px 16px 12px 44px' : iconRight ? '12px 44px 12px 16px' : '12px 16px',
    borderRadius: '8px',
    fontFamily: FONTS.body,
    fontSize: '15px',
    outline: 'none',
    transition: TRANSITION.fast,
    boxSizing: 'border-box',
    ...extraInputStyle,
  };

  const iconBaseStyle = {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    color: C.textMid,
    display: 'flex',
    alignItems: 'center',
    pointerEvents: 'none',
  };

  const helperStyle = {
    fontSize: '12px',
    color: error ? C.error : C.textLo,
    fontFamily: FONTS.body,
  };

  return (
    <div style={wrapStyle}>
      {label && <label htmlFor={inputId} style={labelStyle}>{label}</label>}
      <div style={inputWrapStyle}>
        {iconLeft && (
          <span style={{ ...iconBaseStyle, left: '14px' }}>
            {iconLeft}
          </span>
        )}
        <input
          id={inputId}
          type={type}
          style={inputBaseStyle}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          {...rest}
        />
        {iconRight && (
          <span
            style={{
              ...iconBaseStyle,
              right: '14px',
              pointerEvents: onIconRightClick ? 'all' : 'none',
              cursor: onIconRightClick ? 'pointer' : 'default',
            }}
            onClick={onIconRightClick}
          >
            {iconRight}
          </span>
        )}
      </div>
      {(error || helperText) && (
        <span style={helperStyle}>{error || helperText}</span>
      )}
    </div>
  );
}