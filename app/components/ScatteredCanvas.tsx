'use client'

import React, { useState, useEffect, useCallback, useRef } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence, useMotionValue, useTransform, PanInfo } from 'framer-motion'
import { ChevronLeft, ChevronRight, Sparkles, Layers, Play, Pause } from 'lucide-react'

interface ScatteredCanvasProps {
  images: string[]
  projectTitle: string
}

// Preset natural scatter poses for cards resting in the background
const SCATTER_POSES = [
  { x: 105, y: -65, rotate: 11, scale: 0.88, zIndex: 20, opacity: 0.7 },
  { x: -115, y: 70, rotate: -10, scale: 0.84, zIndex: 15, opacity: 0.6 },
  { x: -95, y: -80, rotate: -16, scale: 0.8, zIndex: 10, opacity: 0.5 },
  { x: 95, y: 80, rotate: 14, scale: 0.76, zIndex: 5, opacity: 0.4 },
  { x: 0, y: -100, rotate: 6, scale: 0.72, zIndex: 4, opacity: 0.35 },
]

export default function ScatteredCanvas({
  images,
  projectTitle,
}: ScatteredCanvasProps) {
  const [activeIdx, setActiveIdx] = useState(0)
  const [thrownCard, setThrownCard] = useState<{
    image: string
    direction: 'left' | 'right' | 'up'
    key: number
  } | null>(null)
  const [isTossing, setIsTossing] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Motion values for interactive physics drag on the active card
  const dragX = useMotionValue(0)
  const dragY = useMotionValue(0)
  const dragRotate = useTransform(dragX, [-200, 0, 200], [-18, 0, 18])

  // Reset to first image when images change (e.g. project switch)
  useEffect(() => {
    setActiveIdx(0)
    setThrownCard(null)
    dragX.set(0)
    dragY.set(0)
  }, [images, dragX, dragY])

  const total = images.length
  const currentImage = images[activeIdx] || images[0]

  const handleNext = useCallback(
    (direction: 'left' | 'right' = 'right') => {
      if (total <= 1 || isTossing) return
      setIsTossing(true)

      setThrownCard({
        image: images[activeIdx],
        direction,
        key: Date.now(),
      })

      setActiveIdx((prev) => (prev + 1) % total)

      setTimeout(() => {
        setIsTossing(false)
      }, 480)
    },
    [images, activeIdx, total, isTossing]
  )

  const handlePrev = useCallback(() => {
    if (total <= 1 || isTossing) return
    setIsTossing(true)

    setThrownCard({
      image: images[activeIdx],
      direction: 'left',
      key: Date.now(),
    })

    setActiveIdx((prev) => (prev - 1 + total) % total)

    setTimeout(() => {
      setIsTossing(false)
    }, 480)
  }, [images, activeIdx, total, isTossing])

  const handleSelectScattered = (targetIndex: number) => {
    if (targetIndex === activeIdx || isTossing) return
    setIsTossing(true)

    const direction = targetIndex > activeIdx ? 'right' : 'left'
    setThrownCard({
      image: images[activeIdx],
      direction,
      key: Date.now(),
    })

    setActiveIdx(targetIndex)
    setTimeout(() => {
      setIsTossing(false)
    }, 480)
  }

  const handleDragEnd = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    const threshold = 75
    if (info.offset.x > threshold || info.velocity.x > 300) {
      handleNext('right')
    } else if (info.offset.x < -threshold || info.velocity.x < -300) {
      handleNext('left')
    } else if (info.offset.y < -threshold || info.velocity.y < -300) {
      handleNext('right')
    }
    dragX.set(0)
    dragY.set(0)
  }

  // Keyboard navigation when focusing canvas
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!containerRef.current?.contains(document.activeElement)) return
      if (e.key === 'ArrowRight' || e.key === 'Space') {
        e.preventDefault()
        handleNext('right')
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        handlePrev()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleNext, handlePrev])

  // Optional auto-play timer
  useEffect(() => {
    if (!isPlaying || total <= 1) return
    const timer = setInterval(() => {
      handleNext('right')
    }, 3500)
    return () => clearInterval(timer)
  }, [isPlaying, total, handleNext])

  // Determine non-active cards to render scattered in the background
  const scatteredCards = images
    .map((img, index) => ({ img, index }))
    .filter((item) => item.index !== activeIdx)

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      className="relative w-full select-none outline-none focus-visible:ring-1 focus-visible:ring-accent/40 rounded-3xl"
      aria-label="Interactive project images canvas carousel"
    >
      {/* Canvas Frame / Light-table container */}
      <div className="relative aspect-[4/3] w-full min-h-[440px] sm:min-h-[500px] lg:min-h-[560px] overflow-hidden rounded-3xl border border-white/10 bg-[#080808]/90 backdrop-blur-2xl shadow-2xl shadow-black/80 flex items-center justify-center p-6 sm:p-10">
        {/* Subtle grid background */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.07)_1px,transparent_1px)] [background-size:24px_24px] opacity-50" />

        {/* Ambient atmospheric glow */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 size-[380px] rounded-full bg-accent/10 blur-[120px]" />

        {/* Corner studio marks */}
        <div className="pointer-events-none absolute top-4 left-4 font-mono text-[10px] text-white/20">
          + 01
        </div>
        <div className="pointer-events-none absolute top-4 right-4 font-mono text-[10px] text-white/20">
          CANVAS • SCATTER DECK
        </div>
        <div className="pointer-events-none absolute bottom-4 left-4 font-mono text-[10px] text-white/20">
          + LHE
        </div>
        <div className="pointer-events-none absolute bottom-4 right-4 font-mono text-[10px] text-white/20">
          + 04
        </div>

        {/* Scattered Background Cards */}
        {scatteredCards.map((item, i) => {
          const pose = SCATTER_POSES[i % SCATTER_POSES.length]
          return (
            <motion.div
              key={`scattered-${item.index}-${item.img}`}
              layout
              initial={{
                x: pose.x,
                y: pose.y,
                rotate: pose.rotate,
                scale: pose.scale,
                opacity: 0,
              }}
              animate={{
                x: pose.x,
                y: pose.y,
                rotate: pose.rotate,
                scale: pose.scale,
                opacity: pose.opacity,
              }}
              whileHover={{
                scale: pose.scale + 0.05,
                opacity: 0.95,
                rotate: pose.rotate > 0 ? pose.rotate - 4 : pose.rotate + 4,
                transition: { duration: 0.2 },
              }}
              transition={{
                type: 'spring',
                stiffness: 240,
                damping: 24,
              }}
              onClick={() => handleSelectScattered(item.index)}
              style={{ zIndex: pose.zIndex }}
              title="Click to bring to front"
              className="group absolute w-[68%] sm:w-[62%] aspect-[16/10] cursor-pointer rounded-2xl overflow-hidden border border-white/15 bg-zinc-950/80 shadow-2xl shadow-black/80 transition-[border-color,box-shadow] hover:border-accent/50 hover:shadow-accent/20"
            >
              <Image
                src={item.img}
                alt={`${projectTitle} preview ${item.index + 1}`}
                fill
                sizes="(max-width: 768px) 70vw, 40vw"
                className="object-cover pointer-events-none filter brightness-90 contrast-105 transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/25 group-hover:bg-transparent transition-colors" />

              {/* Tag indicator */}
              <div className="absolute bottom-2.5 right-2.5 rounded-md bg-black/75 px-2 py-0.5 font-mono text-[10px] text-white/60 backdrop-blur-sm border border-white/10 group-hover:text-accent group-hover:border-accent/40 transition-colors">
                #{String(item.index + 1).padStart(2, '0')}
              </div>
            </motion.div>
          )
        })}

        {/* Thrown Away Card (Exiting with momentum physics) */}
        <AnimatePresence>
          {thrownCard && (
            <motion.div
              key={`thrown-${thrownCard.key}`}
              initial={{
                x: 0,
                y: 0,
                rotate: 0,
                scale: 1,
                opacity: 1,
              }}
              animate={{
                x: thrownCard.direction === 'right' ? 560 : -560,
                y: -95,
                rotate: thrownCard.direction === 'right' ? 35 : -35,
                scale: 0.72,
                opacity: 0,
              }}
              transition={{
                duration: 0.48,
                ease: [0.32, 0.72, 0, 1],
              }}
              style={{ zIndex: 35 }}
              className="pointer-events-none absolute w-[72%] sm:w-[66%] aspect-[16/10] rounded-2xl overflow-hidden border border-white/25 shadow-2xl shadow-black/90"
            >
              <Image
                src={thrownCard.image}
                alt="Discarded card"
                fill
                sizes="(max-width: 768px) 75vw, 45vw"
                className="object-cover"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Active Front Card (Straight, Level, Highest Z-Index) */}
        <motion.div
          key={`active-${activeIdx}-${currentImage}`}
          drag={total > 1}
          dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
          dragElastic={0.65}
          style={{
            x: dragX,
            y: dragY,
            rotate: dragRotate,
            zIndex: 30,
          }}
          onDragEnd={handleDragEnd}
          initial={{
            scale: 0.9,
            opacity: 0.7,
          }}
          animate={{
            scale: 1,
            opacity: 1,
          }}
          whileHover={{ scale: 1.015 }}
          whileDrag={{
            scale: 1.04,
            cursor: 'grabbing',
          }}
          transition={{
            type: 'spring',
            stiffness: 280,
            damping: 24,
          }}
          onClick={() => {
            if (total > 1 && !isTossing) {
              handleNext('right')
            }
          }}
          className="relative w-[72%] sm:w-[66%] aspect-[16/10] cursor-grab active:cursor-grabbing rounded-2xl overflow-hidden border border-white/20 bg-zinc-950 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.95)] ring-1 ring-white/10 group"
        >
          <Image
            src={currentImage}
            alt={`${projectTitle} active preview`}
            fill
            priority
            sizes="(max-width: 768px) 75vw, 45vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105 pointer-events-none"
          />

          {/* Vignette & soft reflection highlights */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />

          {/* Top Pill: Image index */}
          <div className="absolute top-3 left-3 flex items-center gap-2 rounded-full bg-black/70 px-3 py-1 font-mono text-[11px] font-medium text-white/90 backdrop-blur-md border border-white/15">
            <span className="size-1.5 rounded-full bg-accent animate-pulse" />
            <span>
              {String(activeIdx + 1).padStart(2, '0')} /{' '}
              {String(total).padStart(2, '0')}
            </span>
          </div>

          {/* Bottom Pill: Drag / Click hint */}
          {total > 1 && (
            <div className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-black/70 px-3 py-1 font-mono text-[11px] text-white/70 backdrop-blur-md border border-white/15 transition-opacity group-hover:text-white">
              <Sparkles className="size-3 text-accent" />
              <span>Drag or click to toss</span>
            </div>
          )}
        </motion.div>
      </div>

      {/* Floating Canvas Controls Dock */}
      {total > 1 && (
        <div className="mt-4 flex items-center justify-between px-2">
          {/* Scatter Deck Count Indicator & Auto-play toggle */}
          <div className="flex items-center gap-3 font-mono text-xs text-white/40">
            <div className="flex items-center gap-1.5">
              <Layers className="size-3.5 text-accent" />
              <span>{total} shots on canvas</span>
            </div>
            <button
              type="button"
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex items-center gap-1 rounded-full border border-white/10 px-2 py-0.5 text-[11px] text-white/50 transition hover:border-white/30 hover:text-white"
              title={isPlaying ? 'Pause slideshow' : 'Auto-toss slideshow'}
            >
              {isPlaying ? (
                <>
                  <Pause className="size-2.5 text-accent" />
                  <span>Pause</span>
                </>
              ) : (
                <>
                  <Play className="size-2.5" />
                  <span>Auto-toss</span>
                </>
              )}
            </button>
          </div>

          {/* Interactive Navigation Controls */}
          <div className="flex items-center gap-2">
            {/* Step Dots */}
            <div className="mr-2 flex items-center gap-1.5">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelectScattered(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    idx === activeIdx
                      ? 'w-6 bg-accent'
                      : 'w-1.5 bg-white/20 hover:bg-white/50'
                  }`}
                  aria-label={`Go to image ${idx + 1}`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={handlePrev}
              disabled={isTossing}
              className="flex size-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition-all hover:border-white/30 hover:bg-white/10 hover:text-white active:scale-95 disabled:opacity-40"
              aria-label="Previous image"
            >
              <ChevronLeft className="size-4" />
            </button>
            <button
              type="button"
              onClick={() => handleNext('right')}
              disabled={isTossing}
              className="flex size-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition-all hover:border-white/30 hover:bg-white/10 hover:text-white active:scale-95 disabled:opacity-40"
              aria-label="Next image"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
