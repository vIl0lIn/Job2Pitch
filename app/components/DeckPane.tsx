'use client';
import { useEffect, useState } from 'react';
import { CompanyProfile, Opportunity, PitchDeck, PitchSlide } from '../types';
import { DeckStyle, STYLES, StyleConfig } from '../styles';
import StylePicker from './StylePicker';

export default function DeckPane({ company, selectedOpps, designerName, deck, deckStyle, onGenerated, onBack, onReset }: {
  company: CompanyProfile;
  selectedOpps: Opportunity[];
  designerName: string;
  deck: PitchDeck | null;
  deckStyle: DeckStyle;
  onGenerated: (d: PitchDeck) => void;
  onBack: () => void;
  onReset: () => void;
}) {
  const [loading, setLoading] = useState(!deck);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [style, setStyle] = useState<DeckStyle>(deckStyle);
  const [exporting, setExporting] = useState(false);

  const s = STYLES[style];

  useEffect(() => {
    if (deck) return;
    fetch('/api/generate-deck', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ company, selectedOpportunities: selectedOpps, designerName }),
    })
      .then(async res => {
        if (!res.ok) { const e = await res.json(); throw new Error(e.error || 'Failed'); }
        return res.json();
      })
      .then(d => {
        onGenerated(d);
        setLoading(false);
        // Save to history
        try {
          const history = JSON.parse(localStorage.getItem('j2p_history') || '[]');
          history.unshift({
            id: Date.now(),
            companyName: d.companyName,
            roleTitle: d.roleTitle,
            designerName: d.designerName,
            createdAt: new Date().toISOString(),
            deck: d,
            style,
          });
          localStorage.setItem('j2p_history', JSON.stringify(history.slice(0, 20)));
        } catch { /* ignore */ }
      })
      .catch(e => { setError(e.message); setLoading(false); });
  }, []);

  const copyAll = () => {
    if (!deck) return;
    const text = deck.slides.map(slide => {
      let t = `SLIDE ${slide.slideNumber}: ${slide.title}\n\n${slide.content}`;
      if (slide.hypothesis) t += `\n\nHypothesis: ${slide.hypothesis}`;
      if (slide.bullets?.length) t += '\n\n' + slide.bullets.map(b => `• ${b}`).join('\n');
      if (slide.metrics?.length) t += '\n\nMetrics:\n' + slide.metrics.map(m => `• ${m}`).join('\n');
      return t;
    }).join('\n\n---\n\n');
    navigator.clipboard.writeText(text).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); });
  };

  const exportPDF = () => {
    if (!deck) return;
    window.print();
  };

  const exportPPT = async () => {
    if (!deck) return;
    setExporting(true);
    try {
      const PptxGenJS = (await import('pptxgenjs')).default;
      const prs = new PptxGenJS();
      prs.layout = 'LAYOUT_WIDE';

      const accent = s.accent;
      const bg = style === 'tech' ? '0a0f1a' : 'ffffff';
      const textColor = style === 'tech' ? 'e2e8f0' : '1a1a1a';
      const mutedColor = style === 'tech' ? '94a3b8' : '888888';

      deck.slides.forEach(slide => {
        const pSlide = prs.addSlide();
        pSlide.background = { color: bg };

        // Slide number badge
        pSlide.addText(slide.slideNumber.toString().padStart(2, '0'), {
          x: 0.4, y: 0.3, w: 0.5, h: 0.3,
          fontSize: 10, bold: true, color: accent.replace('#', ''),
        });

        // Title
        pSlide.addText(slide.title, {
          x: 0.4, y: 0.65, w: 11.8, h: 0.55,
          fontSize: 22, bold: true, color: textColor,
        });

        // Divider line
        pSlide.addShape(prs.ShapeType.rect, {
          x: 0.4, y: 1.25, w: 11.8, h: 0.02,
          fill: { color: accent.replace('#', '') },
        });

        // Content
        pSlide.addText(slide.content, {
          x: 0.4, y: 1.4, w: 11.8, h: 0.6,
          fontSize: 13, color: mutedColor, wrap: true,
        });

        let yPos = 2.1;

        // Hypothesis
        if (slide.hypothesis) {
          pSlide.addText(`If ${slide.hypothesis}`, {
            x: 0.4, y: yPos, w: 11.8, h: 0.5,
            fontSize: 12, italic: true, color: accent.replace('#', ''),
            fill: { color: style === 'tech' ? '0f1a2e' : 'fdf0ef' },
            margin: 8,
          });
          yPos += 0.65;
        }

        // Bullets
        if (slide.bullets?.length) {
          slide.bullets.forEach(b => {
            pSlide.addText(`→  ${b}`, {
              x: 0.4, y: yPos, w: 11.8, h: 0.35,
              fontSize: 12, color: textColor,
            });
            yPos += 0.38;
          });
        }

        // Metrics
        if (slide.metrics?.length) {
          slide.metrics.forEach((m, i) => {
            const col = i % 2;
            const row = Math.floor(i / 2);
            const [k, ...v] = m.split(':');
            pSlide.addText(k.trim(), {
              x: 0.4 + col * 6, y: yPos + row * 0.7, w: 5.6, h: 0.25,
              fontSize: 9, bold: true, color: accent.replace('#', ''),
            });
            pSlide.addText(v.join(':').trim(), {
              x: 0.4 + col * 6, y: yPos + row * 0.7 + 0.27, w: 5.6, h: 0.35,
              fontSize: 11, color: textColor,
            });
          });
        }
      });

      await prs.writeFile({ fileName: `${deck.companyName}-pitch.pptx` });
    } catch (e) {
      console.error(e);
      alert('PPT export failed. Try PDF instead.');
    }
    setExporting(false);
  };

  if (loading) return (
    <div className="fade-up" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
      <div className="label" style={{ marginBottom: 10 }}>Step 4 of 4</div>
      <h1 style={{ fontSize: 26, fontWeight: 800, letterSpacing: '-0.8px', marginBottom: 20 }}>Generating deck…</h1>
      <div className="spinner" />
    </div>
  );

  if (error) return (
    <div className="fade-up">
      <p style={{ color: 'var(--red)', marginBottom: 16, fontSize: 14 }}>{error}</p>
      <button className="btn btn-outline" onClick={onBack}>← Back</button>
    </div>
  );

  if (!deck) return null;

  return (
    <div className="fade-up">
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
        <div>
          <button onClick={onBack} style={{ background: 'none', border: 'none', fontSize: 13, color: 'var(--muted)', cursor: 'pointer', padding: 0, marginBottom: 10 }}>← Back</button>
          <h1 style={{ fontSize: 26, fontWeight: 800, letterSpacing: '-0.8px', marginBottom: 2 }}>{deck.companyName}</h1>
          <p style={{ fontSize: 13, color: 'var(--muted)' }}>{deck.roleTitle} · {deck.slides.length} slides</p>
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
          <button className="btn btn-outline" onClick={copyAll} style={{ fontSize: 13 }}>
            {copied ? '✓ Copied' : 'Copy all'}
          </button>
          <button className="btn btn-outline" onClick={exportPDF} style={{ fontSize: 13 }}>
            ↓ PDF
          </button>
          <button className="btn btn-outline" onClick={exportPPT} style={{ fontSize: 13, minWidth: 70 }}>
            {exporting ? '…' : '↓ PPT'}
          </button>
          <button className="btn btn-black" onClick={onReset} style={{ fontSize: 13 }}>New pitch</button>
        </div>
      </div>

      {/* Style picker */}
      <div style={{ marginBottom: 20, padding: '16px', background: 'var(--off-white)', borderRadius: 4 }}>
        <StylePicker value={style} onChange={setStyle} />
      </div>

      {/* Slide grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }} id="deck-print-area">
        {deck.slides.map(slide => <SlideCard key={slide.slideNumber} slide={slide} s={s} />)}
      </div>

      <div style={{ marginTop: 24, padding: '16px 18px', background: 'var(--off-white)', borderRadius: 4, fontSize: 13, color: 'var(--ink-2)', lineHeight: 1.6 }}>
        <strong>How to use this:</strong> Export as PPT to edit in Google Slides or PowerPoint. Add wireframes or annotated screenshots to Slide 5. Style to match your personal brand.
      </div>
    </div>
  );
}

function SlideCard({ slide, s }: { slide: PitchSlide; s: StyleConfig }) {
  const [open, setOpen] = useState(true);
  return (
    <div style={{ border: `1px solid ${s.border}`, borderRadius: s.radius, overflow: 'hidden', background: s.cardBg }}>
      <div
        style={{ padding: '14px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', background: s.headerBg, borderBottom: open ? `1px solid ${s.border}` : 'none' }}
        onClick={() => setOpen(o => !o)}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: s.numberColor, minWidth: 20, fontFamily: s.font }}>{slide.slideNumber.toString().padStart(2, '0')}</span>
          <span style={{ fontSize: 13, fontWeight: 600, color: s.ink, fontFamily: s.font }}>{slide.title}</span>
        </div>
        <span style={{ color: s.muted, fontSize: 14 }}>{open ? '−' : '+'}</span>
      </div>

      {open && (
        <div style={{ padding: '14px 16px', background: s.cardBg }}>
          <p style={{ fontSize: 13, color: s.ink2, lineHeight: 1.6, marginBottom: slide.hypothesis || slide.bullets || slide.metrics ? 12 : 0, fontFamily: s.font }}>
            {slide.content}
          </p>

          {slide.hypothesis && (
            <div style={{ background: s.accentLight, border: `1px solid ${s.accent}22`, borderRadius: s.radius, padding: '10px 12px', fontSize: 13, color: s.accentText, fontStyle: 'italic', marginBottom: 10 }}>
              <span style={{ fontStyle: 'normal', fontWeight: 700, marginRight: 6 }}>If</span>{slide.hypothesis}
            </div>
          )}

          {slide.bullets?.map((b, i) => (
            <div key={i} style={{ fontSize: 12, color: s.ink2, marginBottom: 4, display: 'flex', gap: 8, fontFamily: s.font }}>
              <span style={{ color: s.accent, flexShrink: 0, marginTop: 1 }}>→</span>{b}
            </div>
          ))}

          {slide.metrics && (
            <div style={{ marginTop: 8, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
              {slide.metrics.map((m, i) => {
                const [k, ...v] = m.split(':');
                return (
                  <div key={i} style={{ background: s.headerBg, borderRadius: s.radius, padding: '8px 10px', border: `1px solid ${s.border}` }}>
                    <div style={{ fontSize: 10, fontWeight: 700, color: s.accentText, marginBottom: 2 }}>{k}</div>
                    <div style={{ fontSize: 11, color: s.ink2 }}>{v.join(':').trim()}</div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
