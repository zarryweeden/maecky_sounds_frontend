import React from 'react';
import { C, FONTS } from '../../styles/tokens';
import StarRating from '../ui/StarRating';
import { formatDateShort } from '../../utils/formatters';
import { getInitials } from '../../utils/helpers';

export default function ReviewCard({ review }) {
  const { user, rating, date, text } = review;

  return (
    <div style={{
      padding: '20px 0',
      borderBottom: `1px solid ${C.border}`,
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        marginBottom: '10px',
        gap: '12px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* Avatar */}
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            background: C.amberLo,
            border: `1px solid rgba(232,135,26,0.3)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: FONTS.display,
            fontWeight: 700,
            fontSize: '13px',
            color: C.amber,
            flexShrink: 0,
          }}>
            {getInitials(user)}
          </div>

          <div>
            <div style={{ fontWeight: 600, fontSize: '14px', color: C.text, fontFamily: FONTS.body }}>
              {user}
            </div>
            <StarRating rating={rating} size={12} style={{ marginTop: '2px' }} />
          </div>
        </div>

        <span style={{
          fontSize: '12px',
          color: C.textLo,
          fontFamily: FONTS.mono,
          flexShrink: 0,
          marginTop: '2px',
        }}>
          {formatDateShort(date)}
        </span>
      </div>

      <p style={{
        fontSize: '14px',
        color: C.textMid,
        lineHeight: 1.75,
        margin: 0,
        fontFamily: FONTS.body,
      }}>
        {text}
      </p>
    </div>
  );
}