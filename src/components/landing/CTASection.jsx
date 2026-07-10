import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import Button from '../ui/Button'

export default function CTASection() {
  return (
    <section className="px-5 sm:px-8 py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto rounded-3xl bg-ember-gradient-soft border border-forge-ember/20 px-8 py-16 text-center relative overflow-hidden"
      >
        <h2 className="font-display font-semibold text-3xl sm:text-4xl relative">
          Ready to forge your next idea?
        </h2>
        <p className="mt-4 text-forge-muted text-lg max-w-xl mx-auto relative">
          Join thousands of creators, developers, and teams already building faster with ForgeMind AI.
        </p>
        <Link to="/register" className="inline-block mt-8 relative">
          <Button size="lg" icon={ArrowRight} className="flex-row-reverse">
            Start Free
          </Button>
        </Link>
      </motion.div>
    </section>
  )
}
