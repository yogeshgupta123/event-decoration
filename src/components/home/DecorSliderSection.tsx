import { Link } from 'react-router-dom'
import { FiArrowRight } from 'react-icons/fi'
import type { DecorSlider } from '../../data/decorSliders'
import FadeIn from '../animations/FadeIn'
import Slider from '../ui/Slider'
import PriceTag from '../ui/PriceTag'

const DecorSliderSection = ({
  slider,
  bg = 'white',
}: {
  slider: DecorSlider
  bg?: 'white' | 'cream'
}) => {
  return (
    <section
      className={`py-10 ${
        bg === 'white' ? 'bg-white' : 'bg-[#FDFAF4]'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <FadeIn>
          <div className="flex items-center justify-between gap-3 mb-6">
            <h2
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
              className="truncate flex-1 text-[1.25rem] md:text-[2rem] text-[#1A1208] font-semibold"
            >
              {slider.emoji} {slider.heading}
            </h2>

            <Link
              to={slider.viewAllLink}
              style={{ fontFamily: "'Jost', sans-serif" }}
              className="flex items-center gap-1.5 text-[0.72rem] text-[#C9A84C] tracking-[0.15em] uppercase font-semibold hover:text-[#9A7A2E] transition-colors shrink-0"
            >
              View All
              <FiArrowRight size={12} />
            </Link>
          </div>
        </FadeIn>

        <Slider>
          {slider.items.map((card) => (
            <Link
              key={card.id}
              to={`/experience/${card.id}`}
              className="group shrink-0 w-[180px] sm:w-[220px] lg:w-[280px]"
            >
              <div className="h-[320px] sm:h-[390px] lg:h-[395px] flex flex-col relative overflow-hidden rounded-[24px] bg-white border border-[#F3E7CC] shadow-[0_8px_30px_rgba(26,18,8,0.06)] hover:shadow-[0_20px_60px_rgba(201,168,76,0.18)] transition-all duration-500 hover:-translate-y-2">
                
                {/* Image */}
                <div className="relative h-[210px] sm:h-[260px] lg:h-[280px] overflow-hidden flex-shrink-0">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                  {/* Badge */}
                  <div className="absolute top-4 left-4">
                    <span
                      style={{ fontFamily: "'Jost', sans-serif" }}
                      className="px-3 py-1 rounded-full bg-white/90 backdrop-blur text-[10px] tracking-[0.18em] uppercase text-[#1A1208] font-semibold"
                    >
                      Premium
                    </span>
                  </div>

                  {/* Arrow */}
                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-500">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-lg">
                      <FiArrowRight
                        size={16}
                        className="text-[#1A1208]"
                      />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 flex flex-col gap-3 min-w-0">
                  <h3
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                    className="truncate text-[1rem] lg:text-[1.2rem] text-[#1A1208] font-semibold"
                    title={card.title}
                  >
                    {card.title}
                  </h3>

                  <div className="flex items-center justify-between">
                    <PriceTag
                      price={card.price}
                      size="sm"
                    />

                    <span
                      style={{ fontFamily: "'Jost', sans-serif" }}
                      className="text-[11px] uppercase tracking-[0.18em] text-[#C9A84C] font-semibold"
                    >
                      Explore
                    </span>
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

export default DecorSliderSection