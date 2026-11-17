'use client'

import React, { useState, useEffect, useCallback, useRef } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'
import {
  motion,
  PanInfo,
  useMotionValue,
  animate,
  AnimatePresence,
  TargetAndTransition,
  Transition,
  useInView,
} from 'framer-motion'
import {
  ChevronLeft,
  ChevronRight,
  Layers,
  Play,
  Pause,
  Maximize2,
  X,
} from 'lucide-react'

interface ScatteredCanvasProps {
  images: string[]
  projectTitle: string
  isAutoToss?: boolean
  onToggleAutoToss?: () => void
}

// Known aspect ratios for preset dummy and real project images to ensure instant server-side / initial layout accuracy
const KNOWN_ASPECT_RATIOS: Record<string, number> = {
  '/projects/blueritt/blueritt-hero-landing.webp': 1024 / 640,
  '/projects/blueritt/blueritt-explorer-discovery.webp': 1024 / 640,
  '/projects/blueritt/blueritt-sourcelink-suppliers.webp': 1024 / 640,
  '/projects/blueritt/blueritt-marginmax-financials.webp': 1024 / 640,
  '/projects/blueritt/blueritt-socialpulse-trends.webp': 1024 / 640,
  '/projects/blueritt/blueritt-product-vault.webp': 1024 / 640,
  '/projects/blueritt/blueritt-toolfusion-ecosystem.webp': 1024 / 640,
  '/projects/blueritt/blueritt-enterprise-intelligence.webp': 1024 / 640,
  '/projects/blueritt/blueritt-pricing-tiers.webp': 1024 / 640,
  '/projects/dummy-1.webp': 1696 / 2528, // ~0.6709 (portrait)
  '/projects/dummy-2.webp': 1600 / 1600, // 1.0 (square)
  '/projects/dummy-3.webp': 1600 / 1200, // 1.3333 (landscape 4:3)
  '/projects/dummy-4.webp': 1200 / 1200, // 1.0 (square)
  '/projects/pisco/pisco-platform-overview.webp': 4320 / 2700, // 1.6
  '/projects/pisco/pisco-bom-summary.webp': 1440 / 900, // 1.6
  '/projects/pisco/pisco-single-source-risk.webp': 3002 / 1742, // ~1.723
  '/projects/pisco/pisco-ai-chat-assistant.webp': 1440 / 900, // 1.6
  '/projects/pisco/pisco-match-columns.webp': 4320 / 2700, // 1.6
  '/projects/pisco/pisco-component-specs.webp': 1440 / 900, // 1.6
  '/projects/pisco/pisco-part-lookup.webp': 2996 / 1734, // ~1.728
  '/projects/pisco/pisco-multi-project.webp': 2456 / 1732, // ~1.418
  '/projects/infinity-table/infinity-table-level-design-figma.webp': 1024 / 665, // ~1.54
  '/projects/infinity-table/infinity-table-hero-token.webp': 789 / 467, // ~1.69
  '/projects/infinity-table/infinity-table-voice-session.webp': 460 / 1024, // ~0.45 (portrait)
  '/projects/infinity-table/infinity-table-ar-room.webp': 460 / 1024, // ~0.45 (portrait)
  '/projects/infinity-table/infinity-table-grid-navigation.webp': 460 / 1024, // ~0.45 (portrait)
  '/projects/gamerize/gamerize-base-building.webp': 1024 / 460, // ~2.226 (landscape)
  '/projects/gamerize/gamerize-school-dashboard.webp': 1024 / 555, // ~1.845 (landscape)
  '/projects/gamerize/gamerize-admin-portal.webp': 1024 / 556, // ~1.842 (landscape)
  '/projects/gamerize/gamerize-adventure-menu.webp': 1024 / 460, // ~2.226 (landscape)
  '/projects/gamerize/gamerize-curriculum-bundles.webp': 1024 / 460, // ~2.226 (landscape)
  '/projects/gamerize/gamerize-features-overview.webp': 1024 / 554, // ~1.848 (landscape)
  '/projects/gamerize/gamerize-mobile-settings.webp': 1024 / 484, // ~2.116 (landscape)
  '/projects/gamerize/gamerize-hero-landing.webp': 1024 / 556, // ~1.842 (landscape)
  '/projects/omniactive/omniactive-super-admin-dashboard.webp': 2978 / 1728, // ~1.723
  '/projects/omniactive/omniactive-workout-plans-builder.webp': 2990 / 1732, // ~1.726
  '/projects/omniactive/omniactive-workout-detail-builder.webp': 2992 / 1736, // ~1.724
  '/projects/omniactive/omniactive-exercise-video-library.webp': 2992 / 1726, // ~1.733
  '/projects/omniactive/omniactive-mobile-app-workout.webp': 2880 / 1562, // ~1.844
  '/projects/omniactive/omniactive-training-service-tiers.webp': 2878 / 1564, // ~1.840
  '/projects/omniactive/omniactive-brand-landing.webp': 2880 / 1562, // ~1.844
  '/projects/audiocardio/audiocardio-hero-landing.webp': 2880 / 1562, // ~1.844
  '/projects/audiocardio/audiocardio-science-assessment.webp': 2880 / 1558, // ~1.848
  '/projects/audiocardio/audiocardio-admin-users.webp': 2878 / 1560, // ~1.845
  '/projects/audiocardio/audiocardio-client-subscriptions.webp': 2880 / 1570, // ~1.834
  '/projects/audiocardio/audiocardio-payment-methods.webp': 2880 / 1560, // ~1.846
  '/projects/audiocardio/audiocardio-mobile-sound-therapy.webp': 540 / 1200, // 0.45 (portrait)
  '/projects/audiocardio/audiocardio-mobile-hearing-score.webp': 540 / 1200, // 0.45 (portrait)
  '/projects/audiocardio/audiocardio-mobile-music-integration.webp': 540 / 1200, // 0.45 (portrait)
  '/projects/audiocardio/audiocardio-mobile-settings.webp': 540 / 1200, // 0.45 (portrait)
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
    { x: 28, y: -10, rotate: 4.0, scale: 0.95, zIndex: 20, opacity: 0.85 },
    { x: -26, y: -18, rotate: -3.5, scale: 0.9, zIndex: 15, opacity: 0.65 },
    { x: 16, y: -24, rotate: 2.0, scale: 0.85, zIndex: 10, opacity: 0.45 },
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
  isAutoToss,
  onToggleAutoToss,
}: ScatteredCanvasProps) {
  const [activeIdx, setActiveIdx] = useState(0)
  const [transitionAction, setTransitionAction] = useState<TransitionAction | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)
  const [internalPlaying, setInternalPlaying] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalIdx, setModalIdx] = useState(0)
  const [mounted, setMounted] = useState(false)
  const [loadedAspects, setLoadedAspects] = useState<Record<string, number>>({})

  // Auto-toss is ON by default; can be toggled by user
  const isPlaying = isAutoToss !== undefined ? isAutoToss : internalPlaying
  const togglePlaying = onToggleAutoToss || (() => setInternalPlaying((prev) => !prev))

  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { amount: 0.2 })
  const wasDraggedRef = useRef(false)
  const animTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const total = images.length

  // Dedicated motion value for interactive drag rotation on the active card
  const cardRotate = useMotionValue(0)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Modal body-scroll lock and keyboard listeners
  useEffect(() => {
    if (!isModalOpen) return

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleModalKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsModalOpen(false)
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        setModalIdx((prev) => {
          const next = (prev + 1) % total
          setActiveIdx(next)
          return next
        })
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        setModalIdx((prev) => {
          const next = (prev - 1 + total) % total
          setActiveIdx(next)
          return next
        })
      }
    }

    window.addEventListener('keydown', handleModalKeyDown)
    return () => {
      document.body.style.overflow = originalOverflow
      window.removeEventListener('keydown', handleModalKeyDown)
    }
  }, [isModalOpen, total])

  const handleImageLoad = useCallback((src: string, e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget
    if (img.naturalWidth && img.naturalHeight) {
      const ratio = img.naturalWidth / img.naturalHeight
      setLoadedAspects((prev) => {
        if (prev[src] && Math.abs(prev[src] - ratio) < 0.01) return prev
        return { ...prev, [src]: ratio }
      })
    }
  }, [])

  const getImageAspect = useCallback((imgSrc: string) => {
    return loadedAspects[imgSrc] || KNOWN_ASPECT_RATIOS[imgSrc] || 16 / 10
  }, [loadedAspects])

  // Calculate card dimensions dynamically based on image aspect ratio
  const getCardSizeStyle = useCallback((aspect: number) => {
    // Mobile / Portrait screenshots (aspect < 1, e.g. ~0.45 or 0.67)
    if (aspect < 1) {
      return {
        aspectRatio: `${aspect}`,
        height: '78%',
        maxHeight: '82%',
        maxWidth: '85%',
        width: 'auto',
      }
    }

    // Square images (aspect === 1)
    if (Math.abs(aspect - 1) < 0.05) {
      return {
        aspectRatio: '1',
        width: '74%',
        height: 'auto',
        maxWidth: '78%',
        maxHeight: '78%',
      }
    }

    // Landscape images (e.g. 1.33 to 2.22)
    return {
      aspectRatio: `${aspect}`,
      width: '84%',
      height: 'auto',
      maxWidth: '86%',
      maxHeight: '80%',
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
      return 160
    }
    return 220
  }, [])

  // Seamless animation completion handler (avoids arbitrary timeout race conditions)
  const handleTransitionComplete = useCallback((cardIndex: number) => {
    if (transitionAction?.cardIndex === cardIndex) {
      if (animTimeoutRef.current) {
        clearTimeout(animTimeoutRef.current)
        animTimeoutRef.current = null
      }
      setTransitionAction(null)
      setIsAnimating(false)
    }
  }, [transitionAction])

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
      }, 620)
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
    }, 620)
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

  // Drag release on active card (swiping still tosses the card)
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
    }, 150)
  }

  // Clicking an image in the canvas opens it as a large image rather than tossing it behind
  const handleCardClick = (clickedIdx: number) => {
    if (wasDraggedRef.current) {
      wasDraggedRef.current = false
      return
    }

    if (total === 0) return

    setActiveIdx(clickedIdx)
    setModalIdx(clickedIdx)
    setIsModalOpen(true)
  }

  const handleModalNext = useCallback(() => {
    setModalIdx((prev) => {
      const next = (prev + 1) % total
      setActiveIdx(next)
      return next
    })
  }, [total])

  const handleModalPrev = useCallback(() => {
    setModalIdx((prev) => {
      const next = (prev - 1 + total) % total
      setActiveIdx(next)
      return next
    })
  }, [total])

  // Keyboard controls for canvas container when focused
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isModalOpen) return
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
  }, [advanceToNext, advanceToPrev, isModalOpen])

  // Slideshow auto-play timer (active only when in view, paused when modal is open or mid-toss)
  useEffect(() => {
    if (!isPlaying || !isInView || isAnimating || total <= 1 || isModalOpen) return
    const timer = setTimeout(() => {
      advanceToNext('right')
    }, 2800)
    return () => clearTimeout(timer)
  }, [isPlaying, isInView, isAnimating, total, advanceToNext, isModalOpen])

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      className="relative w-full select-none outline-none focus-visible:ring-1 focus-visible:ring-accent/40 rounded-3xl"
      aria-label="Interactive project images canvas carousel"
    >
      {/* Canvas Frame / Light-table container */}
      <div className="relative aspect-square w-full max-w-[440px] sm:max-w-[470px] lg:max-w-[480px] mx-auto min-h-[320px] sm:min-h-[380px] md:min-h-[420px] overflow-hidden rounded-2xl sm:rounded-3xl border border-white/10 bg-[#080808]/90 backdrop-blur-2xl shadow-2xl shadow-black/80 flex items-center justify-center p-4 sm:p-6">
        {/* Subtle grid background */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.07)_1px,transparent_1px)] [background-size:24px_24px] opacity-50 z-[1]" />

        {/* Ambient atmospheric glow */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 size-[260px] rounded-full bg-accent/10 blur-[80px] z-[1]" />

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
        */}
        {images.map((img, index) => {
          const order = (index - activeIdx + total) % total
          const isTransitioningCard = transitionAction?.cardIndex === index

          // Virtualization: only render visible cards (top 4 in stack) or the actively transitioning card
          if (order > 3 && !isTransitioningCard) {
            return null
          }

          const pose = getStackPose(order)
          const isCurrentActive = order === 0
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
              initial={false}
              drag={isDraggable}
              dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
              dragElastic={0.65}
              onDragStart={() => {
                wasDraggedRef.current = false
              }}
              onDrag={(_event, info) => {
                if (Math.abs(info.offset.x) > 6 || Math.abs(info.offset.y) > 6) {
                  wasDraggedRef.current = true
                }
                const r = Math.max(-16, Math.min(16, (info.offset.x / 220) * 16))
                cardRotate.set(r)
              }}
              onDragEnd={handleDragEnd}
              animate={animationTarget}
              transition={transitionConfig}
              onAnimationComplete={() => {
                if (isTransitioningCard) {
                  handleTransitionComplete(index)
                }
              }}
              onClick={() => handleCardClick(index)}
              style={{
                ...sizeStyle,
                ...(isDraggable ? { rotate: cardRotate } : {}),
              }}
              className={`group absolute select-none rounded-2xl overflow-hidden bg-zinc-950 will-change-transform cursor-pointer transition-shadow ${
                isCurrentActive
                  ? 'border border-white/20 hover:border-white/40 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.9)]'
                  : 'border border-white/10 hover:border-white/25 shadow-lg shadow-black/60'
              }`}
            >
              {/* Full edge-to-edge image matching card bounds */}
              <Image
                src={img}
                alt={`${projectTitle} preview ${index + 1}`}
                fill
                priority={isCurrentActive}
                sizes="(max-width: 768px) 70vw, 500px"
                className="object-contain pointer-events-none rounded-2xl"
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
                  <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 rounded-full bg-black/75 px-2.5 py-0.5 font-mono text-[10px] font-medium text-white/90 backdrop-blur-md border border-white/15">
                    <span className="size-1.5 rounded-full bg-accent animate-pulse" />
                    <span>
                      {String(index + 1).padStart(2, '0')} /{' '}
                      {String(total).padStart(2, '0')}
                    </span>
                  </div>

                  {/* Corner expand icon button */}
                  <div className="absolute top-2.5 right-2.5 flex size-6 sm:size-7 items-center justify-center rounded-full bg-black/75 text-white/80 backdrop-blur-md border border-white/15 transition group-hover:bg-accent group-hover:text-white group-hover:border-accent">
                    <Maximize2 className="size-3" />
                  </div>

                  {/* Bottom click-to-expand badge: Only show text on wider cards so it never obstructs narrow mobile screens */}
                  {aspect >= 1 && (
                    <div className="absolute bottom-2.5 right-2.5 flex items-center gap-1.5 rounded-full bg-black/75 px-2.5 py-0.5 font-mono text-[10px] text-white/80 backdrop-blur-md border border-white/15 transition-all group-hover:border-accent/50 group-hover:text-white">
                      <Maximize2 className="size-2.5 text-accent" />
                      <span>Click to expand</span>
                    </div>
                  )}

                  {aspect < 1 && (
                    <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 rounded-full bg-black/85 px-2 py-0.5 font-mono text-[9px] text-white/90 backdrop-blur-md border border-white/20 whitespace-nowrap">
                      <Maximize2 className="size-2 text-accent" />
                      <span>Expand</span>
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
        <div className="mt-3 flex items-center justify-between px-1">
          {/* Deck Count Indicator & Auto-play toggle (ON by default) */}
          <div className="flex items-center gap-2.5 font-mono text-xs text-white/40">
            <div className="flex items-center gap-1.5">
              <Layers className="size-3.5 text-accent" />
              <span>{total} shots</span>
            </div>
            <button
              type="button"
              onClick={togglePlaying}
              className={`flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-medium transition active:scale-95 ${
                isPlaying
                  ? 'border-accent/40 bg-accent/10 text-white shadow-sm shadow-accent/20'
                  : 'border-white/10 bg-white/[0.04] text-white/50 hover:border-white/30 hover:text-white'
              }`}
              title={isPlaying ? 'Pause auto-toss slideshow' : 'Resume auto-toss slideshow'}
            >
              {isPlaying ? (
                <>
                  <span className="relative flex size-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                    <span className="relative inline-flex size-1.5 rounded-full bg-accent" />
                  </span>
                  <Pause className="size-2.5 text-accent" />
                  <span>Auto-toss on</span>
                </>
              ) : (
                <>
                  <Play className="size-2.5" />
                  <span>Auto-toss off</span>
                </>
              )}
            </button>
          </div>

          {/* Interactive Navigation Controls */}
          <div className="flex items-center gap-2">
            {/* Step Dots */}
            <div className="mr-1.5 flex items-center gap-1">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelectCard(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    idx === activeIdx
                      ? 'w-5 bg-accent'
                      : 'w-1.5 bg-white/20 hover:bg-white/50'
                  }`}
                  aria-label={`Go to image ${idx + 1}`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={advanceToPrev}
              className="flex size-7 sm:size-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition-all hover:border-white/30 hover:bg-white/10 hover:text-white active:scale-95"
              aria-label="Previous image"
            >
              <ChevronLeft className="size-3.5 sm:size-4" />
            </button>
            <button
              type="button"
              onClick={() => advanceToNext('right')}
              className="flex size-7 sm:size-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition-all hover:border-white/30 hover:bg-white/10 hover:text-white active:scale-95"
              aria-label="Next image"
            >
              <ChevronRight className="size-3.5 sm:size-4" />
            </button>
          </div>
        </div>
      )}

      {/* Fullscreen Large Image Lightbox Modal */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {isModalOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-[100] flex flex-col justify-between bg-black/95 p-4 sm:p-6 md:p-8 backdrop-blur-2xl"
                onClick={() => setIsModalOpen(false)}
              >
                {/* Modal Top Bar */}
                <div
                  className="flex w-full items-center justify-between pb-2"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center gap-3">
                    <span className="rounded-full bg-accent/20 border border-accent/40 px-2.5 py-0.5 font-mono text-xs font-semibold text-accent">
                      {projectTitle}
                    </span>
                    <span className="font-mono text-xs text-white/50">
                      {String(modalIdx + 1).padStart(2, '0')} /{' '}
                      {String(total).padStart(2, '0')}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex size-9 sm:size-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white/80 transition hover:bg-white/20 hover:text-white hover:border-white/40 active:scale-95"
                    aria-label="Close fullscreen view"
                    title="Close (Esc)"
                  >
                    <X className="size-5" />
                  </button>
                </div>

                {/* Modal Main Stage */}
                <div
                  className="relative flex-1 w-full max-w-7xl mx-auto flex items-center justify-center my-2 sm:my-4 overflow-hidden"
                  onClick={() => setIsModalOpen(false)}
                >
                  {/* Prev Button */}
                  {total > 1 && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleModalPrev()
                      }}
                      className="absolute left-2 sm:left-4 z-20 flex size-10 sm:size-12 items-center justify-center rounded-full border border-white/20 bg-black/75 text-white/80 backdrop-blur-md transition hover:bg-black hover:text-white hover:scale-105 active:scale-95"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="size-6" />
                    </button>
                  )}

                  {/* Main Image Container */}
                  <div
                    className="relative max-h-[75vh] sm:max-h-[80vh] w-full h-full flex items-center justify-center"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={images[modalIdx]}
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.02 }}
                        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                        className="relative size-full flex items-center justify-center"
                      >
                        <Image
                          src={images[modalIdx]}
                          alt={`${projectTitle} full screenshot ${modalIdx + 1}`}
                          fill
                          priority
                          sizes="100vw"
                          className="object-contain"
                        />
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* Next Button */}
                  {total > 1 && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleModalNext()
                      }}
                      className="absolute right-2 sm:right-4 z-20 flex size-10 sm:size-12 items-center justify-center rounded-full border border-white/20 bg-black/75 text-white/80 backdrop-blur-md transition hover:bg-black hover:text-white hover:scale-105 active:scale-95"
                      aria-label="Next image"
                    >
                      <ChevronRight className="size-6" />
                    </button>
                  )}
                </div>

                {/* Modal Bottom Filmstrip */}
                {total > 1 && (
                  <div
                    className="flex w-full items-center justify-center overflow-x-auto py-2 scrollbar-none"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex items-center gap-2 max-w-full px-2">
                      {images.map((img, idx) => (
                        <button
                          key={`modal-thumb-${idx}`}
                          type="button"
                          onClick={() => {
                            setModalIdx(idx)
                            setActiveIdx(idx)
                          }}
                          className={`relative h-12 w-16 sm:h-14 sm:w-20 shrink-0 overflow-hidden rounded-lg border transition-all ${
                            idx === modalIdx
                              ? 'border-accent ring-2 ring-accent/40 scale-105'
                              : 'border-white/20 opacity-50 hover:opacity-100 hover:border-white/40'
                          }`}
                          aria-label={`Jump to image ${idx + 1}`}
                        >
                          <Image
                            src={img}
                            alt=""
                            fill
                            sizes="80px"
                            className="object-cover"
                          />
                          <span className="absolute bottom-0.5 right-1 rounded bg-black/80 px-1 font-mono text-[9px] text-white/80">
                            #{String(idx + 1).padStart(2, '0')}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </div>
  )
}
