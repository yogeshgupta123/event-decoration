import { Link } from 'react-router-dom'
import { useAppSelector } from '../../store/hooks'
import Slider from '../ui/Slider'

const formatPrice = (price: number) => `₹${price.toLocaleString('en-IN')}`

const RecentlyViewed = () => {
  const items = useAppSelector((state) => state.recentlyViewed.items)
  if (items.length === 0) return null

  return (
    <section className="py-8 bg-white border-t border-[#EDE0C4]">
      <div className="container mx-auto px-6">
        <h3 style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.72rem] text-[#1A1208] font-semibold tracking-[0.15em] uppercase mb-4">
          Recently Viewed
        </h3>
        <Slider>
          {items.map((item) => (
            <Link key={item.id} to={item.path} className="shrink-0 w-[150px] bg-[#FDFAF4] rounded-xl p-2.5 hover:shadow-[0_4px_16px_rgba(26,18,8,0.08)] transition-shadow">
              <img src={item.image} alt={item.title} className="w-full h-[90px] rounded-lg object-cover mb-2" />
              <p style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.72rem] text-[#1A1208] font-medium leading-snug mb-0.5 truncate">{item.title}</p>
              <p style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.72rem] text-[#C9A84C] font-semibold">{formatPrice(item.price)}</p>
            </Link>
          ))}
        </Slider>
      </div>
    </section>
  )
}

export default RecentlyViewed