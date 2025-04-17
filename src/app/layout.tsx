import React from 'react';
import './globals.css';
import type { Metadata } from 'next';
import Header from '@/components/Header';

export const metadata: Metadata = {
  title: 'Health AI Assistant',
  description: 'Ask your nutrition questions in a simple chat interface.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="bg-lightGreen text-gray-900 flex min-h-screen flex-col overflow-y-scroll">
        <Header />
        <div className="flex-1 flex flex-col">{children}</div>
      </body>
    </html>
  );
}
