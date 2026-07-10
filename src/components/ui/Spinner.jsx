import { Loader2 } from 'lucide-react'
import clsx from 'clsx'

export default function Spinner({ size = 'md', label, className }) {
  const sizes = { sm: 'w-4 h-4', md: 'w-6 h-6', lg: 'w-10 h-10' }
  return (
    <div className={clsx('flex flex-col items-center justify-center gap-3', className)}>
      <Loader2 className={clsx(sizes[size], 'animate-spin text-forge-ember')} />
      {label && <p className="text-sm text-forge-muted">{label}</p>}
    </div>
  )
}
