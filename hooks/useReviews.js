'use client'

import { useEffect, useState } from 'react'
import { subscribeReviews } from '../lib/firestore/reviews'

export function useReviews(bookId) {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!bookId) return
    const unsubscribe = subscribeReviews(bookId, (list) => {
      setReviews(list)
      setLoading(false)
    })
    return unsubscribe
  }, [bookId])

  return { reviews, loading }
}