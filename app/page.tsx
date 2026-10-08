'use client';
import Link from 'next/link';
import { useEffect, useRef } from 'react';

export default function LandingPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg, #f7f6f4)', color: 'var(--fg, #0d0d0d)', fontFamily: "'Barlow', system-ui, sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800;900&family=Barlow:wght@400;500;600&display=swap');
        :root {
          --bg: #f7f6f4; --fg: #0d0d0d; --fg2: #444; --border: #0d0d0d;
          --accent: #e8352a; --accent-dim: #c2271e; --surface: #ffffff; --muted: #888;
        }
        @media (prefers-color-scheme: dark) {
          :root { --bg: #0d0d0d; --fg: #f0ede8; --fg2: #aaa; --surface: #181818; --muted: #666; }
        }
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: var(--bg); color: var(--fg); overflow-x: hidden; }

        .j2p-nav {
          display: flex; align-items: center; justify-content: space-between;
          padding: 20px 40px; border-bottom: 1px solid var(--border);
          position: sticky; top: 0; background: var(--bg); z-index: 100;
        }
        .j2p-logo {
          font-family: 'Barlow Condensed', sans-serif; font-weight: 900; font-size: 18px;
          letter-spacing: 0.5px; color: var(--fg); text-decoration: none;
        }
        .j2p-cta {
          background: var(--accent); color: #fff; font-family: 'Barlow', sans-serif;
          font-weight: 600; font-size: 13px; letter-spacing: 0.5px; padding: 9px 20px;
          border: none; cursor: pointer; text-decoration: none; display: inline-block;
        }
        .j2p-cta:hover { background: var(--accent-dim); }

        .j2p-hero {
          padding: 80px 40px 0; border-bottom: 1px solid var(--border);
          display: grid; grid-template-columns: 1fr 1fr; gap: 0;
          min-height: 520px; position: relative; overflow: hidden;
        }
        .j2p-hero canvas {
          position: absolute; inset: 0; width: 100%; height: 100%;
          pointer-events: none; z-index: 0;
        }
        .j2p-hero-left {
          position: relative; z-index: 1; padding-bottom: 80px;
          border-right: 1px solid var(--border); padding-right: 60px;
          display: flex; flex-direction: column; justify-content: space-between;
        }
        .j2p-hero-right {
          position: relative; z-index: 1; padding-left: 60px; padding-bottom: 80px;
          display: flex; flex-direction: column; justify-content: flex-end; gap: 20px;
        }
        .j2p-eyebrow {
          font-size: 11px; font-weight: 600; letter-spacing: 2.5px;
          text-transform: uppercase; color: var(--accent); margin-bottom: 28px;
        }
        .j2p-headline {
          font-family: 'Barlow Condensed', sans-serif; font-weight: 900;
          font-size: clamp(56px, 8vw, 96px); line-height: 0.93;
          letter-spacing: -1px; text-transform: uppercase;
        }
        .j2p-headline em { font-style: normal; color: var(--accent); display: block; }
        .j2p-sub { font-size: 16px; color: var(--fg2); line-height: 1.6; margin-top: 32px; max-width: 480px; }
        .j2p-actions { display: flex; align-items: center; gap: 24px; margin-top: 44px; }
        .j2p-btn-primary {
          background: var(--fg); color: var(--bg); font-family: 'Barlow', sans-serif;
          font-weight: 600; font-size: 14px; letter-spacing: 0.5px; padding: 14px 28px;
          border: none; cursor: pointer; text-decoration: none; display: inline-block; transition: background 0.15s;
        }
        .j2p-btn-primary:hover { background: var(--accent); }
        .j2p-note { font-size: 12px; color: var(--muted); }

        .j2p-deck {
          border: 1px solid var(--border); background: var(--surface);
        }
        .j2p-deck-header {
          background: var(--fg); color: var(--bg); padding: 12px 16px;
          display: flex; justify-content: space-between; align-items: center;
        }
        .j2p-deck-header-title {
          font-family: 'Barlow Condensed', sans-serif; font-weight: 700;
          font-size: 13px; letter-spacing: 1px; text-transform: uppercase;
        }
        .j2p-deck-header-num { font-size: 11px; color: var(--accent); font-weight: 700; }
        .j2p-deck-body { padding: 16px; }
        .j2p-deck-slide-title {
          font-family: 'Barlow Condensed', sans-serif; font-weight: 800; font-size: 18px; margin-bottom: 8px;
        }
        .j2p-deck-bar { height: 2px; background: var(--accent); width: 40px; margin-bottom: 10px; }
        .j2p-deck-text { font-size: 12px; color: var(--fg2); line-height: 1.6; }
        .j2p-deck-bullets { margin-top: 10px; display: flex; flex-direction: column; gap: 5px; }
        .j2p-deck-bullet { font-size: 11px; color: var(--fg2); display: flex; gap: 8px; }
        .j2p-deck-bullet::before { content: "→"; color: var(--accent); flex-shrink: 0; }
        .j2p-stat {
          font-size: 12px; color: var(--muted); padding-top: 16px;
          border-top: 1px solid var(--border); display: flex; gap: 32px;
        }
        .j2p-stat-item strong {
          display: block; font-family: 'Barlow Condensed', sans-serif;
          font-size: 28px; font-weight: 900; color: var(--fg); line-height: 1; margin-bottom: 2px;
        }

        .j2p-ticker {
          border-bottom: 1px solid var(--border); padding: 14px 40px;
          overflow: hidden; white-space: nowrap; background: var(--accent);
        }
        .j2p-ticker-inner {
          display: inline-flex; gap: 64px;
          animation: j2p-ticker 22s linear infinite;
        }
        .j2p-ticker-item {
          font-family: 'Barlow Condensed', sans-serif; font-size: 13px;
          font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: #fff;
        }
        @keyframes j2p-ticker { from { transform: translateX(0) } to { transform: translateX(-50%) } }
        @media (prefers-reduced-motion: reduce) { .j2p-ticker-inner { animation: none; } }

        .j2p-problem { display: grid; grid-template-columns: 1fr 1fr; border-bottom: 1px solid var(--border); }
        .j2p-problem-left { padding: 72px 40px; border-right: 1px solid var(--border); }
        .j2p-problem-right { padding: 72px 40px; }
        .j2p-section-label {
          font-size: 11px; font-weight: 600; letter-spacing: 2.5px;
          text-transform: uppercase; color: var(--muted); margin-bottom: 24px;
        }
        .j2p-problem-headline {
          font-family: 'Barlow Condensed', sans-serif; font-weight: 900;
          font-size: clamp(36px, 4vw, 52px); line-height: 1;
          text-transform: uppercase; margin-bottom: 20px;
        }
        .j2p-problem-body { font-size: 16px; color: var(--fg2); line-height: 1.7; max-width: 400px; }
        .j2p-contrast-block { display: flex; flex-direction: column; gap: 12px; }
        .j2p-contrast-item {
          padding: 20px 24px; border: 1px solid var(--border); display: flex; gap: 16px; align-items: flex-start;
        }
        .j2p-contrast-them { background: var(--surface); }
        .j2p-contrast-you { background: var(--fg); color: var(--bg); }
        .j2p-contrast-tag {
          font-size: 10px; font-weight: 700; letter-spacing: 1.5px;
          text-transform: uppercase; min-width: 40px; padding-top: 2px;
        }
        .j2p-contrast-them .j2p-contrast-tag { color: var(--muted); }
        .j2p-contrast-you .j2p-contrast-tag { color: var(--accent); }
        .j2p-contrast-text { font-size: 14px; line-height: 1.5; }
        .j2p-contrast-you .j2p-contrast-text { color: var(--bg); }

        .j2p-how { padding: 80px 40px; border-bottom: 1px solid var(--border); }
        .j2p-how-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 56px; }
        .j2p-how-headline {
          font-family: 'Barlow Condensed', sans-serif; font-weight: 900;
          font-size: clamp(40px, 5vw, 64px); line-height: 1; text-transform: uppercase;
        }
        .j2p-how-steps {
          display: grid; grid-template-columns: repeat(3, 1fr);
          border-top: 1px solid var(--border); border-left: 1px solid var(--border);
        }
        .j2p-how-step {
          padding: 40px 32px; border-right: 1px solid var(--border); border-bottom: 1px solid var(--border);
        }
        .j2p-step-num {
          font-family: 'Barlow Condensed', sans-serif; font-size: 48px;
          font-weight: 900; color: var(--accent); line-height: 1; margin-bottom: 20px;
        }
        .j2p-step-title {
          font-family: 'Barlow Condensed', sans-serif; font-weight: 800;
          font-size: 22px; text-transform: uppercase; margin-bottom: 10px;
        }
        .j2p-step-body { font-size: 14px; color: var(--fg2); line-height: 1.6; }

        .j2p-forwho {
          padding: 80px 40px; border-bottom: 1px solid var(--border);
          display: grid; grid-template-columns: 1fr 2fr; gap: 80px; align-items: start;
        }
        .j2p-forwho-headline {
          font-family: 'Barlow Condensed', sans-serif; font-weight: 900;
          font-size: clamp(36px, 4vw, 52px); line-height: 1;
          text-transform: uppercase; margin-bottom: 16px;
        }
        .j2p-forwho-desc { font-size: 15px; color: var(--fg2); line-height: 1.6; }
        .j2p-personas { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .j2p-persona { border: 1px solid var(--border); padding: 28px 24px; }
        .j2p-persona-role {
          font-family: 'Barlow Condensed', sans-serif; font-weight: 800;
          font-size: 18px; text-transform: uppercase; margin-bottom: 8px;
        }
        .j2p-persona-desc { font-size: 13px; color: var(--fg2); line-height: 1.5; }

        .j2p-cta-footer {
          background: var(--fg); color: var(--bg); padding: 100px 40px;
          display: flex; flex-direction: column; align-items: center; text-align: center;
        }
        .j2p-cta-headline {
          font-family: 'Barlow Condensed', sans-serif; font-weight: 900;
          font-size: clamp(52px, 8vw, 100px); line-height: 0.92;
          text-transform: uppercase; letter-spacing: -1px; margin-bottom: 32px;
        }
        .j2p-cta-headline em { font-style: normal; color: var(--accent); display: block; }
        .j2p-btn-cta-large {
          background: var(--accent); color: #fff; font-family: 'Barlow', sans-serif;
          font-weight: 600; font-size: 15px; letter-spacing: 0.5px; padding: 16px 40px;
          border: none; cursor: pointer; text-decoration: none; display: inline-block; transition: background 0.15s;
        }
        .j2p-btn-cta-large:hover { background: var(--accent-dim); }
        .j2p-cta-sub { font-size: 13px; color: var(--muted); margin-top: 14px; }

        .j2p-footer {
          padding: 24px 40px; display: flex; justify-content: space-between;
          align-items: center; font-size: 12px; color: var(--muted);
        }

        @media (max-width: 768px) {
          .j2p-nav { padding: 16px 20px; }
          .j2p-hero { grid-template-columns: 1fr; padding: 48px 20px 0; min-height: auto; }
          .j2p-hero-left { border-right: none; padding-right: 0; padding-bottom: 40px; border-bottom: 1px solid var(--border); }
          .j2p-hero-right { padding-left: 0; padding-bottom: 40px; }
          .j2p-problem { grid-template-columns: 1fr; }
          .j2p-problem-left { border-right: none; border-bottom: 1px solid var(--border); padding: 48px 20px; }
          .j2p-problem-right { padding: 48px 20px; }
          .j2p-how { padding: 56px 20px; }
          .j2p-how-header { flex-direction: column; align-items: flex-start; gap: 16px; }
          .j2p-how-steps { grid-template-columns: 1fr; }
          .j2p-forwho { grid-template-columns: 1fr; gap: 40px; padding: 56px 20px; }
          .j2p-personas { grid-template-columns: 1fr; }
          .j2p-cta-footer { padding: 72px 20px; }
          .j2p-footer { flex-direction: column; gap: 8px; padding: 20px; text-align: center; }
          .j2p-ticker { padding: 14px 20px; }
        }
      `}</style>

      {/* NAV */}
      <nav className="j2p-nav">
        <Link href="/" className="j2p-logo">Job2Pitch</Link>
        <Link href="/app" className="j2p-cta">Try it free</Link>
      </nav>

      {/* HERO */}
      <HeroSection />

      {/* TICKER */}
      <div className="j2p-ticker" aria-hidden="true">
        <div className="j2p-ticker-inner">
          {['Company Research','·','UX Audit','·','Sentiment Analysis','·','Opportunity Discovery','·','Pitch Deck Generation','·','Resume Tailoring','·','PPT + PDF Export','·',
            'Company Research','·','UX Audit','·','Sentiment Analysis','·','Opportunity Discovery','·','Pitch Deck Generation','·','Resume Tailoring','·','PPT + PDF Export','·'].map((item, i) => (
            <span key={i} className="j2p-ticker-item">{item}</span>
          ))}
        </div>
      </div>

      {/* PROBLEM */}
      <section className="j2p-problem">
        <div className="j2p-problem-left">
          <div className="j2p-section-label">The reality</div>
          <h2 className="j2p-problem-headline">200 CVs.<br />One role.</h2>
          <p className="j2p-problem-body">Every applicant sends the same portfolio and CV. Hiring managers skim for 8 seconds. The designer who gets the interview isn't always the best — it's the one who stood out before the first call.</p>
        </div>
        <div className="j2p-problem-right">
          <div className="j2p-section-label">The difference</div>
          <div className="j2p-contrast-block">
            <div className="j2p-contrast-item j2p-contrast-them">
              <div className="j2p-contrast-tag">Them</div>
              <div className="j2p-contrast-text">&ldquo;I'm a UX designer with 5 years of experience. Here's my portfolio link and CV. I look forward to hearing from you.&rdquo;</div>
            </div>
            <div className="j2p-contrast-item j2p-contrast-you">
              <div className="j2p-contrast-tag">You</div>
              <div className="j2p-contrast-text">&ldquo;I researched your product and found three UX friction points. Here's how I'd fix them — with a hypothesis and proposed metrics for each.&rdquo;</div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="j2p-how">
        <div className="j2p-how-header">
          <h2 className="j2p-how-headline">How it works.</h2>
          <Link href="/app" className="j2p-btn-primary" style={{ whiteSpace: 'nowrap' }}>Try it now →</Link>
        </div>
        <div className="j2p-how-steps">
          {[
            { n: '01', title: 'Paste the job', body: 'Drop in the job description and URL. Four AI agents research the company in parallel — live web data, not generic guesses.' },
            { n: '02', title: 'Pick your opportunities', body: 'Review the UX opportunities the research surfaces. Each one is grounded in real user sentiment and product gaps. Choose the ones that fit your angle.' },
            { n: '03', title: 'Download the deck', body: 'A complete pitch deck, ready to send or present. Export as PDF or PPT. Tailor your resume to match — automatically.' },
          ].map(s => (
            <div key={s.n} className="j2p-how-step">
              <div className="j2p-step-num">{s.n}</div>
              <div className="j2p-step-title">{s.title}</div>
              <p className="j2p-step-body">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FOR WHO */}
      <section className="j2p-forwho">
        <div>
          <div className="j2p-section-label">Who it&apos;s for</div>
          <h2 className="j2p-forwho-headline">Built for designers who think.</h2>
          <p className="j2p-forwho-desc">If you&apos;re applying for roles where strategic thinking matters, this is the edge that gets you in the room.</p>
        </div>
        <div className="j2p-personas">
          {[
            { role: 'Product Designers', desc: 'Applying to product-led companies where UX strategy is as important as craft. Show you understand the business, not just the interface.' },
            { role: 'UX Leads', desc: 'Senior roles where you\'ll be expected to identify problems before being asked. The pitch deck is the audition.' },
            { role: 'Career Changers', desc: 'Less experience, more initiative. Demonstrate the ability to research and frame problems before you\'ve had the title.' },
            { role: 'Freelancers', desc: 'Pitching for a contract or retainer. Arrive with a UX audit instead of a rate card. The conversation starts differently.' },
          ].map(p => (
            <div key={p.role} className="j2p-persona">
              <div className="j2p-persona-role">{p.role}</div>
              <p className="j2p-persona-desc">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA FOOTER */}
      <section className="j2p-cta-footer">
        <h2 className="j2p-cta-headline">
          Most designers<br />apply.
          <em>You pitch.</em>
        </h2>
        <Link href="/app" className="j2p-btn-cta-large">Generate your pitch free</Link>
        <p className="j2p-cta-sub">No account. No credit card. Takes 2 minutes.</p>
      </section>

      <footer className="j2p-footer">
        <span>Job2Pitch — built for UX designers</span>
        <span>job2-pitch.vercel.app</span>
      </footer>
    </div>
  );
}

function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let animId: number;
    let W = 0, H = 0;
    let dotsT = 0;

    const WORDS = [
      'Senior UX','Product Design','Information Arch.','Figma','User Research',
      'Portfolio','Interview','UX Lead','Strategy','Pitch','Wireframe',
      'Design System','Prototype','A/B Test','CX','Hire','Remote','Brief',
      'Job Desc','UX Audit','Opportunity','Deck','Persona','Journey Map',
    ];
    const COLS_DOT = 26, ROWS_DOT = 16;

    type Drop = { x: number; y: number; speed: number; word: string; alpha: number; size: number; accent: boolean };
    let drops: Drop[] = [];

    function initDrops() {
      const numCols = Math.floor(W / 56);
      drops = Array.from({ length: numCols }, (_, i) => ({
        x: i * (W / numCols) + (W / numCols) * 0.3,
        y: Math.random() * -H * 1.5,
        speed: 0.35 + Math.random() * 0.55,
        word: WORDS[Math.floor(Math.random() * WORDS.length)],
        alpha: 0.07 + Math.random() * 0.13,
        size: 9 + Math.random() * 7,
        accent: Math.random() < 0.1,
      }));
    }

    function resize() {
      const hero = canvas.parentElement!;
      W = canvas.width = hero.offsetWidth;
      H = canvas.height = hero.offsetHeight;
      initDrops();
    }

    function isDark() {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);
      const dark = isDark();
      const sx = W / (COLS_DOT - 1);
      const sy = H / (ROWS_DOT - 1);

      // Dots layer
      for (let row = 0; row < ROWS_DOT; row++) {
        for (let col = 0; col < COLS_DOT; col++) {
          const nx = col / COLS_DOT, ny = row / ROWS_DOT;
          const wave = Math.sin(nx * 6 + dotsT) * Math.cos(ny * 4 + dotsT * 0.7);
          const r = 1 + wave * 2.2;
          if (r <= 0.2) continue;
          const x = col * sx, y = row * sy;
          const accent = wave > 0.75;
          const alpha = 0.06 + Math.abs(wave) * 0.13;
          ctx.beginPath();
          ctx.arc(x, y, Math.max(0.3, r), 0, Math.PI * 2);
          ctx.fillStyle = accent
            ? `rgba(232,53,42,${alpha * 1.6})`
            : dark ? `rgba(240,237,232,${alpha})` : `rgba(13,13,13,${alpha})`;
          ctx.fill();
        }
      }

      // Rain layer
      ctx.font = `700 12px 'Barlow Condensed', sans-serif`;
      drops.forEach(d => {
        ctx.font = `700 ${d.size}px 'Barlow Condensed', sans-serif`;
        ctx.fillStyle = d.accent
          ? `rgba(232,53,42,${d.alpha * 1.8})`
          : dark ? `rgba(240,237,232,${d.alpha})` : `rgba(13,13,13,${d.alpha})`;
        ctx.fillText(d.word, d.x, d.y);
        d.y += d.speed;
        if (d.y > H + 40) {
          d.y = -40;
          d.word = WORDS[Math.floor(Math.random() * WORDS.length)];
          d.accent = Math.random() < 0.1;
          d.alpha = 0.07 + Math.random() * 0.13;
        }
      });

      dotsT += 0.016;
      animId = requestAnimationFrame(draw);
    }

    resize();
    draw();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement!);

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
    };
  }, []);

  return (
    <section className="j2p-hero">
      <canvas ref={canvasRef} aria-hidden="true" />
      <div className="j2p-hero-left">
        <div>
          <div className="j2p-eyebrow">For UX Designers</div>
          <h1 className="j2p-headline">
            Stop<br />applying.
            <em>Start pitching.</em>
          </h1>
          <p className="j2p-sub">Paste a job description. Get a personalised UX opportunity report and pitch deck that demonstrates strategic thinking — before you&apos;ve spoken to anyone.</p>
        </div>
        <div>
          <div className="j2p-actions">
            <Link href="/app" className="j2p-btn-primary">Generate your pitch</Link>
            <span className="j2p-note">No account needed</span>
          </div>
        </div>
      </div>
      <div className="j2p-hero-right">
        <div className="j2p-deck">
          <div className="j2p-deck-header">
            <span className="j2p-deck-header-title">UX Pitch — Figma</span>
            <span className="j2p-deck-header-num">6 slides</span>
          </div>
          <div className="j2p-deck-body">
            <div className="j2p-deck-slide-title">Onboarding drop-off at step 3</div>
            <div className="j2p-deck-bar" />
            <div className="j2p-deck-text">Community reviews show consistent confusion at the project setup step. 34% of G2 reviews mention &ldquo;hard to get started.&rdquo;</div>
            <div className="j2p-deck-bullets">
              <div className="j2p-deck-bullet">Redesign the setup flow into a progressive disclosure pattern</div>
              <div className="j2p-deck-bullet">Introduce a project template gallery to reduce blank-slate anxiety</div>
              <div className="j2p-deck-bullet">Add inline contextual guidance rather than a separate docs link</div>
            </div>
          </div>
        </div>
        <div className="j2p-stat">
          <div className="j2p-stat-item"><strong>4</strong>AI agents</div>
          <div className="j2p-stat-item"><strong>~2 min</strong>per pitch</div>
          <div className="j2p-stat-item"><strong>Real</strong>web research</div>
        </div>
      </div>
    </section>
  );
}
