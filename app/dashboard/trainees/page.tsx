"use client"

import { useState } from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Users, Search, UserCheck, UserX, TrendingUp, Award, MessageSquare, Eye } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function TraineesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterCourse, setFilterCourse] = useState("all")

  const trainees = [
    {
      id: "1",
      name: "Alice Johnson",
      email: "alice.johnson@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
      enrolledCourses: ["React Fundamentals", "JavaScript Advanced"],
      currentCourse: "React Fundamentals",
      progress: 85,
      status: "active",
      lastActivity: "2024-12-01",
      joinDate: "2024-01-15",
      completedAssignments: 12,
      totalAssignments: 15,
      averageScore: 92,
      attendanceRate: 95,
    },
    {
      id: "2",
      name: "Bob Smith",
      email: "bob.smith@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
      enrolledCourses: ["JavaScript Advanced", "Node.js Backend"],
      currentCourse: "JavaScript Advanced",
      progress: 68,
      status: "active",
      lastActivity: "2024-11-30",
      joinDate: "2024-02-01",
      completedAssignments: 8,
      totalAssignments: 12,
      averageScore: 78,
      attendanceRate: 88,
    },
    {
      id: "3",
      name: "Carol Davis",
      email: "carol.davis@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
      enrolledCourses: ["Database Design"],
      currentCourse: "Database Design",
      progress: 95,
      status: "active",
      lastActivity: "2024-12-01",
      joinDate: "2024-01-20",
      completedAssignments: 10,
      totalAssignments: 10,
      averageScore: 96,
      attendanceRate: 100,
    },
    {
      id: "4",
      name: "David Wilson",
      email: "david.wilson@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
      enrolledCourses: ["React Fundamentals"],
      currentCourse: "React Fundamentals",
      progress: 32,
      status: "inactive",
      lastActivity: "2024-11-15",
      joinDate: "2024-03-01",
      completedAssignments: 4,
      totalAssignments: 15,
      averageScore: 65,
      attendanceRate: 60,
    },
  ]

  const courses = ["React Fundamentals", "JavaScript Advanced", "Node.js Backend", "Database Design"]

  const filteredTrainees = trainees.filter((trainee) => {
    const matchesSearch =
      trainee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trainee.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "all" || trainee.status === filterStatus
    const matchesCourse = filterCourse === "all" || trainee.enrolledCourses.includes(filterCourse)
    return matchesSearch && matchesStatus && matchesCourse
  })

  const getStatusBadgeColor = (status: string) => {
    return status === "active"
      ? "bg-green-100 text-green-700 hover:bg-green-100"
      : "bg-red-100 text-red-700 hover:bg-red-100"
  }

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return "bg-green-500"
    if (progress >= 60) return "bg-yellow-500"
    return "bg-red-500"
  }

  const stats = [
    {
      title: "My Trainees",
      value: trainees.length.toString(),
      description: "Students in my courses",
      icon: Users,
    },
    {
      title: "Active Students",
      value: trainees.filter((t) => t.status === "active").length.toString(),
      description: "Currently enrolled",
      icon: UserCheck,
    },
    {
      title: "Avg Progress",
      value: `${Math.round(trainees.reduce((sum, t) => sum + t.progress, 0) / trainees.length)}%`,
      description: "Course completion",
      icon: TrendingUp,
    },
    {
      title: "Avg Score",
      value: `${Math.round(trainees.reduce((sum, t) => sum + t.averageScore, 0) / trainees.length)}%`,
      description: "Assignment scores",
      icon: Award,
    },
  ]

  return (
    <SidebarProvider>
      <AppSidebar userRole="faculty" />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/dashboard?role=faculty">Dashboard</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>My Trainees</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-6 p-6 pt-0">
          {/* Header Section */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                My Trainees
              </h2>
              <p className="text-muted-foreground mt-2">Monitor your students' progress and performance</p>
            </div>
          </div>

          {/* Statistics Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <Card key={stat.title} className="bg-gradient-to-br from-white to-blue-50 border-blue-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-700">{stat.title}</CardTitle>
                  <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-500">
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

          {/* Trainees Table */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 mr-2" />
                Student Directory
              </CardTitle>
              <CardDescription>View and manage your students' learning journey</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search students by name or email..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-full md:w-32">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filterCourse} onValueChange={setFilterCourse}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="Course" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Courses</SelectItem>
                    {courses.map((course) => (
                      <SelectItem key={course} value={course}>
                        {course}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student</TableHead>
                      <TableHead>Current Course</TableHead>
                      <TableHead>Progress</TableHead>
                      <TableHead>Assignments</TableHead>
                      <TableHead>Avg Score</TableHead>
                      <TableHead>Attendance</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTrainees.map((trainee) => (
                      <TableRow key={trainee.id}>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={trainee.avatar || "/placeholder.svg"} alt={trainee.name} />
                              <AvatarFallback>
                                {trainee.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{trainee.name}</div>
                              <div className="text-sm text-gray-500">{trainee.email}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium text-sm">{trainee.currentCourse}</div>
                            <div className="text-xs text-gray-500">{trainee.enrolledCourses.length} total courses</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span>Progress</span>
                              <span>{trainee.progress}%</span>
                            </div>
                            <Progress value={trainee.progress} className="h-2" />
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-center">
                            <div className="font-medium">
                              {trainee.completedAssignments}/{trainee.totalAssignments}
                            </div>
                            <div className="text-xs text-gray-500">completed</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={`${
                              trainee.averageScore >= 80
                                ? "bg-green-50 text-green-700"
                                : trainee.averageScore >= 70
                                  ? "bg-yellow-50 text-yellow-700"
                                  : "bg-red-50 text-red-700"
                            }`}
                          >
                            {trainee.averageScore}%
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <div
                              className={`w-2 h-2 rounded-full ${
                                trainee.attendanceRate >= 90
                                  ? "bg-green-500"
                                  : trainee.attendanceRate >= 75
                                    ? "bg-yellow-500"
                                    : "bg-red-500"
                              }`}
                            ></div>
                            <span className="text-sm">{trainee.attendanceRate}%</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusBadgeColor(trainee.status)}>
                            {trainee.status === "active" ? (
                              <>
                                <UserCheck className="h-3 w-3 mr-1" />
                                Active
                              </>
                            ) : (
                              <>
                                <UserX className="h-3 w-3 mr-1" />
                                Inactive
                              </>
                            )}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button size="sm" variant="ghost" className="h-8 w-8 p-0 hover:bg-blue-50">
                                  <Eye className="h-4 w-4 text-blue-600" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-2xl">
                                <DialogHeader>
                                  <DialogTitle>Student Details - {trainee.name}</DialogTitle>
                                  <DialogDescription>
                                    Detailed view of student progress and performance
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-6">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                      <h4 className="font-medium">Contact Information</h4>
                                      <p className="text-sm text-gray-600">{trainee.email}</p>
                                      <p className="text-sm text-gray-600">
                                        Joined: {new Date(trainee.joinDate).toLocaleDateString()}
                                      </p>
                                    </div>
                                    <div className="space-y-2">
                                      <h4 className="font-medium">Performance Metrics</h4>
                                      <p className="text-sm text-gray-600">Average Score: {trainee.averageScore}%</p>
                                      <p className="text-sm text-gray-600">Attendance: {trainee.attendanceRate}%</p>
                                    </div>
                                  </div>
                                  <div className="space-y-2">
                                    <h4 className="font-medium">Enrolled Courses</h4>
                                    <div className="flex flex-wrap gap-2">
                                      {trainee.enrolledCourses.map((course) => (
                                        <Badge key={course} variant="outline">
                                          {course}
                                        </Badge>
                                      ))}
                                    </div>
                                  </div>
                                  <div className="space-y-2">
                                    <h4 className="font-medium">Current Progress</h4>
                                    <div className="space-y-1">
                                      <div className="flex justify-between text-sm">
                                        <span>{trainee.currentCourse}</span>
                                        <span>{trainee.progress}%</span>
                                      </div>
                                      <Progress value={trainee.progress} className="h-2" />
                                    </div>
                                  </div>
                                </div>
                              </DialogContent>
                            </Dialog>
                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0 hover:bg-green-50">
                              <MessageSquare className="h-4 w-4 text-green-600" />
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
