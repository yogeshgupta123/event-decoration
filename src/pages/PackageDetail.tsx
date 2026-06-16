import { useState , useEffect  } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { FiStar, FiMapPin, FiClock, FiUsers, FiHeart, FiCheck, FiChevronLeft, FiPlus, FiX } from 'react-icons/fi'
import { useAppDispatch } from '../store/hooks'
import { addToCart } from '../store/cartSlice'
import { showToast } from '../store/uiSlice'
import { shopItems } from '../data/shopItems'
import Slider from '../components/ui/Slider'
import ReviewsSection from '../components/ui/ReviewsSection'
import AddOnModal from '../components/ui/AddOnModal'
import { addRecentlyViewed } from '../store/recentlyViewedSlice'


const allPackages = [
  { id: 1, title: 'Royal Rose Terrace', category: 'Wedding', price: 154999, image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800', badge: 'Best Seller', rating: 4.9, reviews: 124, duration: '8-10 hours', guests: 'Up to 500', location: 'Pan India', description: 'A breathtaking royal-themed wedding decoration featuring fresh roses, gold accents, and ornate stage setup. Perfect for a grand celebration that will be remembered for years.', includes: ['Stage & Mandap Setup', 'Floral Arch Entrance', 'Table Centerpieces (50 tables)', 'Aisle Decoration', 'Photo Wall', 'Fairy Light Ceiling', 'Dedicated Event Manager'], images: ['https://images.unsplash.com/photo-1519741497674-611481863552?w=400', 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=400', 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400'] },
  { id: 2, title: 'Golden Candle Vale', category: 'Wedding', price: 124999, image: 'https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=800', badge: null, rating: 4.8, reviews: 98, duration: '6-8 hours', guests: 'Up to 300', location: 'Pan India', description: 'An intimate candlelit wedding setup with golden accents and warm floral arrangements. Ideal for romantic, close-knit celebrations.', includes: ['Candle Arch Stage', 'Golden Draping', 'Floral Centerpieces', 'Entrance Gate', 'Couple Seating', 'Ambient Lighting'], images: ['https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=400', 'https://images.unsplash.com/photo-1530023367847-a683933f4172?w=400', 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=400'] },
  { id: 3, title: 'Balloon Wonderland', category: 'Birthday', price: 24999, image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800', badge: null, rating: 4.7, reviews: 76, duration: '3-4 hours', guests: 'Up to 100', location: 'Pan India', description: 'A vibrant and colorful balloon wonderland setup for the most fun birthday celebration ever. Great for kids and adults alike.', includes: ['Balloon Arch', 'Backdrop Setup', 'Table Decoration', 'Cake Table', 'Photo Booth Corner'], images: ['https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400', 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400', 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=400'] },
  { id: 4, title: 'Corporate Stage Backdrop', category: 'Corporate', price: 184999, image: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800', badge: 'Premium', rating: 4.9, reviews: 210, duration: '8-12 hours', guests: 'Up to 1000', location: 'Pan India', description: 'Professional corporate event setup with LED backdrop, branded elements, and premium stage design. Perfect for product launches, award nights, and conferences.', includes: ['LED Stage Backdrop', 'Branded Podium', 'Press Conference Setup', 'VIP Lounge Area', 'Registration Desk', 'Directional Signage', 'Technical Team Support'], images: ['https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=400', 'https://images.unsplash.com/photo-1561128290-006fc5e4ce9b?w=400', 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400'] },
  { id: 5, title: 'Ring Ceremony Decor', category: 'Engagement', price: 99999, image: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=800', badge: null, rating: 4.8, reviews: 88, duration: '5-6 hours', guests: 'Up to 200', location: 'Pan India', description: 'Elegant engagement ceremony decoration with floral backdrop, fairy lights, and luxurious seating for the couple.', includes: ['Floral Stage Backdrop', 'Couple Seating Arch', 'Ring Exchange Platform', 'Guest Seating Decor', 'Entrance Flowers', 'Photo Corner'], images: ['https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=400', 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=400', 'https://images.unsplash.com/photo-1530023367847-a683933f4172?w=400'] },
]

// ============================================
// DECORATION ADD-ONS — categories ke saath
// ============================================
const addOnCategories = ['Lighting', 'Photography', 'Food & Drinks', 'Entertainment']

const decorationAddOns = [
  { id: 8001, name: 'Extra Fairy Lights', price: 999, category: 'Lighting', image: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=200' },
  { id: 8002, name: 'Live Photography (2hrs)', price: 2999, category: 'Photography', image: 'https://images.unsplash.com/photo-1530023367847-a683933f4172?w=200' },
  { id: 8003, name: 'Welcome Drinks Setup', price: 1499, category: 'Food & Drinks', image: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=200' },
  { id: 8004, name: 'Photo Booth Corner', price: 1999, category: 'Entertainment', image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=200' },
  { id: 8005, name: 'Live Acoustic Music', price: 3499, category: 'Entertainment', image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=200' },
  { id: 8006, name: 'LED Uplighting Set', price: 1799, category: 'Lighting', image: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=200' },
  { id: 8007, name: 'Videography (Full Event)', price: 4999, category: 'Photography', image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=200' },
  { id: 8008, name: 'Mocktail Bar Setup', price: 2299, category: 'Food & Drinks', image: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=200' },
]

const formatPrice = (price: number) => `₹${price.toLocaleString('en-IN')}`

const PackageDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [activeImage, setActiveImage] = useState(0)
  const [wishlist, setWishlist] = useState(false)
  const [selectedAddOns, setSelectedAddOns] = useState<number[]>([])
  const [showAddOnModal, setShowAddOnModal] = useState(false)

  const pkg = allPackages.find((p) => p.id === Number(id))
useEffect(() => {
  if (pkg) {
    dispatch(
      addRecentlyViewed({
        id: pkg.id,
        title: pkg.title,
        price: pkg.price,
        image: pkg.image,
        path: `/package/${pkg.id}`,
      })
    )
  }
}, [pkg?.id, dispatch])


  if (!pkg) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-[#FDFAF4]">
        <div className="text-center">
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-[2rem] text-[#1A1208] mb-4">Package not found</h2>
          <Link to="/services" style={{ fontFamily: "'Jost', sans-serif" }} className="text-[#C9A84C] underline">Back to Services</Link>
        </div>
      </div>
    )
  }

  const toggleAddOn = (addOnId: number) => {
    setSelectedAddOns(selectedAddOns.includes(addOnId) ? selectedAddOns.filter((a) => a !== addOnId) : [...selectedAddOns, addOnId])
  }

  const addOnsTotal = decorationAddOns.filter((a) => selectedAddOns.includes(a.id)).reduce((sum, a) => sum + a.price, 0)
  const totalPrice = pkg.price + addOnsTotal

  const handleBookNow = () => {
    dispatch(addToCart({ id: pkg.id, title: pkg.title, category: pkg.category, price: pkg.price, image: pkg.image }))
    selectedAddOns.forEach((addOnId) => {
      const addOn = decorationAddOns.find((a) => a.id === addOnId)
      if (addOn) dispatch(addToCart({ id: addOn.id, title: addOn.name, category: 'Add-on', price: addOn.price, image: addOn.image }))
    })
    dispatch(showToast({ message: 'Booking added! Redirecting to checkout...' }))
    navigate('/checkout')
  }

  const handleQuickAdd = (shopItem: typeof shopItems[number]) => {
    dispatch(addToCart({ id: shopItem.id, title: shopItem.title, category: shopItem.category, price: shopItem.price, image: shopItem.image }))
    dispatch(showToast({ message: `${shopItem.title} added to cart! 🎉` }))
  }

  const scrollToReviews = () => {
    document.getElementById('reviews-section')?.scrollIntoView({ behavior: 'smooth' })
  }

  const suggestedCakes = shopItems.filter((i) => i.category === 'Cakes').slice(0, 4)
  const suggestedGifts = shopItems.filter((i) => ['Chocolates', 'Hampers', 'Flowers', 'Personalised'].includes(i.category)).slice(0, 4)

  return (
    <div className="bg-[#FDFAF4] pb-28 md:pb-24">

      {/* BREADCRUMB */}
      <div className="bg-white border-b border-[#EDE0C4] py-4">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-2">
            <Link to="/services" style={{ fontFamily: "'Jost', sans-serif" }} className="flex items-center gap-1 text-[0.78rem] text-[#9E8A6A] hover:text-[#C9A84C] transition-colors">
              <FiChevronLeft size={14} /> All Packages
            </Link>
            <span className="text-[#EDE0C4]">/</span>
            <span style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.78rem] text-[#D9776B]">{pkg.title}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:items-start">

          {/* LEFT — STICKY */}
          <div className="lg:sticky lg:top-[90px]">
            <div className="relative h-[360px] md:h-[440px] rounded-2xl overflow-hidden mb-4 shadow-[0_8px_40px_rgba(26,18,8,0.1)]">
              <img src={pkg.images[activeImage]} alt={pkg.title} className="w-full h-full object-cover" />
              {pkg.badge && (
                <span style={{ fontFamily: "'Jost', sans-serif" }} className="absolute top-4 left-4 bg-[#D9776B] text-white rounded-full text-[0.62rem] px-3 py-1.5 tracking-[0.15em] uppercase font-semibold">{pkg.badge}</span>
              )}
              <button onClick={() => setWishlist(!wishlist)} className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-colors ${wishlist ? 'bg-[#D9776B] text-white' : 'bg-white/90 text-[#1A1208]'}`}>
                <FiHeart size={16} fill={wishlist ? 'white' : 'none'} />
              </button>
            </div>

            <div className="flex gap-3">
              {pkg.images.map((img, i) => (
                <button key={i} onClick={() => setActiveImage(i)} className={`h-[80px] flex-1 rounded-xl overflow-hidden border-2 transition-all ${activeImage === i ? 'border-[#C9A84C]' : 'border-transparent'}`}>
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT — Scrollable content */}
          <div>
            <p style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.65rem] text-[#D9776B] tracking-[0.25em] uppercase font-semibold mb-2">{pkg.category}</p>
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-[2rem] md:text-[2.6rem] text-[#1A1208] font-semibold leading-tight mb-4">{pkg.title}</h1>

            <button onClick={scrollToReviews} className="flex items-center gap-3 mb-5 hover:opacity-75 transition-opacity">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <FiStar key={i} size={14} fill={i < Math.floor(pkg.rating) ? '#D9776B' : 'none'} color={i < Math.floor(pkg.rating) ? '#D9776B' : '#EDE0C4'} />
                ))}
              </div>
              <span style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.82rem] text-[#1A1208] font-semibold">{pkg.rating}</span>
              <span style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.78rem] text-[#9E8A6A] underline">({pkg.reviews} reviews)</span>
            </button>

            <div className="grid grid-cols-3 gap-3 mb-6">
              {[
                { icon: FiClock, label: 'Duration', value: pkg.duration },
                { icon: FiUsers, label: 'Guests', value: pkg.guests },
                { icon: FiMapPin, label: 'Coverage', value: pkg.location },
              ].map((info) => (
                <div key={info.label} className="bg-white rounded-xl p-3 text-center shadow-[0_2px_8px_rgba(26,18,8,0.05)]">
                  <info.icon size={16} color="#C9A84C" className="mx-auto mb-1" />
                  <p style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.6rem] text-[#9E8A6A] uppercase tracking-wider mb-0.5">{info.label}</p>
                  <p style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.75rem] text-[#1A1208] font-semibold">{info.value}</p>
                </div>
              ))}
            </div>

            <p style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.85rem] text-[#5C4A1E] leading-relaxed mb-6">{pkg.description}</p>

            <div className="bg-white rounded-2xl p-5 mb-6 shadow-[0_4px_16px_rgba(26,18,8,0.05)]">
              <h3 style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.72rem] text-[#1A1208] font-semibold tracking-[0.15em] uppercase mb-4">What's Included</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {pkg.includes.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <FiCheck size={14} color="#C9A84C" className="shrink-0 mt-0.5" />
                    <span style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.8rem] text-[#5C4A1E]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* ============================================
                CUSTOMIZE — "+" se modal khulta hai (Experience jaisa hi pattern)
            ============================================ */}
            <div className="bg-white rounded-2xl p-5 shadow-[0_4px_16px_rgba(26,18,8,0.05)] mb-6">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.72rem] text-[#1A1208] font-semibold tracking-[0.15em] uppercase">Enhance Your Celebration</h3>
                  <p style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.72rem] text-[#9E8A6A] mt-1">Add lighting, photography, music & more</p>
                </div>
                <button onClick={() => setShowAddOnModal(true)} className="w-9 h-9 rounded-full bg-[#C9A84C] text-white flex items-center justify-center hover:bg-[#1A1208] transition-colors shrink-0">
                  <FiPlus size={18} />
                </button>
              </div>

              {selectedAddOns.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-3 border-t border-[#EDE0C4]">
                  {selectedAddOns.map((addOnId) => {
                    const addOn = decorationAddOns.find((a) => a.id === addOnId)
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

            {/* CROSS-SELL — Cakes */}
            {suggestedCakes.length > 0 && (
              <div className="mb-6">
                <h3 style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.7rem] text-[#1A1208] font-semibold tracking-[0.15em] uppercase mb-3">🎂 Complete It With A Cake</h3>
                <Slider>
                  {suggestedCakes.map((cake) => (
                    <div key={cake.id} className="shrink-0 w-[160px] bg-white rounded-xl p-3 shadow-[0_2px_8px_rgba(26,18,8,0.05)]">
                      <Link to={`/shop/${cake.id}`}>
                        <img src={cake.image} alt={cake.title} className="w-full h-[90px] rounded-lg object-cover mb-2" />
                        <p style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.75rem] text-[#1A1208] font-medium leading-snug mb-1">{cake.title}</p>
                      </Link>
                      <div className="flex items-center justify-between">
                        <span style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.78rem] text-[#C9A84C] font-semibold">{formatPrice(cake.price)}</span>
                        <button onClick={() => handleQuickAdd(cake)} className="w-6 h-6 rounded-full bg-[#1A1208] text-white flex items-center justify-center hover:bg-[#C9A84C] transition-colors text-[0.8rem]">+</button>
                      </div>
                    </div>
                  ))}
                </Slider>
              </div>
            )}

            {/* CROSS-SELL — Gifts */}
            {suggestedGifts.length > 0 && (
              <div className="mb-6">
                <h3 style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.7rem] text-[#1A1208] font-semibold tracking-[0.15em] uppercase mb-3">🎁 Add A Thoughtful Gift</h3>
                <Slider>
                  {suggestedGifts.map((gift) => (
                    <div key={gift.id} className="shrink-0 w-[160px] bg-white rounded-xl p-3 shadow-[0_2px_8px_rgba(26,18,8,0.05)]">
                      <Link to={`/shop/${gift.id}`}>
                        <img src={gift.image} alt={gift.title} className="w-full h-[90px] rounded-lg object-cover mb-2" />
                        <p style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.75rem] text-[#1A1208] font-medium leading-snug mb-1">{gift.title}</p>
                      </Link>
                      <div className="flex items-center justify-between">
                        <span style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.78rem] text-[#C9A84C] font-semibold">{formatPrice(gift.price)}</span>
                        <button onClick={() => handleQuickAdd(gift)} className="w-6 h-6 rounded-full bg-[#1A1208] text-white flex items-center justify-center hover:bg-[#C9A84C] transition-colors text-[0.8rem]">+</button>
                      </div>
                    </div>
                  ))}
                </Slider>
              </div>
            )}

          </div>
        </div>

        <ReviewsSection />
      </div>

      {/* FIXED BOTTOM BAR */}
      <div className="fixed bottom-[60px] md:bottom-0 left-0 right-0 z-[80] bg-white border-t border-[#EDE0C4] shadow-[0_-4px_20px_rgba(26,18,8,0.08)]">
        <div className="container mx-auto px-6 py-3 flex items-center justify-between gap-3">
          <div>
            <p style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.6rem] text-[#9E8A6A] uppercase tracking-wider">Total</p>
            <p style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-[1.3rem] text-[#1A1208] font-bold">{formatPrice(totalPrice)}</p>
          </div>
          <button onClick={handleBookNow} style={{ fontFamily: "'Jost', sans-serif" }} className="bg-[#C9A84C] text-white rounded-full px-8 sm:px-10 py-3 text-[0.75rem] tracking-[0.15em] uppercase font-semibold hover:bg-[#1A1208] transition-colors">
            Book Now
          </button>
        </div>
      </div>

      {/* ADD-ON MODAL */}
      {showAddOnModal && (
        <AddOnModal
          addOns={decorationAddOns}
          categories={addOnCategories}
          selectedAddOns={selectedAddOns}
          onToggle={toggleAddOn}
          onClose={() => setShowAddOnModal(false)}
        />
      )}
    </div>
  )
}

export default PackageDetail