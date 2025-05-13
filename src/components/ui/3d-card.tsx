"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface Card3DProps {
  children: React.ReactNode
  className?: string
  containerClassName?: string
  glareEnabled?: boolean
  rotationIntensity?: number
  hoverScale?: number
}

export function Card3D({
  children,
  className,
  containerClassName,
  glareEnabled = true,
  rotationIntensity = 10,
  hoverScale = 1.05,
}: Card3DProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const posX = (e.clientX - centerX) / (rect.width / 2)
    const posY = (e.clientY - centerY) / (rect.height / 2)

    setMousePosition({ x: posX, y: posY })
  }

  // Reset rotation when mouse leaves
  useEffect(() => {
    if (!isHovered) {
      setMousePosition({ x: 0, y: 0 })
    }
  }, [isHovered])

  return (
    <div
      className={cn("perspective-[1000px]", containerClassName)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      ref={cardRef}
    >
      <motion.div
        className={cn("relative w-full h-full", className)}
        animate={{
          rotateX: isHovered ? -mousePosition.y * rotationIntensity : 0,
          rotateY: isHovered ? mousePosition.x * rotationIntensity : 0,
          scale: isHovered ? hoverScale : 1,
          z: isHovered ? 50 : 0,
        }}
        transition={{
          type: "spring",
          damping: 15,
          stiffness: 200,
        }}
      >
        {children}

        {/* Glare effect */}
        {glareEnabled && (
          <div
            className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none"
            style={{
              opacity: isHovered ? 0.15 : 0,
              background: `radial-gradient(circle at ${50 + mousePosition.x * 50}% ${
                50 + mousePosition.y * 50
              }%, rgba(255, 255, 255, 0.8), transparent)`,
              transition: "opacity 0.3s ease",
            }}
          />
        )}
      </motion.div>
    </div>
  )
}
