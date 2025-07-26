import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function createSupabaseServerClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name) {
          return cookieStore.get(name)?.value ?? null
        },
        set(name, value, options) {
          cookieStore.set({ name, value, ...options })
        },
        remove(name, options) {
          cookieStore.delete({ name, ...options })
        },
      },
    }
  )
}

export const requireAuth = async () => {
  const supabase = await createSupabaseServerClient()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) redirect('/')

  return { supabase, user }
}

export const requireRole = async (requiredRoles: string | string[]) => {
  const { supabase, user } = await requireAuth()

  // ✅ Fetch role from the `user` table instead of user_metadata
  const { data: userData, error } = await supabase
    .from('user')
    .select('role')
    .eq('auth_user_id', user.id)
    .maybeSingle()

  if (error || !userData?.role) {
    console.error('Auth error: Could not determine user role', error)
    redirect('/')
  }

  const allowed = Array.isArray(requiredRoles)
    ? requiredRoles.includes(userData.role)
    : userData.role === requiredRoles

  if (!allowed) redirect('/dashboard')

  return { supabase, user }
}
