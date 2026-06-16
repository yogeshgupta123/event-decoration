import { Link } from 'react-router-dom'
import { shopItems } from '../../data/shopItems'
import { useAppDispatch } from '../../store/hooks'
import { addToCart } from '../../store/cartSlice'
import { showToast } from '../../store/uiSlice'
import Slider from './Slider'
import PriceTag from './PriceTag'

interface Props {
  excludeId?: number
  title?: string
}

// ============================================
// GIFT SLIDER — kahin bhi use ho sakta hai
// (PackageDetail, ExperienceDetail, ShopDetail mein add-on jaisa)
// ============================================
const GiftsSlider = ({ excludeId, title = '🎁 Add A Thoughtful Gift' }: Props) => {
  const dispatch = useAppDispatch()
  const gifts = shopItems.filter((g) => g.id !== excludeId).slice(0, 8)

  const handleQuickAdd = (gift: typeof gifts[number]) => {
    dispatch(addToCart({ id: gift.id, title: gift.title, category: gift.category, price: gift.price, image: gift.image }))
    dispatch(showToast({ message: `${gift.title} added to cart! 🎉` }))
  }

  return (
    <div className="mb-6">
      <h3 style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.7rem] text-[#1A1208] font-semibold tracking-[0.15em] uppercase mb-3">{title}</h3>
      <Slider>
        {gifts.map((gift) => (
          <div key={gift.id} className="shrink-0 w-[160px] bg-white rounded-xl p-3 shadow-[0_2px_8px_rgba(26,18,8,0.05)]">
            <Link to={`/shop/${gift.id}`}>
              <img src={gift.image} alt={gift.title} className="w-full h-[90px] rounded-lg object-cover mb-2" />
              <p style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.75rem] text-[#1A1208] font-medium leading-snug mb-1 truncate">{gift.title}</p>
            </Link>
            <div className="flex items-center justify-between">
<PriceTag
  price={gift.price}
  size="sm"
  discountPercent={20}
/>              <button onClick={() => handleQuickAdd(gift)} className="w-6 h-6 rounded-full bg-[#1A1208] text-white flex items-center justify-center hover:bg-[#C9A84C] transition-colors text-[0.8rem]">+</button>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  )
}

export default GiftsSlider