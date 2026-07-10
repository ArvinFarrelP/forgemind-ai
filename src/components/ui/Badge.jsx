import clsx from 'clsx'

const tones = {
  ember: 'bg-forge-ember/15 text-forge-ember border-forge-ember/30',
  violet: 'bg-forge-violet/15 text-forge-violet border-forge-violet/30',
  cyan: 'bg-forge-cyan/15 text-forge-cyan border-forge-cyan/30',
  muted: 'bg-white/5 text-forge-muted border-white/10',
}

export default function Badge({ children, tone = 'ember', className }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-medium',
        tones[tone],
        className
      )}
    >
      {children}
    </span>
  )
}
