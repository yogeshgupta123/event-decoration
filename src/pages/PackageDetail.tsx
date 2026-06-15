import { useParams, Link } from 'react-router-dom'
import { useState } from 'react'
import { FiStar, FiMapPin, FiClock, FiUsers, FiHeart,  FiCheck, FiChevronLeft } from 'react-icons/fi'


import RelatedSlider from '../components/home/RelatedSlider'
import ReviewsSection from '../components/ui/ReviewsSection'


const allPackages = [
  { id: 1, title: 'Royal Rose Terrace', category: 'Wedding', price: 154999, image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800', badge: 'Best Seller', rating: 4.9, reviews: 124, duration: '8-10 hours', guests: 'Up to 500', location: 'Pan India', description: 'A breathtaking royal-themed wedding decoration featuring fresh roses, gold accents, and ornate stage setup. Perfect for a grand celebration that will be remembered for years.', includes: ['Stage & Mandap Setup', 'Floral Arch Entrance', 'Table Centerpieces (50 tables)', 'Aisle Decoration', 'Photo Wall', 'Fairy Light Ceiling', 'Dedicated Event Manager'], images: ['https://images.unsplash.com/photo-1519741497674-611481863552?w=400', 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=400', 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400'] },
  { id: 2, title: 'Golden Candle Vale', category: 'Wedding', price: 124999, image: 'https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=800', badge: null, rating: 4.8, reviews: 98, duration: '6-8 hours', guests: 'Up to 300', location: 'Pan India', description: 'An intimate candlelit wedding setup with golden accents and warm floral arrangements.', includes: ['Candle Arch Stage', 'Golden Draping', 'Floral Centerpieces', 'Entrance Gate', 'Couple Seating', 'Ambient Lighting'], images: ['https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=400', 'https://images.unsplash.com/photo-1530023367847-a683933f4172?w=400', 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=400'] },
  { id: 3, title: 'Balloon Wonderland', category: 'Birthday', price: 24999, image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800', badge: null, rating: 4.7, reviews: 76, duration: '3-4 hours', guests: 'Up to 100', location: 'Pan India', description: 'A vibrant and colorful balloon wonderland setup for the most fun birthday celebration ever.', includes: ['Balloon Arch', 'Backdrop Setup', 'Table Decoration', 'Cake Table', 'Photo Booth Corner'], images: ['https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400', 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400', 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=400'] },
  { id: 4, title: 'Corporate Stage Backdrop', category: 'Corporate', price: 184999, image: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800', badge: 'Premium', rating: 4.9, reviews: 210, duration: '8-12 hours', guests: 'Up to 1000', location: 'Pan India', description: 'Professional corporate event setup with LED backdrop, branded elements, and premium stage design.', includes: ['LED Stage Backdrop', 'Branded Podium', 'Press Conference Setup', 'VIP Lounge Area', 'Registration Desk', 'Directional Signage', 'Technical Team Support'], images: ['https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=400', 'https://images.unsplash.com/photo-1561128290-006fc5e4ce9b?w=400', 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400'] },
  { id: 5, title: 'Ring Ceremony Decor', category: 'Engagement', price: 99999, image: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=800', badge: null, rating: 4.8, reviews: 88, duration: '5-6 hours', guests: 'Up to 200', location: 'Pan India', description: 'Elegant engagement ceremony decoration with floral backdrop, fairy lights, and luxurious seating.', includes: ['Floral Stage Backdrop', 'Couple Seating Arch', 'Ring Exchange Platform', 'Guest Seating Decor', 'Entrance Flowers', 'Photo Corner'], images: ['https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=400', 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=400', 'https://images.unsplash.com/photo-1530023367847-a683933f4172?w=400'] },
  { id: 6, title: 'Floral Mandap Setup', category: 'Wedding', price: 89999, image: 'https://images.unsplash.com/photo-1530023367847-a683933f4172?w=800', badge: null, rating: 4.7, reviews: 65, duration: '6-8 hours', guests: 'Up to 400', location: 'Pan India', description: 'Beautiful floral mandap with fresh flowers and elegant draping for a traditional yet modern wedding.', includes: ['Floral Mandap', 'Stage Setup', 'Floral Path', 'Seating Decor', 'Backdrop Design'], images: ['https://images.unsplash.com/photo-1530023367847-a683933f4172?w=400', 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400', 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=400'] },
]

// ============================================
// ADDON ITEMS — package detail pe dikhenge
// ============================================
const packageAddons = [
  { id: 501, title: 'Extra Balloon Arch', price: 1999, image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=200' },
  { id: 502, title: 'Neon Welcome Sign', price: 3499, image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=200' },
  { id: 503, title: 'Flower Petal Path', price: 2799, image: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=200' },
  { id: 504, title: 'Premium Candle Setup', price: 1599, image: 'https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=200' },
  { id: 505, title: 'Photo Booth Corner', price: 4499, image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=200' },
]



const formatPrice = (price: number) => `₹${price.toLocaleString('en-IN')}`

const PackageDetail = () => {

  const { id } = useParams()
  const [activeImage, setActiveImage] = useState(0)
  const [wishlist, setWishlist] = useState(false)
  const [selectedAddons, setSelectedAddons] = useState<number[]>([])

  const pkg = allPackages.find((p) => p.id === Number(id))

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

  const toggleAddon = (addonId: number) => {
    setSelectedAddons((prev) =>
      prev.includes(addonId) ? prev.filter((id) => id !== addonId) : [...prev, addonId]
    )
  }

  const selectedAddonItems = packageAddons.filter((a) => selectedAddons.includes(a.id))
  const addonsTotal = selectedAddonItems.reduce((sum, a) => sum + a.price, 0)

  

  return (
    <div className="bg-[#FDFAF4] pb-0">

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
          {/* LEFT — Images */}
          <div className="lg:sticky lg:top-[90px]">
            <div className="relative h-[360px] md:h-[440px] rounded-2xl overflow-hidden mb-4 shadow-[0_8px_40px_rgba(26,18,8,0.1)]">
              <img src={pkg.images[activeImage]} alt={pkg.title} className="w-full h-full object-cover" />
              {pkg.badge && (
                <span style={{ fontFamily: "'Jost', sans-serif" }} className="absolute top-4 left-4 bg-[#D9776B] text-white rounded-full text-[0.62rem] px-3 py-1.5 tracking-[0.15em] uppercase font-semibold">
                  {pkg.badge}
                </span>
              )}
              <button
                onClick={() => setWishlist(!wishlist)}
                className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-colors ${wishlist ? 'bg-[#D9776B] text-white' : 'bg-white/90 text-[#1A1208]'}`}
              >
                <FiHeart size={16} fill={wishlist ? 'white' : 'none'} />
              </button>
            </div>
            <div className="flex gap-3">
              {pkg.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`h-[80px] flex-1 rounded-xl overflow-hidden border-2 transition-all ${activeImage === i ? 'border-[#C9A84C]' : 'border-transparent'}`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT — Info */}
          <div>
            <p style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.65rem] text-[#D9776B] tracking-[0.25em] uppercase font-semibold mb-2">{pkg.category}</p>
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-[2rem] md:text-[2.6rem] text-[#1A1208] font-semibold leading-tight mb-4">{pkg.title}</h1>

            {/* Rating */}
<button onClick={() => document.getElementById('reviews-section')?.scrollIntoView({ behavior: 'smooth' })} className="flex items-center gap-3 mb-5 hover:opacity-75 transition-opacity">              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <FiStar key={i} size={14} fill={i < Math.floor(pkg.rating) ? '#D9776B' : 'none'} color={i < Math.floor(pkg.rating) ? '#D9776B' : '#EDE0C4'} />
                ))}
              </div>
              <span style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.82rem] text-[#1A1208] font-semibold">{pkg.rating}</span>
              <span style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.78rem] text-[#9E8A6A]">({pkg.reviews} reviews)</span>
            </button>

            {/* Quick Info */}
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

            {/* Included */}
            <div className="bg-white rounded-2xl p-5 mb-5 shadow-[0_4px_16px_rgba(26,18,8,0.05)]">
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
                ADD-ONS SELECTOR — package detail pe
            ============================================ */}
            <div className="bg-white rounded-2xl p-5 mb-5 shadow-[0_4px_16px_rgba(26,18,8,0.05)]">
              <h3 style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.72rem] text-[#1A1208] font-semibold tracking-[0.15em] uppercase mb-4">
                Enhance Your Package ✨
              </h3>
              <div className="space-y-2.5">
                {packageAddons.map((addon) => {
                  const isSelected = selectedAddons.includes(addon.id)
                  return (
                    <label
                      key={addon.id}
                      className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${isSelected ? 'border-[#C9A84C] bg-[#FDFAF4]' : 'border-[#EDE0C4] bg-white hover:border-[#C9A84C]/50'}`}
                    >
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleAddon(addon.id)}
                        className="sr-only"
                      />
                      <img src={addon.image} alt={addon.title} className="w-12 h-12 rounded-lg object-cover shrink-0" />
                      <div className="flex-1">
                        <p style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.8rem] text-[#1A1208] font-medium">{addon.title}</p>
                        <p style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.75rem] text-[#C9A84C] font-semibold">+{formatPrice(addon.price)}</p>
                      </div>
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${isSelected ? 'bg-[#C9A84C] border-[#C9A84C]' : 'border-[#EDE0C4]'}`}>
                        {isSelected && <FiCheck size={12} color="white" />}
                      </div>
                    </label>
                  )
                })}
              </div>

              {selectedAddons.length > 0 && (
                <div className="mt-3 pt-3 border-t border-[#EDE0C4] flex items-center justify-between">
                  <span style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.75rem] text-[#5C4A1E]">
                    {selectedAddons.length} add-on{selectedAddons.length > 1 ? 's' : ''} selected
                  </span>
                  <span style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.82rem] text-[#C9A84C] font-semibold">
                    +{formatPrice(addonsTotal)}
                  </span>
                </div>
              )}
            </div>

            {/* Price + CTA */}
            {/* <div className="bg-white rounded-2xl p-5 shadow-[0_4px_16px_rgba(26,18,8,0.06)]">
              <div className="flex items-end justify-between mb-4">
                <div>
                  <p style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.65rem] text-[#9E8A6A] mb-0.5">Total</p>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-[2rem] text-[#1A1208] font-bold">
                    {formatPrice(pkg.price + addonsTotal)}
                  </p>
                  {addonsTotal > 0 && (
                    <p style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.65rem] text-[#9E8A6A]">
                      Base {formatPrice(pkg.price)} + Add-ons {formatPrice(addonsTotal)}
                    </p>
                  )}
                </div>
                <p style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.65rem] text-[#9E8A6A]">+ GST & Setup Fee</p>
              </div>
              <div className="flex flex-col gap-2">
                <button
                  onClick={handleAddToCart}
                  style={{ fontFamily: "'Jost', sans-serif" }}
                  className={`w-full flex items-center justify-center gap-2 rounded-full py-3.5 text-[0.75rem] tracking-[0.1em] uppercase font-semibold transition-all ${added ? 'bg-green-500 text-white' : 'bg-[#C9A84C] text-white hover:bg-[#1A1208]'}`}
                >
                  {added ? <><FiCheck size={14} /> Added to Cart!</> : <><FiShoppingBag size={14} /> Add to Cart</>}
                </button>
                <Link
                  to="/checkout"
                  style={{ fontFamily: "'Jost', sans-serif" }}
                  className="w-full text-center border border-[#1A1208] text-[#1A1208] rounded-full py-3.5 text-[0.75rem] tracking-[0.1em] uppercase font-semibold hover:bg-[#1A1208] hover:text-white transition-all"
                >
                  Book Now
                </Link>
              </div>
            </div> */}
          </div>
        </div>

        {/* REVIEWS */}
      <ReviewsSection/>
      </div>

      {/* RELATED PACKAGES SLIDER */}
      <RelatedSlider
        currentId={pkg.id}
        category={pkg.category}
        allPackages={allPackages}
        title="You May Also Like"
      />
    </div>
  )
}

export default PackageDetail