import clsx from 'clsx'
import { CATEGORIES, CATEGORY_GROUPS } from '../../utils/categories'

export default function CategorySelector({ value, onChange }) {
  return (
    <div className="space-y-5">
      {CATEGORY_GROUPS.map((group) => (
        <div key={group}>
          <p className="text-xs font-medium uppercase tracking-wider text-forge-muted mb-2.5">{group}</p>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.filter((c) => c.group === group).map((cat) => {
              const Icon = cat.icon
              const active = value === cat.id
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => onChange(cat.id)}
                  className={clsx(
                    'flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium border transition-all',
                    active
                      ? 'bg-ember-gradient-soft border-forge-ember/40 text-forge-ember'
                      : 'border-forge-border text-forge-muted hover:text-forge-text hover:border-white/20'
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {cat.label}
                </button>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
