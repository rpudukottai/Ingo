import test from 'node:test';
import assert from 'node:assert/strict';
import {
  computeHeroTimelineFrame,
  computeRecordingProgress,
  computeRecVideoSeekTime,
  REVEAL_DURATION_SEC,
  REC_REVERSE_START_SEC,
} from './hero-timeline';

test('desktop pill width matches keyframe specification (0%, 14%, 30%, 58%, 100%)', () => {
  const f0 = computeHeroTimelineFrame(0);
  const f14 = computeHeroTimelineFrame(0.14);
  const f30 = computeHeroTimelineFrame(0.30);
  const f58 = computeHeroTimelineFrame(0.58);
  const f100 = computeHeroTimelineFrame(1.0);

  assert.ok(Math.abs(f0.desktopPillWidthEm - 0.012) < 1e-6);
  assert.ok(Math.abs(f14.desktopPillWidthEm - 0.012) < 1e-6);
  assert.ok(Math.abs(f30.desktopPillWidthEm - 0.12) < 1e-5);
  assert.ok(Math.abs(f58.desktopPillWidthEm - 1.12) < 1e-5);
  assert.ok(Math.abs(f100.desktopPillWidthEm - 2.24) < 1e-5);
  assert.equal(f100.desktopPillHeightEm, 1.12);
});

test('pill clipping expands from inset(50% 0) to inset(0) during opening phase', () => {
  const f0 = computeHeroTimelineFrame(0);
  const f14 = computeHeroTimelineFrame(0.14);

  assert.equal(f0.desktopClipInsetYPercent, 50);
  assert.equal(f0.mobileClipInsetXPercent, 50);
  assert.ok(f14.desktopClipInsetYPercent < 1e-5);
  assert.ok(f14.mobileClipInsetXPercent < 1e-5);
});

test('hairline overlay remains visible until 14% and fades out by 30%', () => {
  const f0 = computeHeroTimelineFrame(0);
  const f14 = computeHeroTimelineFrame(0.14);
  const f22 = computeHeroTimelineFrame(0.22);
  const f30 = computeHeroTimelineFrame(0.30);

  assert.equal(f0.hairlineOverlayOpacity, 1);
  assert.equal(f14.hairlineOverlayOpacity, 1);
  assert.ok(f22.hairlineOverlayOpacity > 0 && f22.hairlineOverlayOpacity < 1);
  assert.ok(f30.hairlineOverlayOpacity < 1e-5);
});

test('wordmark spacing coordinates with expanding pill on desktop and mobile', () => {
  const f0 = computeHeroTimelineFrame(0);
  const f58 = computeHeroTimelineFrame(0.58);
  const f100 = computeHeroTimelineFrame(1.0);

  assert.ok(Math.abs(f0.desktopWordmarkGapEm - 0.026) < 1e-6);
  assert.ok(Math.abs(f58.desktopWordmarkGapEm - 0.05) < 1e-5);
  assert.ok(Math.abs(f100.desktopWordmarkGapEm - 0.085) < 1e-5);

  assert.ok(Math.abs(f0.mobileWordmarkGapEm - 0.03) < 1e-6);
  assert.ok(Math.abs(f100.mobileWordmarkGapEm - 0.14) < 1e-5);
});

test('background, navigation, footer, divider, and icons follow exact phase windows', () => {
  const f40 = computeHeroTimelineFrame(0.40);
  const f45 = computeHeroTimelineFrame(0.45);
  const f50 = computeHeroTimelineFrame(0.50);
  const f52 = computeHeroTimelineFrame(0.52);
  const f78 = computeHeroTimelineFrame(0.78);
  const f80 = computeHeroTimelineFrame(0.80);
  const f86 = computeHeroTimelineFrame(0.86);
  const f90 = computeHeroTimelineFrame(0.90);
  const f95 = computeHeroTimelineFrame(0.95);
  const f100 = computeHeroTimelineFrame(1.0);

  assert.equal(f45.backgroundOpacity, 0);
  assert.ok(Math.abs(f78.backgroundOpacity - 1) < 1e-5);

  assert.equal(f50.navTranslateYPercent, -140);
  assert.ok(Math.abs(f86.navTranslateYPercent - 0) < 1e-4);

  assert.equal(f52.footerTranslateYPercent, 160);
  assert.ok(Math.abs(f90.footerTranslateYPercent - 0) < 1e-4);

  assert.equal(f40.dividerScaleX, 0);
  assert.ok(Math.abs(f95.dividerScaleX - 1) < 1e-5);

  assert.equal(f80.pillIconsOpacity, 0);
  assert.ok(Math.abs(f100.pillIconsOpacity - 0.85) < 1e-5);
});

test('mobile pill height follows 1.5px -> 10% -> 55% -> 100% of compact width / 2.25', () => {
  const vw = 390;
  const expectedW = Math.min(168, Math.max(132, Math.round(vw * 0.42)));
  const expectedFinalH = expectedW / 2.25;
  const f0 = computeHeroTimelineFrame(0, vw);
  const f30 = computeHeroTimelineFrame(0.30, vw);
  const f58 = computeHeroTimelineFrame(0.58, vw);
  const f100 = computeHeroTimelineFrame(1.0, vw);

  assert.equal(f100.mobilePillWidthPx, expectedW);
  assert.equal(f0.mobilePillHeightPx, 1.5);
  assert.ok(Math.abs(f30.mobilePillHeightPx - expectedFinalH * 0.1) < 1e-3);
  assert.ok(Math.abs(f58.mobilePillHeightPx - expectedFinalH * 0.55) < 1e-3);
  assert.ok(Math.abs(f100.mobilePillHeightPx - expectedFinalH) < 1e-3);
});

test('recording mode (?rec=1) starts reveal at t=0 and reverse collapse at t=4.9s', () => {
  assert.equal(computeRecordingProgress(0), 0);
  assert.ok(Math.abs(computeRecordingProgress(REVEAL_DURATION_SEC / 2) - 0.5) < 1e-6);
  assert.equal(computeRecordingProgress(REVEAL_DURATION_SEC), 1);
  assert.equal(computeRecordingProgress(REC_REVERSE_START_SEC), 1);
  assert.ok(
    Math.abs(
      computeRecordingProgress(REC_REVERSE_START_SEC + REVEAL_DURATION_SEC / 2) - 0.5
    ) < 1e-6
  );
  assert.ok(
    computeRecordingProgress(REC_REVERSE_START_SEC + REVEAL_DURATION_SEC) < 1e-6
  );
});

test('computeRecVideoSeekTime returns (t % duration) + 1/120', () => {
  const duration = 6.0;
  const seek0 = computeRecVideoSeekTime(0, duration);
  const seek7_5 = computeRecVideoSeekTime(7.5, duration);

  assert.ok(Math.abs(seek0 - 1 / 120) < 1e-9);
  assert.ok(Math.abs(seek7_5 - (1.5 + 1 / 120)) < 1e-9);
});

test('centered AGENCY subheading unfolds in lockstep with the expanding INGO pill', () => {
  const f0 = computeHeroTimelineFrame(0);
  const f30 = computeHeroTimelineFrame(0.3);
  const f58 = computeHeroTimelineFrame(0.58);
  const f100 = computeHeroTimelineFrame(1.0);

  assert.equal(f0.subheadingOpacity, 0);
  assert.equal(f30.subheadingOpacity, 0);
  assert.ok(f58.subheadingOpacity > 0 && f58.subheadingOpacity < 1);
  assert.equal(f100.subheadingOpacity, 1);

  assert.ok(Math.abs(f0.subheadingTranslateYEm - 0.18) < 1e-6);
  assert.equal(f100.subheadingTranslateYEm, 0);

  assert.equal(f0.subheadingClipInsetXPercent, 36);
  assert.ok(
    f58.subheadingClipInsetXPercent > 0 && f58.subheadingClipInsetXPercent < 36
  );
  assert.equal(f100.subheadingClipInsetXPercent, 0);
});

