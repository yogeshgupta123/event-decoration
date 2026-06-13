import { useState } from 'react'
import { FiMail, FiPhone, FiMapPin, FiSend, FiInstagram, FiFacebook, FiTwitter } from 'react-icons/fi'

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
    setTimeout(() => setSent(false), 4000)
  }

  const inputClass = "w-full bg-[#FDFAF4] border border-[#EDE0C4] rounded-xl px-4 py-3 outline-none focus:border-[#C9A84C] transition-colors text-[#1A1208] placeholder-[#9E8A6A]"
  const labelClass = "block text-[0.68rem] text-[#5C4A1E] tracking-[0.15em] uppercase mb-2"

  return (
    <div className="bg-[#FDFAF4]">

      {/* HERO */}
      <div className="bg-[#1A1208] py-14">
        <div className="container mx-auto px-6 text-center">
          <p style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.7rem] text-[#E8C97A] tracking-[0.3em] uppercase mb-3">Get in Touch</p>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-[2.4rem] md:text-[3rem] text-white font-semibold">
            Let's Plan Something <span className="italic text-[#F5E6B8]">Beautiful</span>
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-6 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* LEFT — Contact Info */}
          <div className="lg:col-span-1 space-y-5">
            {[
              { icon: FiPhone, title: 'Call Us', lines: ['+91 98765 43210', 'Mon–Sat, 9am–7pm'] },
              { icon: FiMail, title: 'Email Us', lines: ['hello@togethermoments.com', 'Reply within 4 hours'] },
              { icon: FiMapPin, title: 'Visit Us', lines: ['Connaught Place', 'New Delhi, India'] },
            ].map((info) => (
              <div key={info.title} className="bg-white rounded-2xl p-5 shadow-[0_4px_16px_rgba(26,18,8,0.06)] flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-[#FDFAF4] flex items-center justify-center shrink-0">
                  <info.icon size={18} color="#C9A84C" />
                </div>
                <div>
                  <h3 style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.75rem] text-[#1A1208] font-semibold tracking-wider uppercase mb-1">{info.title}</h3>
                  {info.lines.map((line) => (
                    <p key={line} style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.82rem] text-[#9E8A6A]">{line}</p>
                  ))}
                </div>
              </div>
            ))}

            {/* Social */}
            <div className="bg-white rounded-2xl p-5 shadow-[0_4px_16px_rgba(26,18,8,0.06)]">
              <h3 style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.72rem] text-[#1A1208] font-semibold tracking-[0.15em] uppercase mb-4">Follow Us</h3>
              <div className="flex gap-3">
                {[FiInstagram, FiFacebook, FiTwitter].map((Icon, i) => (
                  <a key={i} href="#" className="w-10 h-10 rounded-full border border-[#EDE0C4] flex items-center justify-center text-[#5C4A1E] hover:border-[#C9A84C] hover:text-[#C9A84C] transition-colors">
                    <Icon size={15} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT — Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-[0_4px_16px_rgba(26,18,8,0.06)] p-6 md:p-8">
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-[1.8rem] text-[#1A1208] font-semibold mb-6">Send Us a Message</h2>

              {sent && (
                <div style={{ fontFamily: "'Jost', sans-serif" }} className="bg-[#E8F8F2] border border-[#1D9E75] rounded-xl px-5 py-4 text-[0.82rem] text-[#1D9E75] font-medium mb-6">
                  ✓ Message sent! We'll get back to you within 4 hours.
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                  <div>
                    <label style={{ fontFamily: "'Jost', sans-serif" }} className={labelClass}>Full Name</label>
                    <input name="name" type="text" placeholder="Your name" value={form.name} onChange={handleChange} required style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.85rem' }} className={inputClass} />
                  </div>
                  <div>
                    <label style={{ fontFamily: "'Jost', sans-serif" }} className={labelClass}>Email Address</label>
                    <input name="email" type="email" placeholder="your@email.com" value={form.email} onChange={handleChange} required style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.85rem' }} className={inputClass} />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                  <div>
                    <label style={{ fontFamily: "'Jost', sans-serif" }} className={labelClass}>Phone Number</label>
                    <input name="phone" type="tel" placeholder="+91 98765 43210" value={form.phone} onChange={handleChange} style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.85rem' }} className={inputClass} />
                  </div>
                  <div>
                    <label style={{ fontFamily: "'Jost', sans-serif" }} className={labelClass}>Subject</label>
                    <select name="subject" value={form.subject} onChange={handleChange} style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.85rem' }} className={inputClass}>
                      <option value="">Select a topic</option>
                      <option>Wedding Decoration</option>
                      <option>Birthday Setup</option>
                      <option>Corporate Event</option>
                      <option>Vendor Partnership</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>

                <div className="mb-6">
                  <label style={{ fontFamily: "'Jost', sans-serif" }} className={labelClass}>Your Message</label>
                  <textarea name="message" rows={5} placeholder="Tell us about your event, requirements, or any queries..." value={form.message} onChange={handleChange} required style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.85rem' }} className={`${inputClass} resize-none`} />
                </div>

                <button type="submit" style={{ fontFamily: "'Jost', sans-serif" }} className="flex items-center gap-2 bg-[#1A1208] text-white rounded-full px-8 py-4 text-[0.78rem] tracking-[0.15em] uppercase font-semibold hover:bg-[#C9A84C] transition-colors">
                  <FiSend size={14} /> Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact