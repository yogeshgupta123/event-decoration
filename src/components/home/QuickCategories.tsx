import { Link } from 'react-router-dom'

const categories = [
  { label: 'Same Day', emoji: '⚡', bg: 'from-[#FFF3E0] to-[#FFE0B2]', to: '/shop?filter=same-day', badge: 'Today' },
  { label: 'Birthday', emoji: '🎂', bg: 'from-[#FCE4EC] to-[#F8BBD0]', to: '/shop?category=Birthday', badge: null },
  { label: 'Anniversary', emoji: '💍', bg: 'from-[#F3E5F5] to-[#E1BEE7]', to: '/shop?category=Anniversary', badge: null },
  { label: 'Flowers', emoji: '🌸', bg: 'from-[#E8F5E9] to-[#C8E6C9]', to: '/shop?category=Flowers', badge: null },
  { label: 'Experiences', emoji: '✨', bg: 'from-[#1A1208] to-[#2D1F0E]', to: '/experiences', badge: 'New', dark: true },
  { label: 'Personalised', emoji: '🎨', bg: 'from-[#E3F2FD] to-[#BBDEFB]', to: '/shop?category=Personalised', badge: null },
  { label: 'Plants', emoji: '🌿', bg: 'from-[#F1F8E9] to-[#DCEDC8]', to: '/shop?category=Plants', badge: null },
  { label: 'Decoration', emoji: '🎊', bg: 'from-[#FFF8E1] to-[#FFECB3]', to: '/services', badge: null },
  { label: 'Cakes', emoji: '🍰', bg: 'from-[#FCE4EC] to-[#F8BBD0]', to: '/shop?category=Cakes', badge: null },
  { label: 'Gifts For Him', emoji: '👔', bg: 'from-[#E8EAF6] to-[#C5CAE9]', to: '/shop?for=him', badge: null },
]

const QuickCategories = () => {
  return (
    <section className="bg-white py-8 border-b border-[#EDE0C4]">
      <div className="container mx-auto px-6">

        {/* Scrollable row */}
        <div className="flex items-start gap-5 overflow-x-auto scrollbar-hide pb-2">
          {categories.map((cat) => (
            <Link
              key={cat.label}
              to={cat.to}
              className="flex flex-col items-center gap-2.5 shrink-0 group"
            >
              {/* Icon Box */}
              <div className="relative">
                <div
                  className={`w-[72px] h-[72px] md:w-[80px] md:h-[80px] rounded-[20px] bg-gradient-to-br ${cat.bg} flex items-center justify-center shadow-[0_4px_12px_rgba(26,18,8,0.08)] group-hover:shadow-[0_8px_24px_rgba(26,18,8,0.15)] group-hover:-translate-y-1 transition-all duration-300`}
                >
                  <span className="text-[2rem] md:text-[2.2rem]">{cat.emoji}</span>
                </div>

                {/* Badge */}
                {cat.badge && (
                  <div className="absolute -top-1.5 -right-1.5 bg-[#D9776B] text-white rounded-full px-2 py-0.5">
                    <span style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.55rem] font-bold tracking-wide">
                      {cat.badge}
                    </span>
                  </div>
                )}
              </div>

              {/* Label */}
              <span
                style={{ fontFamily: "'Jost', sans-serif" }}
                className="text-[0.72rem] text-[#1A1208] font-medium text-center group-hover:text-[#C9A84C] transition-colors leading-tight max-w-[80px]"
              >
                {cat.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default QuickCategories