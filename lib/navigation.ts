export type NavSectionId =
  | 'home'
  | 'services'
  | 'work'
  | 'about'
  | 'testimonials'
  | 'contact';

export interface NavLinkItem {
  id: NavSectionId;
  label: string;
  href: `#${NavSectionId}`;
  mobileVisible: boolean;
}

export const PRIMARY_NAV_LINKS: readonly NavLinkItem[] = [
  { id: 'home', label: 'Home', href: '#home', mobileVisible: true },
  { id: 'services', label: 'Services', href: '#services', mobileVisible: true },
  { id: 'work', label: 'Work', href: '#work', mobileVisible: true },
  { id: 'about', label: 'About', href: '#about', mobileVisible: true },
  {
    id: 'testimonials',
    label: 'Stories',
    href: '#testimonials',
    mobileVisible: false,
  },
  { id: 'contact', label: 'Contact', href: '#contact', mobileVisible: true },
] as const;

export const ORDERED_SECTION_IDS: readonly NavSectionId[] = [
  'home',
  'services',
  'work',
  'about',
  'testimonials',
  'contact',
] as const;

/**
 * Resolves the currently active navigation section based on viewport-relative top offsets.
 * Evaluates sections from bottom to top of the document so the deepest section whose top
 * has crossed `thresholdPx` becomes active.
 */
export function resolveActiveSection(
  sectionTops: Partial<Record<NavSectionId, number | null>>,
  thresholdPx: number
): NavSectionId {
  for (let i = ORDERED_SECTION_IDS.length - 1; i >= 1; i--) {
    const id = ORDERED_SECTION_IDS[i];
    const top = sectionTops[id];
    if (typeof top === 'number' && Number.isFinite(top) && top <= thresholdPx) {
      return id;
    }
  }
  return 'home';
}

/**
 * Ensures the sticky navigation header remains fully visible and pinned at top=0
 * whenever the page is scrolled, while respecting the entrance reveal animation at the top.
 */
export function computeStickyHeaderStyle(
  navTranslateYPercent: number,
  navOpacity: number,
  isScrolled: boolean
): { translateYPercent: number; opacity: number } {
  if (isScrolled) {
    return { translateYPercent: 0, opacity: 1 };
  }
  return {
    translateYPercent: navTranslateYPercent,
    opacity: navOpacity,
  };
}
