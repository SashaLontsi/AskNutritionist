'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

const tabs = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
  { name: 'Chat', href: '/chat' },
];

export default function Header() {
  const pathname = usePathname();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [hoverStyle, setHoverStyle] = useState({});
  const [activeStyle, setActiveStyle] = useState({ left: '0px', width: '0px' });
  const tabRefs = useRef<(HTMLDivElement | null)[]>([]);

  const activeIndex = tabs.findIndex((tab) => tab.href === pathname);

  useEffect(() => {
    if (hoveredIndex !== null && tabRefs.current[hoveredIndex]) {
      const el = tabRefs.current[hoveredIndex]!;
      setHoverStyle({ left: `${el.offsetLeft}px`, width: `${el.offsetWidth}px` });
    }
  }, [hoveredIndex]);

  useEffect(() => {
    const el = tabRefs.current[activeIndex];
    if (el) {
      setActiveStyle({ left: `${el.offsetLeft}px`, width: `${el.offsetWidth}px` });
    }
  }, [activeIndex]);

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur shadow-md w-full">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between relative">
        {/* Logo with full refresh */}
        <a href="/" className="text-xl font-bold text-accent">
          AskNutritionist
        </a>

        {/* Tab Navigation */}
        <nav className="relative">
          {/* Hover highlight */}
          <div
            className="absolute h-[30px] transition-all duration-300 ease-out bg-[#0e0f1114] rounded-md"
            style={{
              ...hoverStyle,
              opacity: hoveredIndex !== null ? 1 : 0,
            }}
          />

          {/* Active underline */}
          <div
            className="absolute bottom-[-6px] h-[2px] bg-accent transition-all duration-300 ease-out"
            style={activeStyle}
          />

          <div className="flex space-x-4 relative z-10">
            {tabs.map((tab, index) => (
              <div
                key={tab.name}
                ref={(el) => (tabRefs.current[index] = el)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <Link
                  href={tab.href}
                  className={`px-3 py-2 text-sm font-medium transition-colors duration-300 ${
                    pathname === tab.href ? 'text-gray-900' : 'text-gray-500'
                  }`}
                >
                  {tab.name}
                </Link>
              </div>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
}
