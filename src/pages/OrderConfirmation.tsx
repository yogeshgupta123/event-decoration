import { useState } from 'react'
import { useParams, useLocation, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiCheck, FiCalendar, FiMapPin, FiPackage, FiCopy } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'

const formatPrice = (price: number) => `₹${price.toLocaleString('en-IN')}`

interface BookingState {
  total?: number
  eventDate?: string
  eventTime?: string
  venue?: string
  city?: string
}

const OrderConfirmation = () => {
  const { id } = useParams<{ id: string }>()
  const location = useLocation()
  const state = (location.state || {}) as BookingState

  const [copied, setCopied] = useState(false)

  const bookingId = id || 'TM-2026-0000'

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(bookingId)
      setCopied(true)

      setTimeout(() => {
        setCopied(false)
      }, 2000)
    } catch (error) {
      console.error('Failed to copy booking ID:', error)
    }
  }

  // ============================================
  // WhatsApp Link
  // ============================================
  const whatsappMessage = encodeURIComponent(
    `Hi Together Moments! My booking ${bookingId} is confirmed${
      state.eventDate ? ` for ${state.eventDate}` : ''
    }. Looking forward to it! 🎉`
  )

  const whatsappLink = `https://wa.me/919876543210?text=${whatsappMessage}`

  // ============================================
  // Google Calendar Link
  // ============================================
  const calendarLink = (() => {
    if (!state.eventDate) return null

    const dateStr = state.eventDate.replace(/-/g, '')
    const timeStr = state.eventTime
      ? state.eventTime.replace(':', '') + '00'
      : '100000'

    const start = `${dateStr}T${timeStr}`

    const details = encodeURIComponent(
      `Your Together Moments booking ${bookingId} is confirmed!`
    )

    const text = encodeURIComponent('Together Moments - Celebration')

    const loc = encodeURIComponent(state.venue || '')

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${text}&dates=${start}/${start}&details=${details}&location=${loc}`
  })()

  return (
    <div className="bg-[#FDFAF4] min-h-[80vh] flex items-center py-14">
      <div className="container mx-auto px-6">
        <div className="max-w-[560px] mx-auto bg-white rounded-2xl shadow-[0_8px_40px_rgba(26,18,8,0.08)] p-8 md:p-10 text-center">
          
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: 'spring',
              stiffness: 200,
              damping: 14,
            }}
            className="w-20 h-20 rounded-full bg-[#7B9E7B] flex items-center justify-center mx-auto mb-6"
          >
            <FiCheck size={36} color="white" />
          </motion.div>

          <h1
            style={{
              fontFamily: "'Cormorant Garamond', serif",
            }}
            className="text-[2rem] md:text-[2.4rem] text-[#1A1208] font-semibold mb-2"
          >
            Booking Confirmed! 🎉
          </h1>

          <p
            style={{
              fontFamily: "'Jost', sans-serif",
            }}
            className="text-[0.85rem] text-[#9E8A6A] mb-6"
          >
            Thank you for choosing Together Moments. Get ready for something
            magical!
          </p>

          {/* Booking ID */}
          <div className="bg-[#FDFAF4] rounded-xl p-4 mb-6 flex items-center justify-between">
            <div className="text-left">
              <p
                style={{
                  fontFamily: "'Jost', sans-serif",
                }}
                className="text-[0.62rem] text-[#9E8A6A] uppercase tracking-wider"
              >
                Booking ID
              </p>

              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                }}
                className="text-[1.3rem] text-[#1A1208] font-bold"
              >
                {bookingId}
              </p>
            </div>

            <button
              onClick={handleCopy}
              style={{
                fontFamily: "'Jost', sans-serif",
              }}
              className="flex items-center gap-1.5 text-[0.72rem] text-[#C9A84C] font-semibold hover:text-[#9A7A2E] transition-colors"
            >
              <FiCopy size={13} />
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>

          {/* Event Summary */}
          {(state.eventDate || state.venue || state.total !== undefined) && (
            <div className="space-y-2 mb-6 text-left bg-[#FDFAF4] rounded-xl p-4">
              
              {state.eventDate && (
                <div className="flex items-center gap-2.5">
                  <FiCalendar size={14} color="#C9A84C" />

                  <span
                    style={{
                      fontFamily: "'Jost', sans-serif",
                    }}
                    className="text-[0.82rem] text-[#5C4A1E]"
                  >
                    {state.eventDate}
                    {state.eventTime && ` · ${state.eventTime}`}
                  </span>
                </div>
              )}

              {state.venue && (
                <div className="flex items-center gap-2.5">
                  <FiMapPin size={14} color="#C9A84C" />

                  <span
                    style={{
                      fontFamily: "'Jost', sans-serif",
                    }}
                    className="text-[0.82rem] text-[#5C4A1E]"
                  >
                    {state.venue}
                    {state.city ? `, ${state.city}` : ''}
                  </span>
                </div>
              )}

              {state.total !== undefined && (
                <div className="flex items-center justify-between pt-2 border-t border-[#EDE0C4]">
                  <span
                    style={{
                      fontFamily: "'Jost', sans-serif",
                    }}
                    className="text-[0.8rem] text-[#1A1208] font-semibold"
                  >
                    Amount Paid
                  </span>

                  <span
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                    }}
                    className="text-[1.3rem] text-[#1A1208] font-bold"
                  >
                    {formatPrice(state.total)}
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Info Box */}
          <div className="bg-[#FFF8EC] border border-[#EDE0C4] rounded-xl p-4 mb-6">
            <p
              style={{
                fontFamily: "'Jost', sans-serif",
              }}
              className="text-[0.8rem] text-[#5C4A1E]"
            >
              📞 Our team will contact you within{' '}
              <span className="font-semibold text-[#1A1208]">
                2 hours
              </span>{' '}
              to confirm the details.
            </p>
          </div>

          {/* Buttons */}
          <div className="space-y-3">
            
            {/* WhatsApp */}
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "'Jost', sans-serif",
              }}
              className="w-full flex items-center justify-center gap-2 bg-[#25D366] text-white rounded-full py-3.5 text-[0.78rem] tracking-[0.1em] uppercase font-semibold hover:opacity-90 transition-opacity"
            >
              <FaWhatsapp size={16} />
              Message Us on WhatsApp
            </a>

            {/* Calendar */}
            {calendarLink && (
              <a
                href={calendarLink}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: "'Jost', sans-serif",
                }}
                className="w-full flex items-center justify-center gap-2 border border-[#1A1208] text-[#1A1208] rounded-full py-3.5 text-[0.78rem] tracking-[0.1em] uppercase font-semibold hover:bg-[#1A1208] hover:text-white transition-colors"
              >
                <FiCalendar size={15} />
                Add to Calendar
              </a>
            )}

            {/* Dashboard */}
            <Link
              to="/dashboard"
              style={{
                fontFamily: "'Jost', sans-serif",
              }}
              className="w-full flex items-center justify-center gap-2 bg-[#C9A84C] text-white rounded-full py-3.5 text-[0.78rem] tracking-[0.1em] uppercase font-semibold hover:bg-[#1A1208] transition-colors"
            >
              <FiPackage size={15} />
              Track on Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderConfirmation