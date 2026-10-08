'use client';
import { useState } from 'react';
import { JobInput } from '../types';

export default function InputPane({ onSubmit }: { onSubmit: (input: JobInput, name: string) => void }) {
  const [jobDescription, setJobDescription] = useState('');
  const [companyUrl, setCompanyUrl] = useState('');
  const [notes, setNotes] = useState('');
  const [name, setName] = useState('');

  const ready = jobDescription.trim().length >= 50 && name.trim().length > 0;

  return (
    <div className="fade-up">
      <div style={{ marginBottom: 28 }}>
        <div className="label" style={{ marginBottom: 10 }}>Step 1 of 4</div>
        <h1 style={{ fontSize: 26, fontWeight: 800, letterSpacing: '-0.8px', marginBottom: 6 }}>Paste the job.</h1>
        <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.6 }}>
          Drop in the job description. The more detail, the sharper the pitch.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        <div>
          <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink-2)', display: 'block', marginBottom: 6 }}>
            Your name
          </label>
          <input
            className="input"
            placeholder="Alex Chen"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>

        <div>
          <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink-2)', display: 'block', marginBottom: 6 }}>
            Job description <span style={{ color: 'var(--red)' }}>*</span>
          </label>
          <textarea
            className="input"
            rows={9}
            placeholder="Paste the full job posting here…"
            value={jobDescription}
            onChange={e => setJobDescription(e.target.value)}
            style={{ resize: 'vertical' }}
          />
          <div style={{ marginTop: 5, display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 11, color: jobDescription.length < 50 ? 'var(--muted-2)' : 'var(--red)' }}>
              {jobDescription.length < 50 ? `${50 - jobDescription.length} more chars needed` : '✓ Ready'}
            </span>
            <span style={{ fontSize: 11, color: 'var(--muted-2)' }}>{jobDescription.length}</span>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div>
            <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink-2)', display: 'block', marginBottom: 6 }}>
              Company URL
            </label>
            <input
              className="input"
              type="url"
              placeholder="https://company.com"
              value={companyUrl}
              onChange={e => setCompanyUrl(e.target.value)}
            />
          </div>
          <div>
            <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink-2)', display: 'block', marginBottom: 6 }}>
              Notes
            </label>
            <input
              className="input"
              placeholder="Anything to add…"
              value={notes}
              onChange={e => setNotes(e.target.value)}
            />
          </div>
        </div>

        <button
          className="btn btn-red"
          style={{ alignSelf: 'flex-start', padding: '11px 28px', marginTop: 4 }}
          disabled={!ready}
          onClick={() => onSubmit({ jobDescription, companyUrl: companyUrl || undefined, notes: notes || undefined }, name)}
        >
          Research & generate →
        </button>
      </div>
    </div>
  );
}
