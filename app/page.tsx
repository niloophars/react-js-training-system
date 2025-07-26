"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabaseClient"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Users, BookOpen, GraduationCap } from "lucide-react"

export default function AuthPage() {
  const router = useRouter()

  const [isSignUp, setIsSignUp] = useState(false)

  // Sign In State
  const [signInEmail, setSignInEmail] = useState("")
  const [signInPassword, setSignInPassword] = useState("")

  // Sign Up State
  const [name, setName] = useState("")
  const [signUpEmail, setSignUpEmail] = useState("")
  const [signUpPassword, setSignUpPassword] = useState("")
  const [userRole, setUserRole] = useState("")

  const toggleToSignUp = () => {
    setIsSignUp(true)
    setSignInEmail("")
    setSignInPassword("")
  }

  const toggleToSignIn = () => {
    setIsSignUp(false)
    setSignUpEmail("")
    setSignUpPassword("")
    setName("")
    setUserRole("")
  }

  const handleSignup = async (e: React.FormEvent) => {
  e.preventDefault()

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/
  if (!passwordRegex.test(signUpPassword)) {
    alert("Password must include uppercase, lowercase, number, and special character.")
    return
  }

  if (userRole === "admin") {
    alert("Admins cannot sign up. Contact system administrator.")
    return
  }

 const res = await fetch("/api/check-email", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({ email: signUpEmail }),
})


 const data = await res.json()

if (data.exists_in_user) {
  if (data.status === "pending") {
    alert("This email is already registered and pending admin approval. Please wait for approval.")
  } else {
    alert("This email is already in use. Please log in instead.")
  }
  return
}

if (data.exists_in_auth && !data.exists_in_user) {
  alert("This email has already been used for signup but the user profile is missing or incomplete. Contact support.")
  return
}


  // ✅ Step 2: Sign up the user in Supabase Auth
  const { data: signUpData, error } = await supabase.auth.signUp({
    email: signUpEmail,
    password: signUpPassword,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/email-verified`,
      data: {
        name,
        role: userRole,
      },
    },
  })

  if (error) {
    alert("Signup failed: " + error.message)
    return
  }

  alert("Signup successful. Please check your email to verify before logging in.")
  setSignUpEmail("")
  setSignUpPassword("")
  setName("")
  setUserRole("")
  setIsSignUp(false)
}




  const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault()

  const { data, error } = await supabase.auth.signInWithPassword({
    email: signInEmail,
    password: signInPassword,
  })

  if (error) {
    alert("Login failed: " + error.message)
    return
  }

  const supabaseUserId = data.user?.id
  const { data: userData, error: fetchError } = await supabase
    .from("user")
    .select("role, status")
    .eq("auth_user_id", supabaseUserId)
    .maybeSingle()

  if (fetchError) {
    alert("Error fetching user: " + fetchError.message)
    return
  }

  if (!userData || userData.status === "pending") {
    alert("Your account is pending admin approval.")
    return
  }

  // ✅ Force re-fetch of server components and cookies
  router.refresh() 

  // ✅ Let Next.js re-evaluate /dashboard with the right cookies
  router.push("/dashboard")
}



  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-sky-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="absolute top-8 left-8">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg">
          <GraduationCap className="h-8 w-8 text-white" />
        </div>
      </div>

      <div className="relative w-full max-w-2xl h-96 bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="relative w-full h-full flex">
          {/* Sign In Panel */}
          <div className={`absolute top-0 left-0 w-1/2 h-full p-8 transition-transform duration-700 z-20 ${isSignUp ? "-translate-x-full" : "translate-x-0"}`}>
            <div className="w-full max-w-xs mx-auto">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Sign in</h2>
              <form onSubmit={handleLogin} className="space-y-4">
                <Input type="email" placeholder="Email" value={signInEmail} onChange={(e) => setSignInEmail(e.target.value)} required />
                <Input type="password" placeholder="Password" value={signInPassword} onChange={(e) => setSignInPassword(e.target.value)} required />
                <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-3 rounded-full shadow-lg">SIGN IN</Button>
              </form>
            </div>
          </div>

          {/* Sign Up Panel */}
          <div className={`absolute top-0 right-0 w-1/2 h-full p-8 transition-transform duration-700 z-20 ${isSignUp ? "translate-x-0" : "translate-x-full"}`}>
            <div className="w-full max-w-xs mx-auto">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Create Account</h2>
              <form onSubmit={handleSignup} className="space-y-4">
                <Input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
                <Input type="email" placeholder="Email" value={signUpEmail} onChange={(e) => setSignUpEmail(e.target.value)} required />
                <Input type="password" placeholder="Password" value={signUpPassword} onChange={(e) => setSignUpPassword(e.target.value)} required />
                <Select value={userRole} onValueChange={setUserRole} required>
                  <SelectTrigger className="bg-gray-200 rounded-lg h-12">
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="faculty"><Users className="h-4 w-4 mr-2" />Faculty</SelectItem>
                    <SelectItem value="trainee"><BookOpen className="h-4 w-4 mr-2" />Trainee</SelectItem>
                  </SelectContent>
                </Select>
                <Button type="submit" className="w-full bg-gradient-to-r from-sky-600 to-blue-700 text-white py-3 rounded-full shadow-lg">SIGN UP</Button>
              </form>
            </div>
          </div>

          {/* Overlay - Hello */}
          <div className={`absolute top-0 right-0 w-1/2 h-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-8 z-30 flex flex-col justify-center items-center transition-transform duration-700 ${isSignUp ? "translate-x-full" : "translate-x-0"}`}>
            <h2 className="text-3xl font-bold mb-4">Hello, Friend!</h2>
            <p className="text-sm opacity-90 mb-6">Enter your personal details and start your journey with us</p>
            <Button onClick={toggleToSignUp} variant="outline" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-2 rounded-full font-semibold transition-all duration-300">SIGN UP</Button>
          </div>

          {/* Overlay - Welcome Back */}
          <div className={`absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-sky-500 to-blue-500 text-white p-8 z-30 flex flex-col justify-center items-center transition-transform duration-700 ${isSignUp ? "translate-x-0" : "-translate-x-full"}`}>
            <h2 className="text-3xl font-bold mb-4">Welcome Back!</h2>
            <p className="text-sm opacity-90 mb-6">To keep connected, please login with your personal info</p>
            <Button onClick={toggleToSignIn} variant="outline" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-sky-600 px-8 py-2 rounded-full font-semibold transition-all duration-300">SIGN IN</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
