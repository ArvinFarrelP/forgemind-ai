import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Star, Trash2, ArrowUpRight } from 'lucide-react'
import Card from '../components/ui/Card'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'
import Badge from '../components/ui/Badge'
import { useHistoryStore } from '../store/historyStore'
import { useToastStore } from '../store/toastStore'
import { getCategoryById } from '../utils/categories'
import { formatDate, truncate } from '../utils/format'

export default function History() {
  const [search, setSearch] = useState('')
  const items = useHistoryStore((s) => s.items)
  const deleteItem = useHistoryStore((s) => s.deleteItem)
  const toggleFavorite = useHistoryStore((s) => s.toggleFavorite)
  const addToast = useToastStore((s) => s.addToast)
  const navigate = useNavigate()

  const filtered = useMemo(() => {
    if (!search.trim()) return items
    return items.filter(
      (i) =>
        i.prompt.toLowerCase().includes(search.toLowerCase()) ||
        i.content.toLowerCase().includes(search.toLowerCase())
    )
  }, [items, search])

  function handleDelete(id) {
    deleteItem(id)
    addToast('Entry deleted.', 'info')
  }

  function handleOpen(item) {
    navigate(`/dashboard/workspace?category=${item.categoryId}&prompt=${encodeURIComponent(item.prompt)}`)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display font-semibold text-2xl">History</h2>
          <p className="text-forge-muted mt-1">{items.length} generations saved locally in your browser.</p>
        </div>
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-forge-muted absolute left-4 top-1/2 -translate-y-1/2" />
          <Input placeholder="Search history..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-11" />
        </div>
      </div>

      {filtered.length === 0 ? (
        <Card className="text-center py-16">
          <p className="text-forge-muted text-sm">
            {items.length === 0 ? 'Nothing here yet — generate something in the Workspace.' : 'No results match your search.'}
          </p>
        </Card>
      ) : (
        <div className="space-y-3">
          {filtered.map((item) => {
            const cat = getCategoryById(item.categoryId)
            const Icon = cat.icon
            return (
              <Card key={item.id} className="flex flex-col sm:flex-row sm:items-center gap-4 p-4">
                <div className="w-10 h-10 rounded-lg bg-forge-surface2 flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4 text-forge-ember" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-sm font-medium truncate">{truncate(item.prompt, 90)}</p>
                    {item.favorite && <Badge tone="ember">Favorite</Badge>}
                  </div>
                  <p className="text-xs text-forge-muted mt-1">
                    {cat.label} · {item.tone} · {formatDate(item.createdAt)}
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Button variant="ghost" size="sm" icon={ArrowUpRight} onClick={() => handleOpen(item)}>
                    Open
                  </Button>
                  <button
                    onClick={() => toggleFavorite(item.id)}
                    className="btn-ghost p-2 rounded-lg"
                    aria-label="Toggle favorite"
                  >
                    <Star className={`w-4 h-4 ${item.favorite ? 'fill-forge-ember text-forge-ember' : ''}`} />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="btn-ghost p-2 rounded-lg text-red-400"
                    aria-label="Delete entry"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
