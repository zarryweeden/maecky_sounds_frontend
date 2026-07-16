import React from 'react';
import { C, FONTS } from '../../styles/tokens';

export default function ProductSpecsTable({ specifications = [] }) {
  if (!Array.isArray(specifications) || specifications.length === 0) {
    return (
      <p style={{ color: C.textMid, fontSize: '14px' }}>
        No specifications available.
      </p>
    );
  }

  return (
    <div
      style={{
        border: `1px solid ${C.border}`,
        borderRadius: '10px',
        overflow: 'hidden',
      }}
    >
      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
        }}
      >
        <tbody>
          {specifications.map((spec, i) => (
            <tr
              key={spec.id}
              style={{
                background:
                  i % 2 === 0
                    ? 'transparent'
                    : 'rgba(255,255,255,0.02)',
              }}
            >
              <td
                style={{
                  padding: '12px 16px',
                  fontFamily: FONTS.mono,
                  fontSize: '12px',
                  color: C.textMid,
                  width: '40%',
                }}
              >
                {spec.key}
              </td>

              <td
                style={{
                  padding: '12px 16px',
                  fontFamily: FONTS.mono,
                  fontSize: '12px',
                  color: C.text,
                }}
              >
                {spec.value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}