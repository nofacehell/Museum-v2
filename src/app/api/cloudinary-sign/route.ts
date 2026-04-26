import { env } from '@/env'
import { auth } from '@/lib/auth'
import crypto from 'crypto'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  const { paramsToSign } = body as { paramsToSign: Record<string, string> }

  const params = Object.keys(paramsToSign)
    .sort()
    .map((k) => `${k}=${paramsToSign[k]}`)
    .join('&')

  const signature = crypto
    .createHash('sha256')
    .update(params + env.CLOUDINARY_API_SECRET)
    .digest('hex')

  return NextResponse.json({ signature })
}
