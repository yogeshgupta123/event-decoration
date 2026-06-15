import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiSearch, FiMapPin, FiChevronDown } from 'react-icons/fi'
import FadeIn from '../animations/FadeIn'

// ============================================
// QUICK OCCASION PILLS — har pill kahin na kahin redirect karta hai
// ============================================
const occasionPills = [
  { label: 'Wedding', emoji: '💍', to: '/services?category=Wedding' },
  { label: 'Birthday', emoji: '🎂', to: '/services?category=Birthday' },
  { label: 'Engagement', emoji: '💝', to: '/services?category=Engagement' },
  { label: 'Corporate', emoji: '🏢', to: '/services?category=Corporate' },
  { label: 'Romantic', emoji: '🌹', to: '/experiences' },
  { label: 'Surprise', emoji: '🎁', to: '/experiences' },
]

const cities = ['Delhi NCR', 'Mumbai', 'Bangalore', 'Jaipur', 'Pune', 'Hyderabad']

const Hero = () => {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [city, setCity] = useState('Delhi NCR')
  const [cityOpen, setCityOpen] = useState(false)

  // ============================================
  // SEARCH — Enter dabane se ya button click se
  // /services?search=... pe le jao
  // ============================================
  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/services?search=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  return (
    <section className="relative h-[560px] md:h-[660px] flex items-center overflow-hidden">

      {/* ============================================
          BACKGROUND — slow zoom (Ken Burns effect)
          motion.div scale 1 → 1.1 over 20 seconds
      ============================================ */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1 }}
        animate={{ scale: 1.1 }}
        transition={{ duration: 20, ease: 'linear' }}
      >
        <img
          src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1600"
          alt="Celebration"
          className="w-full h-full object-cover"
        />
      </motion.div>

      <div className="absolute inset-0 bg-black/50" />
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(to top, rgba(26,18,8,0.6) 0%, transparent 55%)' }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-[680px]">

          {/* Badge */}
          <FadeIn delay={0.1}>
            <div className="inline-flex items-center gap-2 border border-[#C9A84C]/50 rounded-full px-4 py-1.5 mb-5">
              <div className="w-1.5 h-1.5 rounded-full bg-[#C9A84C]" />
              <span style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.65rem] text-[#F5E6B8] tracking-[0.25em]">
                10,000+ CELEBRATIONS CREATED
              </span>
            </div>
          </FadeIn>

          {/* Heading — search-first */}
          <FadeIn delay={0.2}>
            <h1
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
              className="text-[2.4rem] md:text-[3.6rem] text-white font-semibold leading-[1.15] mb-6"
            >
              What Are You{' '}
              <span className="italic text-[#F5E6B8]">Celebrating?</span>
            </h1>
          </FadeIn>

          {/* ============================================
              SEARCH BAR — Location + Search input + Button
          ============================================ */}
          <FadeIn delay={0.3}>
            <div className="flex flex-col sm:flex-row items-stretch gap-2 bg-white rounded-2xl sm:rounded-full p-2 shadow-2xl mb-6">

              {/* Location Selector */}
              <div className="relative shrink-0">
                <button
                  onClick={() => setCityOpen(!cityOpen)}
                  className="flex items-center gap-2 px-4 py-3 sm:border-r border-[#EDE0C4] w-full sm:w-auto"
                >
                  <FiMapPin size={15} color="#C9A84C" />
                  <span style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.82rem] text-[#1A1208] font-medium whitespace-nowrap">
                    {city}
                  </span>
                  <FiChevronDown size={13} color="#9E8A6A" className={`transition-transform ${cityOpen ? 'rotate-180' : ''}`} />
                </button>

                {cityOpen && (
                  <div className="absolute top-[calc(100%+8px)] left-0 bg-white rounded-xl shadow-[0_12px_40px_rgba(26,18,8,0.15)] border border-[#EDE0C4] z-20 overflow-hidden w-[180px]">
                    {cities.map((c) => (
                      <button
                        key={c}
                        onClick={() => { setCity(c); setCityOpen(false) }}
                        style={{ fontFamily: "'Jost', sans-serif" }}
                        className={`w-full text-left px-4 py-2.5 text-[0.8rem] hover:bg-[#FDFAF4] transition-colors ${c === city ? 'text-[#C9A84C] font-semibold' : 'text-[#5C4A1E]'}`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Search Input */}
              <div className="flex-1 flex items-center gap-2 px-4 py-3">
                <FiSearch size={15} color="#C9A84C" />
                <input
                  type="text"
                  placeholder="Search experiences, decoration, gifts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  style={{ fontFamily: "'Jost', sans-serif" }}
                  className="flex-1 bg-transparent outline-none text-[0.85rem] text-[#1A1208] placeholder-[#9E8A6A]"
                />
              </div>

              {/* Search Button */}
              <button
                onClick={handleSearch}
                style={{ fontFamily: "'Jost', sans-serif" }}
                className="bg-[#C9A84C] text-white rounded-xl sm:rounded-full px-7 py-3 text-[0.75rem] tracking-[0.2em] uppercase font-semibold hover:bg-[#1A1208] transition-colors shrink-0"
              >
                Search
              </button>
            </div>
          </FadeIn>

          {/* Occasion Pills */}
          <FadeIn delay={0.4}>
            <div className="flex flex-wrap gap-3">
              {occasionPills.map((pill) => (
                <Link
                  key={pill.label}
                  to={pill.to}
                  style={{ fontFamily: "'Jost', sans-serif" }}
                  className="flex items-center gap-2 bg-white/15 hover:bg-white/25 backdrop-blur-sm border border-white/30 rounded-full px-4 py-2.5 text-white text-[0.8rem] font-medium transition-colors"
                >
                  <span>{pill.emoji}</span>
                  {pill.label}
                </Link>
              ))}
            </div>
          </FadeIn>

        </div>
      </div>
    </section>
  )
}

export default Hero