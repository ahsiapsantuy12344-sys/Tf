import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../lib/api'
import { useStore } from '../lib/store'
import { MessageSquare, ExternalLink, Settings } from 'lucide-react'

interface Message {
  id: string
  content: string
  read: boolean
  created_at: string
}

export function DashboardPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const { user, logout } = useStore()
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      navigate('/login')
      return
    }

    loadMessages()
  }, [user, navigate])

  const loadMessages = async () => {
    try {
      const data = await api.message.list()
      setMessages(data)
    } catch (error) {
      console.error('Failed to load messages')
    } finally {
      setLoading(false)
    }
  }

  const markAsRead = async (id: string) => {
    try {
      await api.message.read(id)
      setMessages(prev => 
        prev.map(msg => msg.id === id ? { ...msg, read: true } : msg)
      )
    } catch (error) {
      console.error('Failed to mark as read')
    }
  }

  const shareUrl = `https://ngl.rzsite.my.id/u/${user?.username}`

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <button
            onClick={logout}
            className="text-red-500 hover:text-red-600"
          >
            Logout
          </button>
        </div>

        <div className="card p-6 mb-6">
          <h2 className="font-semibold mb-2">Link Profilmu</h2>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={shareUrl}
              readOnly
              className="flex-1 p-2 bg-gray-100 dark:bg-gray-700 rounded"
            />
            <button
              onClick={() => {
                navigator.clipboard.writeText(shareUrl)
                alert('Link disalin!')
              }}
              className="p-2 bg-blue-500 text-white rounded"
            >
              Copy
            </button>
            <a
              href={shareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-gray-200 dark:bg-gray-600 rounded"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Pesan Masuk</h3>
          
          {loading ? (
            <p>Loading...</p>
          ) : messages.length === 0 ? (
            <p className="text-gray-500">Belum ada pesan</p>
          ) : (
            messages.map(msg => (
              <div key={msg.id} className="card p-4">
                <div className="flex justify-between items-start mb-2">
                  <span className={`text-xs px-2 py-1 rounded ${
                    msg.read ? 'bg-gray-200' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {msg.read ? 'Dibaca' : 'Baru'}
                  </span>
                  <span className="text-xs text-gray-500">
                    {new Date(msg.created_at).toLocaleDateString('id')}
                  </span>
                </div>
                <p className="text-gray-800 dark:text-gray-200">{msg.content}</p>
                {!msg.read && (
                  <button
                    onClick={() => markAsRead(msg.id)}
                    className="text-xs text-blue-500 mt-2"
                  >
                    Tandai sudah dibaca
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
