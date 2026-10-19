'use client'

import React, { useState, useRef, useMemo } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence, useInView } from 'framer-motion'
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

const charVariants = {
  hidden: {
    y: 100,
    opacity: 0,
  },
  visible: (customDelay: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      type: 'tween' as const,
      duration: 0.8,
      ease: ANESHK_EASE,
      delay: customDelay,
    },
  }),
  exit: {
    y: -40,
    opacity: 0,
    transition: {
      duration: 0.22,
      ease: ANESHK_EASE,
    },
  },
}

const secondaryVariants = {
  hidden: {
    y: 30,
    opacity: 0,
  },
  visible: (customDelay: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      type: 'tween' as const,
      duration: 0.7,
      ease: ANESHK_EASE,
      delay: customDelay,
    },
  }),
  exit: {
    y: -20,
    opacity: 0,
    transition: {
      duration: 0.2,
      ease: ANESHK_EASE,
    },
  },
}

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  const [activeProjectIdx, setActiveProjectIdx] = useState(0)
  const detailsRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(detailsRef, { once: true, amount: 0.25 })

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

  const [isTitleHovered, setIsTitleHovered] = useState(false)

  const handleNextProject = () => {
    setIsTitleHovered(false)
    setActiveProjectIdx((prev) => (prev + 1) % totalProjects)
  }

  const handlePrevProject = () => {
    setIsTitleHovered(false)
    setActiveProjectIdx((prev) => (prev - 1 + totalProjects) % totalProjects)
  }

  // If no valid projects are provided in JSON yet
  if (!currentProject || totalProjects === 0) {
    return (
      <section className="relative border-t border-white/10 px-6 py-24 sm:px-10 sm:py-32">
        <div className="mx-auto w-full max-w-7xl">
          <p className="font-mono text-xs font-medium uppercase tracking-[0.25em] text-accent">
            <span className="mr-2.5 inline-block size-1.5 rounded-full bg-accent align-middle" />
            02 / Projects
          </p>
          <h2 className="mt-8 font-display font-extrabold leading-[0.95] tracking-[-0.01em]">
            <span className="block bg-[linear-gradient(180deg,#e5e5e5_0%,#505050_100%)] bg-clip-text text-[clamp(2.5rem,7vw,5rem)] text-transparent">
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
      <div className="mx-auto w-full max-w-7xl">
        {/* Section Header Tag & Project Switcher */}
        <div className="flex items-center justify-between">
          <p className="font-mono text-xs font-medium uppercase tracking-[0.25em] text-accent">
            <span className="mr-2.5 inline-block size-1.5 rounded-full bg-accent align-middle" />
            02 / Projects
          </p>

          {/* Project Switcher controls if multiple projects exist */}
          {totalProjects > 1 && (
            <div className="flex items-center gap-2">
              <span className="mr-2 hidden font-mono text-xs text-white/40 sm:inline-block">
                Switch project
              </span>
              <button
                type="button"
                onClick={handlePrevProject}
                className="flex size-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition hover:border-white/30 hover:bg-white/10 hover:text-white"
                aria-label="Previous project"
              >
                <ChevronLeft className="size-4" />
              </button>
              <button
                type="button"
                onClick={handleNextProject}
                className="flex size-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition hover:border-white/30 hover:bg-white/10 hover:text-white"
                aria-label="Next project"
              >
                <ChevronRight className="size-4" />
              </button>
            </div>
          )}
        </div>

        {/* Section Title (Matching About section typography) */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7, ease: ANESHK_EASE }}
          className="mt-8 font-display font-extrabold leading-[0.95] tracking-[-0.01em]"
        >
          <span className="block bg-[linear-gradient(180deg,#e5e5e5_0%,#505050_100%)] bg-clip-text text-[clamp(2.5rem,7vw,5rem)] text-transparent">
            Some projects
          </span>
        </motion.h2>

        {/* Two-Column Grid: Left Side (Project Typography & Details) | Right Side (Scattered Canvas) */}
        <div className="mt-12 grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* LEFT SIDE: Project Title, Meta, Description & Links */}
          <div ref={detailsRef} className="flex flex-col justify-center lg:col-span-5">
            <AnimatePresence mode="wait">
              <div
                key={`pdetails-${currentProject.id}`}
                className="flex flex-col justify-center"
              >
                {/* Project Index / Counter */}
                <motion.div
                  custom={0.02}
                  variants={secondaryVariants}
                  initial="hidden"
                  animate={isInView ? 'visible' : 'hidden'}
                  exit="exit"
                  className="flex items-center gap-2 font-mono text-2xl font-bold tracking-wider text-white/30 sm:text-3xl"
                >
                  <span className="text-white/90">
                    {String(safeIdx + 1).padStart(2, '0')}
                  </span>
                  <span className="text-white/20">/</span>
                  <span>{String(totalProjects).padStart(2, '0')}</span>
                </motion.div>

                {/* Massive Display Title with Exact Aneshk.design Character Pop-Up Animation and Interactive Flow Animation on Hover */}
                <div className="mt-4 overflow-hidden py-1">
                  <h3 className="font-display font-extrabold uppercase leading-[0.88] tracking-[-0.02em] text-[clamp(2.75rem,5.5vw,5.5rem)] text-accent">
                    <Link
                      href={`/projects/${currentProject.slug || currentProject.id}`}
                      onMouseEnter={() => setIsTitleHovered(true)}
                      onMouseLeave={() => setIsTitleHovered(false)}
                      onFocus={() => setIsTitleHovered(true)}
                      onBlur={() => setIsTitleHovered(false)}
                      className="group inline-flex flex-wrap items-baseline cursor-pointer transition-opacity focus:outline-none"
                      title={`View ${currentProject.title} project details`}
                      aria-label={`View ${currentProject.title} project article`}
                    >
                      <div className="flex flex-wrap items-baseline">
                        {titleWords.map((word, wIdx) => (
                          <span
                            key={`word-${currentProject.id}-${wIdx}`}
                            className="mr-[0.24em] inline-block whitespace-nowrap"
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
                                  animate={isInView ? 'visible' : 'hidden'}
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
                                        : {
                                            y: 0,
                                            color: '#de5e91',
                                            scale: 1,
                                            textShadow: '0 0 0px rgba(222,94,145,0)',
                                          }
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
                                        : {
                                            duration: 0.25,
                                            ease: 'easeOut',
                                          }
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
                        <span className="ml-[0.16em] inline-block align-baseline">
                          <motion.span
                            custom={totalChars * 0.02}
                            variants={charVariants}
                            initial="hidden"
                            animate={isInView ? 'visible' : 'hidden'}
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
                                  : {
                                      x: 0,
                                      y: 0,
                                      scale: 1,
                                      color: '#de5e91',
                                      textShadow: '0 0 0px rgba(222,94,145,0)',
                                    }
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
                                  : {
                                      duration: 0.25,
                                      ease: 'easeOut',
                                    }
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
                <div className="mt-6 overflow-hidden">
                  <motion.div
                    custom={0.16}
                    variants={secondaryVariants}
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                    exit="exit"
                    className="font-mono text-sm font-semibold uppercase tracking-[0.16em] text-white/70 sm:text-base"
                  >
                    {currentProject.category || 'FEATURED WORK'}
                    {currentProject.year && (
                      <span className="ml-3 font-normal text-white/40">
                        • {currentProject.year}
                      </span>
                    )}
                  </motion.div>
                </div>

                {/* Short Project Description */}
                <div className="mt-4 overflow-hidden">
                  <motion.p
                    custom={0.24}
                    variants={secondaryVariants}
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                    exit="exit"
                    className="max-w-xl text-base leading-[1.6] text-white/50 sm:text-lg"
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
                    animate={isInView ? 'visible' : 'hidden'}
                    exit="exit"
                    className="mt-6 flex flex-wrap gap-2"
                  >
                    {currentProject.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 font-mono text-xs text-white/60"
                      >
                        {tag}
                      </span>
                    ))}
                  </motion.div>
                )}

                {/* Project Links / Action Buttons */}
                <motion.div
                  custom={0.4}
                  variants={secondaryVariants}
                  initial="hidden"
                  animate={isInView ? 'visible' : 'hidden'}
                  className="mt-8 flex flex-wrap items-center gap-4"
                >
                  <Link
                    href={`/projects/${currentProject.slug || currentProject.id}`}
                    className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-accent shadow-lg shadow-accent/10 transition hover:border-accent hover:bg-accent hover:text-white active:scale-95"
                  >
                    <span>Read Article</span>
                    <ArrowUpRight className="size-4" strokeWidth={2.5} />
                  </Link>

                  {liveLink && (
                    <a
                      href={liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-accent/20 transition hover:brightness-110 active:scale-95"
                    >
                      <span>Live Preview</span>
                      <ArrowUpRight className="size-4" strokeWidth={2.5} />
                    </a>
                  )}

                  {repoLink && (
                    <a
                      href={repoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-2.5 font-mono text-xs font-medium uppercase tracking-wider text-white/80 transition hover:border-white/40 hover:bg-white/10 hover:text-white active:scale-95"
                    >
                      <svg
                        className="size-4 fill-current"
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

                {/* Direct Project Indicators (if multiple projects) */}
                {totalProjects > 1 && (
                  <motion.div
                    custom={0.46}
                    variants={secondaryVariants}
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                    exit="exit"
                    className="mt-10 flex items-center gap-2 border-t border-white/10 pt-6"
                  >
                    <span className="mr-2 font-mono text-xs text-white/40">
                      All Projects:
                    </span>
                    {projects.map((p, idx) => (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => setActiveProjectIdx(idx)}
                        className={`rounded-md px-2.5 py-1 font-mono text-xs font-semibold transition ${
                          idx === safeIdx
                            ? 'bg-accent text-white shadow-sm shadow-accent/30'
                            : 'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white'
                        }`}
                      >
                        {String(idx + 1).padStart(2, '0')}
                      </button>
                    ))}
                  </motion.div>
                )}
              </div>
            </AnimatePresence>
          </div>

          {/* RIGHT SIDE: Scattered Canvas Carousel */}
          <div className="lg:col-span-7">
            <ScatteredCanvas
              key={`canvas-${currentProject.id}`}
              images={currentProject.images}
              projectTitle={currentProject.title}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
