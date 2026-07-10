import { useEffect, useRef, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import clsx from 'clsx'

export default function Dropdown({ label, options, value, onChange, className }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <div className={clsx('relative', className)} ref={ref}>
      {label && <label className="block text-sm font-medium text-forge-muted mb-1.5">{label}</label>}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="input-field flex items-center justify-between gap-2 text-left"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span>{value}</span>
        <ChevronDown className={clsx('w-4 h-4 text-forge-muted transition-transform', open && 'rotate-180')} />
      </button>
      {open && (
        <ul
          role="listbox"
          className="absolute z-20 mt-2 w-full max-h-60 overflow-y-auto rounded-xl glass-card p-1.5 shadow-card"
        >
          {options.map((opt) => (
            <li key={opt}>
              <button
                type="button"
                role="option"
                aria-selected={opt === value}
                onClick={() => {
                  onChange(opt)
                  setOpen(false)
                }}
                className={clsx(
                  'w-full text-left px-3 py-2 rounded-lg text-sm transition-colors',
                  opt === value ? 'bg-forge-ember/15 text-forge-ember' : 'text-forge-text hover:bg-white/5'
                )}
              >
                {opt}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
