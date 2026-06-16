import { useEffect, useState, useRef } from 'react'
import {
  FiHeart,
  FiUsers,
  FiMapPin,
  FiStar,
} from 'react-icons/fi'

// ============================================
// STATS DATA
// ============================================
const stats = [
  {
    value: 10000,
    suffix: '+',
    label: 'Happy Celebrations',
    icon: FiHeart,
  },
  {
    value: 500,
    suffix: '+',
    label: 'Verified Vendors',
    icon: FiUsers,
  },
  {
    value: 50,
    suffix: '+',
    label: 'Cities Covered',
    icon: FiMapPin,
  },
  {
    value: 4.9,
    suffix: '★',
    label: 'Average Rating',
    icon: FiStar,
  },
]

// ============================================
// COUNTER
// ============================================
const Counter = ({
  value,
  suffix,
}: {
  value: number
  suffix: string
}) => {
  const [count, setCount] = useState(0)

  const ref = useRef<HTMLDivElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (
          entry.isIntersecting &&
          !hasAnimated.current
        ) {
          hasAnimated.current = true

          const duration = 1500
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
      { threshold: 0.4 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [value])

  const displayValue =
    value % 1 !== 0
      ? count.toFixed(1)
      : Math.floor(count)

  return (
    <div ref={ref}>
      {displayValue}
      {suffix}
    </div>
  )
}

// ============================================
// STATS BAR
// ============================================
const StatsBar = () => {
  return (
    <section className="py-8 md:py-10 bg-[#FDFAF4]">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => {
            const Icon = stat.icon

            return (
              <div
                key={stat.label}
                className="
                  group
                  bg-white
                  rounded-[24px]
                  border
                  border-[#F1E4C5]
                  p-4
                  sm:p-5
                  text-center
                  shadow-[0_6px_24px_rgba(26,18,8,0.04)]
                  hover:shadow-[0_16px_50px_rgba(201,168,76,0.14)]
                  hover:-translate-y-1
                  transition-all
                  duration-300
                "
              >
                {/* Icon */}
                <div className="mb-3 flex justify-center">
                  <div
                    className="
                      w-11 h-11
                      rounded-full
                      bg-[#FDFAF4]
                      border
                      border-[#F3E7CC]
                      flex
                      items-center
                      justify-center
                      group-hover:scale-110
                      transition-transform
                      duration-300
                    "
                  >
                    <Icon
                      size={18}
                      className="text-[#C9A84C]"
                    />
                  </div>
                </div>

                {/* Counter */}
                <div
                  style={{
                    fontFamily:
                      "'Cormorant Garamond', serif",
                  }}
                  className="
                    text-[1.8rem]
                    sm:text-[2.1rem]
                    lg:text-[2.4rem]
                    text-[#1A1208]
                    font-semibold
                    leading-none
                    mb-2
                  "
                >
                  <Counter
                    value={stat.value}
                    suffix={stat.suffix}
                  />
                </div>

                {/* Label */}
                <p
                  style={{
                    fontFamily: "'Jost', sans-serif",
                  }}
                  className="
                    text-[10px]
                    sm:text-[11px]
                    md:text-[12px]
                    uppercase
                    tracking-[0.18em]
                    text-[#9E8A6A]
                    font-medium
                    leading-relaxed
                  "
                >
                  {stat.label}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default StatsBar