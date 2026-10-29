export interface WorkProject {
  id: string;
  number: string;
  title: string;
  category: 'Client' | 'Personal';
  description: string;
  liveUrl: string;
  col1Image1: string;
  col1Image2: string;
  col2Image: string;
}

export const WORK_PROJECTS: WorkProject[] = [
  {
    id: 'nextlevel-studio',
    number: '01',
    title: 'Nextlevel Studio',
    category: 'Client',
    description:
      'A botanical-inspired digital flagship and interactive portfolio system built for Nextlevel Studio. We blended tactile organic art direction with fluid scroll choreography to showcase their multidisciplinary production reels and lift studio inquiries by 68%.',
    liveUrl: '#work-nextlevel-studio',
    col1Image1:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055344_5eff02e0-87a5-41ce-b64f-eb08da8f33db.png&w=1280&q=85',
    col1Image2:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055431_11d841fd-8b41-46a5-82e4-b04f2407a7d8.png&w=1280&q=85',
    col2Image:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055451_e317bf2d-28d4-48cc-86b0-6f72f25b6327.png&w=1280&q=85',
  },
  {
    id: 'aura-brand-identity',
    number: '02',
    title: 'Aura Brand Identity',
    category: 'Personal',
    description:
      'A serene alpine-lavender visual identity and e-commerce experience crafted for Aura. Pairing atmospheric landscape photography with a tactile, zero-friction product discovery journey across web and packaging.',
    liveUrl: '#work-aura-brand-identity',
    col1Image1:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055654_911201c5-36d9-4bc6-bac7-331adfce159f.png&w=1280&q=85',
    col1Image2:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055723_5ceda0b8-d9c2-4665-b2e3-83ba19ba76d1.png&w=1280&q=85',
    col2Image:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055753_adc5dcbd-a8e6-49c0-b43a-9b030d835cea.png&w=1280&q=85',
  },
  {
    id: 'solaris-digital',
    number: '03',
    title: 'Solaris Digital',
    category: 'Client',
    description:
      'A sunlit brand refresh and interactive climate-tech platform for Solaris Digital. We paired golden-hour editorial imagery with a modular design system that translates clean-energy telemetry into effortless visual stories.',
    liveUrl: '#work-solaris-digital',
    col1Image1:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055759_963cfb0b-4bd1-4b0f-9d0a-09bd6cf95b2f.png&w=1280&q=85',
    col1Image2:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_060108_438f781a-9846-4dcc-89ab-c4e6cb830f5b.png&w=1280&q=85',
    col2Image:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055818_9d062121-ad7e-46b9-999a-1a6a692ef1ee.png&w=1280&q=85',
  },
];

/**
 * Computes the target scale for a sticky-stacking card:
 * targetScale = 1 - (totalCards - 1 - index) * 0.03
 */
export function computeWorkCardTargetScale(
  index: number,
  totalCards: number
): number {
  return Number((1 - (totalCards - 1 - index) * 0.03).toFixed(4));
}

/**
 * Computes the vertical sticky offset in pixels for a card:
 * offsetPx = index * 28
 */
export function computeWorkCardTopOffsetPx(index: number): number {
  return index * 28;
}

/**
 * Computes the normalized scroll range [start, end] for a card at `index` out of `totalCards`.
 */
export function computeWorkCardScrollRange(
  index: number,
  totalCards: number
): [number, number] {
  if (totalCards <= 0) return [0, 1];
  const start = Number((index / totalCards).toFixed(4));
  return [start, 1];
}

/**
 * Computes the [start, end] scroll range for a character at `charIndex` out of `totalChars`
 * for the AnimatedText component.
 */
export function computeAnimatedCharRange(
  charIndex: number,
  totalChars: number
): [number, number] {
  if (totalChars <= 0) return [0, 1];
  const start = charIndex / totalChars;
  const end = (charIndex + 1) / totalChars;
  return [start, end];
}
