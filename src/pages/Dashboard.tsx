import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiPackage, FiUser, FiHeart, FiCalendar, FiMapPin, FiEdit, FiLogOut } from 'react-icons/fi'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { logout } from '../store/authSlice'

const formatPrice = (price: number) => `₹${price.toLocaleString('en-IN')}`

const myBookings = [
  { id: 'TM-2024-001', title: 'Royal Rose Terrace', category: 'Wedding', date: '2024-12-15', venue: 'The Leela, Delhi', price: 154999, status: 'confirmed', image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=200' },
  { id: 'TM-2024-002', title: 'Balloon Wonderland', category: 'Birthday', date: '2024-11-20', venue: 'Home, Gurugram', price: 24999, status: 'completed', image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=200' },
  { id: 'TM-2024-003', title: 'Corporate Stage Backdrop', category: 'Corporate', date: '2024-10-05', venue: 'Taj Palace, Delhi', price: 184999, status: 'cancelled', image: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=200' },
]


const statusConfig: Record<string, { label: string; color: string; bg: string }> = {
  confirmed: { label: 'Confirmed', color: '#1D9E75', bg: '#E8F8F2' },
  completed: { label: 'Completed', color: '#5C4A1E', bg: '#F5EFE0' },
  cancelled: { label: 'Cancelled', color: '#D9776B', bg: '#FDF0EE' },
  pending: { label: 'Pending', color: '#C9A84C', bg: '#FDFAF4' },
}

const Dashboard = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [activeTab, setActiveTab] = useState('My Bookings')
  const { user } = useAppSelector((state) => state.auth)

  const handleLogout = () => {
    dispatch(logout())
    navigate('/login')
  }

  return (
    <div className="bg-[#FDFAF4] min-h-screen py-10">
      <div className="container mx-auto px-6">

        {/* Header */}
        <div className="bg-white rounded-2xl shadow-[0_4px_16px_rgba(26,18,8,0.06)] p-6 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#C9A84C] to-[#D9776B] flex items-center justify-center">
              <span style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-white text-[1.8rem] font-bold">
                {(user?.name || 'G').charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <h1 style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-[1.6rem] text-[#1A1208] font-semibold">
                {user?.name || 'Guest User'}
              </h1>
              <p style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.78rem] text-[#9E8A6A]">
                {user?.email || 'guest@example.com'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-[#FDFAF4] rounded-xl px-4 py-2 text-center">
              <p style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-[1.4rem] text-[#C9A84C] font-bold">{myBookings.length}</p>
              <p style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.62rem] text-[#9E8A6A] uppercase tracking-wider">Bookings</p>
            </div>
            <button
              onClick={handleLogout}
              style={{ fontFamily: "'Jost', sans-serif" }}
              className="flex items-center gap-2 text-[0.75rem] text-[#D9776B] hover:text-[#B85A4F] tracking-wider uppercase transition-colors"
            >
              <FiLogOut size={14} /> Logout
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

          {/* SIDEBAR */}
          <aside className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-[0_4px_16px_rgba(26,18,8,0.06)] p-4">
              {[
                { label: 'My Bookings', icon: FiPackage },
                { label: 'Profile', icon: FiUser },
                { label: 'Wishlist', icon: FiHeart },
              ].map((item) => (
                <button
                  key={item.label}
                  onClick={() => setActiveTab(item.label)}
                  style={{ fontFamily: "'Jost', sans-serif" }}
                  className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-[0.82rem] tracking-wider transition-all mb-1 ${activeTab === item.label ? 'bg-[#1A1208] text-white' : 'text-[#5C4A1E] hover:bg-[#FDFAF4]'}`}
                >
                  <item.icon size={16} />
                  {item.label}
                </button>
              ))}
              <Link to="/referral" style={{ fontFamily: "'Jost', sans-serif" }} className="block text-[0.8rem] text-[#C9A84C] mt-2 ml-4 underline">
  🎁 Refer & Earn ₹200
</Link>
            </div>
            
          </aside>

          {/* MAIN CONTENT */}
          <div className="lg:col-span-3">

            {/* MY BOOKINGS TAB */}
            {activeTab === 'My Bookings' && (
              <div>
                <h2 style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-[1.6rem] text-[#1A1208] font-semibold mb-6">My Bookings</h2>
                <div className="space-y-4">
                  {myBookings.map((booking) => {
                    const status = statusConfig[booking.status]
                    return (
                      <div key={booking.id} className="bg-white rounded-2xl shadow-[0_4px_16px_rgba(26,18,8,0.06)] p-5 flex flex-col sm:flex-row gap-4">
                        <img src={booking.image} alt={booking.title} className="w-full sm:w-28 h-28 rounded-xl object-cover shrink-0" />
                        <div className="flex-1">
                          <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                            <div>
                              <p style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.62rem] text-[#D9776B] tracking-[0.2em] uppercase font-semibold">{booking.category}</p>
                              <h3 style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-[1.2rem] text-[#1A1208] font-semibold">{booking.title}</h3>
                            </div>
                            <span style={{ fontFamily: "'Jost', sans-serif", color: status.color, background: status.bg }} className="text-[0.65rem] px-3 py-1.5 rounded-full font-semibold tracking-wider">
                              {status.label}
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-4 mb-3">
                            <div className="flex items-center gap-1.5 text-[#9E8A6A]">
                              <FiCalendar size={12} />
                              <span style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.75rem]">{booking.date}</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-[#9E8A6A]">
                              <FiMapPin size={12} />
                              <span style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.75rem]">{booking.venue}</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <span style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-[1.2rem] text-[#1A1208] font-bold">{formatPrice(booking.price)}</span>
                            <span style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.65rem] text-[#9E8A6A]">ID: {booking.id}</span>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* PROFILE TAB */}
            {activeTab === 'Profile' && (
              <div className="bg-white rounded-2xl shadow-[0_4px_16px_rgba(26,18,8,0.06)] p-6 md:p-8">
                <h2 style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-[1.6rem] text-[#1A1208] font-semibold mb-6">Edit Profile</h2>
                <div className="space-y-5">
                  {[
                    { label: 'Full Name', name: 'name', placeholder: user?.name || 'Your name', type: 'text' },
                    { label: 'Email Address', name: 'email', placeholder: user?.email || 'your@email.com', type: 'email' },
                    { label: 'Phone Number', name: 'phone', placeholder: user?.phone || '+91 98765 43210', type: 'tel' },
                  ].map((field) => (
                    <div key={field.label}>
                      <label style={{ fontFamily: "'Jost', sans-serif" }} className="block text-[0.68rem] text-[#5C4A1E] tracking-[0.15em] uppercase mb-2">{field.label}</label>
                      <input type={field.type} defaultValue={field.placeholder} style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.85rem' }} className="w-full bg-[#FDFAF4] border border-[#EDE0C4] rounded-xl px-4 py-3 outline-none focus:border-[#C9A84C] transition-colors text-[#1A1208]" />
                    </div>
                  ))}
                  <button style={{ fontFamily: "'Jost', sans-serif" }} className="flex items-center gap-2 bg-[#1A1208] text-white rounded-full px-8 py-3.5 text-[0.75rem] tracking-[0.15em] uppercase font-semibold hover:bg-[#C9A84C] transition-colors">
                    <FiEdit size={14} /> Update Profile
                  </button>
                </div>
              </div>
            )}

            {/* WISHLIST TAB */}
            {activeTab === 'Wishlist' && (
              <div>
                <h2 style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-[1.6rem] text-[#1A1208] font-semibold mb-6">My Wishlist</h2>
                <div className="bg-white rounded-2xl shadow-[0_4px_16px_rgba(26,18,8,0.06)] p-12 text-center">
                  <FiHeart size={40} color="#EDE0C4" className="mx-auto mb-4" />
                  <p style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-[1.4rem] text-[#1A1208] mb-2">Your wishlist is empty</p>
                  <p style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.82rem] text-[#9E8A6A] mb-6">Save packages you love for later</p>
                  <Link to="/services" style={{ fontFamily: "'Jost', sans-serif" }} className="inline-block bg-[#1A1208] text-white rounded-full px-8 py-3.5 text-[0.75rem] tracking-[0.2em] uppercase font-semibold hover:bg-[#C9A84C] transition-colors">
                    Explore Packages
                  </Link>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard