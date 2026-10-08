'use client';
import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';

interface PitchHistoryItem {
  id: number;
  companyName: string;
  roleTitle: string;
  designerName: string;
  createdAt: string;
  style: string;
  deck: unknown;
}

export default function ProfilePage() {
  const [history, setHistory] = useState<PitchHistoryItem[]>([]);
  const [resume, setResume] = useState<string>('');
  const [resumeFileName, setResumeFileName] = useState<string>('');
  const [tailoring, setTailoringId] = useState<number | null>(null);
  const [tailoredResume, setTailoredResume] = useState<{ id: number; text: string } | null>(null);
  const [copied, setCopied] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try {
      const h = JSON.parse(localStorage.getItem('j2p_history') || '[]');
      setHistory(h);
      const savedResume = localStorage.getItem('j2p_resume') || '';
      const savedName = localStorage.getItem('j2p_resume_name') || '';
      setResume(savedResume);
      setResumeFileName(savedName);
    } catch { /* ignore */ }
  }, []);

  const handleResumeFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const text = await file.text();
    setResume(text);
    setResumeFileName(file.name);
    localStorage.setItem('j2p_resume', text);
    localStorage.setItem('j2p_resume_name', file.name);
  };

  const handleResumePaste = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setResume(e.target.value);
    localStorage.setItem('j2p_resume', e.target.value);
    setResumeFileName('pasted text');
    localStorage.setItem('j2p_resume_name', 'pasted text');
  };

  const tailorResume = async (item: PitchHistoryItem) => {
    if (!resume) { alert('Please add your resume first.'); return; }
    setTailoringId(item.id);
    setTailoredResume(null);
    try {
      const res = await fetch('/api/tailor-resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          resume,
          companyName: item.companyName,
          roleTitle: item.roleTitle,
          deck: item.deck,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setTailoredResume({ id: item.id, text: data.tailoredResume });
    } catch (e) {
      alert(e instanceof Error ? e.message : 'Failed to tailor resume');
    }
    setTailoringId(null);
  };

  const deleteItem = (id: number) => {
    const updated = history.filter(h => h.id !== id);
    setHistory(updated);
    localStorage.setItem('j2p_history', JSON.stringify(updated));
  };

  const copyTailored = () => {
    if (!tailoredResume) return;
    navigator.clipboard.writeText(tailoredResume.text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--white)' }}>
      {/* Nav */}
      <nav className="nav">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', padding: '0 20px' }}>
          <Link href="/" style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink)', textDecoration: 'none' }}>Job2Pitch</Link>
          <div style={{ display: 'flex', gap: 16 }}>
            <Link href="/app" style={{ fontSize: 12, color: 'var(--muted)', textDecoration: 'none' }}>New pitch</Link>
          </div>
        </div>
      </nav>

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '40px 24px' }}>
        <h1 style={{ fontSize: 32, fontWeight: 800, letterSpacing: '-1px', marginBottom: 4 }}>Profile</h1>
        <p style={{ fontSize: 14, color: 'var(--muted)', marginBottom: 40 }}>Your pitch history and resume.</p>

        {/* Resume section */}
        <div style={{ marginBottom: 48 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <div>
              <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 2 }}>Your Resume</h2>
              <p style={{ fontSize: 13, color: 'var(--muted)' }}>Used to generate tailored versions for each application.</p>
            </div>
            {resumeFileName && (
              <span style={{ fontSize: 12, color: 'var(--red)', background: 'var(--red-light)', padding: '4px 10px', borderRadius: 20 }}>
                ✓ {resumeFileName}
              </span>
            )}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
            <button
              className="btn btn-outline"
              onClick={() => fileRef.current?.click()}
              style={{ padding: '12px', fontSize: 13 }}
            >
              ↑ Upload .txt / .md file
            </button>
            <input ref={fileRef} type="file" accept=".txt,.md,.text" style={{ display: 'none' }} onChange={handleResumeFile} />
            <div style={{ fontSize: 12, color: 'var(--muted)', display: 'flex', alignItems: 'center', paddingLeft: 8 }}>
              or paste below ↓
            </div>
          </div>

          <textarea
            value={resume}
            onChange={handleResumePaste}
            placeholder="Paste your resume text here — work experience, skills, education..."
            style={{
              width: '100%', height: 180, padding: '12px 14px',
              border: '1px solid var(--border)', borderRadius: 4,
              fontSize: 13, fontFamily: 'var(--font-sans)', color: 'var(--ink)',
              lineHeight: 1.6, resize: 'vertical', outline: 'none',
              background: resume ? 'var(--white)' : 'var(--off-white)',
            }}
          />
          {resume && (
            <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 4 }}>
              {resume.length.toLocaleString()} characters saved
            </div>
          )}
        </div>

        {/* Pitch history */}
        <div>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>Pitch History</h2>
          <p style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 20 }}>
            {history.length === 0 ? 'No pitches yet — generate one to see it here.' : `${history.length} pitch${history.length !== 1 ? 'es' : ''} saved locally.`}
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {history.map(item => (
              <div key={item.id} style={{ border: '1px solid var(--border)', borderRadius: 4, overflow: 'hidden' }}>
                {/* Header row */}
                <div style={{ padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--off-white)' }}>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--ink)', marginBottom: 2 }}>{item.companyName}</div>
                    <div style={{ fontSize: 12, color: 'var(--muted)' }}>
                      {item.roleTitle} · {item.designerName} · {new Date(item.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })} · <span style={{ textTransform: 'capitalize' }}>{item.style}</span> style
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button
                      className="btn btn-outline"
                      style={{ fontSize: 12 }}
                      onClick={() => tailorResume(item)}
                      disabled={tailoring === item.id}
                    >
                      {tailoring === item.id ? '✦ Tailoring…' : '✦ Tailor resume'}
                    </button>
                    <button
                      onClick={() => deleteItem(item.id)}
                      style={{ background: 'none', border: 'none', fontSize: 18, color: 'var(--muted-2)', cursor: 'pointer', lineHeight: 1 }}
                    >×</button>
                  </div>
                </div>

                {/* Tailored resume output */}
                {tailoredResume?.id === item.id && (
                  <div style={{ padding: '16px 20px', borderTop: '1px solid var(--border)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                      <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--red)', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                        ✓ Tailored for {item.companyName}
                      </div>
                      <button className="btn btn-outline" style={{ fontSize: 12 }} onClick={copyTailored}>
                        {copied ? '✓ Copied' : 'Copy'}
                      </button>
                    </div>
                    <pre style={{
                      fontSize: 12, lineHeight: 1.7, color: 'var(--ink-2)',
                      whiteSpace: 'pre-wrap', fontFamily: 'var(--font-sans)',
                      background: 'var(--off-white)', padding: '12px 14px', borderRadius: 3,
                      maxHeight: 320, overflowY: 'auto',
                    }}>
                      {tailoredResume.text}
                    </pre>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
