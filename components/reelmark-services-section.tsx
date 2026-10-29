'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  REELMARK_CARD_COUNT,
  computeReelmarkCardGeometry,
  buildRoundedQuadClipPath,
  computeTileCropMetrics,
} from '@/lib/reelmark-geometry';
import {
  shouldRunContinuousLoop,
  getOptimalVideoPreload,
} from '@/lib/render-optimization';

const POSTER_URL =
  'https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/b7ebb74a-8c8a-4f7e-8f80-55e2d74ecd05.webp';
const VIDEO_URL =
  'https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/04fd3d5f-99d7-476e-98a4-46c08518ffb3.mp4';

const TILE_LABELS = [
  'Sneaker studio showcase',
  'Botanical skincare splash',
  'Artisan latte pour',
  'Studio wireless headphones',
  'Greenhouse plant shop',
  'Fresh florist bouquet',
  'Ceramic pottery wheel',
  'Hydrating serum splash',
  'Top-down latte art',
  'Headphones on sculpted stand',
];

const TILE_SAGE_PALETTES = [
  'linear-gradient(155deg, #CFE3B8 0%, #97BC7E 50%, #5B8247 100%)',
  'linear-gradient(155deg, #D9EAD3 0%, #A3C692 50%, #4E7A40 100%)',
  'linear-gradient(155deg, #E2EED5 0%, #B4CFA0 50%, #6A8E54 100%)',
  'linear-gradient(155deg, #C8DFB4 0%, #8BB474 50%, #426B36 100%)',
  'linear-gradient(155deg, #D5E7C3 0%, #9CC084 50%, #547C42 100%)',
  'linear-gradient(155deg, #DCEAD0 0%, #A9C997 50%, #5F864B 100%)',
  'linear-gradient(155deg, #CEE2B9 0%, #92B87A 50%, #4A733B 100%)',
  'linear-gradient(155deg, #D7E8C8 0%, #A1C48D 50%, #577F45 100%)',
  'linear-gradient(155deg, #E0EDD4 0%, #B0CE9D 50%, #648B50 100%)',
  'linear-gradient(155deg, #CBE0B6 0%, #8EB576 50%, #466E38 100%)',
];

export const ReelmarkServicesSection = React.memo(
  function ReelmarkServicesSection() {
    const sectionRef = useRef<HTMLElement | null>(null);
    const frameRef = useRef<HTMLDivElement | null>(null);
    const badgeRef = useRef<HTMLDivElement | null>(null);
    const line1Ref = useRef<HTMLSpanElement | null>(null);
    const line2Ref = useRef<HTMLSpanElement | null>(null);
    const sublineRef = useRef<HTMLParagraphElement | null>(null);
    const cardBandRef = useRef<HTMLDivElement | null>(null);
    const buttonWrapRef = useRef<HTMLDivElement | null>(null);
    const noteSlashRef = useRef<SVGSVGElement | null>(null);
    const noteBeSeenRef = useRef<HTMLDivElement | null>(null);
    const arrowBeSeenPathRef = useRef<SVGPathElement | null>(null);
    const arrowBeSeenHeadRef = useRef<SVGPathElement | null>(null);
    const noteZeroCostRef = useRef<HTMLDivElement | null>(null);
    const arrowZeroCostPathRef = useRef<SVGPathElement | null>(null);

    const cardElsRef = useRef<(HTMLDivElement | null)[]>([]);
    const mediaElsRef = useRef<(HTMLDivElement | null)[]>([]);
    const playBadgeElsRef = useRef<(HTMLDivElement | null)[]>([]);
    const videoElsRef = useRef<(HTMLVideoElement | null)[]>([]);

    const [isPhone, setIsPhone] = useState<boolean>(false);
    const [prefersReducedMotion, setPrefersReducedMotion] =
      useState<boolean>(false);
    const [videoReady, setVideoReady] = useState<boolean>(false);
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [isIntersecting, setIsIntersecting] = useState<boolean>(false);
    const [reelPulseLabel, setReelPulseLabel] =
      useState<string>('Make a Reel');

    // Carousel physics & layout state stored in refs for 60fps updates without forced layout reads
    const scrollOffsetURef = useRef<number>(0);
    const velocityURef = useRef<number>(0);
    const isDraggingRef = useRef<boolean>(false);
    const isIntersectingRef = useRef<boolean>(false);
    const lastPointerXRef = useRef<number>(0);
    const lastDragTimeMsRef = useRef<number>(0);
    const uPxRef = useRef<number>(1);
    const viewportWidthRef = useRef<number>(1440);
    const isPhoneRef = useRef<boolean>(false);
    const entrancePlayedRef = useRef<boolean>(false);
    const pulseTimerRef = useRef<number | null>(null);


    const updateCardDomPositions = useCallback(() => {
      const uPx = uPxRef.current;
      const vw = viewportWidthRef.current;
      const phone = isPhoneRef.current;
      const offsetU = scrollOffsetURef.current;

      const phoneBandCenterY = 125;

      for (let i = 0; i < REELMARK_CARD_COUNT; i++) {
        const cardEl = cardElsRef.current[i];
        const mediaEl = mediaElsRef.current[i];
        const playEl = playBadgeElsRef.current[i];
        if (!cardEl || !mediaEl) continue;

        const geom = computeReelmarkCardGeometry(i, offsetU);
        const clipPath = buildRoundedQuadClipPath(geom, uPx);
        const tileCrop = computeTileCropMetrics(
          i,
          geom.widthU,
          geom.boxHeightU
        );

        const widthPx = geom.widthU * uPx;
        const heightPx = geom.boxHeightU * uPx;
        const leftPx = (geom.leftXU - 720) * uPx + vw * 0.5;
        const topPx = phone
          ? phoneBandCenterY -
            heightPx * 0.5 -
            12 * geom.normDistD * geom.normDistD * uPx
          : (geom.boxTopYU - 82) * uPx;

        cardEl.style.width = `${widthPx.toFixed(2)}px`;
        cardEl.style.height = `${heightPx.toFixed(2)}px`;
        cardEl.style.transform = `translate3d(${leftPx.toFixed(2)}px, ${topPx.toFixed(2)}px, 0)`;
        cardEl.style.clipPath = `path("${clipPath}")`;

        const gridW = tileCrop.gridWidthU * uPx;
        const gridH = tileCrop.gridHeightU * uPx;
        const gridLeft = tileCrop.offsetLeftU * uPx;
        const gridTop = tileCrop.offsetTopU * uPx;

        mediaEl.style.width = `${gridW.toFixed(2)}px`;
        mediaEl.style.height = `${gridH.toFixed(2)}px`;
        mediaEl.style.transform = `translate3d(${gridLeft.toFixed(2)}px, ${gridTop.toFixed(2)}px, 0)`;

        if (playEl) {
          const bottomLeftY = geom.localBottomLeftYU * uPx;
          const iconSize = Math.max(18, 28 * uPx);
          const pad = 12 * uPx;
          playEl.style.width = `${iconSize.toFixed(1)}px`;
          playEl.style.height = `${iconSize.toFixed(1)}px`;
          playEl.style.transform = `translate3d(${pad.toFixed(1)}px, ${(
            bottomLeftY -
            iconSize -
            pad
          ).toFixed(1)}px, 0)`;
        }
      }
    }, []);

    // Measure frame unit `--u` on mount and resize
    useEffect(() => {
      const updateScale = () => {
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        viewportWidthRef.current = vw;
        const phone = vw <= 820;
        isPhoneRef.current = phone;
        setIsPhone(phone);

        if (phone) {
          uPxRef.current = vw / 600;
        } else {
          uPxRef.current = Math.min(vw / 1240, vh / 920);
        }
        updateCardDomPositions();
      };

      updateScale();
      window.addEventListener('resize', updateScale, { passive: true });
      return () => window.removeEventListener('resize', updateScale);
    }, [updateCardDomPositions]);

    // Observe viewport intersection so off-screen RAF & video decoders pause cleanly
    useEffect(() => {
      const sectionEl = sectionRef.current;
      if (!sectionEl) return;

      const observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          if (!entry) return;
          const visible = entry.isIntersecting;
          isIntersectingRef.current = visible;
          setIsIntersecting(visible);

          for (let i = 0; i < REELMARK_CARD_COUNT; i++) {
            const vid = videoElsRef.current[i];
            if (!vid) continue;
            if (visible && !prefersReducedMotion && !document.hidden) {
              vid.play().catch(() => {});
            } else {
              vid.pause();
            }
          }
        },
        { rootMargin: '250px 0px', threshold: 0.01 }
      );

      observer.observe(sectionEl);
      return () => observer.disconnect();
    }, [prefersReducedMotion]);

    // Drive carousel only when section is visible in viewport
    useEffect(() => {
      const motionMedia = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      );
      const reduced = motionMedia.matches;
      setPrefersReducedMotion(reduced);

      updateCardDomPositions();

      if (
        !shouldRunContinuousLoop({
          isIntersecting,
          isDocumentHidden: typeof document !== 'undefined' && document.hidden,
          prefersReducedMotion: reduced,
          isDragging,
          velocityU: velocityURef.current,
        })
      ) {
        return;
      }

      let rafId: number | null = null;
      let lastTimeMs: number | null = null;

      const tick = (nowMs: number) => {
        if (lastTimeMs !== null) {
          const dt = Math.min(0.1, Math.max(0, (nowMs - lastTimeMs) / 1000));

          if (!isDraggingRef.current) {
            if (Math.abs(velocityURef.current) > 0.5) {
              scrollOffsetURef.current += velocityURef.current * dt;
              velocityURef.current *= Math.pow(0.05, dt);
            } else {
              velocityURef.current = 0;
            }

            if (!reduced) {
              scrollOffsetURef.current += 50 * dt;
            }
          }

          updateCardDomPositions();
        }

        lastTimeMs = nowMs;
        if (
          shouldRunContinuousLoop({
            isIntersecting: isIntersectingRef.current,
            isDocumentHidden: document.hidden,
            prefersReducedMotion: reduced,
            isDragging: isDraggingRef.current,
            velocityU: velocityURef.current,
          })
        ) {
          rafId = requestAnimationFrame(tick);
        }
      };

      rafId = requestAnimationFrame(tick);

      return () => {
        if (rafId !== null) cancelAnimationFrame(rafId);
      };
    }, [isIntersecting, isDragging, updateCardDomPositions]);

    // Synchronize card videos only while visible
    useEffect(() => {
      if (prefersReducedMotion || !isIntersecting) return;

      const syncInterval = window.setInterval(() => {
        const master = videoElsRef.current[0];
        if (!master || master.paused || master.readyState < 2) return;
        const masterTime = master.currentTime;

        for (let i = 1; i < REELMARK_CARD_COUNT; i++) {
          const vid = videoElsRef.current[i];
          if (!vid || vid.readyState < 2) continue;
          if (Math.abs(vid.currentTime - masterTime) > 0.12) {
            try {
              vid.currentTime = masterTime;
            } catch {
              // Ignore seek race
            }
          }
          if (vid.paused) {
            vid.play().catch(() => {});
          }
        }
      }, 600);

      return () => window.clearInterval(syncInterval);
    }, [prefersReducedMotion, isIntersecting]);

    // One-time Web Animations entrance sequence when scrolled into view
    useEffect(() => {
      if (prefersReducedMotion || entrancePlayedRef.current) return;
      const sectionEl = sectionRef.current;
      if (!sectionEl) return;

      const runEntrance = () => {
        if (entrancePlayedRef.current) return;
        entrancePlayedRef.current = true;

        const easeOut = 'cubic-bezier(0.22, 1, 0.36, 1)';
        const easePop = 'cubic-bezier(0.34, 1.56, 0.64, 1)';

        badgeRef.current?.animate(
          [
            { opacity: 0, transform: 'scale(0.82) translateY(10px)' },
            { opacity: 1, transform: 'scale(1) translateY(0px)' },
          ],
          { duration: 520, delay: 60, easing: easePop, fill: 'both' }
        );

        line1Ref.current?.animate(
          [
            {
              opacity: 0,
              transform: 'translateY(28px)',
              filter: 'blur(8px)',
            },
            {
              opacity: 1,
              transform: 'translateY(0px)',
              filter: 'blur(0px)',
            },
          ],
          { duration: 680, delay: 140, easing: easeOut, fill: 'both' }
        );

        line2Ref.current?.animate(
          [
            {
              opacity: 0,
              transform: 'translateY(28px)',
              filter: 'blur(8px)',
            },
            {
              opacity: 1,
              transform: 'translateY(0px)',
              filter: 'blur(0px)',
            },
          ],
          { duration: 680, delay: 230, easing: easeOut, fill: 'both' }
        );

        sublineRef.current?.animate(
          [
            { opacity: 0, transform: 'translateY(20px)' },
            { opacity: 1, transform: 'translateY(0px)' },
          ],
          { duration: 620, delay: 340, easing: easeOut, fill: 'both' }
        );

        cardBandRef.current?.animate(
          [
            { opacity: 0, transform: 'translateY(48px)' },
            { opacity: 1, transform: 'translateY(0px)' },
          ],
          { duration: 780, delay: 420, easing: easeOut, fill: 'both' }
        );

        buttonWrapRef.current?.animate(
          [
            { opacity: 0, transform: 'scale(0.84)' },
            { opacity: 1, transform: 'scale(1)' },
          ],
          { duration: 560, delay: 540, easing: easePop, fill: 'both' }
        );

        noteSlashRef.current?.animate(
          [
            { opacity: 0, strokeDashoffset: 60 },
            { opacity: 1, strokeDashoffset: 0 },
          ],
          { duration: 600, delay: 580, easing: easeOut, fill: 'both' }
        );

        noteBeSeenRef.current?.animate(
          [{ opacity: 0 }, { opacity: 1 }],
          { duration: 480, delay: 620, easing: easeOut, fill: 'both' }
        );

        arrowBeSeenPathRef.current?.animate(
          [{ strokeDashoffset: 240 }, { strokeDashoffset: 0 }],
          { duration: 700, delay: 680, easing: easeOut, fill: 'both' }
        );

        arrowBeSeenHeadRef.current?.animate(
          [{ opacity: 0 }, { opacity: 1 }],
          { duration: 300, delay: 1150, easing: easeOut, fill: 'both' }
        );

        noteZeroCostRef.current?.animate(
          [{ opacity: 0 }, { opacity: 1 }],
          { duration: 480, delay: 660, easing: easeOut, fill: 'both' }
        );

        arrowZeroCostPathRef.current?.animate(
          [{ strokeDashoffset: 120 }, { strokeDashoffset: 0 }],
          { duration: 550, delay: 720, easing: easeOut, fill: 'both' }
        );
      };

      const observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            runEntrance();
            observer.disconnect();
          }
        },
        { threshold: 0.15 }
      );

      observer.observe(sectionEl);
      return () => observer.disconnect();
    }, [prefersReducedMotion]);

    // Pointer drag & momentum handlers
    const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
      isDraggingRef.current = true;
      setIsDragging(true);
      velocityURef.current = 0;
      lastPointerXRef.current = e.clientX;
      lastDragTimeMsRef.current = performance.now();
      e.currentTarget.setPointerCapture(e.pointerId);
    };

    const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
      if (!isDraggingRef.current) return;
      const now = performance.now();
      const dxPx = e.clientX - lastPointerXRef.current;
      const dtSec = Math.max(0.004, (now - lastDragTimeMsRef.current) / 1000);
      const uPx = uPxRef.current || 1;

      const deltaU = -dxPx / uPx;
      scrollOffsetURef.current += deltaU;
      velocityURef.current = deltaU / dtSec;

      lastPointerXRef.current = e.clientX;
      lastDragTimeMsRef.current = now;
      updateCardDomPositions();
    };

    const handlePointerUpOrCancel = (e: React.PointerEvent<HTMLDivElement>) => {
      if (!isDraggingRef.current) return;
      isDraggingRef.current = false;
      setIsDragging(false);
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {
        // Ignore if pointer capture already released
      }
    };

    const handleMakeReelClick = useCallback(() => {
      velocityURef.current = 520;
      setReelPulseLabel('Spinning Reels...');
      if (pulseTimerRef.current !== null) {
        window.clearTimeout(pulseTimerRef.current);
      }
      pulseTimerRef.current = window.setTimeout(() => {
        pulseTimerRef.current = null;
        setReelPulseLabel('Make a Reel');
      }, 1400);
    }, []);

    useEffect(() => {
      return () => {
        if (pulseTimerRef.current !== null) {
          window.clearTimeout(pulseTimerRef.current);
        }
      };
    }, []);

    const handleCarouselKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'ArrowRight') {
          e.preventDefault();
          velocityURef.current = 320;
          updateCardDomPositions();
        } else if (e.key === 'ArrowLeft') {
          e.preventDefault();
          velocityURef.current = -320;
          updateCardDomPositions();
        }
      },
      [updateCardDomPositions]
    );


    return (
      <section
        id="services"
        ref={sectionRef}
        aria-label="Reelmark — Short-form video creator marketplace"
        className="relative z-0 flex min-h-dvh w-full items-center justify-center overflow-hidden bg-[#F5F8EF] pb-16 transition-colors duration-300 select-none sm:pb-20 md:pb-24 dark:bg-[#0A1610]"
        style={
          {
            '--u': 'min(calc(100vw / 1240), calc(100vh / 920))',
          } as React.CSSProperties
        }
      >
        {isPhone ? (
          /* ============================================================
             PHONES LAYOUT (<= 820px)
             ============================================================ */
          <div className="flex w-full flex-col items-center pt-12 pb-8">
            <div
              ref={badgeRef}
              className="inline-flex h-[36px] items-center justify-center rounded-full bg-[#DAE7C7] px-5 text-[14.5px] font-medium text-[#08482D] dark:bg-[#163828] dark:text-[#A7F3D0]"
            >
              Trusted by 120,000+ indie makers
            </div>

            <h2
              className="mt-4 px-3 text-center font-bold text-[#101410] dark:text-[#F4F9F5]"
              style={{
                fontFamily: 'var(--font-inter-tight), sans-serif',
                fontSize: 'clamp(40px, 9.6vw, 58px)',
                lineHeight: 1.04,
              }}
            >
              <span ref={line1Ref} className="block tracking-[-0.035em]">
                Captivate Crowds
              </span>
              <span ref={line2Ref} className="block tracking-[-0.022em]">
                with Snackable Reels
              </span>
            </h2>

            <p
              ref={sublineRef}
              className="mt-4 max-w-[368px] px-4 text-center text-[15.5px] leading-[1.55] text-[#5E5E61] dark:text-[#A3B8AC]"
            >
              Grow your brand with short, snappy product clips by our handpicked
              video makers. Our crew is ready to lift your next launch higher.
            </p>

            <div
              ref={cardBandRef}
              tabIndex={0}
              role="region"
              aria-label="Interactive short-form video reels carousel"
              onKeyDown={handleCarouselKeyDown}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUpOrCancel}
              onPointerCancel={handlePointerUpOrCancel}
              className={`relative mt-6 h-[265px] w-full overflow-hidden touch-pan-y focus-visible:ring-2 focus-visible:ring-[#08482D] focus-visible:outline-none dark:focus-visible:ring-[#34D399] ${
                isDragging ? 'cursor-grabbing' : 'cursor-grab'
              }`}
              data-testid="reelmark-carousel-mobile"
            >
              {Array.from({ length: REELMARK_CARD_COUNT }).map((_, idx) => (
                <div
                  key={idx}
                  ref={(el) => {
                    cardElsRef.current[idx] = el;
                  }}
                  className="pointer-events-none absolute top-0 left-0 overflow-hidden bg-[#CBE0B6] will-change-transform"
                >
                  <div
                    ref={(el) => {
                      mediaElsRef.current[idx] = el;
                    }}
                    className="absolute top-0 left-0 will-change-transform"
                    style={{
                      background: TILE_SAGE_PALETTES[idx],
                      backgroundImage: `url(${POSTER_URL})`,
                      backgroundSize: '100% 100%',
                      backgroundRepeat: 'no-repeat',
                    }}
                  >
                    {!prefersReducedMotion && (
                      <video
                        ref={(el) => {
                          videoElsRef.current[idx] = el;
                        }}
                        src={VIDEO_URL}
                        poster={POSTER_URL}
                        muted
                        loop
                        playsInline
                        autoPlay={isIntersecting}
                        preload={getOptimalVideoPreload(idx, isIntersecting)}
                        onLoadedData={() => setVideoReady(true)}
                        aria-label={TILE_LABELS[idx]}
                        className={`h-full w-full object-fill transition-opacity duration-500 ${
                          videoReady ? 'opacity-100' : 'opacity-0'
                        }`}
                      />
                    )}
                  </div>

                  <div
                    ref={(el) => {
                      playBadgeElsRef.current[idx] = el;
                    }}
                    aria-hidden="true"
                    className="absolute top-0 left-0 flex items-center justify-center rounded-full border border-white/45 bg-white/35 backdrop-blur-md"
                  >
                    <svg
                      viewBox="0 0 12 12"
                      className="ml-0.5 h-2.5 w-2.5 fill-white"
                    >
                      <path d="M3 2.2v7.6L9.8 6 3 2.2z" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>

            <div className="relative mt-7 flex flex-col items-center">
              <div
                ref={buttonWrapRef}
                className="flex h-[68px] w-[184px] items-center justify-center rounded-full border-[1.5px] border-dashed border-[#08482D] dark:border-[#34D399]"
              >
                <button
                  type="button"
                  onClick={handleMakeReelClick}
                  className="flex h-[52px] w-[166px] cursor-pointer items-center justify-center rounded-full bg-[#08482D] text-[16px] font-medium text-white transition-transform duration-150 hover:scale-[1.02] active:scale-[0.98] dark:bg-[#10B981] dark:font-semibold dark:text-[#050C08]"
                >
                  {reelPulseLabel}
                </button>
              </div>

              <div
                ref={noteZeroCostRef}
                className="mt-3 flex items-center gap-2 text-[#08482D] dark:text-[#6EE7B7]"
                style={{
                  fontFamily: 'var(--font-caveat), cursive',
                }}
              >
                <span className="inline-block rotate-[14deg] text-[22px] font-semibold">
                  Zero cost
                </span>
              </div>
            </div>
          </div>
        ) : (
          /* ============================================================
             DESKTOP FRAME (Full-bleed horizontal width, larger `--u` scale)
             ============================================================ */
          <div
            ref={frameRef}
            data-testid="reelmark-frame"
            className="relative shrink-0 bg-[#F5F8EF] transition-colors duration-300 dark:bg-[#0A1610]"
            style={{
              width: 'calc(1440 * var(--u))',
              height: 'calc(930 * var(--u))',
            }}
          >
            <div
              ref={badgeRef}
              className="absolute flex items-center justify-center rounded-full bg-[#DAE7C7] font-medium text-[#08482D] dark:bg-[#163828] dark:text-[#A7F3D0]"
              style={{
                left: 'calc(572 * var(--u))',
                top: 'calc(62 * var(--u))',
                width: 'calc(296 * var(--u))',
                height: 'calc(38 * var(--u))',
                fontSize: 'calc(17 * var(--u))',
                letterSpacing: '-0.01em',
              }}
            >
              Trusted by 120,000+ indie makers
            </div>

            <h2
              className="pointer-events-none absolute right-0 left-0 text-center font-bold text-[#101410] dark:text-[#F4F9F5]"
              style={{
                top: 'calc(114 * var(--u))',
                fontFamily: 'var(--font-inter-tight), sans-serif',
                fontSize: 'calc(92 * var(--u))',
                lineHeight: 'calc(94 * var(--u))',
              }}
            >
              <span
                ref={line1Ref}
                className="block"
                style={{ letterSpacing: '-0.035em' }}
              >
                Captivate Crowds
              </span>
              <span
                ref={line2Ref}
                className="block"
                style={{ letterSpacing: '-0.022em' }}
              >
                with Snackable Reels
              </span>
            </h2>

            <p
              ref={sublineRef}
              className="pointer-events-none absolute right-0 left-0 text-center font-normal text-[#5E5E61] dark:text-[#A3B8AC]"
              style={{
                top: 'calc(318 * var(--u))',
                fontSize: 'calc(21.5 * var(--u))',
                lineHeight: 'calc(32 * var(--u))',
                letterSpacing: '-0.01em',
              }}
            >
              Grow your brand with short, snappy product clips by
              <br />
              our handpicked video makers. Our crew is ready to
              <br />
              lift your next launch higher.
            </p>

            <svg
              ref={noteSlashRef}
              viewBox="0 0 46 42"
              fill="none"
              aria-hidden="true"
              className="pointer-events-none absolute text-[#08482D] dark:text-[#6EE7B7]"
              style={{
                left: 'calc(240 * var(--u))',
                top: 'calc(308 * var(--u))',
                width: 'calc(44 * var(--u))',
                height: 'calc(40 * var(--u))',
                strokeDasharray: 60,
              }}
            >
              <path
                d="M 8 36 C 14 24, 22 14, 28 4"
                stroke="currentColor"
                strokeWidth="3.2"
                strokeLinecap="round"
              />
              <path
                d="M 21 38 C 27 26, 34 16, 40 6"
                stroke="currentColor"
                strokeWidth="3.2"
                strokeLinecap="round"
              />
            </svg>

            <div
              ref={noteBeSeenRef}
              aria-hidden="true"
              className="pointer-events-none absolute origin-top-left text-center text-[#08482D] dark:text-[#6EE7B7]"
              style={{
                left: 'calc(1168 * var(--u))',
                top: 'calc(248 * var(--u))',
                transform: 'rotate(16deg)',
                fontFamily: 'var(--font-caveat), cursive',
                fontSize: 'calc(27 * var(--u))',
                lineHeight: 'calc(26 * var(--u))',
                fontWeight: 600,
              }}
            >
              <span className="block">Be seen</span>
              <span className="block">with clips</span>
            </div>

            <svg
              viewBox="0 0 120 150"
              fill="none"
              aria-hidden="true"
              className="pointer-events-none absolute text-[#08482D] dark:text-[#6EE7B7]"
              style={{
                left: 'calc(1132 * var(--u))',
                top: 'calc(312 * var(--u))',
                width: 'calc(108 * var(--u))',
                height: 'calc(126 * var(--u))',
              }}
            >
              <path
                ref={arrowBeSeenPathRef}
                d="M 68 8 C 88 44, 74 96, 26 128"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                style={{ strokeDasharray: 240 }}
              />
              <path
                ref={arrowBeSeenHeadRef}
                d="M 38 129 L 23 130 L 29 116"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <div
              ref={cardBandRef}
              tabIndex={0}
              role="region"
              aria-label="Interactive short-form video reels carousel"
              onKeyDown={handleCarouselKeyDown}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUpOrCancel}
              onPointerCancel={handlePointerUpOrCancel}
              data-testid="reelmark-carousel"
              className={`absolute top-0 bottom-0 left-1/2 z-10 w-screen -translate-x-1/2 touch-pan-y focus-visible:ring-2 focus-visible:ring-[#08482D] focus-visible:outline-none dark:focus-visible:ring-[#34D399] ${
                isDragging ? 'cursor-grabbing' : 'cursor-grab'
              }`}
            >
              {Array.from({ length: REELMARK_CARD_COUNT }).map((_, idx) => (
                <div
                  key={idx}
                  ref={(el) => {
                    cardElsRef.current[idx] = el;
                  }}
                  data-testid={`reelmark-card-${idx}`}
                  className="pointer-events-none absolute top-0 left-0 overflow-hidden bg-[#CBE0B6] will-change-transform"
                >
                  <div
                    ref={(el) => {
                      mediaElsRef.current[idx] = el;
                    }}
                    className="absolute top-0 left-0 will-change-transform"
                    style={{
                      background: TILE_SAGE_PALETTES[idx],
                      backgroundImage: `url(${POSTER_URL})`,
                      backgroundSize: '100% 100%',
                      backgroundRepeat: 'no-repeat',
                    }}
                  >
                    {!prefersReducedMotion && (
                      <video
                        ref={(el) => {
                          videoElsRef.current[idx] = el;
                        }}
                        src={VIDEO_URL}
                        poster={POSTER_URL}
                        muted
                        loop
                        playsInline
                        autoPlay={isIntersecting}
                        preload={getOptimalVideoPreload(idx, isIntersecting)}
                        onLoadedData={() => setVideoReady(true)}
                        aria-label={TILE_LABELS[idx]}
                        className={`h-full w-full object-fill transition-opacity duration-500 ${
                          videoReady ? 'opacity-100' : 'opacity-0'
                        }`}
                      />
                    )}
                  </div>

                  <div
                    ref={(el) => {
                      playBadgeElsRef.current[idx] = el;
                    }}
                    aria-hidden="true"
                    className="absolute top-0 left-0 flex items-center justify-center rounded-full border border-white/50 bg-white/35 backdrop-blur-md"
                  >
                    <svg
                      viewBox="0 0 12 12"
                      className="ml-0.5 h-[42%] w-[42%] fill-white"
                    >
                      <path d="M3 2.2v7.6L9.8 6 3 2.2z" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>

            <div
              ref={noteZeroCostRef}
              aria-hidden="true"
              className="pointer-events-none absolute z-20 origin-top-left text-[#08482D] dark:text-[#6EE7B7]"
              style={{
                left: 'calc(521 * var(--u))',
                top: 'calc(822 * var(--u))',
                transform: 'rotate(24deg)',
                fontFamily: 'var(--font-caveat), cursive',
                fontSize: 'calc(25 * var(--u))',
                lineHeight: 'calc(25 * var(--u))',
                fontWeight: 600,
              }}
            >
              Zero cost
            </div>

            <svg
              viewBox="0 0 64 44"
              fill="none"
              aria-hidden="true"
              className="pointer-events-none absolute z-20 text-[#08482D] dark:text-[#6EE7B7]"
              style={{
                left: 'calc(566 * var(--u))',
                top: 'calc(817 * var(--u))',
                width: 'calc(54 * var(--u))',
                height: 'calc(38 * var(--u))',
              }}
            >
              <path
                ref={arrowZeroCostPathRef}
                d="M 6 32 C 22 36, 40 28, 52 12 M 42 12 L 53 11 L 52 22"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ strokeDasharray: 120 }}
              />
            </svg>

            <div
              ref={buttonWrapRef}
              className="absolute z-20 flex items-center justify-center rounded-full border-[1.5px] border-dashed border-[#08482D] dark:border-[#34D399]"
              style={{
                left: 'calc(626 * var(--u))',
                top: 'calc(786 * var(--u))',
                width: 'calc(190 * var(--u))',
                height: 'calc(74 * var(--u))',
              }}
            >
              <button
                type="button"
                onClick={handleMakeReelClick}
                className="flex cursor-pointer items-center justify-center rounded-full bg-[#08482D] font-medium whitespace-nowrap text-white transition-transform duration-150 hover:scale-[1.02] focus-visible:ring-2 focus-visible:ring-[#08482D] focus-visible:ring-offset-2 focus-visible:outline-none active:scale-[0.98] dark:bg-[#10B981] dark:font-semibold dark:text-[#050C08]"
                style={{
                  width: 'calc(172 * var(--u))',
                  height: 'calc(58 * var(--u))',
                  fontSize: 'calc(18 * var(--u))',
                  letterSpacing: '-0.01em',
                }}
              >
                {reelPulseLabel}
              </button>
            </div>
          </div>
        )}
      </section>
    );
  }
);
