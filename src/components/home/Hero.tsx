import { Link } from 'react-router-dom'
import FadeIn from '../animations/FadeIn'

const Hero = () => {
  return (
    <section className="relative h-[500px] md:h-[600px] flex items-center overflow-hidden">

      <img
        src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1600"
        alt="Luxury Event Decoration"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-black/45" />

      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(to top, rgba(154,122,46,0.5) 0%, transparent 60%)' }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-[600px]">

          {/* Badge */}
          <FadeIn delay={0.1}>
            <div className="inline-flex items-center gap-2 border border-[#C9A84C]/50 px-4 py-1.5 mb-6">
              <div className="w-1.5 h-1.5 rounded-full bg-[#C9A84C]" />
              <span style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.65rem] text-[#F5E6B8] tracking-[0.25em]">
                PREMIUM EVENT DECORATIONS
              </span>
            </div>
          </FadeIn>

          {/* Heading */}
          <FadeIn delay={0.2}>
            <h1
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
              className="text-[2.6rem] md:text-[4rem] text-white font-semibold leading-[1.1] mb-5"
            >
              Crafting{' '}
              <span className="italic text-[#F5E6B8]">Eternal</span>
              <br />
              Memories
            </h1>
          </FadeIn>

          {/* Description */}
          <FadeIn delay={0.3}>
            <p
              style={{ fontFamily: "'Jost', sans-serif" }}
              className="text-[0.92rem] text-white/80 leading-relaxed mb-8 max-w-[460px]"
            >
              Discover our exclusive range of luxury event decoration packages,
              curated for life's most precious celebrations.
            </p>
          </FadeIn>

          {/* CTA Buttons */}
          <FadeIn delay={0.4}>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/services"
                style={{ fontFamily: "'Jost', sans-serif" }}
                className="bg-[#C9A84C] text-white px-8 py-4 text-[0.78rem] tracking-[0.2em] uppercase font-semibold hover:bg-[#E8C97A] hover:text-[#1A1208] transition-all rounded-full"
              >
                Book My Decor
              </Link>
              <Link
                to="/vendors"
                style={{ fontFamily: "'Jost', sans-serif" }}
                className="border border-white/40 text-white px-8 py-4 text-[0.78rem] tracking-[0.2em] uppercase font-semibold hover:bg-white hover:text-[#1A1208] transition-all rounded-full"
              >
                Find Vendors
              </Link>
            </div>
          </FadeIn>

        </div>
      </div>
    </section>
  )
}

export default Hero