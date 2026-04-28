'use client'

import { motion, type HTMLMotionProps } from 'framer-motion'
import { type ReactNode } from 'react'
import { EASE_OUT } from './easing'

type Props = {
  children: ReactNode
  delay?: number
  y?: number
  duration?: number
  once?: boolean
} & Omit<HTMLMotionProps<'div'>, 'initial' | 'animate' | 'whileInView' | 'viewport' | 'transition'>

export function FadeIn({
  children,
  delay = 0,
  y = 24,
  duration = 0.7,
  once = true,
  ...rest
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '-80px' }}
      transition={{ duration, delay, ease: EASE_OUT }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}
