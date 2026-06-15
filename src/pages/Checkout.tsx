import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiCalendar, FiMapPin, FiUser, FiPhone, FiMail, FiCheck, FiChevronRight, FiLock } from 'react-icons/fi'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { clearCart } from '../store/cartSlice'



const formatPrice = (price: number) => `₹${price.toLocaleString('en-IN')}`

const steps = ['Event Details', 'Personal Info', 'Review & Pay']

const Checkout = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const [form, setForm] = useState({
    eventDate: '',
    eventTime: '',
    venue: '',
    city: '',
    guestCount: '',
    specialRequests: '',
    name: '',
    email: '',
    phone: '',
    alternatePhone: '',
    paymentMode: 'full',
  })

  const navigate = useNavigate()
const dispatch = useAppDispatch()
  const cartItems = useAppSelector((state) => state.cart.items)
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const gst = Math.round(subtotal * 0.18)
  const convenienceFee = 500
  const total = subtotal + gst + convenienceFee
  const advance = Math.round(total * 0.3)

  // ============================================
// CONFIRM & PAY — booking ID banao, cart clear karo,
// confirmation page pe location.state ke saath bhejo
// ============================================
const handleConfirmPay = () => {
  const bookingId = `TM-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`

  dispatch(clearCart())

  navigate(`/order-confirmed/${bookingId}`, {
    state: {
      total,
      eventDate: form.eventDate,
      eventTime: form.eventTime,
      venue: form.venue,
      city: form.city,
    },
  })
}

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const inputClass = "w-full bg-[#FDFAF4] border border-[#EDE0C4] rounded-xl px-4 py-3 outline-none focus:border-[#C9A84C] transition-colors text-[#1A1208] placeholder-[#9E8A6A]"
  const labelClass = "block text-[0.68rem] text-[#5C4A1E] tracking-[0.15em] uppercase mb-2"

  return (
    <div className="bg-[#FDFAF4] py-10 min-h-screen">
      <div className="container mx-auto px-6 max-w-[1100px]">

        {/* Header */}
        <div className="mb-8">
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-[2rem] md:text-[2.6rem] text-[#1A1208] font-semibold">
            Secure Booking
          </h1>
          <p style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.82rem] text-[#9E8A6A] mt-1">Complete your booking in 3 simple steps</p>
        </div>

        {/* STEP INDICATOR */}
        <div className="flex items-center gap-2 mb-10">
          {steps.map((step, i) => (
            <div key={step} className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[0.75rem] font-semibold transition-all ${i < currentStep ? 'bg-[#C9A84C] text-white' : i === currentStep ? 'bg-[#1A1208] text-white' : 'bg-[#EDE0C4] text-[#9E8A6A]'}`}>
                  {i < currentStep ? <FiCheck size={14} /> : i + 1}
                </div>
                <span style={{ fontFamily: "'Jost', sans-serif" }} className={`text-[0.72rem] tracking-wider hidden sm:block ${i === currentStep ? 'text-[#1A1208] font-semibold' : 'text-[#9E8A6A]'}`}>
                  {step}
                </span>
              </div>
              {i < steps.length - 1 && <div className={`flex-1 h-[1px] w-12 ${i < currentStep ? 'bg-[#C9A84C]' : 'bg-[#EDE0C4]'}`} />}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* LEFT — Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-[0_4px_16px_rgba(26,18,8,0.06)] p-6 md:p-8">

              {/* STEP 0 — Event Details */}
              {currentStep === 0 && (
                <div>
                  <h2 style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-[1.6rem] text-[#1A1208] font-semibold mb-6">Event Details</h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                    <div>
                      <label style={{ fontFamily: "'Jost', sans-serif" }} className={labelClass}>Event Date</label>
                      <div className="relative">
                        <FiCalendar size={15} color="#C9A84C" className="absolute left-4 top-1/2 -translate-y-1/2" />
                        <input name="eventDate" type="date" value={form.eventDate} onChange={handleChange} style={{ fontFamily: "'Jost', sans-serif" }} className={`${inputClass} pl-10`} />
                      </div>
                    </div>
                    <div>
                      <label style={{ fontFamily: "'Jost', sans-serif" }} className={labelClass}>Preferred Time</label>
                      <input name="eventTime" type="time" value={form.eventTime} onChange={handleChange} style={{ fontFamily: "'Jost', sans-serif" }} className={inputClass} />
                    </div>
                  </div>

                  <div className="mb-5">
                    <label style={{ fontFamily: "'Jost', sans-serif" }} className={labelClass}>Venue / Location</label>
                    <div className="relative">
                      <FiMapPin size={15} color="#C9A84C" className="absolute left-4 top-1/2 -translate-y-1/2" />
                      <input name="venue" type="text" placeholder="Hotel name, address, or venue" value={form.venue} onChange={handleChange} style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.85rem' }} className={`${inputClass} pl-10`} />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                    <div>
                      <label style={{ fontFamily: "'Jost', sans-serif" }} className={labelClass}>City</label>
                      <select name="city" value={form.city} onChange={handleChange} style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.85rem' }} className={inputClass}>
                        <option value="">Select City</option>
                        {['Delhi NCR', 'Mumbai', 'Bangalore', 'Jaipur', 'Pune', 'Chennai', 'Hyderabad'].map(c => <option key={c}>{c}</option>)}
                      </select>
                    </div>
                    <div>
                      <label style={{ fontFamily: "'Jost', sans-serif" }} className={labelClass}>Expected Guests</label>
                      <input name="guestCount" type="number" placeholder="e.g. 200" value={form.guestCount} onChange={handleChange} style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.85rem' }} className={inputClass} />
                    </div>
                  </div>

                  <div className="mb-6">
                    <label style={{ fontFamily: "'Jost', sans-serif" }} className={labelClass}>Special Requests (Optional)</label>
                    <textarea name="specialRequests" rows={3} placeholder="Color preferences, specific themes, any requirements..." value={form.specialRequests} onChange={handleChange} style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.85rem' }} className={`${inputClass} resize-none`} />
                  </div>

                  <button onClick={() => setCurrentStep(1)} style={{ fontFamily: "'Jost', sans-serif" }} className="w-full bg-[#1A1208] text-white rounded-full py-4 text-[0.78rem] tracking-[0.15em] uppercase font-semibold hover:bg-[#C9A84C] transition-colors flex items-center justify-center gap-2">
                    Continue to Personal Info <FiChevronRight size={15} />
                  </button>
                </div>
              )}

              {/* STEP 1 — Personal Info */}
              {currentStep === 1 && (
                <div>
                  <h2 style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-[1.6rem] text-[#1A1208] font-semibold mb-6">Personal Information</h2>

                  <div className="mb-5">
                    <label style={{ fontFamily: "'Jost', sans-serif" }} className={labelClass}>Full Name</label>
                    <div className="relative">
                      <FiUser size={15} color="#C9A84C" className="absolute left-4 top-1/2 -translate-y-1/2" />
                      <input name="name" type="text" placeholder="Your full name" value={form.name} onChange={handleChange} style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.85rem' }} className={`${inputClass} pl-10`} />
                    </div>
                  </div>

                  <div className="mb-5">
                    <label style={{ fontFamily: "'Jost', sans-serif" }} className={labelClass}>Email Address</label>
                    <div className="relative">
                      <FiMail size={15} color="#C9A84C" className="absolute left-4 top-1/2 -translate-y-1/2" />
                      <input name="email" type="email" placeholder="name@example.com" value={form.email} onChange={handleChange} style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.85rem' }} className={`${inputClass} pl-10`} />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
                    <div>
                      <label style={{ fontFamily: "'Jost', sans-serif" }} className={labelClass}>Phone Number</label>
                      <div className="relative">
                        <FiPhone size={15} color="#C9A84C" className="absolute left-4 top-1/2 -translate-y-1/2" />
                        <input name="phone" type="tel" placeholder="+91 98765 43210" value={form.phone} onChange={handleChange} style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.85rem' }} className={`${inputClass} pl-10`} />
                      </div>
                    </div>
                    <div>
                      <label style={{ fontFamily: "'Jost', sans-serif" }} className={labelClass}>Alternate Phone</label>
                      <input name="alternatePhone" type="tel" placeholder="Optional" value={form.alternatePhone} onChange={handleChange} style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.85rem' }} className={inputClass} />
                    </div>
                  </div>

                  {/* Payment Mode */}
                  <div className="mb-6">
                    <label style={{ fontFamily: "'Jost', sans-serif" }} className={labelClass}>Payment Mode</label>
                    <div className="grid grid-cols-2 gap-3">
                      {[{ value: 'advance', label: `Pay 30% Advance`, sub: formatPrice(advance) }, { value: 'full', label: 'Pay Full Amount', sub: formatPrice(total) }].map((opt) => (
                        <label key={opt.value} className={`flex flex-col p-4 rounded-xl border-2 cursor-pointer transition-all ${form.paymentMode === opt.value ? 'border-[#C9A84C] bg-[#FDFAF4]' : 'border-[#EDE0C4] bg-white'}`}>
                          <input type="radio" name="paymentMode" value={opt.value} checked={form.paymentMode === opt.value} onChange={handleChange} className="sr-only" />
                          <span style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.78rem] text-[#1A1208] font-semibold">{opt.label}</span>
                          <span style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-[1.2rem] text-[#C9A84C] font-bold">{opt.sub}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button onClick={() => setCurrentStep(0)} style={{ fontFamily: "'Jost', sans-serif" }} className="flex-1 border border-[#EDE0C4] text-[#5C4A1E] rounded-full py-4 text-[0.78rem] tracking-[0.15em] uppercase font-semibold hover:border-[#C9A84C] transition-colors">
                      Back
                    </button>
                    <button onClick={() => setCurrentStep(2)} style={{ fontFamily: "'Jost', sans-serif" }} className="flex-1 bg-[#1A1208] text-white rounded-full py-4 text-[0.78rem] tracking-[0.15em] uppercase font-semibold hover:bg-[#C9A84C] transition-colors flex items-center justify-center gap-2">
                      Review Order <FiChevronRight size={15} />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2 — Review & Pay */}
              {currentStep === 2 && (
                <div>
                  <h2 style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-[1.6rem] text-[#1A1208] font-semibold mb-6">Review Your Booking</h2>

                  {/* Event Summary */}
                  <div className="bg-[#FDFAF4] rounded-xl p-5 mb-5">
                    <h3 style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.7rem] text-[#9E8A6A] tracking-[0.2em] uppercase mb-3">Event Details</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {[['Date', form.eventDate || 'Not set'], ['Time', form.eventTime || 'Not set'], ['Venue', form.venue || 'Not set'], ['City', form.city || 'Not set'], ['Guests', form.guestCount || 'Not set']].map(([label, value]) => (
                        <div key={label}>
                          <p style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.65rem] text-[#9E8A6A] uppercase tracking-wider">{label}</p>
                          <p style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.82rem] text-[#1A1208] font-medium">{value}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Items */}
                  <div className="mb-5">
                    <h3 style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.7rem] text-[#9E8A6A] tracking-[0.2em] uppercase mb-3">Packages Booked</h3>
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex items-center gap-3 bg-[#FDFAF4] rounded-xl p-3 mb-2">
                        <img src={item.image} alt={item.title} className="w-14 h-14 rounded-lg object-cover" />
                        <div className="flex-1">
                          <p style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-[1rem] text-[#1A1208] font-semibold">{item.title}</p>
                          <p style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.72rem] text-[#9E8A6A]">Qty: {item.quantity}</p>
                        </div>
                        <p style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.9rem] text-[#1A1208] font-semibold">{formatPrice(item.price * item.quantity)}</p>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <button onClick={() => setCurrentStep(1)} style={{ fontFamily: "'Jost', sans-serif" }} className="flex-1 border border-[#EDE0C4] text-[#5C4A1E] rounded-full py-4 text-[0.78rem] tracking-[0.15em] uppercase font-semibold hover:border-[#C9A84C] transition-colors">
                      Back
                    </button>
                    <button
  onClick={handleConfirmPay}
  style={{ fontFamily: "'Jost', sans-serif" }}
  className="flex-1 bg-[#C9A84C] text-white rounded-full py-4 text-[0.78rem] tracking-[0.15em] uppercase font-semibold hover:bg-[#1A1208] transition-colors flex items-center justify-center gap-2"
>
  <FiLock size={14} /> Confirm & Pay
</button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT — Order Summary */}
          <div>
            <div className="bg-white rounded-2xl shadow-[0_4px_16px_rgba(26,18,8,0.06)] p-6 sticky top-[140px]">
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-[1.4rem] text-[#1A1208] font-semibold mb-5 pb-4 border-b border-[#EDE0C4]">
                Order Summary
              </h3>

              {cartItems.length === 0 ? (
                <div className="text-center py-6">
                  <p style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.82rem] text-[#9E8A6A]">No items in cart</p>
                  <Link to="/services" style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.78rem] text-[#C9A84C] mt-2 block">Browse Packages →</Link>
                </div>
              ) : (
                <>
                  <div className="space-y-3 mb-5">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex justify-between items-start">
                        <div>
                          <p style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.8rem] text-[#1A1208] font-medium leading-snug">{item.title}</p>
                          <p style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.7rem] text-[#9E8A6A]">x{item.quantity}</p>
                        </div>
                        <p style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.82rem] text-[#1A1208] font-semibold shrink-0">{formatPrice(item.price * item.quantity)}</p>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-2 pt-4 border-t border-[#EDE0C4] mb-4">
                    {[['Subtotal', subtotal], ['GST (18%)', gst], ['Convenience Fee', convenienceFee]].map(([l, v]) => (
                      <div key={String(l)} className="flex justify-between">
                        <span style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.82rem] text-[#5C4A1E]">{l}</span>
                        <span style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.82rem] text-[#1A1208]">{formatPrice(Number(v))}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between items-end pt-3 border-t border-[#EDE0C4]">
                    <span style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.85rem] text-[#1A1208] font-semibold">Total</span>
                    <span style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-[1.6rem] text-[#1A1208] font-bold">{formatPrice(total)}</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout