import { Link } from 'react-router-dom'
import { Flame, ArrowLeft } from 'lucide-react'
import Button from '../components/ui/Button'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-5 bg-forge-bg bg-forge-glow">
      <span className="w-14 h-14 rounded-2xl bg-ember-gradient flex items-center justify-center mb-6">
        <Flame className="w-7 h-7 text-forge-bg" />
      </span>
      <h1 className="font-display font-semibold text-6xl">404</h1>
      <p className="text-forge-muted mt-3 max-w-sm">
        This page burned out. Let&apos;s get you back to somewhere that&apos;s still lit.
      </p>
      <Link to="/" className="mt-8">
        <Button icon={ArrowLeft} className="flex-row">
          Back to Home
        </Button>
      </Link>
    </div>
  )
}
