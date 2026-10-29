'use client';

import React, { useState } from 'react';
import {
  Mail,
  Phone,
  ArrowUpRight,
  Instagram,
  Youtube,
  Linkedin,
  Globe,
  CheckCircle2,
  Sparkles,
  ChevronDown,
} from 'lucide-react';
import {
  SERVICE_REQUIRED_OPTIONS,
  validateContactForm,
  type ContactFormValues,
} from '@/lib/contact-form';
import { FadeIn, AnimatedText, Magnet } from './reusable-ui';

const SOCIAL_LINKS = [
  {
    id: 'instagram',
    label: 'Instagram',
    handle: '@ingo.studio',
    href: '#contact',
    Icon: Instagram,
  },
  {
    id: 'youtube',
    label: 'YouTube',
    handle: '@reelmark.tv',
    href: '#contact',
    Icon: Youtube,
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    handle: 'INGO Digital',
    href: '#contact',
    Icon: Linkedin,
  },
  {
    id: 'website',
    label: 'Showcase',
    handle: 'reelmark.studio',
    href: '#work',
    Icon: Globe,
  },
];

export const ContactSection = React.memo(function ContactSection() {
  const [formValues, setFormValues] = useState<ContactFormValues>({
    name: '',
    phone: '',
    email: '',
    serviceRequired: '',
    message: '',
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof ContactFormValues, string>>
  >({});
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleChange = (
    field: keyof ContactFormValues,
    value: string
  ) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validation = validateContactForm(formValues);
    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }
    setErrors({});
    setSubmitted(true);
  };

  const handleReset = () => {
    setFormValues({
      name: '',
      phone: '',
      email: '',
      serviceRequired: '',
      message: '',
    });
    setErrors({});
    setSubmitted(false);
  };

  return (
    <section
      id="contact"
      data-testid="contact-section"
      aria-label="Contact Us — Start a Project"
      className="relative z-50 -mt-10 w-full rounded-t-[40px] border-t-2 border-[#C5D8B2] bg-[#F5F8EF] px-5 pt-16 pb-24 shadow-[0_-24px_60px_rgba(8,72,45,0.08)] transition-colors duration-300 sm:-mt-12 sm:rounded-t-[50px] sm:px-10 sm:pt-20 sm:pb-32 md:-mt-14 md:rounded-t-[60px] md:pt-24 md:pb-40 lg:px-14 dark:border-[#1F4734] dark:bg-[#050C08] dark:shadow-[0_-24px_60px_rgba(0,0,0,0.5)]"
    >
      <div className="mx-auto w-full">
        {/* Section Header — Synced with Services, Work, About, and Trusted By */}
        <div className="relative mb-12 flex flex-col items-center text-center md:mb-16">
          <FadeIn y={20} duration={0.6}>
            <div className="inline-flex h-[38px] items-center justify-center rounded-full bg-[#DAE7C7] px-5 text-[15px] font-medium text-[#08482D] sm:text-[16.5px] dark:bg-[#163828] dark:text-[#A7F3D0]">
              Start a Conversation
            </div>
          </FadeIn>

          <FadeIn y={28} delay={0.1} duration={0.7}>
            <h2
              className="hero-heading mt-4 bg-gradient-to-br from-[#101410] via-[#08482D] to-[#2E7D52] bg-clip-text text-5xl leading-[1.02] font-bold tracking-[-0.035em] text-transparent sm:text-6xl md:text-7xl lg:text-[88px]"
              style={{ fontFamily: 'var(--font-inter-tight), sans-serif' }}
            >
              Let&apos;s Talk
            </h2>
          </FadeIn>

          <div className="mt-4 flex max-w-[640px] flex-col items-center">
            <AnimatedText
              text="Have a product launch, brand identity, or short-form reel campaign in mind? Share your goals and our studio leads will respond within 24 hours."
              className="justify-center text-center text-base leading-relaxed text-[#5E5E61] sm:text-lg md:text-[20px] dark:text-[#A3B8AC]"
            />
          </div>

          {/* Handwritten Caveat Note & Arrow on Desktop */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-4 right-4 hidden lg:block xl:right-16"
          >
            <p
              className="rotate-[10deg] text-[26px] leading-[0.95] font-semibold text-[#08482D] dark:text-[#6EE7B7]"
              style={{ fontFamily: 'var(--font-caveat), cursive' }}
            >
              Replies within
              <br />
              24 hours
            </p>
            <svg
              viewBox="0 0 90 95"
              className="mt-1 ml-6 h-[74px] w-[70px] fill-none stroke-[#08482D] dark:stroke-[#6EE7B7]"
            >
              <path
                d="M42 4 C 58 28, 54 58, 22 82"
                strokeWidth="2.4"
                strokeLinecap="round"
              />
              <path
                d="M34 83 L 19 84 L 24 70"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        {/* Main Rounded Showcase Card housing CTA, Direct Email, Socials & Form */}
        <FadeIn y={34} delay={0.15} duration={0.75}>
          <div
            data-testid="contact-main-card"
            className="relative w-full rounded-[40px] border-2 border-[#C5D8B2] bg-[#FFFFFF] p-5 shadow-[0_28px_70px_-18px_rgba(8,72,45,0.14)] transition-colors duration-300 sm:rounded-[50px] sm:p-7 md:rounded-[60px] md:p-10 dark:border-[#1F4734] dark:bg-[#0F2118] dark:shadow-[0_28px_70px_-18px_rgba(0,0,0,0.65)]"
          >
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
              {/* Left Column (5 cols): Brief CTA, Email Address Link & Social Media Placeholders */}
              <div className="flex flex-col justify-between rounded-[32px] border border-[#C5D8B2]/80 bg-[#F5F8EF] p-6 sm:rounded-[42px] sm:p-8 lg:col-span-5 dark:border-[#1F4734] dark:bg-[#132A1F]">
                <div>
                  <div className="flex items-center gap-3">
                    <span
                      className="text-4xl leading-none font-bold tracking-[-0.04em] text-[#08482D] sm:text-5xl dark:text-[#6EE7B7]"
                      style={{
                        fontFamily: 'var(--font-inter-tight), sans-serif',
                      }}
                    >
                      01
                    </span>
                    <span className="inline-flex w-fit items-center rounded-full bg-[#DAE7C7] px-3.5 py-1 text-xs font-medium tracking-wide text-[#08482D] uppercase sm:text-sm dark:bg-[#163828] dark:text-[#A7F3D0]">
                      Direct Channel
                    </span>
                  </div>

                  <h3
                    className="mt-5 text-2xl leading-tight font-bold tracking-[-0.025em] text-[#101410] sm:text-3xl md:text-[34px] dark:text-[#F4F9F5]"
                    style={{
                      fontFamily: 'var(--font-inter-tight), sans-serif',
                    }}
                  >
                    Ready to captivate your audience?
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-[#5E5E61] sm:text-base dark:text-[#A3B8AC]">
                    Whether you need a complete brand identity, high-converting ads, or a flagship website, our creative crew is ready to partner with you.
                  </p>

                  {/* Direct Email Address Link Card */}
                  <div className="mt-6 space-y-3">
                    <span className="block text-xs font-semibold tracking-widest text-[#08482D] uppercase dark:text-[#6EE7B7]">
                      Direct Studio Email
                    </span>
                    <a
                      href="mailto:hello@ingostudio.com"
                      data-testid="contact-email-link"
                      className="group flex items-center justify-between rounded-[24px] border border-[#C5D8B2] bg-[#FFFFFF] p-4 transition-all duration-300 hover:border-[#08482D] hover:shadow-[0_12px_28px_-10px_rgba(8,72,45,0.16)] dark:border-[#1F4734] dark:bg-[#0F2118] dark:hover:border-[#34D399]"
                    >
                      <div className="flex items-center gap-3.5 overflow-hidden">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#DAE7C7] text-[#08482D] transition-colors duration-300 group-hover:bg-[#08482D] group-hover:text-white dark:bg-[#163828] dark:text-[#6EE7B7] dark:group-hover:bg-[#10B981] dark:group-hover:text-[#050C08]">
                          <Mail className="h-5 w-5" />
                        </div>
                        <div className="overflow-hidden">
                          <div className="text-xs font-medium text-[#5E5E61] dark:text-[#A3B8AC]">
                            Drop us a line anytime
                          </div>
                          <div
                            className="truncate text-base font-bold text-[#101410] transition-colors group-hover:text-[#08482D] sm:text-lg dark:text-[#F4F9F5] dark:group-hover:text-[#6EE7B7]"
                            style={{
                              fontFamily: 'var(--font-inter-tight), sans-serif',
                            }}
                          >
                            hello@ingostudio.com
                          </div>
                        </div>
                      </div>

                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#08482D]/15 text-[#08482D] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:bg-[#DAE7C7]/50 dark:border-[#1F4734] dark:text-[#6EE7B7] dark:group-hover:bg-[#163828]">
                        <ArrowUpRight className="h-4 w-4" />
                      </div>
                    </a>

                    {/* Direct Phone Card */}
                    <a
                      href="tel:+14158904420"
                      className="group flex items-center justify-between rounded-[24px] border border-[#C5D8B2]/70 bg-[#FFFFFF]/80 px-4 py-3.5 transition-all duration-300 hover:border-[#08482D] hover:bg-[#FFFFFF] dark:border-[#1F4734] dark:bg-[#0F2118]/90 dark:hover:border-[#34D399]"
                    >
                      <div className="flex items-center gap-3.5">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#DAE7C7]/70 text-[#08482D] dark:bg-[#163828] dark:text-[#6EE7B7]">
                          <Phone className="h-4 w-4" />
                        </div>
                        <div>
                          <div className="text-xs font-medium text-[#5E5E61] dark:text-[#A3B8AC]">
                            Studio Desk
                          </div>
                          <div className="text-sm font-semibold text-[#101410] sm:text-base dark:text-[#F4F9F5]">
                            +1 (415) 890-4420
                          </div>
                        </div>
                      </div>
                      <span className="rounded-full bg-[#DAE7C7] px-2.5 py-0.5 text-[11px] font-medium text-[#08482D] dark:bg-[#163828] dark:text-[#A7F3D0]">
                        Mon–Fri
                      </span>
                    </a>
                  </div>
                </div>

                {/* Social Media Icon Placeholders */}
                <div className="mt-8 border-t border-[#08482D]/12 pt-6 dark:border-[#1F4734]">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-xs font-semibold tracking-widest text-[#08482D] uppercase dark:text-[#6EE7B7]">
                      Connect on Social
                    </span>
                    <span className="text-xs text-[#5E5E61] dark:text-[#A3B8AC]">
                      @ingo.studio
                    </span>
                  </div>

                  <div
                    data-testid="contact-social-links"
                    className="grid grid-cols-4 gap-2.5 sm:gap-3"
                  >
                    {SOCIAL_LINKS.map(({ id, label, Icon, href }) => (
                      <a
                        key={id}
                        href={href}
                        aria-label={label}
                        data-testid={`contact-social-${id}`}
                        className="group flex flex-col items-center justify-center gap-1.5 rounded-[20px] border border-[#C5D8B2] bg-[#FFFFFF] py-3.5 text-[#101410] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#08482D] hover:bg-[#08482D] hover:text-white hover:shadow-md dark:border-[#1F4734] dark:bg-[#0F2118] dark:text-[#F4F9F5] dark:hover:border-[#34D399] dark:hover:bg-[#10B981] dark:hover:text-[#050C08]"
                      >
                        <Icon className="h-5 w-5 text-[#08482D] transition-colors duration-300 group-hover:text-[#DAE7C7] dark:text-[#6EE7B7] dark:group-hover:text-[#050C08]" />
                        <span className="text-[11px] font-medium tracking-tight">
                          {label}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column (7 cols): Inquiry Form */}
              <div className="flex flex-col justify-between lg:col-span-7">
                <div className="mb-5 flex flex-col gap-2 border-b border-[#08482D]/12 pb-4 sm:flex-row sm:items-center sm:justify-between dark:border-[#1F4734]">
                  <div className="flex flex-wrap items-baseline gap-3 sm:gap-4">
                    <span
                      className="text-4xl leading-none font-bold tracking-[-0.04em] text-[#08482D] sm:text-5xl dark:text-[#6EE7B7]"
                      style={{
                        fontFamily: 'var(--font-inter-tight), sans-serif',
                      }}
                    >
                      02
                    </span>
                    <span className="inline-flex w-fit items-center rounded-full bg-[#DAE7C7] px-3.5 py-1 text-xs font-medium tracking-wide text-[#08482D] uppercase sm:text-sm dark:bg-[#163828] dark:text-[#A7F3D0]">
                      Project Brief
                    </span>
                    <h3
                      className="text-2xl font-bold tracking-[-0.025em] text-[#101410] sm:text-3xl dark:text-[#F4F9F5]"
                      style={{
                        fontFamily: 'var(--font-inter-tight), sans-serif',
                      }}
                    >
                      Send Us a Message
                    </h3>
                  </div>

                  <span className="text-xs font-medium tracking-widest text-[#5E5E61] uppercase dark:text-[#A3B8AC]">
                    Zero Commitment
                  </span>
                </div>

                {submitted ? (
                  <div
                    data-testid="contact-success-banner"
                    className="my-auto flex flex-col items-center justify-center rounded-[32px] border-2 border-[#C5D8B2] bg-[#F5F8EF] p-8 text-center sm:p-12 dark:border-[#1F4734] dark:bg-[#132A1F]"
                  >
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#DAE7C7] text-[#08482D] dark:bg-[#163828] dark:text-[#34D399]">
                      <CheckCircle2 className="h-8 w-8" />
                    </div>
                    <h4
                      className="mt-4 text-2xl font-bold text-[#101410] sm:text-3xl dark:text-[#F4F9F5]"
                      style={{
                        fontFamily: 'var(--font-inter-tight), sans-serif',
                      }}
                    >
                      Inquiry Received, {formValues.name}!
                    </h4>
                    <p className="mt-2 max-w-md text-sm leading-relaxed text-[#5E5E61] sm:text-base dark:text-[#A3B8AC]">
                      Thank you for reaching out regarding{' '}
                      <strong className="text-[#08482D] dark:text-[#6EE7B7]">
                        {formValues.serviceRequired}
                      </strong>
                      . Our producer will contact you at{' '}
                      <span className="underline">{formValues.email}</span>{' '}
                      within 24 hours.
                    </p>
                    <button
                      type="button"
                      onClick={handleReset}
                      className="mt-6 cursor-pointer rounded-full border-2 border-[#08482D] bg-white px-7 py-2.5 text-xs font-semibold tracking-widest text-[#08482D] uppercase transition-colors hover:bg-[#DAE7C7] dark:border-[#34D399] dark:bg-[#0F2118] dark:text-[#6EE7B7] dark:hover:bg-[#163828]"
                    >
                      Send Another Inquiry
                    </button>
                  </div>
                ) : (
                  <form
                    onSubmit={handleSubmit}
                    noValidate
                    data-testid="contact-inquiry-form"
                    className="space-y-4 sm:space-y-5"
                  >
                    {/* Row 1: Name & Phone Number */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      {/* Name Field */}
                      <div>
                        <label
                          htmlFor="contact-name"
                          className="mb-1.5 block text-xs font-semibold tracking-wider text-[#101410] uppercase dark:text-[#F4F9F5]"
                        >
                          Name <span className="text-[#08482D] dark:text-[#34D399]">*</span>
                        </label>
                        <input
                          id="contact-name"
                          name="name"
                          type="text"
                          required
                          value={formValues.name}
                          onChange={(e) => handleChange('name', e.target.value)}
                          placeholder="Your full name"
                          className="w-full rounded-[20px] border border-[#C5D8B2] bg-[#F5F8EF]/70 px-4 py-3.5 text-sm text-[#101410] placeholder-[#5E5E61]/60 transition-colors focus:border-[#08482D] focus:bg-white focus:outline-none sm:text-base dark:border-[#1F4734] dark:bg-[#132A1F] dark:text-[#F4F9F5] dark:placeholder-[#A3B8AC]/60 dark:focus:border-[#34D399] dark:focus:bg-[#0F2118]"
                        />
                        {errors.name && (
                          <p className="mt-1 text-xs font-medium text-red-600 dark:text-red-400">
                            {errors.name}
                          </p>
                        )}
                      </div>

                      {/* Phone Number Field */}
                      <div>
                        <label
                          htmlFor="contact-phone"
                          className="mb-1.5 block text-xs font-semibold tracking-wider text-[#101410] uppercase dark:text-[#F4F9F5]"
                        >
                          Phone Number <span className="text-[#08482D] dark:text-[#34D399]">*</span>
                        </label>
                        <input
                          id="contact-phone"
                          name="phone"
                          type="tel"
                          required
                          value={formValues.phone}
                          onChange={(e) =>
                            handleChange('phone', e.target.value)
                          }
                          placeholder="+1 (555) 234-5678"
                          className="w-full rounded-[20px] border border-[#C5D8B2] bg-[#F5F8EF]/70 px-4 py-3.5 text-sm text-[#101410] placeholder-[#5E5E61]/60 transition-colors focus:border-[#08482D] focus:bg-white focus:outline-none sm:text-base dark:border-[#1F4734] dark:bg-[#132A1F] dark:text-[#F4F9F5] dark:placeholder-[#A3B8AC]/60 dark:focus:border-[#34D399] dark:focus:bg-[#0F2118]"
                        />
                        {errors.phone && (
                          <p className="mt-1 text-xs font-medium text-red-600 dark:text-red-400">
                            {errors.phone}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Row 2: Email & Services Required Dropdown */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      {/* Email Field */}
                      <div>
                        <label
                          htmlFor="contact-email"
                          className="mb-1.5 block text-xs font-semibold tracking-wider text-[#101410] uppercase dark:text-[#F4F9F5]"
                        >
                          Email <span className="text-[#08482D] dark:text-[#34D399]">*</span>
                        </label>
                        <input
                          id="contact-email"
                          name="email"
                          type="email"
                          required
                          value={formValues.email}
                          onChange={(e) =>
                            handleChange('email', e.target.value)
                          }
                          placeholder="you@company.com"
                          className="w-full rounded-[20px] border border-[#C5D8B2] bg-[#F5F8EF]/70 px-4 py-3.5 text-sm text-[#101410] placeholder-[#5E5E61]/60 transition-colors focus:border-[#08482D] focus:bg-white focus:outline-none sm:text-base dark:border-[#1F4734] dark:bg-[#132A1F] dark:text-[#F4F9F5] dark:placeholder-[#A3B8AC]/60 dark:focus:border-[#34D399] dark:focus:bg-[#0F2118]"
                        />
                        {errors.email && (
                          <p className="mt-1 text-xs font-medium text-red-600 dark:text-red-400">
                            {errors.email}
                          </p>
                        )}
                      </div>

                      {/* Services Required Select Dropdown */}
                      <div>
                        <label
                          htmlFor="contact-service"
                          className="mb-1.5 block text-xs font-semibold tracking-wider text-[#101410] uppercase dark:text-[#F4F9F5]"
                        >
                          Services Required{' '}
                          <span className="text-[#08482D] dark:text-[#34D399]">*</span>
                        </label>
                        <div className="relative">
                          <select
                            id="contact-service"
                            name="serviceRequired"
                            required
                            value={formValues.serviceRequired}
                            onChange={(e) =>
                              handleChange('serviceRequired', e.target.value)
                            }
                            className="w-full appearance-none rounded-[20px] border border-[#C5D8B2] bg-[#F5F8EF]/70 px-4 py-3.5 pr-10 text-sm text-[#101410] transition-colors focus:border-[#08482D] focus:bg-white focus:outline-none sm:text-base dark:border-[#1F4734] dark:bg-[#132A1F] dark:text-[#F4F9F5] dark:focus:border-[#34D399] dark:focus:bg-[#0F2118]"
                          >
                            <option value="" disabled>
                              Select a service...
                            </option>
                            {SERVICE_REQUIRED_OPTIONS.map((service) => (
                              <option key={service} value={service}>
                                {service}
                              </option>
                            ))}
                          </select>
                          <ChevronDown className="pointer-events-none absolute top-1/2 right-3.5 h-4 w-4 -translate-y-1/2 text-[#08482D] dark:text-[#6EE7B7]" />
                        </div>
                        {errors.serviceRequired && (
                          <p className="mt-1 text-xs font-medium text-red-600 dark:text-red-400">
                            {errors.serviceRequired}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Interactive Service Quick-Select Pills (Synced with Services Required field) */}
                    <div>
                      <span className="mb-2 block text-[11px] font-medium tracking-wider text-[#5E5E61] uppercase dark:text-[#A3B8AC]">
                        Or quick-select a service:
                      </span>
                      <div
                        data-testid="contact-service-pills"
                        className="flex flex-wrap gap-2"
                      >
                        {SERVICE_REQUIRED_OPTIONS.map((service) => {
                          const isSelected =
                            formValues.serviceRequired === service;
                          return (
                            <button
                              key={service}
                              type="button"
                              onClick={() =>
                                handleChange('serviceRequired', service)
                              }
                              className={`cursor-pointer rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all duration-200 ${
                                isSelected
                                  ? 'border-[#08482D] bg-[#08482D] text-white shadow-sm dark:border-[#34D399] dark:bg-[#10B981] dark:font-semibold dark:text-[#050C08]'
                                  : 'border-[#C5D8B2] bg-[#F5F8EF] text-[#08482D] hover:border-[#08482D]/50 hover:bg-[#DAE7C7]/60 dark:border-[#1F4734] dark:bg-[#132A1F] dark:text-[#A7F3D0] dark:hover:border-[#34D399]/60 dark:hover:bg-[#163828]'
                              }`}
                            >
                              {service}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Row 3: Message Textarea */}
                    <div>
                      <label
                        htmlFor="contact-message"
                        className="mb-1.5 block text-xs font-semibold tracking-wider text-[#101410] uppercase dark:text-[#F4F9F5]"
                      >
                        Message <span className="text-[#08482D] dark:text-[#34D399]">*</span>
                      </label>
                      <textarea
                        id="contact-message"
                        name="message"
                        rows={4}
                        required
                        value={formValues.message}
                        onChange={(e) =>
                          handleChange('message', e.target.value)
                        }
                        placeholder="Tell us about your project goals, timeline, and what you'd like to create together..."
                        className="w-full resize-none rounded-[22px] border border-[#C5D8B2] bg-[#F5F8EF]/70 p-4 text-sm text-[#101410] placeholder-[#5E5E61]/60 transition-colors focus:border-[#08482D] focus:bg-white focus:outline-none sm:text-base dark:border-[#1F4734] dark:bg-[#132A1F] dark:text-[#F4F9F5] dark:placeholder-[#A3B8AC]/60 dark:focus:border-[#34D399] dark:focus:bg-[#0F2118]"
                      />
                      {errors.message && (
                        <p className="mt-1 text-xs font-medium text-red-600 dark:text-red-400">
                          {errors.message}
                        </p>
                      )}
                    </div>

                    {/* Row 4: Submit CTA Button */}
                    <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-center gap-2 text-xs text-[#5E5E61] dark:text-[#A3B8AC]">
                        <Sparkles className="h-4 w-4 shrink-0 text-[#08482D] dark:text-[#34D399]" />
                        <span>
                          Custom proposal &amp; timeline delivered in 24h.
                        </span>
                      </div>

                      <Magnet padding={48} strength={4}>
                        <button
                          type="submit"
                          data-testid="contact-submit-button"
                          className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full px-9 py-3.5 text-xs font-medium tracking-widest text-white uppercase transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98] sm:w-auto sm:px-11 sm:py-4 sm:text-sm md:text-base"
                          style={{
                            background:
                              'linear-gradient(123deg, #062819 7%, #08482D 37%, #146B44 72%, #2E7D52 100%)',
                            boxShadow:
                              '0px 6px 18px rgba(8, 72, 45, 0.25), 4px 4px 12px #0D5C3A inset',
                            outline: '2px solid #FFFFFF',
                            outlineOffset: '-3px',
                          }}
                        >
                          <span>Send Inquiry</span>
                          <ArrowUpRight className="h-4 w-4" />
                        </button>
                      </Magnet>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
});
