import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  HERO_STRING_CONFIGS,
  computeAnimatedStringPoints,
  computeAnimatedStringPath,
  computeAnimatedStringOpacity,
  computeCompanionStringPath,
  computePointerStringInfluence,
  computeStringPulseDashOffset,
  shouldAnimateHeroStrings,
} from './flowing-lines';

describe('flowing-lines kinetic string math', () => {
  it('defines 16 sweeping hero strings with valid widths, opacities, and pulse configs', () => {
    assert.equal(HERO_STRING_CONFIGS.length, 16);
    const pulseStrings = HERO_STRING_CONFIGS.filter((s) => s.hasPulse);
    assert.ok(
      pulseStrings.length >= 6,
      'Expected at least 6 strings to carry traveling luminous pulses'
    );

    for (const stroke of HERO_STRING_CONFIGS) {
      assert.ok(stroke.width > 0);
      assert.ok(stroke.opacity > 0 && stroke.opacity <= 1);
      assert.ok(stroke.amplitudeY > 0);
      assert.ok(stroke.frequency > 0);
      assert.ok(stroke.x3 > stroke.x0, 'Strings should sweep left-to-right');
      assert.ok(stroke.y3 < stroke.y0, 'Strings should sweep upward');
    }
  });

  it('produces valid SVG cubic Bezier path strings that undulate smoothly over time', () => {
    const sample = HERO_STRING_CONFIGS[0]!;
    const pathAt0 = computeAnimatedStringPath(sample, 0);
    const pathAt1_2 = computeAnimatedStringPath(sample, 1.2);

    assert.match(
      pathAt0,
      /^M -?\d+(\.\d+)? -?\d+(\.\d+)? C -?\d+(\.\d+)? -?\d+(\.\d+)?, -?\d+(\.\d+)? -?\d+(\.\d+)?, -?\d+(\.\d+)? -?\d+(\.\d+)?$/
    );
    assert.notEqual(
      pathAt0,
      pathAt1_2,
      'Animated string path must evolve dynamically over time'
    );

    const pts0 = computeAnimatedStringPoints(sample, 0);
    const pts1 = computeAnimatedStringPoints(sample, 1.2);
    assert.equal(pts0.x0, sample.x0);
    assert.equal(pts0.y0, sample.y0);
    assert.equal(pts1.x3, sample.x3);
    assert.equal(pts1.y3, sample.y3);
    assert.notEqual(pts0.cy1, pts1.cy1);
  });

  it('produces distinct counter-harmonic companion paths and modulated opacity shimmer', () => {
    const sample = HERO_STRING_CONFIGS[0]!;
    const primary = computeAnimatedStringPath(sample, 0.5);
    const companion = computeCompanionStringPath(sample, 0.5);
    assert.notEqual(primary, companion);

    const op0 = computeAnimatedStringOpacity(sample, 0);
    const op1 = computeAnimatedStringOpacity(sample, 0.8);
    assert.notEqual(op0, op1);
    assert.ok(op0 >= 0.12 && op0 <= 0.95);
    assert.ok(op1 >= 0.12 && op1 <= 0.95);
  });

  it('applies pointer resonance deflection only when pointer is active', () => {
    const sample = HERO_STRING_CONFIGS[2]!;
    const inactive = computePointerStringInfluence(sample, {
      normX: 0.8,
      normY: -0.6,
      active: false,
    });
    assert.deepEqual(inactive, { dCx1: 0, dCy1: 0, dCx2: 0, dCy2: 0 });

    const active = computePointerStringInfluence(sample, {
      normX: 0.8,
      normY: -0.6,
      active: true,
    });
    assert.notEqual(active.dCx1, 0);
    assert.notEqual(active.dCy1, 0);
  });

  it('advances traveling pulse dashoffset negatively along the string over time', () => {
    const pulseStroke = HERO_STRING_CONFIGS.find((s) => s.hasPulse)!;
    const offset0 = computeStringPulseDashOffset(pulseStroke, 0);
    const offset1 = computeStringPulseDashOffset(pulseStroke, 0.5);

    assert.ok(offset1 < offset0, 'Pulse dashoffset should advance negatively with time');

    const nonPulseStroke = HERO_STRING_CONFIGS.find((s) => !s.hasPulse)!;
    assert.equal(computeStringPulseDashOffset(nonPulseStroke, 2.5), 0);
  });

  it('gates hero string animation when hidden or reduced motion is preferred', () => {
    assert.equal(
      shouldAnimateHeroStrings({
        isVisible: true,
        isDocumentHidden: false,
        prefersReducedMotion: false,
      }),
      true
    );
    assert.equal(
      shouldAnimateHeroStrings({
        isVisible: false,
        isDocumentHidden: false,
        prefersReducedMotion: false,
      }),
      false
    );
    assert.equal(
      shouldAnimateHeroStrings({
        isVisible: true,
        isDocumentHidden: true,
        prefersReducedMotion: false,
      }),
      false
    );
    assert.equal(
      shouldAnimateHeroStrings({
        isVisible: true,
        isDocumentHidden: false,
        prefersReducedMotion: true,
      }),
      false
    );
  });
});
