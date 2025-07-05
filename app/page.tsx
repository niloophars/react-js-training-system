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
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [userRole, setUserRole] = useState("")

  const toggleToSignUp = () => {
  setIsSignUp(true)
  setEmail("")
  setPassword("")
 }

  const toggleToSignIn = () => {
  setIsSignUp(false)
  setEmail("")
  setPassword("")
 }

  //Sign-up handler
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/

  if (!passwordRegex.test(password)) {
    alert("Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.")
    return
  }
    if (userRole === "admin") {
      alert("Admins cannot sign up. Contact system administrator.")
      return
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/dashboard`, // redirect post-confirm
      },
    })

    if (error) {
      alert("Signup failed: " + error.message)
      return
    }

    if (!data.user) {
      alert("Signup initiated. Please check your email for confirmation.")
      return
    }

    // ➕ Insert into custom User table
    const { error: insertError } = await supabase.from('"User"').insert({
      name,
      email,
      role: userRole,
      status: "pending", // or "approved" if auto
      auth_user_uid: data.user.id,
      username: email.split("@")[0], // Simple username
    })

    if (insertError) {
      alert("User signed up but failed to save in DB: " + insertError.message)
      return
    }

    alert("Signup successful. Please verify your email before logging in.")
    setIsSignUp(false)
  }

  // 🔑 Sign-in handler
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      alert("Login failed: " + error.message)
      return
    }

    const supabaseUserId = data.user?.id

    const { data: userData, error: fetchError } = await supabase
      .from("User")
      .select("role, status")
      .eq("auth_user_id", supabaseUserId)
      .single()

    if (fetchError || !userData) {
      alert("User not found in the database.")
      return
    }

    if (userData.status === "pending") {
      alert("Your account is pending approval.")
      return
    }

    router.push(`/dashboard?role=${userData.role}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-sky-50 to-indigo-100 flex items-center justify-center p-4">
      {/* Logo */}
      <div className="absolute top-8 left-8">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg">
          <GraduationCap className="h-8 w-8 text-white" />
        </div>
      </div>

      {/* Form Container */}
      <div className="relative w-full max-w-2xl h-96 bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="relative w-full h-full flex">
          {/* Login Panel */}
          <div className={`absolute top-0 left-0 w-1/2 h-full p-8 transition-transform duration-700 z-20 ${isSignUp ? "-translate-x-full" : "translate-x-0"}`}>
            <div className="w-full max-w-xs mx-auto">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Sign in</h2>
              <form onSubmit={handleLogin} className="space-y-4">
                <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              
                <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-3 rounded-full shadow-lg">SIGN IN</Button>
              </form>
            </div>
          </div>

          {/* Signup Panel */}
          <div className={`absolute top-0 right-0 w-1/2 h-full p-8 transition-transform duration-700 z-20 ${isSignUp ? "translate-x-0" : "translate-x-full"}`}>
            <div className="w-full max-w-xs mx-auto">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Create Account</h2>
              <form onSubmit={handleSignup} className="space-y-4">
                <Input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
                <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
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
