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
            <Link key={exp.id} to={`/experience/${exp.id}`} className="group shrink-0 w-[280px] block bg-white rounded-2xl overflow-hidden shadow-[0_4px_16px_rgba(26,18,8,0.06)] hover:shadow-[0_16px_40px_rgba(201,168,76,0.25)] hover:-translate-y-2 transition-all duration-300">
              <div className="relative h-[200px] overflow-hidden">
                <img src={exp.image} alt={exp.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(26,18,8,0.75) 0%, transparent 55%)' }} />
                <span style={{ fontFamily: "'Jost', sans-serif" }} className="absolute top-3 left-3 bg-white/95 text-[#1A1208] rounded-full text-[0.6rem] px-3 py-1.5 tracking-[0.1em] uppercase font-semibold">{exp.category}</span>
                <span style={{ fontFamily: "'Jost', sans-serif" }} className="absolute top-3 right-3 bg-[#D9776B] text-white rounded-full text-[0.6rem] px-2.5 py-1.5 font-semibold">🔥 {exp.bookedToday}</span>
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-white text-[1.15rem] font-semibold mb-1 leading-snug">{exp.title}</h3>
                  <div className="flex items-center gap-3 text-white/85">
                    <div className="flex items-center gap-1"><FiMapPin size={11} /><span style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.68rem]">{exp.location}</span></div>
                    <div className="flex items-center gap-1"><FiClock size={11} /><span style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.68rem]">{exp.duration}</span></div>
                  </div>
                </div>
              </div>
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <FiStar size={13} fill="#D9776B" color="#D9776B" />
                  <span style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.78rem] text-[#1A1208] font-semibold">{exp.rating}</span>
                </div>
                <div className="text-right">
                  <p style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.6rem] text-[#9E8A6A] uppercase tracking-wider">From</p>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-[1.1rem] text-[#1A1208] font-bold">{formatPrice(exp.price)}</p>
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