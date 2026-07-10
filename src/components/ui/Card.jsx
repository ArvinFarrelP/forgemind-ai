import clsx from 'clsx'

export default function Card({ children, className, hover = false, ...props }) {
  return (
    <div
      className={clsx(
        'glass-card p-6',
        hover && 'transition-all duration-300 hover:border-forge-ember/30 hover:-translate-y-1',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
