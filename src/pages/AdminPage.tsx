import React, { useState } from 'react'
import { api } from '../lib/api'

export function AdminPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loggedIn, setLoggedIn] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await api.admin.login(username, password)
      setLoggedIn(true)
    } catch (error) {
      alert('Login gagal')
    }
  }

  if (!loggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <form onSubmit={handleLogin} className="card p-8 max-w-md w-full space-y-4">
          <h2 className="text-2xl font-bold text-center">Admin Login</h2>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 border rounded-card"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border rounded-card"
          />
          <button type="submit" className="w-full bg-red-500 text-white py-3 rounded-card">
            Login
          </button>
        </form>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>
        <p>Admin dashboard content here...</p>
      </div>
    </div>
  )
}
