import { showToast } from '../store/uiSlice'
import AddOnModal from '../components/ui/AddOnModal'
import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { FiStar,  FiShoppingBag, FiCheck, FiChevronLeft, FiMinus, FiX , FiPlus, FiTruck, FiShield } from 'react-icons/fi'
import { useAppDispatch } from '../store/hooks'
import { addToCart, increaseQuantity } from '../store/cartSlice'
import { shopItems } from '../data/shopItems'
import { StaggerContainer, StaggerItem } from '../components/animations/StaggerContainer'
 import WishlistButton from '../components/ui/WishlistButton'
 
const formatPrice = (price: number) => `₹${price.toLocaleString('en-IN')}`

const ShopDetail = () => {
  const { id } = useParams()
  const dispatch = useAppDispatch()

  const item = shopItems.find((p) => p.id === Number(id))

  const [activeImage, setActiveImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [selectedAddOns, setSelectedAddOns] = useState<number[]>([])
  const [showAddOnModal, setShowAddOnModal] = useState(false)
  const [added, setAdded] = useState(false)

  // ============================================
  // AGAR ITEM NA MILE — friendly message dikhao
  // ============================================
  if (!item) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-[#FDFAF4]">
        <div className="text-center">
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-[2rem] text-[#1A1208] mb-4">
            Product not found
          </h2>
          <Link to="/shop" style={{ fontFamily: "'Jost', sans-serif" }} className="text-[#C9A84C] underline">
            Back to Shop
          </Link>
        </div>
      </div>
    )
  }

  // ============================================
  // ADD-ON TOGGLE — select/deselect karo
  // ============================================
  const toggleAddOn = (addOnId: number) => {
    if (selectedAddOns.includes(addOnId)) {
      setSelectedAddOns(selectedAddOns.filter((id) => id !== addOnId))
    } else {
      setSelectedAddOns([...selectedAddOns, addOnId])
    }
  }

  // ============================================
  // PRICE CALCULATION
  // selected add-ons ke prices jodo
  // ============================================
  const addOnsTotal = item.addOns
    .filter((a) => selectedAddOns.includes(a.id))
    .reduce((sum, a) => sum + a.price, 0)

  const totalPrice = item.price * quantity + addOnsTotal

  // ============================================
  // ADD TO CART
  // 1. Main product ko quantity ke hisaab se add karo
  // 2. Har selected add-on ko alag item ki tarah add karo
  // ============================================
  const handleAddToCart = () => {
    // Main item add karo
    dispatch(addToCart({
      id: item.id,
      title: item.title,
      category: item.category,
      price: item.price,
      image: item.image,
    }))
dispatch(showToast({ message: `${item.title} added to cart with add-ons! 🎁` }))

    // Quantity 1 se zyada hai toh baaki increase kar do
    for (let i = 1; i < quantity; i++) {
      dispatch(increaseQuantity(item.id))
    }

    // Selected add-ons ko alag cart items ki tarah add karo
    selectedAddOns.forEach((addOnId) => {
      const addOn = item.addOns.find((a) => a.id === addOnId)
      if (addOn) {
        dispatch(addToCart({
          id: addOn.id,
          title: addOn.name,
          category: 'Add-on',
          price: addOn.price,
          image: addOn.image,
        }))
      }
    })

    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  // ============================================
  // RELATED ITEMS — same category, current item chhod ke
  // ============================================
  const relatedItems = shopItems
    .filter((p) => p.category === item.category && p.id !== item.id)
    .slice(0, 4)

  return (
    <div className="bg-[#FDFAF4] pb-16">

      {/* BREADCRUMB */}
      <div className="bg-white border-b border-[#EDE0C4] py-4">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-2">
            <Link to="/shop" style={{ fontFamily: "'Jost', sans-serif" }} className="flex items-center gap-1 text-[0.78rem] text-[#9E8A6A] hover:text-[#C9A84C] transition-colors">
              <FiChevronLeft size={14} /> Shop
            </Link>
            <span className="text-[#EDE0C4]">/</span>
            <span style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.78rem] text-[#9E8A6A]">{item.category}</span>
            <span className="text-[#EDE0C4]">/</span>
            <span style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.78rem] text-[#D9776B]">{item.title}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* LEFT — Images */}
          <div>
            <div className="relative h-[360px] md:h-[440px] rounded-2xl overflow-hidden mb-4 shadow-[0_8px_40px_rgba(26,18,8,0.1)]">
              <img src={item.images[activeImage]} alt={item.title} className="w-full h-full object-cover" />
             <div className="absolute top-4 right-4">
  <WishlistButton item={{ id: item.id, title: item.title, category: item.category, price: item.price, image: item.image, type: 'shop' }} size={16} className="w-10 h-10" />
</div>
            </div>

            <div className="flex gap-3">
              {item.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`h-[80px] flex-1 rounded-xl overflow-hidden border-2 transition-all ${activeImage === i ? 'border-[#C9A84C]' : 'border-transparent'}`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-2 gap-3 mt-6">
              <div className="bg-white rounded-xl p-3 flex items-center gap-2.5 shadow-[0_2px_8px_rgba(26,18,8,0.05)]">
                <FiTruck size={18} color="#C9A84C" />
                <div>
                  <p style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.75rem] text-[#1A1208] font-semibold">Same Day Delivery</p>
                  <p style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.65rem] text-[#9E8A6A]">Order before 4 PM</p>
                </div>
              </div>
              <div className="bg-white rounded-xl p-3 flex items-center gap-2.5 shadow-[0_2px_8px_rgba(26,18,8,0.05)]">
                <FiShield size={18} color="#C9A84C" />
                <div>
                  <p style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.75rem] text-[#1A1208] font-semibold">Quality Assured</p>
                  <p style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.65rem] text-[#9E8A6A]">100% Fresh Products</p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT — Info */}
          <div>
            <p style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.65rem] text-[#D9776B] tracking-[0.25em] uppercase font-semibold mb-2">
              {item.category} · {item.subcategory}
            </p>
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-[2rem] md:text-[2.6rem] text-[#1A1208] font-semibold leading-tight mb-4">
              {item.title}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-5">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <FiStar key={i} size={14} fill={i < Math.floor(item.rating) ? '#D9776B' : 'none'} color={i < Math.floor(item.rating) ? '#D9776B' : '#EDE0C4'} />
                ))}
              </div>
              <span style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.82rem] text-[#1A1208] font-semibold">{item.rating}</span>
              <span style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.78rem] text-[#9E8A6A]">({item.reviews} reviews)</span>
            </div>

            {/* Description */}
            <p style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.85rem] text-[#5C4A1E] leading-relaxed mb-6">
              {item.description}
            </p>

            {/* Price */}
            <div className="flex items-baseline gap-2 mb-6">
              <span style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-[2rem] text-[#1A1208] font-bold">
                {formatPrice(item.price)}
              </span>
              <span style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.7rem] text-[#9E8A6A]">+ delivery charges</span>
            </div>

            {/* Quantity Selector */}
            <div className="mb-6">
              <h3 style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.7rem] text-[#1A1208] font-semibold tracking-[0.15em] uppercase mb-3">
                Quantity
              </h3>
              <div className="flex items-center gap-3 bg-white rounded-full px-4 py-2 w-fit shadow-[0_2px_8px_rgba(26,18,8,0.05)]">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-[#FDFAF4] transition-colors"
                >
                  <FiMinus size={13} />
                </button>
                <span style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.9rem] text-[#1A1208] font-semibold w-6 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-[#FDFAF4] transition-colors"
                >
                  <FiPlus size={13} />
                </button>
              </div>
            </div>

            {/* ============================================
                ADD-ONS SECTION — checkbox cards
            ============================================ */}
          {/* ============================================
    CUSTOMIZE — "+" se modal khulta hai
============================================ */}
<div className="bg-white rounded-2xl p-5 shadow-[0_4px_16px_rgba(26,18,8,0.05)] mb-6">
  <div className="flex items-center justify-between mb-3">
    <div>
      <h3 style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.72rem] text-[#1A1208] font-semibold tracking-[0.15em] uppercase">Make It Extra Special</h3>
      <p style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.72rem] text-[#9E8A6A] mt-1">Add a card, teddy bear, chocolates & more</p>
    </div>
    <button onClick={() => setShowAddOnModal(true)} className="w-9 h-9 rounded-full bg-[#C9A84C] text-white flex items-center justify-center hover:bg-[#1A1208] transition-colors shrink-0">
      <FiPlus size={18} />
    </button>
  </div>

  {selectedAddOns.length > 0 && (
    <div className="flex flex-wrap gap-2 pt-3 border-t border-[#EDE0C4]">
      {selectedAddOns.map((addOnId) => {
        const addOn = item.addOns.find((a) => a.id === addOnId)
        if (!addOn) return null
        return (
          <div key={addOnId} style={{ fontFamily: "'Jost', sans-serif" }} className="flex items-center gap-2 bg-[#FDFAF4] rounded-full pl-3 pr-1.5 py-1.5 text-[0.72rem] text-[#1A1208]">
            {addOn.name}
            <button onClick={() => toggleAddOn(addOnId)} className="w-5 h-5 rounded-full bg-[#EDE0C4] flex items-center justify-center hover:bg-[#D9776B] hover:text-white transition-colors">
              <FiX size={11} />
            </button>
          </div>
        )
      })}
    </div>
  )}
</div>

            {/* ============================================
                TOTAL + ADD TO CART
            ============================================ */}
            <div className="bg-white rounded-2xl p-5 shadow-[0_4px_16px_rgba(26,18,8,0.06)]">

              {/* Price Breakdown */}
              <div className="space-y-2 mb-4 pb-4 border-b border-[#EDE0C4]">
                <div className="flex justify-between">
                  <span style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.8rem] text-[#5C4A1E]">
                    {item.title} x {quantity}
                  </span>
                  <span style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.8rem] text-[#1A1208] font-medium">
                    {formatPrice(item.price * quantity)}
                  </span>
                </div>
                {selectedAddOns.map((addOnId) => {
                  const addOn = item.addOns.find((a) => a.id === addOnId)
                  if (!addOn) return null
                  return (
                    <div key={addOnId} className="flex justify-between">
                      <span style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.78rem] text-[#9E8A6A]">
                        + {addOn.name}
                      </span>
                      <span style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.78rem] text-[#9E8A6A]">
                        {formatPrice(addOn.price)}
                      </span>
                    </div>
                  )
                })}
              </div>

              {/* Total */}
              <div className="flex items-center justify-between mb-4">
                <span style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.85rem] text-[#1A1208] font-semibold">
                  Total
                </span>
                <span style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-[1.8rem] text-[#1A1208] font-bold">
                  {formatPrice(totalPrice)}
                </span>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                style={{ fontFamily: "'Jost', sans-serif" }}
                className={`w-full flex items-center justify-center gap-2 rounded-full py-4 text-[0.78rem] tracking-[0.15em] uppercase font-semibold transition-all ${
                  added ? 'bg-green-500 text-white' : 'bg-[#C9A84C] text-white hover:bg-[#1A1208]'
                }`}
              >
                {added ? (
                  <><FiCheck size={16} /> Added to Cart!</>
                ) : (
                  <><FiShoppingBag size={16} /> Add to Cart</>
                )}
              </button>
            </div>

          </div>
        </div>

        {/* ============================================
            RELATED PRODUCTS
        ============================================ */}
        {relatedItems.length > 0 && (
          <div className="mt-16">
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-[1.8rem] text-[#1A1208] font-semibold mb-8">
              You May Also Like
            </h2>
            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedItems.map((related) => (
                <StaggerItem key={related.id}>
                  <Link
                    to={`/shop/${related.id}`}
                    className="group block bg-white rounded-2xl overflow-hidden shadow-[0_4px_16px_rgba(26,18,8,0.06)] hover:shadow-[0_16px_40px_rgba(201,168,76,0.25)] hover:-translate-y-2 transition-all duration-300"
                  >
                    <div className="relative h-[160px] overflow-hidden">
                      <img src={related.image} alt={related.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    </div>
                    <div className="p-4">
                      <h3 style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-[1rem] text-[#1A1208] font-semibold mb-1 leading-snug">
                        {related.title}
                      </h3>
                      <p style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.9rem] text-[#C9A84C] font-semibold">
                        {formatPrice(related.price)}
                      </p>
                    </div>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        )}
      </div>
      {/* ADD-ON MODAL */}
      {showAddOnModal && (
        <AddOnModal
          addOns={item.addOns}
          selectedAddOns={selectedAddOns}
          onToggle={toggleAddOn}
          onClose={() => setShowAddOnModal(false)}
        />
      )}
    </div>
  )
}

export default ShopDetail