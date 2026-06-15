import { Link } from 'react-router-dom'
import { FiArrowRight } from 'react-icons/fi'

const flowers = [
  {
    label: 'Roses',
    image: 'https://images.unsplash.com/photo-1487530811015-780deb85cf64?w=300',
    to: '/shop?category=Flowers&type=roses',
    color: '#FF6B6B',
  },
  {
    label: 'Carnations',
    image: 'https://images.unsplash.com/photo-1490750967868-88df5691cc43?w=300',
    to: '/shop?category=Flowers&type=carnations',
    color: '#FF8DC7',
  },
  {
    label: 'Orchids',
    image: 'https://images.unsplash.com/photo-1566907225472-514215c9e3b6?w=300',
    to: '/shop?category=Flowers&type=orchids',
    color: '#9B59B6',
  },
  {
    label: 'Sunflowers',
    image: 'https://images.unsplash.com/photo-1471694274638-49f889a76892?w=300',
    to: '/shop?category=Flowers&type=sunflowers',
    color: '#F39C12',
  },
  {
    label: 'Gerberas',
    image: 'https://images.unsplash.com/photo-1530092376999-2431865aa8df?w=300',
    to: '/shop?category=Flowers&type=gerberas',
    color: '#E74C3C',
  },
  {
    label: 'Lilies',
    image: 'https://images.unsplash.com/photo-1508610048659-a06b669e3321?w=300',
    to: '/shop?category=Flowers&type=lilies',
    color: '#8E44AD',
  },
]

const FlowerPicker = () => {
  return (
    <section className="section-padding bg-white">
      <div className="container mx-auto px-6">

        {/* Header */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <p style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.65rem] text-[#C9A84C] tracking-[0.3em] uppercase mb-1 font-semibold">
              Fresh & Beautiful
            </p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-[1.8rem] md:text-[2.4rem] text-[#1A1208] font-semibold leading-tight">
              Pick Their Fav Flowers
            </h2>
          </div>
          <Link
            to="/shop?category=Flowers"
            style={{ fontFamily: "'Jost', sans-serif" }}
            className="hidden sm:flex items-center gap-1.5 text-[0.72rem] text-[#C9A84C] hover:text-[#9A7A2E] tracking-wider uppercase font-semibold transition-colors"
          >
            View All <FiArrowRight size={13} />
          </Link>
        </div>

        {/* Flower Grid — scrollable horizontal */}
        <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
          {flowers.map((flower) => (
            <Link
              key={flower.label}
              to={flower.to}
              className="shrink-0 group flex flex-col items-center"
            >
              {/* Image Card */}
              <div
                className="w-[160px] md:w-[200px] h-[180px] md:h-[220px] rounded-[20px] overflow-hidden shadow-[0_4px_16px_rgba(26,18,8,0.08)] group-hover:shadow-[0_12px_32px_rgba(26,18,8,0.15)] group-hover:-translate-y-2 transition-all duration-400 bg-[#FDF6F0]"
              >
                <img
                  src={flower.image}
                  alt={flower.label}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Label */}
              <p
                style={{ fontFamily: "'Jost', sans-serif" }}
                className="text-[0.82rem] text-[#1A1208] font-medium mt-3 group-hover:text-[#C9A84C] transition-colors"
              >
                {flower.label}
              </p>
            </Link>
          ))}
        </div>

        {/* Mobile View All */}
        <div className="sm:hidden text-center mt-6">
          <Link
            to="/shop?category=Flowers"
            style={{ fontFamily: "'Jost', sans-serif" }}
            className="inline-flex items-center gap-2 border border-[#C9A84C] text-[#C9A84C] rounded-full px-6 py-2.5 text-[0.72rem] tracking-wider uppercase font-semibold"
          >
            View All Flowers <FiArrowRight size={12} />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default FlowerPicker