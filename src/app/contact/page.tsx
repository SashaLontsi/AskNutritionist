//Contact message can be changed to something better
'use client';

import { useState } from 'react';
import { Mail, MessageSquare, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTimeout(() => {
      setSubmitted(true);
    }, 300);
  };

  return (
    <main className="bg-lightGreen min-h-screen py-24 px-4">
      <div className="max-w-5xl mx-auto md:flex md:items-start md:justify-between gap-12">
        {/* Left Side - Intro Text */}
        <motion.div
          className="md:w-1/2 mb-10 md:mb-0"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold font-heading mb-4">We’re here to help</h2>
          <p className="text-gray-700 text-lg">
            Whether you’re curious about features, have feedback, or just want to say hi, we’d love to hear from you.
          </p>
        </motion.div>

        {/* Right Side - Form or Thank You Message */}
        <motion.div
          className="md:w-1/2 bg-white p-8 rounded-xl shadow-md"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.4 }}
              >
                <h3 className="text-2xl font-semibold text-center mb-6">Contact Us</h3>
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Your Name"
                      className="pl-10 w-full py-2 px-4 border rounded-md focus:outline-none focus:ring focus:ring-accent"
                      required
                    />
                  </div>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      placeholder="Your Email"
                      className="pl-10 w-full py-2 px-4 border rounded-md focus:outline-none focus:ring focus:ring-accent"
                      required
                    />
                  </div>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-4 text-gray-400" />
                    <textarea
                      placeholder="Your Message"
                      rows={5}
                      className="pl-10 pt-3 w-full py-2 px-4 border rounded-md resize-none focus:outline-none focus:ring focus:ring-accent"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-accent text-white py-3 rounded-md hover:bg-green-700 transition font-semibold"
                  >
                    Send Message
                  </button>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="thanks"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <h3 className="text-2xl font-semibold mb-4">Thank you! 🎉</h3>
                <p className="text-gray-700 mb-4">
                  Your message has been sent. We'll get back to you shortly!
                </p>
                <button
                  className="mt-4 text-accent hover:underline font-medium"
                  onClick={() => setSubmitted(false)}
                >
                  Send another message
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </main>
  );
}
