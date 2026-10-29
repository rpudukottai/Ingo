'use client';

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  Instagram,
  Youtube,
  Linkedin,
  Globe,
  ArrowUpRight,
  ArrowUp,
  ShieldCheck,
  Mail,
  MapPin,
  X,
  type LucideIcon,
} from 'lucide-react';
import {
  FOOTER_SOCIAL_PROFILES,
  FOOTER_NAV_LINKS,
  PRIVACY_POLICY_SECTIONS,
  formatCopyrightNotice,
} from '@/lib/footer-data';
import { FadeIn, Magnet } from './reusable-ui';

const SOCIAL_ICON_MAP: Record<string, LucideIcon> = {
  instagram: Instagram,
  youtube: Youtube,
  linkedin: Linkedin,
  showcase: Globe,
};

export const SiteFooter = React.memo(function SiteFooter() {
  const [privacyOpen, setPrivacyOpen] = useState<boolean>(false);

  React.useEffect(() => {
    if (!privacyOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setPrivacyOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [privacyOpen]);

  const handleScrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {

    e.preventDefault();
    const homeEl = document.getElementById('home');
    if (homeEl) {
      homeEl.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleOpenPrivacy = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setPrivacyOpen(true);
  };

  return (
    <>
      <footer
        id="site-footer"
        data-testid="site-footer"
        aria-label="Site Footer"
        className="relative z-[55] -mt-10 w-full overflow-hidden rounded-t-[40px] border-t-2 border-[#C5D8B2] bg-[#062819] px-5 pt-14 pb-10 text-white shadow-[0_-24px_60px_rgba(6,40,25,0.22)] sm:-mt-12 sm:rounded-t-[50px] sm:px-10 sm:pt-16 sm:pb-12 md:-mt-14 md:rounded-t-[60px] md:pt-20 md:pb-14 lg:px-14"
      >
        {/* Subtle decorative ambient glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-32 right-12 h-80 w-80 rounded-full bg-[#2E7D52]/25 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-28 left-10 h-72 w-72 rounded-full bg-[#DAE7C7]/10 blur-3xl"
        />

        <div className="relative z-10 mx-auto w-full">
          <FadeIn y={24} duration={0.7}>
            <div className="grid grid-cols-1 gap-10 border-b border-white/12 pb-12 lg:grid-cols-12 lg:gap-12">
              {/* Column 1: Brand Identity & Direct Contact (5 cols) */}
              <div className="flex flex-col justify-between lg:col-span-5">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-semibold tracking-[0.12em] text-[#DAE7C7] uppercase">
                    <span className="h-2 w-2 rounded-full bg-[#6EE7B7]" />
                    <span>Creative Digital &amp; Reel Studio</span>
                  </div>

                  <a
                    href="#home"
                    onClick={handleScrollToTop}
                    className="mt-5 inline-block text-3xl font-extrabold tracking-[-0.035em] text-white transition-opacity hover:opacity-90 sm:text-4xl md:text-[42px]"
                    style={{
                      fontFamily: 'var(--font-inter-tight), sans-serif',
                    }}
                  >
                    INGO <span className="text-[#DAE7C7]">×</span> REELMARK
                  </a>

                  <p className="mt-3.5 max-w-[420px] text-sm leading-relaxed text-[#DAE7C7]/85 sm:text-base">
                    Flagship website architecture, brand systems, and
                    high-retention short-form video reels crafted for category
                    leaders.
                  </p>
                </div>

                <div className="mt-7 flex flex-wrap items-center gap-3">
                  <a
                    href="mailto:hello@ingostudio.com"
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-4 py-2 text-xs font-medium text-white transition-colors hover:border-[#DAE7C7]/50 hover:bg-white/15 sm:text-sm"
                  >
                    <Mail className="h-3.5 w-3.5 text-[#DAE7C7]" />
                    <span>hello@ingostudio.com</span>
                  </a>

                  <span className="inline-flex items-center gap-1.5 rounded-full border border-white/12 bg-white/5 px-3.5 py-2 text-xs text-[#DAE7C7]/85">
                    <MapPin className="h-3.5 w-3.5 text-[#DAE7C7]" />
                    <span>Copenhagen · New York · Remote</span>
                  </span>
                </div>
              </div>

              {/* Column 2: Quick Navigation (3 cols) */}
              <div className="lg:col-span-3">
                <h3 className="text-xs font-bold tracking-[0.16em] text-[#DAE7C7] uppercase">
                  Navigation
                </h3>
                <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5 sm:grid-cols-1">
                  {FOOTER_NAV_LINKS.map((link) => (
                    <li key={link.id}>
                      <a
                        href={link.href}
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-white/80 transition-colors hover:text-[#DAE7C7] sm:text-[15px]"
                      >
                        <span>{link.label}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Column 3: Quick-Access Social Media Profiles (4 cols) */}
              <div className="lg:col-span-4">
                <h3 className="text-xs font-bold tracking-[0.16em] text-[#DAE7C7] uppercase">
                  Social Profiles
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-[#DAE7C7]/75 sm:text-sm">
                  Follow our latest campaign reels, behind-the-scenes shoots,
                  and interactive design launches.
                </p>

                <div
                  data-testid="footer-social-links"
                  className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2"
                >
                  {FOOTER_SOCIAL_PROFILES.map((profile) => {
                    const IconComponent =
                      SOCIAL_ICON_MAP[profile.id] ?? Globe;
                    return (
                      <a
                        key={profile.id}
                        href={profile.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-testid={`footer-social-${profile.id}`}
                        aria-label={`${profile.label} (${profile.handle})`}
                        className="group flex items-center justify-between rounded-2xl border border-white/14 bg-white/6 px-3.5 py-3 transition-all duration-300 hover:border-[#DAE7C7]/60 hover:bg-white/12"
                      >
                        <div className="flex min-w-0 items-center gap-2.5">
                          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#DAE7C7]/15 text-[#DAE7C7] transition-colors group-hover:bg-[#DAE7C7] group-hover:text-[#062819]">
                            <IconComponent className="h-4 w-4" />
                          </span>
                          <div className="min-w-0">
                            <p className="truncate text-xs font-semibold text-white sm:text-sm">
                              {profile.label}
                            </p>
                            <p className="truncate text-[11px] text-[#DAE7C7]/75">
                              {profile.handle}
                            </p>
                          </div>
                        </div>
                        <ArrowUpRight className="h-4 w-4 shrink-0 text-[#DAE7C7]/60 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Bottom Bar: Copyright, Privacy Policy Link & Back to Top */}
          <div className="mt-8 flex flex-col items-center justify-between gap-4 text-xs text-[#DAE7C7]/80 sm:flex-row sm:text-sm">
            <p
              data-testid="footer-copyright"
              className="text-center sm:text-left"
            >
              {formatCopyrightNotice(2026)}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-6">
              <a
                href="#privacy-policy"
                onClick={handleOpenPrivacy}
                data-testid="footer-privacy-link"
                className="inline-flex items-center gap-1.5 font-medium text-[#DAE7C7] underline decoration-[#DAE7C7]/40 underline-offset-4 transition-colors hover:text-white hover:decoration-white"
              >
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>Privacy Policy</span>
              </a>

              <Magnet padding={24} strength={3}>
                <a
                  href="#home"
                  onClick={handleScrollToTop}
                  data-testid="footer-back-to-top"
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold tracking-[0.08em] text-white uppercase transition-colors hover:border-[#DAE7C7] hover:bg-[#DAE7C7] hover:text-[#062819]"
                >
                  <span>Back to Top</span>
                  <ArrowUp className="h-3.5 w-3.5" />
                </a>
              </Magnet>
            </div>
          </div>
        </div>
      </footer>

      {/* Accessible In-Page Privacy Policy Modal */}
      <AnimatePresence>
        {privacyOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-[#062819]/75 p-4 backdrop-blur-sm sm:p-6"
            onClick={() => setPrivacyOpen(false)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="privacy-policy-heading"
              data-testid="privacy-policy-modal"
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.97 }}
              transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[85vh] w-full max-w-[620px] overflow-y-auto rounded-[32px] border-2 border-[#C5D8B2] bg-[#FFFFFF] p-6 text-[#101410] shadow-2xl sm:rounded-[40px] sm:p-8"
            >
              <div className="flex items-start justify-between gap-4 border-b border-[#C5D8B2]/70 pb-5">
                <div>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#DAE7C7] px-3.5 py-1 text-xs font-bold tracking-[0.12em] text-[#08482D] uppercase">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    Legal &amp; Data Protection
                  </span>
                  <h2
                    id="privacy-policy-heading"
                    className="mt-2.5 text-2xl font-bold tracking-[-0.025em] text-[#101410] sm:text-3xl"
                    style={{
                      fontFamily: 'var(--font-inter-tight), sans-serif',
                    }}
                  >
                    Privacy Policy
                  </h2>
                  <p className="mt-1 text-xs text-[#5E5E61] sm:text-sm">
                    Effective October 2026 · INGO × Reelmark Creative Studio
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setPrivacyOpen(false)}
                  data-testid="close-privacy-modal"
                  aria-label="Close Privacy Policy"
                  className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full border border-[#C5D8B2] bg-[#F5F8EF] text-[#101410] transition-colors hover:border-[#08482D] hover:bg-[#08482D] hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="mt-4 space-y-2.5">
                {PRIVACY_POLICY_SECTIONS.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-[#C5D8B2]/70 bg-[#F5F8EF]/70 px-4 py-3"
                  >
                    <h3 className="text-sm font-bold text-[#08482D]">
                      {item.title}
                    </h3>
                    <p className="mt-0.5 text-xs leading-relaxed text-[#5E5E61] sm:text-[13px]">
                      {item.summary}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-5 flex items-center justify-between border-t border-[#C5D8B2]/70 pt-4">
                <p className="text-xs text-[#5E5E61]">
                  Questions? Email{' '}
                  <a
                    href="mailto:privacy@ingostudio.com"
                    className="font-semibold text-[#08482D] underline"
                  >
                    privacy@ingostudio.com
                  </a>
                </p>
                <button
                  type="button"
                  onClick={() => setPrivacyOpen(false)}
                  className="cursor-pointer rounded-full bg-[#08482D] px-5 py-2 text-xs font-semibold tracking-wider text-white uppercase transition-colors hover:bg-[#101410]"
                >
                  Done
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
});
