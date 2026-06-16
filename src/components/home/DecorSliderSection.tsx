import { Link } from 'react-router-dom'
import { FiArrowRight } from 'react-icons/fi'
import type { DecorSlider } from '../../data/decorSliders'
import FadeIn from '../animations/FadeIn'
import Slider from '../ui/Slider'
import PriceTag from '../ui/PriceTag'

// ============================================
// EK FUNCTION — 8 baar reuse hoga, alag data ke saath
// ============================================
const DecorSliderSection = ({ slider, bg = 'white' }: { slider: DecorSlider; bg?: 'white' | 'cream' }) => {
  return (
    <section className={`py-10 ${bg === 'white' ? 'bg-white' : 'bg-[#FDFAF4]'}`}>
      <div className="container mx-auto px-6">
        <FadeIn>
          <div className="flex items-center justify-between mb-6">
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-[1.6rem] md:text-[2rem] text-[#1A1208] font-semibold">
              {slider.emoji} {slider.heading}
            </h2>
            <Link to={slider.viewAllLink} style={{ fontFamily: "'Jost', sans-serif" }} className="flex items-center gap-1.5 text-[0.72rem] text-[#C9A84C] tracking-[0.15em] uppercase font-semibold hover:text-[#9A7A2E] transition-colors shrink-0">
              View All <FiArrowRight size={12} />
            </Link>
          </div>
        </FadeIn>

        <Slider>
          {slider.items.map((card) => (
            <div key={card.id} className="group shrink-0 w-[230px] bg-white rounded-2xl overflow-hidden shadow-[0_4px_16px_rgba(26,18,8,0.06)] hover:shadow-[0_16px_40px_rgba(201,168,76,0.25)] hover:-translate-y-2 transition-all duration-300">
              <div className="h-[150px] overflow-hidden">
                <img src={card.image} alt={card.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="p-4">
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-[1rem] text-[#1A1208] font-semibold mb-2 leading-snug">{card.title}</h3>
                <PriceTag price={card.price} size="sm" />
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  )
}

export default DecorSliderSection