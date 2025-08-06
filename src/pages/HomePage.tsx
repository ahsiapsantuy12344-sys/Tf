import React from 'react'
import { Link } from 'react-router-dom'
import { MessageCircle, User, Shield } from 'lucide-react'

export function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Bisikin
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Kirim pesan anonim tanpa ragu
          </p>
        </div>

        <div className="card p-6 space-y-4">
          <Link
            to="/login"
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-accent-from to-accent-to text-white py-3 rounded-card font-medium hover:shadow-lg transition-all"
          >
            <User className="w-4 h-4" />
            Mulai Sekarang
          </Link>

          <div className="text-center text-sm text-gray-500">
            Atau kirim pesan ke{" "}
            <Link to="/u/anon" className="text-blue-500 hover:underline">
              @anon
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 text-center text-sm">
          <div className="flex flex-col items-center gap-2">
            <MessageCircle className="w-8 h-8 text-blue-500" />
            <span className="text-gray-600 dark:text-gray-400">Anonim</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Shield className="w-8 h-8 text-green-500" />
            <span className="text-gray-600 dark:text-gray-400">Aman</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <User className="w-8 h-8 text-purple-500" />
            <span className="text-gray-600 dark:text-gray-400">Gratis</span>
          </div>
        </div>
      </div>
    </div>
  )
}
