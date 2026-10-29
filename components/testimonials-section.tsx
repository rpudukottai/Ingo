'use client';

import React, { useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  Quote,
  ChevronLeft,
  ChevronRight,
  Star,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import {
  CLIENT_TESTIMONIALS,
  getNextTestimonialIndex,
  getPrevTestimonialIndex,
  wrapTestimonialIndex,
} from '@/lib/testimonials';
import { FadeIn, AnimatedText, Magnet } from './reusable-ui';

export const TestimonialsSection = React.memo(function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [direction, setDirection] = useState<number>(1);

  const total = CLIENT_TESTIMONIALS.length;
  const activeItem =
    CLIENT_TESTIMONIALS[wrapTestimonialIndex(activeIndex, total)];

  const handleNext = useCallback(() => {
    setDirection(1);
    setActiveIndex((prev) => getNextTestimonialIndex(prev, total));
  }, [total]);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setActiveIndex((prev) => getPrevTestimonialIndex(prev, total));
  }, [total]);

  const handleSelectIndex = useCallback(
    (targetIndex: number) => {
      const normalized = wrapTestimonialIndex(targetIndex, total);
      if (normalized === activeIndex) return;
      setDirection(normalized > activeIndex ? 1 : -1);
      setActiveIndex(normalized);
    },
    [activeIndex, total]
  );

  const handleTabKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      }
    },
    [handleNext, handlePrev]
  );


  return (
    <section
      id="testimonials"
      data-testid="testimonials-section"
      aria-label="Client Testimonials — Partner Reviews"
      className="relative z-40 -mt-10 w-full rounded-t-[40px] border-t-2 border-[#C5D8B2] bg-[#F5F8EF] px-5 pt-16 pb-28 shadow-[0_-24px_60px_rgba(8,72,45,0.08)] transition-colors duration-300 sm:-mt-12 sm:rounded-t-[50px] sm:px-10 sm:pt-20 sm:pb-36 md:-mt-14 md:rounded-t-[60px] md:pt-24 md:pb-44 lg:px-14 dark:border-[#1F4734] dark:bg-[#0A1610] dark:shadow-[0_-24px_60px_rgba(0,0,0,0.5)]"
    >
      <div className="mx-auto w-full">
        {/* Section Header — Synced with Services, Work, About, and Trusted By */}
        <div className="relative mb-12 flex flex-col items-center text-center md:mb-16">
          <FadeIn y={20} duration={0.6}>
            <div className="inline-flex h-[38px] items-center justify-center rounded-full bg-[#DAE7C7] px-5 text-[15px] font-medium text-[#08482D] sm:text-[16.5px] dark:bg-[#163828] dark:text-[#A7F3D0]">
              Client Testimonials
            </div>
          </FadeIn>

          <FadeIn y={28} delay={0.1} duration={0.7}>
            <h2
              className="hero-heading mt-4 bg-gradient-to-br from-[#101410] via-[#08482D] to-[#2E7D52] bg-clip-text text-5xl leading-[1.02] font-bold tracking-[-0.035em] text-transparent sm:text-6xl md:text-7xl lg:text-[88px]"
              style={{ fontFamily: 'var(--font-inter-tight), sans-serif' }}
            >
              Client Stories
            </h2>
          </FadeIn>

          <div className="mt-4 flex max-w-[650px] flex-col items-center">
            <AnimatedText
              text="What founders, brand directors, and product leaders say about building their flagship digital experiences and reel engines with us."
              className="justify-center text-center text-base leading-relaxed text-[#5E5E61] sm:text-lg md:text-[20px] dark:text-[#A3B8AC]"
            />
          </div>

          {/* Handwritten Caveat Note & Arrow on Desktop */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-4 right-4 hidden lg:block xl:right-16"
          >
            <p
              className="rotate-[10deg] text-[26px] leading-[0.95] font-semibold text-[#08482D] dark:text-[#6EE7B7]"
              style={{ fontFamily: 'var(--font-caveat), cursive' }}
            >
              Loved by
              <br />
              founders
            </p>
            <svg
              viewBox="0 0 90 95"
              className="mt-1 ml-6 h-[74px] w-[70px] fill-none stroke-[#08482D] dark:stroke-[#6EE7B7]"
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

        {/* Main Rounded Carousel Card (Typography-Focused, No Client Images) */}
        <FadeIn y={32} duration={0.75}>
          <div className="relative overflow-hidden rounded-[40px] border-2 border-[#C5D8B2] bg-[#FFFFFF] p-6 shadow-[0_24px_60px_rgba(8,72,45,0.08)] transition-colors duration-300 sm:rounded-[50px] sm:p-8 md:rounded-[60px] md:p-10 lg:p-12 dark:border-[#1F4734] dark:bg-[#0F2118] dark:shadow-[0_24px_60px_rgba(0,0,0,0.65)]">
            {/* Subtle decorative radial glow */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-24 -right-24 h-80 w-80 rounded-full bg-[#DAE7C7]/35 blur-3xl dark:bg-[#10B981]/15"
            />

            {/* Top Carousel Header Bar */}
            <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 border-b border-[#C5D8B2]/70 pb-5 dark:border-[#1F4734]">
              <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                <span
                  data-testid="testimonial-counter"
                  className="inline-flex items-center rounded-full border border-[#C5D8B2] bg-[#F5F8EF] px-4 py-1.5 text-xs font-bold tracking-[0.16em] text-[#08482D] uppercase sm:text-sm dark:border-[#1F4734] dark:bg-[#132A1F] dark:text-[#6EE7B7]"
                >
                  {activeItem.number} / 0{total}
                </span>

                <div className="inline-flex items-center gap-2 rounded-full bg-[#DAE7C7]/70 px-3.5 py-1.5 text-xs font-semibold tracking-[0.06em] text-[#08482D] uppercase dark:bg-[#163828] dark:text-[#A7F3D0]">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#08482D] dark:text-[#34D399]" />
                  <span>Verified Partner Review</span>
                </div>

                <div
                  aria-label="5 out of 5 stars"
                  className="hidden items-center gap-1 sm:flex"
                >
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-[#08482D] text-[#08482D] dark:fill-[#34D399] dark:text-[#34D399]"
                    />
                  ))}
                </div>
              </div>

              {/* Carousel Prev / Next Controls */}
              <div className="flex items-center gap-2.5 sm:gap-3">
                <Magnet padding={28} strength={4}>
                  <button
                    type="button"
                    onClick={handlePrev}
                    data-testid="testimonial-prev"
                    aria-label="Previous testimonial"
                    className="group flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border-2 border-[#C5D8B2] bg-[#F5F8EF] text-[#101410] transition-all duration-300 hover:border-[#08482D] hover:bg-[#08482D] hover:text-white sm:h-12 sm:w-12 dark:border-[#1F4734] dark:bg-[#132A1F] dark:text-[#F4F9F5] dark:hover:border-[#34D399] dark:hover:bg-[#10B981] dark:hover:text-[#050C08]"
                  >
                    <ChevronLeft className="h-5 w-5 transition-transform duration-300 group-hover:-translate-x-0.5" />
                  </button>
                </Magnet>

                <Magnet padding={28} strength={4}>
                  <button
                    type="button"
                    onClick={handleNext}
                    data-testid="testimonial-next"
                    aria-label="Next testimonial"
                    className="group flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border-2 border-[#08482D] bg-[#08482D] text-white transition-all duration-300 hover:bg-[#101410] sm:h-12 sm:w-12 dark:border-[#10B981] dark:bg-[#10B981] dark:text-[#050C08] dark:hover:bg-[#34D399]"
                  >
                    <ChevronRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </button>
                </Magnet>
              </div>
            </div>

            {/* Active Slide Content — Full-Width Editorial Quote & Outcome */}
            <div className="relative z-10 py-7 sm:py-9 md:py-10">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={activeItem.id}
                  custom={direction}
                  initial={{ opacity: 0, x: direction * 28 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction * -28 }}
                  transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                  className="flex flex-col justify-between"
                >
                  {/* Top Meta Row: Service Tag, Impact Metric & Quote Mark */}
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
                      <span className="inline-flex items-center gap-2 rounded-full border border-[#C5D8B2] bg-[#F5F8EF] px-4 py-1.5 text-xs font-semibold tracking-[0.08em] text-[#08482D] uppercase dark:border-[#1F4734] dark:bg-[#132A1F] dark:text-[#A7F3D0]">
                        <span className="h-2 w-2 rounded-full bg-[#08482D] dark:bg-[#34D399]" />
                        {activeItem.serviceTag}
                      </span>

                      <span className="inline-flex items-center gap-1.5 rounded-full border border-[#C5D8B2] bg-[#DAE7C7]/55 px-3.5 py-1.5 text-xs font-bold tracking-[0.06em] text-[#08482D] uppercase dark:border-[#1F4734] dark:bg-[#163828] dark:text-[#6EE7B7]">
                        <Sparkles className="h-3.5 w-3.5 text-[#08482D] dark:text-[#34D399]" />
                        <span>Verified Outcome · {activeItem.impactMetric}</span>
                      </span>
                    </div>

                    <Quote
                      aria-hidden="true"
                      className="h-9 w-9 text-[#DAE7C7] sm:h-11 sm:w-11 dark:text-[#1F4734]"
                    />
                  </div>

                  {/* Quote Text */}
                  <blockquote className="mt-6 max-w-[980px] sm:mt-8">
                    <p
                      data-testid="testimonial-quote"
                      className="text-2xl leading-[1.3] font-semibold tracking-[-0.025em] text-[#101410] sm:text-3xl md:text-[32px] lg:text-[36px] dark:text-[#F4F9F5]"
                      style={{
                        fontFamily: 'var(--font-inter-tight), sans-serif',
                      }}
                    >
                      &ldquo;{activeItem.quote}&rdquo;
                    </p>
                  </blockquote>

                  {/* Client Attribution Row */}
                  <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-[#C5D8B2]/70 pt-6 sm:mt-9 dark:border-[#1F4734]">
                    <div>
                      <p
                        data-testid="testimonial-client-name"
                        className="text-xl font-bold tracking-[-0.02em] text-[#101410] sm:text-2xl dark:text-[#F4F9F5]"
                        style={{
                          fontFamily: 'var(--font-inter-tight), sans-serif',
                        }}
                      >
                        {activeItem.clientName}
                      </p>
                      <p
                        data-testid="testimonial-client-role"
                        className="mt-0.5 text-sm font-medium text-[#5E5E61] sm:text-base dark:text-[#A3B8AC]"
                      >
                        {activeItem.clientRole},{' '}
                        <span className="font-semibold text-[#08482D] dark:text-[#6EE7B7]">
                          {activeItem.company}
                        </span>
                      </p>
                    </div>

                    <div className="inline-flex items-center gap-2 rounded-full border border-[#C5D8B2]/80 bg-[#F5F8EF] px-4 py-2 text-xs font-semibold tracking-[0.1em] text-[#08482D] uppercase dark:border-[#1F4734] dark:bg-[#132A1F] dark:text-[#A7F3D0]">
                      <span>Partner · {activeItem.company}</span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Bottom Interactive Client Switcher Pills */}
            <div
              role="tablist"
              aria-label="Select client testimonial"
              onKeyDown={handleTabKeyDown}
              className="relative z-10 grid grid-cols-1 gap-3 border-t border-[#C5D8B2]/70 pt-6 sm:grid-cols-2 lg:grid-cols-4 dark:border-[#1F4734]"
            >

              {CLIENT_TESTIMONIALS.map((item, idx) => {
                const isSelected = idx === activeIndex;
                return (
                  <button
                    key={item.id}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    data-testid={`testimonial-tab-${idx}`}
                    onClick={() => handleSelectIndex(idx)}
                    className={`group flex cursor-pointer items-center justify-between gap-3 rounded-2xl border px-4 py-3.5 text-left transition-all duration-200 ${
                      isSelected
                        ? 'border-[#08482D] bg-[#08482D] text-white shadow-sm dark:border-[#34D399] dark:bg-[#163828] dark:text-[#F4F9F5]'
                        : 'border-[#C5D8B2] bg-[#F5F8EF]/70 text-[#101410] hover:border-[#08482D]/60 hover:bg-[#DAE7C7]/45 dark:border-[#1F4734] dark:bg-[#132A1F]/80 dark:text-[#F4F9F5] dark:hover:border-[#34D399]/60 dark:hover:bg-[#163828]/70'
                    }`}
                  >
                    <div className="min-w-0">
                      <p
                        className={`truncate text-sm font-bold ${
                          isSelected
                            ? 'text-white dark:text-[#F4F9F5]'
                            : 'text-[#101410] dark:text-[#F4F9F5]'
                        }`}
                      >
                        {item.clientName}
                      </p>
                      <p
                        className={`truncate text-xs font-medium ${
                          isSelected
                            ? 'text-[#DAE7C7] dark:text-[#6EE7B7]'
                            : 'text-[#5E5E61] dark:text-[#A3B8AC]'
                        }`}
                      >
                        {item.company}
                      </p>
                    </div>
                    <span
                      className={`shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-bold tracking-[0.12em] uppercase ${
                        isSelected
                          ? 'bg-white/15 text-white dark:bg-[#10B981]/25 dark:text-[#A7F3D0]'
                          : 'bg-[#DAE7C7] text-[#08482D] dark:bg-[#0F2118] dark:text-[#6EE7B7]'
                      }`}
                    >
                      {item.number}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
});
