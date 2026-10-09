'use client'

import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { Project } from '@/lib/projects'
import ScatteredCanvas from './ScatteredCanvas'

interface ProjectsSectionProps {
  projects: Project[]
}

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  const [activeProjectIdx, setActiveProjectIdx] = useState(0)

  // Ensure index is within range if projects are removed
  const safeIdx = Math.min(activeProjectIdx, Math.max(0, projects.length - 1))
  const currentProject = projects[safeIdx]

  // If no valid projects are provided in JSON yet
  if (!currentProject || projects.length === 0) {
    return (
      <section className="relative border-t border-white/10 px-6 py-24 sm:px-10 sm:py-32">
        <div className="mx-auto w-full max-w-7xl">
          <p className="font-mono text-xs font-medium uppercase tracking-[0.25em] text-accent">
            <span className="mr-2.5 inline-block size-1.5 rounded-full bg-accent align-middle" />
            02 / Projects
          </p>
          <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-8 text-center text-white/50">
            No completed projects found in <code className="text-white/80">data/projects.json</code>. Add a project with title, description, and images to display it here.
          </div>
        </div>
      </section>
    )
  }

  // Pre-calculate character offsets for staggered Aneshk-style text animation
  const titleWords = useMemo(() => {
    return currentProject.title.split(' ')
  }, [currentProject.title])

  const wordOffsets = useMemo(() => {
    let count = 0
    return titleWords.map((word) => {
      const current = count
      count += word.length
      return current
    })
  }, [titleWords])

  const totalProjects = projects.length

  const handleNextProject = () => {
    setActiveProjectIdx((prev) => (prev + 1) % totalProjects)
  }

  const handlePrevProject = () => {
    setActiveProjectIdx((prev) => (prev - 1 + totalProjects) % totalProjects)
  }

  return (
    <section id="projects" className="relative border-t border-white/10 px-6 py-24 sm:px-10 sm:py-32">
      <div className="mx-auto w-full max-w-7xl">
        {/* Section Header Tag */}
        <div className="flex items-center justify-between">
          <p className="font-mono text-xs font-medium uppercase tracking-[0.25em] text-accent">
            <span className="mr-2.5 inline-block size-1.5 rounded-full bg-accent align-middle" />
            02 / Selected Works
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

        {/* Two-Column Grid: Left Side (Aneshk Style Typography & Animation) | Right Side (Scattered Canvas Carousel) */}
        <div className="mt-12 grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* LEFT SIDE: Aneshk.design Inspired Typography & Animations */}
          <div className="flex flex-col justify-center lg:col-span-5">
            {/* Project Index / Counter */}
            <div className="flex items-center gap-2 font-mono text-2xl sm:text-3xl font-bold tracking-wider text-white/30">
              <div className="relative h-9 overflow-hidden flex items-center">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span
                    key={`pnum-${currentProject.id}`}
                    initial={{ y: 26, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -26, opacity: 0 }}
                    transition={{
                      duration: 0.45,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="inline-block text-white/90"
                  >
                    {String(safeIdx + 1).padStart(2, '0')}
                  </motion.span>
                </AnimatePresence>
              </div>
              <span className="text-white/20">/</span>
              <span>{String(totalProjects).padStart(2, '0')}</span>
            </div>

            {/* Massive Display Title with Exact Staggered Character Flip Animation */}
            <h3 className="mt-4 font-display font-extrabold uppercase leading-[0.88] tracking-[-0.02em] text-[clamp(2.75rem,5.5vw,5.5rem)] text-accent">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`ptitle-${currentProject.id}`}
                  className="flex flex-wrap items-baseline"
                >
                  {titleWords.map((word, wIdx) => (
                    <span
                      key={`word-${currentProject.id}-${wIdx}`}
                      className="inline-block whitespace-nowrap mr-[0.24em] overflow-hidden py-1"
                    >
                      {word.split('').map((char, cIdx) => (
                        <motion.span
                          key={`char-${currentProject.id}-${wIdx}-${cIdx}`}
                          initial={{ y: '110%', opacity: 0 }}
                          animate={{ y: '0%', opacity: 1 }}
                          exit={{ y: '-110%', opacity: 0 }}
                          transition={{
                            duration: 0.52,
                            ease: [0.16, 1, 0.3, 1],
                            delay: (wordOffsets[wIdx] + cIdx) * 0.022,
                          }}
                          className="inline-block will-change-transform"
                        >
                          {char}
                        </motion.span>
                      ))}
                    </span>
                  ))}
                </motion.div>
              </AnimatePresence>
            </h3>

            {/* Category / Subtitle */}
            <div className="mt-6 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`pcat-${currentProject.id}`}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{
                    duration: 0.45,
                    ease: [0.16, 1, 0.3, 1],
                    delay: 0.08,
                  }}
                  className="font-mono text-sm sm:text-base font-semibold uppercase tracking-[0.16em] text-white/70"
                >
                  {currentProject.category || 'FEATURED WORK'}
                  {currentProject.year && (
                    <span className="ml-3 font-normal text-white/40">
                      • {currentProject.year}
                    </span>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Short Project Description */}
            <div className="mt-4 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.p
                  key={`pdesc-${currentProject.id}`}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -18 }}
                  transition={{
                    duration: 0.48,
                    ease: [0.16, 1, 0.3, 1],
                    delay: 0.14,
                  }}
                  className="max-w-xl text-base sm:text-lg leading-[1.6] text-white/50"
                >
                  {currentProject.description}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Tags Pill list (if provided) */}
            {currentProject.tags && currentProject.tags.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2">
                {currentProject.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 font-mono text-xs text-white/60"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Project Links / Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              {currentProject.liveUrl && (
                <a
                  href={currentProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-accent/20 transition hover:brightness-110 active:scale-95"
                >
                  <span>Live Preview</span>
                  <ArrowUpRight className="size-4" strokeWidth={2.5} />
                </a>
              )}

              {currentProject.githubUrl && (
                <a
                  href={currentProject.githubUrl}
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
            </div>

            {/* Direct Project Indicators (if multiple projects) */}
            {totalProjects > 1 && (
              <div className="mt-10 flex items-center gap-2 border-t border-white/10 pt-6">
                <span className="font-mono text-xs text-white/40 mr-2">
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
              </div>
            )}
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
