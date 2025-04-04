'use client';

import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-green-600 text-white p-4 flex justify-between">
      <h1 className="font-bold text-lg">
        <Link href="/">AskNutritionist</Link>
      </h1>
      <ul className="flex space-x-6">
        <li><Link href="/">Home</Link></li>
        <li><Link href="/about">About</Link></li>
        <li><Link href="/contact">Contact</Link></li>
        <li><Link href="/ask">Ask</Link></li>
      </ul>
    </nav>
  );
}
