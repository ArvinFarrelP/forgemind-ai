import { useMemo } from 'react'

// Signature ambient element: rising embers drifting up from the bottom of the
// hero, evoking a forge — reinforces the "ForgeMind" concept without relying
// on generic blob gradients.
export default function EmberField({ count = 22 }) {
  const embers = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 2 + Math.random() * 4,
        delay: Math.random() * 3.5,
        duration: 3 + Math.random() * 3,
        color: i % 3 === 0 ? '#7C5CFF' : i % 3 === 1 ? '#F5A623' : '#FF6B35',
      })),
    [count]
  )

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {embers.map((e) => (
        <span
          key={e.id}
          className="absolute bottom-0 rounded-full animate-ember"
          style={{
            left: `${e.left}%`,
            width: e.size,
            height: e.size,
            backgroundColor: e.color,
            boxShadow: `0 0 ${e.size * 3}px ${e.color}`,
            animationDelay: `${e.delay}s`,
            animationDuration: `${e.duration}s`,
          }}
        />
      ))}
    </div>
  )
}
