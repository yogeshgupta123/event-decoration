import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/navbar/Navbar'
import Footer from './components/home/Footer'
import PageTransition from './components/animations/PageTransition'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Services from './pages/Services'
import Vendors from './pages/Vendors'
import Cart from './pages/Cart'
import PackageDetail from './pages/PackageDetail'
import Checkout from './pages/Checkout'
import Dashboard from './pages/Dashboard'
import About from './pages/About'
import Contact from './pages/Contact'

// ============================================
// AnimatePresence ko "current location" jaanna zaroori hai
// taaki pata chale page change hua hai — isliye
// ye logic alag component mein rakha hai
// ============================================
const AnimatedRoutes = () => {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Home /></PageTransition>} />
        <Route path="/login" element={<PageTransition><Login /></PageTransition>} />
        <Route path="/register" element={<PageTransition><Register /></PageTransition>} />
        <Route path="/services" element={<PageTransition><Services /></PageTransition>} />
        <Route path="/vendors" element={<PageTransition><Vendors /></PageTransition>} />
        <Route path="/cart" element={<PageTransition><Cart /></PageTransition>} />
        <Route path="/package/:id" element={<PageTransition><PackageDetail /></PageTransition>} />
        <Route path="/checkout" element={<PageTransition><Checkout /></PageTransition>} />
        <Route path="/dashboard" element={<PageTransition><Dashboard /></PageTransition>} />
        <Route path="/about" element={<PageTransition><About /></PageTransition>} />
        <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <AnimatedRoutes />
      <Footer />
    </BrowserRouter>
  )
}

export default App