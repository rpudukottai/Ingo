'use client';

import React from 'react';
import { Sparkles, AudioLines, Waves } from 'lucide-react';

interface PillVisualProps {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  isMobile: boolean;
  mobilePillWidthPx?: number;
  mobileFinalHeightPx?: number;
  prefersReducedMotion: boolean;
  hairlineOverlayOpacity: number;
  pillIconsOpacity: number;
  visualControlActive: boolean;
  onToggleVisualControl: () => void;
  recTimeSec: number | null;
}

export const PillVisual = React.memo(function PillVisual({
  videoRef,
  isMobile,
  mobilePillWidthPx = 164,
  mobileFinalHeightPx = 72.9,
  prefersReducedMotion,
  hairlineOverlayOpacity,
  pillIconsOpacity,
  visualControlActive,
  onToggleVisualControl,
  recTimeSec,
}: PillVisualProps) {
  const phaseShift = recTimeSec !== null ? (recTimeSec * 24) % 360 : 0;

  return (
    <div
      className="relative h-full w-full overflow-hidden rounded-full bg-[#1E293B]"
      data-testid="hero-pill-inner"
    >
      {/* Fixed-aspect inner media stage so the visual reveals naturally without stretching */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden"
        style={
          isMobile
            ? {
                width: `${mobilePillWidthPx}px`,
                height: `${mobileFinalHeightPx}px`,
              }
            : {
                width: '2.24em',
                height: '1.12em',
              }
        }
      >
        {/* High-impact iridescent sapphire, violet, and sunlit crystal backdrop */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(64% 80% at 62% 34%, rgba(96, 165, 250, 0.85) 0%, rgba(65, 105, 255, 0.65) 38%, rgba(30, 27, 75, 0.95) 82%),
              radial-gradient(54% 68% at 26% 72%, rgba(167, 139, 250, 0.78) 0%, rgba(124, 58, 237, 0.52) 45%, rgba(15, 23, 42, 0.96) 88%),
              linear-gradient(130deg, #0F172A 0%, #1E3A8A 42%, #3B82F6 74%, #311068 100%)
            `,
          }}
        />

        {/* Local seamless-looping HTML5 video (100% opaque inside the pill) */}
        <video
          ref={videoRef}
          src="/videos/agency-hero.mp4"
          poster="/images/agency-hero-poster.webp"
          muted
          loop
          playsInline
          autoPlay={!prefersReducedMotion}
          preload="auto"
          aria-label="Luminous architectural glass sculpture with sapphire and violet light refraction"
          className="absolute inset-0 h-full w-full object-cover opacity-100"
        />

        {/* Architectural crystal prisms, refractive glass rings, and luminous light ribbons */}
        <svg
          viewBox="0 0 720 360"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full"
        >
          <defs>
            <linearGradient id="pill-light-prism-1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.58" />
              <stop offset="42%" stopColor="#93C5FD" stopOpacity="0.34" />
              <stop offset="100%" stopColor="#1E3A8A" stopOpacity="0.08" />
            </linearGradient>
            <linearGradient id="pill-light-prism-2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.68" />
              <stop offset="48%" stopColor="#C4B5FD" stopOpacity="0.38" />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.12" />
            </linearGradient>
            <linearGradient id="pill-ribbon-bright" x1="0%" y1="65%" x2="100%" y2="15%">
              <stop offset="0%" stopColor="#60A5FA" stopOpacity="0" />
              <stop offset="28%" stopColor="#93C5FD" stopOpacity="0.92" />
              <stop offset="58%" stopColor="#FFFFFF" stopOpacity="1" />
              <stop offset="84%" stopColor="#C4B5FD" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="pill-ribbon-violet" x1="0%" y1="85%" x2="100%" y2="10%">
              <stop offset="0%" stopColor="#C4B5FD" stopOpacity="0" />
              <stop offset="42%" stopColor="#DDD6FE" stopOpacity="0.88" />
              <stop offset="72%" stopColor="#FFFFFF" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#60A5FA" stopOpacity="0" />
            </linearGradient>
            <radialGradient id="pill-sunlit-flare" cx="56%" cy="38%" r="48%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.72" />
              <stop offset="28%" stopColor="#93C5FD" stopOpacity="0.52" />
              <stop offset="62%" stopColor="#8B5CF6" stopOpacity="0.28" />
              <stop offset="100%" stopColor="#0F172A" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Sunlit iridescent core flare */}
          <ellipse
            cx={395 + (phaseShift % 24)}
            cy="148"
            rx="245"
            ry="145"
            fill="url(#pill-sunlit-flare)"
          />

          {/* Refractive architectural glass fins */}
          <g transform={`translate(${(phaseShift % 18) - 9}, 0)`}>
            <polygon
              points="125,360 248,28 378,28 255,360"
              fill="url(#pill-light-prism-1)"
              stroke="#FFFFFF"
              strokeOpacity="0.48"
              strokeWidth="1"
            />
            <polygon
              points="268,360 398,8 548,8 418,360"
              fill="url(#pill-light-prism-2)"
              stroke="#FFFFFF"
              strokeOpacity="0.65"
              strokeWidth="1.25"
            />
            <polygon
              points="432,360 538,48 656,48 550,360"
              fill="url(#pill-light-prism-1)"
              stroke="#DDD6FE"
              strokeOpacity="0.45"
              strokeWidth="1"
            />
          </g>

          {/* Concentric optical glass rings */}
          <circle
            cx="398"
            cy="168"
            r="112"
            stroke="#FFFFFF"
            strokeOpacity="0.28"
            strokeWidth="0.9"
            fill="none"
          />
          <circle
            cx="398"
            cy="168"
            r="72"
            stroke="#93C5FD"
            strokeOpacity="0.42"
            strokeWidth="1"
            fill="none"
          />

          {/* Precision horizon lines */}
          <line
            x1="50"
            y1="252"
            x2="670"
            y2="252"
            stroke="#FFFFFF"
            strokeOpacity="0.24"
            strokeWidth="0.75"
          />
          <line
            x1="95"
            y1="112"
            x2="625"
            y2="112"
            stroke="#DBEAFE"
            strokeOpacity="0.32"
            strokeWidth="0.75"
          />

          {/* Sweeping luminous light trails */}
          <path
            d="M -40 292 C 165 268, 285 88, 508 118 C 620 132, 690 70, 760 40"
            fill="none"
            stroke="url(#pill-ribbon-bright)"
            strokeWidth={visualControlActive ? '3.0' : '2.2'}
            strokeLinecap="round"
          />
          <path
            d="M -20 328 C 205 292, 338 144, 540 160 C 640 168, 700 105, 770 80"
            fill="none"
            stroke="url(#pill-ribbon-violet)"
            strokeWidth={visualControlActive ? '2.4' : '1.7'}
            strokeLinecap="round"
          />
          <path
            d="M 15 215 C 185 185, 345 58, 558 86 C 650 98, 710 55, 760 25"
            fill="none"
            stroke="url(#pill-ribbon-bright)"
            strokeWidth="1.3"
            strokeOpacity="0.85"
            strokeLinecap="round"
          />

          {/* Specular optical nodes */}
          <circle cx="408" cy="112" r="3.5" fill="#FFFFFF" />
          <circle
            cx="408"
            cy="112"
            r="11"
            stroke="#FFFFFF"
            strokeOpacity="0.65"
            strokeWidth="1.1"
            fill="none"
          />
          <circle cx="278" cy="192" r="3" fill="#DDD6FE" />
        </svg>

        {/* Inner specular glass rim highlight */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-full shadow-[inset_0_2px_4px_rgba(255,255,255,0.65),inset_0_-12px_28px_rgba(15,23,42,0.38)]"
        />
      </div>

      {/* Left & Right Pill Icons (frosted pearl glass controls, ~85% opacity after 80%) */}
      <div
        className={`pointer-events-none absolute inset-0 z-10 flex items-center justify-between ${
          isMobile ? 'px-2.5' : 'px-3 sm:px-4 md:px-5'
        }`}
        style={{ opacity: pillIconsOpacity }}
      >
        <span
          aria-hidden="true"
          className={`inline-flex items-center justify-center rounded-full border border-white/65 bg-white/80 text-[#0A0D14] shadow-sm backdrop-blur-md ${
            isMobile ? 'h-5 w-5' : 'h-7 w-7'
          }`}
        >
          <Sparkles
            className={`stroke-[1.85] text-[#2563EB] ${
              isMobile ? 'h-2.5 w-2.5' : 'h-3 w-3'
            }`}
          />
        </span>

        <button
          type="button"
          onClick={onToggleVisualControl}
          aria-pressed={visualControlActive}
          aria-label={
            visualControlActive
              ? 'Switch hero visual ambiance to standard mode'
              : 'Switch hero visual ambiance to luminous wave mode'
          }
          className={`pointer-events-auto inline-flex cursor-pointer items-center justify-center rounded-full border border-white/75 bg-white/85 text-[#0A0D14] shadow-sm backdrop-blur-md transition-transform duration-200 hover:scale-105 hover:bg-white focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:outline-none ${
            isMobile ? 'h-5 w-5' : 'h-7 w-7'
          }`}
        >
          {visualControlActive ? (
            <Waves
              className={`stroke-[2] text-[#2563EB] ${
                isMobile ? 'h-2.5 w-2.5' : 'h-3 w-3'
              }`}
            />
          ) : (
            <AudioLines
              className={`stroke-[1.85] text-[#0A0D14] ${
                isMobile ? 'h-2.5 w-2.5' : 'h-3 w-3'
              }`}
            />
          )}
        </button>
      </div>

      {/* Architectural Hairline Overlay: visible 0%..14%, fades out 14%..30% */}
      <div
        aria-hidden="true"
        data-testid="hairline-overlay"
        className="pointer-events-none absolute inset-0 z-20 bg-[#64748B]"
        style={{
          opacity: hairlineOverlayOpacity,
        }}
      />
    </div>
  );
});
