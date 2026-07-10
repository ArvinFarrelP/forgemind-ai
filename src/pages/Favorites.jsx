import { useNavigate } from 'react-router-dom'
import { Star, ArrowUpRight } from 'lucide-react'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import { useHistoryStore } from '../store/historyStore'
import { getCategoryById } from '../utils/categories'
import { formatDate, truncate } from '../utils/format'

export default function Favorites() {
  const items = useHistoryStore((s) => s.items)
  const toggleFavorite = useHistoryStore((s) => s.toggleFavorite)
  const navigate = useNavigate()
  const favorites = items.filter((i) => i.favorite)

  function handleOpen(item) {
    navigate(`/dashboard/workspace?category=${item.categoryId}&prompt=${encodeURIComponent(item.prompt)}`)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display font-semibold text-2xl">Favorites</h2>
        <p className="text-forge-muted mt-1">{favorites.length} generations you&apos;ve starred for quick access.</p>
      </div>

      {favorites.length === 0 ? (
        <Card className="text-center py-16">
          <Star className="w-8 h-8 text-forge-muted mx-auto mb-3" />
          <p className="text-forge-muted text-sm">No favorites yet. Star a generation from the Workspace or History.</p>
        </Card>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {favorites.map((item) => {
            const cat = getCategoryById(item.categoryId)
            const Icon = cat.icon
            return (
              <Card key={item.id} hover className="flex flex-col">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-9 h-9 rounded-lg bg-forge-surface2 flex items-center justify-center">
                    <Icon className="w-4 h-4 text-forge-ember" />
                  </div>
                  <button
                    onClick={() => toggleFavorite(item.id)}
                    className="btn-ghost p-1.5 rounded-lg"
                    aria-label="Remove from favorites"
                  >
                    <Star className="w-4 h-4 fill-forge-ember text-forge-ember" />
                  </button>
                </div>
                <h3 className="font-display font-medium text-sm mb-2">{truncate(item.prompt, 60)}</h3>
                <p className="text-xs text-forge-muted flex-1 leading-relaxed line-clamp-3">{item.content}</p>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-xs text-forge-muted">{formatDate(item.createdAt)}</span>
                  <Button variant="ghost" size="sm" icon={ArrowUpRight} onClick={() => handleOpen(item)}>
                    Open
                  </Button>
                </div>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
