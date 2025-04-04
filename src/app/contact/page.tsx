'use client';
import { useState } from 'react';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('https://formspree.io/f/mldjplae', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    setSubmitted(true);
  };

  return (
    <main className="p-6 max-w-xl mx-auto animate-fade-in">
      <h2 className="text-2xl font-semibold text-accent mb-4">Contact Us</h2>
      {submitted ? (
        <p className="text-green-600 font-medium">Thank you for your message!</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow">
          <input name="name" placeholder="Your Name" value={form.name} onChange={handleChange} className="w-full border p-2 rounded" required />
          <input name="email" type="email" placeholder="Your Email" value={form.email} onChange={handleChange} className="w-full border p-2 rounded" required />
          <textarea name="message" placeholder="Your Message" value={form.message} onChange={handleChange} className="w-full border p-2 rounded h-32" required />
          <button className="bg-primary text-white px-4 py-2 rounded hover:bg-green-700 transition">Send Message</button>
        </form>
      )}
    </main>
  );
}