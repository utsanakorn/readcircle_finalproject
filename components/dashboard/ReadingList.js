'use client'

import { useReadingList } from '../../hooks/useReadingList'
import ReadingListItem from './ReadingListItem'

export default function ReadingList() {
  const { books, loading } = useReadingList()

  if (loading) {
    return (
      <div className="flex flex-col gap-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="animate-pulse bg-gray-100 rounded-xl h-24" />
        ))}
      </div>
    )
  }

  if (books.length === 0) {
    return (
      <div className="text-center py-16 text-gray-400">
        <div className="text-4xl mb-3">📚</div>
        <div className="text-sm">Your reading list is empty.</div>
        <div className="text-sm mt-1">
          <a href="/" className="text-orange-500 hover:underline">Search for books</a>
          {' '}to get started.
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-3">
      {books.map((book) => (
        <ReadingListItem key={book.id} book={book} />
      ))}
    </div>
  )
}