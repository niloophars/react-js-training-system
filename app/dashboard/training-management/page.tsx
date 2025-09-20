"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { supabase } from "@/lib/supabaseClient"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { BookOpen, Plus, Edit, Trash2, Search, Users, Clock, TrendingUp } from "lucide-react"

export default function TrainingManagementPage() {
  const [instructorName, setInstructorName] = useState<string | null>(null)
  const [userRole, setUserRole] = useState<string | null>(null)
  const [facultyList, setFacultyList] = useState<{ user_id: string; name: string }[]>([])
  const [selectedInstructor, setSelectedInstructor] = useState<string>("")
  const [startDate, setStartDate] = useState<string>("")
  const [endDate, setEndDate] = useState<string>("")




      const [userId, setUserId] = useState<string | null>(null)

    useEffect(() => {
      const fetchUser = async () => {
        const { data: { user } } = await supabase.auth.getUser()
        if (user) {
          const { data, error } = await supabase
          .from("user")
          .select("user_id, name, role")
          .eq("auth_user_id", user.id) // user.id is the Supabase Auth UUID
          .single()


          if (!error && data) {
            setUserId(data.user_id)              // <-- store user ID
            setInstructorName(data.name)    // for display if faculty
            setUserRole(data.role)
          }
        }
      }
      fetchUser()
    }, [])

    useEffect(() => {
    if (userRole === "admin") {
      const fetchFaculty = async () => {
        const { data, error } = await supabase
          .from("user")
          .select("user_id, name")
          .eq("role", "faculty")

        if (!error && data) {
          setFacultyList(data)
        }
        else {
        console.error("Error fetching faculty:", error)
      }
      }
      fetchFaculty()
    }
  }, [userRole])


  const [isCreateProgramDialogOpen, setIsCreateProgramDialogOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  const trainingPrograms = [
    {
      id: "1",
      title: "React Development Bootcamp",
      description: "Comprehensive React.js training program",
      instructor: "Dr. Sarah Smith",
      duration: "12 weeks",
      enrolledStudents: 24,
      completionRate: 87,
      status: "active",
      startDate: "2024-01-15",
      endDate: "2024-04-15",
      materials: 18,
    },
    {
      id: "2",
      title: "JavaScript Fundamentals",
      description: "Core JavaScript concepts and modern ES6+ features",
      instructor: "Prof. John Johnson",
      duration: "8 weeks",
      enrolledStudents: 32,
      completionRate: 92,
      status: "active",
      startDate: "2024-02-01",
      endDate: "2024-03-26",
      materials: 15,
    },
    {
      id: "3",
      title: "Node.js Backend Development",
      description: "Server-side development with Node.js and Express",
      instructor: "Dr. Michael Wilson",
      duration: "10 weeks",
      enrolledStudents: 18,
      completionRate: 78,
      status: "active",
      startDate: "2024-03-01",
      endDate: "2024-05-10",
      materials: 22,
    },
    {
      id: "4",
      title: "Database Design & SQL",
      description: "Relational database design and SQL programming",
      instructor: "Prof. Lisa Davis",
      duration: "6 weeks",
      enrolledStudents: 28,
      completionRate: 95,
      status: "completed",
      startDate: "2024-01-01",
      endDate: "2024-02-15",
      materials: 12,
    },
    {
      id: "5",
      title: "Python for Data Science",
      description: "Python programming for data analysis and visualization",
      instructor: "Dr. Robert Chen",
      duration: "14 weeks",
      enrolledStudents: 0,
      completionRate: 0,
      status: "draft",
      startDate: "2024-06-01",
      endDate: "2024-09-15",
      materials: 8,
    },
  ]

  const handleCreateProgram = (e: React.FormEvent) => {
  e.preventDefault()

  if (new Date(endDate) < new Date(startDate)) {
    alert("End date cannot be earlier than start date")
    return
  }

  let instructorToUse = ""

  if (userRole === "admin") {
    if (!selectedInstructor) {
      alert("Please select a faculty")
      return
    }
    instructorToUse = selectedInstructor
  } else if (userRole === "faculty") {
    if (!instructorName) {
      alert("Faculty name not loaded. Please try again.")
      return
    }
    instructorToUse = instructorName
  } else {
    alert("You do not have permission to create a program")
    return
  }

  // Continue program creation
  console.log("Creating program with faculty:", instructorToUse)

  setIsCreateProgramDialogOpen(false)
  alert("Training program created successfully!")
}





  const filteredPrograms = trainingPrograms.filter((program) => {
    const matchesSearch =
      program.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      program.instructor.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "all" || program.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-700 hover:bg-green-100"
      case "completed":
        return "bg-blue-100 text-blue-700 hover:bg-blue-100"
      case "draft":
        return "bg-yellow-100 text-yellow-700 hover:bg-yellow-100"
      default:
        return "bg-gray-100 text-gray-700 hover:bg-gray-100"
    }
  }

  const stats = [
    {
      title: "Total Programs",
      value: trainingPrograms.length.toString(),
      description: "All training programs",
      icon: BookOpen,
    },
    {
      title: "Active Programs",
      value: trainingPrograms.filter((p) => p.status === "active").length.toString(),
      description: "Currently running",
      icon: TrendingUp,
    },
    {
      title: "Total Enrollments",
      value: trainingPrograms.reduce((sum, p) => sum + p.enrolledStudents, 0).toString(),
      description: "Across all programs",
      icon: Users,
    },
    {
      title: "Avg Completion Rate",
      value: `${Math.round(trainingPrograms.filter((p) => p.status !== "draft").reduce((sum, p) => sum + p.completionRate, 0) / trainingPrograms.filter((p) => p.status !== "draft").length)}%`,
      description: "Overall performance",
      icon: Clock,
    },
  ]
  console.log("userRole at render:", userRole)
  if (userRole === null) {
    return null // or a loader
  }
  return (
    <SidebarProvider>
      <AppSidebar userRole="admin" />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Training Management</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-6 p-6 pt-0">
          {/* Header Section */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Training Management
              </h2>
              <p className="text-muted-foreground mt-2">Manage all training programs, courses, and curricula</p>
            </div>
           

            {(userRole === "admin" || userRole === "faculty") && (
            <Dialog open={isCreateProgramDialogOpen} onOpenChange={setIsCreateProgramDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg">
                  <Plus className="h-4 w-4 mr-2" />
                  Create New Program
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Create New Training Program
                  </DialogTitle>
                  <DialogDescription>
                    Set up a new training program with curriculum, timeline, and faculty assignment.
                  </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleCreateProgram} className="space-y-6 mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="title" className="text-sm font-medium">
                        Program Title
                      </Label>
                      <Input
                        id="title"
                        placeholder="Enter program title"
                        className="h-11 border-2 focus:border-purple-500 transition-colors"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="duration" className="text-sm font-medium">
                        Duration
                      </Label>
                      <Input
                        id="duration"
                        placeholder="e.g., 12 weeks"
                        className="h-11 border-2 focus:border-purple-500 transition-colors"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description" className="text-sm font-medium">
                      Description
                    </Label>
                    <Textarea
                      id="description"
                      placeholder="Describe the training program objectives and content"
                      rows={3}
                      className="border-2 focus:border-purple-500 transition-colors resize-none"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="instructor" className="text-sm font-medium">
                        Faculty
                      </Label>
                    {userRole === "admin" ? (
                    <Select
                      required
                      onValueChange={setSelectedInstructor}
                      value={selectedInstructor}
                    >
                      <SelectTrigger className="h-11 border-2 focus:border-purple-500">
                        <SelectValue placeholder="Select Faculty" />
                      </SelectTrigger>
                      <SelectContent>
                        {facultyList.map((faculty) => (
                        <SelectItem key={faculty.user_id} value={faculty.user_id}>
                        {faculty.name}
                      </SelectItem>

                      ))}
                      </SelectContent>
                    </Select>
                  ) : userRole === "faculty" ? (
                    <Input
                      id="instructor"
                      value={instructorName ?? "Loading..."}
                      readOnly
                      className="h-11 border-2 focus:border-purple-500 transition-colors bg-gray-100 cursor-not-allowed"
                    />
                  ): null }

                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category" className="text-sm font-medium">
                        Category
                      </Label>
                      <Select required>
                        <SelectTrigger className="h-11 border-2 focus:border-purple-500">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="programming">Programming</SelectItem>
                          <SelectItem value="data-science">Data Science</SelectItem>
                          <SelectItem value="web-development">Web Development</SelectItem>
                          <SelectItem value="database">Database</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="startDate" className="text-sm font-medium">
                        Start Date
                      </Label>
                      <Input
                        id="startDate"
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        min={new Date().toISOString().split("T")[0]} // 👈 Sets today as the minimum
                        className="h-11 border-2 focus:border-purple-500 transition-colors"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="endDate" className="text-sm font-medium">
                        End Date
                      </Label>
                      <Input
                        id="endDate"
                        type="date"
                        value={endDate}
                        min={startDate} // this prevents selecting earlier dates
                        onChange={(e) => setEndDate(e.target.value)}
                        className="h-11 border-2 focus:border-purple-500 transition-colors"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex justify-end space-x-4 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      className="border-2 hover:bg-gray-50"
                      onClick={() => setIsCreateProgramDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={new Date(endDate) < new Date(startDate)}
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Create Program
                    </Button>

                  </div>
                </form>
              </DialogContent>
            </Dialog>
            )}
          </div>

          {/* Statistics Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <Card key={stat.title} className="bg-gradient-to-br from-white to-purple-50 border-purple-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-700">{stat.title}</CardTitle>
                  <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500">
                    <stat.icon className="h-4 w-4 text-white" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <p className="text-xs text-gray-600">{stat.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Programs Table */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpen className="h-5 w-5 mr-2" />
                Training Programs
              </CardTitle>
              <CardDescription>Manage all training programs and their details</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search programs by title or instructor..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Program</TableHead>
                      <TableHead>Faculty</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Enrolled</TableHead>
                      <TableHead>Completion</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPrograms.map((program) => (
                      <TableRow key={program.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{program.title}</div>
                            <div className="text-sm text-gray-500">{program.description}</div>
                          </div>
                        </TableCell>
                        <TableCell>{program.instructor}</TableCell>
                        <TableCell>{program.duration}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Users className="h-4 w-4 mr-1 text-gray-400" />
                            {program.enrolledStudents}
                          </div>
                        </TableCell>
                        <TableCell>{program.status !== "draft" ? `${program.completionRate}%` : "N/A"}</TableCell>
                        <TableCell>
                          <Badge className={getStatusBadgeColor(program.status)}>
                            {program.status.charAt(0).toUpperCase() + program.status.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0 hover:bg-blue-50">
                              <Edit className="h-4 w-4 text-blue-600" />
                            </Button>
                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0 hover:bg-red-50">
                              <Trash2 className="h-4 w-4 text-red-600" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
