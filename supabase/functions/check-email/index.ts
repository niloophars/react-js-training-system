import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders })
  }

  try {
    console.log("🔧 check-email function invoked")
    const { email } = await req.json()

    const supabaseUrl = Deno.env.get("SUPABASE_URL")
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")

    if (!supabaseUrl || !serviceRoleKey) {
      console.error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in env.")
      return new Response(
        JSON.stringify({ error: "Server configuration error." }),
        { status: 500, headers: corsHeaders }
      )
    }

    const supabase = createClient(supabaseUrl, serviceRoleKey)

    // 1. Check custom `user` table
    const { data: userRow, error: userError } = await supabase
      .from("user")
      .select("status")
      .eq("email", email.toLowerCase())
      .maybeSingle()

    if (userError) {
      return new Response(JSON.stringify({ error: userError.message }), {
        status: 500,
        headers: corsHeaders,
      })
    }

    const existsInUserTable = !!userRow
    const userStatus = userRow?.status || null

    // 2. Check Supabase Auth
    const adminRes = await fetch(
      `${supabaseUrl}/auth/v1/admin/users?email=${encodeURIComponent(email)}`,
      {
        method: "GET",
        headers: {
          "apikey": serviceRoleKey,
          "Authorization": `Bearer ${serviceRoleKey}`,
        },
      }
    )

    const raw = await adminRes.text()
    console.log("🔍 RAW admin API response:", raw)

    if (!adminRes.ok) {
      return new Response(JSON.stringify({ error: "Admin API error", detail: raw }), {
        status: 500,
        headers: corsHeaders,
      })
    }

    let userData
    try {
      userData = JSON.parse(raw)
    } catch (err) {
      console.error("❌ Failed to parse admin response:", err)
      return new Response(JSON.stringify({ error: "Invalid admin API response" }), {
        status: 500,
        headers: corsHeaders,
      })
    }

    const users = Array.isArray(userData?.users) ? userData.users : []
    const authUser = users.find((u: { email?: string }) => u.email?.toLowerCase() === email.toLowerCase()) || null


    const existsInAuth = !!authUser
    const confirmed = authUser?.confirmed_at || null

    // ✅ Return detailed results
    return new Response(
      JSON.stringify({
        exists_in_auth: existsInAuth,
        exists_in_user: existsInUserTable,
        status: userStatus,
        confirmed,
      }),
      { status: 200, headers: corsHeaders }
    )

  } catch (err) {
    console.error("Unhandled error in check-email function:", err)
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: corsHeaders }
    )
  }
}, {
  port: 8000,
  onListen: () => console.log("✅ check-email function is running on port 8000"),
})

