'use client';

import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Moon, Sun } from 'lucide-react';
import {
  PRIMARY_NAV_LINKS,
  computeStickyHeaderStyle,
  type NavSectionId,
} from '@/lib/navigation';
import {
  HERO_NAV_LIST_VARIANTS,
  HERO_NAV_ITEM_VARIANTS,
} from '@/lib/hero-motion';
import type { ThemeMode } from '@/lib/theme';

export type { NavSectionId };

interface HeroNavigationProps {
  translateYPercent: number;
  opacity: number;
  isMobile: boolean;
  isScrolled?: boolean;
  activeSection: NavSectionId;
  onSelectSection: (section: NavSectionId) => void;
  theme?: ThemeMode;
  onToggleTheme?: () => void;
}

export const HeroNavigation = React.memo(function HeroNavigation({
  translateYPercent,
  opacity,
  isMobile,
  isScrolled = false,
  activeSection,
  onSelectSection,
  theme = 'light',
  onToggleTheme,
}: HeroNavigationProps) {
  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    section: NavSectionId
  ) => {
    e.preventDefault();
    onSelectSection(section);
  };

  const headerStyle = computeStickyHeaderStyle(
    translateYPercent,
    opacity,
    isScrolled
  );

  const visibleLinks = isMobile
    ? PRIMARY_NAV_LINKS.filter((item) => item.mobileVisible)
    : PRIMARY_NAV_LINKS;

  const isDark = theme === 'dark';

  return (
    <header
      data-testid="sticky-header"
      data-scrolled={isScrolled ? 'true' : 'false'}
      data-theme={theme}
      className={`fixed top-0 right-0 left-0 z-[60] transition-all duration-300 will-change-transform ${
        isScrolled
          ? 'border-b border-[#C5D8B2]/80 bg-[#FFFFFF]/90 shadow-[0_8px_30px_rgba(8,72,45,0.06)] backdrop-blur-md dark:border-[#1F4734]/90 dark:bg-[#050C08]/90 dark:shadow-[0_8px_30px_rgba(0,0,0,0.45)]'
          : 'bg-transparent'
      }`}
      style={{
        transform: `translate3d(0, ${headerStyle.translateYPercent}%, 0)`,
        opacity: headerStyle.opacity,
      }}
    >
      <nav
        aria-label="Primary navigation"
        className={`mx-auto flex w-full max-w-[1440px] items-center justify-between transition-all duration-300 ${
          isMobile
            ? isScrolled
              ? 'px-4 py-3 text-[12px]'
              : 'px-[20px] pt-[20px] pb-3 text-[12.5px]'
            : isScrolled
              ? 'px-10 py-3.5 text-[13px] lg:px-14'
              : 'px-10 pt-7 pb-4 text-[13px] lg:px-14'
        } font-medium tracking-[0.01em]`}
      >
        {/* Left / Primary Section Links */}
        <div
          className={`flex items-center ${
            isMobile ? 'w-full justify-between gap-2' : 'gap-8 lg:gap-10'
          }`}
        >
          {/* Compact Brand Mark when Scrolled on Desktop */}
          {!isMobile && isScrolled && (
            <a
              href="#home"
              data-testid="nav-brand-logo"
              onClick={(e) => handleNavClick(e, 'home')}
              className="mr-2 inline-flex items-center gap-2 font-extrabold tracking-[-0.04em] text-[#101410] uppercase transition-colors duration-200 hover:text-[#08482D] focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-[#08482D] focus-visible:ring-offset-2 focus-visible:outline-none dark:text-[#F4F9F5] dark:hover:text-[#6EE7B7]"
            >
              <span
                aria-hidden="true"
                className="h-2 w-2 rounded-full bg-[#08482D] dark:bg-[#34D399]"
              />
              <span className="text-[14px] leading-none">INGO</span>
            </a>
          )}

          <motion.ul
            variants={HERO_NAV_LIST_VARIANTS}
            initial="hidden"
            animate="visible"
            className={`flex items-center ${
              isMobile ? 'flex-1 justify-between gap-1.5 pr-2' : 'gap-7 lg:gap-9'
            }`}
          >
            {visibleLinks.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <motion.li
                  key={item.id}
                  variants={HERO_NAV_ITEM_VARIANTS}
                  className="shrink-0"
                >
                  <a
                    href={item.href}
                    data-testid={`nav-link-${item.id}`}
                    onClick={(e) => handleNavClick(e, item.id)}
                    aria-current={isActive ? 'page' : undefined}
                    className={`relative inline-block py-1 whitespace-nowrap transition-colors duration-200 focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-[#08482D] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FFFFFF] focus-visible:outline-none dark:focus-visible:ring-[#34D399] dark:focus-visible:ring-offset-[#050C08] ${
                      isActive
                        ? 'font-semibold text-[#08482D] dark:text-[#6EE7B7]'
                        : 'text-[#4A554C] hover:text-[#101410] dark:text-[#A3B8AC] dark:hover:text-[#F4F9F5]'
                    }`}
                  >
                    {item.label}
                    <span
                      aria-hidden="true"
                      className={`absolute right-0 -bottom-0.5 left-0 h-[1.5px] origin-left bg-[#08482D] transition-transform duration-200 dark:bg-[#34D399] ${
                        isActive
                          ? 'scale-x-100 opacity-95'
                          : 'scale-x-0 opacity-0'
                      }`}
                    />
                  </a>
                </motion.li>
              );
            })}
          </motion.ul>

          {/* Mobile Theme Toggle Button */}
          {isMobile && onToggleTheme && (
            <motion.button
              type="button"
              data-testid="theme-toggle"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.45, delay: 0.35 }}
              whileTap={{ scale: 0.94 }}
              onClick={onToggleTheme}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              aria-pressed={isDark}
              className="inline-flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full border border-[#C5D8B2] bg-[#F5F8EF] text-[#08482D] transition-colors duration-200 hover:border-[#08482D] dark:border-[#1F4734] dark:bg-[#0F2118] dark:text-[#6EE7B7] dark:hover:border-[#34D399]"
            >
              {isDark ? (
                <Sun className="h-3.5 w-3.5" aria-hidden="true" />
              ) : (
                <Moon className="h-3.5 w-3.5" aria-hidden="true" />
              )}
            </motion.button>
          )}
        </div>

        {/* Right Navigation: Desktop only (> 720px) */}
        {!isMobile && (
          <motion.ul
            variants={HERO_NAV_LIST_VARIANTS}
            initial="hidden"
            animate="visible"
            className="flex items-center gap-6 lg:gap-7"
          >
            <motion.li variants={HERO_NAV_ITEM_VARIANTS} className="shrink-0">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="INGO on Instagram"
                className="inline-block py-1 whitespace-nowrap text-[#4A554C] transition-colors duration-200 hover:text-[#101410] focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-[#08482D] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FFFFFF] focus-visible:outline-none dark:text-[#A3B8AC] dark:hover:text-[#F4F9F5]"
              >
                Instagram
              </a>
            </motion.li>

            {onToggleTheme && (
              <motion.li variants={HERO_NAV_ITEM_VARIANTS} className="shrink-0">
                <motion.button
                  type="button"
                  data-testid="theme-toggle"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={onToggleTheme}
                  aria-label={
                    isDark ? 'Switch to light mode' : 'Switch to dark mode'
                  }
                  aria-pressed={isDark}
                  className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-[#C5D8B2] bg-[#F5F8EF]/90 px-3 py-1.5 text-[12px] font-semibold text-[#08482D] transition-colors duration-200 hover:border-[#08482D] hover:bg-[#DAE7C7]/70 focus-visible:ring-2 focus-visible:ring-[#08482D] focus-visible:outline-none dark:border-[#1F4734] dark:bg-[#0F2118] dark:text-[#6EE7B7] dark:hover:border-[#34D399] dark:hover:bg-[#163828]"
                >
                  {isDark ? (
                    <>
                      <Sun className="h-3.5 w-3.5 text-[#6EE7B7]" aria-hidden="true" />
                      <span>Light</span>
                    </>
                  ) : (
                    <>
                      <Moon className="h-3.5 w-3.5 text-[#08482D]" aria-hidden="true" />
                      <span>Dark</span>
                    </>
                  )}
                </motion.button>
              </motion.li>
            )}

            <motion.li variants={HERO_NAV_ITEM_VARIANTS} className="shrink-0">
              <motion.a
                href="#contact"
                data-testid="nav-cta-contact"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={(e) => handleNavClick(e, 'contact')}
                aria-current={activeSection === 'contact' ? 'page' : undefined}
                className={`inline-flex items-center gap-1.5 whitespace-nowrap transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-[#08482D] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FFFFFF] focus-visible:outline-none dark:focus-visible:ring-[#34D399] ${
                  isScrolled
                    ? 'rounded-full bg-[#08482D] px-4 py-1.5 text-[12.5px] font-semibold text-[#FFFFFF] shadow-[0_4px_14px_rgba(8,72,45,0.2)] hover:bg-[#0B5E3B] dark:bg-[#10B981] dark:text-[#050C08] dark:hover:bg-[#34D399]'
                    : activeSection === 'contact'
                      ? 'py-1 font-semibold text-[#08482D] dark:text-[#6EE7B7]'
                      : 'py-1 font-semibold text-[#101410] hover:text-[#08482D] dark:text-[#F4F9F5] dark:hover:text-[#6EE7B7]'
                }`}
              >
                <span>Let&apos;s Talk</span>
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </motion.a>
            </motion.li>
          </motion.ul>
        )}
      </nav>
    </header>
  );
});
