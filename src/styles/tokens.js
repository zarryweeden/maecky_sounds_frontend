export const C = {
  // ── Backgrounds (darkest → lightest) ─────────────────────────────────────
  bg:        '#FFFFFF',
  surface:   '#F8F8FA',
  card:      '#FFFFFF',
  cardHi:    '#F0F0F5',

  // ── Borders ───────────────────────────────────────────────────────────────
  border:    '#E2E2E8',
  borderHi:  '#C8C8D2',

  // ── Brand — Electric Amber (primary) ─────────────────────────────────────
  amber:     '#E8871A',
  amberHi:   '#F5A23D',
  amberLo:   'rgba(232,135,26,0.12)',
  amberGlow: 'rgba(232,135,26,0.25)',

  // ── Brand — Deep Crimson (secondary accent) ───────────────────────────────
  crimson:   '#C0392B',
  crimsonLo: 'rgba(192,57,43,0.12)',

  // ── Brand — Electric Blue (tertiary accent) ───────────────────────────────
  blue:      '#3B82F6',
  blueLo:    'rgba(59,130,246,0.12)',

  // ── Text hierarchy ────────────────────────────────────────────────────────
  text:      '#111113',
  textMid:   '#161616',
  textLo:    '#161616',

  // ── Semantic states ───────────────────────────────────────────────────────
  success:   '#22C55E',
  successLo: 'rgba(34,197,94,0.12)',
  warning:   '#F59E0B',
  warningLo: 'rgba(245,158,11,0.12)',
  error:     '#EF4444',
  errorLo:   'rgba(239,68,68,0.12)',

  // ── Price semantic ────────────────────────────────────────────────────────
  sale:      '#C0392B',
  original:  '#5C5650',
};

export const FONTS = {
  display: "'Raleway', sans-serif",
  body:    "'Inter', sans-serif",
  mono:    "'JetBrains Mono', monospace",
};

export const BP = {
  sm:  '480px',
  md:  '768px',
  lg:  '1024px',
  xl:  '1280px',
  xxl: '1536px',
};

export const SHADOW = {
  card:      '0 2px 8px rgba(0,0,0,0.5)',
  cardHover: '0 8px 32px rgba(0,0,0,0.6), 0 0 0 1px rgba(232,135,26,0.2)',
  amberGlow: '0 0 24px rgba(232,135,26,0.3)',
  modal:     '0 24px 80px rgba(0,0,0,0.8)',
  nav:       '0 1px 0 rgba(255,255,255,0.04)',
};

export const TRANSITION = {
  fast:   'all 0.15s ease',
  mid:    'all 0.25s ease',
  spring: 'all 0.35s cubic-bezier(0.22, 1, 0.36, 1)',
  slow:   'all 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
};

export const Z = {
  base:    1,
  card:    10,
  sticky:  50,
  nav:     100,
  drawer:  200,
  modal:   300,
  toast:   400,
  overlay: 500,
};

export const RADIUS = {
  card:    '12px',
  button:  '8px',
  pill:    '99px',
  input:   '8px',
  badge:   '4px',
  image:   '10px',
  modal:   '16px',
  avatar:  '50%',
  bar:     '99px',
};

export const SPACING = {
  navHeight:      '64px',
  cardPadding:    '20px',
  sectionV:       '64px',
  sectionVLg:     '80px',
  maxWidth:       '1280px',
  gridGap:        '20px',
  sidebarWidth:   '280px',
};