/**
 * Pure rendering & frame-budget optimization utilities for INGO Studio.
 * Keeps main-thread work, DOM node count, and media decoding overhead minimal.
 */

export interface RectBounds {
  left: number;
  top: number;
  width: number;
  height: number;
}

export interface MagnetOffsetResult {
  active: boolean;
  x: number;
  y: number;
}

/**
 * Computes scroll-reveal range [start, end] for a word at `wordIndex` out of `totalWords`.
 * Word-level batching reduces Framer Motion `useTransform` hooks and DOM nodes by ~85%
 * compared to per-character splitting while preserving smooth editorial reveal.
 */
export function computeWordRevealRange(
  wordIndex: number,
  totalWords: number
): [number, number] {
  const safeTotal = Math.max(1, totalWords);
  const clampedIndex = Math.max(0, Math.min(safeTotal - 1, wordIndex));
  const step = 1 / safeTotal;
  const start = Number((clampedIndex * step * 0.82).toFixed(4));
  const end = Number(Math.min(1, start + Math.max(step * 1.8, 0.18)).toFixed(4));
  return [start, Math.max(start + 0.01, end)];
}

/**
 * Determines whether the Reelmark 60fps RAF carousel loop should actively tick.
 * Pauses off-screen or background-tab RAF work to free main-thread & GPU budget.
 */
export function shouldRunContinuousLoop(params: {
  isIntersecting: boolean;
  isDocumentHidden: boolean;
  prefersReducedMotion: boolean;
  isDragging: boolean;
  velocityU: number;
}): boolean {
  const {
    isIntersecting,
    isDocumentHidden,
    prefersReducedMotion,
    isDragging,
    velocityU,
  } = params;

  if (isDocumentHidden || !isIntersecting) {
    return false;
  }

  if (isDragging) {
    return true;
  }

  if (Math.abs(velocityU) > 0.5) {
    return true;
  }

  return !prefersReducedMotion;
}

/**
 * Pure calculation for magnetic button attraction offset.
 */
export function computeMagnetOffset(
  clientX: number,
  clientY: number,
  rect: RectBounds,
  padding = 60,
  strength = 2.6
): MagnetOffsetResult {
  const safeStrength = strength > 0 ? strength : 2.6;
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  const distX = Math.abs(centerX - clientX);
  const distY = Math.abs(centerY - clientY);

  if (distX < rect.width / 2 + padding && distY < rect.height / 2 + padding) {
    return {
      active: true,
      x: Number(((clientX - centerX) / safeStrength).toFixed(2)),
      y: Number(((clientY - centerY) / safeStrength).toFixed(2)),
    };
  }

  return { active: false, x: 0, y: 0 };
}

/**
 * Determines optimal `<video preload>` attribute for carousel cards so initial
 * above-the-fold Hero rendering is never starved by 10 concurrent video fetches.
 */
export function getOptimalVideoPreload(
  cardIndex: number,
  isSectionIntersecting: boolean
): 'auto' | 'metadata' | 'none' {
  if (!isSectionIntersecting) {
    return cardIndex === 0 ? 'metadata' : 'none';
  }
  return cardIndex === 0 ? 'auto' : 'metadata';
}

/**
 * Guards state updates when progress deltas are sub-perceptual (< epsilon),
 * except at exact boundary endpoints (0 or 1).
 */
export function hasProgressChangedMeaningfully(
  prevProgress: number,
  nextProgress: number,
  epsilon = 0.0025
): boolean {
  if (nextProgress <= 0 || nextProgress >= 1) {
    return prevProgress !== nextProgress;
  }
  return Math.abs(nextProgress - prevProgress) >= epsilon;
}

/**
 * Determines whether the above-the-fold Hero pill video should actively play.
 * Pausing the video when scrolled out of view frees hardware media decoders
 * for downstream sections (Reelmark 10-card carousel & sticky Work showcase).
 */
export function shouldPlayHeroVideo(params: {
  isHeroIntersecting: boolean;
  isDocumentHidden: boolean;
  prefersReducedMotion: boolean;
  isRecMode: boolean;
}): boolean {
  const {
    isHeroIntersecting,
    isDocumentHidden,
    prefersReducedMotion,
    isRecMode,
  } = params;
  if (isDocumentHidden || !isHeroIntersecting || prefersReducedMotion || isRecMode) {
    return false;
  }
  return true;
}

