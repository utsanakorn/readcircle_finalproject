'use client'

import { useEffect, useState } from 'react'
import { subscribeReadingList } from '../lib/firestore/readingList'
import { useAuth } from './useAuth'

export function useReadingList() {
  const { user } = useAuth()
  const [books,   setBooks]   = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) {
      setBooks([])
      setLoading(false)
      return
    }
    setLoading(true)
    const unsubscribe = subscribeReadingList(user.uid, (list) => {
      setBooks(list)
      setLoading(false)
    })
    return unsubscribe
  }, [user])

  return { books, loading }
}