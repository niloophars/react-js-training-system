'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

export default function EmailVerifiedPage() {
  const [message, setMessage] = useState('Verifying email...')

  useEffect(() => {
    const hash = window.location.hash
    const params = new URLSearchParams(hash.slice(1))
    const access_token = params.get('access_token')
    const refresh_token = params.get('refresh_token')

    if (!access_token || !refresh_token) {
      setMessage('Invalid or expired verification link.')
      return
    }

    const verify = async () => {
      const { data: sessionData, error: sessionError } = await supabase.auth.setSession({
        access_token,
        refresh_token,
      })

      if (sessionError || !sessionData?.session?.user) {
        console.error('Session error:', sessionError)
        setMessage('Failed to verify session. Please try again or contact support.')
        return
      }

      const user = sessionData.session.user
      console.log('✅ User session established:', user)

      setMessage(
        `✅ Hi ${user.user_metadata?.name || 'there'}, your email has been successfully verified.\n` +
        `Your account is pending admin approval. You’ll receive an email once approved.`
      )
    }

    verify()
  }, [])

  return (
    <div className="flex items-center justify-center min-h-screen p-6 bg-gray-50">
      <div className="text-center max-w-md bg-white rounded-lg p-6 shadow">
        <h1 className="text-xl font-semibold mb-4">Email Verification</h1>
        {message.split('\n').map((line, idx) => (
          <p key={idx} className="mb-2">{line}</p>
        ))}
        <p className="text-sm text-gray-500 mt-4">You may close this window or return later to log in.</p>
      </div>
    </div>
  )
}
