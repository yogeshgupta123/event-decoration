import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

// ============================================
// PAGE TRANSITION — har page smoothly fade-in/out hoga
// jab navigate karo dusre page pe
// ============================================
const PageTransition = ({ children }: { children: ReactNode }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  )
}

export default PageTransition