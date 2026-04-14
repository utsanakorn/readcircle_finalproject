'use client'

import Image from 'next/image'
import { useState } from 'react'

export default function BookCover({ src, title, className = '' }) {
  const [errored, setErrored] = useState(false)

  if (!src || errored) {
    return (
      <div
        className={`bg-gradient-to-br from-orange-50 to-orange-100 flex flex-col items-center
                    justify-center text-orange-400 rounded-lg ${className}`}
      >
        <div className="text-4xl">📖</div>
        <div className="text-xs text-center mt-1 px-2 text-orange-500 font-medium line-clamp-3">
          {title}
        </div>
      </div>
    )
  }

  return (
    <div className={`relative overflow-hidden rounded-lg ${className}`}>
      <Image
        src={src}
        alt={`Cover of ${title}`}
        fill
        className="object-cover"
        onError={() => setErrored(true)}
        sizes="(max-width: 640px) 50vw, 25vw"
      />
    </div>
  )
}