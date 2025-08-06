import React, { useState } from 'react'
import { Send, Heart } from 'lucide-react'
import { api } from '../lib/api'

interface Props {
  username: string
}

export function MessageForm({ username }: Props) {
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!content.trim()) return
    
    setLoading(true)
    try {
      await api.message.send(username, content)
      setSent(true)
      setContent('')
    } catch (error) {
      alert('Gagal mengirim pesan')
    } finally {
      setLoading(false)
    }
  }

  if (sent) {
    return (
      <div className="text-center p-8">
        <Heart className="w-16 h-16 mx-auto mb-4 text-red-500" />
        <h3 className="text-xl font-semibold mb-2">Pesan terkirim!</h3>
        <p className="text-gray-600 dark:text-gray-400">
          Pesan anonimmu telah dikirim ke @{username}
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">
          Kirim pesan anonim ke @{username}
        </label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-3 rounded-card border border-gray-200 dark:border-gray-700 
                     bg-white dark:bg-gray-800 resize-none focus:outline-none focus:ring-2 
                     focus:ring-blue-500"
          rows={4}
          placeholder="Tulis pesan anonimmu di sini..."
          maxLength={500}
        />
      </div>
      
      <button
        type="submit"
        disabled={loading || !content.trim()}
        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r 
                   from-accent-from to-accent-to text-white py-3 rounded-card 
                   font-medium hover:shadow-lg transition-all disabled:opacity-50"
      >
        <Send className="w-4 h-4" />
        {loading ? 'Mengirim...' : 'Kirim Anonim'}
      </button>
    </form>
  )
}
