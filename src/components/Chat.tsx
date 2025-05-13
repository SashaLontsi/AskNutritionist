"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { PaperPlaneIcon, StopIcon } from "@radix-ui/react-icons"
import { motion } from "framer-motion"
import { AnimatedGradientBorder } from "@/components/ui/animated-gradient-border"

type Message = {
  id: string
  role: "user" | "assistant"
  content: string
}

export default function Chat({ onFirstInteraction }: { onFirstInteraction?: () => void }) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const bottomRef = useRef<HTMLDivElement | null>(null)
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSubmit = (e: React.FormEvent | React.KeyboardEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    if (onFirstInteraction) {
      onFirstInteraction()
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
    }
    setIsLoading(true)
    setIsTyping(true)

    // Generate a response based on the input
    const fullReply = generateResponse(input)
    const replyId = (Date.now() + 1).toString()

    // Add empty message first to show typing indicator
    setMessages((prev) => [...prev, { id: replyId, role: "assistant", content: "" }])

    // Simulate typing with a delay
    setTimeout(() => {
      let i = 0
      intervalRef.current = setInterval(() => {
        setMessages((prev) =>
          prev.map((msg) => (msg.id === replyId ? { ...msg, content: fullReply.slice(0, i + 1) } : msg)),
        )
        i++
        if (i === fullReply.length) {
          clearInterval(intervalRef.current!)
          intervalRef.current = null
          setIsLoading(false)
          setIsTyping(false)
        }
      }, 8)
    }, 500)
  }

  const handleStop = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
      setIsLoading(false)
      setIsTyping(false)
    }
  }

  // Function to generate responses based on input
  const generateResponse = (userInput: string): string => {
    const input = userInput.toLowerCase()

    if (input.includes("hello") || input.includes("hi") || input.includes("hey")) {
      return "Hello! I'm your nutrition assistant. How can I help you today?"
    }

    if (input.includes("protein") || input.includes("proteins")) {
      return "Good sources of protein include lean meats, fish, eggs, dairy, legumes, nuts, and seeds. Plant-based options like tofu, tempeh, and seitan are excellent for vegetarians and vegans. For optimal health, aim to include a variety of protein sources in your diet."
    }

    if (input.includes("weight loss") || input.includes("lose weight")) {
      return "Sustainable weight loss typically involves a balanced diet with a moderate calorie deficit, regular physical activity, adequate sleep, and stress management. Focus on whole foods, plenty of vegetables, lean proteins, and staying hydrated. Remember that healthy weight loss is usually gradual, around 1-2 pounds per week."
    }

    if (input.includes("vitamin") || input.includes("mineral")) {
      return "Vitamins and minerals are essential micronutrients. A varied diet with plenty of fruits, vegetables, whole grains, and proteins usually provides adequate amounts. Specific deficiencies may require targeted foods or supplements. If you're concerned about a specific vitamin or mineral, please ask and I can provide more detailed information."
    }

    if (input.includes("meal plan") || input.includes("diet plan")) {
      return "A balanced meal plan typically includes a variety of foods from all food groups: fruits, vegetables, whole grains, lean proteins, and healthy fats. Portion control is also important. Would you like me to suggest a sample meal plan based on specific dietary preferences or goals?"
    }

    return (
      "Thank you for your question about " +
      userInput +
      ". To provide you with the most accurate nutrition advice, I'd need a bit more information. Could you please elaborate on your specific concerns or goals? I'm here to help with personalized nutrition guidance."
    )
  }

  return (
    <div className="flex flex-col h-full max-w-5xl mx-auto w-full relative">
      {/* Chat scrollable area */}
      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-44 space-y-6">
        {messages.map((message) => (
          <div key={message.id} className="flex w-full justify-center">
            <div
              className={`w-full max-w-3xl flex ${
                message.role === "user" ? "justify-end" : "justify-start"
              } items-start gap-3`}
            >
              {message.role === "assistant" && (
                <div className="relative flex-shrink-0 mt-1">
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full blur-sm opacity-70"></div>
                  <div className="relative bg-white dark:bg-gray-800 rounded-full p-1.5 shadow-md">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6 text-accent"
                    >
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                  </div>
                </div>
              )}
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.3 }}
                className={`inline-block text-sm break-words max-w-[80%] ${
                  message.role === "user"
                    ? "px-5 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-2xl rounded-tr-none shadow-md"
                    : "px-5 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-2xl rounded-tl-none shadow-md border border-gray-100 dark:border-gray-700"
                }`}
              >
                {message.content}
                {message.role === "assistant" && message.content === "" && (
                  <div className="flex space-x-1 h-6 items-center">
                    <div
                      className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-600 animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    ></div>
                    <div
                      className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-600 animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    ></div>
                    <div
                      className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-600 animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    ></div>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Chat input fixed at bottom */}
      <div className="fixed bottom-0 left-0 w-full bg-gradient-to-t from-lightGreen dark:from-gray-950 via-lightGreen dark:via-gray-950 to-transparent z-10 pt-6">
        <div className="max-w-4xl mx-auto px-4 pb-6">
          <AnimatedGradientBorder containerClassName="w-full" gradientClassName="opacity-50 group-hover:opacity-100">
            <motion.form
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              onSubmit={handleSubmit}
              className="flex items-end gap-2 p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl w-full group"
            >
              <textarea
                ref={textareaRef}
                className="flex-1 resize-none border-none bg-transparent outline-none text-base text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 max-h-48 min-h-[72px] leading-relaxed py-2 overflow-y-auto"
                value={input}
                placeholder="Ask about nutrition, diet plans, or health advice..."
                onChange={(e) => {
                  setInput(e.target.value)
                  if (textareaRef.current) {
                    textareaRef.current.style.height = "auto"
                    textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault()
                    handleSubmit(e)
                  }
                }}
                rows={1}
                disabled={isLoading}
              />
              <motion.button
                type="button"
                onClick={isLoading ? handleStop : handleSubmit}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`relative p-3 rounded-full ${
                  isLoading
                    ? "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-600"
                    : "bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:from-emerald-600 hover:to-teal-700"
                } transition-colors duration-300 shadow-md`}
                disabled={!input.trim() && !isLoading}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full blur-sm opacity-70"></div>
                <div className="relative">
                  {isLoading ? <StopIcon className="h-5 w-5" /> : <PaperPlaneIcon className="h-5 w-5" />}
                </div>
              </motion.button>
            </motion.form>
          </AnimatedGradientBorder>
        </div>
      </div>
    </div>
  )
}
