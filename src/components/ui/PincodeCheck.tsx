import { useState } from 'react'
import { FiMapPin, FiCheck, FiX } from 'react-icons/fi'

const PincodeCheck = () => {
  const [pincode, setPincode] = useState('')
  const [result, setResult] = useState<'available' | 'unavailable' | null>(null)

  const checkAvailability = () => {
    if (pincode.length !== 6) return
    // ============================================
    // DEMO LOGIC — real app mein API call hoga
    // abhi: even last digit = available
    // ============================================
    const lastDigit = Number(pincode[pincode.length - 1])
    setResult(lastDigit % 2 === 0 ? 'available' : 'unavailable')
  }

  return (
    <div className="bg-white rounded-2xl p-5 shadow-[0_2px_8px_rgba(26,18,8,0.05)]">
      <h3 style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.72rem] text-[#1A1208] font-semibold tracking-[0.15em] uppercase mb-3 flex items-center gap-2">
        <FiMapPin size={14} color="#C9A84C" /> Check Delivery Availability
      </h3>
      <div className="flex gap-2">
        <input
          type="text"
          maxLength={6}
          placeholder="Enter pincode"
          value={pincode}
          onChange={(e) => { setPincode(e.target.value.replace(/\D/g, '')); setResult(null) }}
          style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.82rem' }}
          className="flex-1 bg-[#FDFAF4] border border-[#EDE0C4] rounded-xl px-4 py-2.5 outline-none focus:border-[#C9A84C] transition-colors text-[#1A1208]"
        />
        <button
          onClick={checkAvailability}
          style={{ fontFamily: "'Jost', sans-serif" }}
          className="bg-[#1A1208] text-white rounded-xl px-5 text-[0.72rem] uppercase tracking-wider font-semibold hover:bg-[#C9A84C] transition-colors shrink-0"
        >
          Check
        </button>
      </div>
      {result === 'available' && (
        <p style={{ fontFamily: "'Jost', sans-serif" }} className="flex items-center gap-1.5 text-[0.78rem] text-[#7B9E7B] mt-2 font-medium"><FiCheck size={13} /> Available for delivery!</p>
      )}
      {result === 'unavailable' && (
        <p style={{ fontFamily: "'Jost', sans-serif" }} className="flex items-center gap-1.5 text-[0.78rem] text-[#D9776B] mt-2 font-medium"><FiX size={13} /> Sorry, not serviceable here yet.</p>
      )}
    </div>
  )
}

export default PincodeCheck