'use client';

import React from 'react';
import {
  Layers,
  Sparkles,
  Compass,
  Cpu,
  Globe,
  Command,
  Hexagon,
  Zap,
  type LucideIcon,
} from 'lucide-react';
import { FadeIn, AnimatedText, ContactButton } from './reusable-ui';

export interface TrustedLogoItem {
  id: string;
  name: string;
  sector: string;
  year: string;
  Icon: LucideIcon;
  fontStyle: string;
}

export const TRUSTED_LOGOS: TrustedLogoItem[] = [
  {
    id: 'kinetix',
    name: 'KINETIX',
    sector: 'Spatial Tech',
    year: '2026',
    Icon: Layers,
    fontStyle: 'tracking-[0.06em] sm:tracking-[0.14em] font-extrabold',
  },
  {
    id: 'aetheria',
    name: 'Aetheria',
    sector: 'Botanical',
    year: '2025',
    Icon: Sparkles,
    fontStyle: 'tracking-[-0.03em] font-bold italic',
  },
  {
    id: 'veloce',
    name: 'VELOCE®',
    sector: 'Mobility',
    year: '2026',
    Icon: Compass,
    fontStyle: 'tracking-[0.04em] sm:tracking-[0.08em] font-black',
  },
  {
    id: 'monolith',
    name: 'MONOLITH',
    sector: 'AI Hardware',
    year: '2025',
    Icon: Cpu,
    fontStyle: 'tracking-[0.04em] sm:tracking-[0.14em] font-bold',
  },
  {
    id: 'nordic-io',
    name: 'NORDIC.IO',
    sector: 'Fintech',
    year: '2026',
    Icon: Globe,
    fontStyle: 'tracking-[0.03em] sm:tracking-[0.06em] font-extrabold',
  },
  {
    id: 'lumina-os',
    name: 'LuminaOS',
    sector: 'Design OS',
    year: '2025',
    Icon: Command,
    fontStyle: 'tracking-[-0.035em] font-bold',
  },
  {
    id: 'hexaform',
    name: 'HEXAFORM',
    sector: 'Architecture',
    year: '2026',
    Icon: Hexagon,
    fontStyle: 'tracking-[0.03em] sm:tracking-[0.1em] font-extrabold',
  },
  {
    id: 'voltgrid',
    name: 'VoltGrid',
    sector: 'Clean Energy',
    year: '2026',
    Icon: Zap,
    fontStyle: 'tracking-[-0.02em] font-black',
  },
];

export const TrustedBySection = React.memo(function TrustedBySection() {
  return (
    <section
      id="trusted-by"
      data-testid="trusted-by-section"
      aria-label="Trusted By — Global Brand Partners"
      className="relative z-30 -mt-10 w-full rounded-t-[40px] border-t-2 border-[#C5D8B2] bg-[#FFFFFF] px-5 pt-16 pb-28 shadow-[0_-24px_60px_rgba(8,72,45,0.08)] transition-colors duration-300 sm:-mt-12 sm:rounded-t-[50px] sm:px-10 sm:pt-20 sm:pb-36 md:-mt-14 md:rounded-t-[60px] md:pt-24 md:pb-44 lg:px-14 dark:border-[#1F4734] dark:bg-[#050C08] dark:shadow-[0_-24px_60px_rgba(0,0,0,0.5)]"
    >
      <div className="mx-auto w-full">
        {/* Section Header — Synced with Services, Work, and About sections */}
        <div className="mb-12 flex flex-col items-center text-center md:mb-16">
          <FadeIn y={20} duration={0.6}>
            <div className="inline-flex h-[38px] items-center justify-center rounded-full bg-[#DAE7C7] px-5 text-[15px] font-medium text-[#08482D] sm:text-[16.5px] dark:bg-[#163828] dark:text-[#A7F3D0]">
              Trusted By Category Leaders
            </div>
          </FadeIn>

          <FadeIn y={28} delay={0.1} duration={0.7}>
            <h2
              className="hero-heading mt-4 bg-gradient-to-br from-[#101410] via-[#08482D] to-[#2E7D52] bg-clip-text text-5xl leading-[1.02] font-bold tracking-[-0.035em] text-transparent sm:text-6xl md:text-7xl lg:text-[88px]"
              style={{ fontFamily: 'var(--font-inter-tight), sans-serif' }}
            >
              Trusted By
            </h2>
          </FadeIn>

          <div className="mt-4 flex max-w-[640px] flex-col items-center">
            <AnimatedText
              text="Partnering with ambitious founders, global product teams, and category-defining brands across 14 countries."
              className="justify-center text-center text-base leading-relaxed text-[#5E5E61] sm:text-lg md:text-[20px] dark:text-[#A3B8AC]"
            />
          </div>
        </div>

        {/* Main Rounded Showcase Container housing the Grayscale Logo Grid */}
        <FadeIn y={34} delay={0.15} duration={0.75}>
          <div
            data-testid="trusted-logo-card"
            className="relative w-full rounded-[40px] border-2 border-[#C5D8B2] bg-[#F5F8EF] p-4 shadow-[0_28px_70px_-18px_rgba(8,72,45,0.12)] transition-colors duration-300 sm:rounded-[50px] sm:p-6 md:rounded-[60px] md:p-8 lg:p-10 dark:border-[#1F4734] dark:bg-[#0F2118] dark:shadow-[0_28px_70px_-18px_rgba(0,0,0,0.65)]"
          >
            {/* Card Top Bar */}
            <div className="mb-5 flex flex-col gap-3 border-b border-[#08482D]/12 pb-4 sm:mb-6 sm:flex-row sm:items-center sm:justify-between sm:pb-5 dark:border-[#1F4734]">
              <div className="flex flex-wrap items-baseline gap-3 sm:gap-5">
                <span
                  className="text-4xl leading-none font-bold tracking-[-0.04em] text-[#08482D] sm:text-5xl dark:text-[#6EE7B7]"
                  style={{ fontFamily: 'var(--font-inter-tight), sans-serif' }}
                >
                  01
                </span>
                <span className="inline-flex w-fit items-center rounded-full bg-[#DAE7C7] px-3.5 py-1 text-xs font-medium tracking-wide text-[#08482D] uppercase sm:text-sm dark:bg-[#163828] dark:text-[#A7F3D0]">
                  Global Roster
                </span>
                <h3
                  className="text-2xl font-bold tracking-[-0.025em] text-[#101410] sm:text-3xl dark:text-[#F4F9F5]"
                  style={{ fontFamily: 'var(--font-inter-tight), sans-serif' }}
                >
                  120+ Ventures &amp; Enterprise Teams
                </h3>
              </div>

              <span className="text-xs font-medium tracking-widest text-[#5E5E61] uppercase dark:text-[#A3B8AC]">
                Verified Partners · 2018—2026
              </span>
            </div>

            {/* 8-Tile Grayscale Placeholder Logo Grid */}
            <div
              data-testid="trusted-logo-grid"
              className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4"
            >
              {TRUSTED_LOGOS.map((logo, idx) => {
                const IconComponent = logo.Icon;
                return (
                  <FadeIn
                    key={logo.id}
                    delay={0.05 * idx}
                    y={18}
                    duration={0.55}
                  >
                    <div
                      data-testid={`trusted-logo-item-${logo.id}`}
                      className="group relative flex h-[126px] flex-col justify-between overflow-hidden rounded-[24px] border border-[#101410]/10 bg-[#FFFFFF] p-3.5 grayscale transition-all duration-300 hover:-translate-y-0.5 hover:border-[#08482D]/35 hover:shadow-[0_16px_36px_-12px_rgba(8,72,45,0.14)] hover:grayscale-0 sm:h-[152px] sm:rounded-[36px] sm:p-5 dark:border-[#1F4734] dark:bg-[#132A1F] dark:hover:border-[#34D399]/60"
                    >
                      {/* Top row: Sector tag & partner year */}
                      <div className="flex items-center justify-between gap-1 text-[9.5px] font-medium tracking-wider text-[#71717A] uppercase transition-colors duration-300 group-hover:text-[#08482D] sm:text-[11px] dark:text-[#A3B8AC] dark:group-hover:text-[#6EE7B7]">
                        <span className="truncate">{logo.sector}</span>
                        <span className="shrink-0 rounded-full bg-[#F4F4F5] px-2 py-0.5 text-[9.5px] text-[#52525B] transition-colors duration-300 group-hover:bg-[#DAE7C7] group-hover:text-[#08482D] sm:text-[10px] dark:bg-[#163828] dark:text-[#A7F3D0]">
                          {logo.year}
                        </span>
                      </div>

                      {/* Center Brand Mark + Wordmark (Grayscale by default) */}
                      <div className="my-auto flex items-center justify-center gap-2 py-1.5 text-[#3F3F46] transition-colors duration-300 group-hover:text-[#08482D] sm:gap-2.5 sm:py-2 dark:text-[#D4E4DA] dark:group-hover:text-[#6EE7B7]">
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#F4F4F5] text-[#27272A] transition-colors duration-300 group-hover:bg-[#DAE7C7] group-hover:text-[#08482D] sm:h-10 sm:w-10 sm:rounded-xl dark:bg-[#163828] dark:text-[#A7F3D0]">
                          <IconComponent className="h-4 w-4 stroke-[2] sm:h-5 sm:w-5" />
                        </div>
                        <span
                          className={`truncate text-sm text-[#27272A] transition-colors duration-300 group-hover:text-[#101410] sm:text-lg lg:text-xl xl:text-[22px] dark:text-[#F4F9F5] dark:group-hover:text-white ${logo.fontStyle}`}
                          style={{
                            fontFamily: 'var(--font-inter-tight), sans-serif',
                          }}
                        >
                          {logo.name}
                        </span>
                      </div>

                      {/* Bottom subtle status dot */}
                      <div className="flex items-center justify-between border-t border-[#101410]/6 pt-2 text-[10px] text-[#A1A1AA] transition-colors duration-300 group-hover:text-[#5E5E61] dark:border-[#1F4734] dark:text-[#A3B8AC]">
                        <span>Brand &amp; Digital</span>
                        <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#D4D4D8] transition-colors duration-300 group-hover:bg-[#08482D] dark:bg-[#34D399]" />
                      </div>
                    </div>
                  </FadeIn>
                );
              })}
            </div>

            {/* Bottom Credibility Strip */}
            <div className="mt-6 flex flex-col gap-4 border-t border-[#08482D]/12 pt-5 sm:mt-8 sm:flex-row sm:items-center sm:justify-between dark:border-[#1F4734]">
              <div className="flex flex-wrap items-center gap-4 sm:gap-8">
                <div>
                  <span
                    className="text-xl font-bold text-[#101410] sm:text-2xl dark:text-[#F4F9F5]"
                    style={{ fontFamily: 'var(--font-inter-tight), sans-serif' }}
                  >
                    98%
                  </span>
                  <span className="ml-2 text-xs text-[#5E5E61] sm:text-sm dark:text-[#A3B8AC]">
                    Client Retention
                  </span>
                </div>
                <div className="h-4 w-[1px] bg-[#08482D]/15 dark:bg-[#1F4734]" />
                <div>
                  <span
                    className="text-xl font-bold text-[#101410] sm:text-2xl dark:text-[#F4F9F5]"
                    style={{ fontFamily: 'var(--font-inter-tight), sans-serif' }}
                  >
                    $420M+
                  </span>
                  <span className="ml-2 text-xs text-[#5E5E61] sm:text-sm dark:text-[#A3B8AC]">
                    Partner Capital Raised
                  </span>
                </div>
                <div className="hidden h-4 w-[1px] bg-[#08482D]/15 sm:block dark:bg-[#1F4734]" />
                <div className="hidden sm:block">
                  <span
                    className="text-xl font-bold text-[#101410] sm:text-2xl dark:text-[#F4F9F5]"
                    style={{ fontFamily: 'var(--font-inter-tight), sans-serif' }}
                  >
                    4.9 / 5
                  </span>
                  <span className="ml-2 text-xs text-[#5E5E61] sm:text-sm dark:text-[#A3B8AC]">
                    Executive Satisfaction
                  </span>
                </div>
              </div>

              <div className="flex items-center">
                <ContactButton
                  label="Contact Me"
                  onClick={() => {
                    const contactEl = document.getElementById('contact');
                    contactEl?.scrollIntoView({ behavior: 'smooth' });
                  }}
                />
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
});
