import Link from "next/link"
import { Leaf, Mail, Instagram, Twitter, Facebook } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-white border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Leaf className="h-6 w-6 text-accent" />
              <span className="font-heading text-xl font-bold text-accent">AskNutritionist</span>
            </div>
            <p className="text-textLight mb-4 max-w-md">
              Your AI-powered platform for personalized health and nutrition guidance. Get science-backed insights to
              help you make informed decisions about your health.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-textLight hover:text-accent transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-textLight hover:text-accent transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-textLight hover:text-accent transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="mailto:contact@asknutritionist.com"
                className="text-textLight hover:text-accent transition-colors"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-heading text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-textLight hover:text-accent transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-textLight hover:text-accent transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/ask" className="text-textLight hover:text-accent transition-colors">
                  Ask AI
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-textLight hover:text-accent transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-textLight hover:text-accent transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-textLight hover:text-accent transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="#" className="text-textLight hover:text-accent transition-colors">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-12 pt-8 text-center text-textLight">
          <p>&copy; {new Date().getFullYear()} AskNutritionist. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
