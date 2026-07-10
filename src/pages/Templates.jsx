import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, ArrowRight } from 'lucide-react'
import Card from '../components/ui/Card'
import Input from '../components/ui/Input'
import Dropdown from '../components/ui/Dropdown'
import Badge from '../components/ui/Badge'
import { TEMPLATES } from '../utils/templates'
import { CATEGORIES, getCategoryById } from '../utils/categories'

const FILTER_OPTIONS = ['All Categories', ...CATEGORIES.map((c) => c.label)]

export default function Templates() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('All Categories')
  const navigate = useNavigate()

  const filtered = useMemo(() => {
    return TEMPLATES.filter((t) => {
      const cat = getCategoryById(t.category)
      const matchesFilter = filter === 'All Categories' || cat.label === filter
      const matchesSearch =
        !search.trim() ||
        t.title.toLowerCase().includes(search.toLowerCase()) ||
        t.prompt.toLowerCase().includes(search.toLowerCase())
      return matchesFilter && matchesSearch
    })
  }, [search, filter])

  function applyTemplate(template) {
    navigate(`/dashboard/workspace?category=${template.category}&prompt=${encodeURIComponent(template.prompt)}`)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display font-semibold text-2xl">Templates</h2>
        <p className="text-forge-muted mt-1">{TEMPLATES.length} ready-to-use prompts to jumpstart your next generation.</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-forge-muted absolute left-4 top-1/2 -translate-y-1/2" />
          <Input
            placeholder="Search templates..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-11"
          />
        </div>
        <Dropdown options={FILTER_OPTIONS} value={filter} onChange={setFilter} className="w-full sm:w-64" />
      </div>

      {filtered.length === 0 ? (
        <Card className="text-center py-14">
          <p className="text-forge-muted text-sm">No templates match your search.</p>
        </Card>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((t) => {
            const cat = getCategoryById(t.category)
            const Icon = cat.icon
            return (
              <Card key={t.id} hover className="flex flex-col">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-9 h-9 rounded-lg bg-forge-surface2 flex items-center justify-center">
                    <Icon className="w-4 h-4 text-forge-ember" />
                  </div>
                  <Badge tone="muted">{cat.label}</Badge>
                </div>
                <h3 className="font-display font-medium text-sm mb-2">{t.title}</h3>
                <p className="text-xs text-forge-muted flex-1 leading-relaxed line-clamp-3">{t.prompt}</p>
                <button
                  onClick={() => applyTemplate(t)}
                  className="mt-4 flex items-center gap-1.5 text-sm text-forge-ember font-medium"
                >
                  Use template <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
