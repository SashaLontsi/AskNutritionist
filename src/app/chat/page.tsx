'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Chat from './Chat';

export default function ChatPage() {
  const [hasInteracted, setHasInteracted] = useState(false);

  return (
    <main className="flex flex-col flex-1 bg-lightGreen min-h-[calc(100vh-4rem)]">
      {/* Greeting section */}
      {!hasInteracted && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center justify-center text-center text-gray-800 pt-60 pb-8 px-4"
        >
          <motion.h2
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold mb-2"
          >
            Hello there!
          </motion.h2>
          <motion.p
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-gray-600"
          >
            How can I help you today?
          </motion.p>
        </motion.div>
      )}

      {/* Chat section */}
      <div className="flex flex-col flex-1 w-full max-w-5xl mx-auto">
        <Chat onFirstInteraction={() => setHasInteracted(true)} />
      </div>
    </main>
  );
}
