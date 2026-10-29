export type ThemeMode = 'light' | 'dark';

export const THEME_STORAGE_KEY = 'ingo-theme-mode';

export interface ThemeColorTokens {
  bgPrimary: string;
  bgSecondary: string;
  bgCard: string;
  textPrimary: string;
  textSecondary: string;
  accentPrimary: string;
  badgeBg: string;
  badgeText: string;
  borderPrimary: string;
}

export const THEME_TOKENS: Record<ThemeMode, ThemeColorTokens> = {
  light: {
    bgPrimary: '#FFFFFF',
    bgSecondary: '#F5F8EF',
    bgCard: '#FFFFFF',
    textPrimary: '#101410',
    textSecondary: '#5E5E61',
    accentPrimary: '#08482D',
    badgeBg: '#DAE7C7',
    badgeText: '#08482D',
    borderPrimary: '#C5D8B2',
  },
  dark: {
    bgPrimary: '#050C08',
    bgSecondary: '#0A1610',
    bgCard: '#0F2118',
    textPrimary: '#F4F9F5',
    textSecondary: '#A3B8AC',
    accentPrimary: '#6EE7B7',
    badgeBg: '#163828',
    badgeText: '#A7F3D0',
    borderPrimary: '#1F4734',
  },
};

export function getNextTheme(current: ThemeMode): ThemeMode {
  return current === 'dark' ? 'light' : 'dark';
}

export function resolveInitialTheme(
  storedValue: string | null | undefined,
  prefersDark = false
): ThemeMode {
  if (storedValue === 'dark' || storedValue === 'light') {
    return storedValue;
  }
  return prefersDark ? 'dark' : 'light';
}
