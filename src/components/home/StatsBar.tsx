import { useEffect, useState, useRef } from 'react'

// ============================================
// STATS DATA
// ============================================
const stats = [
  { value: 10000, suffix: '+', label: 'Happy Celebrations' },
  { value: 500, suffix: '+', label: 'Verified Vendors' },
  { value: 50, suffix: '+', label: 'Cities Covered' },
  { value: 4.9, suffix: '★', label: 'Average Rating' },
]

// ============================================
// COUNTER COMPONENT — number 0 se target tak animate hota hai
// ============================================
const Counter = ({ value, suffix }: { value: number; suffix: string }) => {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const hasAnimated = useRef(false) // ek baar hi animate ho

  useEffect(() => {
    // ============================================
    // IntersectionObserver — check karta hai ki
    // element screen pe dikh raha hai ya nahi
    // ============================================
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true

          const duration = 1500 // 1.5 second mein animate ho
          const steps = 50
          const increment = value / steps
          let current = 0

          const timer = setInterval(() => {
            current += increment
            if (current >= value) {
              setCount(value)
              clearInterval(timer)
            } else {
              setCount(current)
            }
          }, duration / steps)
        }
      },
      { threshold: 0.5 } // 50% element dikhna chahiye
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [value])

  // decimal numbers (4.9) ke liye toFixed(1), warna round number
  const displayValue = value % 1 !== 0 ? count.toFixed(1) : Math.floor(count)

  return (
    <div ref={ref} style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-[2.4rem] md:text-[3rem] text-[#1A1208] font-semibold">
      {displayValue}{suffix}
    </div>
  )
}

const StatsBar = () => {
  return (
    <section className="bg-white border-b border-[#EDE0C4]">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 py-10">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`text-center px-4 ${
                i !== 0 ? 'border-l border-[#EDE0C4]' : ''
              } ${i === 2 ? 'border-l md:border-l' : ''}`}
            >
              <Counter value={stat.value} suffix={stat.suffix} />
              <p style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.7rem] text-[#9E8A6A] tracking-[0.15em] uppercase mt-2">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default StatsBar