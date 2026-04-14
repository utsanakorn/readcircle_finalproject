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
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg">
        🔍
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search by title, author, or ISBN…"
        className="w-full pl-12 pr-10 py-4 rounded-2xl border-0 shadow-lg
                   focus:outline-none focus:ring-2 focus:ring-white
                   text-gray-800 placeholder-gray-400 text-sm bg-white"
      />
      {value && (
        <button
          onClick={() => setValue('')}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>
      )}
    </div>
  )
}