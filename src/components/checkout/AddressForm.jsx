import React, { useState } from 'react';
import { C, FONTS } from '../../styles/tokens';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Button from '../ui/Button';

const KENYA_COUNTIES = [
  'Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Eldoret',
  'Thika', 'Machakos', 'Kiambu', 'Nyeri', 'Meru',
  'Kakamega', 'Kisii', 'Kilifi', 'Garissa', 'Other',
];

const DELIVERY_OPTIONS = [
  { id: 'standard', label: 'Standard Delivery', desc: '5–7 business days', price: 'Free', priceValue: 0 },
  { id: 'express', label: 'Express Delivery', desc: '2–3 business days', price: 'KES 500', priceValue: 500 },
  { id: 'pickup', label: 'Store Pickup', desc: 'Same day · Nairobi CBD', price: 'Free', priceValue: 0 },
];

export default function AddressForm({ onNext }) {
  const [form, setForm] = useState({
    fullName: '', email: '', phone: '',
    line1: '', line2: '', city: 'Nairobi',
    county: 'Nairobi', postalCode: '',
    deliveryMethod: 'standard',
    saveAddress: false,
  });
  const [errors, setErrors] = useState({});

  const set = (key, val) => setForm(prev => ({ ...prev, [key]: val }));

  const validate = () => {
    const e = {};
    if (!form.fullName.trim()) e.fullName = 'Full name is required.';
    if (!form.email.includes('@')) e.email = 'Valid email is required.';
    if (!form.phone.trim() || form.phone.length < 10) e.phone = 'Valid phone number is required.';
    if (!form.line1.trim()) e.line1 = 'Address is required.';
    if (!form.city.trim()) e.city = 'City is required.';
    return e;
  };

  const handleNext = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    onNext?.(form);
  };

  return (
    <div>
      <h3 style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: '20px', color: C.text, marginBottom: '24px' }}>
        Delivery Information
      </h3>

      <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <Input label="Full Name *" value={form.fullName} onChange={e => set('fullName', e.target.value)} placeholder="John Kamau" error={errors.fullName} />
        <Input label="Phone Number *" value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="+254 7XX XXX XXX" error={errors.phone} />
      </div>
      <div style={{ marginBottom: '16px' }}>
        <Input label="Email Address *" type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="john@email.com" error={errors.email} />
      </div>
      <div style={{ marginBottom: '16px' }}>
        <Input label="Address Line 1 *" value={form.line1} onChange={e => set('line1', e.target.value)} placeholder="House/Apartment and street" error={errors.line1} />
      </div>
      <div style={{ marginBottom: '16px' }}>
        <Input label="Address Line 2 (optional)" value={form.line2} onChange={e => set('line2', e.target.value)} placeholder="Estate, building name, etc." />
      </div>
      <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
        <Input label="City *" value={form.city} onChange={e => set('city', e.target.value)} placeholder="Nairobi" error={errors.city} />
        <Select
          label="County"
          value={form.county}
          onChange={e => set('county', e.target.value)}
          options={KENYA_COUNTIES.map(c => ({ value: c, label: c }))}
        />
      </div>

      {/* Delivery method */}
      <div style={{ marginTop: '24px', marginBottom: '24px' }}>
        <div style={{ fontSize: '14px', fontWeight: 600, color: C.textMid, marginBottom: '12px', fontFamily: FONTS.body }}>
          Delivery Method *
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {DELIVERY_OPTIONS.map(opt => (
            <label
              key={opt.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                padding: '14px 16px',
                background: C.card,
                border: `1px solid ${form.deliveryMethod === opt.id ? 'rgba(232,135,26,0.5)' : C.border}`,
                borderRadius: '10px',
                cursor: 'pointer',
                transition: 'border-color 0.15s',
              }}
            >
              <input
                type="radio"
                name="delivery"
                value={opt.id}
                checked={form.deliveryMethod === opt.id}
                onChange={() => set('deliveryMethod', opt.id)}
                style={{ accentColor: C.amber, width: '16px', height: '16px', flexShrink: 0 }}
              />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: '14px', color: C.text }}>{opt.label}</div>
                <div style={{ fontSize: '12px', color: C.textMid, marginTop: '2px' }}>{opt.desc}</div>
              </div>
              <span style={{
                fontFamily: FONTS.mono,
                fontSize: '13px',
                fontWeight: 600,
                color: opt.priceValue === 0 ? C.success : C.text,
              }}>
                {opt.price}
              </span>
            </label>
          ))}
        </div>
      </div>

      <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', marginBottom: '24px' }}>
        <input
          type="checkbox"
          checked={form.saveAddress}
          onChange={e => set('saveAddress', e.target.checked)}
          style={{ accentColor: C.amber, width: '15px', height: '15px' }}
        />
        <span style={{ fontSize: '14px', color: C.textMid, fontFamily: FONTS.body }}>
          Save this address for future orders
        </span>
      </label>

      <Button variant="primary" size="lg" fullWidth onClick={handleNext}>
        Continue to Payment →
      </Button>
    </div>
  );
}