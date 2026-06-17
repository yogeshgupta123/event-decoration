import { useParams, useNavigate, Link } from 'react-router-dom'
import { FiStar, FiMapPin, FiClock, FiCheck, FiChevronLeft, FiCalendar, FiUsers, FiHeart, FiPlus, FiX } from 'react-icons/fi'
import { experiences } from '../data/experiences'
import { useAppDispatch } from '../store/hooks'
import { addToCart } from '../store/cartSlice'
import { showToast } from '../store/uiSlice'
import { StaggerContainer, StaggerItem } from '../components/animations/StaggerContainer'
import ReviewsSection from '../components/ui/ReviewsSection'
import AddOnModal from '../components/ui/AddOnModal'
import AvailabilityCalendar from '../components/ui/AvailabilityCalendar'
import { useState, useEffect } from 'react'
import { addRecentlyViewed } from '../store/recentlyViewedSlice'
import PriceTag from '../components/ui/PriceTag'
import GiftsSlider from '../components/ui/GiftsSlider'


const formatPrice = (price: number) => `₹${price.toLocaleString('en-IN')}`

// ============================================
// EXPERIENCE ADD-ONS — categories ke saath, filter ke liye
// ============================================
const addOnCategories = ['Flowers', 'Photography', 'Food & Drinks', 'Decor', 'Music']

const experienceAddOns = [
  { id: 7001, name: 'Bouquet of Roses', price: 599, category: 'Flowers', image: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=200' },
  { id: 7002, name: 'Professional Photography (1hr)', price: 1999, category: 'Photography', image: 'https://images.unsplash.com/photo-1530023367847-a683933f4172?w=200' },
  { id: 7003, name: 'Personalized Cake (1kg)', price: 899, category: 'Food & Drinks', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=200' },
  { id: 7004, name: 'Champagne Bottle', price: 1499, category: 'Food & Drinks', image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=200' },
  { id: 7005, name: 'Extra Decoration Setup', price: 1299, category: 'Decor', image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=200' },
  { id: 7006, name: 'Live Acoustic Music (30min)', price: 2499, category: 'Music', image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=200' },
  { id: 7007, name: 'Chocolate Box', price: 499, category: 'Food & Drinks', image: 'https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=200' },
  { id: 7008, name: 'Fairy Lights Setup', price: 799, category: 'Decor', image: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=200' },
]

const ExperienceDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const exp = experiences.find((e) => e.id === Number(id))

  useEffect(() => {
  if (exp) {
    dispatch(
      addRecentlyViewed({
        id: exp.id,
        title: exp.title,
        price: exp.price,
        image: exp.image,
        path: `/experience/${exp.id}`,
      })
    )
  }
}, [exp?.id, dispatch])

  const [activeImage, setActiveImage] = useState(0)
  const [wishlist, setWishlist] = useState(false)
  const [bookingDate, setBookingDate] = useState('')
  const [bookingTime, setBookingTime] = useState('')
  const [guestCount, setGuestCount] = useState('2')
  const [selectedAddOns, setSelectedAddOns] = useState<number[]>([])
  const [showAddOnModal, setShowAddOnModal] = useState(false)
const [showCalendar, setShowCalendar] = useState(false)
const [pincode, setPincode] = useState('')

  if (!exp) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-[#FDFAF4]">
        <div className="text-center">
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-[2rem] text-[#1A1208] mb-4">Experience not found</h2>
          <Link to="/experiences" style={{ fontFamily: "'Jost', sans-serif" }} className="text-[#C9A84C] underline">Back to Experiences</Link>
        </div>
      </div>
    )
  }

  const toggleAddOn = (addOnId: number) => {
    setSelectedAddOns(selectedAddOns.includes(addOnId) ? selectedAddOns.filter((a) => a !== addOnId) : [...selectedAddOns, addOnId])
  }

  const addOnsTotal = experienceAddOns.filter((a) => selectedAddOns.includes(a.id)).reduce((sum, a) => sum + a.price, 0)
  const totalPrice = exp.price + addOnsTotal

  const handleBookNow = () => {
  dispatch(addToCart({ id: exp.id, title: exp.title, category: 'Experience', price: exp.price, image: exp.image }))
  selectedAddOns.forEach((addOnId) => {
    const addOn = experienceAddOns.find((a) => a.id === addOnId)
    if (addOn) dispatch(addToCart({ id: addOn.id, title: addOn.name, category: 'Add-on', price: addOn.price, image: addOn.image }))
  })
  dispatch(showToast({ message: 'Experience added! Redirecting to checkout...' }))
navigate('/checkout', { state: { eventDate: bookingDate, eventTime: bookingTime, guestCount, venue: '', city: pincode } })}

  const scrollToReviews = () => {
    document.getElementById('reviews-section')?.scrollIntoView({ behavior: 'smooth' })
  }

  const relatedExperiences = experiences.filter((e) => e.category === exp.category && e.id !== exp.id).slice(0, 3)

  return (
    <div className="bg-[#FDFAF4] pb-16">

      {/* BREADCRUMB */}
      <div className="bg-white border-b border-[#EDE0C4] py-4">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-2">
            <Link to="/experiences" style={{ fontFamily: "'Jost', sans-serif" }} className="flex items-center gap-1 text-[0.78rem] text-[#9E8A6A] hover:text-[#C9A84C] transition-colors">
              <FiChevronLeft size={14} /> Experiences
            </Link>
            <span className="text-[#EDE0C4]">/</span>
            <span style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.78rem] text-[#D9776B]">{exp.title}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:items-start">

          {/* LEFT — STICKY */}
          <div className="lg:sticky lg:top-[90px]">
            <div className="relative h-[360px] md:h-[440px] rounded-2xl overflow-hidden mb-4 shadow-[0_8px_40px_rgba(26,18,8,0.1)]">
              <img src={exp.images[activeImage]} alt={exp.title} className="w-full h-full object-cover" />
              <span style={{ fontFamily: "'Jost', sans-serif" }} className="absolute top-4 left-4 bg-white/95 text-[#1A1208] rounded-full text-[0.65rem] px-3 py-1.5 tracking-[0.15em] uppercase font-semibold">
                {exp.category}
              </span>
              <button
                onClick={() => setWishlist(!wishlist)}
                className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-colors ${wishlist ? 'bg-[#D9776B] text-white' : 'bg-white/90 text-[#1A1208]'}`}
              >
                <FiHeart size={16} fill={wishlist ? 'white' : 'none'} />
              </button>
              <span style={{ fontFamily: "'Jost', sans-serif" }} className="absolute bottom-4 left-4 bg-[#1A1208]/80 text-white rounded-full text-[0.62rem] px-3 py-1.5 font-semibold">
                🔥 {exp.bookedToday} people booked this today
              </span>
            </div>

            <div className="flex gap-3 mb-6">
              {exp.images.map((img, i) => (
                <button key={i} onClick={() => setActiveImage(i)} className={`h-[80px] flex-1 rounded-xl overflow-hidden border-2 transition-all ${activeImage === i ? 'border-[#C9A84C]' : 'border-transparent'}`}>
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            <div className="bg-white rounded-2xl p-5 shadow-[0_4px_16px_rgba(26,18,8,0.05)]">
              <h3 style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.72rem] text-[#1A1208] font-semibold tracking-[0.15em] uppercase mb-4">What's Included</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {exp.highlights.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <FiCheck size={14} color="#C9A84C" className="shrink-0 mt-0.5" />
                    <span style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.8rem] text-[#5C4A1E]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* RIGHT — Scrollable content */}
          <div>
            <p style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.65rem] text-[#D9776B] tracking-[0.25em] uppercase font-semibold mb-2">{exp.category}</p>
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-[2rem] md:text-[2.6rem] text-[#1A1208] font-semibold leading-tight mb-4">{exp.title}</h1>

            <button onClick={scrollToReviews} className="flex items-center gap-3 mb-5 hover:opacity-75 transition-opacity">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <FiStar key={i} size={14} fill={i < Math.floor(exp.rating) ? '#D9776B' : 'none'} color={i < Math.floor(exp.rating) ? '#D9776B' : '#EDE0C4'} />
                ))}
              </div>
              <span style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.82rem] text-[#1A1208] font-semibold">{exp.rating}</span>
              <span style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.78rem] text-[#9E8A6A] underline">({exp.reviews} reviews)</span>
            </button>

            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="bg-white rounded-xl p-3 flex items-center gap-2.5 shadow-[0_2px_8px_rgba(26,18,8,0.05)]">
                <FiClock size={16} color="#C9A84C" />
                <div>
                  <p style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.6rem] text-[#9E8A6A] uppercase tracking-wider">Duration</p>
                  <p style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.78rem] text-[#1A1208] font-semibold">{exp.duration}</p>
                </div>
              </div>
              <div className="bg-white rounded-xl p-3 flex items-center gap-2.5 shadow-[0_2px_8px_rgba(26,18,8,0.05)]">
                <FiMapPin size={16} color="#C9A84C" />
                <div>
                  <p style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.6rem] text-[#9E8A6A] uppercase tracking-wider">Available In</p>
                  <p style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.78rem] text-[#1A1208] font-semibold">{exp.location}</p>
                </div>
              </div>
            </div>

            <p style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.85rem] text-[#5C4A1E] leading-relaxed mb-6">{exp.description}</p>

            {/* ============================================
                CUSTOMIZE — "+" se modal khulta hai
            ============================================ */}
            <div className="bg-white rounded-2xl p-5 shadow-[0_4px_16px_rgba(26,18,8,0.05)] mb-6">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.72rem] text-[#1A1208] font-semibold tracking-[0.15em] uppercase">Customize Your Experience</h3>
                  <p style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.72rem] text-[#9E8A6A] mt-1">Add flowers, photography, cake & more</p>
                </div>
                <button
                  onClick={() => setShowAddOnModal(true)}
                  className="w-9 h-9 rounded-full bg-[#C9A84C] text-white flex items-center justify-center hover:bg-[#1A1208] transition-colors shrink-0"
                >
                  <FiPlus size={18} />
                </button>
              </div>

              {selectedAddOns.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-3 border-t border-[#EDE0C4]">
                  {selectedAddOns.map((addOnId) => {
                    const addOn = experienceAddOns.find((a) => a.id === addOnId)
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

            {/* BOOKING BOX */}
            <div className="bg-white rounded-2xl p-5 shadow-[0_4px_16px_rgba(26,18,8,0.06)]">
              <h3 style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.72rem] text-[#1A1208] font-semibold tracking-[0.15em] uppercase mb-4">Reserve Your Experience</h3>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div>
  <label style={{ fontFamily: "'Jost', sans-serif" }} className="block text-[0.65rem] text-[#5C4A1E] tracking-[0.15em] uppercase mb-2">Date</label>
  <button
    onClick={() => setShowCalendar(!showCalendar)}
    type="button"
    className="relative w-full flex items-center gap-2 bg-[#FDFAF4] border border-[#EDE0C4] rounded-xl pl-9 pr-3 py-2.5 text-left"
  >
    <FiCalendar size={14} color="#C9A84C" className="absolute left-3 top-1/2 -translate-y-1/2" />
    <span style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.8rem' }} className={bookingDate ? 'text-[#1A1208]' : 'text-[#9E8A6A]'}>
      {bookingDate || 'Select date'}
    </span>
  </button>
  {showCalendar && (
    <div className="mt-2">
      <AvailabilityCalendar selectedDate={bookingDate} onSelectDate={(date) => { setBookingDate(date); setShowCalendar(false) }} />
    </div>
  )}
</div>
                <div>
                  <label style={{ fontFamily: "'Jost', sans-serif" }} className="block text-[0.65rem] text-[#5C4A1E] tracking-[0.15em] uppercase mb-2">Time Slot</label>
                  <select value={bookingTime} onChange={(e) => setBookingTime(e.target.value)} style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.8rem' }} className="w-full bg-[#FDFAF4] border border-[#EDE0C4] rounded-xl px-3 py-2.5 outline-none focus:border-[#C9A84C] transition-colors text-[#1A1208]">
                    <option value="">Select</option>
                    <option>Morning (9 AM - 12 PM)</option>
                    <option>Afternoon (12 PM - 4 PM)</option>
                    <option>Evening (5 PM - 8 PM)</option>
                    <option>Night (8 PM - 11 PM)</option>
                  </select>
                </div>
              </div>

              <div className="mb-5">
                <label style={{ fontFamily: "'Jost', sans-serif" }} className="block text-[0.65rem] text-[#5C4A1E] tracking-[0.15em] uppercase mb-2">Guests</label>
                <div className="relative">
                  <FiUsers size={14} color="#C9A84C" className="absolute left-3 top-1/2 -translate-y-1/2" />
                  <select value={guestCount} onChange={(e) => setGuestCount(e.target.value)} style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.8rem' }} className="w-full bg-[#FDFAF4] border border-[#EDE0C4] rounded-xl pl-9 pr-3 py-2.5 outline-none focus:border-[#C9A84C] transition-colors text-[#1A1208]">
                    {['2', '3', '4', '5', '6+'].map((g) => <option key={g} value={g}>{g} Guests</option>)}
                  </select>
                </div>
              </div>

              <div className="mb-5">
  <label
    style={{ fontFamily: "'Jost', sans-serif" }}
    className="block text-[0.65rem] text-[#5C4A1E] tracking-[0.15em] uppercase mb-2"
  >
    Pincode
  </label>

  <input
    type="text"
    value={pincode}
    onChange={(e) => setPincode(e.target.value)}
    placeholder="Enter Pincode"
    className="w-full bg-[#FDFAF4] border border-[#EDE0C4] rounded-xl px-3 py-2.5 outline-none focus:border-[#C9A84C]"
  />
</div>

              {/* Price Breakdown */}
              <div className="space-y-2 mb-4 pb-4 border-b border-[#EDE0C4]">
                <div className="flex justify-between">
                  <span style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.8rem] text-[#5C4A1E]">{exp.title}</span>
                  <span style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.8rem] text-[#1A1208] font-medium"><PriceTag
  price={exp.price}
  size="md"
  discountPercent={15}
/></span>
                </div>
                {selectedAddOns.map((addOnId) => {
                  const addOn = experienceAddOns.find((a) => a.id === addOnId)
                  if (!addOn) return null
                  return (
                    <div key={addOnId} className="flex justify-between">
                      <span style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.78rem] text-[#9E8A6A]">+ {addOn.name}</span>
                      <span style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.78rem] text-[#9E8A6A]">{formatPrice(addOn.price)}</span>
                    </div>
                  )
                })}
              </div>

              <div className="flex items-center justify-between mb-4">
                <div>
                  <p style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.62rem] text-[#9E8A6A] uppercase tracking-wider">Total</p>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-[2rem] text-[#1A1208] font-bold">{formatPrice(totalPrice)}</p>
                </div>
              </div>

              <button onClick={handleBookNow} style={{ fontFamily: "'Jost', sans-serif" }} className="w-full bg-[#C9A84C] text-white rounded-full py-4 text-[0.78rem] tracking-[0.2em] uppercase font-semibold hover:bg-[#1A1208] transition-colors">
                Book This Experience
              </button>
              <p style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.68rem] text-[#9E8A6A] text-center mt-3">30% advance payment to confirm your booking</p>
            </div>
            <GiftsSlider excludeId={exp.id} />
          </div>
        </div>

        {/* REVIEWS — as is, jaisa hai waisa hi */}
        <ReviewsSection />

        {relatedExperiences.length > 0 && (
          <div className="mt-16">
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-[1.8rem] text-[#1A1208] font-semibold mb-8">More {exp.category}</h2>
            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedExperiences.map((related) => (
                <StaggerItem key={related.id}>
                  <Link to={`/experience/${related.id}`} className="group block bg-white rounded-2xl overflow-hidden shadow-[0_4px_16px_rgba(26,18,8,0.06)] hover:shadow-[0_16px_40px_rgba(201,168,76,0.25)] hover:-translate-y-2 transition-all duration-300">
                    <div className="relative h-[180px] overflow-hidden">
                      <img src={related.image} alt={related.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    </div>
                    <div className="p-4">
                      <h3 style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-[1.05rem] text-[#1A1208] font-semibold mb-1 leading-snug">{related.title}</h3>
                      <p style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.9rem] text-[#C9A84C] font-semibold">From {formatPrice(related.price)}</p>
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
          addOns={experienceAddOns}
          categories={addOnCategories}
          selectedAddOns={selectedAddOns}
          onToggle={toggleAddOn}
          onClose={() => setShowAddOnModal(false)}
        />
      )}
    </div>
  )
}

export default ExperienceDetail