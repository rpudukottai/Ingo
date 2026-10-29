import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  FOOTER_SOCIAL_PROFILES,
  FOOTER_NAV_LINKS,
  PRIVACY_POLICY_SECTIONS,
  formatCopyrightNotice,
} from './footer-data';

test('FOOTER_SOCIAL_PROFILES includes valid social media profiles with labels, handles, and URLs', () => {
  assert.ok(FOOTER_SOCIAL_PROFILES.length >= 4);
  for (const profile of FOOTER_SOCIAL_PROFILES) {
    assert.ok(profile.id.length > 0);
    assert.ok(profile.label.length > 0);
    assert.ok(profile.handle.length > 0);
    assert.ok(profile.href.startsWith('https://'));
  }
});

test('FOOTER_NAV_LINKS covers all major page sections', () => {
  const ids = FOOTER_NAV_LINKS.map((item) => item.id);
  assert.deepEqual(ids, [
    'home',
    'services',
    'work',
    'about',
    'trusted-by',
    'testimonials',
    'contact',
  ]);
});

test('PRIVACY_POLICY_SECTIONS and formatCopyrightNotice provide complete legal and copyright text', () => {
  assert.equal(PRIVACY_POLICY_SECTIONS.length, 4);
  const copyright = formatCopyrightNotice(2026);
  assert.ok(copyright.includes('© 2026'));
  assert.ok(copyright.includes('All rights reserved'));
});
