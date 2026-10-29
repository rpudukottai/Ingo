import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  computeStaggerDelay,
  HERO_WORDMARK_LEFT_VARIANTS,
  HERO_PILL_ENTRANCE_VARIANTS,
  HERO_WORDMARK_RIGHT_VARIANTS,
  HERO_SUBHEADING_VARIANTS,
  HERO_FOOTER_CONTAINER_VARIANTS,
  HERO_BUTTON_ENTRANCE_VARIANTS,
  HERO_NAV_LIST_VARIANTS,
} from './hero-motion.ts';

describe('hero Framer Motion entrance variants', () => {
  it('computes monotonically increasing stagger delays for sequential hero elements', () => {
    const d0 = computeStaggerDelay(0, 0.08, 0.12);
    const d1 = computeStaggerDelay(1, 0.08, 0.12);
    const d2 = computeStaggerDelay(2, 0.08, 0.12);
    const d3 = computeStaggerDelay(3, 0.08, 0.12);

    assert.equal(d0, 0.08);
    assert.equal(d1, 0.2);
    assert.equal(d2, 0.32);
    assert.equal(d3, 0.44);
    assert.ok(d0 < d1 && d1 < d2 && d2 < d3);
  });

  it('defines staggered hidden and visible states for wordmark headlines, central pill, subheading, footer, and CTA buttons', () => {
    assert.equal(HERO_WORDMARK_LEFT_VARIANTS.hidden.opacity, 0);
    assert.equal(HERO_WORDMARK_LEFT_VARIANTS.visible.opacity, 1);
    assert.ok(
      HERO_WORDMARK_LEFT_VARIANTS.visible.transition.delay <
        HERO_PILL_ENTRANCE_VARIANTS.visible.transition.delay
    );
    assert.ok(
      HERO_PILL_ENTRANCE_VARIANTS.visible.transition.delay <
        HERO_WORDMARK_RIGHT_VARIANTS.visible.transition.delay
    );
    assert.ok(
      HERO_WORDMARK_RIGHT_VARIANTS.visible.transition.delay <
        HERO_SUBHEADING_VARIANTS.visible.transition.delay
    );
    assert.equal(HERO_SUBHEADING_VARIANTS.hidden.opacity, 0);
    assert.equal(HERO_SUBHEADING_VARIANTS.visible.opacity, 1);

    assert.equal(HERO_BUTTON_ENTRANCE_VARIANTS.hidden.opacity, 0);
    assert.equal(HERO_BUTTON_ENTRANCE_VARIANTS.visible.opacity, 1);
    assert.equal(HERO_BUTTON_ENTRANCE_VARIANTS.visible.scale, 1);

    assert.ok(
      HERO_FOOTER_CONTAINER_VARIANTS.visible.transition.staggerChildren > 0
    );
    assert.ok(HERO_NAV_LIST_VARIANTS.visible.transition.staggerChildren > 0);
  });
});
