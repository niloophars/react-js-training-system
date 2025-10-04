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
  import CreateTrainingForm from "@/components/ui/create-training"

  export default function TrainingManagementPage() {
    const [instructorName, setInstructorName] = useState<string | null>(null)
    const [userRole, setUserRole] = useState<string | null>(null)
    const [facultyList, setFacultyList] = useState<{ user_id: string; name: string }[]>([])
    const [selectedInstructor, setSelectedInstructor] = useState<string>("")
    const [startDate, setStartDate] = useState<Date | null>(null)
    const [endDate, setEndDate] = useState<Date | null>(null)


    const [userId, setUserId] = useState<number | null>(null)
    const [isCreateProgramDialogOpen, setIsCreateProgramDialogOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState("")
    const [filterStatus, setFilterStatus] = useState("all")

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

    useEffect(() => {
      if (userRole === "admin") {
        const fetchFaculty = async () => {
          const { data, error } = await supabase
            .from("user")
            .select("user_id, name")
            .eq("role", "faculty")

          if (!error && data) {
            setFacultyList(data)
          } else {
            console.error("Error fetching faculty:", error)
          }
        }
        fetchFaculty()
      }
    }, [userRole])

    const trainingPrograms = [
      {
        id: "1",
        title: "React Development Bootcamp",
        description: "Comprehensive React.js training program",
        instructor: "Dr. Sarah Smith",
        instructor_id: 1,
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
        instructor_id: 2,
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
        instructor_id: 3,
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
        instructor_id: 4,
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
        instructor_id: 5,
        duration: "14 weeks",
        enrolledStudents: 0,
        completionRate: 0,
        status: "draft",
        startDate: "2024-06-01",
        endDate: "2024-09-15",
        materials: 8,
      },
    ]

      const filteredPrograms =
      userRole === null || userId === null
        ? []
        : trainingPrograms.filter((program) => {
            const matchesSearch =
              program.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
              program.instructor.toLowerCase().includes(searchTerm.toLowerCase())

            const matchesStatus = filterStatus === "all" || program.status === filterStatus
            const matchesFaculty = userRole === "faculty" ? program.instructor_id === userId : true

            return matchesSearch && matchesStatus && matchesFaculty
          })


    const handleCreateProgram = (e: React.FormEvent) => {
  e.preventDefault()

  if (!startDate || !endDate) {
    alert("Please select both start and end dates")
    return
  }

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
    // find instructor name from selectedInstructor id
    const faculty = facultyList.find(f => f.user_id === selectedInstructor)
    instructorToUse = faculty ? faculty.name : ""
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

  console.log("Creating program with faculty:", instructorToUse)

  setIsCreateProgramDialogOpen(false)
  alert("Training program created successfully!")
}


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

      if (userRole === null || userId === null) {
      return null
    }
  console.log('User Role:', userRole, 'Instructor Name:', instructorName)

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

    
 <div className="px-4 sm:px-6 lg:px-8">
  <div className="flex items-start justify-between flex-wrap mb-5">
    <div className="flex-grow">
      <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        Manage Training
      </h2>
      <p className=" text-muted-foreground mt-2">
        Manage all training programs, courses, and curricula
      </p>
    </div>

    {userRole === "admin" && instructorName && (
      <Dialog open={isCreateProgramDialogOpen} onOpenChange={setIsCreateProgramDialogOpen}>
        <DialogTrigger asChild>
          <Button className="bg-gradient-to-r  from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg">
            <Plus className="h-4 w-4 mr-2 " />
            Create New Program
          </Button>
        </DialogTrigger>

        <CreateTrainingForm
          userRole={userRole}
          isOpen={isCreateProgramDialogOpen}
          onClose={() => setIsCreateProgramDialogOpen(false)}
          handleCreateProgram={handleCreateProgram}
          facultyList={facultyList}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          selectedInstructor={selectedInstructor} // Pass the selected instructor
  setSelectedInstructor={setSelectedInstructor}
        />
      </Dialog>
    )}
  </div>




            {/* Programs Table */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center ">
                  <BookOpen className="h-5 w-5 mr-2" />
                  Training Programs
                </CardTitle>
                <CardDescription>Manage all training programs and track progress</CardDescription>
              </CardHeader>
                        <CardContent>
                <div className="flex flex-col md:flex-row gap-4 mb-6 ">
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

                <div className="rounded-md border ">
            

            <Table >
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Instructor</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Start Date</TableHead>
                  <TableHead>End Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPrograms.map((program) => (
                  <TableRow key={program.id}>
                    <TableCell>{program.title}</TableCell>
                    <TableCell>{program.instructor}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getStatusBadgeColor(program.status)}>
                        {program.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{program.duration}</TableCell>
                    <TableCell>{program.startDate}</TableCell>
                    <TableCell>{program.endDate}</TableCell>
                    <TableCell className="flex gap-2">
                        <div className="flex justify-end space-x-2 ">
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