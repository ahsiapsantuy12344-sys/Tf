import React from 'react'
import { useParams } from 'react-router-dom'
import { MessageForm } from '../components/MessageForm'

export function ProfilePage() {
  const { username } = useParams<{ username: string }>()

  if (!username) return null

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-md mx-auto mt-8">
        <div className="card p-6">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold">@{username}</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Kirim pesan anonim
            </p>
          </div>
          
          <MessageForm username={username} />
        </div>
      </div>
    </div>
  )
}
