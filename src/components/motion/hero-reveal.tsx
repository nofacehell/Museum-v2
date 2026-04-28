'use client'

import { motion, type Variants } from 'framer-motion'
import { type ReactNode } from 'react'
import { EASE_OUT } from './easing'

const container: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
}

const line: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: EASE_OUT },
  },
}

export function HeroReveal({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div className={className} variants={container} initial="hidden" animate="visible">
      {children}
    </motion.div>
  )
}

export function HeroLine({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div className={className} variants={line}>
      {children}
    </motion.div>
  )
}
