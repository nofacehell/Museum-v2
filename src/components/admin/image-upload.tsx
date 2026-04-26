'use client'

import { Button } from '@/components/ui/button'
import { CldUploadWidget } from 'next-cloudinary'
import Image from 'next/image'

type UploadResult = {
  secure_url: string
  public_id: string
}

type Props = {
  value: string
  onChange: (url: string, publicId: string) => void
}

export function ImageUpload({ value, onChange }: Props) {
  return (
    <div className="space-y-3">
      <CldUploadWidget
        signatureEndpoint="/api/cloudinary-sign"
        config={{
          cloud: {
            cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
            apiKey: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
          },
        }}
        options={{ folder: 'museum', sources: ['local', 'url'], maxFiles: 1 }}
        onSuccess={(result) => {
          if (result.event !== 'success') return
          const info = result.info as UploadResult
          onChange(info.secure_url, info.public_id)
        }}
      >
        {({ open }) => (
          <Button type="button" variant="outline" onClick={() => open()}>
            {value ? 'Заменить изображение' : 'Загрузить изображение'}
          </Button>
        )}
      </CldUploadWidget>

      {value && (
        <div className="relative h-48 w-full overflow-hidden rounded-md border">
          <Image src={value} alt="Превью" fill className="object-cover" />
        </div>
      )}
    </div>
  )
}
