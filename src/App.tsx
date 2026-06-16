import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/navbar/Navbar'
import Footer from './components/home/Footer'
import PageTransition from './components/animations/PageTransition'
import ScrollToTop from './components/ScrollToTop'
import ToastContainer from './components/ui/ToastContainer'
import WhatsAppButton from './components/layout/WhatsAppButton'
import BottomNav from './components/layout/BottomNav'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Services from './pages/Services'
import Cart from './pages/Cart'
import PackageDetail from './pages/PackageDetail'
import Checkout from './pages/Checkout'
import Dashboard from './pages/Dashboard'
import About from './pages/About'
import Contact from './pages/Contact'
import Shop from './pages/Shop'
import ShopDetail from './pages/ShopDetail'
import Experiences from './pages/Experiences'
import ExperienceDetail from './pages/ExperienceDetail'
import OrderConfirmation from './pages/OrderConfirmation'
import NotFound from './pages/NotFound'
import SearchResults from './pages/SearchResults'
import Referral from './pages/Referral'

const AnimatedRoutes = () => {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Home /></PageTransition>} />
        <Route path="/login" element={<PageTransition><Login /></PageTransition>} />
        <Route path="/register" element={<PageTransition><Register /></PageTransition>} />
        <Route path="/services" element={<PageTransition><Services /></PageTransition>} />
        <Route path="/cart" element={<PageTransition><Cart /></PageTransition>} />
        <Route path="/package/:id" element={<PageTransition><PackageDetail /></PageTransition>} />
        <Route path="/checkout" element={<PageTransition><Checkout /></PageTransition>} />
        <Route path="/dashboard" element={<PageTransition><Dashboard /></PageTransition>} />
        <Route path="/about" element={<PageTransition><About /></PageTransition>} />
        <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
        <Route path="/shop" element={<PageTransition><Shop /></PageTransition>} />
        <Route path="/shop/:id" element={<PageTransition><ShopDetail /></PageTransition>} />
        <Route path="/experiences" element={<PageTransition><Experiences /></PageTransition>} />
        <Route path="/experience/:id" element={<PageTransition><ExperienceDetail /></PageTransition>} />
        <Route path="/order-confirmed/:id" element={<PageTransition><OrderConfirmation /></PageTransition>} />
<Route path="/search" element={<PageTransition><SearchResults /></PageTransition>} />
<Route path="/referral" element={<PageTransition><Referral /></PageTransition>} />

        {/* ✅ HAMESHA SABSE LAST */}
        <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  )
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />
      <ToastContainer />
      <AnimatedRoutes />
      <Footer />
      <WhatsAppButton />
      <BottomNav />
      <div className="h-[60px] md:hidden" />
    </BrowserRouter>
  )
}

export default App