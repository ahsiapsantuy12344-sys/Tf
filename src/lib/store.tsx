import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
  token: string
  username: string
}

interface Store {
  user: User | null
  setUser: (user: User) => void
  logout: () => void
}

export const useStore = create<Store>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      logout: () => {
        localStorage.removeItem('token')
        set({ user: null })
      },
    }),
    {
      name: 'bisikin-store',
    }
  )
)
