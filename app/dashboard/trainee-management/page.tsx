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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Users, Plus, Edit, Trash2, Search, UserCheck, UserX, TrendingUp, Award } from "lucide-react"

export default function TraineeManagementPage() {
  const [isAddTraineeDialogOpen, setIsAddTraineeDialogOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterProgram, setFilterProgram] = useState("all")

  const trainees = [
    {
      id: "1",
      name: "Alice Johnson",
      email: "alice.johnson@example.com",
      enrolledPrograms: ["React Development Bootcamp", "JavaScript Fundamentals"],
      completedPrograms: 2,
      totalProgress: 85,
      status: "active",
      joinDate: "2024-01-15",
      lastActivity: "2024-12-01",
      currentProgram: "React Development Bootcamp",
      programProgress: 75,
    },
    {
      id: "2",
      name: "Bob Smith",
      email: "bob.smith@example.com",
      enrolledPrograms: ["JavaScript Fundamentals", "Node.js Backend Development"],
      completedPrograms: 1,
      totalProgress: 68,
      status: "active",
      joinDate: "2024-02-01",
      lastActivity: "2024-11-30",
      currentProgram: "Node.js Backend Development",
      programProgress: 45,
    },
    {
      id: "3",
      name: "Carol Davis",
      email: "carol.davis@example.com",
      enrolledPrograms: ["Database Design & SQL"],
      completedPrograms: 1,
      totalProgress: 95,
      status: "active",
      joinDate: "2024-01-20",
      lastActivity: "2024-12-01",
      currentProgram: "Database Design & SQL",
      programProgress: 100,
    },
    {
      id: "4",
      name: "David Wilson",
      email: "david.wilson@example.com",
      enrolledPrograms: ["React Development Bootcamp"],
      completedPrograms: 0,
      totalProgress: 32,
      status: "inactive",
      joinDate: "2024-03-01",
      lastActivity: "2024-11-15",
      currentProgram: "React Development Bootcamp",
      programProgress: 32,
    },
    {
      id: "5",
      name: "Eva Brown",
      email: "eva.brown@example.com",
      enrolledPrograms: ["JavaScript Fundamentals", "Database Design & SQL"],
      completedPrograms: 2,
      totalProgress: 92,
      status: "active",
      joinDate: "2024-01-10",
      lastActivity: "2024-12-01",
      currentProgram: "JavaScript Fundamentals",
      programProgress: 88,
    },
  ]

  const programs = [
    "React Development Bootcamp",
    "JavaScript Fundamentals",
    "Node.js Backend Development",
    "Database Design & SQL",
    "Python for Data Science",
  ]

  const handleAddTrainee = (e: React.FormEvent) => {
    e.preventDefault()
    setIsAddTraineeDialogOpen(false)
    alert("Trainee added successfully!")
  }

  const filteredTrainees = trainees.filter((trainee) => {
    const matchesSearch =
      trainee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trainee.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "all" || trainee.status === filterStatus
    const matchesProgram = filterProgram === "all" || trainee.enrolledPrograms.includes(filterProgram)
    return matchesSearch && matchesStatus && matchesProgram
  })

  const getStatusBadgeColor = (status: string) => {
    return status === "active"
      ? "bg-green-100 text-green-700 hover:bg-green-100"
      : "bg-red-100 text-red-700 hover:bg-red-100"
  }

  const stats = [
    {
      title: "Total Trainees",
      value: trainees.length.toString(),
      description: "All registered trainees",
      icon: Users,
    },
    {
      title: "Active Trainees",
      value: trainees.filter((t) => t.status === "active").length.toString(),
      description: "Currently learning",
      icon: UserCheck,
    },
    {
      title: "Avg Progress",
      value: `${Math.round(trainees.reduce((sum, t) => sum + t.totalProgress, 0) / trainees.length)}%`,
      description: "Overall completion",
      icon: TrendingUp,
    },
    {
      title: "Completed Programs",
      value: trainees.reduce((sum, t) => sum + t.completedPrograms, 0).toString(),
      description: "Total completions",
      icon: Award,
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
                  <BreadcrumbLink href="/dashboard?role=admin">Dashboard</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Trainee Management</BreadcrumbPage>
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
                Trainee Management
              </h2>
              <p className="text-muted-foreground mt-2">Monitor trainee progress, enrollment, and performance</p>
            </div>
            <Dialog open={isAddTraineeDialogOpen} onOpenChange={setIsAddTraineeDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg">
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Trainee
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Add New Trainee
                  </DialogTitle>
                  <DialogDescription>Register a new trainee and assign them to training programs.</DialogDescription>
                </DialogHeader>

                <form onSubmit={handleAddTrainee} className="space-y-6 mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-sm font-medium">
                        Full Name
                      </Label>
                      <Input
                        id="name"
                        placeholder="Enter full name"
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
                      <Label htmlFor="program" className="text-sm font-medium">
                        Initial Program
                      </Label>
                      <Select required>
                        <SelectTrigger className="h-11 border-2 focus:border-purple-500">
                          <SelectValue placeholder="Select training program" />
                        </SelectTrigger>
                        <SelectContent>
                          {programs.map((program) => (
                            <SelectItem key={program} value={program.toLowerCase().replace(/\s+/g, "-")}>
                              {program}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
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
                  </div>

                  <div className="flex justify-end space-x-4 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      className="border-2 hover:bg-gray-50"
                      onClick={() => setIsAddTraineeDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                    >
                      Add Trainee
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

          {/* Trainees Table */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 mr-2" />
                Trainee Directory
              </CardTitle>
              <CardDescription>Monitor all trainees and their learning progress</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search trainees by name or email..."
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
                <Select value={filterProgram} onValueChange={setFilterProgram}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="Program" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Programs</SelectItem>
                    {programs.map((program) => (
                      <SelectItem key={program} value={program}>
                        {program}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Trainee</TableHead>
                      <TableHead>Current Program</TableHead>
                      <TableHead>Progress</TableHead>
                      <TableHead>Completed</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Activity</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTrainees.map((trainee) => (
                      <TableRow key={trainee.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{trainee.name}</div>
                            <div className="text-sm text-gray-500">{trainee.email}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium text-sm">{trainee.currentProgram}</div>
                            <div className="text-xs text-gray-500">
                              {trainee.enrolledPrograms.length} total programs
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span>Current</span>
                              <span>{trainee.programProgress}%</span>
                            </div>
                            <Progress value={trainee.programProgress} className="h-2" />
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-blue-50 text-blue-700">
                            {trainee.completedPrograms} programs
                          </Badge>
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
                        <TableCell>{new Date(trainee.lastActivity).toLocaleDateString()}</TableCell>
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
