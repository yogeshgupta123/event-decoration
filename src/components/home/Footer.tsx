import { Link } from 'react-router-dom'
import { FiInstagram, FiFacebook, FiTwitter, FiMapPin, FiMail, FiPhone } from 'react-icons/fi'

const Footer = () => {
  return (
    <footer className="bg-[#1A1208] text-white pt-16 pb-8">
      <div className="container mx-auto px-6">

        {/* ============================================
            TOP GRID — 4 columns desktop, 1 column mobile
        ============================================ */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">

          {/* Column 1 — Brand */}
          <div>
            <Link to="/" className="flex flex-col leading-tight mb-4">
              <span style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-[1.4rem] text-[#C9A84C] font-bold tracking-[0.2em]">
                TOGETHER
              </span>
              <span style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.58rem] text-white tracking-[0.45em]">
                MOMENTS
              </span>
            </Link>
            <p style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.82rem] text-white/60 leading-relaxed mb-5">
              Crafting luxury moments across India with premium event decorations, curated gifts, and elite vendor partnerships.
            </p>

            {/* Social Icons */}
            {/* Social Icons */}
<div className="flex gap-3">
  <a href="#" className="w-9 h-9 flex items-center justify-center border border-white/15 hover:border-[#C9A84C] hover:text-[#C9A84C] transition-colors">
    <FiInstagram size={15} />
  </a>
  <a href="#" className="w-9 h-9 flex items-center justify-center border border-white/15 hover:border-[#C9A84C] hover:text-[#C9A84C] transition-colors">
    <FiFacebook size={15} />
  </a>
  <a href="#" className="w-9 h-9 flex items-center justify-center border border-white/15 hover:border-[#C9A84C] hover:text-[#C9A84C] transition-colors">
    <FiTwitter size={15} />
  </a>
</div>
          </div>

          {/* Column 2 — Quick Links */}
          <div>
            <h4 style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.75rem] text-[#C9A84C] tracking-[0.2em] uppercase mb-5">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {['About Us', 'Our Services', 'Vendor Network', 'Contact Us', 'FAQs'].map((item) => (
                <li key={item}>
                  <Link
                    to="/"
                    style={{ fontFamily: "'Jost', sans-serif" }}
                    className="text-[0.82rem] text-white/60 hover:text-[#C9A84C] transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Categories */}
          <div>
            <h4 style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.75rem] text-[#C9A84C] tracking-[0.2em] uppercase mb-5">
              Categories
            </h4>
            <ul className="space-y-3">
              {['Wedding Decor', 'Birthday Bash', 'Corporate Events', 'Engagements', 'Luxury Gifts'].map((item) => (
                <li key={item}>
                  <Link
                    to="/"
                    style={{ fontFamily: "'Jost', sans-serif" }}
                    className="text-[0.82rem] text-white/60 hover:text-[#C9A84C] transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 — Contact + Newsletter */}
          <div>
            <h4 style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.75rem] text-[#C9A84C] tracking-[0.2em] uppercase mb-5">
              Get In Touch
            </h4>

            <div className="space-y-3 mb-6">
              <div className="flex items-start gap-3">
                <FiMapPin size={15} color="#C9A84C" className="mt-0.5 shrink-0" />
                <span style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.82rem] text-white/60">
                  Connaught Place, New Delhi, India
                </span>
              </div>
              <div className="flex items-center gap-3">
                <FiPhone size={15} color="#C9A84C" />
                <span style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.82rem] text-white/60">
                  +91 98765 43210
                </span>
              </div>
              <div className="flex items-center gap-3">
                <FiMail size={15} color="#C9A84C" />
                <span style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.82rem] text-white/60">
                  hello@togethermoments.com
                </span>
              </div>
            </div>

            {/* Newsletter */}
            <div className="flex">
              <input
                type="email"
                placeholder="Email address"
                style={{ fontFamily: "'Jost', sans-serif" }}
                className="flex-1 bg-white/5 border border-white/15 px-4 py-2.5 text-[0.8rem] text-white placeholder-white/40 outline-none focus:border-[#C9A84C]"
              />
              <button
                style={{ fontFamily: "'Jost', sans-serif" }}
                className="bg-[#C9A84C] text-[#1A1208] px-5 text-[0.75rem] tracking-[0.1em] uppercase font-semibold hover:bg-[#E8C97A] transition-colors"
              >
                Join
              </button>
            </div>
          </div>

        </div>

        {/* ============================================
            BOTTOM BAR — copyright + legal links
        ============================================ */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-6">
          <p style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.75rem] text-white/40">
            © 2024 Together Moments. All rights reserved.
          </p>
          <div className="flex gap-6">
            {['Privacy Policy', 'Terms & Conditions', 'Cancellation Policy'].map((item) => (
              <Link
                key={item}
                to="/"
                style={{ fontFamily: "'Jost', sans-serif" }}
                className="text-[0.75rem] text-white/40 hover:text-[#C9A84C] transition-colors"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>

      </div>
    </footer>
  )
}

export default Footer