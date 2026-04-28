'use client'

import { motion, useInView, type Variants } from 'framer-motion'
import { Children, useRef, type ReactNode } from 'react'
import { EASE_OUT } from './easing'

type Props = {
  children: ReactNode
  className?: string
  stagger?: number
  delay?: number
}

const container = (stagger: number, delay: number): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger, delayChildren: delay },
  },
})

const item: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: EASE_OUT },
  },
}

export function StaggerGrid({ children, className, stagger = 0.08, delay = 0.05 }: Props) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0 })

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={container(stagger, delay)}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      {Children.map(children, (child, i) => (
        <motion.div key={i} variants={item}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  )
}
