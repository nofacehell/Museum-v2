'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'
import { EASE_OUT } from '@/components/motion/easing'

type Props = {
  src: string
  alt: string
}

export function ImageLightbox({ src, alt }: Props) {
  const [open, setOpen] = useState(false)

  const close = useCallback(() => setOpen(false), [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, close])

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="group relative block h-full w-full cursor-zoom-in"
        aria-label="Открыть изображение на весь экран"
      >
        <div className="relative h-full w-full">
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(max-width: 1024px) 100vw, 60vw"
            className="object-cover transition-all duration-500 group-hover:scale-[1.02]"
            priority
          />
          <div className="absolute inset-0 flex items-end justify-end p-3 opacity-0 transition-opacity group-hover:opacity-100">
            <span className="bg-background/80 rounded-sm px-2 py-1 font-mono text-[10px] tracking-wider backdrop-blur">
              ⊕ увеличить
            </span>
          </div>
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={close}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/90" />

            {/* Image */}
            <motion.div
              className="relative z-10 max-h-[90vh] max-w-[90vw]"
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.35, ease: EASE_OUT }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative" style={{ width: '90vw', maxWidth: 960, height: '80vh' }}>
                <Image
                  src={src}
                  alt={alt}
                  fill
                  sizes="90vw"
                  className="object-contain"
                  priority
                />
              </div>
            </motion.div>

            {/* Close button */}
            <button
              onClick={close}
              className="absolute top-4 right-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition-colors hover:bg-white/20"
              aria-label="Закрыть"
            >
              <X size={18} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
