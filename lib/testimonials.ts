export interface ClientTestimonial {
  id: string;
  number: string;
  clientName: string;
  clientRole: string;
  company: string;
  serviceTag: string;
  impactMetric: string;
  quote: string;
}

export const CLIENT_TESTIMONIALS: ClientTestimonial[] = [
  {
    id: 'nextlevel-aria',
    number: '01',
    clientName: 'Aria Vance',
    clientRole: 'Managing Partner',
    company: 'Nextlevel Studio',
    serviceTag: 'Website Development & Motion',
    impactMetric: '+68% Studio Inquiries',
    quote:
      'INGO and Reelmark completely transformed how global brands experience our work. Within six weeks of launching our new flagship site and reel system, qualified enterprise inquiries jumped by 68%.',
  },
  {
    id: 'aura-elena',
    number: '02',
    clientName: 'Elena Rostova',
    clientRole: 'Founder & CEO',
    company: 'Aura Botanicals',
    serviceTag: 'Logo Design & Content Creation',
    impactMetric: '3.4× D2C Conversion',
    quote:
      'Rarely do you find a studio that understands both quiet luxury branding and high-converting social video. Their art direction and launch reels turned our seasonal release into our fastest sell-out ever.',
  },
  {
    id: 'solaris-marcus',
    number: '03',
    clientName: 'Marcus Sterling',
    clientRole: 'VP of Brand & Product',
    company: 'Solaris Digital',
    serviceTag: 'Digital Marketing & Web Platform',
    impactMetric: '99.4 Performance Score',
    quote:
      'They distilled complex clean-energy telemetry into an effortless, sunlit digital story. Our board, institutional partners, and customers constantly point to our platform as the benchmark in our sector.',
  },
  {
    id: 'kinetix-lukas',
    number: '04',
    clientName: 'Lukas Lind',
    clientRole: 'Co-Founder & CPO',
    company: 'KINETIX',
    serviceTag: 'Advertisement Shoot & Video Editing',
    impactMetric: '2.8M+ Organic Views',
    quote:
      'Every 60-second reel they edited for our hardware launch felt like a cinema trailer. Fast turnarounds, zero agency fluff, and creative instincts that immediately resonated with our community.',
  },
];

export function wrapTestimonialIndex(index: number, total: number): number {
  if (total <= 0) return 0;
  return ((index % total) + total) % total;
}

export function getNextTestimonialIndex(
  currentIndex: number,
  total: number
): number {
  return wrapTestimonialIndex(currentIndex + 1, total);
}

export function getPrevTestimonialIndex(
  currentIndex: number,
  total: number
): number {
  return wrapTestimonialIndex(currentIndex - 1, total);
}
