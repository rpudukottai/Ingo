export interface HeroStringConfig {
  id: string;
  x0: number;
  y0: number;
  cx1: number;
  cy1: number;
  cx2: number;
  cy2: number;
  x3: number;
  y3: number;
  width: number;
  opacity: number;
  grad: string;
  amplitudeY: number;
  amplitudeX: number;
  frequency: number;
  secondaryFrequency: number;
  phase: number;
  hasPulse: boolean;
  pulseGrad?: string;
  pulseWidth?: number;
  pulseOpacity?: number;
  pulseDashArray?: string;
  pulseCycleLength?: number;
  pulseSpeed?: number;
  pulsePhaseOffset?: number;
}

export interface PointerInfluenceInput {
  /** Normalized pointer X in [-1, 1], where 0 is viewport center */
  normX: number;
  /** Normalized pointer Y in [-1, 1], where 0 is viewport center */
  normY: number;
  /** Whether pointer interaction is currently active */
  active: boolean;
}

export interface AnimatedStringControlPoints {
  x0: number;
  y0: number;
  cx1: number;
  cy1: number;
  cx2: number;
  cy2: number;
  x3: number;
  y3: number;
}

const TAPERED_PULSE_DASH = '190 1470';

export const HERO_STRING_CONFIGS: readonly HeroStringConfig[] = [
  {
    id: 'string-01',
    x0: -120,
    y0: 980,
    cx1: 280,
    cy1: 920,
    cx2: 620,
    cy2: 680,
    x3: 1560,
    y3: 80,
    width: 1.15,
    opacity: 0.42,
    grad: 'url(#ingo-light-blue)',
    amplitudeY: 44,
    amplitudeX: 24,
    frequency: 1.15,
    secondaryFrequency: 2.25,
    phase: 0.0,
    hasPulse: true,
    pulseGrad: 'url(#ingo-pulse-blue)',
    pulseWidth: 2.2,
    pulseOpacity: 0.72,
    pulseDashArray: TAPERED_PULSE_DASH,
    pulseCycleLength: 1660,
    pulseSpeed: 310,
    pulsePhaseOffset: 0,
  },
  {
    id: 'string-02',
    x0: -100,
    y0: 940,
    cx1: 310,
    cy1: 860,
    cx2: 660,
    cy2: 630,
    x3: 1580,
    y3: 120,
    width: 0.85,
    opacity: 0.30,
    grad: 'url(#ingo-light-violet)',
    amplitudeY: 38,
    amplitudeX: 20,
    frequency: 0.98,
    secondaryFrequency: 1.92,
    phase: 0.45,
    hasPulse: false,
  },
  {
    id: 'string-03',
    x0: -80,
    y0: 900,
    cx1: 340,
    cy1: 800,
    cx2: 700,
    cy2: 580,
    x3: 1600,
    y3: 160,
    width: 1.35,
    opacity: 0.48,
    grad: 'url(#ingo-light-blue)',
    amplitudeY: 52,
    amplitudeX: 28,
    frequency: 1.26,
    secondaryFrequency: 2.42,
    phase: 0.9,
    hasPulse: true,
    pulseGrad: 'url(#ingo-pulse-emerald)',
    pulseWidth: 2.5,
    pulseOpacity: 0.78,
    pulseDashArray: TAPERED_PULSE_DASH,
    pulseCycleLength: 1660,
    pulseSpeed: 360,
    pulsePhaseOffset: 420,
  },
  {
    id: 'string-04',
    x0: -60,
    y0: 860,
    cx1: 380,
    cy1: 740,
    cx2: 740,
    cy2: 530,
    x3: 1620,
    y3: 200,
    width: 0.9,
    opacity: 0.32,
    grad: 'url(#ingo-light-slate)',
    amplitudeY: 36,
    amplitudeX: 19,
    frequency: 0.92,
    secondaryFrequency: 1.78,
    phase: 1.35,
    hasPulse: false,
  },
  {
    id: 'string-05',
    x0: -40,
    y0: 820,
    cx1: 420,
    cy1: 690,
    cx2: 790,
    cy2: 480,
    x3: 1640,
    y3: 240,
    width: 1.05,
    opacity: 0.38,
    grad: 'url(#ingo-light-violet)',
    amplitudeY: 46,
    amplitudeX: 25,
    frequency: 1.18,
    secondaryFrequency: 2.15,
    phase: 1.8,
    hasPulse: true,
    pulseGrad: 'url(#ingo-pulse-violet)',
    pulseWidth: 2.1,
    pulseOpacity: 0.70,
    pulseDashArray: TAPERED_PULSE_DASH,
    pulseCycleLength: 1660,
    pulseSpeed: 285,
    pulsePhaseOffset: 860,
  },
  {
    id: 'string-06',
    x0: -140,
    y0: 1020,
    cx1: 240,
    cy1: 890,
    cx2: 590,
    cy2: 610,
    x3: 1520,
    y3: 30,
    width: 0.85,
    opacity: 0.28,
    grad: 'url(#ingo-light-slate)',
    amplitudeY: 40,
    amplitudeX: 22,
    frequency: 1.04,
    secondaryFrequency: 1.98,
    phase: 2.25,
    hasPulse: false,
  },
  {
    id: 'string-07',
    x0: 40,
    y0: 1040,
    cx1: 460,
    cy1: 870,
    cx2: 840,
    cy2: 590,
    x3: 1660,
    y3: 110,
    width: 1.25,
    opacity: 0.44,
    grad: 'url(#ingo-light-blue)',
    amplitudeY: 48,
    amplitudeX: 26,
    frequency: 1.32,
    secondaryFrequency: 2.48,
    phase: 2.7,
    hasPulse: true,
    pulseGrad: 'url(#ingo-pulse-blue)',
    pulseWidth: 2.3,
    pulseOpacity: 0.75,
    pulseDashArray: TAPERED_PULSE_DASH,
    pulseCycleLength: 1660,
    pulseSpeed: 340,
    pulsePhaseOffset: 1180,
  },
  {
    id: 'string-08',
    x0: 110,
    y0: 1050,
    cx1: 520,
    cy1: 850,
    cx2: 890,
    cy2: 560,
    x3: 1680,
    y3: 170,
    width: 0.8,
    opacity: 0.30,
    grad: 'url(#ingo-light-violet)',
    amplitudeY: 38,
    amplitudeX: 21,
    frequency: 0.96,
    secondaryFrequency: 1.88,
    phase: 3.15,
    hasPulse: false,
  },
  {
    id: 'string-09',
    x0: 180,
    y0: 1060,
    cx1: 580,
    cy1: 830,
    cx2: 940,
    cy2: 520,
    x3: 1700,
    y3: 220,
    width: 0.95,
    opacity: 0.35,
    grad: 'url(#ingo-light-slate)',
    amplitudeY: 44,
    amplitudeX: 24,
    frequency: 1.14,
    secondaryFrequency: 2.22,
    phase: 3.6,
    hasPulse: true,
    pulseGrad: 'url(#ingo-pulse-emerald)',
    pulseWidth: 2.0,
    pulseOpacity: 0.68,
    pulseDashArray: TAPERED_PULSE_DASH,
    pulseCycleLength: 1660,
    pulseSpeed: 295,
    pulsePhaseOffset: 260,
  },
  {
    id: 'string-10',
    x0: 260,
    y0: 1070,
    cx1: 640,
    cy1: 810,
    cx2: 990,
    cy2: 490,
    x3: 1720,
    y3: 270,
    width: 0.85,
    opacity: 0.28,
    grad: 'url(#ingo-light-blue)',
    amplitudeY: 36,
    amplitudeX: 19,
    frequency: 0.94,
    secondaryFrequency: 1.82,
    phase: 4.05,
    hasPulse: false,
  },
  {
    id: 'string-11',
    x0: -180,
    y0: 760,
    cx1: 260,
    cy1: 660,
    cx2: 680,
    cy2: 430,
    x3: 1500,
    y3: -40,
    width: 1.05,
    opacity: 0.35,
    grad: 'url(#ingo-light-violet)',
    amplitudeY: 46,
    amplitudeX: 25,
    frequency: 1.22,
    secondaryFrequency: 2.34,
    phase: 4.5,
    hasPulse: true,
    pulseGrad: 'url(#ingo-pulse-violet)',
    pulseWidth: 2.15,
    pulseOpacity: 0.72,
    pulseDashArray: TAPERED_PULSE_DASH,
    pulseCycleLength: 1660,
    pulseSpeed: 325,
    pulsePhaseOffset: 690,
  },
  {
    id: 'string-12',
    x0: -160,
    y0: 700,
    cx1: 300,
    cy1: 600,
    cx2: 730,
    cy2: 380,
    x3: 1540,
    y3: -10,
    width: 0.75,
    opacity: 0.25,
    grad: 'url(#ingo-light-slate)',
    amplitudeY: 34,
    amplitudeX: 18,
    frequency: 0.88,
    secondaryFrequency: 1.72,
    phase: 4.95,
    hasPulse: false,
  },
  {
    id: 'string-13',
    x0: 340,
    y0: 1080,
    cx1: 720,
    cy1: 790,
    cx2: 1050,
    cy2: 470,
    x3: 1740,
    y3: 310,
    width: 1.15,
    opacity: 0.38,
    grad: 'url(#ingo-light-blue)',
    amplitudeY: 42,
    amplitudeX: 23,
    frequency: 1.08,
    secondaryFrequency: 2.12,
    phase: 5.4,
    hasPulse: true,
    pulseGrad: 'url(#ingo-pulse-blue)',
    pulseWidth: 2.15,
    pulseOpacity: 0.72,
    pulseDashArray: TAPERED_PULSE_DASH,
    pulseCycleLength: 1660,
    pulseSpeed: 305,
    pulsePhaseOffset: 1020,
  },
  {
    id: 'string-14',
    x0: 420,
    y0: 1090,
    cx1: 790,
    cy1: 770,
    cx2: 1110,
    cy2: 450,
    x3: 1760,
    y3: 350,
    width: 0.8,
    opacity: 0.28,
    grad: 'url(#ingo-light-violet)',
    amplitudeY: 35,
    amplitudeX: 19,
    frequency: 0.98,
    secondaryFrequency: 1.88,
    phase: 5.85,
    hasPulse: false,
  },
  {
    id: 'string-15',
    x0: -90,
    y0: 880,
    cx1: 360,
    cy1: 760,
    cx2: 780,
    cy2: 510,
    x3: 1590,
    y3: 95,
    width: 1.5,
    opacity: 0.54,
    grad: 'url(#ingo-light-accent)',
    amplitudeY: 56,
    amplitudeX: 30,
    frequency: 1.35,
    secondaryFrequency: 2.58,
    phase: 1.15,
    hasPulse: true,
    pulseGrad: 'url(#ingo-pulse-emerald)',
    pulseWidth: 2.7,
    pulseOpacity: 0.82,
    pulseDashArray: TAPERED_PULSE_DASH,
    pulseCycleLength: 1660,
    pulseSpeed: 390,
    pulsePhaseOffset: 140,
  },
  {
    id: 'string-16',
    x0: 10,
    y0: 990,
    cx1: 450,
    cy1: 820,
    cx2: 860,
    cy2: 540,
    x3: 1630,
    y3: 140,
    width: 0.9,
    opacity: 0.32,
    grad: 'url(#ingo-light-slate)',
    amplitudeY: 40,
    amplitudeX: 22,
    frequency: 1.04,
    secondaryFrequency: 1.96,
    phase: 2.95,
    hasPulse: false,
  },
];

function clampNormalized(val: number): number {
  if (!Number.isFinite(val)) return 0;
  return Math.max(-1, Math.min(1, val));
}

function roundCoord(val: number): number {
  return Math.round(val * 100) / 100;
}

/**
 * Computes subtle pointer-reactive deflection for a given string's control points
 * so the string bundle gently bends and ripples as the cursor moves across the hero.
 */
export function computePointerStringInfluence(
  stroke: HeroStringConfig,
  pointer?: PointerInfluenceInput
): { dCx1: number; dCy1: number; dCx2: number; dCy2: number } {
  if (!pointer || !pointer.active) {
    return { dCx1: 0, dCy1: 0, dCx2: 0, dCy2: 0 };
  }

  const nx = clampNormalized(pointer.normX);
  const ny = clampNormalized(pointer.normY);

  const phaseFactor = Math.cos(stroke.phase * 0.5);
  const maxDeflectY = stroke.amplitudeY * 0.85;
  const maxDeflectX = stroke.amplitudeX * 0.85;

  const dCx1 = roundCoord(nx * maxDeflectX * (0.75 + 0.25 * phaseFactor));
  const dCy1 = roundCoord(ny * maxDeflectY * (0.85 + 0.15 * phaseFactor));
  const dCx2 = roundCoord(-nx * maxDeflectX * (0.65 - 0.2 * phaseFactor));
  const dCy2 = roundCoord(ny * maxDeflectY * (0.65 + 0.25 * Math.sin(stroke.phase)));

  return { dCx1, dCy1, dCx2, dCy2 };
}

/**
 * Computes the animated cubic Bezier control points for a hero background string
 * at `timeSec`, combining multi-harmonic sine wave undulation with pointer deflection.
 */
export function computeAnimatedStringPoints(
  stroke: HeroStringConfig,
  timeSec: number,
  pointer?: PointerInfluenceInput
): AnimatedStringControlPoints {
  const t = Number.isFinite(timeSec) ? timeSec : 0;

  const primaryWave1 = Math.sin(t * stroke.frequency + stroke.phase);
  const secondaryWave1 = Math.cos(
    t * stroke.secondaryFrequency + stroke.phase * 1.35
  );

  const primaryWave2 = Math.cos(
    t * (stroke.frequency * 0.92) + stroke.phase + 1.05
  );
  const secondaryWave2 = Math.sin(
    t * (stroke.secondaryFrequency * 0.88) + stroke.phase * 0.8
  );

  const waveCx1 =
    (primaryWave1 * 0.72 + secondaryWave1 * 0.28) * stroke.amplitudeX;
  const waveCy1 =
    (primaryWave1 * 0.78 - secondaryWave1 * 0.22) * stroke.amplitudeY;

  const waveCx2 =
    (primaryWave2 * 0.68 - secondaryWave2 * 0.32) * (stroke.amplitudeX * 1.12);
  const waveCy2 =
    (primaryWave2 * 0.75 + secondaryWave2 * 0.25) * (stroke.amplitudeY * 1.15);

  const pointerOffset = computePointerStringInfluence(stroke, pointer);

  return {
    x0: stroke.x0,
    y0: stroke.y0,
    cx1: roundCoord(stroke.cx1 + waveCx1 + pointerOffset.dCx1),
    cy1: roundCoord(stroke.cy1 + waveCy1 + pointerOffset.dCy1),
    cx2: roundCoord(stroke.cx2 + waveCx2 + pointerOffset.dCx2),
    cy2: roundCoord(stroke.cy2 + waveCy2 + pointerOffset.dCy2),
    x3: stroke.x3,
    y3: stroke.y3,
  };
}

/**
 * Computes an intertwined counter-harmonic companion silk ribbon path for key strings
 * to create a dimensional 3D wave interference pattern.
 */
export function computeCompanionStringPath(
  stroke: HeroStringConfig,
  timeSec: number,
  pointer?: PointerInfluenceInput
): string {
  const t = Number.isFinite(timeSec) ? timeSec : 0;
  const base = computeAnimatedStringPoints(stroke, t + 0.85, pointer);
  const counterOffset1 = Math.cos(t * stroke.frequency * 1.15 - stroke.phase) * 18;
  const counterOffset2 = Math.sin(t * stroke.secondaryFrequency * 0.9 + stroke.phase) * 22;

  return buildCubicBezierPath({
    x0: base.x0,
    y0: roundCoord(base.y0 - 8),
    cx1: roundCoord(base.cx1 - counterOffset1 * 0.6),
    cy1: roundCoord(base.cy1 + counterOffset1),
    cx2: roundCoord(base.cx2 + counterOffset2 * 0.6),
    cy2: roundCoord(base.cy2 - counterOffset2),
    x3: base.x3,
    y3: roundCoord(base.y3 + 8),
  });
}

/**
 * Computes dynamic breathing stroke opacity so each string shimmers organically.
 */
export function computeAnimatedStringOpacity(
  stroke: HeroStringConfig,
  timeSec: number
): number {
  const t = Number.isFinite(timeSec) ? timeSec : 0;
  const wave = Math.sin(t * stroke.frequency * 0.85 + stroke.phase);
  const modulated = stroke.opacity * (0.86 + 0.24 * wave);
  return roundCoord(Math.max(0.12, Math.min(0.95, modulated)));
}

/**
 * Formats cubic Bezier control points into a valid SVG `d` path string.
 */
export function buildCubicBezierPath(
  points: AnimatedStringControlPoints
): string {
  return `M ${points.x0} ${points.y0} C ${points.cx1} ${points.cy1}, ${points.cx2} ${points.cy2}, ${points.x3} ${points.y3}`;
}

/**
 * Computes the animated SVG `d` attribute string for a hero background string at `timeSec`.
 */
export function computeAnimatedStringPath(
  stroke: HeroStringConfig,
  timeSec: number,
  pointer?: PointerInfluenceInput
): string {
  const points = computeAnimatedStringPoints(stroke, timeSec, pointer);
  return buildCubicBezierPath(points);
}

/**
 * Computes the traveling pulse `strokeDashoffset` for a string at `timeSec`.
 * Decreasing negative dashoffset propels the luminous pulse forward from `(x0, y0)`
 * at the bottom-left toward `(x3, y3)` at the top-right.
 */
export function computeStringPulseDashOffset(
  stroke: HeroStringConfig,
  timeSec: number
): number {
  if (!stroke.hasPulse) return 0;
  const t = Number.isFinite(timeSec) && timeSec >= 0 ? timeSec : 0;
  const cycle = stroke.pulseCycleLength ?? 1660;
  const speed = stroke.pulseSpeed ?? 320;
  const phaseOffset = stroke.pulsePhaseOffset ?? 0;

  const rawTravel = (t * speed + phaseOffset) % cycle;
  return -roundCoord(rawTravel);
}

/**
 * Determines whether the hero background string RAF loop should actively run.
 */
export function shouldAnimateHeroStrings(params: {
  isVisible: boolean;
  isDocumentHidden: boolean;
  prefersReducedMotion: boolean;
}): boolean {
  const { isVisible, isDocumentHidden, prefersReducedMotion } = params;
  return Boolean(isVisible && !isDocumentHidden && !prefersReducedMotion);
}
