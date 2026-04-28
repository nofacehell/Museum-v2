'use client'

import { motion, useInView, type HTMLMotionProps } from 'framer-motion'
import { useRef, type ReactNode } from 'react'
import { EASE_OUT } from './easing'

type Props = {
  children: ReactNode
  delay?: number
  y?: number
  duration?: number
} & Omit<HTMLMotionProps<'div'>, 'initial' | 'animate' | 'transition'>

export function FadeIn({ children, delay = 0, y = 24, duration = 0.7, ...rest }: Props) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration, delay, ease: EASE_OUT }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}
