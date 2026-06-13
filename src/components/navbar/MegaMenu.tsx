import { Link } from 'react-router-dom'

interface Category {
  title: string
  items: string[]
}

interface MegaMenuProps {
  categories: Category[]
  label: string
}

// ============================================
// Mega menu ka label aur Services page ka
// category match karne ke liye
// ============================================
const categoryMap: Record<string, string> = {
  Weddings: 'Wedding',
  Birthday: 'Birthday',
  Corporate: 'Corporate',
  Engagement: 'Engagement',
}

const MegaMenu = ({ categories, label }: MegaMenuProps) => {
  return (
    <div
      className="absolute left-0 right-0 bg-white border-t border-[#EDE0C4]"
      style={{ boxShadow: '0 20px 40px rgba(201,168,76,0.12)' }}
    >
      <div className="container mx-auto px-8 py-12">

        {/* Title */}
        <div className="mb-10">
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.6rem', color: '#C9A84C', fontWeight: 600 }}>
            {label}
          </span>
          <div className="w-12 h-[1px] bg-[#C9A84C] mt-2" />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-4 gap-12">
          {categories.map((category) => (
            <div key={category.title}>
              <h3
                className="text-[#9E8A6A] text-[0.62rem] font-semibold tracking-[0.3em] uppercase mb-5 pb-3 border-b border-[#EDE0C4]"
                style={{ fontFamily: "'Jost', sans-serif" }}
              >
                {category.title}
              </h3>
              <ul className="space-y-4">
                {category.items.map((item) => (
                  <li key={item}>
                    <button
                      className="text-[#5C4A1E] text-[0.83rem] hover:text-[#C9A84C] transition-all duration-200 text-left w-full group flex items-center gap-2"
                      style={{ fontFamily: "'Jost', sans-serif", lineHeight: '1.8' }}
                    >
                      <span className="w-0 group-hover:w-3 h-[1.5px] bg-[#C9A84C] transition-all duration-300 shrink-0 rounded" />
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-[#EDE0C4] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-1 h-1 rounded-full bg-[#C9A84C]" />
            <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.65rem', color: '#9E8A6A', letterSpacing: '0.25em' }}>
              PREMIUM EVENT EXPERIENCES
            </p>
          </div>
          <Link
            to={`/services?category=${categoryMap[label] || label}`}
            className="text-[0.7rem] text-[#C9A84C] tracking-widest uppercase hover:text-[#9A7A2E] transition-colors flex items-center gap-2"
            style={{ fontFamily: "'Jost', sans-serif" }}
          >
            View All {label} Services →
          </Link>
        </div>
      </div>
    </div>
  )
}

export default MegaMenu