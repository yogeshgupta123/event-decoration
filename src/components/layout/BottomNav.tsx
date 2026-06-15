import { Link, useLocation } from 'react-router-dom'
import { FiHome, FiCompass, FiShoppingBag, FiCalendar, FiUser } from 'react-icons/fi'
import { useAppSelector } from '../../store/hooks'

// ============================================
// MOBILE BOTTOM NAV — sirf mobile pe dikhega (md:hidden)
// ============================================
const navItems = [
  { label: 'Home', icon: FiHome, to: '/' },
  { label: 'Explore', icon: FiCompass, to: '/experiences' },
  { label: 'Cart', icon: FiShoppingBag, to: '/cart' },
  { label: 'Bookings', icon: FiCalendar, to: '/dashboard' },
  { label: 'Account', icon: FiUser, to: '/dashboard' },
]

const BottomNav = () => {
  const location = useLocation()
  const cartItems = useAppSelector((state) => state.cart.items)
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0)

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-[90] md:hidden bg-white border-t border-[#EDE0C4]"
      style={{ boxShadow: '0 -4px 20px rgba(26,18,8,0.06)' }}
    >
      <div className="grid grid-cols-5 h-[60px]">
        {navItems.map((item) => {
          // ============================================
          // ACTIVE CHECK — current URL is item ke "to" se match karta hai?
          // '/' ke liye exact match, baaki ke liye startsWith
          // ============================================
          const isActive = item.to === '/'
            ? location.pathname === '/'
            : location.pathname.startsWith(item.to)

          return (
            <Link
              key={item.label}
              to={item.to}
              className="flex flex-col items-center justify-center gap-1 relative"
            >
              {isActive && <div className="absolute top-0 w-8 h-[2px] bg-[#C9A84C] rounded-full" />}

              <div className="relative">
                <item.icon size={19} color={isActive ? '#C9A84C' : '#9E8A6A'} />
                {item.label === 'Cart' && cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-[#D9776B] text-white text-[8px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold">
                    {cartCount}
                  </span>
                )}
              </div>

              <span
                style={{ fontFamily: "'Jost', sans-serif" }}
                className={`text-[0.6rem] ${isActive ? 'text-[#C9A84C] font-semibold' : 'text-[#9E8A6A]'}`}
              >
                {item.label}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

export default BottomNav