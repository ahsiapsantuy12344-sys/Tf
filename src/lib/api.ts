const API_BASE = 'https://api.ngl.rzsite.my.id'

class ApiClient {
  private async request(endpoint: string, options?: RequestInit) {
    const token = localStorage.getItem('token')
    const res = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options?.headers,
      },
    })
    
    if (!res.ok) {
      const error = await res.text()
      throw new Error(error)
    }
    return res.json()
  }

  auth = {
    register: (username: string) => 
      this.request('/auth/register', { method: 'POST', body: JSON.stringify({ username }) }),
    login: (username: string) => 
      this.request('/auth/login', { method: 'POST', body: JSON.stringify({ username }) }),
  }

  message = {
    send: (username: string, content: string) =>
      this.request('/message/send', { method: 'POST', body: JSON.stringify({ username, content }) }),
    list: () => this.request('/message/list'),
    read: (id: string) => this.request(`/message/${id}/read`, { method: 'POST' }),
    predict: (id: string) => this.request(`/message/${id}/predict`, { method: 'POST' }),
  }

  user = {
    updateUsername: (newUsername: string) =>
      this.request('/user/username', { method: 'PUT', body: JSON.stringify({ newUsername }) }),
    reset: () => this.request('/user/reset', { method: 'POST' }),
  }

  admin = {
    login: (username: string, password: string) =>
      this.request('/admin/login', { method: 'POST', body: JSON.stringify({ username, password }) }),
    users: () => this.request('/admin/users'),
    messages: () => this.request('/admin/messages'),
    addCoins: (userId: string, coins: number) =>
      this.request('/admin/coins', { method: 'POST', body: JSON.stringify({ userId, coins }) }),
  }
}

export const api = new ApiClient()
