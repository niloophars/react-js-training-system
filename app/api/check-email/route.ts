import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()
    console.log("📩 Email received in API route:", email)

    const edgeFunctionUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/check-email`
    console.log("🌐 Calling Edge Function URL:", edgeFunctionUrl)

    const response = await fetch(edgeFunctionUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
      },
      body: JSON.stringify({ email }),
    })

    console.log("📡 Edge Function returned status:", response.status)

    let data
    try {
      data = await response.json()
    } catch (jsonErr) {
      const text = await response.text()
      console.error("❌ Failed to parse JSON:", text)
      return NextResponse.json({ error: 'Invalid response from Edge Function' }, { status: 500 })
    }

    console.log("✅ Edge Function returned JSON:", data)
    return NextResponse.json(data)

  } catch (err) {
    console.error("❌ API route exception:", err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
