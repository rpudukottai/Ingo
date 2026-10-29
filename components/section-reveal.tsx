'use client';

import React from 'react';
import { motion, useReducedMotion, type Variants } from 'motion/react';

export const INGO_EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];
export const INGO_PILL_EASE: [number, number, number, number] = [0.4, 0, 0.2, 1];

interface RevealBlockProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  yOffset?: number;
  once?: boolean;
  amount?: number;
}

/**
 * Editorial upward reveal with subtle blur-to-crisp settling.
 */
export function RevealBlock({
  children,
  className,
  delay = 0,
  yOffset = 28,
  once = false,
  amount = 0.2,
}: RevealBlockProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: yOffset, filter: 'blur(4px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once, amount, margin: '0px 0px -40px 0px' }}
      transition={{
        duration: 0.78,
        delay,
        ease: INGO_EASE_OUT,
      }}
    >
      {children}
    </motion.div>
  );
}

interface RevealHairlineProps {
  className?: string;
  origin?: 'left' | 'center' | 'right';
  delay?: number;
  once?: boolean;
}

/**
 * Animated 1px editorial hairline divider that draws across when scrolled into view,
 * echoing the hero's central hairline and footer divider choreography.
 */
export function RevealHairline({
  className = '',
  origin = 'center',
  delay = 0,
  once = false,
}: RevealHairlineProps) {
  const prefersReducedMotion = useReducedMotion();
  const originClass =
    origin === 'left'
      ? 'origin-left'
      : origin === 'right'
      ? 'origin-right'
      : 'origin-center';

  if (prefersReducedMotion) {
    return (
      <div
        aria-hidden="true"
        className={`h-[1px] w-full bg-[#777B8C]/25 ${className}`}
      />
    );
  }

  return (
    <motion.div
      aria-hidden="true"
      className={`h-[1px] w-full bg-[#777B8C]/25 will-change-transform ${originClass} ${className}`}
      initial={{ scaleX: 0, opacity: 0.2 }}
      whileInView={{ scaleX: 1, opacity: 1 }}
      viewport={{ once, amount: 0.2 }}
      transition={{
        duration: 0.95,
        delay,
        ease: INGO_PILL_EASE,
      }}
    />
  );
}

interface RevealStaggerGroupProps {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  delayChildren?: number;
  once?: boolean;
  amount?: number;
}

export function RevealStaggerGroup({
  children,
  className,
  stagger = 0.1,
  delayChildren = 0.05,
  once = false,
  amount = 0.15,
}: RevealStaggerGroupProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  const containerVariants: Variants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: stagger,
        delayChildren,
      },
    },
  };

  return (
    <motion.div
      className={className}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount, margin: '0px 0px -30px 0px' }}
    >
      {children}
    </motion.div>
  );
}

interface RevealStaggerItemProps {
  children: React.ReactNode;
  className?: string;
  yOffset?: number;
}

export function RevealStaggerItem({
  children,
  className,
  yOffset = 26,
}: RevealStaggerItemProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: yOffset, filter: 'blur(3px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.72,
        ease: INGO_EASE_OUT,
      },
    },
  };

  return (
    <motion.div className={className} variants={itemVariants}>
      {children}
    </motion.div>
  );
}

interface RevealPillMaskProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  finalRadiusPx?: number;
  once?: boolean;
}

/**
 * Signature INGO stadium-pill clip-path reveal for visual frames and media cards.
 * Expands from a central rounded stadium capsule to the full container bounds on scroll.
 */
export function RevealPillMask({
  children,
  className,
  delay = 0.08,
  finalRadiusPx = 12,
  once = false,
}: RevealPillMaskProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={`will-change-[clip-path,transform] ${className || ''}`}
      initial={{
        clipPath: 'inset(14% 22% round 999px)',
        scale: 0.96,
        opacity: 0.4,
      }}
      whileInView={{
        clipPath: `inset(0% 0% round ${finalRadiusPx}px)`,
        scale: 1,
        opacity: 1,
      }}
      viewport={{ once, amount: 0.25 }}
      transition={{
        duration: 0.95,
        delay,
        ease: INGO_PILL_EASE,
      }}
    >
      {children}
    </motion.div>
  );
}
