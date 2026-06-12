import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi'
import { FcGoogle } from 'react-icons/fc'
import { FaFacebook } from 'react-icons/fa'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { login } from '../store/authSlice'

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { loading, error, isLoggedIn } = useAppSelector((state) => state.auth)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [remember, setRemember] = useState(false)

  // ============================================
  // useEffect — jab isLoggedIn TRUE ho jaye
  // (matlab login successful), tab Home pe bhej do
  // ============================================
  useEffect(() => {
    if (isLoggedIn) {
      navigate('/')
    }
  }, [isLoggedIn, navigate])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    dispatch(login({ email, password }))
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>

      {/* LEFT — Luxury Image */}
      <div style={{ width: '50%', position: 'relative', overflow: 'hidden', display: 'none' }} className="login-left">
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `url('https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1400')`,
          backgroundSize: 'cover', backgroundPosition: 'center',
        }} />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.55)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(154,122,46,0.6) 0%, transparent 50%)' }} />

        <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', padding: '48px' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', border: '1px solid rgba(201,168,76,0.4)', padding: '6px 14px', marginBottom: '32px' }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#C9A84C' }} />
              <span style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.62rem', color: '#E8C97A', letterSpacing: '0.25em' }}>
                ELITE EXPERIENCES
              </span>
            </div>
            <Link to="/" style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.4rem', color: '#F5E6B8', fontWeight: 700, letterSpacing: '0.2em' }}>TOGETHER</span>
              <span style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.58rem', color: '#E8C97A', letterSpacing: '0.45em' }}>MOMENTS</span>
            </Link>
          </div>

          <div>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2.4rem', color: '#FFFFFF', fontWeight: 400, lineHeight: 1.3, fontStyle: 'italic', marginBottom: '20px' }}>
              Crafting memories<br />that stay forever.
            </p>
            <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.82rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, marginBottom: '32px', maxWidth: '340px' }}>
              Join India's most exclusive event decoration platform. Discover curated themes, premium vendors, and seamless planning tools.
            </p>
            <div style={{ width: '100%', height: '1px', background: 'rgba(201,168,76,0.3)', marginBottom: '24px' }} />
            <span style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.65rem', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.2em' }}>
              TRUSTED BY 10,000+ CELEBRATIONS ACROSS INDIA
            </span>
          </div>
        </div>
      </div>

      {/* RIGHT — Form */}
      <div style={{ flex: 1, background: '#FFFFFF', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', overflowY: 'auto', padding: '48px' }}>

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '32px' }}>
          <span style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.82rem', color: '#9E8A6A' }}>
            Don't have an account?{' '}
            <Link to="/register" style={{ color: '#C9A84C', fontWeight: 600, textDecoration: 'none' }}>
              Create an account
            </Link>
          </span>
        </div>

        <div style={{ maxWidth: '420px', width: '100%', margin: '0 auto', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>

          {/* Mobile Logo */}
          <div className="login-mobile-logo" style={{ display: 'none', marginBottom: '32px' }}>
            <Link to="/" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', lineHeight: 1.1 }}>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.4rem', color: '#C9A84C', fontWeight: 700, letterSpacing: '0.2em' }}>TOGETHER</span>
              <span style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.58rem', color: '#1A1208', letterSpacing: '0.45em' }}>MOMENTS</span>
            </Link>
          </div>

          {/* Heading */}
          <div style={{ marginBottom: '24px' }}>
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2.6rem', color: '#1A1208', fontWeight: 600, lineHeight: 1.1, marginBottom: '10px' }}>
              Welcome Back
            </h1>
            <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.85rem', color: '#9E8A6A', letterSpacing: '0.02em' }}>
              Please enter your details to access your luxury planner.
            </p>
          </div>

          {/* ============================================
              ERROR MESSAGE — agar Redux mein error hai toh dikhao
          ============================================ */}
          {error && (
            <div style={{
              background: '#FCEBEB', border: '1px solid #E24B4A', padding: '12px 16px', marginBottom: '20px',
              fontFamily: "'Jost', sans-serif", fontSize: '0.78rem', color: '#A32D2D',
            }}>
              {error}
            </div>
          )}

          {/* Social Login */}
          <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
            <button type="button" style={{
              flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
              padding: '12px', border: '1px solid #EDE0C4', background: '#FFFFFF',
              fontFamily: "'Jost', sans-serif", fontSize: '0.8rem', color: '#1A1208',
              cursor: 'pointer', letterSpacing: '0.05em', fontWeight: 500,
              transition: 'border-color 0.2s',
            }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = '#C9A84C')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = '#EDE0C4')}
            >
              <FcGoogle size={18} /> GOOGLE
            </button>
            <button type="button" style={{
              flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
              padding: '12px', border: '1px solid #EDE0C4', background: '#FFFFFF',
              fontFamily: "'Jost', sans-serif", fontSize: '0.8rem', color: '#1A1208',
              cursor: 'pointer', letterSpacing: '0.05em', fontWeight: 500,
              transition: 'border-color 0.2s',
            }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = '#C9A84C')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = '#EDE0C4')}
            >
              <FaFacebook size={18} color="#1877F2" /> FACEBOOK
            </button>
          </div>

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
            <div style={{ flex: 1, height: '1px', background: '#EDE0C4' }} />
            <span style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.65rem', color: '#9E8A6A', letterSpacing: '0.2em' }}>
              OR CONTINUE WITH EMAIL
            </span>
            <div style={{ flex: 1, height: '1px', background: '#EDE0C4' }} />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>

            {/* Email */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.68rem', color: '#5C4A1E', letterSpacing: '0.15em', display: 'block', marginBottom: '8px' }}>
                EMAIL ADDRESS
              </label>
              <div style={{
                display: 'flex', alignItems: 'center', gap: '12px',
                border: '1px solid #EDE0C4', padding: '14px 16px', background: '#FDFAF4',
                transition: 'border-color 0.2s',
              }}
                onFocus={e => (e.currentTarget.style.borderColor = '#C9A84C')}
                onBlur={e => (e.currentTarget.style.borderColor = '#EDE0C4')}
              >
                <FiMail size={16} color="#C9A84C" />
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  style={{
                    flex: 1, background: 'transparent', border: 'none', outline: 'none',
                    fontFamily: "'Jost', sans-serif", fontSize: '0.85rem', color: '#1A1208',
                  }}
                />
              </div>
            </div>

            {/* Password */}
            <div style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <label style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.68rem', color: '#5C4A1E', letterSpacing: '0.15em' }}>
                  PASSWORD
                </label>
                <Link to="/forgot-password" style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.72rem', color: '#C9A84C', textDecoration: 'none' }}>
                  Forgot?
                </Link>
              </div>
              <div style={{
                display: 'flex', alignItems: 'center', gap: '12px',
                border: '1px solid #EDE0C4', padding: '14px 16px', background: '#FDFAF4',
              }}>
                <FiLock size={16} color="#C9A84C" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="········"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  style={{
                    flex: 1, background: 'transparent', border: 'none', outline: 'none',
                    fontFamily: "'Jost', sans-serif", fontSize: '0.85rem', color: '#1A1208',
                  }}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9E8A6A', padding: 0 }}>
                  {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
              <input
                type="checkbox"
                id="remember"
                checked={remember}
                onChange={e => setRemember(e.target.checked)}
                style={{ accentColor: '#C9A84C', width: '15px', height: '15px', cursor: 'pointer' }}
              />
              <label htmlFor="remember" style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.78rem', color: '#5C4A1E', cursor: 'pointer' }}>
                Keep me signed in for 30 days
              </label>
            </div>

            {/* ============================================
                SUBMIT — ab "loading" Redux se aa raha hai
            ============================================ */}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%', padding: '16px', background: '#1A1208', color: '#FFFFFF',
                border: 'none', cursor: loading ? 'not-allowed' : 'pointer',
                fontFamily: "'Jost', sans-serif", fontSize: '0.82rem', letterSpacing: '0.15em',
                fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                opacity: loading ? 0.7 : 1, transition: 'background 0.2s',
              }}
              onMouseEnter={e => { if (!loading) e.currentTarget.style.background = '#C9A84C' }}
              onMouseLeave={e => { if (!loading) e.currentTarget.style.background = '#1A1208' }}
            >
              {loading ? 'Please Wait...' : <>Sign In →</>}
            </button>

          </form>
        </div>

        {/* Bottom links */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', marginTop: '32px' }}>
          {['Privacy', 'Terms', 'Cookies'].map(item => (
            <Link key={item} to={`/${item.toLowerCase()}`} style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.7rem', color: '#9E8A6A', letterSpacing: '0.1em', textDecoration: 'none' }}>
              {item.toUpperCase()}
            </Link>
          ))}
          <span style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.7rem', color: '#9E8A6A', letterSpacing: '0.1em' }}>
            © 2024 TOGETHER MOMENTS
          </span>
        </div>
      </div>

      <style>{`
        @media (min-width: 1024px) {
          .login-left { display: flex !important; flex-direction: column; }
        }
        @media (max-width: 1023px) {
          .login-mobile-logo { display: flex !important; justify-content: center; }
        }
      `}</style>

    </div>
  )
}

export default Login