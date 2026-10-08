export type DeckStyle = 'modern' | 'classic' | 'tech' | 'minimal';

export interface StyleConfig {
  id: DeckStyle;
  name: string;
  description: string;
  accent: string;
  accentHover: string;
  accentLight: string;
  accentText: string;
  bg: string;
  cardBg: string;
  headerBg: string;
  border: string;
  ink: string;
  ink2: string;
  muted: string;
  numberColor: string;
  font: string;
  headingWeight: number;
  radius: number;
}

export const STYLES: Record<DeckStyle, StyleConfig> = {
  modern: {
    id: 'modern',
    name: 'Modern',
    description: 'Bold red, editorial',
    accent: '#e8352a',
    accentHover: '#c82a1f',
    accentLight: '#fdf0ef',
    accentText: '#e8352a',
    bg: '#ffffff',
    cardBg: '#ffffff',
    headerBg: '#f5f4f1',
    border: '#e2e2e2',
    ink: '#1a1a1a',
    ink2: '#3d3d3d',
    muted: '#888888',
    numberColor: '#e8352a',
    font: "'Inter', system-ui, sans-serif",
    headingWeight: 800,
    radius: 4,
  },
  classic: {
    id: 'classic',
    name: 'Classic',
    description: 'Navy & gold, timeless',
    accent: '#1a3a5c',
    accentHover: '#122840',
    accentLight: '#eef3f8',
    accentText: '#1a3a5c',
    bg: '#fdfcf8',
    cardBg: '#fdfcf8',
    headerBg: '#f0ece0',
    border: '#d4cdb8',
    ink: '#1a1a14',
    ink2: '#3d3830',
    muted: '#8a8070',
    numberColor: '#b8973a',
    font: "'Georgia', 'Times New Roman', serif",
    headingWeight: 700,
    radius: 2,
  },
  tech: {
    id: 'tech',
    name: 'Tech',
    description: 'Dark mode, electric blue',
    accent: '#3b82f6',
    accentHover: '#2563eb',
    accentLight: '#0f1a2e',
    accentText: '#60a5fa',
    bg: '#0a0f1a',
    cardBg: '#0f1520',
    headerBg: '#141c2e',
    border: '#1e2d45',
    ink: '#e2e8f0',
    ink2: '#94a3b8',
    muted: '#475569',
    numberColor: '#3b82f6',
    font: "'SF Mono', 'Fira Code', 'Consolas', monospace",
    headingWeight: 700,
    radius: 6,
  },
  minimal: {
    id: 'minimal',
    name: 'Minimal',
    description: 'Black & white, pure',
    accent: '#000000',
    accentHover: '#222222',
    accentLight: '#f5f5f5',
    accentText: '#000000',
    bg: '#ffffff',
    cardBg: '#ffffff',
    headerBg: '#f9f9f9',
    border: '#ebebeb',
    ink: '#000000',
    ink2: '#333333',
    muted: '#999999',
    numberColor: '#000000',
    font: "'Inter', system-ui, sans-serif",
    headingWeight: 600,
    radius: 0,
  },
};
