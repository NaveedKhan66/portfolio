'use client'

import React, { useState, useRef } from 'react'

const DIALOGUES = [
  'catch me! 🏃',
  'follow me! 👀',
  'too fast! ⚡',
  'can’t catch! 💨',
  'keep up! 👟',
  'speed run! 🔥',
  'gotta blast! 🚀',
  'almost there! 🏁',
  'zoom zoom! 🏎️',
  'don’t blink! ✨',
  'watch out! 💥',
  'bye bye! 👋',
  'too slow! 🐢',
  'late again! ☕',
  'see ya! ✌️',
  'whoosh! 💨',
  'catch up! 👟',
]

export default function RunningTrack() {
  const [isSprinting, setIsSprinting] = useState(false)
  const [isDialogueOpen, setIsDialogueOpen] = useState(false)
  const [dialogueIndex, setDialogueIndex] = useState(0)
  const openTimeRef = useRef<number>(0)

  const triggerDialogue = () => {
    setIsDialogueOpen(true)
    openTimeRef.current = Date.now()
    setDialogueIndex((prev) => (prev + 1) % DIALOGUES.length)
  }

  const handleMouseEnter = () => {
    triggerDialogue()
  }

  const handleClick = () => {
    setIsSprinting(true)
    triggerDialogue()
    setTimeout(() => setIsSprinting(false), 2400)
  }

  const handleAnimationIteration = () => {
    // When the runner reaches the finish line and wraps around,
    // close the dialogue if it has been visible for at least 1.8s
    if (Date.now() - openTimeRef.current > 1800) {
      setIsDialogueOpen(false)
    }
  }

  return (
    <div className="group/track relative mt-5 w-full select-none pt-2">
      {/* Track baseline floor */}
      <div className="relative h-11 w-full">
        {/* Subtle ground dashed line matching the text container width */}
        <div className="absolute bottom-0 inset-x-0 h-px border-b border-dashed border-white/20" />

        {/* Milestone Finish Line Flag at the exact right end of the text */}
        <div
          className="absolute -bottom-px right-0 flex flex-col items-center pointer-events-none"
          title="Finish Line"
        >
          {/* Flag pennant */}
          <div className="relative flex items-center">
            <svg
              width="15"
              height="20"
              viewBox="0 0 15 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="drop-shadow-[0_0_8px_rgba(222,94,145,0.7)]"
            >
              {/* Flagpole */}
              <line
                x1="2"
                y1="1"
                x2="2"
                y2="20"
                stroke="rgba(255,255,255,0.5)"
                strokeWidth="1.75"
                strokeLinecap="round"
              />
              {/* Flag Pennant */}
              <path
                d="M 2 2 L 13 6 L 2 10 Z"
                fill="#de5e91"
              />
            </svg>
          </div>
          {/* Base plate */}
          <div className="h-0.5 w-2.5 rounded-full bg-accent/80" />
        </div>

        {/* Running Person Container */}
        <div
          onMouseEnter={handleMouseEnter}
          onTouchStart={handleMouseEnter}
          onClick={handleClick}
          onAnimationIteration={handleAnimationIteration}
          className={`runner-traveller absolute -bottom-px cursor-pointer ${
            isSprinting ? 'runner-sprint' : ''
          }`}
          title="Hover to hear me talk • Click for speed boost!"
        >
          {/* Playful thought dialogue bubble — stays open until finish line */}
          <div
            className={`pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-accent/50 bg-[#121216]/95 px-3 py-1 font-mono text-[11px] font-bold text-accent shadow-[0_0_16px_rgba(222,94,145,0.45)] backdrop-blur-md transition-all duration-300 ${
              isDialogueOpen
                ? 'translate-y-0 scale-100 opacity-100'
                : 'translate-y-2 scale-90 opacity-0'
            }`}
          >
            {DIALOGUES[dialogueIndex]}
            {/* Dialogue pointer tail pointing down to runner's head */}
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 size-2 rotate-45 border-b border-r border-accent/50 bg-[#121216]" />
          </div>

          {/* The Runner Character */}
          <div className="runner-figure relative h-[34px] w-[30px] rotate-[13deg]">
            {/* Speed / Dust particles trailing behind */}
            <div className="runner-dust" />

            {/* Bobbing Torso & Head */}
            <div className="runner-bob relative size-full">
              {/* Back Arm (dimmer for 3D depth) */}
              <div className="runner-arm-back">
                <div className="runner-forearm-back" />
              </div>

              {/* Back Leg (dimmer for 3D depth) */}
              <div className="runner-leg-back">
                <div className="runner-shin-back" />
              </div>

              {/* Central Torso Spine */}
              <div className="runner-torso" />

              {/* Head with cute cap */}
              <div className="runner-head">
                <div className="runner-cap" />
              </div>

              {/* Front Leg */}
              <div className="runner-leg-front">
                <div className="runner-shin-front" />
              </div>

              {/* Front Arm */}
              <div className="runner-arm-front">
                <div className="runner-forearm-front" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Embedded High-Performance CSS Keyframes */}
      <style jsx>{`
        /* Traverse across track */
        .runner-traveller {
          animation: runAcross 6.5s cubic-bezier(0.35, 0, 0.25, 1) infinite;
        }

        .runner-sprint {
          animation-duration: 2.6s !important;
        }

        @keyframes runAcross {
          0% {
            left: -4px;
            opacity: 0;
            transform: translateY(0) scale(1);
          }
          4% {
            opacity: 1;
          }
          85% {
            left: calc(100% - 28px);
            opacity: 1;
            transform: translateY(0) scale(1);
          }
          /* Little victory leap upon hitting the finish flag */
          90% {
            left: calc(100% - 28px);
            opacity: 1;
            transform: translateY(-8px) scale(1.12);
          }
          95% {
            left: calc(100% - 28px);
            opacity: 1;
            transform: translateY(0px) scale(0.95);
          }
          99% {
            left: calc(100% - 28px);
            opacity: 0;
            transform: translateY(0) scale(1);
          }
          100% {
            left: -4px;
            opacity: 0;
            transform: translateY(0) scale(1);
          }
        }

        /* Body oscillation (bob up on push-off, down on foot strike) */
        .runner-bob {
          animation: runnerBob 0.38s ease-in-out infinite;
        }
        .runner-sprint .runner-bob {
          animation-duration: 0.22s;
        }

        @keyframes runnerBob {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-4px);
          }
        }

        /* Torso */
        .runner-torso {
          position: absolute;
          top: 9px;
          left: 14px;
          width: 2.5px;
          height: 12px;
          background: #ffffff;
          border-radius: 9999px;
        }

        /* Head */
        .runner-head {
          position: absolute;
          top: 0px;
          left: 12px;
          width: 9.5px;
          height: 9.5px;
          background: #de5e91;
          border-radius: 50%;
          box-shadow: 0 0 8px rgba(222, 94, 145, 0.5);
        }

        /* Cap visor pointing forward */
        .runner-cap {
          position: absolute;
          top: 1px;
          right: -3px;
          width: 5px;
          height: 2.5px;
          background: #ffffff;
          border-radius: 0 2px 2px 0;
        }

        /* Front Arm */
        .runner-arm-front {
          position: absolute;
          top: 9px;
          left: 15px;
          width: 2.2px;
          height: 7px;
          background: #ffffff;
          border-radius: 9999px;
          transform-origin: top center;
          animation: armCycleFront 0.38s ease-in-out infinite;
        }
        .runner-forearm-front {
          position: absolute;
          top: 6px;
          left: 0;
          width: 2.2px;
          height: 6.5px;
          background: #ffffff;
          border-radius: 9999px;
          transform-origin: top center;
          transform: rotate(65deg);
        }

        /* Back Arm */
        .runner-arm-back {
          position: absolute;
          top: 9px;
          left: 13px;
          width: 2px;
          height: 7px;
          background: rgba(255, 255, 255, 0.45);
          border-radius: 9999px;
          transform-origin: top center;
          animation: armCycleBack 0.38s ease-in-out infinite;
        }
        .runner-forearm-back {
          position: absolute;
          top: 6px;
          left: 0;
          width: 2px;
          height: 6.5px;
          background: rgba(255, 255, 255, 0.45);
          border-radius: 9999px;
          transform-origin: top center;
          transform: rotate(65deg);
        }

        @keyframes armCycleFront {
          0%, 100% {
            transform: rotate(45deg);
          }
          50% {
            transform: rotate(-45deg);
          }
        }
        @keyframes armCycleBack {
          0%, 100% {
            transform: rotate(-45deg);
          }
          50% {
            transform: rotate(45deg);
          }
        }

        /* Front Leg */
        .runner-leg-front {
          position: absolute;
          top: 19px;
          left: 15px;
          width: 2.2px;
          height: 8px;
          background: #ffffff;
          border-radius: 9999px;
          transform-origin: top center;
          animation: legCycleFront 0.38s ease-in-out infinite;
        }
        .runner-shin-front {
          position: absolute;
          top: 7px;
          left: 0;
          width: 2.2px;
          height: 7.5px;
          background: #ffffff;
          border-radius: 9999px;
          transform-origin: top center;
          animation: shinCycleFront 0.38s ease-in-out infinite;
        }

        /* Back Leg */
        .runner-leg-back {
          position: absolute;
          top: 19px;
          left: 13px;
          width: 2px;
          height: 8px;
          background: rgba(255, 255, 255, 0.45);
          border-radius: 9999px;
          transform-origin: top center;
          animation: legCycleBack 0.38s ease-in-out infinite;
        }
        .runner-shin-back {
          position: absolute;
          top: 7px;
          left: 0;
          width: 2px;
          height: 7.5px;
          background: rgba(255, 255, 255, 0.45);
          border-radius: 9999px;
          transform-origin: top center;
          animation: shinCycleBack 0.38s ease-in-out infinite;
        }

        @keyframes legCycleFront {
          0%, 100% {
            transform: rotate(-42deg);
          }
          50% {
            transform: rotate(36deg);
          }
        }
        @keyframes shinCycleFront {
          0%, 100% {
            transform: rotate(20deg);
          }
          50% {
            transform: rotate(70deg);
          }
        }

        @keyframes legCycleBack {
          0%, 100% {
            transform: rotate(36deg);
          }
          50% {
            transform: rotate(-42deg);
          }
        }
        @keyframes shinCycleBack {
          0%, 100% {
            transform: rotate(70deg);
          }
          50% {
            transform: rotate(20deg);
          }
        }

        /* Sprint speed overrides for limbs */
        .runner-sprint .runner-arm-front,
        .runner-sprint .runner-arm-back,
        .runner-sprint .runner-leg-front,
        .runner-sprint .runner-shin-front,
        .runner-sprint .runner-leg-back,
        .runner-sprint .runner-shin-back {
          animation-duration: 0.22s;
        }

        /* Speed Dust */
        .runner-dust {
          position: absolute;
          bottom: 2px;
          left: 5px;
          width: 4px;
          height: 4px;
          background: rgba(222, 94, 145, 0.65);
          border-radius: 50%;
          animation: dustPuff 0.38s ease-out infinite;
        }
        .runner-sprint .runner-dust {
          animation-duration: 0.22s;
        }

        @keyframes dustPuff {
          0% {
            transform: scale(1) translate(0, 0);
            opacity: 0.8;
          }
          100% {
            transform: scale(0.2) translate(-14px, -5px);
            opacity: 0;
          }
        }

        /* Accessibility: reduce motion */
        @media (prefers-reduced-motion: reduce) {
          .runner-traveller,
          .runner-bob,
          .runner-arm-front,
          .runner-arm-back,
          .runner-leg-front,
          .runner-shin-front,
          .runner-leg-back,
          .runner-shin-back,
          .runner-dust {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  )
}
