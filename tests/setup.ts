import '@testing-library/jest-dom/vitest'
import React from 'react'
import { vi } from 'vitest'

process.env.SKIP_ENV_VALIDATION = 'true'

vi.mock('server-only', () => ({}))

vi.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, ...rest }: { src: string; alt: string }) =>
    React.createElement('img', { src, alt, ...rest }),
}))

vi.mock('next/link', () => ({
  __esModule: true,
  default: ({ href, children, ...rest }: { href: string; children: React.ReactNode }) =>
    React.createElement('a', { href, ...rest }, children),
}))
