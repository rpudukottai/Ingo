'use client';

import React, { useRef, useState } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'motion/react';
import {
  WORK_PROJECTS,
  computeWorkCardTargetScale,
  computeWorkCardTopOffsetPx,
  computeWorkCardScrollRange,
  type WorkProject,
} from '@/lib/work-cards';
import {
  FadeIn,
  LiveProjectButton,
  ContactButton,
  AnimatedText,
} from './reusable-ui';

interface StickyWorkCardProps {
  project: WorkProject;
  index: number;
  totalCards: number;
  scrollYProgress: MotionValue<number>;
  activePreviewId: string | null;
  onTogglePreview: (id: string) => void;
}

const StickyWorkCard = React.memo(function StickyWorkCard({
  project,
  index,
  totalCards,
  scrollYProgress,
  activePreviewId,
  onTogglePreview,
}: StickyWorkCardProps) {
  const targetScale = computeWorkCardTargetScale(index, totalCards);
  const topOffsetPx = computeWorkCardTopOffsetPx(index);
  const range = computeWorkCardScrollRange(index, totalCards);

  const scale = useTransform(scrollYProgress, range, [1, targetScale]);
  const isSelected = activePreviewId === project.id;

  return (
    <div
      data-testid={`work-card-slot-${project.number}`}
      className="sticky top-24 flex h-[85vh] w-full items-start justify-center md:top-28"
    >
      <motion.article
        data-testid={`work-card-${project.number}`}
        style={{
          scale,
          top: `${topOffsetPx}px`,
        }}
        className="relative w-full origin-top rounded-[40px] border-2 border-[#C5D8B2] bg-[#F5F8EF] p-4 shadow-[0_28px_70px_-18px_rgba(8,72,45,0.14)] transition-colors duration-300 will-change-transform sm:rounded-[50px] sm:p-6 md:rounded-[60px] md:p-8 dark:border-[#1F4734] dark:bg-[#0F2118] dark:shadow-[0_28px_70px_-18px_rgba(0,0,0,0.65)]"
      >
        {/* Top Row: Huge Number, Category Label, Project Name, and Live Project Button */}
        <div className="mb-3 flex flex-col gap-3 border-b border-[#08482D]/12 pb-3 sm:mb-4 sm:flex-row sm:items-center sm:justify-between sm:pb-4 dark:border-[#1F4734]">
          <div className="flex flex-wrap items-baseline gap-3 sm:gap-5 md:gap-7">
            {/* Huge Number (same typographic style as Services) */}
            <span
              className="text-4xl leading-none font-bold tracking-[-0.04em] text-[#08482D] sm:text-5xl md:text-6xl dark:text-[#6EE7B7]"
              style={{ fontFamily: 'var(--font-inter-tight), sans-serif' }}
            >
              {project.number}
            </span>

            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-4">
              {/* Category Label Pill */}
              <span className="inline-flex w-fit items-center rounded-full bg-[#DAE7C7] px-3.5 py-1 text-xs font-medium tracking-wide text-[#08482D] uppercase sm:text-sm dark:bg-[#163828] dark:text-[#A7F3D0]">
                {project.category}
              </span>

              {/* Project Name */}
              <h3
                className="text-2xl font-bold tracking-[-0.025em] text-[#101410] sm:text-3xl md:text-4xl dark:text-[#F4F9F5]"
                style={{ fontFamily: 'var(--font-inter-tight), sans-serif' }}
              >
                {project.title}
              </h3>
            </div>
          </div>

          <div className="flex items-center">
            <LiveProjectButton
              label={isSelected ? 'Viewing Case' : 'Live Project'}
              onClick={() => onTogglePreview(project.id)}
            />
          </div>
        </div>

        {/* Concise 2–3 Line Project Description */}
        <p
          data-testid={`work-card-details-${project.number}`}
          className="mb-4 max-w-4xl text-sm leading-relaxed text-[#5E5E61] sm:mb-5 sm:text-base md:text-[17px] dark:text-[#A3B8AC]"
        >
          {project.description}
        </p>

        {/* Bottom Row: Two-Column Image Grid (Left 40% with 2 stacked images, Right 60% with 1 tall image) */}
        <div className="flex flex-col gap-3 sm:gap-4 md:flex-row">
          {/* Left Column (40% width on md+, 2-col row on mobile so card fits 85vh) */}
          <div className="grid w-full grid-cols-2 gap-3 sm:gap-4 md:flex md:w-[40%] md:flex-col">
            {/* Left Top Image: height clamp(120px, 15vw, 210px) */}
            <div
              className="group relative w-full overflow-hidden rounded-[28px] border border-[#08482D]/10 bg-[#DAE7C7] sm:rounded-[40px] md:rounded-[50px] lg:rounded-[60px]"
              style={{ height: 'clamp(120px, 15vw, 210px)' }}
            >
              <img
                src={project.col1Image1}
                alt={`${project.title} — showcase view 1`}
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#08482D]/15 via-transparent to-transparent" />
            </div>

            {/* Left Bottom Image: height clamp(120px, 15vw, 210px) on mobile, clamp(150px, 20vw, 300px) on md+ */}
            <div
              className="group relative h-[clamp(120px,15vw,210px)] w-full overflow-hidden rounded-[28px] border border-[#08482D]/10 bg-[#DAE7C7] sm:rounded-[40px] md:h-[clamp(150px,20vw,300px)] md:rounded-[50px] lg:rounded-[60px]"
            >
              <img
                src={project.col1Image2}
                alt={`${project.title} — showcase view 2`}
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#08482D]/15 via-transparent to-transparent" />
            </div>
          </div>

          {/* Right Column (60% width on md+): 1 tall image */}
          <div
            className="group relative h-[clamp(180px,26vw,300px)] w-full overflow-hidden rounded-[28px] border border-[#08482D]/10 bg-[#DAE7C7] sm:rounded-[40px] md:h-[calc(clamp(120px,15vw,210px)+clamp(150px,20vw,300px)+16px)] md:w-[60%] md:rounded-[50px] lg:rounded-[60px]"
          >
            <img
              src={project.col2Image}
              alt={`${project.title} — featured showcase`}
              loading="lazy"
              decoding="async"
              referrerPolicy="no-referrer"
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#08482D]/20 via-transparent to-transparent" />

            {/* Subtle status tag when "Live Project" is clicked */}
            {isSelected && (
              <div className="absolute right-5 bottom-5 rounded-full bg-[#08482D]/90 px-4 py-2 text-xs font-medium tracking-widest text-white uppercase backdrop-blur-md">
                {project.title} — Interactive Case Active
              </div>
            )}
          </div>
        </div>
      </motion.article>
    </div>
  );
});

export const WorkSection = React.memo(function WorkSection() {
  const stackContainerRef = useRef<HTMLDivElement | null>(null);
  const [activePreviewId, setActivePreviewId] = useState<string | null>(null);

  const { scrollYProgress } = useScroll({
    target: stackContainerRef,
    offset: ['start start', 'end end'],
  });

  const handleTogglePreview = React.useCallback((id: string) => {
    setActivePreviewId((prev) => (prev === id ? null : id));
  }, []);

  return (
    <section
      id="work"
      aria-label="Our Work — Selected Projects"
      className="relative z-10 -mt-10 w-full rounded-t-[40px] border-t-2 border-[#C5D8B2] bg-[#FFFFFF] px-5 pt-16 pb-36 shadow-[0_-24px_60px_rgba(8,72,45,0.08)] transition-colors duration-300 sm:-mt-12 sm:rounded-t-[50px] sm:px-10 sm:pt-20 sm:pb-44 md:-mt-14 md:rounded-t-[60px] md:pt-24 md:pb-56 lg:px-14 dark:border-[#1F4734] dark:bg-[#050C08] dark:shadow-[0_-24px_60px_rgba(0,0,0,0.5)]"
    >
      <div className="mx-auto w-full">
        {/* Section Header — Centered & synced with Services section axis, with full-width alignment */}
        <div className="mb-14 flex flex-col items-center text-center md:mb-16">
          <FadeIn y={20} duration={0.6}>
            <div className="inline-flex h-[38px] items-center justify-center rounded-full bg-[#DAE7C7] px-5 text-[15px] font-medium text-[#08482D] sm:text-[16.5px] dark:bg-[#163828] dark:text-[#A7F3D0]">
              Selected Case Studies
            </div>
          </FadeIn>

          <FadeIn y={28} delay={0.1} duration={0.7}>
            <h2
              className="hero-heading mt-4 bg-gradient-to-br from-[#101410] via-[#08482D] to-[#2E7D52] bg-clip-text text-5xl leading-[1.02] font-bold tracking-[-0.035em] text-transparent sm:text-6xl md:text-7xl lg:text-[88px]"
              style={{ fontFamily: 'var(--font-inter-tight), sans-serif' }}
            >
              Our Work
            </h2>
          </FadeIn>

          <div className="mt-4 flex max-w-[640px] flex-col items-center gap-6">
            <AnimatedText
              text="Crafted digital flagships, brand identities, and high-converting visual systems built to set category leaders apart."
              className="justify-center text-center text-base leading-relaxed text-[#5E5E61] sm:text-lg md:text-[20px] dark:text-[#A3B8AC]"
            />
            <FadeIn y={20} delay={0.2}>
              <ContactButton
                label="Contact Me"
                onClick={() => {
                  const contactEl = document.getElementById('contact');
                  contactEl?.scrollIntoView({ behavior: 'smooth' });
                }}
              />
            </FadeIn>
          </div>
        </div>

        {/* Sticky-Stacking Project Cards Container */}
        <div
          ref={stackContainerRef}
          data-testid="work-cards-stack"
          className="relative flex flex-col gap-12 pb-24 sm:pb-32 md:pb-40"
        >
          {WORK_PROJECTS.map((project, index) => (
            <StickyWorkCard
              key={project.id}
              project={project}
              index={index}
              totalCards={WORK_PROJECTS.length}
              scrollYProgress={scrollYProgress}
              activePreviewId={activePreviewId}
              onTogglePreview={handleTogglePreview}
            />
          ))}
        </div>
      </div>
    </section>
  );
});
