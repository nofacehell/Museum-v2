import '@testing-library/jest-dom/vitest'
import { vi } from 'vitest'

process.env.SKIP_ENV_VALIDATION = 'true'

vi.mock('server-only', () => ({}))
