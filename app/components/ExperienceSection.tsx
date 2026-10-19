'use client'

import React, { useRef, useState } from 'react'
import Image from 'next/image'
import { motion, useScroll, useSpring, useTransform, useInView } from 'framer-motion'
import { ArrowUpRight, Briefcase } from 'lucide-react'
import { Experience } from '@/lib/experiences'

interface ExperienceSectionProps {
  experiences: Experience[]
}

interface TimelineItemProps {
  exp: Experience
  index: number
  total: number
}

function TimelineItem({ exp, index }: TimelineItemProps) {
  const itemRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(itemRef, { amount: 0.25, once: false })
  const [imageError, setImageError] = useState(false)

  const isEven = index % 2 === 0 // 0, 2, 4 -> Left card on desktop
  const hasLinks = exp.links && exp.links.length > 0
  const hasSkills = exp.skills && exp.skills.length > 0

  return (
    <div
      ref={itemRef}
      className="relative mb-16 last:mb-0 sm:mb-24"
    >
      {/* ============================================================== */}
      {/* DESKTOP LAYOUT (md and above): Alternating Left and Right      */}
      {/* ============================================================== */}
      <div className="hidden md:grid md:grid-cols-[1fr_80px_1fr] md:items-start">
        {/* --- LEFT COLUMN --- */}
        {isEven ? (
          /* Left: Content Card */
          <motion.div
            initial={{ opacity: 0, x: -35 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0.25, x: -20 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="group relative rounded-2xl border border-white/10 bg-[#0e0e12] p-6 shadow-xl backdrop-blur-md transition-all duration-300 hover:border-white/20 hover:bg-[#131318] sm:p-7"
          >
            {/* Connector arrow pointing to center node */}
            <div className="absolute -right-2 top-7 size-4 rotate-45 border-r border-t border-white/10 bg-[#0e0e12] transition-colors group-hover:border-white/20 group-hover:bg-[#131318]" />

            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-display text-xl font-bold tracking-tight text-white transition-colors group-hover:text-accent sm:text-2xl">
                  {exp.role}
                </h3>
                <p className="mt-1 font-mono text-xs font-semibold uppercase tracking-wider text-white/50">
                  {exp.company}
                </p>
              </div>
            </div>

            {/* Description bullet points */}
            {exp.description && exp.description.length > 0 && (
              <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-white/60 sm:text-[15px]">
                {exp.description.map((point, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent/80" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            )}

            {/* Tech stack badges */}
            {hasSkills && (
              <div className="mt-5 flex flex-wrap gap-1.5">
                {exp.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-[4px] border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[11px] font-medium text-white/70 transition-colors hover:border-white/25 hover:text-white"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            )}

            {/* External Links */}
            {hasLinks && (
              <div className="mt-5 flex flex-wrap items-center gap-4 border-t border-white/10 pt-4">
                {exp.links.map((link, idx) => (
                  <a
                    key={idx}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-mono text-xs font-medium text-white/70 underline decoration-white/25 underline-offset-4 transition-colors hover:text-white hover:decoration-accent"
                  >
                    {link.label}
                    <ArrowUpRight className="size-3.5" />
                  </a>
                ))}
              </div>
            )}
          </motion.div>
        ) : (
          /* Left: Company & Period Label (aligned right towards center) */
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0.3, x: -10 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-end pr-6 pt-3 text-right"
          >
            <span className="font-display text-2xl font-bold tracking-tight text-white/95">
              {exp.company}
            </span>
            <span className="mt-1 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-accent">
              {exp.period}
            </span>
            {exp.location && (
              <span className="mt-1 font-mono text-xs text-white/40">
                {exp.location}
              </span>
            )}
          </motion.div>
        )}

        {/* --- CENTER: COMPANY LOGO NODE --- */}
        <div className="relative flex justify-center pt-2">
          <motion.div
            animate={
              isInView
                ? {
                    scale: 1.08,
                    boxShadow: '0 0 28px rgba(222, 94, 145, 0.55)',
                    borderColor: '#de5e91',
                  }
                : {
                    scale: 1,
                    boxShadow: '0 0 0px rgba(222, 94, 145, 0)',
                    borderColor: 'rgba(255, 255, 255, 0.15)',
                  }
            }
            transition={{ duration: 0.4 }}
            style={{
              backgroundColor: exp.logoBg || '#121214',
            }}
            className="relative z-10 flex size-13 items-center justify-center rounded-2xl border bg-black/90 p-2.5 transition-all duration-300"
          >
            {exp.logo && !imageError ? (
              <Image
                src={exp.logo}
                alt={`${exp.company} logo`}
                width={30}
                height={30}
                className="size-7 object-contain"
                onError={() => setImageError(true)}
              />
            ) : (
              <span className="font-display text-lg font-bold tracking-tight text-white select-none">
                {exp.initial || exp.company.charAt(0)}
              </span>
            )}
          </motion.div>
        </div>

        {/* --- RIGHT COLUMN --- */}
        {!isEven ? (
          /* Right: Content Card */
          <motion.div
            initial={{ opacity: 0, x: 35 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0.25, x: 20 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="group relative rounded-2xl border border-white/10 bg-[#0e0e12] p-6 shadow-xl backdrop-blur-md transition-all duration-300 hover:border-white/20 hover:bg-[#131318] sm:p-7"
          >
            {/* Connector arrow pointing to center node */}
            <div className="absolute -left-2 top-7 size-4 rotate-45 border-b border-l border-white/10 bg-[#0e0e12] transition-colors group-hover:border-white/20 group-hover:bg-[#131318]" />

            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-display text-xl font-bold tracking-tight text-white transition-colors group-hover:text-accent sm:text-2xl">
                  {exp.role}
                </h3>
                <p className="mt-1 font-mono text-xs font-semibold uppercase tracking-wider text-white/50">
                  {exp.company}
                </p>
              </div>
            </div>

            {/* Description bullet points */}
            {exp.description && exp.description.length > 0 && (
              <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-white/60 sm:text-[15px]">
                {exp.description.map((point, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent/80" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            )}

            {/* Tech stack badges */}
            {hasSkills && (
              <div className="mt-5 flex flex-wrap gap-1.5">
                {exp.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-[4px] border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[11px] font-medium text-white/70 transition-colors hover:border-white/25 hover:text-white"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            )}

            {/* External Links */}
            {hasLinks && (
              <div className="mt-5 flex flex-wrap items-center gap-4 border-t border-white/10 pt-4">
                {exp.links.map((link, idx) => (
                  <a
                    key={idx}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-mono text-xs font-medium text-white/70 underline decoration-white/25 underline-offset-4 transition-colors hover:text-white hover:decoration-accent"
                  >
                    {link.label}
                    <ArrowUpRight className="size-3.5" />
                  </a>
                ))}
              </div>
            )}
          </motion.div>
        ) : (
          /* Right: Company & Period Label (aligned left towards center) */
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0.3, x: 10 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-start pl-6 pt-3 text-left"
          >
            <span className="font-display text-2xl font-bold tracking-tight text-white/95">
              {exp.company}
            </span>
            <span className="mt-1 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-accent">
              {exp.period}
            </span>
            {exp.location && (
              <span className="mt-1 font-mono text-xs text-white/40">
                {exp.location}
              </span>
            )}
          </motion.div>
        )}
      </div>

      {/* ============================================================== */}
      {/* MOBILE LAYOUT (< md): Compact Stacked with Left Timeline       */}
      {/* ============================================================== */}
      <div className="relative pl-14 sm:pl-16 md:hidden">
        {/* Node on mobile */}
        <div className="absolute -left-[3px] top-1">
          <motion.div
            animate={
              isInView
                ? {
                    scale: 1.05,
                    boxShadow: '0 0 20px rgba(222, 94, 145, 0.5)',
                    borderColor: '#de5e91',
                  }
                : {
                    scale: 1,
                    boxShadow: '0 0 0px rgba(222, 94, 145, 0)',
                    borderColor: 'rgba(255, 255, 255, 0.15)',
                  }
            }
            transition={{ duration: 0.35 }}
            style={{
              backgroundColor: exp.logoBg || '#121214',
            }}
            className="flex size-11 items-center justify-center rounded-xl border bg-black/90 p-2"
          >
            {exp.logo && !imageError ? (
              <Image
                src={exp.logo}
                alt={`${exp.company} logo`}
                width={24}
                height={24}
                className="size-6 object-contain"
                onError={() => setImageError(true)}
              />
            ) : (
              <span className="font-display text-sm font-bold tracking-tight text-white select-none">
                {exp.initial || exp.company.charAt(0)}
              </span>
            )}
          </motion.div>
        </div>

        {/* Company & Date info on mobile */}
        <div className="mb-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-display text-lg font-bold text-white/95">
              {exp.company}
            </span>
            <span className="rounded bg-accent/15 px-2 py-0.5 font-mono text-[11px] font-semibold uppercase tracking-wider text-accent">
              {exp.period}
            </span>
          </div>
          {exp.location && (
            <p className="mt-0.5 font-mono text-xs text-white/40">
              {exp.location}
            </p>
          )}
        </div>

        {/* Mobile Content Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0.3, y: 10 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-2xl border border-white/10 bg-[#0e0e12] p-5 shadow-lg backdrop-blur-md"
        >
          <h3 className="font-display text-lg font-bold text-white">
            {exp.role}
          </h3>

          {exp.description && exp.description.length > 0 && (
            <ul className="mt-3 space-y-2 text-sm leading-relaxed text-white/60">
              {exp.description.map((point, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="mt-2 size-1 shrink-0 rounded-full bg-accent" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          )}

          {hasSkills && (
            <div className="mt-4 flex flex-wrap gap-1.5">
              {exp.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-[4px] border border-white/10 bg-white/5 px-2 py-0.5 font-mono text-[10px] text-white/70"
                >
                  {skill}
                </span>
              ))}
            </div>
          )}

          {hasLinks && (
            <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-white/10 pt-3">
              {exp.links.map((link, idx) => (
                <a
                  key={idx}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-mono text-xs text-white/70 hover:text-white"
                >
                  {link.label}
                  <ArrowUpRight className="size-3" />
                </a>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

export default function ExperienceSection({ experiences }: ExperienceSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  // Scroll tracking across the whole experiences timeline
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 75%', 'end 70%'],
  })

  // Smooth spring physics for line progression
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 280,
    damping: 32,
    restDelta: 0.001,
  })

  const lineHeight = useTransform(smoothProgress, (val) => `${Math.min(100, Math.max(0, val * 100))}%`)

  // Fallback if no experiences provided yet
  if (!experiences || experiences.length === 0) {
    return (
      <section id="experience" className="relative border-t border-white/10 px-6 py-24 sm:px-10 sm:py-32">
        <div className="mx-auto w-full max-w-5xl">
          <p className="font-mono text-xs font-medium uppercase tracking-[0.25em] text-accent">
            <span className="mr-2.5 inline-block size-1.5 rounded-full bg-accent align-middle" />
            03 / Experience
          </p>
          <h2 className="mt-8 font-display font-extrabold leading-[0.95] tracking-[-0.01em]">
            <span className="block bg-[linear-gradient(180deg,#e5e5e5_0%,#505050_100%)] bg-clip-text text-[clamp(2.5rem,7vw,5rem)] text-transparent">
              Work experience
            </span>
          </h2>
          <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-8 text-center text-white/50">
            No experiences found in <code className="text-white/80">data/experiences.js</code>. Add your career history to display it here.
          </div>
        </div>
      </section>
    )
  }

  return (
    <section
      id="experience"
      className="relative border-t border-white/10 px-6 py-24 sm:px-10 sm:py-32"
    >
      <div className="mx-auto w-full max-w-5xl">
        {/* Section Header */}
        <div>
          <p className="font-mono text-xs font-medium uppercase tracking-[0.25em] text-accent">
            <span className="mr-2.5 inline-block size-1.5 rounded-full bg-accent align-middle" />
            03 / Experience
          </p>

          <h2 className="mt-8 font-display font-extrabold leading-[0.95] tracking-[-0.01em]">
            <span className="block bg-[linear-gradient(180deg,#e5e5e5_0%,#505050_100%)] bg-clip-text text-[clamp(2.5rem,7vw,5rem)] text-transparent">
              Work experience
            </span>
          </h2>

          <p className="mt-4 max-w-xl text-base text-white/50 sm:text-lg">
            A timeline of roles, organizations, and systems I&apos;ve contributed to.
          </p>
        </div>

        {/* Timeline Container */}
        <div
          ref={containerRef}
          className="relative mt-16 sm:mt-24"
        >
          {/* ============================================================ */}
          {/* DESKTOP TIMELINE TRACK & ANIMATED FILL LINE (Center at 50%)  */}
          {/* ============================================================ */}
          <div className="pointer-events-none absolute bottom-6 left-1/2 top-4 hidden -translate-x-1/2 md:block">
            {/* Background inactive track */}
            <div className="h-full w-[2px] bg-white/10" />

            {/* Glowing animated line that lights up on scroll */}
            <motion.div
              style={{
                height: lineHeight,
              }}
              className="absolute left-0 top-0 w-[2px] bg-gradient-to-b from-accent via-accent to-white shadow-[0_0_12px_rgba(222,94,145,0.8),0_0_24px_rgba(222,94,145,0.4)]"
            >
              {/* Glowing leading tip at the advancing head of the line */}
              <div className="absolute -bottom-1 -left-[3px] size-2 rounded-full bg-white shadow-[0_0_12px_#de5e91,0_0_24px_#de5e91]" />
            </motion.div>
          </div>

          {/* ============================================================ */}
          {/* MOBILE TIMELINE TRACK & ANIMATED FILL LINE (Left at ~20px)   */}
          {/* ============================================================ */}
          <div className="pointer-events-none absolute bottom-4 left-[19px] top-2 block md:hidden">
            {/* Background inactive track */}
            <div className="h-full w-[2px] bg-white/10" />

            {/* Glowing animated line that lights up on scroll */}
            <motion.div
              style={{
                height: lineHeight,
              }}
              className="absolute left-0 top-0 w-[2px] bg-gradient-to-b from-accent via-accent to-white shadow-[0_0_12px_rgba(222,94,145,0.8)]"
            >
              <div className="absolute -bottom-1 -left-[3px] size-2 rounded-full bg-white shadow-[0_0_10px_#de5e91]" />
            </motion.div>
          </div>

          {/* Experience Timeline Items */}
          <div>
            {experiences.map((exp, index) => (
              <TimelineItem
                key={exp.id || index}
                exp={exp}
                index={index}
                total={experiences.length}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
