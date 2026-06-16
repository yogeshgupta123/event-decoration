import { useState } from 'react'
import { FiCopy, FiGift, FiShare2 } from 'react-icons/fi'

const Referral = () => {
  const [copied, setCopied] = useState(false)

  const referralCode = 'YOGESH200'

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(referralCode)
      setCopied(true)

      setTimeout(() => {
        setCopied(false)
      }, 2000)
    } catch (error) {
      console.error('Failed to copy:', error)
    }
  }

  const shareLink = `https://wa.me/?text=${encodeURIComponent(
    `Use my code ${referralCode} on Together Moments and get ₹200 off your first booking! 🎉`
  )}`

  return (
    <div className="bg-[#FDFAF4] min-h-[70vh] py-14">
      <div className="container mx-auto px-6 max-w-[520px]">
        <div className="bg-white rounded-2xl shadow-[0_8px_40px_rgba(26,18,8,0.08)] p-8 text-center">
          <div className="w-16 h-16 rounded-full bg-[#FDFAF4] flex items-center justify-center mx-auto mb-5">
            <FiGift size={28} color="#C9A84C" />
          </div>

          <h1
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
            className="text-[1.8rem] text-[#1A1208] font-semibold mb-2"
          >
            Refer a Friend, Get ₹200 Off
          </h1>

          <p
            style={{ fontFamily: "'Jost', sans-serif" }}
            className="text-[0.85rem] text-[#9E8A6A] mb-6"
          >
            Share your code — when your friend books their first celebration,
            you both get ₹200 off!
          </p>

          <div className="bg-[#FDFAF4] border-2 border-dashed border-[#C9A84C] rounded-xl p-4 flex items-center justify-between mb-6">
            <span
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
              className="text-[1.4rem] text-[#1A1208] font-bold tracking-wider"
            >
              {referralCode}
            </span>

            <button
              onClick={handleCopy}
              style={{ fontFamily: "'Jost', sans-serif" }}
              className="flex items-center gap-1.5 text-[0.72rem] text-[#C9A84C] font-semibold"
            >
              <FiCopy size={13} />
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>

          <a
            href={shareLink}
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontFamily: "'Jost', sans-serif" }}
            className="w-full flex items-center justify-center gap-2 bg-[#C9A84C] text-white rounded-full py-3.5 text-[0.75rem] tracking-[0.15em] uppercase font-semibold hover:bg-[#1A1208] transition-colors"
          >
            <FiShare2 size={14} />
            Share on WhatsApp
          </a>
        </div>
      </div>
    </div>
  )
}

export default Referral