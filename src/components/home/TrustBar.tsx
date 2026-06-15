import { FiCheckCircle, FiShield, FiZap, FiHeadphones, FiLock } from 'react-icons/fi'
import FadeIn from '../animations/FadeIn'

const trustItems = [
  { icon: FiCheckCircle, label: 'Verified Setup', color: '#7B9E7B' },
  { icon: FiShield, label: '100% Money Back', color: '#C9A84C' },
  { icon: FiZap, label: 'Same Day Available', color: '#D9776B' },
  { icon: FiHeadphones, label: '24/7 Support', color: '#C9A84C' },
  { icon: FiLock, label: 'Secure Payment', color: '#7B9E7B' },
]

const TrustBar = () => {
  return (
    <section className="bg-[#1A1208] py-6">
      <div className="container mx-auto px-6">
        <FadeIn>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {trustItems.map((item) => (
              <div key={item.label} className="flex items-center gap-2">
                <item.icon size={16} color={item.color} />
                <span style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.75rem] text-white/80 tracking-wide">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

export default TrustBar