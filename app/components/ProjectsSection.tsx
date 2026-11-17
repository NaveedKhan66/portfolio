'use client'

import React, { useState, useRef, useMemo, useCallback } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { Project } from '@/lib/projects'
import ScatteredCanvas from './ScatteredCanvas'

interface ProjectsSectionProps {
  projects: Project[]
}

/**
 * Exact animation parameters extracted from https://aneshk.design
 * - Tokenization: character
 * - Initial: translateY(100px), opacity: 0
 * - Target: translateY(0px), opacity: 1
 * - Transition: duration: 0.8s, ease: [0.72, 0.14, 0.27, 0.87], delay: 0.02s per character
 * - Trigger: onInView
 */
const ANESHK_EASE = [0.72, 0.14, 0.27, 0.87] as const

const EASE_OUT = [0.22, 1, 0.36, 1] as const

const charVariants = {
  hidden: {
    y: 16,
    opacity: 0,
  },
  visible: (customDelay: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      type: 'tween' as const,
      duration: 0.45,
      ease: EASE_OUT,
      delay: customDelay,
    },
  }),
  exit: {
    y: -12,
    opacity: 0,
    transition: {
      duration: 0.18,
      ease: EASE_OUT,
    },
  },
}

const secondaryVariants = {
  hidden: {
    y: 12,
    opacity: 0,
  },
  visible: (customDelay: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      type: 'tween' as const,
      duration: 0.35,
      ease: EASE_OUT,
      delay: customDelay,
    },
  }),
  exit: {
    y: -10,
    opacity: 0,
    transition: {
      duration: 0.16,
      ease: EASE_OUT,
    },
  },
}

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  const [activeProjectIdx, setActiveProjectIdx] = useState(0)
  const [isAutoToss, setIsAutoToss] = useState(true)
  const detailsRef = useRef<HTMLDivElement>(null)

  const totalProjects = projects.length
  const safeIdx = Math.min(activeProjectIdx, Math.max(0, totalProjects - 1))
  const currentProject = projects[safeIdx]

  const titleWords = useMemo(() => {
    return currentProject ? currentProject.title.split(' ') : []
  }, [currentProject])

  const wordOffsets = useMemo(() => {
    const offsets: number[] = []
    let total = 0
    for (const word of titleWords) {
      offsets.push(total)
      total += word.length
    }
    return offsets
  }, [titleWords])

  const totalChars = useMemo(() => {
    return titleWords.reduce((acc, word) => acc + word.length, 0)
  }, [titleWords])

  // Consistent, bold font size matching the portfolio typography hierarchy
  const titleFontSizeClass = 'text-2xl sm:text-3xl lg:text-4xl'

  const [isTitleHovered, setIsTitleHovered] = useState(false)

  const handleNextProject = () => {
    setIsTitleHovered(false)
    setActiveProjectIdx((prev) => (prev + 1) % totalProjects)
  }

  const handlePrevProject = () => {
    setIsTitleHovered(false)
    setActiveProjectIdx((prev) => (prev - 1 + totalProjects) % totalProjects)
  }

  const handleToggleAutoToss = useCallback(() => {
    setIsAutoToss((prev) => !prev)
  }, [])

  // If no valid projects are provided in JSON yet
  if (!currentProject || totalProjects === 0) {
    return (
      <section className="relative border-t border-white/10 px-6 py-24 sm:px-10 sm:py-32">
        <div className="mx-auto w-full max-w-7xl">
          <p className="font-mono text-xs font-medium uppercase tracking-[0.25em] text-accent">
            <span className="mr-2.5 inline-block size-1.5 rounded-full bg-accent align-middle" />
            02 / Projects
          </p>
          <h2 className="mt-8 font-display font-extrabold leading-[1.05] tracking-[-0.01em]">
            <span className="block bg-[linear-gradient(180deg,#ffffff_0%,#a3a3a3_100%)] bg-clip-text text-[clamp(2.5rem,7vw,5rem)] text-transparent pb-1">
              Some projects
            </span>
          </h2>
          <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-8 text-center text-white/50">
            No completed projects found in <code className="text-white/80">data/projects.json</code>. Add a project with title, description, and images to display it here.
          </div>
        </div>
      </section>
    )
  }

  const liveLink = currentProject.liveUrl || currentProject.livePreviewUrl
  const repoLink = currentProject.repoUrl || currentProject.githubUrl

  return (
    <section id="projects" className="relative border-t border-white/10 px-6 py-24 sm:px-10 sm:py-32">
      <div className="mx-auto w-full max-w-5xl">
        {/* Section Header & Persistent Project Switcher */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-mono text-xs font-medium uppercase tracking-[0.25em] text-accent">
              <span className="mr-2.5 inline-block size-1.5 rounded-full bg-accent align-middle" />
              02 / Projects
            </p>
            <h2 className="mt-8 font-display font-extrabold leading-[1.05] tracking-[-0.01em]">
              <span className="block bg-[linear-gradient(180deg,#ffffff_0%,#a3a3a3_100%)] bg-clip-text text-[clamp(2.5rem,7vw,5rem)] text-transparent pb-1">
                Some projects
              </span>
            </h2>
            <p className="mt-4 max-w-xl text-base text-white/50 sm:text-lg">
              Featured client applications, AI systems, and production platforms.
            </p>
          </div>

          {/* Project Switcher: Fixed, consistent position in header */}
          {totalProjects > 1 && (
            <div className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] p-1.5 backdrop-blur-md shadow-lg shadow-black/40 sm:self-end shrink-0">
              <span className="pl-2 font-mono text-xs text-white/40 hidden md:inline-block">
                Project
              </span>
              <button
                type="button"
                onClick={handlePrevProject}
                className="flex size-7 sm:size-8 items-center justify-center rounded-full text-white/60 transition hover:bg-white/10 hover:text-white active:scale-95"
                aria-label="Previous project"
                title="Previous project"
              >
                <ChevronLeft className="size-4" />
              </button>

              <div className="flex items-center gap-1">
                {projects.map((p, idx) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => {
                      setIsTitleHovered(false)
                      setActiveProjectIdx(idx)
                    }}
                    className={`flex h-7 min-w-7 sm:h-8 sm:min-w-8 items-center justify-center rounded-full px-2 font-mono text-xs font-semibold transition ${
                      idx === safeIdx
                        ? 'bg-accent text-white shadow-md shadow-accent/40'
                        : 'text-white/40 hover:bg-white/10 hover:text-white'
                    }`}
                    title={`Switch to ${p.title} (${idx + 1} of ${totalProjects})`}
                    aria-label={`Switch to project ${idx + 1}: ${p.title}`}
                  >
                    {String(idx + 1).padStart(2, '0')}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={handleNextProject}
                className="flex size-7 sm:size-8 items-center justify-center rounded-full text-white/60 transition hover:bg-white/10 hover:text-white active:scale-95"
                aria-label="Next project"
                title="Next project"
              >
                <ChevronRight className="size-4" />
              </button>
            </div>
          )}
        </div>

        {/* Two-Column Grid: Left Side (Project Typography & Details) | Right Side (Scattered Canvas) */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
          {/* LEFT SIDE: Project Title, Meta, Description & Links */}
          <div ref={detailsRef} className="flex flex-col justify-center lg:col-span-6">
            <AnimatePresence mode="wait" initial={false}>
              <div
                key={`pdetails-${currentProject.id}`}
                className="flex flex-col justify-start"
              >
                {/* Project Index / Counter */}
                <motion.div
                  custom={0.02}
                  variants={secondaryVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="flex items-center gap-2 font-mono text-sm sm:text-base font-semibold tracking-wider text-white/40"
                >
                  <span className="text-white/90">
                    {String(safeIdx + 1).padStart(2, '0')}
                  </span>
                  <span className="text-white/20">/</span>
                  <span>{String(totalProjects).padStart(2, '0')}</span>
                </motion.div>

                {/* Massive Display Title with Exact Aneshk.design Character Pop-Up Animation and Interactive Flow Animation on Hover */}
                <div className="mt-3 py-1 max-w-full">
                  <h3 className={`font-display font-extrabold uppercase leading-[0.95] tracking-tight text-accent ${titleFontSizeClass}`}>
                    <Link
                      href={`/projects/${currentProject.slug || currentProject.id}`}
                      onMouseEnter={() => setIsTitleHovered(true)}
                      onMouseLeave={() => setIsTitleHovered(false)}
                      onFocus={() => setIsTitleHovered(true)}
                      onBlur={() => setIsTitleHovered(false)}
                      className="group inline-flex flex-wrap items-baseline cursor-pointer transition-opacity focus:outline-none"
                      title={`View ${currentProject.title} case study`}
                      aria-label={`View ${currentProject.title} case study`}
                    >
                      <div className="flex flex-wrap items-baseline">
                        {titleWords.map((word, wIdx) => (
                          <span
                            key={`word-${currentProject.id}-${wIdx}`}
                            className="mr-[0.24em] inline-block max-w-full break-words [overflow-wrap:anywhere]"
                          >
                            {word.split('').map((char, cIdx) => {
                              const charDelay = (wordOffsets[wIdx] + cIdx) * 0.02
                              const charGlobalIndex = wordOffsets[wIdx] + cIdx
                              return (
                                <motion.span
                                  key={`char-${currentProject.id}-${wIdx}-${cIdx}`}
                                  custom={charDelay}
                                  variants={charVariants}
                                  initial="hidden"
                                  animate="visible"
                                  exit="exit"
                                  className="inline-block will-change-transform"
                                >
                                  <motion.span
                                    key={`char-flow-${currentProject.id}-${charGlobalIndex}`}
                                    className="inline-block transition-colors"
                                    animate={
                                      isTitleHovered
                                        ? {
                                            y: [0, -10, 2, 0],
                                            color: ['#de5e91', '#ffffff', '#ff9ec4', '#de5e91'],
                                            scale: [1, 1.08, 1],
                                            textShadow: [
                                              '0 0 0px rgba(222,94,145,0)',
                                              '0 0 16px rgba(222,94,145,0.85)',
                                              '0 0 0px rgba(222,94,145,0)',
                                            ],
                                          }
                                        : undefined
                                    }
                                    transition={
                                      isTitleHovered
                                        ? {
                                            duration: 0.55,
                                            delay: charGlobalIndex * 0.035,
                                            repeat: Infinity,
                                            repeatDelay: 0.85,
                                            ease: [0.22, 1, 0.36, 1],
                                          }
                                        : undefined
                                    }
                                  >
                                    {char}
                                  </motion.span>
                                </motion.span>
                              )
                            })}
                          </span>
                        ))}

                        {/* Space & Redirect Arrow Icon Matching Portfolio Colors */}
                        <span className="ml-[0.16em] inline-block align-baseline whitespace-nowrap">
                          <motion.span
                            custom={totalChars * 0.02}
                            variants={charVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="inline-block will-change-transform"
                          >
                            <motion.span
                              className="inline-flex items-center text-accent"
                              animate={
                                isTitleHovered
                                  ? {
                                      x: [0, 6, 1, 0],
                                      y: [0, -6, 1, 0],
                                      scale: [1, 1.2, 1],
                                      color: ['#de5e91', '#ffffff', '#ff9ec4', '#de5e91'],
                                      textShadow: [
                                        '0 0 0px rgba(222,94,145,0)',
                                        '0 0 18px rgba(222,94,145,0.9)',
                                        '0 0 0px rgba(222,94,145,0)',
                                      ],
                                    }
                                  : undefined
                              }
                              transition={
                                isTitleHovered
                                  ? {
                                      duration: 0.55,
                                      delay: totalChars * 0.035,
                                      repeat: Infinity,
                                      repeatDelay: 0.85,
                                      ease: [0.22, 1, 0.36, 1],
                                    }
                                  : undefined
                              }
                            >
                              <ArrowUpRight
                                className="size-[0.65em] -translate-y-[0.12em]"
                                strokeWidth={2.8}
                              />
                            </motion.span>
                          </motion.span>
                        </span>
                      </div>
                    </Link>
                  </h3>
                </div>

                {/* Category / Subtitle */}
                <div className="mt-2">
                  <motion.div
                    custom={0.16}
                    variants={secondaryVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-accent"
                  >
                    {currentProject.category || 'FEATURED WORK'}
                  </motion.div>
                </div>

                {/* Short Project Description */}
                <div className="mt-3">
                  <motion.p
                    custom={0.24}
                    variants={secondaryVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="text-sm sm:text-base leading-relaxed text-white/60"
                  >
                    {currentProject.description}
                  </motion.p>
                </div>

                {/* Tags Pill list (if provided) */}
                {currentProject.tags && currentProject.tags.length > 0 && (
                  <motion.div
                    custom={0.32}
                    variants={secondaryVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="mt-4 flex flex-wrap gap-1.5"
                  >
                    {currentProject.tags.slice(0, 6).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-[4px] border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[11px] font-medium text-white/70 transition-colors hover:border-white/25 hover:text-white"
                      >
                        {tag}
                      </span>
                    ))}
                    {currentProject.tags.length > 6 && (
                      <span className="rounded-[4px] border border-white/10 bg-white/[0.02] px-2 py-1 font-mono text-[10px] text-white/40">
                        +{currentProject.tags.length - 6}
                      </span>
                    )}
                  </motion.div>
                )}

                {/* Project Links / Action Buttons */}
                <motion.div
                  custom={0.4}
                  variants={secondaryVariants}
                  initial="hidden"
                  animate="visible"
                  className="mt-6 flex flex-wrap items-center gap-3"
                >
                  <Link
                    href={`/projects/${currentProject.slug || currentProject.id}`}
                    className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider text-accent shadow-md shadow-accent/10 transition hover:border-accent hover:bg-accent hover:text-white active:scale-95"
                  >
                    <span>Case Study</span>
                    <ArrowUpRight className="size-3.5" strokeWidth={2.5} />
                  </Link>

                  {liveLink && (
                    <a
                      href={liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider text-white shadow-md shadow-accent/20 transition hover:brightness-110 active:scale-95"
                    >
                      <span>Live Preview</span>
                      <ArrowUpRight className="size-3.5" strokeWidth={2.5} />
                    </a>
                  )}

                  {repoLink && (
                    <a
                      href={repoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 font-mono text-xs font-medium uppercase tracking-wider text-white/80 transition hover:border-white/40 hover:bg-white/10 hover:text-white active:scale-95"
                    >
                      <svg
                        className="size-3.5 fill-current"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                        />
                      </svg>
                      <span>Repository</span>
                    </a>
                  )}
                </motion.div>
              </div>
            </AnimatePresence>
          </div>

          {/* RIGHT SIDE: Scattered Canvas Carousel */}
          <div className="flex flex-col items-center justify-center lg:col-span-6">
            <ScatteredCanvas
              key={`canvas-${currentProject.id}`}
              images={currentProject.images}
              projectTitle={currentProject.title}
              isAutoToss={isAutoToss}
              onToggleAutoToss={handleToggleAutoToss}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
