'use client';
import { useEffect, useState } from 'react';
import { JobInput, ResearchResult } from '../types';

const STEPS = [
  'Parsing job description',
  'Building company profile',
  'Running UX audit',
  'Analysing user sentiment',
  'Generating opportunities',
];

export default function ResearchPane({ input, onComplete, onBack }: {
  input: JobInput;
  onComplete: (r: ResearchResult) => void;
  onBack: () => void;
}) {
  const [current, setCurrent] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const timer = setInterval(() => setCurrent(c => Math.min(c + 1, STEPS.length - 2)), 4000);

    fetch('/api/research', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    })
      .then(async res => {
        clearInterval(timer);
        if (!res.ok) { const e = await res.json(); throw new Error(e.error || 'Failed'); }
        return res.json();
      })
      .then(result => { setCurrent(STEPS.length - 1); setTimeout(() => onComplete(result), 600); })
      .catch(e => { clearInterval(timer); setError(e.message); });

    return () => clearInterval(timer);
  }, []);

  if (error) return (
    <div className="fade-up">
      <div className="label" style={{ marginBottom: 10, color: 'var(--red)' }}>Error</div>
      <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>Research failed</h2>
      <p style={{ fontSize: 14, color: 'var(--muted)', marginBottom: 8 }}>{error}</p>
      {error.includes('ANTHROPIC') && (
        <p style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 20 }}>
          Add <code style={{ background: 'var(--off-white)', padding: '1px 6px', borderRadius: 3 }}>ANTHROPIC_API_KEY</code> to <code style={{ background: 'var(--off-white)', padding: '1px 6px', borderRadius: 3 }}>.env.local</code>
        </p>
      )}
      <button className="btn btn-outline" onClick={onBack}>← Back</button>
    </div>
  );

  return (
    <div className="fade-up">
      <div style={{ marginBottom: 28 }}>
        <div className="label" style={{ marginBottom: 10 }}>Step 2 of 4</div>
        <h1 style={{ fontSize: 26, fontWeight: 800, letterSpacing: '-0.8px', marginBottom: 6 }}>Researching…</h1>
        <p style={{ fontSize: 14, color: 'var(--muted)' }}>AI agents are working. Takes about 30–45 seconds.</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
        {STEPS.map((label, i) => {
          const done = i < current;
          const active = i === current;
          return (
            <div key={i} style={{
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              padding: '14px 0',
              borderBottom: i < STEPS.length - 1 ? '1px solid var(--border)' : 'none',
            }}>
              <div style={{
                width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
                background: done ? 'var(--red)' : active ? 'var(--off-white)' : 'var(--off-white)',
                border: active ? '1px solid var(--border-dark)' : done ? 'none' : '1px solid var(--border)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 11, fontWeight: 700,
                color: done ? 'white' : 'var(--muted)',
              }}>
                {done ? '✓' : active ? <div className="spinner" style={{ width: 14, height: 14 }} /> : i + 1}
              </div>
              <span style={{
                fontSize: 14,
                fontWeight: active ? 600 : done ? 500 : 400,
                color: active ? 'var(--ink)' : done ? 'var(--ink-2)' : 'var(--muted-2)',
              }}>{label}</span>
            </div>
          );
        })}
      </div>

      {/* Progress bar */}
      <div style={{ marginTop: 28, height: 2, background: 'var(--off-white)', borderRadius: 1 }}>
        <div style={{
          height: '100%', background: 'var(--red)', borderRadius: 1,
          width: `${(current / (STEPS.length - 1)) * 100}%`,
          transition: 'width 0.5s ease',
        }} />
      </div>
    </div>
  );
}
