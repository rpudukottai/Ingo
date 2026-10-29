import test from 'node:test';
import assert from 'node:assert/strict';
import {
  SERVICE_REQUIRED_OPTIONS,
  validateContactForm,
} from './contact-form';

test('SERVICE_REQUIRED_OPTIONS contains all 8 requested service options in exact order', () => {
  assert.deepEqual(SERVICE_REQUIRED_OPTIONS, [
    'Logo Design',
    'Digital marketing',
    'Advertisement Shoot',
    'Video editing',
    'Content Creation',
    'Social media management',
    'Website Development',
    'Making ads',
  ]);
});

test('validateContactForm accepts valid inquiry and rejects incomplete fields', () => {
  const validResult = validateContactForm({
    name: 'Aria Vance',
    phone: '+1 (555) 234-5678',
    email: 'aria@nextlevel.studio',
    serviceRequired: 'Website Development',
    message: 'We need a new interactive flagship website for our Q3 launch.',
  });
  assert.equal(validResult.valid, true);
  assert.deepEqual(validResult.errors, {});

  const invalidResult = validateContactForm({
    name: '',
    phone: '123',
    email: 'invalid-email',
    serviceRequired: '',
    message: 'short',
  });
  assert.equal(invalidResult.valid, false);
  assert.ok(invalidResult.errors.name);
  assert.ok(invalidResult.errors.phone);
  assert.ok(invalidResult.errors.email);
  assert.ok(invalidResult.errors.serviceRequired);
  assert.ok(invalidResult.errors.message);
});
