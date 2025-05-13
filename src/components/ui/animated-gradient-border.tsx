"use client"

import type React from "react"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface AnimatedGradientBorderProps {
  children: React.ReactNode
  className?: string
  containerClassName?: string
  gradientClassName?: string
  duration?: number
}

export function AnimatedGradientBorder({
  children,
  className,
  containerClassName,
  gradientClassName,
  duration = 8,
}: AnimatedGradientBorderProps) {
  return (
    <div className={cn("relative rounded-xl p-[1px] overflow-hidden group", containerClassName)}>
      <motion.div
        className={cn(
          "absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-500 opacity-70 group-hover:opacity-100 transition-opacity",
          gradientClassName,
        )}
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          duration,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
        style={{
          backgroundSize: "200% 200%",
        }}
      />
      <div className={cn("relative rounded-[calc(0.75rem-1px)] bg-white dark:bg-gray-900 p-4 h-full", className)}>
        {children}
      </div>
    </div>
  )
}
