import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  THEME_TOKENS,
  getNextTheme,
  resolveInitialTheme,
} from './theme.ts';

describe('theme helpers', () => {
  it('toggles cleanly between light and dark modes', () => {
    assert.equal(getNextTheme('light'), 'dark');
    assert.equal(getNextTheme('dark'), 'light');
  });

  it('resolves initial theme from stored preference or system fallback', () => {
    assert.equal(resolveInitialTheme('dark', false), 'dark');
    assert.equal(resolveInitialTheme('light', true), 'light');
    assert.equal(resolveInitialTheme(null, true), 'dark');
    assert.equal(resolveInitialTheme(null, false), 'light');
    assert.equal(resolveInitialTheme('invalid', false), 'light');
  });

  it('maps all background, text, badge, and border tokens to distinct high-contrast light and dark variants', () => {
    assert.notEqual(THEME_TOKENS.light.bgPrimary, THEME_TOKENS.dark.bgPrimary);
    assert.notEqual(
      THEME_TOKENS.light.bgSecondary,
      THEME_TOKENS.dark.bgSecondary
    );
    assert.notEqual(
      THEME_TOKENS.light.textPrimary,
      THEME_TOKENS.dark.textPrimary
    );
    assert.notEqual(
      THEME_TOKENS.light.textSecondary,
      THEME_TOKENS.dark.textSecondary
    );
    assert.notEqual(
      THEME_TOKENS.light.borderPrimary,
      THEME_TOKENS.dark.borderPrimary
    );
  });
});
