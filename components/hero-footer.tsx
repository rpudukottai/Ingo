'use client';

import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import {
  HERO_FOOTER_CONTAINER_VARIANTS,
  HERO_FOOTER_ITEM_VARIANTS,
  HERO_BUTTON_ENTRANCE_VARIANTS,
} from '@/lib/hero-motion';

interface HeroFooterProps {
  translateYPercent: number;
  opacity: number;
  dividerScaleX: number;
  isMobile: boolean;
  isAnimating?: boolean;
  onStartProject: () => void;
}

export const HeroFooter = React.memo(function HeroFooter({
  translateYPercent,
  opacity,
  dividerScaleX,
  isMobile,
  onStartProject,
}: HeroFooterProps) {
  return (
    <div
      role="region"
      aria-label="Agency introduction and start project call to action"
      className="absolute right-0 bottom-0 left-0 z-30 will-change-transform"
      style={{
        transform: `translate3d(0, ${translateYPercent}%, 0)`,
        opacity,
      }}
    >
      {isMobile ? (
        /* Phone Layout (<= 720px): Full-width intro row + separate divider & CTA row, 20px margins */
        <motion.div
          variants={HERO_FOOTER_CONTAINER_VARIANTS}
          initial="hidden"
          animate="visible"
          className="mx-auto flex w-full flex-col gap-3.5 px-[20px] pt-2 pb-[20px]"
        >
          <motion.p
            variants={HERO_FOOTER_ITEM_VARIANTS}
            className="w-full text-[13px] leading-[1.5] tracking-[0.005em] text-[#475569] dark:text-[#A3B8AC]"
          >
            <span
              aria-hidden="true"
              className="float-left mr-2.5 pt-0.5 text-[28px] leading-[0.88] font-extrabold tracking-tight text-[#0A0D14] dark:text-[#F4F9F5]"
            >
              I
            </span>
            <span className="sr-only">I</span>NGO transforms ambitious ideas
            into distinctive digital experiences. From thoughtful branding to
            high-performance websites, we create digital work designed to make
            businesses stand out.
          </motion.p>

          <div className="flex w-full items-center gap-4">
            <motion.div
              variants={HERO_FOOTER_ITEM_VARIANTS}
              className="relative flex-1 overflow-hidden py-1"
            >
              <div
                aria-hidden="true"
                className="h-[1px] w-full origin-center bg-[#0A0D14]/20 will-change-transform dark:bg-[#F4F9F5]/25"
                style={{
                  transform: `scaleX(${dividerScaleX})`,
                }}
              />
            </motion.div>

            <motion.button
              type="button"
              data-testid="start-project-btn"
              variants={HERO_BUTTON_ENTRANCE_VARIANTS}
              whileHover={{ scale: 1.03, y: -1 }}
              whileTap={{ scale: 0.97 }}
              onClick={onStartProject}
              className="group relative inline-flex shrink-0 cursor-pointer items-center gap-2 rounded-full border border-[#0A0D14]/10 bg-[#0A0D14] px-4 py-2 text-[12.5px] font-medium whitespace-nowrap text-white shadow-[0_10px_28px_rgba(37,99,235,0.22)] transition-colors duration-200 hover:bg-[#08482D] focus-visible:ring-2 focus-visible:ring-[#08482D] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F6F8FC] focus-visible:outline-none dark:border-[#34D399]/30 dark:bg-[#10B981] dark:text-[#050C08] dark:hover:bg-[#34D399]"
            >
              <span>Start a Project</span>
              <ArrowUpRight className="h-3.5 w-3.5 text-white/80 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white dark:text-[#050C08]" />
            </motion.button>
          </div>
        </motion.div>
      ) : (
        /* Desktop Layout (> 720px): Slim 3-part editorial row */
        <motion.div
          variants={HERO_FOOTER_CONTAINER_VARIANTS}
          initial="hidden"
          animate="visible"
          className="mx-auto flex w-full items-center justify-between gap-8 px-10 pt-3 pb-7 lg:gap-12 lg:px-14 lg:pb-8"
        >
          {/* Left: Short agency introduction with large drop-cap initial */}
          <motion.p
            variants={HERO_FOOTER_ITEM_VARIANTS}
            className="max-w-[470px] shrink-0 text-[13px] leading-[1.52] tracking-[0.005em] text-[#475569] xl:max-w-[510px] dark:text-[#A3B8AC]"
          >
            <span
              aria-hidden="true"
              className="float-left mr-3 pt-0.5 text-[32px] leading-[0.85] font-extrabold tracking-[-0.03em] text-[#0A0D14] dark:text-[#F4F9F5]"
            >
              I
            </span>
            <span className="sr-only">I</span>NGO transforms ambitious ideas
            into distinctive digital experiences. From thoughtful branding to
            high-performance websites, we create digital work designed to make
            businesses stand out.
          </motion.p>

          {/* Middle: Thin horizontal divider that expands from its centre */}
          <motion.div
            variants={HERO_FOOTER_ITEM_VARIANTS}
            className="relative flex-1 overflow-hidden py-2"
          >
            <div
              aria-hidden="true"
              className="h-[1px] w-full origin-center bg-[#0A0D14]/20 will-change-transform dark:bg-[#F4F9F5]/25"
              style={{
                transform: `scaleX(${dividerScaleX})`,
              }}
            />
          </motion.div>

          {/* Right: Compact high-contrast obsidian/emerald pill CTA that scrolls to #contact */}
          <div className="shrink-0">
            <motion.button
              type="button"
              data-testid="start-project-btn"
              variants={HERO_BUTTON_ENTRANCE_VARIANTS}
              whileHover={{ scale: 1.03, y: -1 }}
              whileTap={{ scale: 0.97 }}
              onClick={onStartProject}
              className="group relative inline-flex cursor-pointer items-center gap-2.5 rounded-full border border-[#0A0D14]/10 bg-[#0A0D14] px-5 py-2.5 text-[13px] font-medium whitespace-nowrap text-white shadow-[0_12px_32px_rgba(37,99,235,0.22)] transition-colors duration-200 hover:bg-[#08482D] hover:shadow-[0_14px_36px_rgba(8,72,45,0.28)] focus-visible:ring-2 focus-visible:ring-[#08482D] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F6F8FC] focus-visible:outline-none dark:border-[#34D399]/30 dark:bg-[#10B981] dark:font-semibold dark:text-[#050C08] dark:shadow-[0_12px_32px_rgba(16,185,129,0.28)] dark:hover:bg-[#34D399]"
            >
              <span>Start a Project</span>
              <ArrowUpRight className="h-3.5 w-3.5 text-white/80 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white dark:text-[#050C08]" />
            </motion.button>
          </div>
        </motion.div>
      )}
    </div>
  );
});
