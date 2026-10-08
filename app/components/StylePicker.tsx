'use client';
import { DeckStyle, STYLES } from '../styles';

export default function StylePicker({ value, onChange }: {
  value: DeckStyle;
  onChange: (s: DeckStyle) => void;
}) {
  return (
    <div>
      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '1.2px', textTransform: 'uppercase', color: '#888', marginBottom: 10 }}>
        Presentation style
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
        {(Object.values(STYLES)).map(s => (
          <button
            key={s.id}
            onClick={() => onChange(s.id)}
            style={{
              border: value === s.id ? `2px solid ${s.accent}` : '1px solid var(--border)',
              borderRadius: 4,
              padding: '10px 12px',
              background: value === s.id ? s.accentLight : 'var(--white)',
              cursor: 'pointer',
              textAlign: 'left',
              transition: 'all 0.15s',
            }}
          >
            {/* Mini preview swatch */}
            <div style={{ display: 'flex', gap: 3, marginBottom: 6 }}>
              <div style={{ width: 16, height: 16, borderRadius: 2, background: s.accent }} />
              <div style={{ width: 16, height: 16, borderRadius: 2, background: s.bg, border: `1px solid ${s.border}` }} />
              <div style={{ width: 16, height: 16, borderRadius: 2, background: s.headerBg, border: `1px solid ${s.border}` }} />
            </div>
            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--ink)', marginBottom: 1 }}>{s.name}</div>
            <div style={{ fontSize: 10, color: 'var(--muted)' }}>{s.description}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
