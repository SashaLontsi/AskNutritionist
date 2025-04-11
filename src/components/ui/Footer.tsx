//Social media links need to be added
import Link from "next/link";
import { Facebook, Instagram, X, Globe } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-lightGreen border-t border-[#cbd5e1] py-6 mt-12">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between text-sm text-gray-600">
        <p className="text-center md:text-left">
          © {new Date().getFullYear()} HealthAcademy. All rights reserved.
        </p>
        <div className="flex gap-4 mt-4 md:mt-0">
          <Link href="https://facebook.com" target="_blank" aria-label="Facebook">
            <Facebook className="w-5 h-5 hover:text-accent transition" />
          </Link>
          <Link href="https://www.healthacademy.ca/" target="_blank" aria-label="Website">
            <Globe className="w-5 h-5 hover:text-accent transition" />
          </Link>
          <Link href="https://instagram.com" target="_blank" aria-label="Instagram">
            <Instagram className="w-5 h-5 hover:text-accent transition" />
          </Link>
          <Link href="https://x.com" target="_blank" aria-label="X (Twitter)">
            <X className="w-5 h-5 hover:text-accent transition" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
