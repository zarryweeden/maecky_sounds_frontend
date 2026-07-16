import React, { useState } from 'react';
import { C, FONTS, TRANSITION } from '../../styles/tokens';
import StarRating from '../ui/StarRating';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { useUIContext } from '../../context/UIContext';

export default function ReviewForm({ productId, onSubmit }) {
  const { addToast } = useUIContext();
  const [rating, setRating] = useState(0);
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (rating === 0) e.rating = 'Please select a star rating.';
    if (!name.trim()) e.name = 'Name is required.';
    if (!text.trim() || text.trim().length < 20) e.text = 'Review must be at least 20 characters.';
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    setLoading(true);
    await new Promise(r => setTimeout(r, 600));
    setLoading(false);
    addToast('Review submitted! Thank you for your feedback ✓');
    setRating(0);
    setName('');
    setText('');
    setErrors({});
    onSubmit?.({ productId, user: name, rating, text, date: new Date().toISOString().split('T')[0] });
  };

  return (
    <div style={{
      background: C.surface,
      border: `1px solid ${C.border}`,
      borderRadius: '12px',
      padding: '28px',
      marginTop: '24px',
    }}>
      <h4 style={{
        fontFamily: FONTS.display,
        fontWeight: 700,
        fontSize: '18px',
        color: C.text,
        marginBottom: '20px',
      }}>
        Write a Review
      </h4>

      <form onSubmit={handleSubmit}>
        {/* Star rating picker */}
        <div style={{ marginBottom: '20px' }}>
          <div style={{ fontSize: '13px', fontWeight: 600, color: C.textMid, marginBottom: '8px' }}>
            Your Rating *
          </div>
          <StarRating
            rating={rating}
            interactive
            onChange={setRating}
            size={28}
          />
          {errors.rating && (
            <div style={{ fontSize: '12px', color: C.error, marginTop: '4px' }}>{errors.rating}</div>
          )}
        </div>

        <div style={{ marginBottom: '16px' }}>
          <Input
            label="Your Name *"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="John Kamau"
            error={errors.name}
          />
        </div>

        {/* Text area */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ fontSize: '13px', fontWeight: 600, color: C.textMid, display: 'block', marginBottom: '6px' }}>
            Your Review *
          </label>
          <textarea
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Tell other shoppers what you think about this product..."
            rows={4}
            style={{
              width: '100%',
              background: C.card,
              border: `1px solid ${errors.text ? C.error : C.border}`,
              color: C.text,
              padding: '12px 16px',
              borderRadius: '8px',
              fontFamily: FONTS.body,
              fontSize: '15px',
              outline: 'none',
              resize: 'vertical',
              transition: TRANSITION.fast,
              boxSizing: 'border-box',
            }}
            onFocus={e => e.currentTarget.style.borderColor = C.amber}
            onBlur={e => e.currentTarget.style.borderColor = errors.text ? C.error : C.border}
          />
          {errors.text && (
            <div style={{ fontSize: '12px', color: C.error, marginTop: '4px' }}>{errors.text}</div>
          )}
          <div style={{ fontSize: '12px', color: C.textLo, marginTop: '4px' }}>
            {text.length} characters (minimum 20)
          </div>
        </div>

        <Button type="submit" variant="primary" loading={loading}>
          Submit Review
        </Button>
      </form>
    </div>
  );
}