import Link from 'next/link'
import BookCover from './BookCover'

export default function BookCard({ book }) {
  return (
    <Link
      href={`/book/${book.id}`}
      className="group flex flex-col rounded-xl overflow-hidden border border-gray-100
                 bg-white shadow-sm hover:shadow-md transition-shadow"
    >
      <BookCover
        src={book.coverUrl}
        title={book.title}
        className="h-44 w-full"
      />
      <div className="p-3 flex flex-col gap-0.5">
        <div className="text-sm font-semibold text-gray-800 line-clamp-2 group-hover:text-orange-500 transition-colors">
          {book.title}
        </div>
        <div className="text-xs text-gray-400 truncate">{book.author}</div>
        {book.year && (
          <div className="text-xs text-gray-300">{book.year}</div>
        )}
      </div>
    </Link>
  )
}