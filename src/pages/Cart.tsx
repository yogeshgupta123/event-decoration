import { Link } from 'react-router-dom'
import { FiTrash2, FiPlus, FiMinus, FiShoppingBag, FiArrowRight, FiTag } from 'react-icons/fi'
import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { removeFromCart, increaseQuantity, decreaseQuantity } from '../store/cartSlice'

const formatPrice = (price: number) => `₹${price.toLocaleString('en-IN')}`

const Cart = () => {
  const dispatch = useAppDispatch()
  const cartItems = useAppSelector((state) => state.cart.items)
  const [promoCode, setPromoCode] = useState('')
  const [promoApplied, setPromoApplied] = useState(false)

  // ============================================
  // CALCULATIONS — price breakdown
  // ============================================
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const discount = promoApplied ? Math.round(subtotal * 0.1) : 0 // 10% off agar promo lagaya
  const gst = Math.round((subtotal - discount) * 0.18) // 18% GST
  const convenienceFee = cartItems.length > 0 ? 500 : 0
  const total = subtotal - discount + gst + convenienceFee

  const handleApplyPromo = () => {
    if (promoCode.trim().toUpperCase() === 'MOMENTS10') {
      setPromoApplied(true)
    }
  }

  // ============================================
  // EMPTY CART STATE
  // ============================================
  if (cartItems.length === 0) {
    return (
      <div className="bg-[#FDFAF4] min-h-[60vh] flex items-center justify-center">
        <div className="text-center px-6">
          <div className="w-20 h-20 rounded-full bg-white shadow-[0_4px_16px_rgba(26,18,8,0.06)] flex items-center justify-center mx-auto mb-6">
            <FiShoppingBag size={32} color="#C9A84C" />
          </div>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-[1.8rem] text-[#1A1208] font-semibold mb-2">
            Your Booking Bag is Empty
          </h2>
          <p style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.85rem] text-[#9E8A6A] mb-8 max-w-[340px] mx-auto">
            Looks like you haven't added any packages yet. Explore our curated collections!
          </p>
          <Link
            to="/services"
            style={{ fontFamily: "'Jost', sans-serif" }}
            className="inline-flex items-center gap-2 bg-[#1A1208] text-white rounded-full px-8 py-4 text-[0.75rem] tracking-[0.2em] uppercase font-medium hover:bg-[#C9A84C] transition-colors"
          >
            Explore Packages <FiArrowRight size={14} />
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-[#FDFAF4] py-10">
      <div className="container mx-auto px-6">

        {/* Header */}
        <div className="mb-8">
          <p style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.72rem] text-[#9E8A6A] mb-2">
            Home / <span className="text-[#D9776B]">Booking Bag</span>
          </p>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-[2rem] md:text-[2.6rem] text-[#1A1208] font-semibold">
            Your Booking Bag{' '}
            <span style={{ fontFamily: "'Jost', sans-serif" }} className="text-[1rem] text-[#9E8A6A] font-normal">
              ({cartItems.length} {cartItems.length === 1 ? 'item' : 'items'})
            </span>
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* ============================================
              LEFT — Cart Items
          ============================================ */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-[0_4px_16px_rgba(26,18,8,0.06)] p-4 sm:p-5 flex gap-4"
              >
                {/* Image */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-24 h-24 sm:w-32 sm:h-32 rounded-xl object-cover shrink-0"
                />

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between min-w-0">
                  <div>
                    <p style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.62rem] text-[#C9A84C] tracking-[0.2em] uppercase mb-1 font-semibold">
                      {item.category}
                    </p>
                    <h3 style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-[1.05rem] sm:text-[1.25rem] text-[#1A1208] font-semibold mb-1 leading-snug">
                      {item.title}
                    </h3>
                    <p style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.85rem] text-[#9E8A6A]">
                      {formatPrice(item.price)} <span className="text-[#EDE0C4]">/ unit</span>
                    </p>
                  </div>

                  {/* Quantity + Remove + Total */}
                  <div className="flex items-center justify-between mt-3 flex-wrap gap-3">
                    {/* Quantity Stepper */}
                    <div className="flex items-center gap-3 bg-[#FDFAF4] rounded-full px-3 py-1.5">
                      <button
                        onClick={() => dispatch(decreaseQuantity(item.id))}
                        className="w-6 h-6 rounded-full flex items-center justify-center hover:bg-[#EDE0C4] transition-colors"
                      >
                        <FiMinus size={12} />
                      </button>
                      <span style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.85rem] text-[#1A1208] font-semibold w-4 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => dispatch(increaseQuantity(item.id))}
                        className="w-6 h-6 rounded-full flex items-center justify-center hover:bg-[#EDE0C4] transition-colors"
                      >
                        <FiPlus size={12} />
                      </button>
                    </div>

                    <div className="flex items-center gap-4">
                      <span style={{ fontFamily: "'Jost', sans-serif" }} className="text-[1rem] text-[#1A1208] font-semibold">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                      <button
                        onClick={() => dispatch(removeFromCart(item.id))}
                        className="text-[#9E8A6A] hover:text-[#D9776B] transition-colors"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Continue Shopping */}
            <Link
              to="/services"
              style={{ fontFamily: "'Jost', sans-serif" }}
              className="inline-flex items-center gap-2 text-[0.78rem] text-[#1A1208] tracking-[0.15em] uppercase font-medium hover:text-[#C9A84C] transition-colors mt-2"
            >
              ← Continue Exploring Packages
            </Link>
          </div>

          {/* ============================================
              RIGHT — Payment Summary
          ============================================ */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-[0_4px_16px_rgba(26,18,8,0.06)] p-6 sticky top-[140px]">

              <h3 style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-[1.4rem] text-[#1A1208] font-semibold mb-5 pb-4 border-b border-[#EDE0C4]">
                Payment Summary
              </h3>

              {/* Breakdown */}
              <div className="space-y-3 mb-5">
                <div className="flex justify-between">
                  <span style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.85rem] text-[#5C4A1E]">Subtotal</span>
                  <span style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.85rem] text-[#1A1208] font-medium">{formatPrice(subtotal)}</span>
                </div>

                {promoApplied && (
                  <div className="flex justify-between">
                    <span style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.85rem] text-[#D9776B]">Discount (10%)</span>
                    <span style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.85rem] text-[#D9776B] font-medium">-{formatPrice(discount)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.85rem] text-[#5C4A1E]">GST (18%)</span>
                  <span style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.85rem] text-[#1A1208] font-medium">{formatPrice(gst)}</span>
                </div>

                <div className="flex justify-between">
                  <span style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.85rem] text-[#5C4A1E]">Convenience & Setup</span>
                  <span style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.85rem] text-[#1A1208] font-medium">{formatPrice(convenienceFee)}</span>
                </div>
              </div>

              {/* Total */}
              <div className="flex justify-between items-end pt-4 border-t border-[#EDE0C4] mb-6">
                <span style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.9rem] text-[#1A1208] font-semibold">Total Payable</span>
                <div className="text-right">
                  <span style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-[1.6rem] text-[#1A1208] font-bold">{formatPrice(total)}</span>
                  <p style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.65rem] text-[#9E8A6A]">Inclusive of all taxes</p>
                </div>
              </div>

              {/* Promo Code */}
              <div className="mb-6">
                <label style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.65rem] text-[#5C4A1E] tracking-[0.15em] uppercase mb-2 block">
                  Promo Code
                </label>
                <div className="flex gap-2">
                  <div className="flex-1 flex items-center gap-2 bg-[#FDFAF4] rounded-full px-4 py-2.5">
                    <FiTag size={14} color="#C9A84C" />
                    <input
                      type="text"
                      placeholder="Try MOMENTS10"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      style={{ fontFamily: "'Jost', sans-serif" }}
                      className="flex-1 bg-transparent outline-none text-[0.8rem] text-[#1A1208] placeholder-[#9E8A6A]"
                    />
                  </div>
                  <button
                    onClick={handleApplyPromo}
                    style={{ fontFamily: "'Jost', sans-serif" }}
                    className="bg-[#1A1208] text-white rounded-full px-5 text-[0.72rem] tracking-[0.1em] uppercase font-semibold hover:bg-[#C9A84C] transition-colors"
                  >
                    Apply
                  </button>
                </div>
                {promoApplied && (
                  <p style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.72rem] text-[#1D9E75] mt-2">
                    ✓ Promo code applied successfully!
                  </p>
                )}
              </div>

              {/* Checkout Button */}
              <button
                style={{ fontFamily: "'Jost', sans-serif" }}
                className="w-full bg-[#C9A84C] text-white rounded-full py-4 text-[0.78rem] tracking-[0.2em] uppercase font-semibold hover:bg-[#1A1208] transition-colors flex items-center justify-center gap-2"
              >
                Securely Book & Pay <FiArrowRight size={14} />
              </button>

              {/* Cancellation Policy */}
              <div className="mt-5 bg-[#FDFAF4] rounded-xl p-4">
                <p style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.7rem] text-[#9E8A6A] leading-relaxed">
                  <span className="text-[#1A1208] font-semibold">Cancellation Policy:</span> Free cancellation up to 48 hours before the scheduled time. Cancellations within 48 hours incur a 25% convenience fee.
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Cart