import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../lib/api'
import { useStore } from '../lib/store'

export function LoginPage() {
  const [username, setUsername] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { setUser } = useStore()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!username.trim()) return

    setLoading(true)
    try {
      // Coba login dulu, kalau gagal register
      let result
      try {
        result = await api.auth.login(username)
      } catch {
        result = await api.auth.register(username)
      }
      
      setUser(result)
      localStorage.setItem('token', result.token)
      navigate('/dashboard')
    } catch (error) {
      alert('Gagal login/register')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="card p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-center mb-6">
          Masuk ke Bisikin
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 rounded-card border border-gray-200 dark:border-gray-700 
                         bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 
                         focus:ring-blue-500"
              placeholder="Masukkan username"
              minLength={3}
              maxLength={20}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-accent-from to-accent-to text-white 
                       py-3 rounded-card font-medium hover:shadow-lg transition-all 
                       disabled:opacity-50"
          >
            {loading ? 'Loading...' : 'Masuk'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-4">
          Belum punya akun? Username akan otomatis dibuat
        </p>
      </div>
    </div>
  )
}
