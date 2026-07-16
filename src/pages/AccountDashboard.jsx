import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { C, FONTS, TRANSITION } from '../styles/tokens';
import PageWrapper from '../components/layout/PageWrapper';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import ProductCard from '../components/product/ProductCard';
import { useAuth } from '../hooks/useAuth';
import { useWishlistContext } from '../context/WishlistContext';
import { formatOrderStatus, getInitials } from '../utils/helpers';
import { formatPrice , formatDateShort} from '../utils/formatters';


const NAV_ITEMS = [
  { key: 'profile', label: 'My Profile', icon: '👤' },
  { key: 'orders', label: 'Orders', icon: '📦' },
  { key: 'wishlist', label: 'Wishlist', icon: '♥' },
  { key: 'addresses', label: 'Addresses', icon: '📍' },
  { key: 'security', label: 'Password & Security', icon: '🔒' },
];

export default function AccountDashboard() {
  const { isAuthenticated, user, updateUser, logoutAndRedirect } = useAuth();
  const { items: wishlistItems } = useWishlistContext();
  const [activeTab, setActiveTab] = useState('profile');
  const [form, setForm] = useState({ name: user?.name || '', email: user?.email || '', phone: user?.phone || '' });
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  if (!isAuthenticated) return <Navigate to="/login" />;

  const handleSaveProfile = async () => {
    setSaving(true);
    await new Promise(r => setTimeout(r, 500));
    updateUser({ name: form.name, email: form.email, phone: form.phone });
    setSaving(false);
  };

  const tabContent = {
    profile: (
      <div>
        <h3 style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: '20px', color: C.text, marginBottom: '24px' }}>My Profile</h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '28px', padding: '20px', background: C.card, borderRadius: '10px', border: `1px solid ${C.border}` }}>
          <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: C.amberLo, border: `2px solid rgba(232,135,26,0.4)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONTS.display, fontWeight: 800, fontSize: '24px', color: C.amber, flexShrink: 0 }}>
            {getInitials(user.name)}
          </div>
          <div>
            <div style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: '18px', color: C.text }}>{user.name}</div>
            <div style={{ fontSize: '14px', color: C.textMid, marginTop: '2px' }}>{user.email}</div>
            <div style={{ fontSize: '12px', color: C.textLo, marginTop: '4px' }}>Member since {formatDateShort(user.joinDate)}</div>
          </div>
        </div>
        <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
          <Input label="Full Name" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} />
          <Input label="Phone Number" value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} placeholder="+254 7XX XXX XXX" />
        </div>
        <div style={{ marginBottom: '24px' }}>
          <Input label="Email Address" type="email" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} />
        </div>
        <Button variant="primary" loading={saving} onClick={handleSaveProfile}>Save Changes</Button>
      </div>
    ),
    orders: (
      <div>
        <h3 style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: '20px', color: C.text, marginBottom: '24px' }}>Order History</h3>
        {[].map(order => {
          const statusInfo = formatOrderStatus(order.status);
          return (
            <div key={order.id} style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px', background: C.card, border: `1px solid ${C.border}`, borderRadius: '10px', marginBottom: '10px', flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: '180px' }}>
                <div style={{ fontFamily: FONTS.mono, fontSize: '12px', color: C.textMid, marginBottom: '3px' }}>{order.id}</div>
                <div style={{ fontWeight: 600, fontSize: '14px', color: C.text, marginBottom: '2px' }}>
                  {order.items.map(i => i.name).join(', ').slice(0, 50)}…
                </div>
                <div style={{ fontSize: '12px', color: C.textLo }}>{formatDateShort(order.date)}</div>
              </div>
              <div style={{ fontFamily: FONTS.mono, fontWeight: 600, fontSize: '15px', color: C.text }}>{formatPrice(order.total)}</div>
              <span style={{ padding: '4px 10px', borderRadius: '4px', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', background: `${statusInfo.color}18`, color: statusInfo.color, border: `1px solid ${statusInfo.color}40`, flexShrink: 0 }}>
                {statusInfo.label}
              </span>
            </div>
          );
        })}
      </div>
    ),
    wishlist: (
      <div>
        <h3 style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: '20px', color: C.text, marginBottom: '24px' }}>Wishlist ({wishlistItems.length})</h3>
        {wishlistItems.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <div style={{ fontSize: '48px', marginBottom: '12px' }}>♥</div>
            <p style={{ color: C.textMid, marginBottom: '16px' }}>Your wishlist is empty.</p>
            <Button variant="secondary" size="sm" onClick={() => navigate('/category/guitars')}>Browse Products</Button>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
            {wishlistItems.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </div>
    ),
    addresses: (
      <div>
        <h3 style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: '20px', color: C.text, marginBottom: '24px' }}>Saved Addresses</h3>
        {user.addresses?.map(addr => (
          <div key={addr.id} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: '10px', padding: '16px 20px', marginBottom: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontWeight: 600, fontSize: '14px', color: C.text }}>{addr.label}</span>
                {addr.isDefault && <span style={{ background: C.amberLo, color: C.amber, fontSize: '10px', fontWeight: 700, padding: '2px 7px', borderRadius: '99px', border: `1px solid rgba(232,135,26,0.3)` }}>Default</span>}
              </div>
              <Button variant="ghost" size="sm">Edit</Button>
            </div>
            <p style={{ fontSize: '14px', color: C.textMid, lineHeight: 1.7 }}>
              {addr.fullName}<br />{addr.line1}{addr.line2 ? `, ${addr.line2}` : ''}<br />{addr.city}, {addr.county} {addr.postalCode}
            </p>
          </div>
        ))}
        <Button variant="secondary" size="sm" style={{ marginTop: '8px' }}>+ Add New Address</Button>
      </div>
    ),
    security: (
      <div>
        <h3 style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: '20px', color: C.text, marginBottom: '24px' }}>Password & Security</h3>
        <div style={{ marginBottom: '16px' }}><Input label="Current Password" type="password" placeholder="••••••••" /></div>
        <div style={{ marginBottom: '16px' }}><Input label="New Password" type="password" placeholder="Min 8 characters" /></div>
        <div style={{ marginBottom: '24px' }}><Input label="Confirm New Password" type="password" placeholder="Repeat new password" /></div>
        <Button variant="primary" onClick={() => {}}>Update Password</Button>
      </div>
    ),
  };

  return (
    <PageWrapper>
      <div className="section">
        <div className="container">
          <h1 style={{ fontFamily: FONTS.display, fontWeight: 800, fontSize: '28px', letterSpacing: '-0.02em', marginBottom: '28px', color: C.text }}>My Account</h1>
          <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: '24px', alignItems: 'start' }} className="account-layout">
            {/* Sidebar nav */}
            <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: '12px', overflow: 'hidden', position: 'sticky', top: '80px' }}>
              {NAV_ITEMS.map(item => (
                <button
                  key={item.key}
                  onClick={() => setActiveTab(item.key)}
                  style={{
                    width: '100%', display: 'flex', alignItems: 'center', gap: '12px',
                    padding: '14px 20px', background: 'none', border: 'none',
                    borderLeft: `3px solid ${activeTab === item.key ? C.amber : 'transparent'}`,
                    color: activeTab === item.key ? C.amber : C.textMid,
                    background: activeTab === item.key ? C.amberLo : 'transparent',
                    cursor: 'pointer', fontSize: '14px', fontWeight: 500, fontFamily: FONTS.body,
                    textAlign: 'left', transition: TRANSITION.fast,
                  }}
                  onMouseEnter={e => { if (activeTab !== item.key) { e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; e.currentTarget.style.color = C.text; } }}
                  onMouseLeave={e => { if (activeTab !== item.key) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = C.textMid; } }}
                >
                  <span style={{ fontSize: '16px' }}>{item.icon}</span>
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => logoutAndRedirect('/')}
                style={{
                  width: '100%', display: 'flex', alignItems: 'center', gap: '12px',
                  padding: '14px 20px', background: 'none', border: 'none',
                  borderLeft: '3px solid transparent', borderTop: `1px solid ${C.border}`,
                  color: C.error, cursor: 'pointer', fontSize: '14px', fontWeight: 500,
                  fontFamily: FONTS.body, textAlign: 'left',
                }}
              >
                <span>🚪</span> Sign Out
              </button>
            </div>

            {/* Main content */}
            <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: '12px', padding: '28px' }}>
              {tabContent[activeTab]}
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 768px) {
          .account-layout { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </PageWrapper>
  );
}