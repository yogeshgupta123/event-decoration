import { FiShield, FiClock, FiDollarSign, FiHeadphones } from 'react-icons/fi'
import FadeIn from '../animations/FadeIn'
import { StaggerContainer, StaggerItem } from '../animations/StaggerContainer'

const features = [
  { icon: FiShield, title: 'Verified Vendors', description: 'Every vendor is background-checked and rated by real clients before joining our network.' },
  { icon: FiClock, title: 'On-Time Delivery', description: 'Setup completed well before your event with buffer time for any last-minute changes.' },
  { icon: FiDollarSign, title: 'Transparent Pricing', description: 'No hidden charges. What you see in the quote is exactly what you pay.' },
  { icon: FiHeadphones, title: '24/7 Support', description: 'Our dedicated event managers are available round the clock for any assistance.' },
]

const WhyChooseUs = () => {
  return (
    <section className="section-padding bg-[#FDFAF4]">
      <div className="container mx-auto px-6">

        <FadeIn>
          <div className="text-center mb-12">
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-[2rem] md:text-[2.6rem] text-[#1A1208] font-semibold mb-2">
              Why Choose Us
            </h2>
            <p style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.7rem] text-[#9E8A6A] tracking-[0.25em] uppercase">
              The Together Moments Promise
            </p>
            <div className="w-10 h-[1px] bg-[#C9A84C] mx-auto mt-4" />
          </div>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => {
            const colors = ['#C9A84C', '#D9776B', '#C9A84C', '#D9776B']
            const color = colors[i % colors.length]
            return (
              <StaggerItem key={feature.title}>
                <div className="group text-center p-8 bg-white rounded-2xl shadow-[0_4px_16px_rgba(26,18,8,0.06)] hover:shadow-[0_16px_40px_rgba(201,168,76,0.2)] hover:-translate-y-2 transition-all duration-300 h-full">
                  <div
                    className="w-16 h-16 rounded-full bg-[#FDFAF4] flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300"
                    style={{ border: `1.5px solid ${color}40` }}
                  >
                    <feature.icon size={24} style={{ color }} />
                  </div>
                  <h3 style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-[1.2rem] text-[#1A1208] font-semibold mb-3">
                    {feature.title}
                  </h3>
                  <p style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.82rem] text-[#9E8A6A] leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </StaggerItem>
            )
          })}
        </StaggerContainer>
      </div>
    </section>
  )
}

export default WhyChooseUs