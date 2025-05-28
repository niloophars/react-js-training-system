"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Users, BookOpen, GraduationCap } from "lucide-react"
import { useRouter } from "next/navigation"

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false)
  const [userRole, setUserRole] = useState("")
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (userRole) {
      router.push(`/dashboard?role=${userRole}`)
    }
  }

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault()
    if (userRole) {
      router.push(`/dashboard?role=${userRole}`)
    }
  }

  const toggleToSignUp = () => {
    setIsSignUp(true)
  }

  const toggleToSignIn = () => {
    setIsSignUp(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-sky-50 to-indigo-100 flex items-center justify-center p-4">
      {/* Training Management Logo */}
      <div className="flex items-center justify-center mb-8 absolute top-8 left-8">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg">
          <GraduationCap className="h-8 w-8 text-white" />
        </div>
      </div>

      {/* Main Container */}
      <div className="relative w-full max-w-2xl h-96 bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Container for sliding panels */}
        <div className="relative w-full h-full flex">
          {/* Sign In Form Panel */}
          <div
            className={`absolute top-0 left-0 w-1/2 h-full bg-white flex flex-col justify-center p-8 transition-transform duration-700 ease-in-out z-20 ${
              isSignUp ? "-translate-x-full" : "translate-x-0"
            }`}
          >
            <div className="w-full max-w-xs mx-auto">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Sign in</h2>
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <Input
                    type="email"
                    placeholder="Email"
                    className="bg-gray-200 border-0 rounded-lg h-12 placeholder:text-gray-600"
                    required
                  />
                </div>
                <div>
                  <Input
                    type="password"
                    placeholder="Password"
                    className="bg-gray-200 border-0 rounded-lg h-12 placeholder:text-gray-600"
                    required
                  />
                </div>
                <div>
                  <Select value={userRole} onValueChange={setUserRole} required>
                    <SelectTrigger className="bg-gray-200 border-0 rounded-lg h-12">
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="faculty">
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-2" />
                          Faculty
                        </div>
                      </SelectItem>
                      <SelectItem value="trainee">
                        <div className="flex items-center">
                          <BookOpen className="h-4 w-4 mr-2" />
                          Trainee
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="text-center py-2">
                  <a href="#" className="text-sm text-gray-600 hover:text-gray-800">
                    Forgot your password?
                  </a>
                </div>
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-semibold py-3 rounded-full transition-all duration-300 shadow-lg"
                >
                  SIGN IN
                </Button>
              </form>
            </div>
          </div>

          {/* Create Account Form Panel */}
          <div
            className={`absolute top-0 right-0 w-1/2 h-full bg-white flex flex-col justify-center p-8 transition-transform duration-700 ease-in-out z-20 ${
              isSignUp ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="w-full max-w-xs mx-auto">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Create Account</h2>
              <form onSubmit={handleSignup} className="space-y-4">
                <div>
                  <Input
                    type="text"
                    placeholder="Name"
                    className="bg-gray-200 border-0 rounded-lg h-12 placeholder:text-gray-600"
                    required
                  />
                </div>
                <div>
                  <Input
                    type="email"
                    placeholder="Email"
                    className="bg-gray-200 border-0 rounded-lg h-12 placeholder:text-gray-600"
                    required
                  />
                </div>
                <div>
                  <Input
                    type="password"
                    placeholder="Password"
                    className="bg-gray-200 border-0 rounded-lg h-12 placeholder:text-gray-600"
                    required
                  />
                </div>
                <div>
                  <Select value={userRole} onValueChange={setUserRole} required>
                    <SelectTrigger className="bg-gray-200 border-0 rounded-lg h-12">
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="faculty">
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-2" />
                          Faculty
                        </div>
                      </SelectItem>
                      <SelectItem value="trainee">
                        <div className="flex items-center">
                          <BookOpen className="h-4 w-4 mr-2" />
                          Trainee
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="pt-2">
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-sky-600 to-blue-700 hover:from-sky-700 hover:to-blue-800 text-white font-semibold py-3 rounded-full transition-all duration-300 shadow-lg"
                  >
                    SIGN UP
                  </Button>
                </div>
              </form>
            </div>
          </div>

          {/* Blue Overlay Panel - "Hello, Friend!" */}
          <div
            className={`absolute top-0 right-0 w-1/2 h-full bg-gradient-to-r from-blue-500 to-indigo-600 flex flex-col items-center justify-center text-white p-8 transition-transform duration-700 ease-in-out z-30 ${
              isSignUp ? "translate-x-full" : "translate-x-0"
            }`}
          >
            <h2 className="text-3xl font-bold mb-4">Hello, Friend!</h2>
            <p className="text-center mb-6 opacity-90 leading-relaxed text-sm">
              Enter your personal details and start journey with us
            </p>
            <Button
              onClick={toggleToSignUp}
              variant="outline"
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-2 rounded-full font-semibold transition-all duration-300"
            >
              SIGN UP
            </Button>
          </div>

          {/* Blue Overlay Panel - "Welcome Back!" */}
          <div
            className={`absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-sky-500 to-blue-500 flex flex-col items-center justify-center text-white p-8 transition-transform duration-700 ease-in-out z-30 ${
              isSignUp ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <h2 className="text-3xl font-bold mb-4">Welcome Back!</h2>
            <p className="text-center mb-6 opacity-90 leading-relaxed text-sm">
              To keep connected with us please login with your personal info
            </p>
            <Button
              onClick={toggleToSignIn}
              variant="outline"
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-sky-600 px-8 py-2 rounded-full font-semibold transition-all duration-300"
            >
              SIGN IN
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
