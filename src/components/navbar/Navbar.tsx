import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import MegaMenu from './MegaMenu'
import { useAppSelector } from '../../store/hooks'
import {
  FiSearch, FiHelpCircle, FiUser, FiShoppingBag,
  FiMenu, FiX,  FiMapPin, FiChevronDown,
  FiLogIn, FiUserPlus, FiPackage, FiPhone, FiHelpCircle as FiHelp
} from 'react-icons/fi'

// ============================================
// NAV CATEGORIES — FnP style horizontal bar
// har category ka icon + label + subcategories
// ============================================
const navLinks = [
  {
  label: 'Experiences',
  emoji: '✨',
  to: '/experiences',
  categories: [
    { title: 'Romantic', items: ['Candlelight Dinner', 'Rooftop Dinner', 'Private Beach Dinner', 'Anniversary Special'] },
    { title: 'Surprises', items: ['Room Decoration', 'Balloon Surprise', 'Photo Wall Setup', 'Cake Surprise'] },
    { title: 'Adventure', items: ['City Exploration', 'Hot Air Balloon', 'Trekking Date', 'Bike Ride'] },
    { title: 'Wellness', items: ['Couple Spa', 'Solo Wellness Day', 'Yoga Retreat', 'Meditation'] },
  ],
},
  {
    label: 'Father\'s Day',
    emoji: '👨',
    to: '/services?category=FathersDay',
    categories: [
      { title: 'Gifts', items: ['Personalized Gifts', 'Grooming Kits', 'Tech Gadgets', 'Books & More', 'Luxury Hampers'] },
      { title: 'Sweets', items: ['Chocolates', 'Dry Fruits Box', 'Premium Mithai', 'Sugar Free', 'International'] },
      { title: 'Experiences', items: ['Spa Vouchers', 'Dinner Date', 'Adventure', 'Golf Session', 'Movie Night'] },
      { title: 'Decoration', items: ['Surprise Setup', 'Balloon Decor', 'Photo Wall', 'Banner & Props', 'Cake Delivery'] },
    ],
  },
  {
    label: 'Birthday',
    emoji: '🎂',
    to: '/services?category=Birthday',
    categories: [
      { title: 'Decoration', items: ['Balloon Wonderland', 'Floral Setup', 'Neon Signs', 'Backdrop Design', 'Table Decor'] },
      { title: 'Cakes', items: ['Custom Cakes', 'Designer Cakes', 'Pinata Cakes', 'Jar Cakes', 'Cupcakes'] },
      { title: 'Gifts', items: ['Personalized Frames', 'Gift Hampers', 'Soft Toys', 'Candles Set', 'Chocolates'] },
      { title: 'Entertainment', items: ['Magician', 'Photo Booth', 'DJ Services', 'Clown Show', 'Gaming Zone'] },
    ],
  },
  {
    label: 'Occasions',
    emoji: '✨',
    to: '/services',
    categories: [
      { title: 'Weddings', items: ['Mandap Setup', 'Stage Decoration', 'Floral Arch', 'Table Setup', 'Entrance Decor'] },
      { title: 'Engagement', items: ['Ring Ceremony', 'Floral Backdrop', 'Couple Seating', 'Proposal Setup', 'Photo Corner'] },
      { title: 'Baby Shower', items: ['Theme Setup', 'Balloon Decor', 'Photo Wall', 'Welcome Baby', 'Gender Reveal'] },
      { title: 'House Warming', items: ['Floral Decor', 'Welcome Gate', 'Pooja Setup', 'Table Arrangement', 'Balloon Decor'] },
    ],
  },
  {
    label: 'Anniversary',
    emoji: '💍',
    to: '/services?category=Anniversary',
    categories: [
      { title: 'Decoration', items: ['Romantic Setup', 'Candle Decor', 'Rose Petal Path', 'Balloon Arch', 'Photo Wall'] },
      { title: 'Gifts', items: ['Couple Frames', 'Memory Book', 'Jewelry Box', 'Hamper', 'Personalized Gifts'] },
      { title: 'Experiences', items: ['Candle Dinner', 'Spa Package', 'Staycation', 'Sunset Cruise', 'Couple Shoot'] },
      { title: 'Cakes', items: ['Couple Cake', 'Photo Cake', 'Heart Shape', 'Tier Cake', 'Fondant Design'] },
    ],
  },
  {
    label: 'Flowers',
    emoji: '🌸',
    to: '/shop?category=Flowers',
    categories: [
      { title: 'Bouquets', items: ['Rose Bouquet', 'Mixed Flowers', 'Lily Bouquet', 'Orchids', 'Sunflowers'] },
      { title: 'Arrangements', items: ['Basket Arrangement', 'Vase Flowers', 'Box Flowers', 'Flower Crown', 'Table Centerpiece'] },
      { title: 'Exotic', items: ['Imported Roses', 'Dutch Tulips', 'Lavender', 'Bird of Paradise', 'Anthuriums'] },
      { title: 'By Color', items: ['Red Flowers', 'Pink Flowers', 'White Flowers', 'Yellow Flowers', 'Purple Flowers'] },
    ],
  },
  {
    label: 'Cakes',
    emoji: '🎂',
    to: '/shop?category=Cakes',
    categories: [
      { title: 'By Type', items: ['Birthday Cakes', 'Wedding Cakes', 'Photo Cakes', 'Designer Cakes', 'Pinata Cake'] },
      { title: 'By Flavor', items: ['Chocolate', 'Vanilla', 'Red Velvet', 'Butterscotch', 'Black Forest'] },
      { title: 'Special', items: ['Sugar Free', 'Eggless', 'Vegan', 'Gluten Free', 'Keto Cake'] },
      { title: 'Mini Treats', items: ['Cupcakes', 'Jar Cakes', 'Cake Pops', 'Brownies Box', 'Pastries'] },
    ],
  },
  {
    label: 'Personalised',
    emoji: '🎨',
    to: '/shop?category=Personalised',
    categories: [
      { title: 'Photo Gifts', items: ['Photo Frames', 'Photo Books', 'Canvas Print', 'Photo Mug', 'Cushion Print'] },
      { title: 'Engraved', items: ['Name Necklace', 'Engraved Watch', 'Key Chain', 'Wooden Plaque', 'Crystal Award'] },
      { title: 'Custom Prints', items: ['T-Shirt Print', 'Hoodie Design', 'Phone Case', 'Tote Bag', 'Cap Print'] },
      { title: 'Stationery', items: ['Diary & Journal', 'Pen Set', 'Greeting Cards', 'Gift Tags', 'Bookmark'] },
    ],
  },
  {
    label: 'Plants',
    emoji: '🌿',
    to: '/shop?category=Plants',
    categories: [
      { title: 'Indoor', items: ['Money Plant', 'Peace Lily', 'Snake Plant', 'Succulents', 'Bamboo'] },
      { title: 'Outdoor', items: ['Rose Plant', 'Jasmine', 'Hibiscus', 'Tulsi', 'Bougainvillea'] },
      { title: 'Gift Plants', items: ['Lucky Bamboo', 'Jade Plant', 'Air Purifier Set', 'Herb Garden', 'Bonsai'] },
      { title: 'Planters', items: ['Ceramic Pots', 'Terracotta', 'Hanging Planters', 'Grow Bags', 'Metal Planters'] },
    ],
  },
  {
    label: 'Balloon n Services',
    emoji: '🎈',
    to: '/services?category=Balloon',
    categories: [
      { title: 'Balloon Decor', items: ['Balloon Arch', 'Balloon Bouquet', 'Foil Balloons', 'Number Balloons', 'LED Balloons'] },
      { title: 'Event Services', items: ['Event Planning', 'On-Site Setup', 'Photography', 'Videography', 'Catering'] },
      { title: 'Themes', items: ['Kids Theme', 'Unicorn Theme', 'Superhero', 'Princess Theme', 'Space Theme'] },
      { title: 'Add-ons', items: ['Fog Machine', 'Neon Signs', 'Fairy Lights', 'Confetti Cannon', 'Smoke Effects'] },
    ],
  },
  {
    label: 'Chocolates',
    emoji: '🍫',
    to: '/shop?category=Chocolates',
    categories: [
      { title: 'Premium', items: ['Ferrero Rocher', 'Lindt Collection', 'Belgian Chocolate', 'Godiva', 'Toblerone'] },
      { title: 'Indian Brands', items: ['Cadbury Hamper', 'Amul Special', 'Morde Collection', 'House of Chocolates', 'Mason & Co'] },
      { title: 'Customized', items: ['Photo Chocolate', 'Name Chocolate', 'Logo Chocolate', 'Message Bar', 'Occasion Box'] },
      { title: 'Sugar Free', items: ['Dark Chocolate', 'Stevia Sweets', 'Diabetic Friendly', 'Low Calorie', 'Vegan'] },
    ],
  },
  {
    label: 'LUXE',
    emoji: '👑',
    to: '/services?category=Luxury',
    categories: [
      { title: 'Premium Setups', items: ['Royal Mandap', 'Luxury Stage', 'Gold Theme', 'Crystal Decor', 'Premium Floral'] },
      { title: 'Exclusive Gifts', items: ['Luxury Hamper', 'Premium Watch', 'Designer Bag', 'Perfume Set', 'Jewellery Box'] },
      { title: 'Experiences', items: ['Private Yacht', 'Helicopter Tour', 'Private Chef', 'Wine Tasting', 'Luxury Spa'] },
      { title: 'Concierge', items: ['Personal Stylist', 'Event Curator', 'Floral Artist', 'Luxury Transport', 'VIP Planning'] },
    ],
  },
  {
    label: 'Hampers',
    emoji: '🧺',
    to: '/shop?category=Hampers',
    categories: [
      { title: 'Gift Hampers', items: ['Luxury Hamper', 'Fruit Basket', 'Dry Fruit Box', 'Chocolate Box', 'Spa Hamper'] },
      { title: 'Festive', items: ['Diwali Hamper', 'Holi Set', 'Christmas Box', 'Eid Collection', 'New Year Gift'] },
      { title: 'Corporate', items: ['Client Gifts', 'Employee Kit', 'Branded Hamper', 'Welcome Kit', 'Thank You Box'] },
      { title: 'Custom', items: ['Build Your Own', 'Personal Message', 'Custom Packaging', 'Bulk Orders', 'Same Day'] },
    ],
  },
]

const guestMenuItems = [
  { icon: FiLogIn, label: 'Login', to: '/login' },
  { icon: FiUserPlus, label: 'Register', to: '/register' },
  { icon: FiPackage, label: 'My Bookings', to: '/dashboard' },
  { icon: FiUser, label: 'My Account', to: '/dashboard' },
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
  const categoryBarRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  const cartItems = useAppSelector((state) => state.cart.items)
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0)

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

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
  if (e.key === 'Enter' && searchQuery.trim()) {
    navigate(`/services?search=${encodeURIComponent(searchQuery.trim())}`)
    setSearchQuery('')
  }
}

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-[100] bg-white"
        style={{ boxShadow: '0 2px 20px rgba(26,18,8,0.08)' }}
        onMouseLeave={() => setActiveMenu(null)}
      >
        {/* ============================================
            TOP BAR — Logo, Search, Icons
        ============================================ */}
        <div className="border-b border-[#EDE0C4]">
          <div className="container mx-auto px-6 h-[72px] flex items-center justify-between gap-4">

            {/* LOGO */}
            <Link to="/" className="flex flex-col leading-tight shrink-0" onClick={() => setActiveMenu(null)}>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.3rem', color: '#C9A84C', fontWeight: 700, letterSpacing: '0.2em' }}>
                TOGETHER
              </span>
              <span style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.55rem', color: '#1A1208', letterSpacing: '0.4em' }}>
                MOMENTS
              </span>
            </Link>

            {/* LOCATION — desktop */}
            <button className="hidden lg:flex items-center gap-1.5 hover:text-[#C9A84C] transition-colors shrink-0 border border-[#EDE0C4] rounded-full px-3 py-1.5">
              <FiMapPin size={13} color="#C9A84C" />
              <span style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.72rem', color: '#5C4A1E' }}>Delhi NCR</span>
              <FiChevronDown size={11} color="#9E8A6A" />
            </button>

            {/* SEARCH BAR */}
            <div className="hidden md:flex flex-1 max-w-[480px] items-center bg-[#FDFAF4] border border-[#EDE0C4] rounded-full px-4 py-2.5 gap-3 hover:border-[#C9A84C] transition-colors focus-within:border-[#C9A84C] focus-within:shadow-[0_0_0_3px_rgba(201,168,76,0.1)]">
              <FiSearch size={15} color="#C9A84C" />
              <input
                type="text"
                placeholder="Search events, cakes, gifts, vendors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearch}
                className="flex-1 bg-transparent outline-none placeholder-[#9E8A6A] text-[#1A1208]"
                style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.8rem' }}
              />
            </div>

            {/* RIGHT ICONS */}
            <div className="hidden md:flex items-center gap-4 shrink-0">

              {/* Help */}
              <button className="flex flex-col items-center gap-0.5 text-[#5C4A1E] hover:text-[#C9A84C] transition-colors">
                <FiHelpCircle size={18} />
                <span style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.55rem', letterSpacing: '0.08em' }}>HELP</span>
              </button>

              {/* GUEST DROPDOWN */}
              <div className="relative" ref={guestRef}>
                <button
                  onClick={() => setGuestOpen(!guestOpen)}
                  className="flex flex-col items-center gap-0.5 text-[#5C4A1E] hover:text-[#C9A84C] transition-colors"
                >
                  <FiUser size={18} />
                  <span style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.55rem', letterSpacing: '0.08em' }}>ACCOUNT</span>
                </button>

                {guestOpen && (
                  <div
                    className="absolute right-0 top-[calc(100%+16px)] w-[220px] bg-white rounded-2xl border border-[#EDE0C4] z-[200] overflow-hidden"
                    style={{ boxShadow: '0 16px 48px rgba(26,18,8,0.12)' }}
                  >
                    <div className="absolute -top-1.5 right-8 w-3 h-3 bg-white border-l border-t border-[#EDE0C4] rotate-45" />
                    <div className="px-5 pt-5 pb-4 bg-gradient-to-br from-[#1A1208] to-[#2D1F0E]">
                      <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.1rem', color: '#C9A84C', fontWeight: 600 }}>Welcome</p>
                      <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.6rem', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.12em', marginTop: '3px' }}>
                        LOGIN TO ACCESS YOUR ACCOUNT
                      </p>
                    </div>
                    <div className="px-4 py-4 flex gap-2 border-b border-[#EDE0C4]">
                      <Link to="/login" onClick={() => setGuestOpen(false)} style={{ fontFamily: "'Jost', sans-serif" }}
                        className="flex-1 text-center py-2.5 rounded-full border border-[#C9A84C] text-[#C9A84C] text-[0.65rem] tracking-widest uppercase font-semibold hover:bg-[#C9A84C] hover:text-white transition-all">
                        Login
                      </Link>
                      <Link to="/register" onClick={() => setGuestOpen(false)} style={{ fontFamily: "'Jost', sans-serif" }}
                        className="flex-1 text-center py-2.5 rounded-full bg-[#C9A84C] text-white text-[0.65rem] tracking-widest uppercase font-semibold hover:bg-[#1A1208] transition-all">
                        Register
                      </Link>
                    </div>
                    <div className="py-2">
                      {guestMenuItems.slice(2).map((item) => (
                        <Link key={item.label} to={item.to} onClick={() => setGuestOpen(false)}
                          className="flex items-center gap-3 px-5 py-3 text-[#5C4A1E] hover:bg-[#FDFAF4] hover:text-[#C9A84C] transition-colors"
                          style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.78rem' }}>
                          <item.icon size={14} color="#C9A84C" />
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* CART */}
              <Link to="/cart" className="flex flex-col items-center gap-0.5 text-[#5C4A1E] hover:text-[#C9A84C] transition-colors">
                <div className="relative">
                  <FiShoppingBag size={18} />
                  {cartCount > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 bg-[#D9776B] text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                      {cartCount}
                    </span>
                  )}
                </div>
                <span style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.55rem', letterSpacing: '0.08em' }}>CART</span>
              </Link>

              {/* BOOK NOW */}
              <Link to="/services" style={{ fontFamily: "'Jost', sans-serif" }}
                className="bg-[#1A1208] text-white px-5 py-2.5 rounded-full text-[0.68rem] uppercase font-semibold hover:bg-[#C9A84C] transition-all tracking-wider whitespace-nowrap">
                Book Now
              </Link>
            </div>

            {/* MOBILE RIGHT */}
            <div className="flex md:hidden items-center gap-2">
              <div className="flex items-center bg-[#FDFAF4] border border-[#EDE0C4] rounded-full px-3 py-1.5 gap-2">
                <FiSearch size={13} color="#C9A84C" />
                <input type="text" placeholder="Search..." className="w-[80px] bg-transparent outline-none placeholder-[#9E8A6A] text-[#1A1208]"
                  style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.72rem' }} />
              </div>
              <Link to="/cart" className="relative text-[#1A1208] hover:text-[#C9A84C] transition-colors p-1">
                <FiShoppingBag size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#D9776B] text-white text-[8px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold">{cartCount}</span>
                )}
              </Link>
              <button onClick={() => mobileOpen ? closeMobile() : setMobileOpen(true)} className="text-[#1A1208] p-1">
                {mobileOpen ? <FiX size={22} /> : <FiMenu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* ============================================
            CATEGORY BAR — FnP style horizontal scroll
            har category ek pill/tab hai
        ============================================ */}
        <div className="hidden md:block bg-white border-b border-[#EDE0C4]">
          <div
            ref={categoryBarRef}
            className="container mx-auto px-6 flex items-center gap-1 overflow-x-auto scrollbar-hide"
            style={{ height: '46px' }}
          >
            {navLinks.map((link) => (
              <button
                key={link.label}
                onMouseEnter={() => setActiveMenu(link.label)}
                onClick={() => navigate(link.to)}
                style={{ fontFamily: "'Jost', sans-serif" }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full whitespace-nowrap text-[0.72rem] font-medium tracking-wide transition-all shrink-0 ${
                  activeMenu === link.label
                    ? 'bg-[#1A1208] text-white'
                    : 'text-[#5C4A1E] hover:bg-[#FDFAF4] hover:text-[#1A1208]'
                }`}
              >
                <span className="text-[0.9rem]">{link.emoji}</span>
                {link.label}
                <FiChevronDown size={11} className={`transition-transform ${activeMenu === link.label ? 'rotate-180' : ''}`} />
              </button>
            ))}
          </div>
        </div>

        {/* MEGA MENU */}
   {activeMenu && (
  <MegaMenu
    categories={navLinks.find((l) => l.label === activeMenu)?.categories || []}
    label={activeMenu}
    to={navLinks.find((l) => l.label === activeMenu)?.to || '/services'}
  />
)}
        
      </nav>

      {/* OVERLAY */}
      {mobileOpen && <div className="fixed inset-0 bg-black/40 z-[98] md:hidden" onClick={closeMobile} />}

      {/* ============================================
          MOBILE DRAWER
      ============================================ */}
      <div
        className={`fixed top-0 left-0 h-full w-[85vw] max-w-[340px] bg-white z-[99] md:hidden transition-transform duration-300 ease-in-out flex flex-col ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}
        style={{ boxShadow: '4px 0 30px rgba(26,18,8,0.15)' }}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-5 h-[64px] border-b border-[#EDE0C4] shrink-0 bg-gradient-to-r from-[#1A1208] to-[#2D1F0E]">
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.1rem', color: '#C9A84C', fontWeight: 700, letterSpacing: '0.15em' }}>
            Together Moments
          </span>
          <button onClick={closeMobile} className="w-8 h-8 flex items-center justify-center rounded-full border border-white/20 text-white hover:border-[#C9A84C] hover:text-[#C9A84C] transition-colors">
            <FiX size={16} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {!activeMobileCategory ? (
            <div>
              <div className="px-5 pt-4 pb-2">
                <span style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.62rem', color: '#9E8A6A', letterSpacing: '0.2em' }}>CATEGORIES</span>
              </div>

              {/* Mobile category grid — 2 columns pill style */}
              <div className="px-5 grid grid-cols-2 gap-2 pb-4">
                {navLinks.map((link) => (
                  <button
                    key={link.label}
                    onClick={() => setActiveMobileCategory(link.label)}
                    style={{ fontFamily: "'Jost', sans-serif" }}
                    className="flex items-center gap-2 px-3 py-3 bg-[#FDFAF4] rounded-xl border border-[#EDE0C4] text-[0.75rem] text-[#1A1208] hover:border-[#C9A84C] hover:text-[#C9A84C] transition-all text-left"
                  >
                    <span className="text-[1rem]">{link.emoji}</span>
                    <span className="truncate">{link.label}</span>
                  </button>
                ))}
              </div>

              <div className="mx-5 border-t border-[#EDE0C4]" />

              <div className="px-5 pt-4 pb-2">
                <span style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.62rem', color: '#9E8A6A', letterSpacing: '0.2em' }}>ACCOUNT</span>
              </div>
              <ul className="mb-4">
                {guestMenuItems.map((item) => (
                  <li key={item.label}>
                    <Link to={item.to} onClick={closeMobile}
                      className="flex items-center gap-3 px-5 py-3 hover:bg-[#FDFAF4] hover:text-[#C9A84C] transition-colors border-b border-[#EDE0C4]/40"
                      style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.8rem', color: '#5C4A1E' }}>
                      <item.icon size={15} />
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="px-5 pb-6">
                <Link to="/services" onClick={closeMobile}
                  className="block bg-[#C9A84C] text-white text-center rounded-full py-3.5 text-xs tracking-widest uppercase font-semibold hover:bg-[#1A1208] transition-all"
                  style={{ fontFamily: "'Jost', sans-serif" }}>
                  Book Now
                </Link>
              </div>
            </div>
          ) : (
            <div>
              <button onClick={() => setActiveMobileCategory(null)}
                className="flex items-center gap-2 px-5 py-4 border-b border-[#EDE0C4] w-full hover:bg-[#FDFAF4] transition-colors"
                style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.78rem', color: '#D9776B' }}>
                ← Back
              </button>
              <div className="px-5 py-3 bg-[#FDFAF4] border-b border-[#EDE0C4] flex items-center gap-2">
                <span className="text-[1.2rem]">{navLinks.find(l => l.label === activeMobileCategory)?.emoji}</span>
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.1rem', color: '#C9A84C', fontWeight: 600 }}>
                  {activeMobileCategory}
                </span>
              </div>
              {navLinks.find((l) => l.label === activeMobileCategory)?.categories.map((cat) => (
                <div key={cat.title}>
                  <div className="px-5 py-2.5 bg-[#FAF7F2] border-b border-[#EDE0C4]">
                    <span style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.62rem', color: '#9E8A6A', letterSpacing: '0.2em' }}>{cat.title.toUpperCase()}</span>
                  </div>
                  <ul>
                    {cat.items.map((item) => (
                      <li key={item}>
                        <button onClick={closeMobile}
                          className="w-full text-left px-7 py-3 hover:text-[#D9776B] hover:bg-[#FDFAF4] transition-colors border-b border-[#EDE0C4]/40"
                          style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.8rem', color: '#1A1208' }}>
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

      {/* SPACER */}
      <div className="h-[70px] md:h-[70px]" />
    </>
  )
}

export default Navbar