import { Link } from 'react-router-dom'
import { FiArrowRight, FiPlus } from 'react-icons/fi'
import { useAppDispatch } from '../../store/hooks'
import { addToCart } from '../../store/cartSlice'
import { showToast } from '../../store/uiSlice'

const gifts = [
  {
    id: 1,
    title: 'Luxury Red Roses',
    price: 799,
    image: 'https://images.unsplash.com/photo-1519378058457-4c29a0a2efac?w=800',
    category: 'Flowers',
  },
  {
    id: 2,
    title: 'Premium Chocolate Box',
    price: 999,
    image: 'https://images.unsplash.com/photo-1511381939415-e44015466834?w=800',
    category: 'Chocolates',
  },
  {
    id: 3,
    title: 'Romantic Teddy Bear',
    price: 699,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800',
    category: 'Teddy',
  },
  {
    id: 4,
    title: 'White Lily Bouquet',
    price: 1199,
    image: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=800',
    category: 'Flowers',
  },
  {
    id: 5,
    title: 'Indoor Lucky Plant',
    price: 899,
    image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=800',
    category: 'Plants',
  },
  {
    id: 6,
    title: 'Anniversary Gift Hamper',
    price: 1499,
    image: 'https://images.unsplash.com/photo-1512909006721-3d6018887383?w=800',
    category: 'Gift Hamper',
  },
]

const formatPrice = (price: number) =>
  `₹${price.toLocaleString('en-IN')}`

const GiftPicker = () => {
  const dispatch = useAppDispatch()

  const handleAddGift = (gift: typeof gifts[number]) => {
    dispatch(
      addToCart({
        id: gift.id,
        title: gift.title,
        category: gift.category,
        price: gift.price,
        image: gift.image,
      })
    )

    dispatch(
      showToast({
        message: `${gift.title} added to cart 🎁`,
        type: 'success',
      })
    )
  }

  return (
    <section className="py-14 md:py-20 bg-gradient-to-b from-white to-[#FDFAF4] overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8 md:mb-10">
          <div>
            <p
              style={{ fontFamily: "'Jost', sans-serif" }}
              className="text-[0.7rem] text-[#C9A84C] tracking-[0.28em] uppercase mb-2 font-semibold"
            >
              Thoughtful Add-Ons
            </p>

            <h2
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
              className="text-[2rem] md:text-[3rem] text-[#1A1208] font-semibold leading-none"
            >
              Add A Gift They'll
              <br />
              Never Forget 🎁
            </h2>
          </div>

          <Link
            to="/shop"
            style={{ fontFamily: "'Jost', sans-serif" }}
            className="hidden sm:flex items-center gap-2 text-[0.72rem] text-[#C9A84C] hover:text-[#9A7A2E] tracking-[0.18em] uppercase font-semibold transition-colors"
          >
            View All
            <FiArrowRight size={14} />
          </Link>
        </div>

        {/* Slider */}
        <div className="flex gap-4 md:gap-6 overflow-x-auto scrollbar-hide pb-2">
          {gifts.map((gift) => (
            <div
              key={gift.id}
              className="
                group
                relative
                shrink-0
                w-[210px]
                sm:w-[250px]
                md:w-[280px]
                rounded-[28px]
                overflow-hidden
                border
                border-[#F1E4C5]
                bg-white
                shadow-[0_10px_30px_rgba(26,18,8,0.08)]
                hover:shadow-[0_25px_60px_rgba(201,168,76,0.22)]
                transition-all
                duration-500
                hover:-translate-y-2
              "
            >
              {/* Image */}
              <div className="relative h-[220px] overflow-hidden">
                <img
                  src={gift.image}
                  alt={gift.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1208]/70 via-transparent to-transparent" />

                <span
                  style={{ fontFamily: "'Jost', sans-serif" }}
                  className="
                    absolute
                    top-4
                    left-4
                    px-3
                    py-1.5
                    rounded-full
                    bg-white/90
                    backdrop-blur
                    text-[#1A1208]
                    text-[9px]
                    tracking-[0.18em]
                    uppercase
                    font-semibold
                  "
                >
                  {gift.category}
                </span>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  className="text-[1.35rem] text-[#1A1208] font-semibold leading-tight mb-3"
                >
                  {gift.title}
                </h3>

                <div className="flex items-center justify-between">
                  <div>
                    <p
                      style={{ fontFamily: "'Jost', sans-serif" }}
                      className="text-[10px] uppercase tracking-[0.15em] text-[#9E8A6A]"
                    >
                      Starting From
                    </p>

                    <p
                      style={{ fontFamily: "'Cormorant Garamond', serif" }}
                      className="text-[1.5rem] font-bold text-[#1A1208]"
                    >
                      {formatPrice(gift.price)}
                    </p>
                  </div>

                  <button
                    onClick={() => handleAddGift(gift)}
                    style={{ fontFamily: "'Jost', sans-serif" }}
                    className="
                      flex
                      items-center
                      gap-2
                      px-4
                      py-2.5
                      rounded-full
                      bg-[#1A1208]
                      text-white
                      text-[11px]
                      uppercase
                      tracking-[0.12em]
                      font-semibold
                      hover:bg-[#C9A84C]
                      transition-colors
                    "
                  >
                    <FiPlus size={13} />
                    Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile CTA */}
        <div className="sm:hidden text-center mt-8">
          <Link
            to="/shop"
            style={{ fontFamily: "'Jost', sans-serif" }}
            className="
              inline-flex
              items-center
              gap-2
              px-6
              py-3
              rounded-full
              border
              border-[#C9A84C]
              text-[#C9A84C]
              text-[0.72rem]
              uppercase
              tracking-[0.18em]
              font-semibold
            "
          >
            View All Gifts
            <FiArrowRight size={12} />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default GiftPicker