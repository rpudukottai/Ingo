'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { animate, motion } from 'motion/react';
import {
  HERO_STAGGER_CONTAINER_VARIANTS,
  HERO_WORDMARK_LEFT_VARIANTS,
  HERO_PILL_ENTRANCE_VARIANTS,
  HERO_WORDMARK_RIGHT_VARIANTS,
  HERO_SUBHEADING_VARIANTS,
} from '@/lib/hero-motion';
import {
  computeHeroTimelineFrame,
  computeRecordingProgress,
  computeRecVideoSeekTime,
  DEFAULT_VIDEO_DURATION_SEC,
  REVEAL_DURATION_SEC,
} from '@/lib/hero-timeline';
import {
  hasProgressChangedMeaningfully,
  shouldPlayHeroVideo,
} from '@/lib/render-optimization';
import { FlowingLines } from './flowing-lines';
import { HeroNavigation, type NavSectionId } from './hero-navigation';
import { ORDERED_SECTION_IDS, resolveActiveSection } from '@/lib/navigation';
import {
  THEME_STORAGE_KEY,
  getNextTheme,
  resolveInitialTheme,
  type ThemeMode,
} from '@/lib/theme';
import { HeroFooter } from './hero-footer';
import { PillVisual } from './pill-visual';
import { ReelmarkServicesSection } from './reelmark-services-section';
import { WorkSection } from './work-section';
import { AboutSection } from './about-section';
import { TrustedBySection } from './trusted-by-section';
import { TestimonialsSection } from './testimonials-section';
import { ContactSection } from './contact-section';
import { SiteFooter } from './site-footer';

declare global {
  interface Window {
    __recVideo?: (t: number) => number;
  }
}

export function AgencyHero() {
  const [progress, setProgress] = useState<number>(0);
  const [viewportWidth, setViewportWidth] = useState<number>(1440);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [prefersReducedMotion, setPrefersReducedMotion] =
    useState<boolean>(false);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [visualControlActive, setVisualControlActive] =
    useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<NavSectionId>('home');
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [theme, setTheme] = useState<ThemeMode>('light');
  const [recTimeSec, setRecTimeSec] = useState<number | null>(null);

  const heroSectionRef = useRef<HTMLDivElement | null>(null);
  const isHeroIntersectingRef = useRef<boolean>(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const videoDurationRef = useRef<number>(DEFAULT_VIDEO_DURATION_SEC);
  const activeAnimRef = useRef<{ stop: () => void } | null>(null);
  const isAnimatingRef = useRef<boolean>(false);
  const isRecModeRef = useRef<boolean>(false);
  const manualRecSeekRef = useRef<boolean>(false);

  const stopActiveAnimation = useCallback(() => {
    if (activeAnimRef.current) {
      activeAnimRef.current.stop();
      activeAnimRef.current = null;
    }
    isAnimatingRef.current = false;
    setIsAnimating(false);
  }, []);

  const runForwardReveal = useCallback(() => {
    stopActiveAnimation();
    isAnimatingRef.current = true;
    setIsAnimating(true);

    const controls = animate(0, 1, {
      duration: REVEAL_DURATION_SEC,
      ease: 'linear',
      onUpdate: (latest) => {
        setProgress((prev) =>
          hasProgressChangedMeaningfully(prev, latest) ? latest : prev
        );
      },
      onComplete: () => {
        setProgress(1);
        isAnimatingRef.current = false;
        setIsAnimating(false);
        activeAnimRef.current = null;
      },
    });

    activeAnimRef.current = controls;
  }, [stopActiveAnimation]);

  useEffect(() => {
    const updateViewport = () => {
      const w = window.innerWidth;
      setViewportWidth((prev) => (prev === w ? prev : w));
      setIsMobile((prev) => {
        const next = w <= 720;
        return prev === next ? prev : next;
      });
    };
    updateViewport();

    const params = new URLSearchParams(window.location.search);
    const recParam = params.get('rec') === '1';
    isRecModeRef.current = recParam;

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const reduced = motionQuery.matches && !recParam;
    setPrefersReducedMotion(reduced);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      const nextReduced = e.matches && !isRecModeRef.current;
      setPrefersReducedMotion(nextReduced);
      if (nextReduced) {
        stopActiveAnimation();
        setProgress(1);
        videoRef.current?.pause();
      }
    };
    motionQuery.addEventListener('change', handleMotionChange);

    window.__recVideo = (t: number): number => {
      manualRecSeekRef.current = true;
      const vid = videoRef.current;
      const dur =
        vid && Number.isFinite(vid.duration) && vid.duration > 0
          ? vid.duration
          : videoDurationRef.current;
      const seekTarget = computeRecVideoSeekTime(t, dur);
      if (vid) {
        try {
          vid.pause();
          vid.currentTime = seekTarget;
        } catch {
          // Ignore seek errors if media isn't loaded yet
        }
      }
      setRecTimeSec(t);
      if (isRecModeRef.current) {
        setProgress(computeRecordingProgress(t));
      }
      return seekTarget;
    };

    let rafId: number | null = null;
    let resizeRafId: number | null = null;
    let cancelled = false;

    if (recParam) {
      const startTime = performance.now();
      const tickRec = (now: number) => {
        if (cancelled) return;
        if (!manualRecSeekRef.current) {
          const elapsedSec = (now - startTime) / 1000;
          setRecTimeSec(elapsedSec);
          setProgress(computeRecordingProgress(elapsedSec));
        }
        rafId = requestAnimationFrame(tickRec);
      };
      setProgress(0);
      rafId = requestAnimationFrame(tickRec);
    } else if (reduced) {
      setProgress(1);
    } else {
      const fontReadyPromise =
        typeof document !== 'undefined' && 'fonts' in document
          ? Promise.race([
              document.fonts.ready,
              new Promise((resolve) => setTimeout(resolve, 250)),
            ])
          : Promise.resolve();

      fontReadyPromise.then(() => {
        if (!cancelled) {
          runForwardReveal();
        }
      });
    }

    const handleResize = () => {
      if (resizeRafId !== null) return;
      resizeRafId = requestAnimationFrame(() => {
        resizeRafId = null;
        updateViewport();
        if (isAnimatingRef.current && !isRecModeRef.current) {
          stopActiveAnimation();
          setProgress(1);
        }
      });
    };

    const syncHeroVideoPlayback = () => {
      const vid = videoRef.current;
      if (!vid) return;
      const shouldPlay = shouldPlayHeroVideo({
        isHeroIntersecting: isHeroIntersectingRef.current,
        isDocumentHidden: document.hidden,
        prefersReducedMotion,
        isRecMode: isRecModeRef.current,
      });
      if (shouldPlay) {
        vid.play().catch(() => {});
      } else {
        vid.pause();
      }
    };

    const heroEl = heroSectionRef.current;
    const heroObserver =
      heroEl && typeof IntersectionObserver !== 'undefined'
        ? new IntersectionObserver(
            (entries) => {
              const entry = entries[0];
              if (!entry) return;
              isHeroIntersectingRef.current = entry.isIntersecting;
              syncHeroVideoPlayback();
            },
            { rootMargin: '120px 0px', threshold: 0.01 }
          )
        : null;

    if (heroObserver && heroEl) {
      heroObserver.observe(heroEl);
    }

    window.addEventListener('resize', handleResize, { passive: true });
    document.addEventListener('visibilitychange', syncHeroVideoPlayback);

    return () => {
      cancelled = true;
      if (rafId !== null) cancelAnimationFrame(rafId);
      if (resizeRafId !== null) cancelAnimationFrame(resizeRafId);
      heroObserver?.disconnect();
      stopActiveAnimation();
      motionQuery.removeEventListener('change', handleMotionChange);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', syncHeroVideoPlayback);
      delete window.__recVideo;
    };
  }, [prefersReducedMotion, runForwardReveal, stopActiveAnimation]);

  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    const onLoadedMetadata = () => {
      if (Number.isFinite(vid.duration) && vid.duration > 0) {
        videoDurationRef.current = vid.duration;
      }
    };
    vid.addEventListener('loadedmetadata', onLoadedMetadata);
    return () => {
      vid.removeEventListener('loadedmetadata', onLoadedMetadata);
    };
  }, []);


  useEffect(() => {
    let scrollRafId: number | null = null;

    const evaluateScrollState = () => {
      scrollRafId = null;
      const nextScrolled = window.scrollY > 40;
      setIsScrolled((prev) => (prev === nextScrolled ? prev : nextScrolled));

      const threshold = window.innerHeight * 0.45;
      const sectionTops: Partial<Record<NavSectionId, number | null>> = {};

      for (const id of ORDERED_SECTION_IDS) {
        const el = document.getElementById(id);
        sectionTops[id] = el ? el.getBoundingClientRect().top : null;
      }

      const nextActive = resolveActiveSection(sectionTops, threshold);
      setActiveSection((prev) => (prev === nextActive ? prev : nextActive));
    };

    const handleScroll = () => {
      if (scrollRafId !== null) return;
      scrollRafId = requestAnimationFrame(evaluateScrollState);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    evaluateScrollState();
    return () => {
      if (scrollRafId !== null) cancelAnimationFrame(scrollRafId);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
      const prefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches;
      const initial = resolveInitialTheme(stored, prefersDark);
      setTheme(initial);
      document.documentElement.classList.toggle('dark', initial === 'dark');
    } catch {
      // Ignore storage access errors in restricted environments
    }
  }, []);

  const handleToggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = getNextTheme(prev);
      document.documentElement.classList.toggle('dark', next === 'dark');
      try {
        window.localStorage.setItem(THEME_STORAGE_KEY, next);
      } catch {
        // Ignore storage write errors
      }
      return next;
    });
  }, []);

  const handleSelectSection = useCallback((sec: NavSectionId) => {
    setActiveSection(sec);
    const el = document.getElementById(sec);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const handleToggleVisualControl = useCallback(() => {
    setVisualControlActive((prev) => !prev);
  }, []);

  const handleStartProject = useCallback(() => {
    handleSelectSection('contact');
  }, [handleSelectSection]);

  const frame = computeHeroTimelineFrame(progress, viewportWidth);

  return (
    <div className="min-h-dvh w-full overflow-x-clip bg-[#FFFFFF] transition-colors duration-300 dark:bg-[#050C08]">
      {/* Top Navigation */}
      <HeroNavigation
        translateYPercent={frame.navTranslateYPercent}
        opacity={frame.navOpacity}
        isMobile={isMobile}
        isScrolled={isScrolled}
        activeSection={activeSection}
        onSelectSection={handleSelectSection}
        theme={theme}
        onToggleTheme={handleToggleTheme}
      />

      {/* Section 1: INGO Hero (#home) */}
      <div
        id="home"
        ref={heroSectionRef}
        data-state={
          isAnimating ? 'animating' : progress >= 0.99 ? 'revealed' : 'opening'
        }

        data-progress={frame.progress.toFixed(3)}
        className="relative h-dvh w-full overflow-hidden bg-[#FFFFFF] transition-colors duration-300 select-none dark:bg-[#050C08]"
        style={
          {
            '--fs': isMobile ? 'min(22.5vw, 11.8vh)' : 'min(19.6vh, 13.2vw)',
          } as React.CSSProperties
        }
      >
        {/* Light-Luxury Agency Background & 16 Flowing Upward-Right SVG Strokes */}
        <FlowingLines
          opacity={frame.backgroundOpacity}
          prefersReducedMotion={prefersReducedMotion}
        />

        {/* Main Single-Screen Hero Wordmark + Expanding Pill Composition */}
        <main className="relative z-10 h-full w-full overflow-hidden">
          <h1 className="sr-only">
            INGO — Creative Digital Agency for Website Experiences, UI/UX Design,
            and Digital Transformation
          </h1>

          <motion.div
            aria-hidden="false"
            variants={HERO_STAGGER_CONTAINER_VARIANTS}
            initial="hidden"
            animate="visible"
            className={`absolute left-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center ${
              isMobile ? 'top-[46%] px-8 py-6' : 'top-[47%]'
            }`}
          >
            <div
              className={`flex items-center justify-center ${
                isMobile ? 'flex-col' : 'flex-row'
              }`}
              style={{
                fontSize: 'var(--fs)',
                gap: isMobile
                  ? `${frame.mobileWordmarkGapEm}em`
                  : `${frame.desktopWordmarkGapEm}em`,
              }}
            >
              {/* Left / Top Wordmark Segment: IN */}
              <motion.span
                data-testid="wordmark-in"
                variants={HERO_WORDMARK_LEFT_VARIANTS}
                className="block shrink-0 text-center font-extrabold tracking-[-0.045em] text-[#0A0D14] uppercase transition-colors duration-300 will-change-transform dark:text-[#F4F9F5]"
                style={{
                  lineHeight: 0.8,
                  textShadow: `0 16px 40px rgba(15, 23, 42, ${(frame.backgroundOpacity * 0.08).toFixed(3)})`,
                }}
              >
                IN
              </motion.span>

              {/* Central Expanding Stadium Pill + Under-Pill Centered Subheading */}
              <div className="relative flex shrink-0 flex-col items-center justify-center">
                <motion.div
                  data-testid="hero-pill"
                  variants={HERO_PILL_ENTRANCE_VARIANTS}
                  className={`relative shrink-0 overflow-hidden rounded-full bg-[#64748B]/30 ring-1 ring-[#0A0D14]/10 will-change-[width,height,clip-path] dark:ring-[#34D399]/30 ${
                    isMobile
                      ? 'my-1.5 shadow-[0_18px_44px_-10px_rgba(37,99,235,0.28),0_8px_20px_-6px_rgba(15,23,42,0.14)]'
                      : 'shadow-[0_28px_72px_-12px_rgba(37,99,235,0.34),0_12px_28px_-8px_rgba(15,23,42,0.18)]'
                  }`}
                  style={
                    isMobile
                      ? {
                          width: `${frame.mobilePillWidthPx}px`,
                          height: `${frame.mobilePillHeightPx}px`,
                          clipPath: `inset(0 ${frame.mobileClipInsetXPercent}% round 9999px)`,
                        }
                      : {
                          width: `${frame.desktopPillWidthEm}em`,
                          height: `${frame.desktopPillHeightEm}em`,
                          clipPath: `inset(${frame.desktopClipInsetYPercent}% 0 round 9999px)`,
                        }
                  }
                >
                  <PillVisual
                    videoRef={videoRef}
                    isMobile={isMobile}
                    mobilePillWidthPx={frame.mobilePillWidthPx}
                    mobileFinalHeightPx={frame.mobileFinalHeightPx}
                    prefersReducedMotion={prefersReducedMotion}
                    hairlineOverlayOpacity={frame.hairlineOverlayOpacity}
                    pillIconsOpacity={frame.pillIconsOpacity}
                    visualControlActive={visualControlActive}
                    onToggleVisualControl={handleToggleVisualControl}
                    recTimeSec={recTimeSec}
                  />
                </motion.div>

                {/* Desktop: Centered directly under the pill */}
                {!isMobile && (
                  <motion.div
                    variants={HERO_SUBHEADING_VARIANTS}
                    className="pointer-events-none absolute top-full left-1/2 mt-6 flex -translate-x-1/2 items-center justify-center gap-3.5 whitespace-nowrap sm:mt-8"
                    style={{ opacity: frame.footerOpacity }}
                  >
                    <span
                      aria-hidden="true"
                      className="h-px w-8 bg-[#0A0D14]/20 transition-colors duration-300 sm:w-12 dark:bg-[#34D399]/30"
                    />
                    <p
                      data-testid="hero-subheading"
                      className="pl-[0.42em] text-[11px] font-semibold tracking-[0.42em] text-[#0A0D14]/75 uppercase transition-colors duration-300 sm:text-[13px] md:text-[14px] dark:text-[#ECFDF5]/80"
                    >
                      Agency
                    </p>
                    <span
                      aria-hidden="true"
                      className="h-px w-8 bg-[#0A0D14]/20 transition-colors duration-300 sm:w-12 dark:bg-[#34D399]/30"
                    />
                  </motion.div>
                )}
              </div>

              {/* Right / Bottom Wordmark Segment: GO */}
              <motion.span
                data-testid="wordmark-go"
                variants={HERO_WORDMARK_RIGHT_VARIANTS}
                className="block shrink-0 text-center font-extrabold tracking-[-0.045em] text-[#0A0D14] uppercase transition-colors duration-300 will-change-transform dark:text-[#F4F9F5]"
                style={{
                  lineHeight: 0.8,
                  textShadow: `0 16px 40px rgba(15, 23, 42, ${(frame.backgroundOpacity * 0.08).toFixed(3)})`,
                }}
              >
                GO
              </motion.span>
            </div>

            {/* Mobile: Centered INGO Subheading: Agency */}
            {isMobile && (
              <motion.div
                variants={HERO_SUBHEADING_VARIANTS}
                className="mt-6 flex items-center justify-center gap-3.5 sm:mt-8"
                style={{ opacity: frame.footerOpacity }}
              >
                <span
                  aria-hidden="true"
                  className="h-px w-8 bg-[#0A0D14]/20 transition-colors duration-300 sm:w-12 dark:bg-[#34D399]/30"
                />
                <p
                  data-testid="hero-subheading"
                  className="pl-[0.42em] text-[11px] font-semibold tracking-[0.42em] text-[#0A0D14]/75 uppercase transition-colors duration-300 sm:text-[13px] md:text-[14px] dark:text-[#ECFDF5]/80"
                >
                  Agency
                </p>
                <span
                  aria-hidden="true"
                  className="h-px w-8 bg-[#0A0D14]/20 transition-colors duration-300 sm:w-12 dark:bg-[#34D399]/30"
                />
              </motion.div>
            )}
          </motion.div>
        </main>

        {/* Bottom Slim Editorial Information Bar */}
        <HeroFooter
          translateYPercent={frame.footerTranslateYPercent}
          opacity={frame.footerOpacity}
          dividerScaleX={frame.dividerScaleX}
          isMobile={isMobile}
          isAnimating={isAnimating}
          onStartProject={handleStartProject}
        />
      </div>

      {/* Section 2: Reelmark Services Section (#services) */}
      <ReelmarkServicesSection />

      {/* Section 3: Work Section (#work) */}
      <WorkSection />

      {/* Section 4: About Section (#about) */}
      <AboutSection />

      {/* Section 5: Trusted By Section (#trusted-by) */}
      <TrustedBySection />

      {/* Section 6: Client Testimonials Section (#testimonials) */}
      <TestimonialsSection />

      {/* Section 7: Contact Section (#contact) */}
      <ContactSection />

      {/* Section 8: Professional Site Footer (#site-footer) */}
      <SiteFooter />
    </div>
  );
}
