"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export function CursorHighlight() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
      setIsVisible(true)
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    window.addEventListener("mousemove", updateMousePosition)
    document.documentElement.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      window.removeEventListener("mousemove", updateMousePosition)
      document.documentElement.addEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  return (
    <motion.div
      className="fixed top-0 left-0 w-[300px] h-[300px] pointer-events-none z-0 hidden md:block"
      animate={{
        x: mousePosition.x - 150,
        y: mousePosition.y - 150,
        opacity: isVisible ? 1 : 0,
      }}
      transition={{ type: "spring", damping: 30, stiffness: 200 }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 dark:from-emerald-500/5 dark:to-teal-500/5 rounded-full blur-3xl"></div>
    </motion.div>
  )
}
