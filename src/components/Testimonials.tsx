//Place holder testimonials can be changed later
'use client';

import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    rating: 5,
    title: 'Best app ever!',
    body: "This app has been a game-changer for me! It's made tracking my daily nutrition so much easier. I love how intuitive and user-friendly it is.",
    author: 'Jonas Aly — Founder @ Company',
  },
  {
    rating: 5,
    title: 'Super helpful to stay on track',
    body: "I can’t thank this app enough for helping me build healthier habits. The reminders are spot on and it keeps me motivated!",
    author: 'Mark Bures — Nutrition Coach',
  },
  {
    rating: 5,
    title: 'Great guidance & peace of mind',
    body: "The recommendations are clear, reliable, and super easy to follow. It’s like having a nutritionist in my pocket.",
    author: 'William Kolas — Student',
  },
  {
    rating: 4,
    title: 'Helpful insights daily',
    body: "I now understand my eating patterns so much better. The feedback and insights really changed the way I think about food.",
    author: 'Andrew Chan — Health Blogger',
  },
];

export default function Testimonials() {
  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-24 text-center">
      <h2 className="text-3xl md:text-4xl font-heading font-bold mb-12">
        What Our Users Are Saying
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {testimonials.map((t, i) => (
          <FadeInOnScroll key={i}>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 text-left">
              <div className="text-green-600 mb-2">
                {'★'.repeat(t.rating)}
                {'☆'.repeat(5 - t.rating)}
              </div>
              <h3 className="text-lg font-semibold mb-2">{t.title}</h3>
              <p className="text-gray-700 mb-4">{t.body}</p>
              <p className="text-sm text-gray-500">{t.author}</p>
            </div>
          </FadeInOnScroll>
        ))}
      </div>
    </div>
  );
}

function FadeInOnScroll({ children }: { children: React.ReactNode }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}
