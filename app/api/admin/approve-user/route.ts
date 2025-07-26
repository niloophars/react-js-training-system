import { createSupabaseServerClient } from '@/lib/supabaseServer'

export async function POST(req: Request) {
  try {
    const { userId } = await req.json()

    const supabase = await createSupabaseServerClient() // ✅ await here!

    const { data, error } = await supabase
      .from('user')
      .update({ status: 'approved' })
      .eq('user_id', userId)
      .single()

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 400 })
    }

    return new Response(JSON.stringify({ message: 'User approved successfully.' }), { status: 200 })
  } catch (error) {
    console.error('Error approving user:', error)
    const message = error instanceof Error ? error.message : 'An unexpected error occurred.'
    return new Response(JSON.stringify({ error: message }), { status: 500 })
  }
}
