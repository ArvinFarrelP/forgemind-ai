import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, PlayCircle } from 'lucide-react'
import Button from '../ui/Button'
import EmberField from '../layout/EmberField'

export default function Hero() {
  return (
    <section className="relative pt-20 pb-28 sm:pt-28 sm:pb-36 px-5 sm:px-8 overflow-hidden">
      <EmberField />
      <div className="max-w-5xl mx-auto text-center relative">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full border border-forge-ember/30 bg-forge-ember/10 px-4 py-1.5 text-sm text-forge-ember mb-8"
        >
          Powered by Fireworks AI
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display font-semibold text-4xl sm:text-6xl lg:text-7xl leading-[1.05] tracking-tight"
        >
          Forge Better Ideas.
          <br />
          <span className="text-gradient">Create Faster.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 text-lg sm:text-xl text-forge-muted max-w-2xl mx-auto"
        >
          An AI workspace for developers, students, creators, entrepreneurs, and professionals.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link to="/register">
            <Button size="lg" icon={ArrowRight} className="flex-row-reverse">
              Start Free
            </Button>
          </Link>
          <a href="#features">
            <Button size="lg" variant="secondary" icon={PlayCircle}>
              Watch Demo
            </Button>
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-6 text-sm text-forge-muted"
        >
          No credit card required · Free forever plan
        </motion.p>
      </div>
    </section>
  )
}
