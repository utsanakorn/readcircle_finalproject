'use client'

import { useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { addReview } from '../../lib/firestore/reviews'
import StarRating from './StarRating'

export default function ReviewForm({ bookId }) {
  const { user } = useAuth()
  const [rating,      setRating]      = useState(0)
  const [text,        setText]        = useState('')
  const [submitting,  setSubmitting]  = useState(false)
  const [error,       setError]       = useState('')

  async function handleSubmit() {
    if (!rating) return setError('Please select a star rating.')
    if (!text.trim()) return setError('Please write something.')

    setSubmitting(true)
    setError('')
    try {
      await addReview({ uid: user.uid, bookId, rating, text: text.trim() })
      setRating(0)
      setText('')
    } catch (e) {
      setError('Something went wrong. Try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="bg-gray-50 rounded-xl p-4 mb-6 flex flex-col gap-3">
      <div className="text-sm font-medium text-gray-700">Write a review</div>

      <StarRating value={rating} onChange={setRating} />

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Share your thoughts about this book…"
        rows={3}
        className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2
                   focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none"
      />

      {error && (
        <div className="text-xs text-red-500">{error}</div>
      )}

      <button
        onClick={handleSubmit}
        disabled={submitting}
        className="self-end bg-orange-500 text-white text-sm px-5 py-2 rounded-full
                   hover:bg-orange-600 transition-colors disabled:opacity-50"
      >
        {submitting ? 'Posting…' : 'Post Review'}
      </button>
    </div>
  )
}