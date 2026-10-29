import type { Metadata } from 'next';

export const SITE_TITLE = 'INGO — Creative Digital Agency';
export const SITE_DESCRIPTION =
  'INGO transforms ambitious ideas into distinctive digital experiences through website experiences, UI/UX design, creative development, and branding.';
export const DEFAULT_SITE_URL = 'https://ingostudio.com';
export const SITE_OG_IMAGE = '/images/agency-hero-poster.webp';

export function resolveSiteUrl(rawUrl?: string): string {
  const candidate = (rawUrl ?? process.env.APP_URL ?? '').trim();
  if (/^https?:\/\/.+/i.test(candidate)) {
    try {
      const parsed = new URL(candidate);
      return parsed.origin;
    } catch {
      return DEFAULT_SITE_URL;
    }
  }
  return DEFAULT_SITE_URL;
}

export const SITE_URL = resolveSiteUrl();

export function buildSiteMetadata(): Metadata {
  return {
    metadataBase: new URL(resolveSiteUrl()),

    title: {
      default: SITE_TITLE,
      template: '%s | INGO — Creative Digital Agency',
    },
    description: SITE_DESCRIPTION,
    applicationName: 'INGO Studio',
    keywords: [
      'INGO Creative Digital Agency',
      'Reelmark Short-Form Video',
      'Flagship Website Design',
      'UI/UX Design Studio',
      'Creative Development',
      'Brand Identity Systems',
      'Motion Design Agency',
    ],
    authors: [{ name: 'Soren Lindqvist — INGO Studio' }],
    creator: 'INGO × Reelmark Creative Studio',
    publisher: 'INGO Studio',
    alternates: {
      canonical: '/',
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: SITE_TITLE,
      description: SITE_DESCRIPTION,
      url: SITE_URL,
      siteName: SITE_TITLE,
      locale: 'en_US',
      type: 'website',
      images: [
        {
          url: SITE_OG_IMAGE,
          width: 1200,
          height: 630,
          alt: 'INGO — Creative Digital Agency & Reelmark Studio Showcase',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: SITE_TITLE,
      description: SITE_DESCRIPTION,
      images: [SITE_OG_IMAGE],
    },
  };
}

export function buildAgencyJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ProfessionalService',
        '@id': `${SITE_URL}/#organization`,
        name: SITE_TITLE,
        alternateName: 'INGO × Reelmark Creative Studio',
        url: SITE_URL,
        description: SITE_DESCRIPTION,
        image: `${SITE_URL}${SITE_OG_IMAGE}`,
        email: 'hello@ingostudio.com',
        telephone: '+1-415-890-4420',
        priceRange: '$$$',
        founder: {
          '@type': 'Person',
          name: 'Soren Lindqvist',
          jobTitle: 'Founder & Creative Lead',
        },
        areaServed: ['Global', 'United States', 'Europe'],
        knowsAbout: [
          'Website Experiences',
          'UI/UX Design',
          'Short-Form Video Reels',
          'Creative Development',
          'Brand Architecture',
        ],
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_TITLE,
        description: SITE_DESCRIPTION,
        publisher: {
          '@id': `${SITE_URL}/#organization`,
        },
      },
    ],
  };
}

export function serializeJsonLdSafe(data: unknown): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}
