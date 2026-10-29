import test from 'node:test';
import assert from 'node:assert/strict';
import {
  computeReelmarkCardGeometry,
  buildRoundedQuadClipPath,
  computeTileCropMetrics,
  wrapSymmetricOffset,
  REELMARK_TRACK_PERIOD_U,
} from './reelmark-geometry';

test('centre card at t=0 sits at x=720, y=687 with width 170u and symmetric upright edges', () => {
  const g0 = computeReelmarkCardGeometry(0, 0);
  assert.equal(g0.centerXU, 720);
  assert.equal(g0.widthU, 170);
  assert.equal(g0.centerYU, 687);
  assert.ok(Math.abs(g0.leftHeightU - g0.rightHeightU) < 1e-6);
  assert.ok(g0.leftHeightU >= 280 && g0.leftHeightU < 282);
});

test('edge cards grow taller and have outer vertical edge taller than inner edge', () => {
  // Card at +3 * 196 = +588u (right side of frame)
  const gRight = computeReelmarkCardGeometry(3, 0);
  assert.ok(gRight.centerXU > 720 + 588); // pushed outward
  assert.ok(gRight.widthU > 170);
  assert.ok(gRight.rightHeightU > gRight.leftHeightU);
  assert.ok(gRight.rightHeightU > 340);

  // Card at -3 * 196 = -588u (left side of frame, cardIndex = 7 wraps to -3*196)
  const gLeft = computeReelmarkCardGeometry(7, 0);
  assert.ok(gLeft.centerXU < 720 - 588);
  assert.ok(gLeft.leftHeightU > gLeft.rightHeightU);
  assert.ok(gLeft.leftHeightU > 340);
});

test('wrapSymmetricOffset wraps seamlessly across 1960u track period', () => {
  assert.equal(wrapSymmetricOffset(0, REELMARK_TRACK_PERIOD_U), 0);
  assert.equal(
    wrapSymmetricOffset(REELMARK_TRACK_PERIOD_U, REELMARK_TRACK_PERIOD_U),
    0
  );
  assert.equal(wrapSymmetricOffset(1000, REELMARK_TRACK_PERIOD_U), -960);
});

test('buildRoundedQuadClipPath outputs a valid closed SVG path with quadratic corners', () => {
  const g = computeReelmarkCardGeometry(2, 0);
  const path = buildRoundedQuadClipPath(g, 1.0, 15);
  assert.ok(path.startsWith('M '));
  assert.ok(path.endsWith(' Z'));
  assert.equal((path.match(/Q /g) || []).length, 4);
});

test('computeTileCropMetrics sizes 5x2 grid and offsets each tile accurately', () => {
  const m0 = computeTileCropMetrics(0, 170, 280);
  assert.ok(Math.abs(m0.tileHeightU - 280) < 1e-5);
  assert.ok(Math.abs(m0.tileWidthU - 280 * 0.7111) < 1e-3);
  assert.ok(Math.abs(m0.gridWidthU - 5 * m0.tileWidthU) < 1e-5);
  assert.ok(Math.abs(m0.gridHeightU - 2 * m0.tileHeightU) < 1e-5);

  const m6 = computeTileCropMetrics(6, 170, 280); // col=1, row=1
  assert.ok(m6.offsetLeftU < m0.offsetLeftU);
  assert.ok(m6.offsetTopU < m0.offsetTopU);
});
