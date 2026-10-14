'use client'

import React, { useState, useEffect, useCallback, useRef } from 'react'
import Image from 'next/image'
import {
  motion,
  PanInfo,
  useMotionValue,
  animate,
  TargetAndTransition,
  Transition,
} from 'framer-motion'
import { ChevronLeft, ChevronRight, Sparkles, Layers, Play, Pause } from 'lucide-react'

interface ScatteredCanvasProps {
  images: string[]
  projectTitle: string
}

// Known aspect ratios for preset dummy images to ensure instant server-side / initial layout accuracy
const KNOWN_ASPECT_RATIOS: Record<string, number> = {
  '/projects/dummy-1.jpg': 1696 / 2528, // ~0.6709 (portrait)
  '/projects/dummy-2.jpg': 1600 / 1600, // 1.0 (square)
  '/projects/dummy-3.jpg': 1600 / 1200, // 1.3333 (landscape 4:3)
  '/projects/dummy-4.jpg': 1200 / 1200, // 1.0 (square)
}

interface StackPose {
  x: number
  y: number
  rotate: number
  scale: number
  zIndex: number
  opacity: number
}

/**
 * Natural stack poses for cards resting in the deck.
 * order 0 = active front card (level, center, full scale)
 * order 1 = card directly behind (peeking top-right)
 * order 2 = card behind that (peeking top-left)
 * order 3 = card behind that (peeking top-right/center)
 */
function getStackPose(order: number): StackPose {
  if (order === 0) {
    return { x: 0, y: 0, rotate: 0, scale: 1, zIndex: 30, opacity: 1 }
  }

  const presets = [
    { x: 34, y: -14, rotate: 4.5, scale: 0.95, zIndex: 20, opacity: 0.85 },
    { x: -32, y: -24, rotate: -4.0, scale: 0.90, zIndex: 15, opacity: 0.65 },
    { x: 20, y: -32, rotate: 2.5, scale: 0.85, zIndex: 10, opacity: 0.45 },
  ]

  if (order <= 3) {
    return presets[order - 1]
  }

  return {
    x: (order % 2 === 0 ? -1 : 1) * 12,
    y: Math.min(-40, -32 - (order - 3) * 6),
    rotate: (order % 2 === 0 ? -1 : 1) * 1.5,
    scale: Math.max(0.75, 0.85 - (order - 3) * 0.04),
    zIndex: Math.max(1, 10 - order),
    opacity: Math.max(0.2, 0.45 - (order - 3) * 0.1),
  }
}

interface TransitionAction {
  type: 'next' | 'prev'
  cardIndex: number
  direction: 'left' | 'right'
  startPose?: { x: number; y: number; rotate: number }
}

export default function ScatteredCanvas({
  images,
  projectTitle,
}: ScatteredCanvasProps) {
  const [activeIdx, setActiveIdx] = useState(0)
  const [transitionAction, setTransitionAction] = useState<TransitionAction | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [aspectRatioMap, setAspectRatioMap] = useState<Record<string, number>>(() => ({
    ...KNOWN_ASPECT_RATIOS,
  }))

  const containerRef = useRef<HTMLDivElement>(null)
  const wasDraggedRef = useRef(false)
  const animTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const total = images.length

  // Dedicated motion value for interactive drag rotation on the active card
  const cardRotate = useMotionValue(0)

  // Record natural aspect ratio when image loads if not already known
  const handleImageLoad = useCallback((imgSrc: string, e: React.SyntheticEvent<HTMLImageElement>) => {
    const { naturalWidth, naturalHeight } = e.currentTarget
    if (naturalWidth && naturalHeight) {
      const ratio = naturalWidth / naturalHeight
      setAspectRatioMap((prev) => {
        if (prev[imgSrc] === ratio) return prev
        return { ...prev, [imgSrc]: ratio }
      })
    }
  }, [])

  const getImageAspect = useCallback(
    (imgSrc: string) => aspectRatioMap[imgSrc] || KNOWN_ASPECT_RATIOS[imgSrc] || 16 / 10,
    [aspectRatioMap]
  )

  // Calculate card dimensions dynamically based on image aspect ratio
  const getCardSizeStyle = useCallback((aspect: number) => {
    return {
      aspectRatio: `${aspect}`,
      maxWidth: aspect < 1 ? `min(76%, calc(76% * ${aspect}))` : '76%',
      maxHeight: '76%',
      width: aspect < 1 ? `calc(72% * ${aspect})` : '72%',
    }
  }, [])

  // Clean up pending animation timeout on unmount
  useEffect(() => {
    return () => {
      if (animTimeoutRef.current) clearTimeout(animTimeoutRef.current)
    }
  }, [])

  // Responsive clearance distance for tucking animation
  const getTuckDistance = useCallback(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 640) {
      return 200
    }
    return 280
  }, [])

  /**
   * Advance to the next card:
   * The current top card sweeps smoothly outward with natural tilt,
   * ducks behind the stack, and glides into the back position,
   * while the next card steps forward to the front.
   */
  const advanceToNext = useCallback(
    (
      direction: 'left' | 'right' = 'right',
      customStartPose?: { x: number; y: number; rotate: number }
    ) => {
      if (total <= 1 || isAnimating) return

      const outgoing = activeIdx
      const nextIdx = (activeIdx + 1) % total

      setIsAnimating(true)
      setTransitionAction({
        type: 'next',
        cardIndex: outgoing,
        direction,
        startPose: customStartPose,
      })
      setActiveIdx(nextIdx)

      if (animTimeoutRef.current) clearTimeout(animTimeoutRef.current)
      animTimeoutRef.current = setTimeout(() => {
        setTransitionAction(null)
        setIsAnimating(false)
      }, 540)
    },
    [total, isAnimating, activeIdx]
  )

  /**
   * Go back to the previous card:
   * Pulls the bottom card from the back of the stack outward,
   * elevates it, and lands it smoothly on top of the deck.
   */
  const advanceToPrev = useCallback(() => {
    if (total <= 1 || isAnimating) return

    const prevIdx = (activeIdx - 1 + total) % total

    setIsAnimating(true)
    setTransitionAction({
      type: 'prev',
      cardIndex: prevIdx,
      direction: 'left',
    })
    setActiveIdx(prevIdx)

    if (animTimeoutRef.current) clearTimeout(animTimeoutRef.current)
    animTimeoutRef.current = setTimeout(() => {
      setTransitionAction(null)
      setIsAnimating(false)
    }, 540)
  }, [total, isAnimating, activeIdx])

  /**
   * Switch directly to any card in the stack
   */
  const handleSelectCard = useCallback(
    (targetIdx: number) => {
      if (targetIdx === activeIdx || isAnimating || total <= 1) return

      if (targetIdx === (activeIdx + 1) % total) {
        advanceToNext('right')
      } else if (targetIdx === (activeIdx - 1 + total) % total) {
        advanceToPrev()
      } else {
        const forwardDiff = (targetIdx - activeIdx + total) % total
        if (forwardDiff <= total / 2) {
          advanceToNext('right')
        } else {
          advanceToPrev()
        }
      }
    },
    [activeIdx, isAnimating, total, advanceToNext, advanceToPrev]
  )

  // Drag release on active card
  const handleDragEnd = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    const currentX = info.offset.x
    const currentY = info.offset.y
    const currentRotate = cardRotate.get()

    const passedX = Math.abs(currentX) > 75 || Math.abs(info.velocity.x) > 280
    const passedY = currentY < -75 || info.velocity.y < -280

    if (passedX || passedY) {
      const direction: 'left' | 'right' = currentX < 0 ? 'left' : 'right'
      cardRotate.set(0)
      advanceToNext(direction, {
        x: currentX,
        y: currentY,
        rotate: currentRotate,
      })
    } else {
      animate(cardRotate, 0, { type: 'spring', stiffness: 350, damping: 28 })
    }

    setTimeout(() => {
      wasDraggedRef.current = false
    }, 120)
  }

  const handleCardClick = (clickedIdx: number) => {
    if (wasDraggedRef.current) {
      wasDraggedRef.current = false
      return
    }

    if (total <= 1 || isAnimating) return

    if (clickedIdx === activeIdx) {
      advanceToNext('right')
    } else {
      handleSelectCard(clickedIdx)
    }
  }

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!containerRef.current?.contains(document.activeElement)) return
      if (e.key === 'ArrowRight' || e.key === 'Space') {
        e.preventDefault()
        advanceToNext('right')
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        advanceToPrev()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [advanceToNext, advanceToPrev])

  // Slideshow auto-play timer
  useEffect(() => {
    if (!isPlaying || isAnimating || total <= 1) return
    const timer = setInterval(() => {
      advanceToNext('right')
    }, 2800)
    return () => clearInterval(timer)
  }, [isPlaying, isAnimating, total, advanceToNext])

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
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.07)_1px,transparent_1px)] [background-size:24px_24px] opacity-50 z-[1]" />

        {/* Ambient atmospheric glow */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 size-[380px] rounded-full bg-accent/10 blur-[120px] z-[1]" />

        {/* Corner studio marks */}
        <div className="pointer-events-none absolute top-4 left-4 font-mono text-[10px] text-white/20 z-10">
          + 01
        </div>
        <div className="pointer-events-none absolute top-4 right-4 font-mono text-[10px] text-white/20 z-10">
          CANVAS • SCATTER DECK
        </div>
        <div className="pointer-events-none absolute bottom-4 left-4 font-mono text-[10px] text-white/20 z-10">
          + LHE
        </div>
        <div className="pointer-events-none absolute bottom-4 right-4 font-mono text-[10px] text-white/20 z-10">
          + 04
        </div>

        {/*
          THE PERSISTENT CARD STACK
          Every card has clean native Framer Motion drag without shared state pollution,
          ensuring images never get stuck at non-zero offsets or shifts.
        */}
        {images.map((img, index) => {
          const order = (index - activeIdx + total) % total
          const pose = getStackPose(order)
          const isCurrentActive = order === 0
          const isTransitioningCard = transitionAction?.cardIndex === index
          const tuckDistance = getTuckDistance()
          const aspect = getImageAspect(img)
          const sizeStyle = getCardSizeStyle(aspect)

          let animationTarget: TargetAndTransition
          let transitionConfig: Transition

          if (isTransitioningCard && transitionAction) {
            if (transitionAction.type === 'next') {
              // Outgoing card sweeps out, ducks behind the stack, and tucks into the back pose
              const destPose = getStackPose(total - 1)
              const startX = transitionAction.startPose?.x ?? 0
              const startY = transitionAction.startPose?.y ?? 0
              const startRotate = transitionAction.startPose?.rotate ?? 0
              const dirSign = transitionAction.direction === 'right' ? 1 : -1

              animationTarget = {
                x: [startX, dirSign * tuckDistance, destPose.x],
                y: [startY, -14, destPose.y],
                rotate: [startRotate, dirSign * 8, destPose.rotate],
                scale: [1, 0.96, destPose.scale],
                opacity: [1, 0.9, destPose.opacity],
                zIndex: [40, 40, destPose.zIndex, destPose.zIndex],
              }

              transitionConfig = {
                duration: 0.52,
                times: [0, 0.44, 0.48, 1],
                ease: [0.25, 1, 0.5, 1],
              }
            } else {
              // Incoming card sweeps out from the back, elevates, and glides onto top of stack
              const sourcePose = getStackPose(total - 1)

              animationTarget = {
                x: [sourcePose.x, -tuckDistance, 0],
                y: [sourcePose.y, -14, 0],
                rotate: [sourcePose.rotate, -8, 0],
                scale: [sourcePose.scale, 0.98, 1],
                opacity: [sourcePose.opacity, 0.9, 1],
                zIndex: [sourcePose.zIndex, 40, 30],
              }

              transitionConfig = {
                duration: 0.52,
                times: [0, 0.44, 1],
                ease: [0.25, 1, 0.5, 1],
              }
            }
          } else {
            // Resting or transitioning to new stack position
            animationTarget = {
              x: pose.x,
              y: pose.y,
              rotate: pose.rotate,
              scale: pose.scale,
              opacity: pose.opacity,
              zIndex: pose.zIndex,
            }

            transitionConfig = {
              type: 'spring',
              stiffness: 260,
              damping: 26,
              mass: 0.8,
            }
          }

          const isDraggable = isCurrentActive && total > 1 && !isAnimating

          return (
            <motion.div
              key={`card-${index}`}
              drag={isDraggable}
              dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
              dragElastic={0.65}
              onDragStart={() => {
                wasDraggedRef.current = false
              }}
              onDrag={(_event, info) => {
                wasDraggedRef.current = true
                const r = Math.max(-16, Math.min(16, (info.offset.x / 220) * 16))
                cardRotate.set(r)
              }}
              onDragEnd={handleDragEnd}
              animate={animationTarget}
              transition={transitionConfig}
              onClick={() => handleCardClick(index)}
              style={{
                ...sizeStyle,
                ...(isDraggable ? { rotate: cardRotate } : {}),
              }}
              className={`absolute select-none rounded-2xl overflow-hidden bg-zinc-950 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.95)] ${
                isCurrentActive
                  ? 'cursor-grab active:cursor-grabbing border border-white/20'
                  : 'cursor-pointer border border-white/10'
              }`}
            >
              {/* Full edge-to-edge image matching card bounds */}
              <Image
                src={img}
                alt={`${projectTitle} preview ${index + 1}`}
                fill
                priority={isCurrentActive}
                sizes="(max-width: 768px) 75vw, 45vw"
                className="object-cover pointer-events-none"
                onLoad={(e) => handleImageLoad(img, e)}
              />

              {/* Vignette & soft reflection highlights */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />

              {/* Subtle dark veil on background cards for tactile depth */}
              {!isCurrentActive && (
                <div className="pointer-events-none absolute inset-0 bg-black/25" />
              )}

              {/* Active card pill indicators */}
              {isCurrentActive && (
                <>
                  <div className="absolute top-3 left-3 flex items-center gap-2 rounded-full bg-black/70 px-3 py-1 font-mono text-[11px] font-medium text-white/90 backdrop-blur-md border border-white/15">
                    <span className="size-1.5 rounded-full bg-accent animate-pulse" />
                    <span>
                      {String(index + 1).padStart(2, '0')} /{' '}
                      {String(total).padStart(2, '0')}
                    </span>
                  </div>

                  {total > 1 && (
                    <div className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-black/70 px-3 py-1 font-mono text-[11px] text-white/70 backdrop-blur-md border border-white/15">
                      <Sparkles className="size-3 text-accent" />
                      <span>Drag or click to toss</span>
                    </div>
                  )}
                </>
              )}

              {/* Background card layer indicator */}
              {!isCurrentActive && (
                <div className="absolute bottom-2.5 right-2.5 rounded-md bg-black/75 px-2 py-0.5 font-mono text-[10px] text-white/60 backdrop-blur-sm border border-white/10">
                  #{String(index + 1).padStart(2, '0')}
                </div>
              )}
            </motion.div>
          )
        })}
      </div>

      {/* Floating Canvas Controls Dock */}
      {total > 1 && (
        <div className="mt-4 flex items-center justify-between px-2">
          {/* Deck Count Indicator & Auto-play toggle */}
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
                  onClick={() => handleSelectCard(idx)}
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
              onClick={advanceToPrev}
              className="flex size-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition-all hover:border-white/30 hover:bg-white/10 hover:text-white active:scale-95"
              aria-label="Previous image"
            >
              <ChevronLeft className="size-4" />
            </button>
            <button
              type="button"
              onClick={() => advanceToNext('right')}
              className="flex size-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition-all hover:border-white/30 hover:bg-white/10 hover:text-white active:scale-95"
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
