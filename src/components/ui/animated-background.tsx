"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

export function AnimatedBackground() {
  const containerRef = useRef<HTMLDivElement>(null)
  const mousePosition = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      mousePosition.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div ref={containerRef} className="fixed inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-50/80 via-teal-50/50 to-white dark:from-emerald-950/30 dark:via-teal-950/20 dark:to-gray-950"></div>

      {/* Animated blobs */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-gradient-to-r from-emerald-300/10 to-teal-300/10 dark:from-emerald-500/5 dark:to-teal-500/5 blur-3xl"
          style={{
            width: `${Math.random() * 30 + 20}%`,
            height: `${Math.random() * 30 + 20}%`,
            left: `${Math.random() * 80}%`,
            top: `${Math.random() * 80}%`,
          }}
          animate={{
            x: [0, Math.random() * 40 - 20, 0],
            y: [0, Math.random() * 40 - 20, 0],
            scale: [1, Math.random() * 0.2 + 1.1, 1],
          }}
          transition={{
            duration: Math.random() * 10 + 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Floating particles */}
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute rounded-full bg-emerald-400/20 dark:bg-emerald-400/10"
          style={{
            width: Math.random() * 8 + 3,
            height: Math.random() * 8 + 3,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: Math.random() * 5 + 5,
            repeat: Number.POSITIVE_INFINITY,
            delay: Math.random() * 5,
          }}
        />
      ))}

      {/* Animated grid pattern */}
      <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03]">
        <div className="h-full w-full bg-[linear-gradient(to_right,#10b98133_1px,transparent_1px),linear-gradient(to_bottom,#10b98133_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
      </div>
    </div>
  )
}
