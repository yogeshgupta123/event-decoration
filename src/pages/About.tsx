import { Link } from 'react-router-dom'
import { FiAward, FiUsers, FiMapPin, FiHeart } from 'react-icons/fi'

const team = [
  { name: 'Arjun Kapoor', role: 'Founder & CEO', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200' },
  { name: 'Priya Nair', role: 'Head of Design', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200' },
  { name: 'Rohan Singh', role: 'Vendor Relations', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200' },
]

const values = [
  { icon: FiAward, title: 'Excellence', desc: 'Every detail matters. We curate only the finest vendors and themes.' },
  { icon: FiHeart, title: 'Passion', desc: 'We genuinely love celebrations and it shows in every event we touch.' },
  { icon: FiUsers, title: 'Trust', desc: 'Background-verified vendors, transparent pricing, no hidden charges.' },
  { icon: FiMapPin, title: 'Reach', desc: '50+ cities, 500+ vendors, 10,000+ celebrations and counting.' },
]

const About = () => {
  return (
    <div className="bg-[#FDFAF4]">

      {/* HERO */}
      <section className="relative h-[380px] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1400')` }} />
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 container mx-auto px-6">
          <p style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.7rem] text-[#E8C97A] tracking-[0.3em] uppercase mb-3">Our Story</p>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-[2.6rem] md:text-[3.6rem] text-white font-semibold leading-tight max-w-[600px]">
            Creating Moments,<br /><span className="italic text-[#F5E6B8]">One Celebration at a Time</span>
          </h1>
        </div>
      </section>

      {/* STORY */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.7rem] text-[#C9A84C] tracking-[0.25em] uppercase mb-3">Who We Are</p>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-[2rem] md:text-[2.4rem] text-[#1A1208] font-semibold mb-6 leading-tight">
                India's Most Trusted Event Decoration Platform
              </h2>
              <p style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.85rem] text-[#5C4A1E] leading-relaxed mb-4">
                Together Moments was born from a simple belief — every celebration deserves to be extraordinary. Founded in 2020, we set out to bridge the gap between clients and premium event decorators across India.
              </p>
              <p style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.85rem] text-[#5C4A1E] leading-relaxed mb-8">
                Today, we are home to 500+ verified vendors, covering weddings, birthdays, corporate events, and engagements across 50+ cities. Our team of passionate event specialists ensures every moment is crafted with love and precision.
              </p>
              <Link to="/services" style={{ fontFamily: "'Jost', sans-serif" }} className="inline-block bg-[#1A1208] text-white rounded-full px-8 py-4 text-[0.75rem] tracking-[0.2em] uppercase font-semibold hover:bg-[#C9A84C] transition-colors">
                Explore Our Services
              </Link>
            </div>
            <div className="relative">
              <img src="https://images.unsplash.com/photo-1530023367847-a683933f4172?w=700" alt="About" className="w-full h-[400px] object-cover rounded-2xl shadow-[0_8px_40px_rgba(26,18,8,0.1)]" />
              <div className="absolute -bottom-5 -left-5 bg-[#C9A84C] text-white p-5 rounded-2xl hidden sm:block">
                <p style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-[2rem] font-bold">4+</p>
                <p style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.65rem] tracking-[0.2em] uppercase">Years of Excellence</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="section-padding bg-[#FDFAF4]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-[2rem] md:text-[2.6rem] text-[#1A1208] font-semibold mb-2">Our Values</h2>
            <div className="w-10 h-[1px] bg-[#C9A84C] mx-auto mt-4" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <div key={v.title} className="bg-white rounded-2xl p-7 text-center shadow-[0_4px_16px_rgba(26,18,8,0.06)] hover:shadow-[0_16px_40px_rgba(201,168,76,0.2)] hover:-translate-y-2 transition-all duration-300">
                <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: i % 2 === 0 ? '#FFF8EC' : '#FDF0EE' }}>
                  <v.icon size={22} color={i % 2 === 0 ? '#C9A84C' : '#D9776B'} />
                </div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-[1.2rem] text-[#1A1208] font-semibold mb-2">{v.title}</h3>
                <p style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.8rem] text-[#9E8A6A] leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-[2rem] md:text-[2.6rem] text-[#1A1208] font-semibold mb-2">Meet The Team</h2>
            <div className="w-10 h-[1px] bg-[#C9A84C] mx-auto mt-4" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-[700px] mx-auto">
            {team.map((member) => (
              <div key={member.name} className="text-center">
                <img src={member.image} alt={member.name} className="w-24 h-24 rounded-full object-cover mx-auto mb-4 ring-4 ring-[#EDE0C4]" />
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-[1.1rem] text-[#1A1208] font-semibold">{member.name}</h3>
                <p style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.72rem] text-[#C9A84C] tracking-[0.15em] uppercase mt-1">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default About