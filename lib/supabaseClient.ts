import { createBrowserClient } from '@supabase/ssr'

const sessionStorageAdapter = typeof window !== 'undefined'
  ? {
      getItem: async (key: string) => sessionStorage.getItem(key),
      setItem: async (key: string, value: string) => sessionStorage.setItem(key, value),
      removeItem: async (key: string) => sessionStorage.removeItem(key),
    }
  : undefined

export const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  {
    auth: {
      storage: sessionStorageAdapter,
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  }
)
