'use client';
import Link from 'next/link';
import { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [step, setStep] = useState<'email' | 'sent'>('email');

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Nav */}
      <nav style={{ height: 52, borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', padding: '0 32px' }}>
        <Link href="/" style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink)', textDecoration: 'none' }}>Job2Pitch</Link>
      </nav>

      {/* Body */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
        <div style={{ width: '100%', maxWidth: 360 }}>
          {step === 'email' ? (
            <div className="fade-up">
              <div style={{ marginBottom: 32 }}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 10 }}>
                  Sign in
                </div>
                <h1 style={{ fontSize: 26, fontWeight: 800, letterSpacing: '-0.8px', marginBottom: 6 }}>Welcome back.</h1>
                <p style={{ fontSize: 14, color: 'var(--muted)' }}>Enter your email to continue.</p>
              </div>

              <div style={{ marginBottom: 12 }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink-2)', display: 'block', marginBottom: 6 }}>
                  Email address
                </label>
                <input
                  type="email"
                  className="input"
                  placeholder="you@email.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && email && setStep('sent')}
                  autoFocus
                />
              </div>

              <button
                className="btn btn-red"
                style={{ width: '100%', padding: '11px 0', marginBottom: 20 }}
                disabled={!email}
                onClick={() => setStep('sent')}
              >
                Continue
              </button>

              <p style={{ fontSize: 13, color: 'var(--muted)', textAlign: 'center' }}>
                No account?{' '}
                <Link href="/app" style={{ color: 'var(--ink)', fontWeight: 600, textDecoration: 'none' }}>
                  Use without one →
                </Link>
              </p>
            </div>
          ) : (
            <div className="fade-up" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 32, marginBottom: 16 }}>✉️</div>
              <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>Check your inbox</h2>
              <p style={{ fontSize: 14, color: 'var(--muted)', marginBottom: 24 }}>
                We sent a magic link to <strong style={{ color: 'var(--ink)' }}>{email}</strong>
              </p>
              <button className="btn btn-outline" onClick={() => setStep('email')}>
                Use a different email
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
