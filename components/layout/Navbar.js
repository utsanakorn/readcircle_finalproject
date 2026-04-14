'use client'

import Link from 'next/link'
import { useAuth } from '../../hooks/useAuth'
import { signOutUser } from '../../lib/auth'

export default function Navbar() {
  const { user } = useAuth()

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">

        <Link href="/" className="font-bold text-lg text-orange-500 tracking-tight">
          📚 ReadCircle
        </Link>

        <div className="flex items-center gap-4 text-sm font-medium text-gray-600">
          <Link href="/" className="hover:text-orange-500 transition-colors">
            Search
          </Link>

          {user ? (
            <>
              <Link href="/dashboard" className="hover:text-orange-500 transition-colors">
                Dashboard
              </Link>
              <button
                onClick={signOutUser}
                className="text-gray-400 hover:text-red-500 transition-colors"
              >
                Sign out
              </button>
              <img
                src={user.photoURL}
                alt={user.displayName}
                className="w-8 h-8 rounded-full object-cover border border-gray-200"
              />
            </>
          ) : (
            <Link
              href="/auth"
              className="bg-orange-500 text-white px-4 py-1.5 rounded-full hover:bg-orange-600 transition-colors"
            >
              Sign in
            </Link>
          )}
        </div>

      </div>
    </nav>
  )
}