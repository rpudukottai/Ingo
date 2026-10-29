export interface FooterSocialProfile {
  id: string;
  label: string;
  handle: string;
  href: string;
}

export interface FooterNavLink {
  id: string;
  label: string;
  href: string;
}

export interface PrivacyPolicyItem {
  title: string;
  summary: string;
}

export const FOOTER_SOCIAL_PROFILES: FooterSocialProfile[] = [
  {
    id: 'instagram',
    label: 'Instagram',
    handle: '@ingo.studio',
    href: 'https://instagram.com',
  },
  {
    id: 'youtube',
    label: 'YouTube',
    handle: '@reelmark.tv',
    href: 'https://youtube.com',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    handle: 'INGO Digital',
    href: 'https://linkedin.com',
  },
  {
    id: 'showcase',
    label: 'Behance',
    handle: 'reelmark.studio',
    href: 'https://behance.net',
  },
];

export const FOOTER_NAV_LINKS: FooterNavLink[] = [
  { id: 'home', label: 'Home', href: '#home' },
  { id: 'services', label: 'Services', href: '#services' },
  { id: 'work', label: 'Our Work', href: '#work' },
  { id: 'about', label: 'About Us', href: '#about' },
  { id: 'trusted-by', label: 'Trusted By', href: '#trusted-by' },
  { id: 'testimonials', label: 'Client Stories', href: '#testimonials' },
  { id: 'contact', label: 'Contact', href: '#contact' },
];

export const PRIVACY_POLICY_SECTIONS: PrivacyPolicyItem[] = [
  {
    title: '1. Data We Collect',
    summary:
      'When you submit a project inquiry, we collect your name, phone number, email address, selected service interest, and project brief solely to respond to your request.',
  },
  {
    title: '2. How We Use Your Information',
    summary:
      'Your contact details are used exclusively by our studio directors to prepare project proposals, schedule discovery calls, and deliver requested creative services.',
  },
  {
    title: '3. Confidentiality & Third Parties',
    summary:
      'We never sell, rent, or trade client data. All project briefs, brand assets, and unreleased product roadmaps shared with INGO × Reelmark are protected under strict studio NDA standards.',
  },
  {
    title: '4. Your Privacy Rights',
    summary:
      'You may request access to, correction of, or deletion of your personal inquiry records at any time by contacting privacy@ingostudio.com.',
  },
];

export function formatCopyrightNotice(year: number = 2026): string {
  return `© ${year} INGO × Reelmark Creative Studio. All rights reserved.`;
}
