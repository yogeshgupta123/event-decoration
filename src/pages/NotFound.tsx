import { Link } from 'react-router-dom'
import { FiHome, FiCompass } from 'react-icons/fi'

const NotFound = () => {
  return (
    <div className="bg-[#FDFAF4] min-h-[70vh] flex items-center justify-center px-6">
      <div className="text-center max-w-[480px]">
        <p style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-[6rem] md:text-[8rem] text-[#C9A84C] font-bold leading-none mb-2">
          404
        </p>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-[1.8rem] md:text-[2.2rem] text-[#1A1208] font-semibold mb-3">
          This Page Wandered Off
        </h1>
        <p style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.85rem] text-[#9E8A6A] leading-relaxed mb-8">
          Looks like this page took a detour. Let's get you back to planning something beautiful.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            to="/"
            style={{ fontFamily: "'Jost', sans-serif" }}
            className="inline-flex items-center gap-2 bg-[#C9A84C] text-white rounded-full px-8 py-4 text-[0.75rem] tracking-[0.2em] uppercase font-semibold hover:bg-[#1A1208] transition-colors"
          >
            <FiHome size={14} /> Back to Home
          </Link>
          <Link
            to="/services"
            style={{ fontFamily: "'Jost', sans-serif" }}
            className="inline-flex items-center gap-2 border border-[#1A1208] text-[#1A1208] rounded-full px-8 py-4 text-[0.75rem] tracking-[0.2em] uppercase font-semibold hover:bg-[#1A1208] hover:text-white transition-colors"
          >
            <FiCompass size={14} /> Explore Packages
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NotFound