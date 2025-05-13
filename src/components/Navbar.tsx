"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X, Leaf } from "lucide-react"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Leaf className="h-8 w-8 text-accent" />
              <span className="font-heading text-xl font-bold text-accent">AskNutritionist</span>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-textMain hover:text-accent font-medium transition-colors">
              Home
            </Link>
            <Link href="/about" className="text-textMain hover:text-accent font-medium transition-colors">
              About
            </Link>
            <Link href="/ask" className="text-textMain hover:text-accent font-medium transition-colors">
              Ask AI
            </Link>
            <Link href="/contact" className="text-textMain hover:text-accent font-medium transition-colors">
              Contact
            </Link>
            <Link href="/ask" className="btn-primary py-2">
              Get Started
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-textMain hover:text-accent focus:outline-none"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="/"
              className="block px-3 py-2 rounded-md text-base font-medium text-textMain hover:text-accent hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/about"
              className="block px-3 py-2 rounded-md text-base font-medium text-textMain hover:text-accent hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/ask"
              className="block px-3 py-2 rounded-md text-base font-medium text-textMain hover:text-accent hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Ask AI
            </Link>
            <Link
              href="/contact"
              className="block px-3 py-2 rounded-md text-base font-medium text-textMain hover:text-accent hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <Link
              href="/ask"
              className="block px-3 py-2 rounded-md text-base font-medium bg-accent text-white hover:bg-accent/90 text-center mt-4"
              onClick={() => setIsMenuOpen(false)}
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
