import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiMail, FiLock, FiEye, FiEyeOff, FiUser, FiPhone } from 'react-icons/fi'
import { FcGoogle } from 'react-icons/fc'
import { FaFacebook } from 'react-icons/fa'

const Register = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (password !== confirmPassword) {
      setError('Passwords do not match!')
      return
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    setIsLoading(true)
    setTimeout(() => setIsLoading(false), 2000)
  }

  // ============================================
  // REUSABLE CLASSES — Tailwind classes ko variable mein rakha
  // taaki repeat na karna pade
  // ============================================
  const inputWrapper = "flex items-center gap-3 border border-[#EDE0C4] px-4 py-3.5 bg-[#FDFAF4] focus-within:border-[#C9A84C] transition-colors"
  const inputField = "flex-1 bg-transparent outline-none text-[#1A1208] placeholder-[#9E8A6A]"
  const labelStyle = "block mb-2 text-[0.68rem] text-[#5C4A1E] tracking-[0.15em] uppercase"
  const socialBtn = "flex-1 flex items-center justify-center gap-2.5 py-3 border border-[#EDE0C4] bg-white text-[0.8rem] text-[#1A1208] tracking-wide font-medium hover:border-[#C9A84C] transition-colors"

  return (
    <div className="flex min-h-screen">

      {/* LEFT — Luxury Image */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden flex-col">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1400')` }}
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(154,122,46,0.6) 0%, transparent 50%)' }} />

        <div className="relative z-10 flex flex-col justify-between h-full p-12">
          <div>
            <div className="inline-flex items-center gap-2 border border-[#C9A84C]/40 px-3.5 py-1.5 mb-8">
              <div className="w-1.5 h-1.5 rounded-full bg-[#C9A84C]" />
              <span className="text-[0.62rem] text-[#E8C97A] tracking-[0.25em]" style={{ fontFamily: "'Jost', sans-serif" }}>
                JOIN THE EXPERIENCE
              </span>
            </div>
            <Link to="/" className="flex flex-col leading-tight">
              <span style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-[1.4rem] text-[#F5E6B8] font-bold tracking-[0.2em]">TOGETHER</span>
              <span style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.58rem] text-[#E8C97A] tracking-[0.45em]">MOMENTS</span>
            </Link>
          </div>

          <div>
            <p style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-[2.4rem] text-white italic leading-tight mb-5">
              Your celebration<br />starts here.
            </p>
            <p style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.82rem] text-white/70 leading-relaxed mb-8 max-w-[340px]">
              Create your account and unlock access to India's finest event decorators, vendors, and curated packages.
            </p>
            <div className="w-full h-px bg-[#C9A84C]/30 mb-6" />
            <span style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.65rem] text-white/50 tracking-[0.2em]">
              TRUSTED BY 10,000+ CELEBRATIONS ACROSS INDIA
            </span>
          </div>
        </div>
      </div>

      {/* RIGHT — Form */}
      <div className="flex-1 bg-white flex flex-col justify-between overflow-y-auto p-6 md:p-12">

        {/* Top link */}
        <div className="flex justify-end mb-6">
          <span style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.82rem] text-[#9E8A6A]">
            Already have an account?{' '}
            <Link to="/login" className="text-[#C9A84C] font-semibold">Sign In</Link>
          </span>
        </div>

        <div className="max-w-[420px] w-full mx-auto flex-1 flex flex-col justify-center">

          {/* Mobile Logo */}
          <div className="lg:hidden mb-7 flex justify-center">
            <Link to="/" className="flex flex-col items-center leading-tight">
              <span style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-[1.4rem] text-[#C9A84C] font-bold tracking-[0.2em]">TOGETHER</span>
              <span style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.58rem] text-[#1A1208] tracking-[0.45em]">MOMENTS</span>
            </Link>
          </div>

          {/* Heading */}
          <div className="mb-7">
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-[2.6rem] text-[#1A1208] font-semibold leading-tight mb-2">
              Create Account
            </h1>
            <p style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.85rem] text-[#9E8A6A]">
              Begin your journey with Together Moments.
            </p>
          </div>

          {/* Social Buttons */}
          <div className="flex gap-3 mb-6">
            <button type="button" style={{ fontFamily: "'Jost', sans-serif" }} className={socialBtn}>
              <FcGoogle size={18} /> GOOGLE
            </button>
            <button type="button" style={{ fontFamily: "'Jost', sans-serif" }} className={socialBtn}>
              <FaFacebook size={18} color="#1877F2" /> FACEBOOK
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-[#EDE0C4]" />
            <span style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.65rem] text-[#9E8A6A] tracking-[0.2em]">
              OR SIGN UP WITH EMAIL
            </span>
            <div className="flex-1 h-px bg-[#EDE0C4]" />
          </div>

          {/* Error */}
          {error && (
            <div style={{ fontFamily: "'Jost', sans-serif" }} className="bg-[#FCEBEB] border border-[#E24B4A] px-4 py-3 mb-5 text-[0.78rem] text-[#A32D2D]">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit}>

            {/* Full Name */}
            <div className="mb-4">
              <label style={{ fontFamily: "'Jost', sans-serif" }} className={labelStyle}>FULL NAME</label>
              <div className={inputWrapper}>
                <FiUser size={16} color="#C9A84C" />
                <input
                  type="text" placeholder="Your full name" value={name}
                  onChange={e => setName(e.target.value)} required
                  style={{ fontFamily: "'Jost', sans-serif" }}
                  className={`${inputField} text-[0.85rem]`}
                />
              </div>
            </div>

            {/* Email */}
            <div className="mb-4">
              <label style={{ fontFamily: "'Jost', sans-serif" }} className={labelStyle}>EMAIL ADDRESS</label>
              <div className={inputWrapper}>
                <FiMail size={16} color="#C9A84C" />
                <input
                  type="email" placeholder="name@example.com" value={email}
                  onChange={e => setEmail(e.target.value)} required
                  style={{ fontFamily: "'Jost', sans-serif" }}
                  className={`${inputField} text-[0.85rem]`}
                />
              </div>
            </div>

            {/* Phone */}
            <div className="mb-4">
              <label style={{ fontFamily: "'Jost', sans-serif" }} className={labelStyle}>PHONE NUMBER</label>
              <div className={inputWrapper}>
                <FiPhone size={16} color="#C9A84C" />
                <input
                  type="tel" placeholder="+91 98765 43210" value={phone}
                  onChange={e => setPhone(e.target.value)} required
                  style={{ fontFamily: "'Jost', sans-serif" }}
                  className={`${inputField} text-[0.85rem]`}
                />
              </div>
            </div>

            {/* Password + Confirm */}
            <div className="flex flex-col sm:flex-row gap-3 mb-4">
              <div className="flex-1">
                <label style={{ fontFamily: "'Jost', sans-serif" }} className={labelStyle}>PASSWORD</label>
                <div className={inputWrapper}>
                  <FiLock size={15} color="#C9A84C" />
                  <input
                    type={showPassword ? 'text' : 'password'} placeholder="········" value={password}
                    onChange={e => setPassword(e.target.value)} required
                    style={{ fontFamily: "'Jost', sans-serif" }}
                    className={`${inputField} text-[0.85rem] w-full`}
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-[#9E8A6A] hover:text-[#C9A84C]">
                    {showPassword ? <FiEyeOff size={15} /> : <FiEye size={15} />}
                  </button>
                </div>
              </div>

              <div className="flex-1">
                <label style={{ fontFamily: "'Jost', sans-serif" }} className={labelStyle}>CONFIRM PASSWORD</label>
                <div className={inputWrapper}>
                  <FiLock size={15} color="#C9A84C" />
                  <input
                    type={showConfirm ? 'text' : 'password'} placeholder="········" value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)} required
                    style={{ fontFamily: "'Jost', sans-serif" }}
                    className={`${inputField} text-[0.85rem] w-full`}
                  />
                  <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="text-[#9E8A6A] hover:text-[#C9A84C]">
                    {showConfirm ? <FiEyeOff size={15} /> : <FiEye size={15} />}
                  </button>
                </div>
              </div>
            </div>

            {/* Terms */}
            <div className="flex items-start gap-2.5 mb-6">
              <input type="checkbox" required className="accent-[#C9A84C] w-[15px] h-[15px] mt-0.5" />
              <label style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.78rem] text-[#5C4A1E] leading-relaxed">
                I agree to the{' '}
                <Link to="/terms" className="text-[#C9A84C] font-semibold">Terms & Conditions</Link>
                {' '}and{' '}
                <Link to="/privacy" className="text-[#C9A84C] font-semibold">Privacy Policy</Link>
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit" disabled={isLoading}
              style={{ fontFamily: "'Jost', sans-serif" }}
              className="w-full py-4 bg-[#1A1208] text-white text-[0.82rem] tracking-[0.15em] font-semibold flex items-center justify-center gap-2 hover:bg-[#C9A84C] transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Creating Account...' : <>Create Account →</>}
            </button>

          </form>
        </div>

        {/* Bottom links */}
        <div className="flex justify-center gap-6 mt-8 flex-wrap">
          {['Privacy', 'Terms', 'Cookies'].map(item => (
            <Link key={item} to={`/${item.toLowerCase()}`} style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.7rem] text-[#9E8A6A] tracking-[0.1em]">
              {item.toUpperCase()}
            </Link>
          ))}
          <span style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.7rem] text-[#9E8A6A] tracking-[0.1em]">
            © 2024 TOGETHER MOMENTS
          </span>
        </div>
      </div>
    </div>
  )
}

export default Register