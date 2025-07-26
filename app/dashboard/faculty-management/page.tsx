"use client"

import type React from "react"
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
import { Users, Plus, Edit, Trash2, Search, UserCheck, UserX, BookOpen, TrendingUp, Award } from "lucide-react"

export default function FacultyManagementPage() {
  const [isAddFacultyDialogOpen, setIsAddFacultyDialogOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterDepartment, setFilterDepartment] = useState("all")

  const faculty = [
    {
      id: "1",
      name: "Dr. Sarah Smith",
      email: "sarah.smith@example.com",
      department: "Computer Science",
      specialization: "Web Development",
      activePrograms: ["React Development Bootcamp"],
      totalStudents: 24,
      completionRate: 87,
      status: "active",
      joinDate: "2023-08-15",
      lastActivity: "2024-12-01",
      experience: "8 years",
      rating: 4.8,
    },
    {
      id: "2",
      name: "Prof. John Johnson",
      email: "john.johnson@example.com",
      department: "Computer Science",
      specialization: "JavaScript & Frontend",
      activePrograms: ["JavaScript Fundamentals"],
      totalStudents: 32,
      completionRate: 92,
      status: "active",
      joinDate: "2023-06-01",
      lastActivity: "2024-11-30",
      experience: "12 years",
      rating: 4.6,
    },
    {
      id: "3",
      name: "Dr. Michael Wilson",
      email: "michael.wilson@example.com",
      department: "Software Engineering",
      specialization: "Backend Development",
      activePrograms: ["Node.js Backend Development"],
      totalStudents: 18,
      completionRate: 78,
      status: "active",
      joinDate: "2023-09-10",
      lastActivity: "2024-12-01",
      experience: "10 years",
      rating: 4.7,
    },
    {
      id: "4",
      name: "Prof. Lisa Davis",
      email: "lisa.davis@example.com",
      department: "Database Systems",
      specialization: "Database Design",
      activePrograms: ["Database Design & SQL"],
      totalStudents: 28,
      completionRate: 95,
      status: "active",
      joinDate: "2023-07-20",
      lastActivity: "2024-11-28",
      experience: "15 years",
      rating: 4.5,
    },
    {
      id: "5",
      name: "Dr. Robert Chen",
      email: "robert.chen@example.com",
      department: "Data Science",
      specialization: "Python & Analytics",
      activePrograms: [],
      totalStudents: 0,
      completionRate: 0,
      status: "inactive",
      joinDate: "2024-01-15",
      lastActivity: "2024-11-10",
      experience: "6 years",
      rating: 4.3,
    },
  ]

  const departments = [
    "Computer Science",
    "Software Engineering",
    "Database Systems",
    "Data Science",
    "Information Technology",
  ]

  const handleAddFaculty = (e: React.FormEvent) => {
    e.preventDefault()
    setIsAddFacultyDialogOpen(false)
    alert("Faculty member added successfully!")
  }

  const filteredFaculty = faculty.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.specialization.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "all" || member.status === filterStatus
    const matchesDepartment = filterDepartment === "all" || member.department === filterDepartment
    return matchesSearch && matchesStatus && matchesDepartment
  })

  const getStatusBadgeColor = (status: string) => {
    return status === "active"
      ? "bg-green-100 text-green-700 hover:bg-green-100"
      : "bg-red-100 text-red-700 hover:bg-red-100"
  }

  const stats = [
    {
      title: "Total Faculty",
      value: faculty.length.toString(),
      description: "All faculty members",
      icon: Users,
    },
    {
      title: "Active Faculty",
      value: faculty.filter((f) => f.status === "active").length.toString(),
      description: "Currently teaching",
      icon: UserCheck,
    },
    {
      title: "Avg Rating",
      value: `${(faculty.reduce((sum, f) => sum + f.rating, 0) / faculty.length).toFixed(1)}⭐`,
      description: "Student feedback",
      icon: Award,
    },
    {
      title: "Total Students",
      value: faculty.reduce((sum, f) => sum + f.totalStudents, 0).toString(),
      description: "Across all faculty",
      icon: TrendingUp,
    },
  ]

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
                  <BreadcrumbPage>Faculty Management</BreadcrumbPage>
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
                Faculty Management
              </h2>
              <p className="text-muted-foreground mt-2">Manage faculty members, assignments, and performance</p>
            </div>
            <Dialog open={isAddFacultyDialogOpen} onOpenChange={setIsAddFacultyDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg">
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Faculty
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Add New Faculty Member
                  </DialogTitle>
                  <DialogDescription>
                    Register a new faculty member and assign their department and specialization.
                  </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleAddFaculty} className="space-y-6 mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-sm font-medium">
                        Full Name
                      </Label>
                      <Input
                        id="name"
                        placeholder="Enter full name (e.g., Dr. John Smith)"
                        className="h-11 border-2 focus:border-purple-500 transition-colors"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-medium">
                        Email Address
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter email address"
                        className="h-11 border-2 focus:border-purple-500 transition-colors"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="department" className="text-sm font-medium">
                        Department
                      </Label>
                      <Select required>
                        <SelectTrigger className="h-11 border-2 focus:border-purple-500">
                          <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                        <SelectContent>
                          {departments.map((dept) => (
                            <SelectItem key={dept} value={dept.toLowerCase().replace(/\s+/g, "-")}>
                              {dept}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="experience" className="text-sm font-medium">
                        Years of Experience
                      </Label>
                      <Input
                        id="experience"
                        type="number"
                        placeholder="e.g., 5"
                        className="h-11 border-2 focus:border-purple-500 transition-colors"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="specialization" className="text-sm font-medium">
                      Specialization
                    </Label>
                    <Input
                      id="specialization"
                      placeholder="e.g., Web Development, Data Science, etc."
                      className="h-11 border-2 focus:border-purple-500 transition-colors"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio" className="text-sm font-medium">
                      Bio/Qualifications
                    </Label>
                    <Textarea
                      id="bio"
                      placeholder="Brief description of qualifications and background"
                      rows={3}
                      className="border-2 focus:border-purple-500 transition-colors resize-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-medium">
                      Temporary Password
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter temporary password"
                      className="h-11 border-2 focus:border-purple-500 transition-colors"
                      required
                    />
                  </div>

                  <div className="flex justify-end space-x-4 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      className="border-2 hover:bg-gray-50"
                      onClick={() => setIsAddFacultyDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                    >
                      Add Faculty
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
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

          {/* Faculty Table */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 mr-2" />
                Faculty Directory
              </CardTitle>
              <CardDescription>Manage all faculty members and their teaching assignments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search faculty by name, email, or specialization..."
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
                <Select value={filterDepartment} onValueChange={setFilterDepartment}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="Department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    {departments.map((dept) => (
                      <SelectItem key={dept} value={dept}>
                        {dept}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Faculty</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Specialization</TableHead>
                      <TableHead>Students</TableHead>
                      <TableHead>Completion Rate</TableHead>
                      <TableHead>Rating</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredFaculty.map((member) => (
                      <TableRow key={member.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{member.name}</div>
                            <div className="text-sm text-gray-500">{member.email}</div>
                            <div className="text-xs text-gray-400">{member.experience} experience</div>
                          </div>
                        </TableCell>
                        <TableCell>{member.department}</TableCell>
                        <TableCell>{member.specialization}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <BookOpen className="h-4 w-4 mr-1 text-gray-400" />
                            {member.totalStudents}
                          </div>
                        </TableCell>
                        <TableCell>{member.totalStudents > 0 ? `${member.completionRate}%` : "N/A"}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-yellow-50 text-yellow-700">
                            ⭐ {member.rating}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusBadgeColor(member.status)}>
                            {member.status === "active" ? (
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
