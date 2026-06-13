import { Link } from 'react-router-dom'

const CtaBanner = () => {
  return (
    // Dark luxury background — gold accents
    <section className="relative bg-[#1A1208] py-16 md:py-24 overflow-hidden">

      {/* ============================================
          DECORATIVE GLOW — gold blur circles
          background mein subtle glow effect
      ============================================ */}
      <div
        className="absolute top-0 left-1/4 w-[300px] h-[300px] rounded-full opacity-20"
        style={{ background: '#C9A84C', filter: 'blur(120px)' }}
      />
      <div
        className="absolute bottom-0 right-1/4 w-[300px] h-[300px] rounded-full opacity-15"
        style={{ background: '#C9A84C', filter: 'blur(120px)' }}
      />

      {/* Content */}
      <div className="container mx-auto px-6 relative z-10 text-center">

        {/* Small label */}
        <div className="inline-flex items-center gap-2 border border-[#C9A84C]/40 px-4 py-1.5 mb-6">
          <div className="w-1.5 h-1.5 rounded-full bg-[#C9A84C]" />
          <span style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.65rem] text-[#E8C97A] tracking-[0.25em]">
            LET'S CREATE SOMETHING BEAUTIFUL
          </span>
        </div>

        {/* Heading */}
        <h2
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
          className="text-[2.2rem] md:text-[3.4rem] text-white font-semibold leading-tight mb-4 max-w-[700px] mx-auto"
        >
          Ready to Make Your Next Moment{' '}
          <span className="italic text-[#F5E6B8]">Iconic?</span>
        </h2>

        {/* Description */}
        <p
          style={{ fontFamily: "'Jost', sans-serif" }}
          className="text-[0.9rem] text-white/60 max-w-[480px] mx-auto mb-10 leading-relaxed"
        >
          Join our happy clients who've experienced Together Moments for their most precious occasions.
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            to="/packages"
            style={{ fontFamily: "'Jost', sans-serif" }}
            className="bg-[#C9A84C] text-white px-9 py-4 text-[0.78rem] tracking-[0.2em] uppercase font-semibold hover:bg-[#E8C97A] hover:text-[#1A1208] transition-all"
          >
            Browse Packages
          </Link>
          <Link
            to="/contact"
            style={{ fontFamily: "'Jost', sans-serif" }}
            className="border border-white/30 text-white px-9 py-4 text-[0.78rem] tracking-[0.2em] uppercase font-semibold hover:bg-white hover:text-[#1A1208] transition-all"
          >
            Consult a Designer
          </Link>
        </div>

      </div>
    </section>
  )
}

export default CtaBanner