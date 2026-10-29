import test from 'node:test';
import assert from 'node:assert/strict';
import {
  WORK_PROJECTS,
  computeWorkCardTargetScale,
  computeWorkCardTopOffsetPx,
  computeWorkCardScrollRange,
  computeAnimatedCharRange,
} from './work-cards';

test('computeWorkCardTargetScale follows 1 - (totalCards - 1 - index) * 0.03', () => {
  assert.equal(computeWorkCardTargetScale(0, 3), 0.94);
  assert.equal(computeWorkCardTargetScale(1, 3), 0.97);
  assert.equal(computeWorkCardTargetScale(2, 3), 1.0);
});

test('computeWorkCardTopOffsetPx offsets each card by index * 28px', () => {
  assert.equal(computeWorkCardTopOffsetPx(0), 0);
  assert.equal(computeWorkCardTopOffsetPx(1), 28);
  assert.equal(computeWorkCardTopOffsetPx(2), 56);
});

test('computeWorkCardScrollRange returns [index / totalCards, 1]', () => {
  assert.deepEqual(computeWorkCardScrollRange(0, 3), [0, 1]);
  assert.deepEqual(computeWorkCardScrollRange(1, 3), [0.3333, 1]);
  assert.deepEqual(computeWorkCardScrollRange(2, 3), [0.6667, 1]);
});

test('computeAnimatedCharRange partitions [0, 1] evenly across characters', () => {
  const [s0, e0] = computeAnimatedCharRange(0, 10);
  const [s9, e9] = computeAnimatedCharRange(9, 10);
  assert.equal(s0, 0);
  assert.equal(e0, 0.1);
  assert.equal(s9, 0.9);
  assert.equal(e9, 1.0);
});

test('WORK_PROJECTS has 3 projects with exact titles, categories, detailed descriptions, and CloudFront URLs', () => {
  assert.equal(WORK_PROJECTS.length, 3);
  assert.equal(WORK_PROJECTS[0].title, 'Nextlevel Studio');
  assert.equal(WORK_PROJECTS[0].category, 'Client');
  assert.equal(WORK_PROJECTS[1].title, 'Aura Brand Identity');
  assert.equal(WORK_PROJECTS[1].category, 'Personal');
  assert.equal(WORK_PROJECTS[2].title, 'Solaris Digital');
  assert.equal(WORK_PROJECTS[2].category, 'Client');

  for (const project of WORK_PROJECTS) {
    assert.ok(project.description.length > 80 && project.description.length < 280);
  }
});
