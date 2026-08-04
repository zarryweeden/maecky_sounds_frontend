import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { C, FONTS, TRANSITION } from '../styles/tokens';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { useAuth } from '../hooks/useAuth';

export default function SignupPage() {
  const { signupAndRedirect, isLoading, error } = useAuth();
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '', agree: false });
  const [errors, setErrors] = useState({});

  const set = (key, val) => setForm(p => ({ ...p, [key]: val }));

  const validate = () => {
    const e = {};
    if (!form.firstName.trim()) e.firstName = 'Required';
    if (!form.lastName.trim()) e.lastName = 'Required';
    if (!form.email.includes('@')) e.email = 'Valid email required';
    if (form.password.length < 8) e.password = 'Minimum 8 characters';
    if (!form.agree) e.agree = 'Please accept the terms';
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    signupAndRedirect({ firstName: form.firstName, lastName: form.lastName, email: form.email });
  };

  return (
    <div style={{ minHeight: '100vh', display: 'grid', gridTemplateColumns: '1fr 1fr', background: C.bg }}>
      {/* Visual */}

      {/* Form */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px' }}>
        <div style={{ width: '100%', maxWidth: '400px' }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', marginBottom: '32px' }}>
            <svg width="28" height="28" viewBox="0 0 32 32" fill="none"><rect width="32" height="32" rx="8" fill={C.amber} fillOpacity="0.15"/><path d="M8 22V10l8 4 8-4v12" stroke={C.amber} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="8" cy="22" r="2.5" fill={C.amber}/><circle cx="24" cy="22" r="2.5" fill={C.amber}/></svg>
            <span style={{ fontFamily: FONTS.display, fontWeight: 800, fontSize: '18px', color: C.text }}>Maecky <span style={{ color: C.amber }}>Sounds</span></span>
          </Link>

          <h1 style={{ fontFamily: FONTS.display, fontWeight: 800, fontSize: '28px', letterSpacing: '-0.02em', marginBottom: '6px', color: C.text }}>Create Account</h1>
          <p style={{ fontSize: '15px', color: C.textMid, marginBottom: '28px' }}>Start your musical journey today</p>

          {error && <div style={{ background: C.errorLo, border: `1px solid rgba(239,68,68,0.3)`, borderRadius: '8px', padding: '12px 16px', marginBottom: '20px', fontSize: '14px', color: C.error }}>{error}</div>}

          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
              <Input label="First Name" value={form.firstName} onChange={e => set('firstName', e.target.value)} placeholder="John" error={errors.firstName} />
              <Input label="Last Name" value={form.lastName} onChange={e => set('lastName', e.target.value)} placeholder="Kamau" error={errors.lastName} />
            </div>
            <div style={{ marginBottom: '16px' }}>
              <Input label="Email" type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="john@email.com" error={errors.email} />
            </div>
            <div style={{ marginBottom: '16px' }}>
              <Input label="Password" type="password" value={form.password} onChange={e => set('password', e.target.value)} placeholder="Min 8 characters" error={errors.password} />
            </div>
            <label style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '6px', cursor: 'pointer' }}>
              <input type="checkbox" checked={form.agree} onChange={e => set('agree', e.target.checked)} style={{ marginTop: '3px', accentColor: C.amber, width: '15px', height: '15px', flexShrink: 0 }} />
              <span style={{ fontSize: '13px', color: C.textMid, lineHeight: 1.5 }}>
                I agree to the{' '}
                <Link to="/faq" style={{ color: C.amber }}>Terms of Service</Link>
                {' '}and{' '}
                <Link to="/faq" style={{ color: C.amber }}>Privacy Policy</Link>
              </span>
            </label>
            {errors.agree && <div style={{ fontSize: '12px', color: C.error, marginBottom: '12px' }}>{errors.agree}</div>}
            <Button type="submit" variant="primary" size="lg" fullWidth loading={isLoading} style={{ marginTop: '16px' }}>
              Create Account
            </Button>
          </form>

          <div className="divider">OR</div>

          <button style={{ width: '100%', background: C.card, border: `1px solid ${C.border}`, color: C.text, padding: '12px', borderRadius: '8px', fontFamily: FONTS.body, fontSize: '15px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', transition: TRANSITION.fast }}
            onMouseEnter={e => { e.currentTarget.style.background = C.cardHi; e.currentTarget.style.borderColor = C.borderHi; }}
            onMouseLeave={e => { e.currentTarget.style.background = C.card; e.currentTarget.style.borderColor = C.border; }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
            Sign up with Google
          </button>

          <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '14px', color: C.textMid }}>
            Already have an account?{' '}
            <Link to="/login" style={{ color: C.amber, textDecoration: 'none', fontWeight: 600 }}>Sign in</Link>
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          div[style*="gridTemplateColumns: 1fr 1fr"] { grid-template-columns: 1fr !important; }
          div[style*="borderRight"] { display: none !important; }
        }
      `}</style>
    </div>
  );
}