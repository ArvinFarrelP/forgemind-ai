import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { PenSquare, LayoutTemplate, History, Star, ArrowRight, Sparkles } from 'lucide-react'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import { useAuthStore } from '../store/authStore'
import { useHistoryStore } from '../store/historyStore'
import { getCategoryById } from '../utils/categories'
import { formatDate, truncate } from '../utils/format'

export default function Dashboard() {
  const user = useAuthStore((s) => s.user)
  const items = useHistoryStore((s) => s.items)
  const favorites = items.filter((i) => i.favorite)
  const recent = items.slice(0, 4)

  const stats = [
    { label: 'Total Generations', value: items.length, icon: Sparkles },
    { label: 'Favorites', value: favorites.length, icon: Star },
    { label: 'Templates Available', value: 60, icon: LayoutTemplate },
    { label: 'This Week', value: items.filter((i) => Date.now() - new Date(i.createdAt).getTime() < 6.048e8).length, icon: History },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-display font-semibold text-2xl">
          Welcome back, {user?.name?.split(' ')[0] || 'creator'} 👋
        </h2>
        <p className="text-forge-muted mt-1">Here&apos;s what&apos;s happening in your workspace.</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05, duration: 0.4 }}
          >
            <Card>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-forge-muted">{s.label}</p>
                  <p className="font-display font-semibold text-3xl mt-1">{s.value}</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-ember-gradient-soft border border-forge-ember/20 flex items-center justify-center">
                  <s.icon className="w-5 h-5 text-forge-ember" />
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <Card className="bg-ember-gradient-soft border-forge-ember/20">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <div>
            <h3 className="font-display font-semibold text-xl">Ready to create something new?</h3>
            <p className="text-forge-muted text-sm mt-1">Jump into the workspace and pick from 21 categories.</p>
          </div>
          <Link to="/dashboard/workspace">
            <Button icon={PenSquare}>Open Workspace</Button>
          </Link>
        </div>
      </Card>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-semibold text-lg">Recent Generations</h3>
            <Link to="/dashboard/history" className="text-sm text-forge-ember flex items-center gap-1">
              View all <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          {recent.length === 0 ? (
            <Card className="text-center py-12">
              <p className="text-forge-muted text-sm">No generations yet. Start creating in the Workspace.</p>
            </Card>
          ) : (
            <div className="space-y-3">
              {recent.map((item) => {
                const cat = getCategoryById(item.categoryId)
                const Icon = cat.icon
                return (
                  <Card key={item.id} className="flex items-start gap-4 p-4">
                    <div className="w-10 h-10 rounded-lg bg-forge-surface2 flex items-center justify-center shrink-0">
                      <Icon className="w-[18px] h-[18px] text-forge-ember" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium truncate">{truncate(item.prompt, 70)}</p>
                      <p className="text-xs text-forge-muted mt-1">
                        {cat.label} · {formatDate(item.createdAt)}
                      </p>
                    </div>
                  </Card>
                )
              })}
            </div>
          )}
        </div>

        <div>
          <h3 className="font-display font-semibold text-lg mb-4">Quick Links</h3>
          <div className="space-y-3">
            <Link to="/dashboard/templates">
              <Card hover className="flex items-center gap-3 p-4">
                <LayoutTemplate className="w-5 h-5 text-forge-ember" />
                <span className="text-sm font-medium">Browse Templates</span>
              </Card>
            </Link>
            <Link to="/dashboard/favorites">
              <Card hover className="flex items-center gap-3 p-4">
                <Star className="w-5 h-5 text-forge-ember" />
                <span className="text-sm font-medium">Your Favorites</span>
              </Card>
            </Link>
            <Link to="/dashboard/history">
              <Card hover className="flex items-center gap-3 p-4">
                <History className="w-5 h-5 text-forge-ember" />
                <span className="text-sm font-medium">Full History</span>
              </Card>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
