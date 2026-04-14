'use client'

import { useAuth } from '../../hooks/useAuth'
import { useReadingList } from '../../hooks/useReadingList'
import { saveBook, removeBook } from '../../lib/firestore/readingList'
import BookCover from './BookCover'
import ReviewList from '../review/ReviewList'
import ReviewForm from '../review/ReviewForm'

export default function BookDetail({ book }) {
  const { user } = useAuth()
  const { books } = useReadingList()

  const isSaved = books.some((b) => b.id === book.id)

  async function handleToggleSave() {
    if (!user) return
    if (isSaved) {
      await removeBook(user.uid, book.id)
    } else {
      await saveBook(user.uid, {
        id:       book.id,
        title:    book.title,
        author:   book.author,
        coverUrl: book.coverUrl,
        year:     book.year,
      })
    }
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="flex flex-col sm:flex-row gap-8">

        <div className="shrink-0 w-full sm:w-48">
          <BookCover src={book.coverUrl} title={book.title} className="h-72 sm:h-64 w-full" />
        </div>

        <div className="flex flex-col gap-3">
          <div className="text-2xl font-bold text-gray-900">{book.title}</div>

          {book.author && (
            <div className="text-gray-500">
              by <div className="font-medium text-gray-700 inline">{book.author}</div>
            </div>
          )}

          {book.year && (
            <div className="text-sm text-gray-400">First published {book.year}</div>
          )}

          {book.subjects?.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-1">
              {book.subjects.map((s) => (
                <div key={s} className="text-xs bg-orange-50 text-orange-500 px-2 py-0.5 rounded-full">
                  {s}
                </div>
              ))}
            </div>
          )}

          {user ? (
            <button
              onClick={handleToggleSave}
              className={`mt-2 self-start px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                isSaved
                  ? 'bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-500'
                  : 'bg-orange-500 text-white hover:bg-orange-600'
              }`}
            >
              {isSaved ? '✓ Saved — Remove' : '+ Add to Reading List'}
            </button>
          ) : (
            <div className="text-sm text-gray-400 mt-2">
              <a href="/auth" className="text-orange-500 hover:underline">Sign in</a>{' '}
              to save this book.
            </div>
          )}

          {book.description && (
            <div className="text-sm text-gray-600 leading-relaxed mt-2 max-w-prose">
              {book.description}
            </div>
          )}
        </div>

      </div>

      <hr className="my-10 border-gray-100" />

      <section>
        <div className="text-lg font-bold text-gray-800 mb-4">Reviews</div>
        {user && <ReviewForm bookId={book.id} />}
        <ReviewList bookId={book.id} currentUserId={user?.uid} />
      </section>
    </div>
  )
}