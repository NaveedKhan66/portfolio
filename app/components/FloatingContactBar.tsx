'use client'

import React, { useState, useEffect, useRef, useMemo } from 'react'
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion'
import { Copy, Check, X, PhoneCall, ArrowUp, Mail } from 'lucide-react'

const EMAIL = 'its.naveedkhan66@gmail.com'
const PHONE_RAW = '+923244400773'
const PHONE_DISPLAY = '+92 324 4400773'
const LINKEDIN_URL = 'https://www.linkedin.com/in/naveed-khan66/'

/**
 * Generates an SVG path for a rounded rectangle starting from top-center
 * and tracing clockwise so stroke progress acts like an intuitive loading bar.
 */
function getRoundedRectPath(
  w: number,
  h: number,
  r: number,
  strokeWidth: number = 2
) {
  const inset = strokeWidth / 2
  const x = inset
  const y = inset
  const width = Math.max(0, w - strokeWidth)
  const height = Math.max(0, h - strokeWidth)
  const radius = Math.min(r, width / 2, height / 2)

  return `
    M ${x + width / 2} ${y}
    H ${x + width - radius}
    A ${radius} ${radius} 0 0 1 ${x + width} ${y + radius}
    V ${y + height - radius}
    A ${radius} ${radius} 0 0 1 ${x + width - radius} ${y + height}
    H ${x + radius}
    A ${radius} ${radius} 0 0 1 ${x} ${y + height - radius}
    V ${y + radius}
    A ${radius} ${radius} 0 0 1 ${x + radius} ${y}
    Z
  `
}

export default function FloatingContactBar() {
  const [isMobile, setIsMobile] = useState<boolean>(false)
  const [isEmailPopupOpen, setIsEmailPopupOpen] = useState<boolean>(false)
  const [isPhonePopupOpen, setIsPhonePopupOpen] = useState<boolean>(false)
  const [copiedEmail, setCopiedEmail] = useState<boolean>(false)
  const [copiedPhone, setCopiedPhone] = useState<boolean>(false)
  const [isAtBottom, setIsAtBottom] = useState<boolean>(false)
  const [dimensions, setDimensions] = useState<{ width: number; height: number }>({
    width: 46,
    height: 128,
  })

  const containerRef = useRef<HTMLElement>(null)
  const emailPopupRef = useRef<HTMLDivElement>(null)
  const emailButtonRef = useRef<HTMLButtonElement>(null)
  const phonePopupRef = useRef<HTMLDivElement>(null)
  const phoneButtonRef = useRef<HTMLButtonElement>(null)

  // Track page scroll progress
  const { scrollYProgress } = useScroll()
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 240,
    damping: 30,
    restDelta: 0.001,
  })

  // Measure container dimensions for SVG progress border
  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const updateSize = () => {
      const rect = el.getBoundingClientRect()
      if (rect.width > 0 && rect.height > 0) {
        setDimensions({ width: rect.width, height: rect.height })
      }
    }

    updateSize()

    const observer = new ResizeObserver(() => {
      updateSize()
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Detect bottom of page to show scroll-to-top button
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      setIsAtBottom(latest >= 0.88)
    })
    return () => unsubscribe()
  }, [scrollYProgress])

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      if (typeof window === 'undefined') return
      const ua = navigator.userAgent || ''
      const isMobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua)
      const hasTouch =
        ('maxTouchPoints' in navigator && navigator.maxTouchPoints > 0) ||
        window.matchMedia('(pointer: coarse)').matches
      setIsMobile(isMobileUA || (hasTouch && window.innerWidth < 768))
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Close popups on click outside or escape key
  useEffect(() => {
    if (!isPhonePopupOpen && !isEmailPopupOpen) return

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node

      if (
        isEmailPopupOpen &&
        emailPopupRef.current &&
        !emailPopupRef.current.contains(target) &&
        emailButtonRef.current &&
        !emailButtonRef.current.contains(target)
      ) {
        setIsEmailPopupOpen(false)
      }

      if (
        isPhonePopupOpen &&
        phonePopupRef.current &&
        !phonePopupRef.current.contains(target) &&
        phoneButtonRef.current &&
        !phoneButtonRef.current.contains(target)
      ) {
        setIsPhonePopupOpen(false)
      }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsEmailPopupOpen(false)
        setIsPhonePopupOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isPhonePopupOpen, isEmailPopupOpen])

  // Handle email click (toggles email popup)
  const handleEmailClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsPhonePopupOpen(false)
    setIsEmailPopupOpen((prev) => !prev)
  }

  // Handle phone click
  const handlePhoneClick = (e: React.MouseEvent) => {
    if (isMobile) {
      window.location.href = `tel:${PHONE_RAW}`
    } else {
      e.preventDefault()
      setIsEmailPopupOpen(false)
      setIsPhonePopupOpen((prev) => !prev)
    }
  }

  // Handle copying email
  const handleCopyEmail = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(EMAIL)
      } else {
        const textArea = document.createElement('textarea')
        textArea.value = EMAIL
        textArea.style.position = 'fixed'
        textArea.style.opacity = '0'
        document.body.appendChild(textArea)
        textArea.select()
        document.execCommand('copy')
        document.body.removeChild(textArea)
      }
      setCopiedEmail(true)
      setTimeout(() => setCopiedEmail(false), 2200)
    } catch {
      setCopiedEmail(false)
    }
  }

  // Handle copying phone number
  const handleCopyPhone = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(PHONE_RAW)
      } else {
        const textArea = document.createElement('textarea')
        textArea.value = PHONE_RAW
        textArea.style.position = 'fixed'
        textArea.style.opacity = '0'
        document.body.appendChild(textArea)
        textArea.select()
        document.execCommand('copy')
        document.body.removeChild(textArea)
      }
      setCopiedPhone(true)
      setTimeout(() => setCopiedPhone(false), 2200)
    } catch {
      setCopiedPhone(false)
    }
  }

  // Scroll to top handler
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  // SVG path for rounded-rectangle progress border
  const pathD = useMemo(() => {
    if (dimensions.width <= 0 || dimensions.height <= 0) return ''
    return getRoundedRectPath(dimensions.width, dimensions.height, 14, 1.5)
  }, [dimensions])

  return (
    <aside
      aria-label="Quick contact sidebar"
      className="fixed right-3 sm:right-5 bottom-5 sm:bottom-6 z-50 flex flex-col items-center"
    >
      {/* Floating dock with animated progress border */}
      <nav
        ref={containerRef}
        aria-label="Direct contact options"
        className="relative flex flex-col items-center gap-2 sm:gap-2.5 rounded-xl bg-[#0d0d0d]/95 p-1.5 sm:p-2 shadow-xl backdrop-blur-md ring-1 ring-white/5 transition-all duration-300"
      >
        {/* SVG Border Progress Bar */}
        <svg
          className="pointer-events-none absolute inset-0 size-full overflow-visible"
          aria-hidden="true"
        >
          {/* Subtle Base Track */}
          <path
            d={pathD}
            fill="none"
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth={1.5}
          />
          {/* Animated Accent Progress Border (matches site accent #de5e91) */}
          <motion.path
            d={pathD}
            fill="none"
            stroke="#de5e91"
            strokeWidth={1.8}
            strokeLinecap="round"
            style={{ pathLength: smoothProgress }}
            className="drop-shadow-[0_0_5px_rgba(222,94,145,0.45)]"
          />
        </svg>

        {/* 0. Scroll-to-Top Button (appears at the top of this container when at the bottom) */}
        <AnimatePresence>
          {isAtBottom && (
            <motion.div
              initial={{ opacity: 0, height: 0, scale: 0.8, marginBottom: 0 }}
              animate={{ opacity: 1, height: 'auto', scale: 1, marginBottom: 2 }}
              exit={{ opacity: 0, height: 0, scale: 0.8, marginBottom: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="group relative flex flex-col items-center overflow-hidden"
            >
              <button
                type="button"
                onClick={handleScrollToTop}
                aria-label="Scroll to top of website"
                className="flex size-8 items-center justify-center rounded-lg border border-transparent text-[#b7ac98] transition-all duration-200 hover:border-accent/40 hover:bg-accent/20 hover:text-accent hover:shadow-lg hover:shadow-accent/20 active:scale-95"
              >
                <ArrowUp className="size-4 stroke-[2] transition-transform duration-200 group-hover:-translate-y-0.5" />
              </button>

              {/* Desktop Tooltip */}
              <div
                role="tooltip"
                className="pointer-events-none absolute right-[calc(100%+10px)] top-1/2 -translate-y-1/2 whitespace-nowrap rounded-md border border-white/10 bg-[#0e0e12] px-2 py-0.5 text-[11px] font-medium text-white/90 opacity-0 shadow-lg backdrop-blur-md transition-opacity duration-200 group-hover:opacity-100 hidden md:block"
              >
                Back to top
                <span className="absolute -right-1 top-1/2 -translate-y-1/2 size-1.5 rotate-45 border-r border-t border-white/10 bg-[#0e0e12]" />
              </div>

              {/* Subtle divider below scroll-to-top */}
              <div className="mt-1.5 h-px w-4 bg-white/15" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* 1. Email Icon (@) */}
        <div className="group relative flex items-center justify-center">
          <button
            ref={emailButtonRef}
            type="button"
            onClick={handleEmailClick}
            aria-label={`Show email address ${EMAIL}`}
            aria-expanded={isEmailPopupOpen}
            className={`flex size-8 items-center justify-center rounded-lg border transition-all duration-200 active:scale-95 ${
              isEmailPopupOpen
                ? 'border-accent/40 bg-accent/20 text-accent shadow-lg shadow-accent/20 ring-1 ring-accent/30'
                : 'border-transparent text-[#b7ac98] hover:border-accent/40 hover:bg-accent/20 hover:text-accent hover:shadow-lg hover:shadow-accent/20'
            }`}
          >
            <span
              className="select-none font-sans text-base font-bold leading-none translate-y-[-0.5px]"
              aria-hidden="true"
            >
              @
            </span>
          </button>

          {/* Desktop Tooltip (only when popup is closed) */}
          {!isEmailPopupOpen && (
            <div
              role="tooltip"
              className="pointer-events-none absolute right-[calc(100%+10px)] top-1/2 -translate-y-1/2 whitespace-nowrap rounded-md border border-white/10 bg-[#0e0e12] px-2 py-0.5 text-[11px] font-medium text-white/90 opacity-0 shadow-lg backdrop-blur-md transition-opacity duration-200 group-hover:opacity-100 hidden md:block"
            >
              Email / Copy
              <span className="absolute -right-1 top-1/2 -translate-y-1/2 size-1.5 rotate-45 border-r border-t border-white/10 bg-[#0e0e12]" />
            </div>
          )}

          {/* Email Popover Panel */}
          <AnimatePresence>
            {isEmailPopupOpen && (
              <motion.div
                ref={emailPopupRef}
                role="dialog"
                aria-modal="false"
                aria-label="Email contact options"
                initial={{ opacity: 0, scale: 0.94, x: 10 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.94, x: 10 }}
                transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                className="absolute right-[calc(100%+12px)] -bottom-7 sm:-bottom-5 z-50 w-[290px] sm:w-[310px] rounded-xl border border-white/15 bg-[#0e0e12] p-3.5 text-left shadow-2xl backdrop-blur-xl ring-1 ring-white/10"
              >
                {/* Connector Arrow pointing to @ icon */}
                <span className="absolute -right-1.5 bottom-9 size-2.5 rotate-45 border-r border-t border-white/15 bg-[#0e0e12]" />

                {/* Popover Header */}
                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                  <div className="flex items-center gap-1.5">
                    <span className="inline-block size-2 rounded-full bg-accent animate-pulse" />
                    <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-white/50">
                      Direct Email
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsEmailPopupOpen(false)}
                    aria-label="Close email popup"
                    className="rounded-md p-1 text-white/40 transition-colors hover:bg-white/10 hover:text-white"
                  >
                    <X className="size-3.5" />
                  </button>
                </div>

                {/* Email Display & Inline Copy Button */}
                <div className="mt-3 flex items-center justify-between gap-2 rounded-lg border border-white/10 bg-black/50 p-2.5">
                  <span className="font-mono text-xs sm:text-[13px] font-bold tracking-tight text-white select-all truncate">
                    {EMAIL}
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    aria-label="Copy email address"
                    className={`flex items-center gap-1.5 shrink-0 rounded-md px-2.5 py-1 text-xs font-semibold transition-all duration-200 ${
                      copiedEmail
                        ? 'border border-emerald-500/30 bg-emerald-500/20 text-emerald-300 shadow-sm'
                        : 'border border-white/10 bg-white/10 text-white hover:bg-white/15 active:scale-95'
                    }`}
                  >
                    {copiedEmail ? (
                      <>
                        <Check className="size-3.5 text-emerald-400" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="size-3.5 text-white/70" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Direct Action Link below (no duplicate copy button) */}
                <a
                  href={`mailto:${EMAIL}`}
                  className="mt-2.5 flex w-full items-center justify-center gap-2 rounded-lg border border-white/5 bg-white/5 px-3 py-2 text-xs font-medium text-white/70 transition-colors hover:bg-white/10 hover:text-white active:scale-[0.98]"
                >
                  <Mail className="size-3.5" />
                  <span>Send email via app</span>
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 2. Phone Icon */}
        <div className="group relative flex items-center justify-center">
          <button
            ref={phoneButtonRef}
            type="button"
            onClick={handlePhoneClick}
            aria-label={
              isMobile
                ? `Call ${PHONE_DISPLAY}`
                : `Show phone number ${PHONE_DISPLAY}`
            }
            aria-expanded={isPhonePopupOpen}
            className={`flex size-8 items-center justify-center rounded-lg border transition-all duration-200 active:scale-95 ${
              isPhonePopupOpen
                ? 'border-accent/40 bg-accent/20 text-accent shadow-lg shadow-accent/20 ring-1 ring-accent/30'
                : 'border-transparent text-[#b7ac98] hover:border-accent/40 hover:bg-accent/20 hover:text-accent hover:shadow-lg hover:shadow-accent/20'
            }`}
          >
            <svg
              viewBox="1.5 1.5 21 21"
              fill="currentColor"
              className="size-4 transition-transform duration-200 group-hover:scale-105"
              aria-hidden="true"
            >
              <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 0 0-1.01.24l-1.57 1.97c-2.83-1.44-5.15-3.75-6.59-6.59l1.97-1.57c.28-.27.36-.67.25-1.02A11.36 11.36 0 0 1 9 4.31c0-.55-.45-1-1-1H4.5c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c0-.55-.45-.93-.99-.93z" />
            </svg>
          </button>

          {/* Desktop Tooltip (only when popup is closed) */}
          {!isPhonePopupOpen && (
            <div
              role="tooltip"
              className="pointer-events-none absolute right-[calc(100%+10px)] top-1/2 -translate-y-1/2 whitespace-nowrap rounded-md border border-white/10 bg-[#0e0e12] px-2 py-0.5 text-[11px] font-medium text-white/90 opacity-0 shadow-lg backdrop-blur-md transition-opacity duration-200 group-hover:opacity-100 hidden md:block"
            >
              {isMobile ? 'Call now' : 'Phone / Copy'}
              <span className="absolute -right-1 top-1/2 -translate-y-1/2 size-1.5 rotate-45 border-r border-t border-white/10 bg-[#0e0e12]" />
            </div>
          )}

          {/* Phone Popover Panel */}
          <AnimatePresence>
            {isPhonePopupOpen && (
              <motion.div
                ref={phonePopupRef}
                role="dialog"
                aria-modal="false"
                aria-label="Phone contact options"
                initial={{ opacity: 0, scale: 0.94, x: 10 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.94, x: 10 }}
                transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                className="absolute right-[calc(100%+12px)] -bottom-7 sm:-bottom-5 z-50 w-[290px] sm:w-[310px] rounded-xl border border-white/15 bg-[#0e0e12] p-3.5 text-left shadow-2xl backdrop-blur-xl ring-1 ring-white/10"
              >
                {/* Connector Arrow pointing to phone icon */}
                <span className="absolute -right-1.5 bottom-9 size-2.5 rotate-45 border-r border-t border-white/15 bg-[#0e0e12]" />

                {/* Popover Header */}
                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                  <div className="flex items-center gap-1.5">
                    <span className="inline-block size-2 rounded-full bg-accent animate-pulse" />
                    <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-white/50">
                      Direct Contact
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsPhonePopupOpen(false)}
                    aria-label="Close phone popup"
                    className="rounded-md p-1 text-white/40 transition-colors hover:bg-white/10 hover:text-white"
                  >
                    <X className="size-3.5" />
                  </button>
                </div>

                {/* Phone Display & Inline Copy Button */}
                <div className="mt-3 flex items-center justify-between gap-2 rounded-lg border border-white/10 bg-black/50 p-2.5">
                  <span className="font-mono text-sm font-bold tracking-wider text-white select-all">
                    {PHONE_DISPLAY}
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyPhone}
                    aria-label="Copy phone number"
                    className={`flex items-center gap-1.5 shrink-0 rounded-md px-2.5 py-1 text-xs font-semibold transition-all duration-200 ${
                      copiedPhone
                        ? 'border border-emerald-500/30 bg-emerald-500/20 text-emerald-300 shadow-sm'
                        : 'border border-white/10 bg-white/10 text-white hover:bg-white/15 active:scale-95'
                    }`}
                  >
                    {copiedPhone ? (
                      <>
                        <Check className="size-3.5 text-emerald-400" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="size-3.5 text-white/70" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Direct Action Link below (no duplicate copy button) */}
                <a
                  href={`tel:${PHONE_RAW}`}
                  className="mt-2.5 flex w-full items-center justify-center gap-2 rounded-lg border border-white/5 bg-white/5 px-3 py-2 text-xs font-medium text-white/70 transition-colors hover:bg-white/10 hover:text-white active:scale-[0.98]"
                >
                  <PhoneCall className="size-3.5" />
                  <span>Call via phone app</span>
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 3. LinkedIn Icon ('in') */}
        <div className="group relative flex items-center justify-center">
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit Naveed's LinkedIn Profile"
            className="flex size-8 items-center justify-center rounded-lg border border-transparent text-[#b7ac98] transition-all duration-200 hover:border-accent/40 hover:bg-accent/20 hover:text-accent hover:shadow-lg hover:shadow-accent/20 active:scale-95"
          >
            <svg
              viewBox="5 3.5 14 16"
              fill="currentColor"
              className="size-4 transition-transform duration-200 group-hover:scale-105"
              aria-hidden="true"
            >
              <path d="M19 19v-5.6a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11H10.67V19h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4V19H19zM6.46 10.33V19h2.74v-8.67H6.46zM7.83 5.5a1.64 1.64 0 1 0 0 3.28 1.64 1.64 0 0 0 0-3.28z" />
            </svg>
          </a>

          {/* Desktop Tooltip */}
          <div
            role="tooltip"
            className="pointer-events-none absolute right-[calc(100%+10px)] top-1/2 -translate-y-1/2 whitespace-nowrap rounded-md border border-white/10 bg-[#0e0e12] px-2 py-0.5 text-[11px] font-medium text-white/90 opacity-0 shadow-lg backdrop-blur-md transition-opacity duration-200 group-hover:opacity-100 hidden md:block"
          >
            LinkedIn Profile
            <span className="absolute -right-1 top-1/2 -translate-y-1/2 size-1.5 rotate-45 border-r border-t border-white/10 bg-[#0e0e12]" />
          </div>
        </div>
      </nav>
    </aside>
  )
}
