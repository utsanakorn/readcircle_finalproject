'use client'

import { useState } from 'react'

export default function StarRating({ value = 0, onChange, readOnly = false }) {
  const [hovered, setHovered] = useState(0)

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={readOnly}
          onClick={() => !readOnly && onChange?.(star)}
          onMouseEnter={() => !readOnly && setHovered(star)}
          onMouseLeave={() => !readOnly && setHovered(0)}
          className={`text-2xl transition-colors ${
            (hovered || value) >= star
              ? 'text-orange-400'
              : 'text-gray-200'
          } ${readOnly ? 'cursor-default' : 'cursor-pointer hover:scale-110'}`}
        >
          ★
        </button>
      ))}
    </div>
  )
}