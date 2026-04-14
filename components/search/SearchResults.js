import BookCard from '../book/BookCard'

export default function SearchResults({ books, loading, query }) {
  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="animate-pulse bg-gray-100 rounded-xl h-64" />
        ))}
      </div>
    )
  }

  if (query && books.length === 0) {
    return (
      <p className="text-center text-gray-400 mt-12">
        No books found for{' '}
        <span className="font-medium text-gray-600">"{query}"</span>.
      </p>
    )
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-6">
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  )
}