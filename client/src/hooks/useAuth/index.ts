import { create } from 'zustand'

interface Auth {
    isLoading: boolean
    isVerified: boolean
}

interface Store {
    auth: Auth
    fetchAuth: () => Promise<void>
    updateAuth: (auth: Pick<Auth, 'isVerified'>) => void
}

const useAuth = create<Store>()((set) => ({
    auth: { isLoading: true, isVerified: false },
    fetchAuth: async () => {
        const response = await fetch('http://localhost:4000/auth', { credentials: 'include' })
        set({ auth: { isLoading: false, isVerified: response.ok } })
    },
    updateAuth: ({ isVerified }) => set({ auth: { isLoading: false, isVerified } })
}))

export default useAuth
