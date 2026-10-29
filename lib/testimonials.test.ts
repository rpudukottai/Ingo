import test from 'node:test';
import assert from 'node:assert/strict';
import {
  CLIENT_TESTIMONIALS,
  wrapTestimonialIndex,
  getNextTestimonialIndex,
  getPrevTestimonialIndex,
} from './testimonials';

test('CLIENT_TESTIMONIALS has 4 complete client quotes with names, roles, companies, and no client images', () => {
  assert.equal(CLIENT_TESTIMONIALS.length, 4);
  for (const item of CLIENT_TESTIMONIALS) {
    assert.ok(item.clientName.length > 3);
    assert.ok(item.company.length > 2);
    assert.ok(item.quote.length > 60);
    assert.equal('avatarUrl' in item, false);
  }
});

test('carousel index helpers wrap cleanly forward and backward', () => {
  assert.equal(getNextTestimonialIndex(0, 4), 1);
  assert.equal(getNextTestimonialIndex(3, 4), 0);
  assert.equal(getPrevTestimonialIndex(0, 4), 3);
  assert.equal(getPrevTestimonialIndex(2, 4), 1);
  assert.equal(wrapTestimonialIndex(-5, 4), 3);
});
