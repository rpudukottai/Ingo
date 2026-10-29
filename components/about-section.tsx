'use client';

import React from 'react';
import {
  FadeIn,
  AnimatedText,
  ContactButton,
} from './reusable-ui';

interface StudioPillar {
  number: string;
  metric: string;
  label: string;
  detail: string;
}

const STUDIO_PILLARS: StudioPillar[] = [
  {
    number: '01',
    metric: '120K+',
    label: 'Creators & Makers',
    detail: 'Trusted across global product launches and short-form campaigns.',
  },
  {
    number: '02',
    metric: '48+',
    label: 'Flagship Launches',
    detail: 'Bespoke web experiences, brand identities, and motion systems.',
  },
  {
    number: '03',
    metric: '3.4×',
    label: 'Conversion Lift',
    detail: 'Measured impact through tactile storytelling and zero-friction UX.',
  },
];

export const AboutSection = React.memo(function AboutSection() {
  return (
    <section
      id="about"
      aria-label="About Us — Founder & Studio Philosophy"
      className="relative z-20 -mt-10 w-full rounded-t-[40px] border-t-2 border-[#C5D8B2] bg-[#F5F8EF] px-5 pt-16 pb-28 shadow-[0_-24px_60px_rgba(8,72,45,0.08)] transition-colors duration-300 sm:-mt-12 sm:rounded-t-[50px] sm:px-10 sm:pt-20 sm:pb-36 md:-mt-14 md:rounded-t-[60px] md:pt-24 md:pb-44 lg:px-14 dark:border-[#1F4734] dark:bg-[#0A1610] dark:shadow-[0_-24px_60px_rgba(0,0,0,0.5)]"
    >
      <div className="mx-auto w-full">
        {/* Section Header — Synced with Services & Work sections */}
        <div className="relative mb-12 flex flex-col items-center text-center md:mb-16">
          <FadeIn y={20} duration={0.6}>
            <div className="inline-flex h-[38px] items-center justify-center rounded-full bg-[#DAE7C7] px-5 text-[15px] font-medium text-[#08482D] sm:text-[16.5px] dark:bg-[#163828] dark:text-[#A7F3D0]">
              Studio &amp; Founder
            </div>
          </FadeIn>

          <FadeIn y={28} delay={0.1} duration={0.7}>
            <h2
              className="hero-heading mt-4 bg-gradient-to-br from-[#101410] via-[#08482D] to-[#2E7D52] bg-clip-text text-5xl leading-[1.02] font-bold tracking-[-0.035em] text-transparent sm:text-6xl md:text-7xl lg:text-[88px]"
              style={{ fontFamily: 'var(--font-inter-tight), sans-serif' }}
            >
              About Us
            </h2>
          </FadeIn>

          <div className="mt-4 flex max-w-[660px] flex-col items-center">
            <AnimatedText
              text="Founded on the belief that digital flagships and snackable reels should feel as tactile, warm, and memorable as physical craft."
              className="justify-center text-center text-base leading-relaxed text-[#5E5E61] sm:text-lg md:text-[20px] dark:text-[#A3B8AC]"
            />
          </div>

          {/* Handwritten Caveat Note & Arrow on Desktop (echoing Reelmark Services) */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-4 right-4 hidden lg:block xl:right-16"
          >
            <p
              className="rotate-[12deg] text-[26px] leading-[0.95] font-semibold text-[#08482D] dark:text-[#6EE7B7]"
              style={{ fontFamily: 'var(--font-caveat), cursive' }}
            >
              Crafted with
              <br />
              human touch
            </p>
            <svg
              viewBox="0 0 90 95"
              className="mt-1 ml-6 h-[76px] w-[72px] fill-none stroke-[#08482D] dark:stroke-[#6EE7B7]"
            >
              <path
                d="M42 4 C 58 28, 54 58, 22 82"
                strokeWidth="2.4"
                strokeLinecap="round"
              />
              <path
                d="M34 83 L 19 84 L 24 70"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        {/* Main Founder Showcase Card (Same rounded-[40px..60px] & border-2 style as Work Cards) */}
        <FadeIn y={36} delay={0.15} duration={0.8}>
          <article
            data-testid="about-founder-card"
            className="relative w-full rounded-[40px] border-2 border-[#C5D8B2] bg-[#FFFFFF] p-4 shadow-[0_28px_70px_-18px_rgba(8,72,45,0.14)] transition-colors duration-300 sm:rounded-[50px] sm:p-6 md:rounded-[60px] md:p-8 lg:p-10 dark:border-[#1F4734] dark:bg-[#0F2118] dark:shadow-[0_28px_70px_-18px_rgba(0,0,0,0.65)]"
          >
            <div className="flex flex-col gap-6 lg:flex-row lg:items-stretch lg:gap-10">
              {/* Left Column: Founder Rounded-Corner Portrait */}
              <div className="w-full lg:w-[42%]">
                <div
                  data-testid="founder-portrait-frame"
                  className="group relative h-[clamp(320px,46vw,540px)] w-full overflow-hidden rounded-[32px] border border-[#08482D]/12 bg-[#DAE7C7] sm:rounded-[44px] md:rounded-[52px] lg:h-full lg:min-h-[490px]"
                >
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1200&q=85"
                    alt="Soren Lindqvist — Founder and Creative Director of INGO Studio"
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  {/* Soft botanical gradient vignette */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#08482D]/65 via-[#08482D]/10 to-transparent" />

                  {/* Top-left floating studio badge */}
                  <div className="absolute top-4 left-4 inline-flex items-center gap-2 rounded-full border border-white/30 bg-[#08482D]/80 px-3.5 py-1.5 text-xs font-medium tracking-wide text-[#F5F8EF] backdrop-blur-md sm:top-5 sm:left-5">
                    <span className="h-2 w-2 rounded-full bg-[#DAE7C7]" />
                    <span>12+ Years in Digital Craft</span>
                  </div>

                  {/* Bottom Frosted Founder Identity Bar */}
                  <div className="absolute inset-x-4 bottom-4 flex items-end justify-between rounded-[24px] border border-white/25 bg-[#101410]/65 p-4 text-white backdrop-blur-md sm:inset-x-5 sm:bottom-5 sm:rounded-[30px] sm:p-5">
                    <div>
                      <span className="inline-block rounded-full bg-[#DAE7C7] px-2.5 py-0.5 text-[10px] font-semibold tracking-widest text-[#08482D] uppercase">
                        Founder &amp; Creative Lead
                      </span>
                      <h3
                        className="mt-1.5 text-xl font-bold tracking-[-0.02em] text-white sm:text-2xl"
                        style={{
                          fontFamily: 'var(--font-inter-tight), sans-serif',
                        }}
                      >
                        Soren Lindqvist
                      </h3>
                      <p className="text-xs text-white/80 sm:text-sm">
                         Creative Direction · Brand Systems · Motion
                      </p>
                    </div>

                    <span
                      className="hidden rotate-[-6deg] text-2xl text-[#DAE7C7] sm:block"
                      style={{ fontFamily: 'var(--font-caveat), cursive' }}
                    >
                      Soren L.
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column: Founder Story, 3 Pillars & Actions */}
              <div className="flex w-full flex-col justify-between lg:w-[58%]">
                <div>
                  {/* Top Row inside Card (matching Work Card typography) */}
                  <div className="mb-4 flex flex-col gap-3 border-b border-[#08482D]/12 pb-4 sm:mb-5 sm:flex-row sm:items-center sm:justify-between sm:pb-5 dark:border-[#1F4734]">
                    <div className="flex flex-wrap items-baseline gap-3 sm:gap-4">
                      <span
                        className="text-4xl leading-none font-bold tracking-[-0.04em] text-[#08482D] sm:text-5xl dark:text-[#6EE7B7]"
                        style={{
                          fontFamily: 'var(--font-inter-tight), sans-serif',
                        }}
                      >
                        01
                      </span>
                      <span className="inline-flex w-fit items-center rounded-full bg-[#DAE7C7] px-3.5 py-1 text-xs font-medium tracking-wide text-[#08482D] uppercase sm:text-sm dark:bg-[#163828] dark:text-[#A7F3D0]">
                        Founder&apos;s Note
                      </span>
                      <h3
                        className="text-2xl font-bold tracking-[-0.025em] text-[#101410] sm:text-3xl dark:text-[#F4F9F5]"
                        style={{
                          fontFamily: 'var(--font-inter-tight), sans-serif',
                        }}
                      >
                        Built for Category Leaders
                      </h3>
                    </div>

                    <span className="text-xs font-medium tracking-widest text-[#5E5E61] uppercase dark:text-[#A3B8AC]">
                      Est. 2018 · Independent
                    </span>
                  </div>

                  {/* Concise 2-3 Line Founder Description */}
                  <p
                    data-testid="about-founder-description"
                    className="mb-5 text-sm leading-relaxed text-[#5E5E61] sm:mb-6 sm:text-base md:text-[17px] dark:text-[#A3B8AC]"
                  >
                    We started INGO &amp; Reelmark to bridge the gap between high-craft brand architecture and fast-moving product storytelling. Working directly with founders, our senior crew shapes web flagships and snackable reels that turn first impressions into lasting loyalty.
                  </p>

                  {/* 3 Rounded Pillar Cards */}
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
                    {STUDIO_PILLARS.map((pillar) => (
                      <div
                        key={pillar.number}
                        className="rounded-[28px] border border-[#C5D8B2]/80 bg-[#F5F8EF] p-4 transition-all duration-300 hover:-translate-y-0.5 sm:rounded-[32px] sm:p-5 dark:border-[#1F4734] dark:bg-[#132A1F]"
                      >
                        <div className="flex items-center justify-between">
                          <span className="rounded-full bg-[#DAE7C7] px-2.5 py-0.5 text-[11px] font-semibold text-[#08482D] dark:bg-[#163828] dark:text-[#A7F3D0]">
                            {pillar.number}
                          </span>
                          <span className="text-[11px] font-medium tracking-wider text-[#5E5E61] uppercase dark:text-[#A3B8AC]">
                            Impact
                          </span>
                        </div>
                        <div
                          className="mt-3 text-3xl font-bold tracking-[-0.035em] text-[#08482D] sm:text-4xl dark:text-[#6EE7B7]"
                          style={{
                            fontFamily: 'var(--font-inter-tight), sans-serif',
                          }}
                        >
                          {pillar.metric}
                        </div>
                        <div className="mt-1 text-sm font-semibold text-[#101410] dark:text-[#F4F9F5]">
                          {pillar.label}
                        </div>
                        <p className="mt-1 text-xs leading-relaxed text-[#5E5E61] dark:text-[#A3B8AC]">
                          {pillar.detail}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom CTA & Signature Bar */}
                <div className="mt-6 flex flex-col gap-4 border-t border-[#08482D]/12 pt-5 sm:mt-8 sm:flex-row sm:items-center sm:justify-between dark:border-[#1F4734]">
                  <div className="flex flex-wrap items-center gap-3">
                    <ContactButton
                      label="Contact Me"
                      onClick={() => {
                        const contactEl = document.getElementById('contact');
                        contactEl?.scrollIntoView({ behavior: 'smooth' });
                      }}
                    />
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-left sm:text-right">
                      <div className="text-xs font-semibold tracking-wider text-[#08482D] uppercase dark:text-[#6EE7B7]">
                        Direct Founder Access
                      </div>
                      <div className="text-xs text-[#5E5E61] dark:text-[#A3B8AC]">
                        Stockholm · New York · Remote
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </FadeIn>
      </div>
    </section>
  );
});
