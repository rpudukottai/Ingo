import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  PRIMARY_NAV_LINKS,
  resolveActiveSection,
  computeStickyHeaderStyle,
} from './navigation.ts';

describe('navigation helpers', () => {
  it('includes required section links for Home, Services, Work, About, and Contact', () => {
    const ids = PRIMARY_NAV_LINKS.map((item) => item.id);
    assert.ok(ids.includes('home'));
    assert.ok(ids.includes('services'));
    assert.ok(ids.includes('work'));
    assert.ok(ids.includes('about'));
    assert.ok(ids.includes('contact'));

    for (const link of PRIMARY_NAV_LINKS) {
      assert.equal(link.href, `#${link.id}`);
      assert.ok(link.label.length > 0);
    }
  });

  it('resolves the active section from viewport-relative section tops', () => {
    const threshold = 360;

    assert.equal(
      resolveActiveSection(
        {
          services: 600,
          work: 1400,
          about: 2200,
          testimonials: 3000,
          contact: 3800,
        },
        threshold
      ),
      'home'
    );

    assert.equal(
      resolveActiveSection(
        {
          services: 120,
          work: 900,
          about: 1800,
          testimonials: 2600,
          contact: 3400,
        },
        threshold
      ),
      'services'
    );

    assert.equal(
      resolveActiveSection(
        {
          services: -800,
          work: -120,
          about: 100,
          testimonials: 780,
          contact: 1500,
        },
        threshold
      ),
      'about'
    );

    assert.equal(
      resolveActiveSection(
        {
          services: -2400,
          work: -1600,
          about: -900,
          testimonials: -300,
          contact: 210,
        },
        threshold
      ),
      'contact'
    );
  });

  it('pins the sticky header at translateY=0 and opacity=1 when scrolled', () => {
    assert.deepEqual(computeStickyHeaderStyle(-65, 0.35, true), {
      translateYPercent: 0,
      opacity: 1,
    });
    assert.deepEqual(computeStickyHeaderStyle(-40, 0.6, false), {
      translateYPercent: -40,
      opacity: 0.6,
    });
  });
});
