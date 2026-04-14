'use client'

import { useState, useCallback } from 'react'
import { searchBooks } from '../lib/openLibrary'
import SearchBar from '../components/search/SearchBar'
import SearchResults from '../components/search/SearchResults'

export default function HomePage() {
  const [books,   setBooks]   = useState([])
  const [loading, setLoading] = useState(false)
  const [query,   setQuery]   = useState('')

  const handleSearch = useCallback(async (q) => {
    setQuery(q)
    if (!q) return setBooks([])
    setLoading(true)
    try {
      const results = await searchBooks(q)
      setBooks(results)
    } catch (e) {
      console.error(e)
      setBooks([])
    } finally {
      setLoading(false)
    }
  }, [])

  return (
    <div className="min-h-screen bg-white">

      {/* Hero */}
      <div className="bg-gradient-to-br from-orange-500 to-orange-400 text-white py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="text-6xl mb-4">📚</div>
          <div className="text-4xl font-bold mb-3">
            Discover Your Next Great Read
          </div>
          <div className="text-orange-100 text-lg mb-10">
            Search millions of books, save your favourites, and share reviews with your circle.
          </div>
          <div className="flex justify-center">
            <SearchBar onSearch={handleSearch} />
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-5xl mx-auto px-4 py-10">
        {!query && !loading && (
          <div className="text-center py-16">
            <div className="text-5xl mb-4">🔍</div>
            <div className="text-gray-400 text-lg font-medium">
              Search for a book to get started
            </div>
            <div className="text-gray-300 text-sm mt-2">
              Try searching by title, author, or ISBN
            </div>

            {/* Feature cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16 text-left">
              <div className="bg-orange-50 rounded-2xl p-6">
                <div className="text-3xl mb-3">🔎</div>
                <div className="font-semibold text-gray-800 mb-1">Search Books</div>
                <div className="text-sm text-gray-500">
                  Find any book by title, author, or ISBN from millions of titles.
                </div>
              </div>
              <div className="bg-orange-50 rounded-2xl p-6">
                <div className="text-3xl mb-3">📖</div>
                <div className="font-semibold text-gray-800 mb-1">Save to Your List</div>
                <div className="text-sm text-gray-500">
                  Build your personal reading list and track what you want to read.
                </div>
              </div>
              <div className="bg-orange-50 rounded-2xl p-6">
                <div className="text-3xl mb-3">⭐</div>
                <div className="font-semibold text-gray-800 mb-1">Write Reviews</div>
                <div className="text-sm text-gray-500">
                  Share your thoughts and star ratings with the community.
                </div>
              </div>
            </div>
          </div>
        )}

        <SearchResults books={books} loading={loading} query={query} />
      </div>

    </div>
  )
}