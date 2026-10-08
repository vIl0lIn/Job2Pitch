'use client';

import { useState } from 'react';
import Link from 'next/link';
import { JobInput, ResearchResult, Opportunity, PitchDeck } from '../types';
import { DeckStyle } from '../styles';
import InputPane from '../components/InputPane';
import ResearchPane from '../components/ResearchPane';
import OpportunitiesPane from '../components/OpportunitiesPane';
import DeckPane from '../components/DeckPane';
import PreviewPanel from '../components/PreviewPanel';

export type AppStep = 'input' | 'research' | 'opportunities' | 'deck';

export default function AppPage() {
  const [step, setStep] = useState<AppStep>('input');
  const [jobInput, setJobInput] = useState<JobInput | null>(null);
  const [designerName, setDesignerName] = useState('');
  const [research, setResearch] = useState<ResearchResult | null>(null);
  const [selectedOpps, setSelectedOpps] = useState<Opportunity[]>([]);
  const [deck, setDeck] = useState<PitchDeck | null>(null);
  const [deckStyle, setDeckStyle] = useState<DeckStyle>('modern');

  const stepLabels: Record<AppStep, string> = {
    input: 'Paste the job.',
    research: 'Researching…',
    opportunities: research?.company?.name ? `${research.company.name}` : 'Opportunities',
    deck: research?.company?.name ?? 'Pitch Deck',
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Nav */}
      <nav className="nav">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', padding: '0 20px' }}>
          <Link href="/" style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink)', textDecoration: 'none' }}>Job2Pitch</Link>

          {/* Step breadcrumb */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: 'var(--muted)' }}>
            {(['input', 'research', 'opportunities', 'deck'] as AppStep[]).map((s, i, arr) => (
              <span key={s} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{
                  color: s === step ? 'var(--ink)' : (['input', 'research', 'opportunities', 'deck'].indexOf(s) < ['input', 'research', 'opportunities', 'deck'].indexOf(step)) ? 'var(--red)' : 'var(--muted-2)',
                  fontWeight: s === step ? 600 : 400,
                }}>
                  {s === 'input' ? 'Input' : s === 'research' ? 'Research' : s === 'opportunities' ? 'Opportunities' : 'Deck'}
                </span>
                {i < arr.length - 1 && <span style={{ color: 'var(--border-dark)' }}>›</span>}
              </span>
            ))}
          </div>

          <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            <Link href="/profile" style={{ fontSize: 12, color: 'var(--muted)', textDecoration: 'none' }}>Profile</Link>
            <Link href="/login" style={{ fontSize: 12, color: 'var(--muted)', textDecoration: 'none' }}>Sign in</Link>
          </div>
        </div>
      </nav>

      {/* App shell */}
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '240px 1fr 1fr', overflow: 'hidden', height: 'calc(100vh - 52px)' }}>
        {/* Sidebar */}
        <aside style={{ borderRight: '1px solid var(--border)', padding: '24px 16px', overflowY: 'auto', background: 'var(--white)' }}>
          <div className="label" style={{ marginBottom: 16 }}>Current pitch</div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {([
              { s: 'input' as AppStep, label: 'Job input' },
              { s: 'research' as AppStep, label: 'Research' },
              { s: 'opportunities' as AppStep, label: 'Opportunities' },
              { s: 'deck' as AppStep, label: 'Pitch deck' },
            ] as { s: AppStep; label: string }[]).map(({ s, label }) => {
              const steps: AppStep[] = ['input', 'research', 'opportunities', 'deck'];
              const currentIdx = steps.indexOf(step);
              const itemIdx = steps.indexOf(s);
              const isDone = itemIdx < currentIdx;
              const isCurrent = s === step;

              return (
                <div key={s} style={{
                  padding: '8px 10px',
                  borderRadius: 3,
                  fontSize: 13,
                  fontWeight: isCurrent ? 600 : 400,
                  color: isCurrent ? 'var(--ink)' : isDone ? 'var(--red)' : 'var(--muted)',
                  background: isCurrent ? 'var(--off-white)' : 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  cursor: isDone ? 'pointer' : 'default',
                }} onClick={() => {
                  if (isDone) setStep(s);
                }}>
                  <span style={{ fontSize: 11, width: 14 }}>
                    {isDone ? '✓' : isCurrent ? '→' : '·'}
                  </span>
                  {label}
                </div>
              );
            })}
          </div>

          {research && (
            <div style={{ marginTop: 24, paddingTop: 20, borderTop: '1px solid var(--border)' }}>
              <div className="label" style={{ marginBottom: 12 }}>Company</div>
              <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 4 }}>{research.company.name}</div>
              <div style={{ fontSize: 12, color: 'var(--muted)' }}>{research.company.roleTitle}</div>
              <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>{research.company.industry}</div>
            </div>
          )}

          {selectedOpps.length > 0 && (
            <div style={{ marginTop: 20, paddingTop: 20, borderTop: '1px solid var(--border)' }}>
              <div className="label" style={{ marginBottom: 10 }}>Selected ({selectedOpps.length})</div>
              {selectedOpps.map((o, i) => (
                <div key={o.id} style={{ fontSize: 12, color: 'var(--ink-2)', marginBottom: 6, paddingLeft: 8, borderLeft: '2px solid var(--red)', lineHeight: 1.4 }}>
                  <span style={{ color: 'var(--red)', fontSize: 10, fontWeight: 700, marginRight: 4 }}>{i + 1}</span>
                  {o.title}
                </div>
              ))}
            </div>
          )}
        </aside>

        {/* Main pane */}
        <main style={{ borderRight: '1px solid var(--border)', overflowY: 'auto', padding: '32px 28px', background: 'var(--white)' }}>
          {step === 'input' && (
            <InputPane onSubmit={(input, name) => {
              setJobInput(input);
              setDesignerName(name);
              setStep('research');
            }} />
          )}
          {step === 'research' && jobInput && (
            <ResearchPane
              input={jobInput}
              onComplete={result => { setResearch(result); setStep('opportunities'); }}
              onBack={() => setStep('input')}
            />
          )}
          {step === 'opportunities' && research && (
            <OpportunitiesPane
              research={research}
              onSubmit={opps => { setSelectedOpps(opps); setStep('deck'); }}
              onBack={() => setStep('research')}
            />
          )}
          {step === 'deck' && research && (
            <DeckPane
              company={research.company}
              selectedOpps={selectedOpps}
              designerName={designerName}
              deck={deck}
              deckStyle={deckStyle}
              onGenerated={setDeck}
              onBack={() => setStep('opportunities')}
              onReset={() => {
                setStep('input'); setJobInput(null); setResearch(null);
                setSelectedOpps([]); setDeck(null); setDesignerName('');
                setDeckStyle('modern');
              }}
            />
          )}
        </main>

        {/* Preview pane */}
        <aside style={{ background: 'var(--black)', overflowY: 'auto', padding: '32px 24px' }}>
          <PreviewPanel step={step} jobInput={jobInput} research={research} deck={deck} />
        </aside>
      </div>
    </div>
  );
}
