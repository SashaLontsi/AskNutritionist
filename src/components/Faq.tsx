//More questions and answers can be added
'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

type FAQ = {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: 'Is AskNutritionist free to use?',
    answer: 'Yes, AskNutritionist is completely free. You can ask unlimited nutrition-related questions anytime.',
  },
  {
    question: 'Can I trust the information?',
    answer: 'The responses are based on verified nutritional sources and AI trained on expert-reviewed material.',
  },
  {
    question: 'Does this replace a real nutritionist?',
    answer: 'No. It’s a helpful assistant, not a substitute for a certified healthcare professional.',
  },
]

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="bg-white border-t border-gray-200 py-16 md:py-24">
      <div className="max-w-5xl mx-auto px-4 md:px-6 grid md:grid-cols-2 gap-12 items-start">
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-gray-300 rounded-xl">
              <button
                className="w-full flex justify-between items-center px-6 py-4 text-left font-medium text-lg text-textMain focus:outline-none"
                onClick={() => toggle(index)}
              >
                {faq.question}
                <ChevronDown
                  className={`w-5 h-5 transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4 text-gray-700 text-sm">{faq.answer}</div>
              )}
            </div>
          ))}
        </div>
        <div>
          <h2 className="text-3xl font-bold font-heading mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 text-base">
            Have questions? We’ve got answers. Here are some of the most common things people ask us about AskNutritionist.
          </p>
        </div>
      </div>
    </section>
  )
}
