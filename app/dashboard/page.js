'use client'

import ProtectedRoute from '../../components/layout/ProtectedRoute'
import ReadingList from '../../components/dashboard/ReadingList'
import { useAuth } from '../../hooks/useAuth'
import { useReadingList } from '../../hooks/useReadingList'

function DashboardContent() {
  const { user } = useAuth()
  const { books } = useReadingList()

  return (
    <div className="min-h-screen bg-gray-50">

      <div className="bg-gradient-to-br from-orange-500 to-amber-400 text-white px-4 py-12">
        <div className="max-w-3xl mx-auto flex items-center gap-5">
          <img
            src={user?.photoURL}
            alt={user?.displayName}
            className="w-16 h-16 rounded-full border-4 border-white shadow-md"
          />
          <div>
            <div className="text-2xl font-bold">
              Hey, {user?.displayName?.split(' ')[0]} 👋
            </div>
            <div className="text-orange-100 text-sm mt-1">
              Welcome back to your reading dashboard
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border-b border-gray-100 px-4 py-5">
        <div className="max-w-3xl mx-auto flex gap-8">
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-500">{books.length}</div>
            <div className="text-xs text-gray-400 mt-0.5">Books Saved</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-500">📚</div>
            <div className="text-xs text-gray-400 mt-0.5">Reading List</div>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="text-xl font-bold text-gray-900">My Reading List</div>
            <div className="text-sm text-gray-400 mt-0.5">Books you have saved to read</div>
          </div>
          <a href="/" className="bg-orange-500 text-white text-sm px-4 py-2 rounded-full hover:bg-orange-600 transition-colors">Add Books</a>
        </div>
        <ReadingList />
      </div>

    </div>
  )
}

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  )
}