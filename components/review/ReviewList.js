'use client'

import { useReviews } from '../../hooks/useReviews'
import { updateReview, deleteReview } from '../../lib/firestore/reviews'
import { useState } from 'react'
import StarRating from './StarRating'

export default function ReviewList({ bookId, currentUserId }) {
  const { reviews, loading } = useReviews(bookId)
  const [editingId,   setEditingId]   = useState(null)
  const [editText,    setEditText]    = useState('')
  const [editRating,  setEditRating]  = useState(0)

  function startEdit(review) {
    setEditingId(review.id)
    setEditText(review.text)
    setEditRating(review.rating)
  }

  async function handleUpdate(reviewId) {
    await updateReview(reviewId, { rating: editRating, text: editText })
    setEditingId(null)
  }

  if (loading) {
    return <div className="text-sm text-gray-400">Loading reviews…</div>
  }

  if (reviews.length === 0) {
    return <div className="text-sm text-gray-400">No reviews yet. Be the first!</div>
  }

  return (
    <div className="flex flex-col gap-4">
      {reviews.map((review) => (
        <div key={review.id} className="bg-white border border-gray-100 rounded-xl p-4 flex flex-col gap-2">

          <StarRating value={review.rating} readOnly />

          {editingId === review.id ? (
            <>
              <StarRating value={editRating} onChange={setEditRating} />
              <textarea
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                rows={3}
                className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2
                           focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none"
              />
              <div className="flex gap-2 self-end">
                <button
                  onClick={() => setEditingId(null)}
                  className="text-xs text-gray-400 hover:text-gray-600"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleUpdate(review.id)}
                  className="text-xs bg-orange-500 text-white px-3 py-1 rounded-full hover:bg-orange-600"
                >
                  Save
                </button>
              </div>
            </>
          ) : (
            <div className="text-sm text-gray-700">{review.text}</div>
          )}

          {currentUserId === review.uid && editingId !== review.id && (
            <div className="flex gap-3 self-end">
              <button
                onClick={() => startEdit(review)}
                className="text-xs text-gray-400 hover:text-orange-500"
              >
                Edit
              </button>
              <button
                onClick={() => deleteReview(review.id)}
                className="text-xs text-gray-400 hover:text-red-500"
              >
                Delete
              </button>
            </div>
          )}

        </div>
      ))}
    </div>
  )
}