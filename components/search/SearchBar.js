'use client'

import { useState, useEffect, useRef } from 'react'

export default function SearchBar({ onSearch }) {
  const [value, setValue] = useState('')
  const timerRef = useRef(null)

  useEffect(() => {
    clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      onSearch(value.trim())
    }, 500)
    return () => clearTimeout(timerRef.current)
  }, [value, onSearch])

  return (
    <div className="relative w-full max-w-xl">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
        🔍
      </span>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search by title, author, or ISBN…"
        className="w-full pl-10 pr-10 py-3 rounded-xl border border-gray-200 bg-white
                   shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm"
      />
      {value && (
        <button
          onClick={() => setValue('')}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>
      )}
    </div>
  )
}