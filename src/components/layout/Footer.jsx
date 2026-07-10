import { Link } from 'react-router-dom'
import { Flame, Github, Twitter, Linkedin } from 'lucide-react'

const columns = [
  {
    title: 'Product',
    links: [
      { label: 'Features', href: '/#features' },
      { label: 'Pricing', href: '/#pricing' },
      { label: 'Templates', href: '/register' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/#' },
      { label: 'Blog', href: '/#' },
      { label: 'Careers', href: '/#' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Documentation', href: '/#' },
      { label: 'FAQ', href: '/#faq' },
      { label: 'Support', href: '/#' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="border-t border-white/5 mt-24">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-14">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10">
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-2 font-display font-semibold text-lg">
              <span className="w-8 h-8 rounded-lg bg-ember-gradient flex items-center justify-center">
                <Flame className="w-4 h-4 text-forge-bg" />
              </span>
              ForgeMind <span className="text-gradient">AI</span>
            </Link>
            <p className="text-sm text-forge-muted mt-4 max-w-xs">
              One workspace. Unlimited AI creativity. Built for developers, students, creators, and teams.
            </p>
            <div className="flex items-center gap-3 mt-5">
              <a href="https://github.com" className="btn-ghost p-2 rounded-lg" aria-label="GitHub">
                <Github className="w-4 h-4" />
              </a>
              <a href="https://twitter.com" className="btn-ghost p-2 rounded-lg" aria-label="Twitter">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="https://linkedin.com" className="btn-ghost p-2 rounded-lg" aria-label="LinkedIn">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="font-display font-medium text-sm mb-4">{col.title}</h4>
              <ul className="space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className="text-sm text-forge-muted hover:text-forge-text transition-colors">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/5 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-forge-muted">© {new Date().getFullYear()} ForgeMind AI. All rights reserved.</p>
          <p className="text-sm text-forge-muted">Built with React, Vite &amp; Fireworks AI.</p>
        </div>
      </div>
    </footer>
  )
}
