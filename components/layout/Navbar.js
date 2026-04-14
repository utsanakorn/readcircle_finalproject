'use client'

import Link from 'next/link'
import { useAuth } from '../../hooks/useAuth'
import { signOutUser } from '../../lib/auth'

export default function Navbar() {
  const { user } = useAuth()

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">

        <Link href="/" className="font-extrabold text-2xl text-orange-500 tracking-tight">
          📚 ReadCircle
        </Link>

        <div className="flex items-center gap-6 text-base font-semibold text-gray-600">
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
                className="text-gray-400 hover:text-red-500 transition-colors font-semibold"
              >
                Sign out
              </button>
              <div className="w-9 h-9 rounded-full bg-orange-500 text-white flex items-center justify-center text-sm font-bold">
                {user.displayName?.charAt(0).toUpperCase() ?? 'U'}
              </div>
            </>
          ) : (
            <Link
              href="/auth"
              className="bg-orange-500 text-white px-5 py-2 rounded-full hover:bg-orange-600 transition-colors text-base font-bold"
            >
              Sign in
            </Link>
          )}
        </div>

      </div>
    </nav>
  )
}