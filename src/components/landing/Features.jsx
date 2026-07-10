import { motion } from 'framer-motion'
import { LayoutTemplate, Sparkles, Code2, PenTool, MessageSquare, FileText } from 'lucide-react'
import Card from '../ui/Card'

const features = [
  {
    icon: LayoutTemplate,
    title: 'AI Workspace',
    desc: 'A unified editor with category, tone, and language controls to generate exactly the content you need.',
  },
  {
    icon: Sparkles,
    title: 'Prompt Engineering',
    desc: '60 ready-to-use templates built by experts so you never stare at a blank page again.',
  },
  {
    icon: Code2,
    title: 'Code Assistant',
    desc: 'Write, debug, review, and document code with syntax-highlighted, production-quality output.',
  },
  {
    icon: PenTool,
    title: 'Content Writer',
    desc: 'From blog posts to marketing copy to social captions, generate on-brand content in seconds.',
  },
  {
    icon: MessageSquare,
    title: 'Interview Coach',
    desc: 'Practice behavioral and technical interview questions with STAR-method structured answers.',
  },
  {
    icon: FileText,
    title: 'Resume Generator',
    desc: 'Turn your experience into achievement-driven resumes and tailored cover letters.',
  },
]

export default function Features() {
  return (
    <section id="features" className="py-24 px-5 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-display font-semibold text-3xl sm:text-4xl">
            Everything you need, <span className="text-gradient">one workspace</span>
          </h2>
          <p className="mt-4 text-forge-muted text-lg">
            ForgeMind AI replaces a dozen scattered tools with a single, focused place to create.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
            >
              <Card hover className="h-full">
                <div className="w-11 h-11 rounded-xl bg-ember-gradient-soft border border-forge-ember/20 flex items-center justify-center mb-4">
                  <f.icon className="w-5 h-5 text-forge-ember" />
                </div>
                <h3 className="font-display font-semibold text-lg mb-2">{f.title}</h3>
                <p className="text-forge-muted text-sm leading-relaxed">{f.desc}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
