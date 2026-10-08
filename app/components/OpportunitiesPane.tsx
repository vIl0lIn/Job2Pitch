'use client';
import { useState } from 'react';
import { ResearchResult, Opportunity } from '../types';

const IMPACT_CLASS: Record<string, string> = { High: 'badge-high', Medium: 'badge-medium', Low: 'badge-low' };

export default function OpportunitiesPane({ research, onSubmit, onBack }: {
  research: ResearchResult;
  onSubmit: (opps: Opportunity[]) => void;
  onBack: () => void;
}) {
  const [selected, setSelected] = useState<string[]>([]);
  const { company, opportunities } = research;

  const toggle = (id: string) =>
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : prev.length < 3 ? [...prev, id] : prev);

  const selectedOpps = opportunities.filter(o => selected.includes(o.id));

  return (
    <div className="fade-up">
      <div style={{ marginBottom: 24 }}>
        <button onClick={onBack} style={{ background: 'none', border: 'none', fontSize: 13, color: 'var(--muted)', cursor: 'pointer', padding: 0, marginBottom: 12 }}>← Back</button>
        <div className="label" style={{ marginBottom: 10 }}>Step 3 of 4</div>
        <h1 style={{ fontSize: 26, fontWeight: 800, letterSpacing: '-0.8px', marginBottom: 4 }}>{company.name}</h1>
        <p style={{ fontSize: 14, color: 'var(--muted)', marginBottom: 2 }}>Pick the opportunities worth pitching.</p>
        <p style={{ fontSize: 13, color: 'var(--muted-2)' }}>Select 1–3. Your first selection becomes the hero narrative.</p>
      </div>

      {/* 2-column grid matching the mockup */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 24 }}>
        {opportunities.map((opp, i) => {
          const isSelected = selected.includes(opp.id);
          const order = selected.indexOf(opp.id);
          return (
            <div
              key={opp.id}
              className={`opp-card ${isSelected ? 'selected' : ''}`}
              onClick={() => toggle(opp.id)}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                <div style={{
                  width: 22, height: 22, borderRadius: '50%', flexShrink: 0,
                  border: `1.5px solid ${isSelected ? 'var(--red)' : 'var(--border-dark)'}`,
                  background: isSelected ? 'var(--red)' : 'white',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 10, fontWeight: 700, color: 'white',
                }}>
                  {isSelected ? order + 1 : ''}
                </div>
                <span className={`badge ${IMPACT_CLASS[opp.businessImpact]}`}>{opp.businessImpact}</span>
              </div>

              <h3 style={{ fontSize: 13, fontWeight: 700, marginBottom: 6, lineHeight: 1.4 }}>{opp.title}</h3>
              <p style={{ fontSize: 12, color: 'var(--ink-2)', lineHeight: 1.5, marginBottom: 10 }}>{opp.whyItMatters}</p>

              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                <span className="badge badge-gray">{opp.estimatedEffort} effort</span>
                <span className="badge badge-gray">{opp.confidenceScore}% confidence</span>
              </div>

              {opp.evidence.length > 0 && (
                <div style={{ marginTop: 10 }}>
                  {opp.evidence.slice(0, 2).map((e, ei) => (
                    <div key={ei} style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 3, display: 'flex', gap: 5 }}>
                      <span style={{ color: 'var(--red)', flexShrink: 0 }}>→</span>{e}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 16, borderTop: '1px solid var(--border)' }}>
        <span style={{ fontSize: 13, color: 'var(--muted)' }}>
          {selected.length === 0 ? 'None selected' : `${selected.length} selected`}
        </span>
        <button
          className="btn btn-red"
          disabled={selected.length === 0}
          onClick={() => onSubmit(selectedOpps)}
        >
          Generate pitch deck →
        </button>
      </div>
    </div>
  );
}
