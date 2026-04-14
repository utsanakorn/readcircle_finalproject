'use client'

import Link from 'next/link'
import BookCover from '../book/BookCover'
import { removeBook } from '../../lib/firestore/readingList'
import { useAuth } from '../../hooks/useAuth'

export default function ReadingListItem({ book }) {
  const { user } = useAuth()

  async function handleRemove() {
    if (!user) return
    await removeBook(user.uid, book.id)
  }

  return (
    <div className="flex gap-4 bg-white border border-gray-100 rounded-xl p-4 items-start">

      <div className="shrink-0 w-16 h-24">
        <BookCover src={book.coverUrl} title={book.title} className="w-full h-full" />
      </div>

      <div className="flex flex-col gap-1 flex-1 min-w-0">
        <Link
          href={`/book/${book.id}`}
          className="text-sm font-semibold text-gray-800 hover:text-orange-500 transition-colors line-clamp-2"
        >
          {book.title}
        </Link>
        <div className="text-xs text-gray-400">{book.author}</div>
        {book.year && (
          <div className="text-xs text-gray-300">{book.year}</div>
        )}
      </div>

      <button
        onClick={handleRemove}
        className="text-xs text-gray-300 hover:text-red-500 transition-colors shrink-0"
      >
        Remove
      </button>

    </div>
  )
}