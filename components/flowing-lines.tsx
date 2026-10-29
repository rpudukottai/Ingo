'use client';

import React, { useEffect, useRef } from 'react';
import {
  HERO_STRING_CONFIGS,
  computeAnimatedStringPath,
  computeStringPulseDashOffset,
  shouldAnimateHeroStrings,
} from '@/lib/flowing-lines';

interface FlowingLinesProps {
  opacity: number;
  prefersReducedMotion?: boolean;
}

const STRING_FRAME_INTERVAL_MS = 40;

export const FlowingLines = React.memo(function FlowingLines({
  opacity,
  prefersReducedMotion = false,
}: FlowingLinesProps) {
  const basePathRefs = useRef<(SVGPathElement | null)[]>([]);
  const pulsePathRefs = useRef<(SVGPathElement | null)[]>([]);

  const isVisible = opacity > 0.01;

  useEffect(() => {
    let rafId: number | null = null;
    let isDocHidden = typeof document !== 'undefined' ? document.hidden : false;

    const pointerTarget = { normX: 0, normY: 0, active: false };
    const pointerCurrent = { normX: 0, normY: 0, active: false };

    const canAnimate = () =>
      shouldAnimateHeroStrings({
        isVisible,
        isDocumentHidden: isDocHidden,
        prefersReducedMotion,
      }) &&
      (typeof document === 'undefined' ||
        document.documentElement.dataset.freezeStringsForScreenshot !== 'true');

    const handlePointerMove = (e: PointerEvent) => {
      if (!canAnimate()) return;
      const vw = Math.max(window.innerWidth, 1);
      const vh = Math.max(window.innerHeight, 1);
      pointerTarget.normX = (e.clientX / vw) * 2 - 1;
      pointerTarget.normY = (e.clientY / vh) * 2 - 1;
      pointerTarget.active = true;
    };

    const handlePointerLeave = () => {
      pointerTarget.active = false;
      pointerTarget.normX = 0;
      pointerTarget.normY = 0;
    };

    const startTime = performance.now();
    let lastUpdateMs = -STRING_FRAME_INTERVAL_MS;

    const tick = (now: number) => {
      if (!canAnimate()) {
        rafId = null;
        return;
      }

      if (now - lastUpdateMs >= STRING_FRAME_INTERVAL_MS) {
        lastUpdateMs = now;
        const elapsedSec = (now - startTime) / 1000;

        pointerCurrent.normX +=
          (pointerTarget.normX - pointerCurrent.normX) * 0.14;
        pointerCurrent.normY +=
          (pointerTarget.normY - pointerCurrent.normY) * 0.14;
        pointerCurrent.active =
          pointerTarget.active ||
          Math.abs(pointerCurrent.normX) > 0.005 ||
          Math.abs(pointerCurrent.normY) > 0.005;

        for (let i = 0; i < HERO_STRING_CONFIGS.length; i++) {
          const stroke = HERO_STRING_CONFIGS[i]!;
          const d = computeAnimatedStringPath(
            stroke,
            elapsedSec,
            pointerCurrent
          );

          const baseEl = basePathRefs.current[i];
          if (baseEl) {
            baseEl.setAttribute('d', d);
          }

          if (stroke.hasPulse) {
            const pulseEl = pulsePathRefs.current[i];
            if (pulseEl) {
              pulseEl.setAttribute('d', d);
              const dashOffset = computeStringPulseDashOffset(
                stroke,
                elapsedSec
              );
              pulseEl.style.strokeDashoffset = `${dashOffset}`;
            }
          }
        }
      }

      rafId = requestAnimationFrame(tick);
    };

    const syncLoop = () => {
      isDocHidden = document.hidden;
      if (canAnimate()) {
        if (rafId === null) {
          rafId = requestAnimationFrame(tick);
        }
      } else if (rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
    };

    syncLoop();

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerleave', handlePointerLeave, {
      passive: true,
    });
    document.addEventListener('visibilitychange', syncLoop);

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerleave', handlePointerLeave);
      document.removeEventListener('visibilitychange', syncLoop);
    };
  }, [isVisible, prefersReducedMotion]);

  return (
    <div
      aria-hidden="true"
      data-testid="flowing-lines-container"
      data-lively={isVisible && !prefersReducedMotion ? 'true' : 'false'}
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#F6F8FC] transition-colors duration-300 dark:bg-[#050C08]"
      style={{
        opacity,
      }}
    >
      {/* Light mode: Luminous gallery daylight architectural washes */}
      <div
        className="absolute inset-0 dark:hidden"
        style={{
          background: `
            radial-gradient(64% 56% at 50% 43%, rgba(65, 105, 255, 0.12) 0%, rgba(139, 92, 246, 0.08) 44%, rgba(246, 248, 252, 0) 76%),
            radial-gradient(48% 44% at 82% 18%, rgba(139, 92, 246, 0.09) 0%, rgba(246, 248, 252, 0) 70%),
            radial-gradient(52% 48% at 16% 82%, rgba(59, 130, 246, 0.08) 0%, rgba(246, 248, 252, 0) 72%),
            linear-gradient(180deg, #FFFFFF 0%, #F4F6FB 54%, #EEF2FA 100%)
          `,
        }}
      />

      {/* Dark mode: High-contrast obsidian & emerald gallery washes */}
      <div
        className="hidden dark:absolute dark:inset-0 dark:block"
        style={{
          background: `
            radial-gradient(64% 56% at 50% 43%, rgba(16, 185, 129, 0.16) 0%, rgba(59, 130, 246, 0.10) 44%, rgba(5, 12, 8, 0) 76%),
            radial-gradient(48% 44% at 82% 18%, rgba(52, 211, 153, 0.11) 0%, rgba(5, 12, 8, 0) 70%),
            radial-gradient(52% 48% at 16% 82%, rgba(16, 185, 129, 0.09) 0%, rgba(5, 12, 8, 0) 72%),
            linear-gradient(180deg, #050C08 0%, #08130D 54%, #0A1810 100%)
          `,
        }}
      />

      {/* Subtle architectural drafting grid accents */}
      <div
        className="absolute inset-0 opacity-[0.35] dark:opacity-[0.22]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(148, 163, 184, 0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(148, 163, 184, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: '120px 120px',
        }}
      />

      {/* 16 Lively, Undulating SVG Strings + Traveling Luminous Energy Pulses */}
      <svg
        data-testid="flowing-lines-svg"
        viewBox="0 0 1440 960"
        preserveAspectRatio="none"
        className="relative h-full w-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="ingo-light-blue" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#94A3B8" stopOpacity="0.08" />
            <stop offset="32%" stopColor="#2563EB" stopOpacity="0.82" />
            <stop offset="70%" stopColor="#10B981" stopOpacity="0.64" />
            <stop offset="100%" stopColor="#2563EB" stopOpacity="0.12" />
          </linearGradient>

          <linearGradient id="ingo-light-violet" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#94A3B8" stopOpacity="0.06" />
            <stop offset="38%" stopColor="#7C3AED" stopOpacity="0.78" />
            <stop offset="76%" stopColor="#3B82F6" stopOpacity="0.56" />
            <stop offset="100%" stopColor="#7C3AED" stopOpacity="0.10" />
          </linearGradient>

          <linearGradient id="ingo-light-slate" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#94A3B8" stopOpacity="0.06" />
            <stop offset="46%" stopColor="#475569" stopOpacity="0.64" />
            <stop offset="82%" stopColor="#34D399" stopOpacity="0.42" />
            <stop offset="100%" stopColor="#94A3B8" stopOpacity="0.08" />
          </linearGradient>

          <linearGradient id="ingo-light-accent" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#2563EB" stopOpacity="0.12" />
            <stop offset="42%" stopColor="#2563EB" stopOpacity="0.95" />
            <stop offset="68%" stopColor="#10B981" stopOpacity="0.86" />
            <stop offset="100%" stopColor="#34D399" stopOpacity="0.22" />
          </linearGradient>

          {/* High-luminance traveling energy pulse gradients */}
          <linearGradient id="ingo-pulse-blue" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.12" />
            <stop offset="45%" stopColor="#2563EB" stopOpacity="0.92" />
            <stop offset="75%" stopColor="#34D399" stopOpacity="0.88" />
            <stop offset="100%" stopColor="#60A5FA" stopOpacity="0.15" />
          </linearGradient>

          <linearGradient id="ingo-pulse-emerald" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#34D399" stopOpacity="0.12" />
            <stop offset="45%" stopColor="#10B981" stopOpacity="0.92" />
            <stop offset="75%" stopColor="#3B82F6" stopOpacity="0.88" />
            <stop offset="100%" stopColor="#34D399" stopOpacity="0.15" />
          </linearGradient>

          <linearGradient id="ingo-pulse-violet" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#A78BFA" stopOpacity="0.12" />
            <stop offset="45%" stopColor="#7C3AED" stopOpacity="0.92" />
            <stop offset="75%" stopColor="#2563EB" stopOpacity="0.86" />
            <stop offset="100%" stopColor="#A78BFA" stopOpacity="0.15" />
          </linearGradient>
        </defs>

        {/* Base undulating strings */}
        <g data-testid="flowing-lines-base-layer">
          {HERO_STRING_CONFIGS.map((stroke, idx) => {
            const initialPath = computeAnimatedStringPath(stroke, 0);
            return (
              <path
                key={stroke.id}
                ref={(el) => {
                  basePathRefs.current[idx] = el;
                }}
                data-testid="flowing-line-base"
                data-string-id={stroke.id}
                d={initialPath}
                stroke={stroke.grad}
                strokeWidth={stroke.width}
                strokeOpacity={stroke.opacity}
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
              />
            );
          })}
        </g>

        {/* Traveling luminous pulse streams gliding upward-right along key strings */}
        <g data-testid="flowing-lines-pulse-layer">
          {HERO_STRING_CONFIGS.map((stroke, idx) => {
            if (!stroke.hasPulse) return null;
            const initialPath = computeAnimatedStringPath(stroke, 0);
            const initialOffset = computeStringPulseDashOffset(stroke, 0);
            return (
              <path
                key={`${stroke.id}-pulse`}
                ref={(el) => {
                  pulsePathRefs.current[idx] = el;
                }}
                data-testid="flowing-line-pulse"
                data-string-id={stroke.id}
                d={initialPath}
                stroke={stroke.pulseGrad ?? stroke.grad}
                strokeWidth={stroke.pulseWidth ?? stroke.width * 1.75}
                strokeOpacity={stroke.pulseOpacity ?? 0.72}
                strokeLinecap="round"
                strokeDasharray={stroke.pulseDashArray}
                style={{ strokeDashoffset: `${initialOffset}` }}
                vectorEffect="non-scaling-stroke"
              />
            );
          })}
        </g>
      </svg>
    </div>
  );
});
