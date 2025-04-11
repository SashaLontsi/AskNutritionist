'use client';

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Footer from '@/components/ui/Footer';
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function AboutPage() {
  const teamRef = useRef(null);
  const valuesRef = useRef(null);
  const isInView = useInView(teamRef, { once: true, margin: "-100px" });
  const isValuesInView = useInView(valuesRef, { once: true, margin: "-100px" });

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-lightGreen text-textMain font-body"
    >
      <div className="container mx-auto px-4 py-12">
        {/* Header Section */}
        <section className="pt-10 md:pt-16 pb-32 text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4 font-heading">About Us</h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            At AskNutritionist, our mission is to make reliable, AI-powered nutrition guidance accessible to everyone through smart technology and health education.
          </p>
        </section>

        {/* Company Section */}
        <section className="mb-16 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4 font-heading">Our Story</h2>
            <p className="text-gray-700 mb-4">
              Health Academy was founded with a vision to make health education more accessible, engaging, and impactful. What started as a small initiative to share reliable health information has grown into a trusted learning platform dedicated to empowering individuals through knowledge.
            </p>
            <p className="text-gray-700 mb-6">
              Today, Health Academy offers a wide range of expert-led courses, resources, and community support to help people make informed decisions and lead healthier lives no matter where they are in their journey.
            </p>
            <Link href="/contact">
                <Button>Get in Touch</Button>
            </Link>
          </div>
          <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden">
            <Image src="/food.jpg" alt="Nutrition concept" fill className="object-cover" />
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-16" ref={teamRef}>
          <h2 className="text-3xl font-bold mb-8 text-center font-heading">Meet Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              {
                name: "Olga Grass",
                role: "Founder",
                image: "/team/Olga.jpg",
                bio: "Olga Grass is a Certified Nutritional Practitioner, Registered Nutritional Therapist, and Holistic Health Coach dedicated to empowering clients through personalized nutrition and holistic wellness strategies. With a focus on sustainable, whole-food-based approaches, Olga helps individuals achieve their health goals and embrace lasting lifestyle changes."
              },
              {
                name: "Alex Kostikov",
                role: "Founder",
                image: "/team/Alex.jpg",
                bio: "Alex Kostikov is a European-trained Medical Doctor, independent researcher with over 25 years of experience, and dedicated health educator. Known for his commitment to advancing health knowledge, Alex combines his medical expertise and research background to educate and empower individuals to make informed health decisions and embrace proactive wellness."
              }
            ].map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <Card>
                  <div className="aspect-square relative">
                    <Image src={member.image} alt={member.name} fill className="object-cover rounded-t-xl" />
                  </div>
                  <CardContent className="pt-6">
                    <h3 className="font-bold text-lg">{member.name}</h3>
                    <p className="text-sm text-gray-500 mb-2">{member.role}</p>
                    <p className="text-sm text-gray-700">{member.bio}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Values Section */}
        <section className="mb-16 bg-lighterGreen py-12 px-6 rounded-lg" ref={valuesRef}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isValuesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-8 text-center font-heading">Our Values</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Health First",
                  description: "Everything we do is grounded in our commitment to better physical, mental, and nutritional well-being through education and guidance."
                },
                {
                  title: "Clarity",
                  description: "Whether it's through interactive courses or real-time AI chats, we break down complex health topics into clear, actionable insights."
                },
                {
                  title: "Trust",
                  description: "Our content and responses are backed by science and created or reviewed by experienced professionals to ensure reliability and integrity."
                },
                {
                  title: "Accessibility",
                  description: "We aim to make health knowledge more reachable by offering flexible learning formats and responsive support whether it's through a course or a quick nutrition question."
                },
                {
                  title: "Empowerment",
                  description: "We equip learners and users with tools to make informed, confident decisions about their health, lifestyle, and nutrition."
                },
                {
                  title: "Growth",
                  description: "We’re dedicated to continuous improvement—updating our courses, refining our AI, and listening to your feedback to better serve evolving health needs."
                }
              ].map((value, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="font-bold text-xl mb-2">{value.title}</h3>
                  <p className="text-gray-700">{value.description}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </section>
      </div>

      <Footer />
    </motion.main>
  );
}
