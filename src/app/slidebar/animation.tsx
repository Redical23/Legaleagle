import { motion } from 'framer-motion'

export const FadeInUp = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ y: 20, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.5, delay }}
  >
    {children}
  </motion.div>
)

export const PulseAnimation = ({ children }) => (
  <motion.div
    animate={{
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse"
      }
    }}
  >
    {children}
  </motion.div>
)