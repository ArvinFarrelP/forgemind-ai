import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import clsx from 'clsx'

const faqs = [
  {
    q: 'Do I need my own Fireworks AI API key?',
    a: 'ForgeMind AI connects directly to Fireworks AI from your browser. You can add your API key in Settings, or the app will use a key configured at build time via environment variables.',
  },
  {
    q: 'Is my data stored on a server?',
    a: 'No. ForgeMind AI has no backend. Your account, history, favorites, and settings are stored entirely in your browser using localStorage.',
  },
  {
    q: 'Can I use ForgeMind AI for code generation?',
    a: 'Yes. The Programming, Bug Fix, Debug, and Code Review categories are tuned specifically for producing clean, well-explained code with syntax highlighting.',
  },
  {
    q: 'What languages are supported for content generation?',
    a: 'You can generate content in English, Indonesian, Spanish, French, German, Portuguese, Japanese, Korean, Mandarin Chinese, and Arabic.',
  },
  {
    q: 'Can I cancel my subscription anytime?',
    a: 'Yes, there are no long-term contracts. You can switch plans or cancel at any time from your account settings.',
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section id="faq" className="py-24 px-5 sm:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="font-display font-semibold text-3xl sm:text-4xl">
            Frequently asked <span className="text-gradient">questions</span>
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((item, i) => {
            const isOpen = openIndex === i
            return (
              <div key={item.q} className="glass-card overflow-hidden">
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-display font-medium">{item.q}</span>
                  <ChevronDown className={clsx('w-5 h-5 text-forge-muted shrink-0 transition-transform', isOpen && 'rotate-180')} />
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-5 text-sm text-forge-muted leading-relaxed">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
