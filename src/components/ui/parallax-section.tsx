"use client"

import type React from "react"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { cn } from "@/lib/utils"

interface ParallaxSectionProps {
  children: React.ReactNode
  className?: string
  speed?: number
  direction?: "up" | "down" | "left" | "right"
  offset?: number
}

export function ParallaxSection({
  children,
  className,
  speed = 0.5,
  direction = "up",
  offset = 300,
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  // Calculate transform based on direction
  const transformUp = useTransform(scrollYProgress, [0, 1], [offset, -offset])
  const transformDown = useTransform(scrollYProgress, [0, 1], [-offset, offset])
  const transformLeft = useTransform(scrollYProgress, [0, 1], [offset, -offset])
  const transformRight = useTransform(scrollYProgress, [0, 1], [-offset, offset])

  const getTransform = () => {
    switch (direction) {
      case "up":
        return transformUp
      case "down":
        return transformDown
      case "left":
        return transformLeft
      case "right":
        return transformRight
      default:
        return transformUp
    }
  }

  const transform = getTransform()
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <motion.div
        style={{
          [direction === "left" || direction === "right" ? "x" : "y"]: transform,
          opacity,
        }}
      >
        {children}
      </motion.div>
    </div>
  )
}
