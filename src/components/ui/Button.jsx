import { forwardRef } from 'react'
import clsx from 'clsx'
import { Loader2 } from 'lucide-react'

const variants = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  ghost: 'btn-ghost',
  danger:
    'inline-flex items-center justify-center gap-2 rounded-xl bg-red-500/10 text-red-400 border border-red-500/30 font-medium px-5 py-3 transition-colors hover:bg-red-500/20 disabled:opacity-50 disabled:pointer-events-none',
}

const sizes = {
  sm: 'text-sm px-3 py-2',
  md: '',
  lg: 'text-lg px-6 py-4',
}

const Button = forwardRef(function Button(
  { children, variant = 'primary', size = 'md', loading = false, icon: Icon, className, disabled, ...props },
  ref
) {
  return (
    <button
      ref={ref}
      className={clsx(variants[variant], sizes[size], className)}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : Icon ? <Icon className="w-4 h-4" /> : null}
      {children}
    </button>
  )
})

export default Button
