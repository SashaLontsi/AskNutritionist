"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/ui/Footer";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Faq from "@/components/Faq";

export default function Home() {
  const featureRefs = [useRef(null), useRef(null), useRef(null)];
  const inViews = featureRefs.map((ref) => useInView(ref, { once: true, margin: "-100px" }));

  const faqRef = useRef(null);
  const faqInView = useInView(faqRef, { once: true, margin: "-100px" });

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-lightGreen text-textMain font-body"
    >
      {/* Hero Section (taller) */}
      <section className="w-full py-32 md:py-44 lg:py-52 bg-lightGreen">
        <div className="max-w-6xl mx-auto px-4 md:px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl font-heading">
              Your Personal Nutrition Assistant
            </h1>
            <p className="mt-6 text-lg md:text-xl text-gray-700">
              AskNutritionist is your smart, AI-powered health companion—
              get answers to your nutrition questions instantly and confidently.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Link href="/chat">
                <Button className="bg-accent text-white hover:bg-green-700 text-base px-6 py-3 rounded-xl shadow">
                  Start Chatting
                </Button>
              </Link>
              <Link href="/about">
                <Button
                  variant="outline"
                  className="text-base px-6 py-3 rounded-xl border-accent text-accent hover:bg-accent/10"
                >
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section (with fade-in) */}
      <section className="w-full py-24 md:py-36 lg:py-44 bg-lighterGreen border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl mb-12 font-heading">
            Why Choose AskNutritionist?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                title: "Instant Advice",
                description: "Get nutrition answers in seconds—no appointment or searching needed.",
              },
              {
                title: "Trusted Guidance",
                description: "Backed by verified sources and trained on real nutritional knowledge.",
              },
              {
                title: "Available 24/7",
                description: "Ask your questions anytime, from any device, day or night.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                ref={featureRefs[index]}
                initial={{ opacity: 0, x: -50 }}
                animate={inViews[index] ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="max-w-xs mx-auto"
              >
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-700">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-lightGreen border-t border-gray-200">
        <Testimonials />
      </section>

      {/* FAQ Section (animated) */}
      <motion.section
        ref={faqRef}
        initial={{ opacity: 0, y: 30 }}
        animate={faqInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <Faq staggered={true} />
      </motion.section>

      {/* Final CTA Section */}
      <section className="w-full py-16 md:py-24 bg-white border-t border-gray-200">
        <div className="max-w-3xl mx-auto px-4 md:px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 font-heading">
            Ready to take control of your nutrition?
          </h2>
          <Link href="/contact">
            <Button className="bg-accent text-white hover:bg-green-700 text-base px-8 py-3 rounded-xl shadow">
              Contact Us
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </motion.main>
  );
}