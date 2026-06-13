import { useState } from 'react'
import { FiPlus, FiMinus } from 'react-icons/fi'

// ============================================
// FAQ DATA
// ============================================
const faqs = [
  {
    question: 'How far in advance should I book my decoration?',
    answer: 'We recommend booking at least 2-3 weeks in advance for regular events and 1-2 months for weddings to ensure vendor availability and proper planning.',
  },
  {
    question: 'Can I customize a package according to my budget?',
    answer: 'Absolutely! All our packages are flexible. Our team will work with you to customize themes, colors, and add-ons that fit within your budget.',
  },
  {
    question: 'What happens if I need to cancel or reschedule?',
    answer: 'Free cancellation is available up to 48 hours before the event. Cancellations within 48 hours may incur a 25% convenience fee. Rescheduling is free up to 72 hours prior.',
  },
  {
    question: 'Do you provide vendors outside of major cities?',
    answer: 'Yes, we have a growing network across 50+ cities in India. Enter your location while browsing to see vendors available in your area.',
  },
  {
    question: 'Is a site visit included before the event?',
    answer: 'Premium packages include a complimentary site visit and consultation call with our lead stylist to finalize layout and decor placement.',
  },
]

const FAQ = () => {
  // ============================================
  // STATE — kaun sa FAQ khula hai
  // null = sab band, number = wo index khula hai
  // ============================================
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggleFAQ = (index: number) => {
    // agar already khula hai, toh band karo (null)
    // warna naya wala kholo
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="section-padding bg-[#FDFAF4]">
      <div className="container mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-12">
          <h2
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
            className="text-[2rem] md:text-[2.6rem] text-[#1A1208] font-semibold mb-2"
          >
            Good to Know
          </h2>
          <p
            style={{ fontFamily: "'Jost', sans-serif" }}
            className="text-[0.7rem] text-[#9E8A6A] tracking-[0.25em] uppercase"
          >
            Frequently Asked Questions
          </p>
          <div className="w-10 h-[1px] bg-[#C9A84C] mx-auto mt-4" />
        </div>

        {/* FAQ List */}
        <div className="max-w-[700px] mx-auto space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index

            return (
              <div
                key={index}
                className="bg-white border border-[#EDE0C4] overflow-hidden"
              >
                {/* Question — click karne se toggle */}
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span
                    style={{ fontFamily: "'Jost', sans-serif" }}
                    className="text-[0.92rem] text-[#1A1208] font-medium"
                  >
                    {faq.question}
                  </span>

                  {/* Icon — open hone par Minus, band hone par Plus */}
                  <span className="shrink-0 w-7 h-7 rounded-full border border-[#EDE0C4] flex items-center justify-center">
                    {isOpen ? <FiMinus size={13} color="#C9A84C" /> : <FiPlus size={13} color="#C9A84C" />}
                  </span>
                </button>

                {/* ============================================
                    ANSWER — sirf isOpen true hone par dikhao
                    max-h-0 → max-h-[200px] transition se
                    smooth open/close animation milta hai
                ============================================ */}
                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isOpen ? 'max-h-[200px]' : 'max-h-0'
                  }`}
                >
                  <p
                    style={{ fontFamily: "'Jost', sans-serif" }}
                    className="px-6 pb-5 text-[0.85rem] text-[#9E8A6A] leading-relaxed"
                  >
                    {faq.answer}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}

export default FAQ