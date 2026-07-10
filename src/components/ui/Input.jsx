import { forwardRef } from 'react'
import clsx from 'clsx'

const Input = forwardRef(function Input({ label, error, className, id, ...props }, ref) {
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-forge-muted mb-1.5">
          {label}
        </label>
      )}
      <input ref={ref} id={id} className={clsx('input-field', error && 'border-red-500/60', className)} {...props} />
      {error && <p className="mt-1.5 text-sm text-red-400">{error}</p>}
    </div>
  )
})

export default Input
