import React, { useState } from 'react';
import { C, FONTS, TRANSITION } from '../../styles/tokens';
import Input from '../ui/Input';
import Button from '../ui/Button';

const PAYMENT_METHODS = [
  { id: 'card', label: 'Card' },
  { id: 'mpesa', label: 'M-Pesa' },
  { id: 'paypal', label: 'PayPal' },
  { id: 'bank', label: 'Bank Transfer' },
];

function formatCardNumber(val) {
  return val.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();
}

function formatExpiry(val) {
  const digits = val.replace(/\D/g, '').slice(0, 4);
  if (digits.length >= 3) return `${digits.slice(0, 2)} / ${digits.slice(2)}`;
  return digits;
}

export default function PaymentForm({ onNext, onBack }) {
  const [method, setMethod] = useState('card');
  const [cardNum, setCardNum] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardName, setCardName] = useState('');
  const [mpesaPhone, setMpesaPhone] = useState('');
  const [errors, setErrors] = useState({});
  const [showCvv, setShowCvv] = useState(false);

  const validate = () => {
    const e = {};
    if (method === 'card') {
      if (cardNum.replace(/\s/g, '').length < 16) e.cardNum = 'Enter a valid 16-digit card number.';
      if (!expiry || expiry.length < 7) e.expiry = 'Enter a valid expiry date.';
      if (!cvv || cvv.length < 3) e.cvv = 'Enter your 3-digit CVV.';
      if (!cardName.trim()) e.cardName = 'Name on card is required.';
    }
    if (method === 'mpesa') {
      if (!mpesaPhone.trim() || mpesaPhone.length < 10) e.mpesaPhone = 'Enter a valid Safaricom number.';
    }
    return e;
  };

  const handleNext = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    onNext?.({ method, cardNum, expiry, cardName, mpesaPhone });
  };

  const eyeIcon = (
    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
      {showCvv
        ? <><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" /><path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" /><line x1="1" y1="1" x2="23" y2="23" /></>
        : <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></>
      }
    </svg>
  );

  return (
    <div>
      <h3 style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: '20px', color: C.text, marginBottom: '24px' }}>
        Payment Method
      </h3>

      {/* Method tabs */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', flexWrap: 'wrap' }}>
        {PAYMENT_METHODS.map(pm => (
          <button
            key={pm.id}
            onClick={() => { setMethod(pm.id); setErrors({}); }}
            style={{
              padding: '9px 18px',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: 600,
              fontFamily: FONTS.body,
              cursor: 'pointer',
              transition: TRANSITION.fast,
              background: method === pm.id ? C.amberLo : C.card,
              border: `1px solid ${method === pm.id ? 'rgba(232,135,26,0.5)' : C.border}`,
              color: method === pm.id ? C.amber : C.textMid,
            }}
          >
            {pm.label}
          </button>
        ))}
      </div>

      {/* Card form */}
      {method === 'card' && (
        <div>
          <div style={{ marginBottom: '16px' }}>
            <Input
              label="Card Number"
              value={cardNum}
              onChange={e => setCardNum(formatCardNumber(e.target.value))}
              placeholder="1234 5678 9012 3456"
              error={errors.cardNum}
              inputStyle={{ fontFamily: FONTS.mono, letterSpacing: '0.05em' }}
            />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
            <Input
              label="Expiry Date"
              value={expiry}
              onChange={e => setExpiry(formatExpiry(e.target.value))}
              placeholder="MM / YY"
              error={errors.expiry}
              inputStyle={{ fontFamily: FONTS.mono }}
            />
            <Input
              label="CVV"
              type={showCvv ? 'text' : 'password'}
              value={cvv}
              onChange={e => setCvv(e.target.value.replace(/\D/g, '').slice(0, 4))}
              placeholder="123"
              error={errors.cvv}
              iconRight={eyeIcon}
              onIconRightClick={() => setShowCvv(v => !v)}
              inputStyle={{ fontFamily: FONTS.mono }}
            />
          </div>
          <div style={{ marginBottom: '24px' }}>
            <Input
              label="Name on Card"
              value={cardName}
              onChange={e => setCardName(e.target.value)}
              placeholder="John Kamau"
              error={errors.cardName}
            />
          </div>
          <div style={{
            background: C.successLo,
            border: `1px solid rgba(34,197,94,0.25)`,
            borderRadius: '8px',
            padding: '10px 14px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '13px',
            color: C.success,
            marginBottom: '24px',
          }}>
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            Your payment is secured with 256-bit SSL encryption
          </div>
        </div>
      )}

      {/* M-Pesa form */}
      {method === 'mpesa' && (
        <div style={{ marginBottom: '24px' }}>
          <div style={{
            background: 'rgba(0,150,30,0.08)',
            border: '1px solid rgba(0,150,30,0.2)',
            borderRadius: '10px',
            padding: '16px',
            marginBottom: '20px',
          }}>
            <div style={{ fontWeight: 700, fontSize: '15px', color: C.text, marginBottom: '8px' }}>
              Pay via M-Pesa STK Push
            </div>
            <ol style={{ paddingLeft: '18px', color: C.textMid, fontSize: '14px', lineHeight: 1.9 }}>
              <li>Enter your Safaricom number below</li>
              <li>Click "Send Payment Request"</li>
              <li>You'll receive an M-Pesa prompt on your phone</li>
              <li>Enter your PIN to complete payment</li>
            </ol>
          </div>
          <Input
            label="Safaricom Phone Number *"
            value={mpesaPhone}
            onChange={e => setMpesaPhone(e.target.value)}
            placeholder="+254 7XX XXX XXX"
            error={errors.mpesaPhone}
          />
        </div>
      )}

      {/* PayPal */}
      {method === 'paypal' && (
        <div style={{
          padding: '32px',
          textAlign: 'center',
          border: `1px solid ${C.border}`,
          borderRadius: '10px',
          marginBottom: '24px',
          color: C.textMid,
        }}>
          <div style={{ fontSize: '40px', marginBottom: '12px' }}>🅿</div>
          <p style={{ fontSize: '15px', marginBottom: '4px', color: C.text, fontWeight: 600 }}>Pay with PayPal</p>
          <p style={{ fontSize: '13px' }}>You'll be redirected to PayPal to complete payment securely.</p>
        </div>
      )}

      {/* Bank Transfer */}
      {method === 'bank' && (
        <div style={{
          background: C.card,
          border: `1px solid ${C.border}`,
          borderRadius: '10px',
          padding: '20px',
          marginBottom: '24px',
        }}>
          <div style={{ fontWeight: 700, fontSize: '15px', color: C.text, marginBottom: '14px' }}>
            Bank Transfer Details
          </div>
          {[
            { label: 'Bank', value: 'Equity Bank Kenya' },
            { label: 'Account Name', value: 'Maecky Sounds Ltd' },
            { label: 'Account Number', value: '0540295071291' },
            { label: 'Branch', value: 'Nairobi CBD' },
            { label: 'Reference', value: 'Your Order Number' },
          ].map(r => (
            <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: `1px solid ${C.border}`, fontSize: '14px' }}>
              <span style={{ color: C.textMid }}>{r.label}</span>
              <span style={{ color: C.text, fontFamily: FONTS.mono }}>{r.value}</span>
            </div>
          ))}
          <p style={{ fontSize: '12px', color: C.textLo, marginTop: '12px', lineHeight: 1.6 }}>
            Orders are processed once payment is confirmed. Please allow 1–2 business days for bank transfers.
          </p>
        </div>
      )}

      <div style={{ display: 'flex', gap: '12px' }}>
        <Button variant="ghost" size="lg" onClick={onBack} style={{ minWidth: '100px' }}>
          ← Back
        </Button>
        <Button variant="primary" size="lg" fullWidth onClick={handleNext}>
          {method === 'mpesa' ? 'Send Payment Request' : 'Review Order →'}
        </Button>
      </div>
    </div>
  );
}