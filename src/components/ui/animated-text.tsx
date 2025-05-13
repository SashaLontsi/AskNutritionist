"use client"

import { useEffect, useState } from "react"
import { motion, useAnimation, type Variants } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { cn } from "@/lib/utils"

interface AnimatedTextProps {
  text: string
  className?: string
  once?: boolean
  repeatDelay?: number
  animation?: "wave" | "bounce" | "pulse" | "gradient" | "typing"
}

export function AnimatedText({ text, className, once = true, repeatDelay = 0, animation = "wave" }: AnimatedTextProps) {
  const controls = useAnimation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once })
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
      if (!once && repeatDelay > 0) {
        const interval = setInterval(() => {
          controls.start("hidden")
          setTimeout(() => {
            controls.start("visible")
          }, 500)
        }, repeatDelay)
        return () => clearInterval(interval)
      }
    }
  }, [isInView, controls, once, repeatDelay])

  if (!isMounted) return <span className={className}>{text}</span>

  const getAnimationVariants = (): Variants => {
    switch (animation) {
      case "wave":
        return {
          hidden: {},
          visible: {},
        }
      case "bounce":
        return {
          hidden: {},
          visible: {},
        }
      case "pulse":
        return {
          hidden: { opacity: 0.5, scale: 0.95 },
          visible: {
            opacity: 1,
            scale: 1,
            transition: {
              duration: 0.5,
            },
          },
        }
      case "gradient":
        return {
          hidden: { backgroundPosition: "0% 50%" },
          visible: {
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            transition: {
              duration: 5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            },
          },
        }
      case "typing":
        return {
          hidden: { width: 0 },
          visible: {
            width: "100%",
            transition: {
              duration: 1.5,
              ease: "easeInOut",
            },
          },
        }
      default:
        return {
          hidden: {},
          visible: {},
        }
    }
  }

  const getCharacterVariants = (): Variants => {
    switch (animation) {
      case "wave":
        return {
          hidden: { y: 0, opacity: 0 },
          visible: (i: number) => ({
            y: 0,
            opacity: 1,
            transition: {
              delay: i * 0.05,
              y: { type: "spring", stiffness: 100 },
            },
          }),
        }
      case "bounce":
        return {
          hidden: { y: 0, opacity: 0 },
          visible: (i: number) => ({
            y: [0, -15, 0],
            opacity: 1,
            transition: {
              delay: i * 0.05,
              y: { type: "spring", stiffness: 100 },
            },
          }),
        }
      default:
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
        }
    }
  }

  const renderText = () => {
    if (animation === "gradient") {
      return (
        <motion.span
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={getAnimationVariants()}
          className={cn(
            "bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-600 bg-clip-text text-transparent bg-[size:200%_auto]",
            className,
          )}
        >
          {text}
        </motion.span>
      )
    }

    if (animation === "typing") {
      return (
        <div className="inline-block overflow-hidden">
          <motion.span
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={getAnimationVariants()}
            className={cn("inline-block whitespace-nowrap", className)}
          >
            {text}
          </motion.span>
        </div>
      )
    }

    if (animation === "pulse") {
      return (
        <motion.span
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={getAnimationVariants()}
          className={className}
        >
          {text}
        </motion.span>
      )
    }

    return (
      <span className={cn("inline-block", className)}>
        {text.split("").map((char, index) => (
          <motion.span
            key={`${char}-${index}`}
            ref={index === 0 ? ref : null}
            custom={index}
            initial="hidden"
            animate={controls}
            variants={getCharacterVariants()}
            className="inline-block"
            style={{ display: char === " " ? "inline" : "inline-block" }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </span>
    )
  }

  return renderText()
}
