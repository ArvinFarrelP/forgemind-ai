import { Link } from 'react-router-dom'
import { Check } from 'lucide-react'
import { motion } from 'framer-motion'
import Card from '../ui/Card'
import Button from '../ui/Button'
import Badge from '../ui/Badge'

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    desc: 'Perfect for trying out ForgeMind AI.',
    features: ['20 generations / month', 'All 21 categories', '10 templates', 'History (last 20 items)'],
    cta: 'Start Free',
    highlighted: false,
  },
  {
    name: 'Pro',
    price: '$19',
    period: 'per month',
    desc: 'For professionals who create every day.',
    features: [
      'Unlimited generations',
      'All 21 categories',
      'All 60 templates',
      'Unlimited history & favorites',
      'Priority generation speed',
    ],
    cta: 'Start Free',
    highlighted: true,
  },
  {
    name: 'Team',
    price: '$49',
    period: 'per month',
    desc: 'For teams that create together.',
    features: ['Everything in Pro', 'Up to 10 seats', 'Shared template library', 'Team analytics'],
    cta: 'Start Free',
    highlighted: false,
  },
]

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 px-5 sm:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-display font-semibold text-3xl sm:text-4xl">
            Simple, <span className="text-gradient">transparent</span> pricing
          </h2>
          <p className="mt-4 text-forge-muted text-lg">Start free. Upgrade when you need more firepower.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <Card
                className={plan.highlighted ? 'border-forge-ember/50 shadow-glow relative' : 'relative'}
                hover
              >
                {plan.highlighted && (
                  <Badge className="absolute -top-3 left-6" tone="ember">
                    Most Popular
                  </Badge>
                )}
                <h3 className="font-display font-semibold text-xl">{plan.name}</h3>
                <p className="text-sm text-forge-muted mt-1">{plan.desc}</p>
                <div className="mt-5 flex items-baseline gap-1.5">
                  <span className="font-display font-semibold text-4xl">{plan.price}</span>
                  <span className="text-forge-muted text-sm">/{plan.period}</span>
                </div>
                <Link to="/register" className="block mt-6">
                  <Button variant={plan.highlighted ? 'primary' : 'secondary'} className="w-full">
                    {plan.cta}
                  </Button>
                </Link>
                <ul className="mt-7 space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-forge-muted">
                      <Check className="w-4 h-4 text-forge-ember shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
