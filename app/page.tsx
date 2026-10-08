import Link from 'next/link';

export default function LandingPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--white)' }}>
      <Nav />

      {/* Hero */}
      <section style={{ borderBottom: '1px solid var(--border)', padding: '80px 0 72px' }}>
        <div className="page-container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 48, alignItems: 'center' }}>
            <div>
              <div className="label" style={{ marginBottom: 20 }}>AI-Powered · UX Designers</div>
              <h1 className="display" style={{ marginBottom: 24 }}>
                Demonstrate value<br /><em>before</em> the interview.
              </h1>
              <p style={{ fontSize: 16, color: 'var(--ink-2)', lineHeight: 1.7, maxWidth: 420, marginBottom: 32 }}>
                Paste a job description. Get a personalised UX opportunity report and pitch deck that shows strategic thinking — before you've spoken to anyone.
              </p>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <Link href="/app" className="btn btn-red" style={{ fontSize: 15, padding: '12px 28px' }}>
                  Get started free
                </Link>
                <span style={{ fontSize: 13, color: 'var(--muted)' }}>No account needed</span>
              </div>
            </div>

            {/* Abstract shape */}
            <div style={{
              background: 'var(--off-white)',
              borderRadius: 8,
              aspectRatio: '1',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
            }}>
              <svg viewBox="0 0 280 280" style={{ width: '80%', height: '80%' }}>
                <defs>
                  <linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#e8e8e8" />
                    <stop offset="100%" stopColor="#c8c8c8" />
                  </linearGradient>
                </defs>
                {/* Geometric abstract representing a pitch deck / strategy */}
                <rect x="40" y="40" width="200" height="140" rx="4" fill="white" stroke="#d8d8d8" strokeWidth="1"/>
                <rect x="40" y="40" width="200" height="32" rx="4" fill="var(--ink)"/>
                <rect x="40" y="68" width="200" height="4" rx="0" fill="var(--ink)"/>
                <rect x="56" y="88" width="60" height="6" rx="2" fill="#d0d0d0"/>
                <rect x="56" y="100" width="120" height="4" rx="2" fill="#e8e8e8"/>
                <rect x="56" y="110" width="100" height="4" rx="2" fill="#e8e8e8"/>
                <rect x="56" y="120" width="80" height="4" rx="2" fill="#e8e8e8"/>
                <rect x="152" y="88" width="72" height="56" rx="3" fill="var(--red)" opacity="0.12"/>
                <rect x="152" y="88" width="72" height="56" rx="3" fill="none" stroke="var(--red)" strokeWidth="1" opacity="0.4"/>
                {/* Second slide peek */}
                <rect x="60" y="196" width="160" height="52" rx="3" fill="white" stroke="#d8d8d8" strokeWidth="1" transform="rotate(-2 140 222)"/>
                <rect x="60" y="196" width="160" height="12" rx="3" fill="#e8e8e8" transform="rotate(-2 140 222)"/>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Ticker bar */}
      <div style={{
        borderBottom: '1px solid var(--border)',
        padding: '12px 0',
        background: 'var(--off-white)',
        overflow: 'hidden',
      }}>
        <div className="page-container">
          <div style={{ display: 'flex', gap: 48, fontSize: 12, color: 'var(--muted)', fontWeight: 600, letterSpacing: '0.3px' }}>
            {['Company Research', 'UX Audit', 'Sentiment Analysis', 'Opportunity Discovery', 'Pitch Deck Generation', 'PDF Export'].map(item => (
              <span key={item} style={{ whiteSpace: 'nowrap' }}>— {item}</span>
            ))}
          </div>
        </div>
      </div>

      {/* How it works */}
      <section style={{ padding: '72px 0', borderBottom: '1px solid var(--border)' }}>
        <div className="page-container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 48 }}>
            <h2 className="headline">How it works.</h2>
            <Link href="/app" className="btn btn-outline" style={{ marginTop: 4 }}>Try it now</Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
            {[
              {
                n: '01',
                title: 'Paste the job',
                body: 'Drop in a job description or LinkedIn URL. Optionally add the company website and any notes you have.',
              },
              {
                n: '02',
                title: 'Pick opportunities',
                body: 'AI agents research the company, audit the product UX, and surface 5 ranked opportunities with evidence and business rationale.',
              },
              {
                n: '03',
                title: 'Generate the deck',
                body: 'Select the opportunities you want to pitch on. Get a 7-slide deck written and structured — ready to drop into Figma or Google Slides.',
              },
            ].map(step => (
              <div key={step.n}>
                <div style={{
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: '1px',
                  color: 'var(--red)',
                  marginBottom: 12,
                }}>{step.n}</div>
                <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10, letterSpacing: '-0.3px' }}>{step.title}</h3>
                <p style={{ fontSize: 14, color: 'var(--ink-2)', lineHeight: 1.7 }}>{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values section */}
      <section style={{ padding: '72px 0', borderBottom: '1px solid var(--border)' }}>
        <div className="page-container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
            <div>
              <h2 className="headline" style={{ marginBottom: 8 }}>
                Humble.<br />Specific.<br />Hireable.
              </h2>
            </div>
            <div>
              {[
                ['Never says "bad UX"', 'Frames every finding as an opportunity or hypothesis — professional and constructive.'],
                ['Evidence-backed', 'Every opportunity is supported by user feedback, heuristic patterns, and business rationale.'],
                ['Under 10 minutes', 'From job post to shareable pitch deck before your first coffee of the morning.'],
              ].map(([title, body]) => (
                <div key={title} style={{ marginBottom: 28 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 4 }}>{title}</div>
                  <div style={{ fontSize: 14, color: 'var(--ink-2)', lineHeight: 1.6 }}>{body}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA footer */}
      <section style={{ background: 'var(--black)', padding: '72px 0' }}>
        <div className="page-container" style={{ textAlign: 'center' }}>
          <h2 style={{
            fontSize: 'clamp(28px, 4vw, 48px)',
            fontWeight: 800,
            letterSpacing: '-1.5px',
            color: 'white',
            marginBottom: 12,
            lineHeight: 1.1,
          }}>
            Stop sending the same<br />portfolio. Send <em style={{ color: 'var(--red)', fontStyle: 'italic' }}>ideas.</em>
          </h2>
          <p style={{ color: '#888', fontSize: 15, marginBottom: 32 }}>
            Free to use. No sign-up required.
          </p>
          <Link href="/app" className="btn btn-red" style={{ fontSize: 15, padding: '13px 32px' }}>
            Create your pitch deck →
          </Link>
        </div>
      </section>
    </div>
  );
}

function Nav() {
  return (
    <nav className="nav" style={{ borderBottom: '1px solid var(--border)' }}>
      <div className="page-container nav-inner">
        <Link href="/" className="logo">Job2Pitch</Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <Link href="/login" style={{ fontSize: 13, color: 'var(--ink-2)', textDecoration: 'none' }}>Sign in</Link>
          <Link href="/app" className="btn btn-red" style={{ padding: '8px 18px', fontSize: 13 }}>
            Get started
          </Link>
        </div>
      </div>
    </nav>
  );
}
