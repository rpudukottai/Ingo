import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  computeWordRevealRange,
  shouldRunContinuousLoop,
  computeMagnetOffset,
  getOptimalVideoPreload,
  hasProgressChangedMeaningfully,
  shouldPlayHeroVideo,
} from './render-optimization';

describe('render-optimization utilities', () => {
  it('computes monotonically increasing word reveal ranges within [0, 1]', () => {
    const first = computeWordRevealRange(0, 12);
    const middle = computeWordRevealRange(5, 12);
    const last = computeWordRevealRange(11, 12);

    assert.equal(first[0], 0);
    assert.ok(first[1] > first[0]);
    assert.ok(middle[0] > first[0]);
    assert.ok(last[0] > middle[0]);
    assert.ok(last[1] <= 1);
  });

  it('gates continuous RAF loop when off-screen or document is hidden', () => {
    assert.equal(
      shouldRunContinuousLoop({
        isIntersecting: false,
        isDocumentHidden: false,
        prefersReducedMotion: false,
        isDragging: false,
        velocityU: 0,
      }),
      false
    );

    assert.equal(
      shouldRunContinuousLoop({
        isIntersecting: true,
        isDocumentHidden: true,
        prefersReducedMotion: false,
        isDragging: false,
        velocityU: 0,
      }),
      false
    );

    assert.equal(
      shouldRunContinuousLoop({
        isIntersecting: true,
        isDocumentHidden: false,
        prefersReducedMotion: false,
        isDragging: false,
        velocityU: 0,
      }),
      true
    );

    // Reduced motion still allows momentum decay if user drags
    assert.equal(
      shouldRunContinuousLoop({
        isIntersecting: true,
        isDocumentHidden: false,
        prefersReducedMotion: true,
        isDragging: false,
        velocityU: 120,
      }),
      true
    );
  });

  it('computes magnetic offset only when pointer is inside padded bounds', () => {
    const rect = { left: 100, top: 100, width: 120, height: 48 };
    const inside = computeMagnetOffset(180, 130, rect, 40, 2);
    assert.equal(inside.active, true);
    assert.equal(inside.x, 10);
    assert.equal(inside.y, 3);

    const outside = computeMagnetOffset(400, 400, rect, 40, 2);
    assert.equal(outside.active, false);
    assert.equal(outside.x, 0);
    assert.equal(outside.y, 0);
  });

  it('prioritizes video preload based on intersection and master card index', () => {
    assert.equal(getOptimalVideoPreload(0, false), 'metadata');
    assert.equal(getOptimalVideoPreload(3, false), 'none');
    assert.equal(getOptimalVideoPreload(0, true), 'auto');
    assert.equal(getOptimalVideoPreload(3, true), 'metadata');
  });

  it('filters sub-perceptual progress updates while preserving 0 and 1 endpoints', () => {
    assert.equal(hasProgressChangedMeaningfully(0.5, 0.501, 0.0025), false);
    assert.equal(hasProgressChangedMeaningfully(0.5, 0.504, 0.0025), true);
    assert.equal(hasProgressChangedMeaningfully(0.999, 1, 0.0025), true);
  });

  it('pauses hero video when scrolled off-screen, hidden, or in reduced motion', () => {
    assert.equal(
      shouldPlayHeroVideo({
        isHeroIntersecting: true,
        isDocumentHidden: false,
        prefersReducedMotion: false,
        isRecMode: false,
      }),
      true
    );
    assert.equal(
      shouldPlayHeroVideo({
        isHeroIntersecting: false,
        isDocumentHidden: false,
        prefersReducedMotion: false,
        isRecMode: false,
      }),
      false
    );
    assert.equal(
      shouldPlayHeroVideo({
        isHeroIntersecting: true,
        isDocumentHidden: true,
        prefersReducedMotion: false,
        isRecMode: false,
      }),
      false
    );
    assert.equal(
      shouldPlayHeroVideo({
        isHeroIntersecting: true,
        isDocumentHidden: false,
        prefersReducedMotion: true,
        isRecMode: false,
      }),
      false
    );
  });
});

