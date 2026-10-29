export const REVEAL_DURATION_SEC = 2.1;
export const REC_REVERSE_START_SEC = 4.9;
export const REC_CYCLE_DURATION_SEC = 8.4;
export const DEFAULT_VIDEO_DURATION_SEC = 6.0;

/**
 * Evaluates a cubic-bezier(x1, y1, x2, y2) curve at progress x in [0, 1].
 * Uses Newton-Raphson with binary subdivision fallback for deterministic accuracy.
 */
export function cubicBezier(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  x: number
): number {
  if (x <= 0) return 0;
  if (x >= 1) return 1;
  if (x1 === y1 && x2 === y2) return x;

  const sampleCurveX = (t: number) =>
    (((1 - 3 * x2 + 3 * x1) * t + (3 * x2 - 6 * x1)) * t + 3 * x1) * t;
  const sampleCurveY = (t: number) =>
    (((1 - 3 * y2 + 3 * y1) * t + (3 * y2 - 6 * y1)) * t + 3 * y1) * t;
  const sampleCurveDerivativeX = (t: number) =>
    (3 * (1 - 3 * x2 + 3 * x1) * t + 2 * (3 * x2 - 6 * x1)) * t + 3 * x1;

  let t2 = x;
  for (let i = 0; i < 8; i++) {
    const xEst = sampleCurveX(t2) - x;
    if (Math.abs(xEst) < 1e-6) {
      return sampleCurveY(t2);
    }
    const d2 = sampleCurveDerivativeX(t2);
    if (Math.abs(d2) < 1e-6) break;
    t2 = t2 - xEst / d2;
  }

  let t0 = 0;
  let t1 = 1;
  t2 = x;
  while (t0 < t1) {
    const xEst = sampleCurveX(t2);
    if (Math.abs(xEst - x) < 1e-6) {
      return sampleCurveY(t2);
    }
    if (x > xEst) {
      t0 = t2;
    } else {
      t1 = t2;
    }
    t2 = (t1 - t0) * 0.5 + t0;
  }

  return sampleCurveY(t2);
}

export function clamp01(val: number): number {
  return Math.max(0, Math.min(1, val));
}

export function segmentProgress(u: number, start: number, end: number): number {
  if (u <= start) return 0;
  if (u >= end) return 1;
  return (u - start) / (end - start);
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

// Reference custom easing curves from specification:
export const easeStage1 = (t: number) => cubicBezier(0.5, 0, 0.3, 1, t);
export const easeStage2 = (t: number) => cubicBezier(0.45, 0, 0.3, 1, t);
export const easeStage3 = (t: number) => cubicBezier(0.4, 0, 0.2, 1, t);
export const easeSmooth = (t: number) => cubicBezier(0.22, 1, 0.36, 1, t);

export interface HeroTimelineFrame {
  /** Normalized progress in [0, 1] */
  progress: number;
  /** Desktop pill width in units of `--fs` (em): 0.012 -> 0.12 -> 1.12 -> 2.24 */
  desktopPillWidthEm: number;
  /** Desktop pill height in units of `--fs` (em): constant 1.12 */
  desktopPillHeightEm: number;
  /** Desktop vertical inset percentage [50 -> 0] for `inset(X% 0)` */
  desktopClipInsetYPercent: number;
  /** Mobile horizontal inset percentage [50 -> 0] for `inset(0 X%)` */
  mobileClipInsetXPercent: number;
  /** Compact mobile pill width in pixels */
  mobilePillWidthPx: number;
  /** Mobile pill height in pixels given mobilePillWidthPx */
  mobilePillHeightPx: number;
  /** Mobile final pill height in pixels (mobilePillWidthPx / 2.25) */
  mobileFinalHeightPx: number;
  /** Grey hairline overlay opacity inside the pill: 1 until 14%, fades out 14%..30% */
  hairlineOverlayOpacity: number;
  /** Desktop wordmark gap in em: 0.026 -> 0.05 (at 58%) -> 0.085 (at 100%) */
  desktopWordmarkGapEm: number;
  /** Mobile vertical wordmark gap in em: 0.03 -> 0.10 */
  mobileWordmarkGapEm: number;
  /** Dark background and flowing SVG lines opacity: fades in 45%..78% */
  backgroundOpacity: number;
  /** Wordmark color interpolation [0 = dark #08090D on white, 1 = light #F5F5F7 on dark] */
  wordmarkLightMix: number;
  /** Top navigation translateY percentage: -140% -> 0% between 50% and 86% */
  navTranslateYPercent: number;
  /** Navigation opacity: 0 -> 1 between 50% and 86% */
  navOpacity: number;
  /** Footer translateY percentage: 160% -> 0% between 52% and 90% */
  footerTranslateYPercent: number;
  /** Footer opacity: 0 -> 1 between 52% and 90% */
  footerOpacity: number;
  /** Footer divider scaleX: 0 -> 1 between 40% and 95% */
  dividerScaleX: number;
  /** Pill internal icons opacity: 0 -> 0.85 between 80% and 100% */
  pillIconsOpacity: number;
  /** Centered AGENCY subheading opacity synchronized with pill expansion: 0 -> 1 between 30% and 82% */
  subheadingOpacity: number;
  /** Centered AGENCY subheading vertical offset in em: 0.18 -> 0 between 30% and 86% */
  subheadingTranslateYEm: number;
  /** Centered AGENCY subheading horizontal clip inset percentage: 36 -> 0 between 26% and 88% */
  subheadingClipInsetXPercent: number;
}

/**
 * Computes all synchronized hero animation properties for a normalized reveal progress `u` in [0, 1].
 */
export function computeHeroTimelineFrame(
  rawProgress: number,
  viewportWidth = 1440
): HeroTimelineFrame {
  const u = clamp01(rawProgress);

  // 1. Desktop Pill Width (in `fs` / `em` units, compact proportions):
  // 0%: 0.012fs | 14%: hold 0.012fs | 30%: 0.12fs | 58%: 1.12fs | 100%: 2.24fs
  let desktopPillWidthEm = 0.012;
  if (u <= 0.14) {
    desktopPillWidthEm = 0.012;
  } else if (u <= 0.30) {
    const t = easeStage1(segmentProgress(u, 0.14, 0.30));
    desktopPillWidthEm = lerp(0.012, 0.12, t);
  } else if (u <= 0.58) {
    const t = easeStage2(segmentProgress(u, 0.30, 0.58));
    desktopPillWidthEm = lerp(0.12, 1.12, t);
  } else {
    const t = easeStage3(segmentProgress(u, 0.58, 1.0));
    desktopPillWidthEm = lerp(1.12, 2.24, t);
  }

  // 2. Pill Clipping (0% -> 14% opening phase):
  // Desktop: inset(50% 0) -> inset(0% 0)
  // Mobile: inset(0 50%) -> inset(0 0%)
  const clipOpenT = easeSmooth(segmentProgress(u, 0, 0.14));
  const desktopClipInsetYPercent = lerp(50, 0, clipOpenT);
  const mobileClipInsetXPercent = lerp(50, 0, clipOpenT);

  // 3. Mobile Pill Width & Height (compact scale & balanced proportions for <= 720px portrait view):
  // Width: clamp(132px, round(vw * 0.42), 168px), Final height: width / 2.25
  // 0..14%: 1.5px | 14..30%: 10% | 30..58%: 55% | 58..100%: 100%
  const mobilePillWidthPx = Math.min(
    168,
    Math.max(132, Math.round(viewportWidth * 0.42))
  );
  const mobileFinalHeightPx = mobilePillWidthPx / 2.25;
  let mobilePillHeightPx = 1.5;
  if (u <= 0.14) {
    mobilePillHeightPx = 1.5;
  } else if (u <= 0.30) {
    const t = easeStage1(segmentProgress(u, 0.14, 0.30));
    mobilePillHeightPx = lerp(1.5, mobileFinalHeightPx * 0.1, t);
  } else if (u <= 0.58) {
    const t = easeStage2(segmentProgress(u, 0.30, 0.58));
    mobilePillHeightPx = lerp(
      mobileFinalHeightPx * 0.1,
      mobileFinalHeightPx * 0.55,
      t
    );
  } else {
    const t = easeStage3(segmentProgress(u, 0.58, 1.0));
    mobilePillHeightPx = lerp(mobileFinalHeightPx * 0.55, mobileFinalHeightPx, t);
  }

  // 4. Hairline Overlay:
  // Visible 0%..14%, fades out between 14% and 30%
  const hairlineFadeT = easeStage1(segmentProgress(u, 0.14, 0.30));
  const hairlineOverlayOpacity = lerp(1, 0, hairlineFadeT);

  // 5. Wordmark Spacing:
  // Desktop: 0.026em initial -> 0.05em at 58% -> 0.085em at 100%
  let desktopWordmarkGapEm = 0.026;
  if (u <= 0.14) {
    desktopWordmarkGapEm = 0.026;
  } else if (u <= 0.58) {
    const t = easeStage2(segmentProgress(u, 0.14, 0.58));
    desktopWordmarkGapEm = lerp(0.026, 0.05, t);
  } else {
    const t = easeStage3(segmentProgress(u, 0.58, 1.0));
    desktopWordmarkGapEm = lerp(0.05, 0.085, t);
  }

  // Mobile: 0.03em -> 0.14em for balanced vertical padding around the pill
  let mobileWordmarkGapEm = 0.03;
  if (u > 0.14) {
    const t = easeStage3(segmentProgress(u, 0.14, 1.0));
    mobileWordmarkGapEm = lerp(0.03, 0.14, t);
  }

  // 6. Background and SVG lines fade in between 45% and 78%
  const bgT = easeStage3(segmentProgress(u, 0.45, 0.78));
  const backgroundOpacity = lerp(0, 1, bgT);
  const wordmarkLightMix = easeStage3(segmentProgress(u, 0.45, 0.72));

  // 7. Navigation slides down from translateY(-140%) between 50% and 86%
  const navT = easeSmooth(segmentProgress(u, 0.5, 0.86));
  const navTranslateYPercent = lerp(-140, 0, navT);
  const navOpacity = clamp01(segmentProgress(u, 0.5, 0.75));

  // 8. Footer rises from translateY(160%) between 52% and 90%
  const footerT = easeSmooth(segmentProgress(u, 0.52, 0.9));
  const footerTranslateYPercent = lerp(160, 0, footerT);
  const footerOpacity = clamp01(segmentProgress(u, 0.52, 0.78));

  // 9. Footer divider draws from scaleX(0) to scaleX(1) between 40% and 95%
  const dividerT = easeStage3(segmentProgress(u, 0.4, 0.95));
  const dividerScaleX = lerp(0, 1, dividerT);

  // 10. Hero icons fade in after 80% (to ~85% opacity)
  const iconsT = easeSmooth(segmentProgress(u, 0.8, 1.0));
  const pillIconsOpacity = lerp(0, 0.85, iconsT);

  // 11. Centered AGENCY subheading unfolds in lockstep with the expanding INGO pill (26%..88%)
  const subheadingOpacity = easeStage3(segmentProgress(u, 0.3, 0.82));
  const subheadingTranslateYEm = lerp(
    0.18,
    0,
    easeSmooth(segmentProgress(u, 0.3, 0.86))
  );
  const subheadingClipInsetXPercent = lerp(
    36,
    0,
    easeStage3(segmentProgress(u, 0.26, 0.88))
  );

  return {
    progress: u,
    desktopPillWidthEm,
    desktopPillHeightEm: 1.12,
    desktopClipInsetYPercent,
    mobileClipInsetXPercent,
    mobilePillWidthPx,
    mobilePillHeightPx,
    mobileFinalHeightPx,
    hairlineOverlayOpacity,
    desktopWordmarkGapEm,
    mobileWordmarkGapEm,
    backgroundOpacity,
    wordmarkLightMix,
    navTranslateYPercent,
    navOpacity,
    footerTranslateYPercent,
    footerOpacity,
    dividerScaleX,
    pillIconsOpacity,
    subheadingOpacity,
    subheadingTranslateYEm,
    subheadingClipInsetXPercent,
  };
}

/**
 * Deterministic recording mode (`?rec=1`) progress function:
 * - Starts reveal at t = 0 (reaches 1.0 at t = 2.1s)
 * - Holds revealed state from t = 2.1s to t = 4.9s
 * - Starts reverse collapse at t = 4.9s (reaches 0.0 at t = 7.0s)
 * - Repeats cleanly every REC_CYCLE_DURATION_SEC (8.4s)
 */
export function computeRecordingProgress(timeSec: number): number {
  const rawMod =
    ((timeSec % REC_CYCLE_DURATION_SEC) + REC_CYCLE_DURATION_SEC) %
    REC_CYCLE_DURATION_SEC;
  const t = Math.round(rawMod * 1e6) / 1e6;
  if (t < REVEAL_DURATION_SEC) {
    return clamp01(t / REVEAL_DURATION_SEC);
  }
  if (t <= REC_REVERSE_START_SEC) {
    return 1;
  }
  if (t < REC_REVERSE_START_SEC + REVEAL_DURATION_SEC) {
    return clamp01(1 - (t - REC_REVERSE_START_SEC) / REVEAL_DURATION_SEC);
  }
  return 0;
}

/**
 * Computes the deterministic video seek time required by `window.__recVideo(t)`:
 * Returns `(t % duration) + 1/120` for a known video duration.
 */
export function computeRecVideoSeekTime(
  t: number,
  duration: number = DEFAULT_VIDEO_DURATION_SEC
): number {
  const safeDuration =
    Number.isFinite(duration) && duration > 0
      ? duration
      : DEFAULT_VIDEO_DURATION_SEC;
  const safeT = Number.isFinite(t) && t >= 0 ? t : 0;
  return (safeT % safeDuration) + 1 / 120;
}
