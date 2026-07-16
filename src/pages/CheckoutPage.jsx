import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { C, FONTS } from '../styles/tokens';
import PageWrapper from '../components/layout/PageWrapper';
import AddressForm from '../components/checkout/AddressForm';
import PaymentForm from '../components/checkout/PaymentForm';
import OrderSummary from '../components/checkout/OrderSummary';
import Button from '../components/ui/Button';
import { useCart } from '../hooks/useCart';
import { orderService } from '../services/api';
import { formatPrice, truncate } from '../utils/formatters';

const STEPS = ['Delivery', 'Payment', 'Review'];

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { items, total, clearCart } = useCart();
  const [step, setStep] = useState(1);
  const [deliveryData, setDeliveryData] = useState(null);
  const [paymentData, setPaymentData] = useState(null);
  const [placing, setPlacing] = useState(false);

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  const handlePlaceOrder = async () => {
    setPlacing(true);
    const result = await orderService.placeOrder({ items, total, delivery: deliveryData, payment: paymentData });
    clearCart();
    navigate('/order-confirmation', { state: { orderId: result.orderId, estimatedDelivery: result.estimatedDelivery } });
  };

  return (
    <PageWrapper>
      <div className="section">
        <div className="container" style={{ maxWidth: '900px' }}>
          <h1 style={{ fontFamily: FONTS.display, fontWeight: 800, fontSize: '28px', letterSpacing: '-0.02em', marginBottom: '32px', color: C.text }}>
            Checkout
          </h1>

          {/* Steps indicator */}
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '40px' }}>
            {STEPS.map((s, i) => (
              <React.Fragment key={s}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{
                    width: '32px', height: '32px', borderRadius: '50%', flexShrink: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontWeight: 700, fontSize: '13px', transition: 'all 0.2s',
                    border: step > i + 1
                      ? `2px solid ${C.success}`
                      : step === i + 1
                        ? `2px solid ${C.amber}`
                        : `2px solid ${C.border}`,
                    background: step > i + 1 ? C.success : step === i + 1 ? C.amber : 'transparent',
                    color: step >= i + 1 ? '#000' : C.textMid,
                  }}>
                    {step > i + 1
                      ? <svg width="14" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      : i + 1
                    }
                  </div>
                  <span style={{ fontSize: '14px', fontWeight: 600, color: step === i + 1 ? C.text : C.textMid, fontFamily: FONTS.body }}>
                    {s}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div style={{ flex: 1, height: '1px', background: step > i + 1 ? C.success : C.border, margin: '0 12px', transition: 'background 0.3s' }} />
                )}
              </React.Fragment>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '32px', alignItems: 'start' }} className="checkout-layout">
            {/* Form area */}
            <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: '12px', padding: '32px' }}>
              {step === 1 && (
                <AddressForm onNext={(data) => { setDeliveryData(data); setStep(2); }} />
              )}
              {step === 2 && (
                <PaymentForm
                  onNext={(data) => { setPaymentData(data); setStep(3); }}
                  onBack={() => setStep(1)}
                />
              )}
              {step === 3 && (
                <div>
                  <h3 style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: '20px', color: C.text, marginBottom: '24px' }}>
                    Review Your Order
                  </h3>

                  {/* Delivery summary */}
                  {deliveryData && (
                    <div style={{ marginBottom: '20px', padding: '16px', background: C.card, border: `1px solid ${C.border}`, borderRadius: '10px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <span style={{ fontSize: '13px', fontWeight: 700, color: C.text, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Delivery</span>
                        <button onClick={() => setStep(1)} style={{ background: 'none', border: 'none', color: C.amber, fontSize: '13px', cursor: 'pointer', fontFamily: FONTS.body }}>Edit</button>
                      </div>
                      <p style={{ fontSize: '14px', color: C.textMid, lineHeight: 1.7 }}>
                        {deliveryData.fullName}<br />
                        {deliveryData.line1}{deliveryData.line2 ? `, ${deliveryData.line2}` : ''}<br />
                        {deliveryData.city}, {deliveryData.county}
                      </p>
                    </div>
                  )}

                  {/* Items */}
                  <div style={{ marginBottom: '24px' }}>
                    {items.map(item => (
                      <div key={item.id} style={{ display: 'flex', gap: '12px', padding: '12px 0', borderBottom: `1px solid ${C.border}` }}>
                        <img src={item.images?.[0]} alt={item.name} style={{ width: '48px', height: '48px', borderRadius: '6px', objectFit: 'cover', background: C.card }} />
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: '14px', fontWeight: 600, color: C.text }}>{truncate(item.name, 40)}</div>
                          <div style={{ fontSize: '12px', color: C.textMid }}>Qty: {item.qty}</div>
                        </div>
                        <span style={{ fontFamily: FONTS.mono, fontSize: '13px', color: C.text }}>{formatPrice((item.salePrice || item.price) * item.qty)}</span>
                      </div>
                    ))}
                  </div>

                  <div style={{ display: 'flex', gap: '12px' }}>
                    <Button variant="ghost" onClick={() => setStep(2)}>← Back</Button>
                    <Button variant="primary" size="lg" fullWidth loading={placing} onClick={handlePlaceOrder}>
                      Place Order — {formatPrice(total)}
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Order summary sidebar */}
            <div style={{ position: 'sticky', top: '80px' }}>
              <OrderSummary collapsed={step > 1} />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .checkout-layout { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </PageWrapper>
  );
}