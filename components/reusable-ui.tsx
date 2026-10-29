'use client';

import React, { useRef, useState, useMemo, useCallback } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'motion/react';
import {
  computeWordRevealRange,
  computeMagnetOffset,
} from '@/lib/render-optimization';

/* ============================================================================
   1. Magnet — Scoped pointer-following magnetic hover wrapper (Zero global listeners)
   ============================================================================ */
export interface MagnetProps {
  children: React.ReactNode;
  padding?: number;
  strength?: number;
  disabled?: boolean;
  className?: string;
}

export const Magnet = React.memo(function Magnet({
  children,
  padding = 60,
  strength = 2.6,
  disabled = false,
  className = '',
}: MagnetProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [offset, setOffset] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (disabled) return;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const next = computeMagnetOffset(
        e.clientX,
        e.clientY,
        rect,
        padding,
        strength
      );
      if (next.active) {
        setIsActive(true);
        setOffset((prev) =>
          prev.x === next.x && prev.y === next.y
            ? prev
            : { x: next.x, y: next.y }
        );
      } else if (isActive) {
        setIsActive(false);
        setOffset({ x: 0, y: 0 });
      }
    },
    [disabled, isActive, padding, strength]
  );

  const handlePointerLeave = useCallback(() => {
    setIsActive(false);
    setOffset((prev) => (prev.x === 0 && prev.y === 0 ? prev : { x: 0, y: 0 }));
  }, []);

  return (
    <div
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={`inline-block ${className}`}
      style={{
        transform: `translate3d(${offset.x.toFixed(2)}px, ${offset.y.toFixed(2)}px, 0)`,
        transition: isActive
          ? 'transform 0.25s ease-out'
          : 'transform 0.55s ease-in-out',
      }}
    >
      {children}
    </div>
  );
});

/* ============================================================================
   2. FadeIn — Pre-bound Framer Motion whileInView wrapper
   ============================================================================ */
export interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  as?: 'div' | 'section' | 'article' | 'span' | 'p';
  className?: string;
}

const MOTION_TAG_MAP = {
  div: motion.div,
  section: motion.section,
  article: motion.article,
  span: motion.span,
  p: motion.p,
} as const;

export const FadeIn = React.memo(function FadeIn({
  children,
  delay = 0,
  duration = 0.65,
  x = 0,
  y = 26,
  as = 'div',
  className = '',
}: FadeInProps) {
  const MotionComponent = MOTION_TAG_MAP[as] ?? motion.div;

  return (
    <MotionComponent
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '60px', amount: 0 }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={className}
    >
      {children}
    </MotionComponent>
  );
});

/* ============================================================================
   3. ContactButton — Rounded-full pill button with studio gradient & inner glow
   ============================================================================ */
export interface ContactButtonProps {
  label?: string;
  onClick?: () => void;
  href?: string;
  className?: string;
}

const CONTACT_BUTTON_STYLE: React.CSSProperties = {
  background:
    'linear-gradient(123deg, #042416 7%, #08482D 37%, #0F6A43 72%, #3D8B5E 100%)',
  boxShadow:
    '0px 4px 14px rgba(8, 72, 45, 0.28), 4px 4px 12px #0F6A43 inset',
  outline: '2px solid #FFFFFF',
  outlineOffset: '-3px',
};

export const ContactButton = React.memo(function ContactButton({
  label = 'Contact Me',
  onClick,
  href,
  className = '',
}: ContactButtonProps) {
  const baseClass = `inline-flex cursor-pointer items-center justify-center rounded-full px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4 text-xs sm:text-sm md:text-base font-medium uppercase tracking-widest text-white transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98] ${className}`;

  if (href) {
    return (
      <Magnet>
        <a
          href={href}
          onClick={onClick}
          className={baseClass}
          style={CONTACT_BUTTON_STYLE}
        >
          {label}
        </a>
      </Magnet>
    );
  }

  return (
    <Magnet>
      <button
        type="button"
        onClick={onClick}
        className={baseClass}
        style={CONTACT_BUTTON_STYLE}
      >
        {label}
      </button>
    </Magnet>
  );
});

/* ============================================================================
   4. LiveProjectButton — Ghost/outline pill button
   ============================================================================ */
export interface LiveProjectButtonProps {
  label?: string;
  onClick?: () => void;
  href?: string;
  className?: string;
}

export const LiveProjectButton = React.memo(function LiveProjectButton({
  label = 'Live Project',
  onClick,
  href,
  className = '',
}: LiveProjectButtonProps) {
  const baseClass = `inline-flex cursor-pointer items-center justify-center rounded-full border-2 border-[#08482D] px-8 py-3 sm:px-10 sm:py-3.5 text-sm sm:text-base font-medium uppercase tracking-widest text-[#08482D] transition-colors duration-200 hover:bg-[#08482D]/10 active:scale-[0.98] dark:border-[#34D399] dark:text-[#6EE7B7] dark:hover:bg-[#34D399]/15 ${className}`;

  if (href) {
    return (
      <Magnet strength={3.2} padding={45}>
        <a href={href} onClick={onClick} className={baseClass}>
          {label}
        </a>
      </Magnet>
    );
  }

  return (
    <Magnet strength={3.2} padding={45}>
      <button type="button" onClick={onClick} className={baseClass}>
        {label}
      </button>
    </Magnet>
  );
});

/* ============================================================================
   5. AnimatedText — Word-level scroll-reveal text animation (~85% fewer DOM nodes)
   ============================================================================ */
interface AnimatedWordProps {
  word: string;
  progress: MotionValue<number>;
  range: [number, number];
}

const AnimatedWord = React.memo(function AnimatedWord({
  word,
  progress,
  range,
}: AnimatedWordProps) {
  const opacity = useTransform(progress, range, [0.22, 1]);
  return (
    <span className="relative mr-[0.28em] inline-block">
      <span className="opacity-20 select-none" aria-hidden="true">
        {word}
      </span>
      <motion.span className="absolute inset-0" style={{ opacity }}>
        {word}
      </motion.span>
    </span>
  );
});

export interface AnimatedTextProps {
  text: string;
  className?: string;
}

export const AnimatedText = React.memo(function AnimatedText({
  text,
  className = '',
}: AnimatedTextProps) {
  const containerRef = useRef<HTMLParagraphElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.85', 'end 0.25'],
  });

  const words = useMemo(() => text.split(' ').filter(Boolean), [text]);
  const totalWords = words.length;

  return (
    <p
      ref={containerRef}
      aria-label={text}
      className={`flex flex-wrap ${className}`}
    >
      {words.map((word, wordIdx) => {
        const range = computeWordRevealRange(wordIdx, totalWords);
        return (
          <AnimatedWord
            key={wordIdx}
            word={word}
            progress={scrollYProgress}
            range={range}
          />
        );
      })}
    </p>
  );
});
