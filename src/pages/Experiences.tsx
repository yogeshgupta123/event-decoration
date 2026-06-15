import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiStar, FiMapPin, FiClock, FiArrowRight } from 'react-icons/fi'
import { experiences, experienceCategories } from '../data/experiences'
import FadeIn from '../components/animations/FadeIn'
import { StaggerContainer, StaggerItem } from '../components/animations/StaggerContainer'

const formatPrice = (price: number) => `₹${price.toLocaleString('en-IN')}`

const Experiences = () => {
  const [activeCategory, setActiveCategory] = useState('All')

  const filteredExperiences = activeCategory === 'All'
    ? experiences
    : experiences.filter((exp) => exp.category === activeCategory)

  return (
    <div className="bg-[#FDFAF4]">

      {/* HEADER */}
      <div className="bg-white border-b border-[#EDE0C4] py-10">
        <div className="container mx-auto px-6">
          <p style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.72rem] text-[#9E8A6A] mb-3">
            Home / <span className="text-[#D9776B]">Experiences</span>
          </p>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-[2.2rem] md:text-[2.8rem] text-[#1A1208] font-semibold mb-2">
            Experiences Worth Remembering ✨
          </h1>
          <p style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.85rem] text-[#9E8A6A]">
            No planning needed — just book, and let us create the magic.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-10">

        {/* CATEGORY TABS */}
        <div className="flex gap-3 mb-10 overflow-x-auto scrollbar-hide pb-2">
          {['All', ...experienceCategories].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{ fontFamily: "'Jost', sans-serif" }}
              className={`shrink-0 px-5 py-2.5 rounded-full text-[0.75rem] font-medium tracking-wide transition-all ${
                activeCategory === cat
                  ? 'bg-[#1A1208] text-white'
                  : 'bg-white text-[#5C4A1E] border border-[#EDE0C4] hover:border-[#C9A84C]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* ============================================
            REDESIGNED CARDS:
            - Gradient overlay on image
            - Category pill (top-left)
            - "X booked today" social proof (top-right)
            - Rating stars visible
            - "Book Now" appears on hover
        ============================================ */}
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExperiences.map((exp) => (
            <StaggerItem key={exp.id}>
              <Link
                to={`/experience/${exp.id}`}
                className="group block bg-white rounded-2xl overflow-hidden shadow-[0_4px_16px_rgba(26,18,8,0.06)] hover:shadow-[0_16px_40px_rgba(201,168,76,0.25)] hover:-translate-y-2 transition-all duration-300"
              >
                {/* IMAGE + OVERLAYS */}
                <div className="relative h-[240px] overflow-hidden">
                  <img
                    src={exp.image}
                    alt={exp.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Gradient overlay — bottom dark fade */}
                  <div
                    className="absolute inset-0"
                    style={{ background: 'linear-gradient(to top, rgba(26,18,8,0.75) 0%, transparent 55%)' }}
                  />

                  {/* Category pill — top left */}
                  <span
                    style={{ fontFamily: "'Jost', sans-serif" }}
                    className="absolute top-3 left-3 bg-white/95 text-[#1A1208] rounded-full text-[0.6rem] px-3 py-1.5 tracking-[0.1em] uppercase font-semibold"
                  >
                    {exp.category}
                  </span>

                  {/* Social proof — top right */}
                  <span
                    style={{ fontFamily: "'Jost', sans-serif" }}
                    className="absolute top-3 right-3 bg-[#D9776B] text-white rounded-full text-[0.62rem] px-3 py-1.5 font-semibold flex items-center gap-1"
                  >
                    🔥 {exp.bookedToday} booked today
                  </span>

                  {/* Bottom content over gradient */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-white text-[1.3rem] font-semibold mb-1.5 leading-snug">
                      {exp.title}
                    </h3>
                    <div className="flex items-center gap-3 text-white/85">
                      <div className="flex items-center gap-1">
                        <FiMapPin size={11} />
                        <span style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.7rem]">{exp.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <FiClock size={11} />
                        <span style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.7rem]">{exp.duration}</span>
                      </div>
                    </div>
                  </div>

                  {/* "Book Now" — appears on hover */}
                  <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-[#C9A84C] py-3 flex items-center justify-center gap-2">
                    <span style={{ fontFamily: "'Jost', sans-serif" }} className="text-white text-[0.72rem] tracking-[0.2em] uppercase font-semibold">
                      View & Book
                    </span>
                    <FiArrowRight size={13} color="white" />
                  </div>
                </div>

                {/* BOTTOM INFO — rating + price */}
                <div className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <FiStar size={14} fill="#D9776B" color="#D9776B" />
                    <span style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.8rem] text-[#1A1208] font-semibold">{exp.rating}</span>
                    <span style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.7rem] text-[#9E8A6A]">({exp.reviews})</span>
                  </div>
                  <div className="text-right">
                    <p style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.62rem] text-[#9E8A6A] uppercase tracking-wider">From</p>
                    <p style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-[1.2rem] text-[#1A1208] font-bold">{formatPrice(exp.price)}</p>
                  </div>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {filteredExperiences.length === 0 && (
          <FadeIn>
            <div className="bg-white rounded-2xl shadow-[0_4px_16px_rgba(26,18,8,0.06)] p-12 text-center">
              <p style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-[1.4rem] text-[#1A1208] mb-2">
                No experiences found
              </p>
              <p style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.85rem] text-[#9E8A6A]">
                Try a different category.
              </p>
            </div>
          </FadeIn>
        )}

      </div>
    </div>
  )
}

export default Experiences