import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import MegaMenu from './MegaMenu'
import {
  FiSearch, FiHelpCircle, FiUser, FiShoppingBag,
  FiMenu, FiX, FiChevronRight, FiMapPin,
  FiLogIn, FiUserPlus, FiPackage, FiPhone, FiHelpCircle as FiHelp
} from 'react-icons/fi'

const navLinks = [
  {
    label: 'Weddings',
    categories: [
      { title: 'Decoration', items: ['Floral Decoration', 'Stage Setup', 'Mandap Decoration', 'Table Setup', 'Entrance Decoration'] },
      { title: 'Photography', items: ['Pre Wedding Shoot', 'Wedding Photography', 'Candid Photography', 'Drone Shoot', 'Album Design'] },
      { title: 'Catering', items: ['Veg Catering', 'Non Veg Catering', 'Live Counters', 'Dessert Station', 'Bar Setup'] },
      { title: 'Entertainment', items: ['DJ Services', 'Live Band', 'Sangeet Night', 'Fireworks', 'Dance Performance'] },
    ],
  },
  {
    label: 'Birthday',
    categories: [
      { title: 'Themes', items: ['Kids Birthday', 'Adults Party', 'Surprise Party', 'Garden Party', 'Luxury Birthday'] },
      { title: 'Decoration', items: ['Balloon Decoration', 'Floral Setup', 'Backdrop Design', 'Table Decoration', 'Neon Signs'] },
      { title: 'Entertainment', items: ['Magic Show', 'Clown Show', 'Photo Booth', 'Gaming Zone', 'Live Music'] },
      { title: 'Catering', items: ['Birthday Cake', 'Snacks & Starters', 'Buffet Setup', 'Mocktail Bar', 'Candy Station'] },
    ],
  },
  {
    label: 'Corporate',
    categories: [
      { title: 'Events', items: ['Conference Setup', 'Product Launch', 'Award Night', 'Team Outing', 'Brand Activation'] },
      { title: 'Decoration', items: ['Stage & Backdrop', 'Branding Setup', 'Floral Arrangement', 'Lighting Design', 'Welcome Desk'] },
      { title: 'Tech & AV', items: ['LED Screen', 'Sound System', 'Projector Setup', 'Live Streaming', 'Lighting Rig'] },
      { title: 'Catering', items: ['Hi Tea Setup', 'Lunch Buffet', 'Cocktail Party', 'Themed Dinner', 'Corporate Cake'] },
    ],
  },
  {
    label: 'Engagement',
    categories: [
      { title: 'Decoration', items: ['Ring Ceremony Setup', 'Floral Backdrop', 'Stage Decoration', 'Entrance Arch', 'Table Centerpiece'] },
      { title: 'Photography', items: ['Engagement Shoot', 'Candid Photos', 'Video Coverage', 'Same Day Edit', 'Photo Album'] },
      { title: 'Catering', items: ['Engagement Cake', 'Snacks & Starters', 'Buffet Dinner', 'Mocktail Bar', 'Dessert Table'] },
      { title: 'Entertainment', items: ['Live Music', 'DJ Night', 'Photo Booth', 'Fireworks', 'Dance Floor'] },
    ],
  },
  {
    label: 'Vendors',
    categories: [
      { title: 'Find Vendors', items: ['Decorators', 'Caterers', 'Photographers', 'Videographers', 'Florists'] },
      { title: 'More Vendors', items: ['Makeup Artists', 'DJ & Music', 'Lighting Experts', 'Venue Partners', 'Transport'] },
      { title: 'By Budget', items: ['Budget Friendly', 'Mid Range', 'Premium', 'Luxury'] },
      { title: 'By Location', items: ['Delhi NCR', 'Mumbai', 'Bangalore', 'Jaipur', 'All Cities'] },
    ],
  },
]

const guestMenuItems = [
  { icon: FiLogIn, label: 'Login', to: '/login' },
  { icon: FiUserPlus, label: 'Register', to: '/register' },
  { icon: FiPackage, label: 'My Bookings', to: '/bookings' },
  { icon: FiUser, label: 'My Account', to: '/account' },
  { icon: FiPhone, label: 'Contact Us', to: '/contact' },
  { icon: FiHelp, label: 'FAQs', to: '/faqs' },
]

const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeMobileCategory, setActiveMobileCategory] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [guestOpen, setGuestOpen] = useState(false)
  const guestRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (guestRef.current && !guestRef.current.contains(e.target as Node)) {
        setGuestOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const closeMobile = () => {
    setMobileOpen(false)
    setActiveMobileCategory(null)
  }

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-[100] bg-white border-b border-[#EDE0C4]"
        style={{ boxShadow: '0 2px 20px rgba(201,168,76,0.08)' }}
        onMouseLeave={() => setActiveMenu(null)}
      >
        <div className="container mx-auto px-4 h-[80px] flex items-center justify-between gap-4">

          {/* LOGO */}
          <Link to="/" className="flex flex-col leading-tight shrink-0">
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.3rem', color: '#C9A84C', fontWeight: 700, letterSpacing: '0.2em' }}>
              TOGETHER
            </span>
            <span style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.6rem', color: '#1A1208', letterSpacing: '0.4em' }}>
              MOMENTS
            </span>
          </Link>

          {/* LOCATION */}
          <button className="hidden lg:flex items-center gap-2 hover:text-[#C9A84C] transition-colors shrink-0">
            <FiMapPin size={14} color="#C9A84C" />
            <span style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.78rem', color: '#5C4A1E', letterSpacing: '0.05em' }}>Delhi NCR</span>
            <span style={{ color: '#9E8A6A', fontSize: '0.7rem' }}>▾</span>
          </button>

          {/* SEARCH */}
          <div className="hidden md:flex flex-1 max-w-[520px] items-center bg-[#FDFAF4] border border-[#EDE0C4] rounded-full px-5 py-3 gap-4 hover:border-[#C9A84C] transition-colors">
            <FiSearch size={15} color="#C9A84C"  />
            <input
              type="text"
              placeholder="Search events, vendors, services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent outline-none placeholder-[#9E8A6A] text-[#1A1208]"
              style={{ fontFamily: "'Jost', sans-serif",fontSize: '0.9rem' }}
            />
          </div>

          {/* RIGHT ICONS */}
          <div className="hidden md:flex items-center gap-7 shrink-0">

            <button className="flex flex-col items-center gap-0.5 text-[#5C4A1E] hover:text-[#C9A84C] transition-colors">
              <FiHelpCircle size={18} />
              <span style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.58rem', letterSpacing: '0.1em' }}>HELP</span>
            </button>

            {/* GUEST DROPDOWN */}
            <div className="relative" ref={guestRef}>
              <button
                onClick={() => setGuestOpen(!guestOpen)}
                className="flex flex-col items-center gap-0.5 text-[#5C4A1E] hover:text-[#C9A84C] transition-colors"
              >
                <FiUser size={18} />
                <span style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.58rem', letterSpacing: '0.1em' }}>GUEST</span>
              </button>

      {guestOpen && (
  <div
    className="absolute right-0 top-[calc(100%+16px)] w-[210px] bg-white border border-[#EDE0C4] z-[200] overflow-hidden"
    style={{ boxShadow: '0 12px 40px rgba(201,168,76,0.18)' }}
  >
    {/* Triangle */}
    <div className="absolute -top-1.5 right-6 w-3 h-3 bg-white border-l border-t border-[#EDE0C4] rotate-45" />

    {/* Header */}
    <div className="px-5 pt-6 pb-5 bg-[#FDFAF4] border-b border-[#EDE0C4]">
      <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.1rem', color: '#C9A84C', fontWeight: 600 }}>
        Welcome
      </p>
      <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.62rem', color: '#9E8A6A', letterSpacing: '0.15em', marginTop: '4px' }}>
        LOGIN TO ACCESS YOUR ACCOUNT
      </p>
    </div>

    {/* Login + Register Buttons */}
    <div className="px-5 pt-5 pb-5 flex gap-2 border-b border-[#EDE0C4]">
      <Link
        to="/login"
        onClick={() => setGuestOpen(false)}
        className="flex-1 text-center py-2.5 border border-[#C9A84C] text-[#C9A84C] text-[0.68rem] tracking-widest uppercase font-semibold hover:bg-[#C9A84C] hover:text-white transition-all"
        style={{ fontFamily: "'Jost', sans-serif" }}
      >
        Login
      </Link>
      <Link
        to="/register"
        onClick={() => setGuestOpen(false)}
        className="flex-1 text-center py-2.5 bg-[#C9A84C] text-white text-[0.68rem] tracking-widest uppercase font-semibold hover:bg-[#E8C97A] hover:text-[#1A1208] transition-all"
        style={{ fontFamily: "'Jost', sans-serif" }}
      >
        Register
      </Link>
    </div>

    {/* Menu Items */}
    <div className="py-3">
      {guestMenuItems.slice(2).map((item) => (
        <Link
          key={item.label}
          to={item.to}
          onClick={() => setGuestOpen(false)}
          className="flex items-center gap-3 px-5 py-3.5 text-[#5C4A1E] hover:bg-[#FDFAF4] hover:text-[#C9A84C] transition-colors"
          style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.8rem' }}
        >
          <item.icon size={14} color="#C9A84C" />
          {item.label}
        </Link>
      ))}
    </div>
  </div>
)}
            </div>

            {/* CART */}
            <button className="flex flex-col items-center gap-0.5 text-[#5C4A1E] hover:text-[#C9A84C] transition-colors">
              <div className="relative">
                <FiShoppingBag size={18} />
                <span className="absolute -top-1.5 -right-1.5 bg-[#C9A84C] text-white text-[8px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold">0</span>
              </div>
              <span style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.58rem', letterSpacing: '0.1em' }}>CART</span>
            </button>

           
          </div>

          {/* MOBILE RIGHT */}
          <div className="flex md:hidden items-center gap-3">
            <div className="flex items-center bg-[#FDFAF4] border border-[#EDE0C4] rounded-full px-3 py-1.5 gap-2">
              <FiSearch size={13} color="#C9A84C" />
              <input
                type="text"
                placeholder="Search..."
                className="w-[90px] bg-transparent outline-none placeholder-[#9E8A6A] text-[#1A1208]"
                style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.75rem' }}
              />
            </div>
            <button
              onClick={() => mobileOpen ? closeMobile() : setMobileOpen(true)}
              className="text-[#1A1208] hover:text-[#C9A84C] transition-colors p-1"
            >
              {mobileOpen ? <FiX size={22} /> : <FiMenu size={22} />}
            </button>
          </div>
        </div>

        {/* CATEGORY BAR */}
        <div className="hidden md:block border-t border-[#EDE0C4] bg-white">
          <div className="container mx-auto px-6 flex items-center gap-8 h-[44px]">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onMouseEnter={() => setActiveMenu(link.label)}
                className={`text-[0.7rem] tracking-[0.15em] uppercase font-medium transition-colors duration-200 h-full border-b-2 ${
                  activeMenu === link.label ? 'text-[#C9A84C] border-[#C9A84C]' : 'text-[#5C4A1E] border-transparent hover:text-[#C9A84C]'
                }`}
                style={{ fontFamily: "'Jost', sans-serif" }}
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>

        {activeMenu && (
          <MegaMenu
            categories={navLinks.find((l) => l.label === activeMenu)?.categories || []}
            label={activeMenu}
          />
        )}
      </nav>

      {/* OVERLAY */}
      {mobileOpen && (
        <div className="fixed inset-0 bg-black/40 z-[98] md:hidden" onClick={closeMobile} />
      )}

      {/* MOBILE DRAWER */}
      <div
        className={`fixed top-0 left-0 h-full w-[82vw] max-w-[320px] bg-white z-[99] md:hidden transition-transform duration-300 ease-in-out flex flex-col ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{ boxShadow: '4px 0 30px rgba(201,168,76,0.12)' }}
      >
        <div className="flex items-center justify-between px-5 h-[64px] border-b border-[#EDE0C4] shrink-0">
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.1rem', color: '#C9A84C', fontWeight: 700, letterSpacing: '0.15em' }}>
            Together Moments
          </span>
          <button
            onClick={closeMobile}
            className="w-8 h-8 flex items-center justify-center rounded-full border border-[#EDE0C4] text-[#1A1208] hover:text-[#C9A84C] hover:border-[#C9A84C] transition-colors"
          >
            <FiX size={16} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {!activeMobileCategory ? (
            <div>
              <div className="px-5 pt-4 pb-2">
                <span style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.65rem', color: '#9E8A6A', letterSpacing: '0.2em' }}>BROWSE CATEGORIES</span>
              </div>
              <ul>
                {navLinks.map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={() => setActiveMobileCategory(link.label)}
                      className="w-full flex items-center justify-between px-5 py-4 hover:bg-[#FDFAF4] hover:text-[#C9A84C] transition-colors border-b border-[#EDE0C4]/60"
                      style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.82rem', color: '#1A1208', letterSpacing: '0.1em' }}
                    >
                      <span className="uppercase tracking-widest">{link.label}</span>
                      <FiChevronRight size={15} color="#C9A84C" />
                    </button>
                  </li>
                ))}
              </ul>

              <div className="mx-5 my-4 border-t border-[#EDE0C4]" />

              <div className="px-5 pb-2">
                <span style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.65rem', color: '#9E8A6A', letterSpacing: '0.2em' }}>ACCOUNT</span>
              </div>
              <ul className="mb-4">
                {guestMenuItems.map((item) => (
                  <li key={item.label}>
                    <Link
                      to={item.to}
                      onClick={closeMobile}
                      className="flex items-center gap-3 px-5 py-3.5 hover:bg-[#FDFAF4] hover:text-[#C9A84C] transition-colors border-b border-[#EDE0C4]/40"
                      style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.8rem', color: '#5C4A1E' }}
                    >
                      <item.icon size={15} />
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="px-5 pb-6">
                <Link
                  to="/register"
                  onClick={closeMobile}
                  className="block bg-[#C9A84C] text-white text-center py-3.5 text-xs tracking-widest uppercase font-semibold hover:bg-[#E8C97A] hover:text-[#1A1208] transition-all"
                  style={{ fontFamily: "'Jost', sans-serif" }}
                >
                  Book Now
                </Link>
              </div>
            </div>
          ) : (
            <div>
              <button
                onClick={() => setActiveMobileCategory(null)}
                className="flex items-center gap-2 px-5 py-4 border-b border-[#EDE0C4] w-full hover:bg-[#FDFAF4] transition-colors"
                style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.78rem', color: '#C9A84C' }}
              >
                ← Back to Menu
              </button>

              <div className="px-5 py-3 bg-[#FDFAF4] border-b border-[#EDE0C4]">
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.1rem', color: '#C9A84C', fontWeight: 600 }}>
                  {activeMobileCategory}
                </span>
              </div>

              {navLinks.find((l) => l.label === activeMobileCategory)?.categories.map((cat) => (
                <div key={cat.title}>
                  <div className="px-5 py-2.5 bg-[#FAF7F2] border-b border-[#EDE0C4]">
                    <span style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.65rem', color: '#9E8A6A', letterSpacing: '0.2em' }}>
                      {cat.title.toUpperCase()}
                    </span>
                  </div>
                  <ul>
                    {cat.items.map((item) => (
                      <li key={item}>
                        <button
                          onClick={closeMobile}
                          className="w-full text-left px-7 py-3 hover:text-[#C9A84C] hover:bg-[#FDFAF4] transition-colors border-b border-[#EDE0C4]/40"
                          style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.8rem', color: '#1A1208' }}
                        >
                          {item}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="h-[124px]" />
    </>
  )
}

export default Navbar