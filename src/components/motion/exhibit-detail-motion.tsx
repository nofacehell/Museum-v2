'use client'

import { ImageLightbox } from '@/components/public/image-lightbox'
import { motion, type Variants } from 'framer-motion'
import { type ReactNode } from 'react'
import { EASE_OUT } from './easing'

const ImageLightboxLazy = ImageLightbox

const labelContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.25 },
  },
}

const labelItem: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_OUT },
  },
}

type ExhibitImageProps = { src: string; alt: string }

export function ExhibitImage({ src, alt }: ExhibitImageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.04 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.1, ease: EASE_OUT }}
      className="bg-secondary/40 relative aspect-square overflow-hidden lg:sticky lg:top-28 lg:self-start"
    >
      <ImageLightboxLazy src={src} alt={alt} />
    </motion.div>
  )
}

export function ExhibitLabel({ children }: { children: ReactNode }) {
  return (
    <motion.div variants={labelContainer} initial="hidden" animate="visible">
      {children}
    </motion.div>
  )
}

export function ExhibitLabelItem({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <motion.div variants={labelItem} className={className}>
      {children}
    </motion.div>
  )
}
