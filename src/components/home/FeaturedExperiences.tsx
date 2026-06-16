import { Link } from 'react-router-dom'
import { FiStar, FiMapPin, FiClock, FiArrowRight } from 'react-icons/fi'
import { experiences } from '../../data/experiences'
import FadeIn from '../animations/FadeIn'
import Slider from '../ui/Slider'

const formatPrice = (price: number) => `₹${price.toLocaleString('en-IN')}`

const FeaturedExperiences = () => {
  const featured = experiences.slice(0, 6)

  return (
    <section className="section-padding bg-white">
      <div className="container mx-auto px-6">
        <FadeIn>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-10 gap-4">
            <div>
              <p style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.7rem] text-[#C9A84C] tracking-[0.25em] uppercase mb-2">No Planning Needed</p>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-[2rem] md:text-[2.6rem] text-[#1A1208] font-semibold">Experiences Worth Remembering ✨</h2>
            </div>
            <Link to="/experiences" style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.75rem] text-[#1A1208] tracking-[0.2em] uppercase font-medium hover:text-[#D9776B] transition-colors flex items-center gap-2 shrink-0">
              View All <FiArrowRight size={14} />
            </Link>
          </div>
        </FadeIn>

       <Slider>
  {featured.map((exp) => (
    <Link
      key={exp.id}
      to={`/experience/${exp.id}`}
className="group shrink-0 w-[260px] sm:w-[300px] lg:w-[340px]"    >
      <div className="overflow-hidden rounded-[28px] bg-white border border-[#F1E4C5] shadow-[0_10px_30px_rgba(26,18,8,0.06)] hover:shadow-[0_24px_70px_rgba(201,168,76,0.18)] transition-all duration-500 hover:-translate-y-2">
        
        {/* Image */}
<div className="relative h-[220px] sm:h-[280px] lg:h-[320px] overflow-hidden">          <img
            src={exp.image}
            alt={exp.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A1208]/90 via-[#1A1208]/20 to-transparent" />

          {/* Category */}
          <div className="absolute top-4 left-4">
            <span
              style={{ fontFamily: "'Jost', sans-serif" }}
className="
px-2.5 py-1
sm:px-3 sm:py-1.5
rounded-full
bg-white/90
backdrop-blur
text-[#1A1208]
text-[9px]
sm:text-[10px]
tracking-[0.12em]
uppercase
font-semibold
"            >
              {exp.category}
            </span>
          </div>

          {/* Trending */}
          <div className="absolute top-3 right-3">
  <span
    style={{ fontFamily: "'Jost', sans-serif" }}
    className="
      px-2 py-1
      sm:px-3 sm:py-1.5
      rounded-full
      bg-[#C9A84C]
      text-white
      text-[8px]
      sm:text-[10px]
      font-semibold
      max-w-[90px]
      sm:max-w-none
     text-center
leading-tight
    "
  >
    🔥 {exp.bookedToday}
  </span>
</div>
          {/* Content On Image */}
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <h3
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
              className="text-white text-[1.4rem] lg:text-[1.7rem] font-semibold leading-tight mb-3"
            >
              {exp.title}
            </h3>

            <div className="flex flex-wrap gap-4 text-white/90">
              <div className="flex items-center gap-1.5">
                <FiMapPin size={13} />
                <span
                  style={{ fontFamily: "'Jost', sans-serif" }}
                  className="text-[12px]"
                >
                  {exp.location}
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <FiClock size={13} />
                <span
                  style={{ fontFamily: "'Jost', sans-serif" }}
                  className="text-[12px]"
                >
                  {exp.duration}
                </span>
              </div>
            </div>
          </div>

          {/* Hover CTA */}
          <div className="absolute bottom-5 right-5 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
            <div className="w-11 h-11 rounded-full bg-white flex items-center justify-center shadow-xl">
              <FiArrowRight
                size={18}
                className="text-[#1A1208]"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-5">
          <div className="flex items-center justify-between">
            
            <div>
              <div className="flex items-center gap-2 mb-1">
                <FiStar
                  size={14}
                  fill="#C9A84C"
                  color="#C9A84C"
                />

                <span
                  style={{ fontFamily: "'Jost', sans-serif" }}
                  className="text-[0.82rem] text-[#1A1208] font-semibold"
                >
                  {exp.rating}
                </span>

                <span
                  style={{ fontFamily: "'Jost', sans-serif" }}
                  className="text-[0.72rem] text-[#9E8A6A]"
                >
                  Exceptional
                </span>
              </div>

              <p
                style={{ fontFamily: "'Jost', sans-serif" }}
                className="text-[10px] uppercase tracking-[0.2em] text-[#9E8A6A]"
              >
                Starting From
              </p>
            </div>

            <div className="text-right">
              <p
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
                className="text-[1.5rem] text-[#1A1208] font-bold"
              >
                {formatPrice(exp.price)}
              </p>

              <p
                style={{ fontFamily: "'Jost', sans-serif" }}
                className="text-[11px] text-[#C9A84C] font-semibold uppercase tracking-[0.15em]"
              >
                Explore
              </p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  ))}
</Slider>
      </div>
    </section>
  )
}

export default FeaturedExperiences