'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react'

interface ProjectGalleryProps {
  images: string[]
  title: string
}

export default function ProjectGallery({ images, title }: ProjectGalleryProps) {
  const [activeIdx, setActiveIdx] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)

  if (!images || images.length === 0) return null

  const total = images.length
  const currentImage = images[activeIdx]

  const handleNext = () => {
    setActiveIdx((prev) => (prev + 1) % total)
  }

  const handlePrev = () => {
    setActiveIdx((prev) => (prev - 1 + total) % total)
  }

  return (
    <div className="relative w-full">
      {/* Featured Main Image Card */}
      <div className="group relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden rounded-2xl sm:rounded-3xl border border-white/10 bg-zinc-950/80 shadow-2xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImage}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative size-full"
          >
            <Image
              src={currentImage}
              alt={`${title} screenshot ${activeIdx + 1}`}
              fill
              priority
              sizes="(max-width: 1280px) 100vw, 1200px"
              className="object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
          </motion.div>
        </AnimatePresence>

        {/* Counter Badge */}
        <div className="absolute top-4 left-4 flex items-center gap-2 rounded-full border border-white/15 bg-black/70 px-3 py-1 font-mono text-xs font-medium text-white/90 backdrop-blur-md">
          <span className="size-1.5 rounded-full bg-accent animate-pulse" />
          <span>
            {String(activeIdx + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </span>
        </div>

        {/* Fullscreen Zoom Trigger */}
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="absolute top-4 right-4 flex size-8 sm:size-9 items-center justify-center rounded-full border border-white/15 bg-black/70 text-white/70 backdrop-blur-md transition hover:border-white/40 hover:bg-black/90 hover:text-white"
          aria-label="View full size image"
        >
          <Maximize2 className="size-4" />
        </button>

        {/* Quick Prev / Next Arrows on Hover */}
        {total > 1 && (
          <div className="absolute inset-x-4 top-1/2 flex -translate-y-1/2 items-center justify-between pointer-events-none">
            <button
              type="button"
              onClick={handlePrev}
              className="pointer-events-auto flex size-10 items-center justify-center rounded-full border border-white/15 bg-black/70 text-white/70 backdrop-blur-md transition hover:border-white/40 hover:bg-black hover:text-white active:scale-95"
              aria-label="Previous image"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="pointer-events-auto flex size-10 items-center justify-center rounded-full border border-white/15 bg-black/70 text-white/70 backdrop-blur-md transition hover:border-white/40 hover:bg-black hover:text-white active:scale-95"
              aria-label="Next image"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>
        )}
      </div>

      {/* Thumbnails Row */}
      {total > 1 && (
        <div className="mt-4 flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
          {images.map((img, idx) => (
            <button
              key={`thumb-${idx}`}
              type="button"
              onClick={() => setActiveIdx(idx)}
              className={`group relative h-16 sm:h-20 w-24 sm:w-32 flex-shrink-0 overflow-hidden rounded-xl border transition-all ${
                idx === activeIdx
                  ? 'border-accent ring-2 ring-accent/30 scale-[1.02]'
                  : 'border-white/10 opacity-60 hover:border-white/30 hover:opacity-100'
              }`}
              aria-label={`Jump to image ${idx + 1}`}
            >
              <Image
                src={img}
                alt=""
                fill
                sizes="128px"
                className="object-cover"
              />
              <span className="absolute bottom-1 right-1 rounded bg-black/75 px-1 font-mono text-[9px] text-white/70">
                #{String(idx + 1).padStart(2, '0')}
              </span>
            </button>
          ))}
        </div>
      )}

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 sm:p-8 backdrop-blur-xl"
            onClick={() => setIsModalOpen(false)}
          >
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 z-10 flex size-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white hover:bg-white/20"
              aria-label="Close fullscreen view"
            >
              <X className="size-5" />
            </button>

            <div
              className="relative max-h-[90vh] max-w-7xl size-full overflow-hidden rounded-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={currentImage}
                alt={`${title} fullscreen`}
                fill
                sizes="100vw"
                className="object-contain"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
