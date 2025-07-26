// app/dashboard/page.tsx
import { redirect } from 'next/navigation'
import { createSupabaseServerClient, requireAuth } from '@/lib/supabaseServer'
import ClientDashboard from './client-dashboard'

export default async function DashboardPage() {
  const { user } = await requireAuth()
  const supabase = await createSupabaseServerClient()

  const { data: userData, error } = await supabase
    .from('user')
    .select('role')
    .eq('auth_user_id', user.id)
    .maybeSingle()

  if (error || !userData?.role) {
    console.error('Auth error: Could not determine user role', error)
    redirect('/')
  }

  return <ClientDashboard role={userData.role} />
}
