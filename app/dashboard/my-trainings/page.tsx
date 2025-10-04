"use client"

import { useState, useEffect } from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus } from "lucide-react"
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
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { BookOpen, Edit, Trash2 } from "lucide-react"
import CreateTrainingForm from "@/components/ui/create-training"
import { supabase } from "@/lib/supabaseClient"
import { format } from "date-fns"

export default function FacultyTrainingPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [isCreateProgramDialogOpen, setIsCreateProgramDialogOpen] = useState(false)
  const [selectedInstructor, setSelectedInstructor] = useState<string>("")
  const [userId, setUserId] = useState<string | null>(null)
  const [userRole, setUserRole] = useState<string | null>(null)
  const [facultyName, setInstructorName] = useState<string>("")

const [startDate, setStartDate] = useState<Date | null>(null)
    const [endDate, setEndDate] = useState<Date | null>(null)

  

  const facultyList = [
    { user_id: "1", name: "Dr. Sarah Smith" },
    { user_id: "2", name: "Prof. John Johnson" },
  ]

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        const { data, error } = await supabase
          .from("user")
          .select("user_id, name, role")
          .eq("auth_user_id", user.id)
          .single()

        if (!error && data) {
          setUserId(data.user_id)
          setInstructorName(data.name)
          setUserRole(data.role)
        }
      }
    }
    fetchUser()
  }, [])

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
    startDate: "2025-01-15",
    endDate: "2025-04-15"
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
    startDate: "2025-02-01",
    endDate: "2025-03-31"
  },
  {
    id: "3",
    title: "Node.js Backend Development",
    description: "Server-side development with Node.js and Express",
    instructor: "Dr. Michael Wilson",
    duration: "10 weeks",
    enrolledStudents: 18,
    completionRate: 78,
    status: "completed",
    startDate: "2024-11-01",
    endDate: "2025-01-10"
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
    startDate: "2024-09-15",
    endDate: "2024-10-27"
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
    startDate: null,
    endDate: null
  }
]


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
        return "bg-green-100 text-green-700"
      case "completed":
        return "bg-blue-100 text-blue-700"
      case "draft":
        return "bg-yellow-100 text-yellow-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "N/A"
    return format(new Date(dateString), "MMM d, yyyy")
  }

  const handleCreateProgram = (data: any) => {
    console.log("Creating program with data:", data)
    setIsCreateProgramDialogOpen(false)
  }

  if (!userRole) {
    return <div className="p-6">Loading your trainings...</div>
  }

  return (
    <SidebarProvider>
      <AppSidebar userRole={userRole} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>My Trainings</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

       <div className="px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
       <div className="flex items-start justify-between flex-wrap mb-5">
            <div className="flex-grow">
              <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                My Trainings
              </h2>
              <p className="text-muted-foreground mt-2">Manage your ongoing and completed training programs</p>
            </div>

            {userRole === "faculty" && facultyName && (
            <Dialog open={isCreateProgramDialogOpen} onOpenChange={setIsCreateProgramDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r  from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg">
                  <Plus className="h-4 w-4 mr-2" />
                  Create New Program
                </Button>
              </DialogTrigger>
              

                <CreateTrainingForm
                    userRole={userRole}
                    isOpen={isCreateProgramDialogOpen}
                    onClose={() => setIsCreateProgramDialogOpen(false)}
                    handleCreateProgram={handleCreateProgram}
                    facultyName={facultyName}    // only this is needed
                    startDate={startDate}
                    setStartDate={setStartDate}
                    endDate={endDate}
                    setEndDate={setEndDate}
                  />

            
            </Dialog>
          )}



          </div>

          {/* Programs Table */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpen className="h-5 w-5 mr-2" />
                My Training Programs
              </CardTitle>
              <CardDescription>Manage your assigned training programs and track progress</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1">
                  <Input
                    placeholder="Search programs by title or instructor..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
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
                      <TableHead>Title</TableHead>
                      <TableHead>Instructor</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Start Date</TableHead>
                      <TableHead>End Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPrograms.map((program) => (
                      <TableRow key={program.id}>
                        <TableCell>
                          <div className="font-medium">{program.title}</div>
                          <div className="text-sm text-gray-500">{program.description}</div>
                        </TableCell>
                        <TableCell>{program.instructor}</TableCell>
                        <TableCell>
                          <Badge className={getStatusBadgeColor(program.status)}>
                            {program.status.charAt(0).toUpperCase() + program.status.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell>{program.duration}</TableCell>
                        <TableCell>{formatDate(program.startDate)}</TableCell>
                        <TableCell>{formatDate(program.endDate)}</TableCell>
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
