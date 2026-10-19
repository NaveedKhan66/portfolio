'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'

interface ResumeDownloadBadgeProps {
  className?: string
}

export default function ResumeDownloadBadge({ className = '' }: ResumeDownloadBadgeProps) {
  // SVG Circle Geometry (viewBox: 0 0 200 200)
  // Radius R = 74 => Circumference C = 2 * PI * 74 ≈ 464.96
  const radius = 74
  const circumference = 2 * Math.PI * radius

  return (
    <a
      href="/resume.pdf"
      download="resume.pdf"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Download Naveed's Resume (PDF)"
      className={`group relative inline-flex items-center justify-center ${className}`}
    >
      {/* Outer ambient pink glow on hover */}
      <div className="absolute -inset-4 rounded-full bg-accent/20 blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 -z-10 pointer-events-none" />

      {/* Rotating Circular Text Ring (Responsive Scaling) */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          duration: 16,
          ease: 'linear',
        }}
        className="size-[150px] sm:size-[170px] md:size-[190px] lg:size-[210px] xl:size-[225px] pointer-events-none select-none transition-all duration-300"
      >
        <svg
          viewBox="0 0 200 200"
          className="size-full overflow-visible"
        >
          <defs>
            {/* Seamless 360-degree clockwise circular path */}
            <path
              id="resume-circle-path-v4"
              d={`M 100, 100 m -${radius}, 0 a ${radius},${radius} 0 1,1 ${radius * 2},0 a ${radius},${radius} 0 1,1 -${radius * 2},0`}
              fill="none"
            />
          </defs>

          {/* Seamless full 360 text completely surrounding the icon (no weird circles) */}
          <text className="font-mono text-[9.5px] sm:text-[10px] font-semibold uppercase tracking-[0.16em] fill-white/60 transition-colors duration-300 group-hover:fill-white">
            <textPath
              href="#resume-circle-path-v4"
              startOffset="0%"
              textLength={circumference}
              lengthAdjust="spacing"
            >
              <tspan fill="#de5e91" className="text-[11px]">✦</tspan> DOWNLOAD RESUME <tspan fill="#de5e91" className="text-[11px]">✦</tspan> DOWNLOAD RESUME <tspan fill="#de5e91" className="text-[11px]">✦</tspan> DOWNLOAD RESUME&#160;
            </textPath>
          </text>
        </svg>
      </motion.div>

      {/* Center Minimal Download Icon (No harsh borders or weird circles, bigger animated arrow) */}
      <div className="absolute inset-0 m-auto size-[80px] sm:size-[90px] md:size-[100px] lg:size-[110px] xl:size-[120px] rounded-full transition-transform duration-300 group-hover:scale-110 flex items-center justify-center">
        {/* Minimal Animated Download Icon */}
        <div className="relative flex flex-col items-center justify-center">
          {/* Animated Downward Arrow Track: constantly appears from top to bottom */}
          <div className="relative h-10 w-8 sm:h-12 sm:w-10 md:h-14 md:w-12 overflow-hidden flex items-center justify-center">
            <motion.div
              animate={{
                y: [-32, 0, 0, 32],
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut',
                times: [0, 0.35, 0.65, 1],
              }}
              className="flex items-center justify-center text-white/90 group-hover:text-accent transition-colors duration-300"
            >
              <ArrowDown
                className="size-7 sm:size-8 md:size-9"
                strokeWidth={2.4}
              />
            </motion.div>
          </div>

          {/* Minimal Bottom Receiver Tray Bar */}
          <div className="mt-1 h-[2.5px] sm:h-[3px] w-7 sm:w-8 md:w-10 rounded-full bg-white/40 transition-all duration-300 group-hover:w-12 group-hover:bg-accent group-hover:shadow-[0_0_12px_rgba(222,94,145,0.9)]" />
        </div>
      </div>
    </a>
  )
}
