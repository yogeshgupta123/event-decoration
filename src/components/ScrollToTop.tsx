import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// ============================================
// React Router PAGE CHANGE par scroll position
// RESET nahi karta — hum manually karenge
// ============================================
const ScrollToTop = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null  // kuch render nahi karta, sirf "effect" hai
}

export default ScrollToTop