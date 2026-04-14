'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../../hooks/useAuth'
import { signInWithGoogle } from '../../lib/auth'

export default function AuthPage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && user) router.replace('/dashboard')
  }, [user, loading, router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-500 via-orange-400 to-amber-300 flex items-center justify-center px-4">
      <div className="w-full max-w-md">

        <div className="bg-white rounded-3xl shadow-2xl p-10 flex flex-col items-center gap-6">

          <div className="text-6xl">📚</div>

          <div className="text-center">
            <div className="text-3xl font-extrabold text-gray-900">Welcome to ReadCircle</div>
            <div className="text-gray-500 text-base mt-2 font-medium">
              Your personal book discovery and tracking app
            </div>
          </div>

          <div className="w-full bg-orange-50 rounded-2xl p-5 flex flex-col gap-4">
            <div className="flex items-center gap-3 text-base text-gray-800 font-medium">
              <div className="text-2xl">🔍</div>
              <div>Search millions of books instantly</div>
            </div>
            <div className="flex items-center gap-3 text-base text-gray-800 font-medium">
              <div className="text-2xl">📖</div>
              <div>Save books to your personal reading list</div>
            </div>
            <div className="flex items-center gap-3 text-base text-gray-800 font-medium">
              <div className="text-2xl">⭐</div>
              <div>Write and share reviews with star ratings</div>
            </div>
          </div>

          <div className="w-full flex items-center gap-3">
            <div className="flex-1 h-px bg-gray-200" />
            <div className="text-sm text-gray-400 font-medium">sign in to continue</div>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          <button
            onClick={signInWithGoogle}
            className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-orange-500 to-amber-400 text-white rounded-2xl px-6 py-4 text-base font-bold shadow-lg hover:from-orange-600 hover:to-amber-500 hover:shadow-xl transition-all duration-200"
          >
            <img
              src="https://www.google.com/favicon.ico"
              alt="Google"
              className="w-5 h-5"
            />
            Continue with Google
          </button>

          <div className="text-sm text-gray-400 font-medium text-center">
            By signing in you agree to our terms of service
          </div>

        </div>

        <div className="text-center mt-6 text-white text-base font-semibold">
          Built by Team Bravo · CPRG 306-C
        </div>

      </div>
    </div>
  )
}