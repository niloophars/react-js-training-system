"use client"

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
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Users, TrendingUp, Clock, Award, BookOpen, Play } from "lucide-react"

export default function AnalyticsPage() {
  const overallStats = [
    {
      title: "Total Trainees",
      value: "24",
      change: "+12%",
      trend: "up",
      icon: Users,
    },
    {
      title: "Avg. Completion Rate",
      value: "87%",
      change: "+5%",
      trend: "up",
      icon: TrendingUp,
    },
    {
      title: "Total Watch Time",
      value: "1,240h",
      change: "+18%",
      trend: "up",
      icon: Clock,
    },
    {
      title: "Certificates Issued",
      value: "156",
      change: "+23%",
      trend: "up",
      icon: Award,
    },
  ]

  const courseAnalytics = [
    {
      title: "React Fundamentals",
      enrolled: 18,
      completed: 14,
      avgProgress: 85,
      avgRating: 4.8,
      totalHours: 24,
    },
    {
      title: "JavaScript Advanced",
      enrolled: 15,
      completed: 11,
      avgProgress: 73,
      avgRating: 4.6,
      totalHours: 32,
    },
    {
      title: "Node.js Backend",
      enrolled: 12,
      completed: 8,
      avgProgress: 67,
      avgRating: 4.7,
      totalHours: 28,
    },
    {
      title: "Database Design",
      enrolled: 20,
      completed: 16,
      avgProgress: 80,
      avgRating: 4.5,
      totalHours: 20,
    },
  ]

  const topPerformers = [
    { name: "Alice Johnson", completedCourses: 8, totalHours: 120, avgScore: 95 },
    { name: "Bob Smith", completedCourses: 7, totalHours: 98, avgScore: 92 },
    { name: "Carol Davis", completedCourses: 6, totalHours: 85, avgScore: 89 },
    { name: "David Wilson", completedCourses: 6, totalHours: 78, avgScore: 87 },
    { name: "Eva Brown", completedCourses: 5, totalHours: 72, avgScore: 85 },
  ]

  const recentActivity = [
    { trainee: "Alice Johnson", action: "Completed", course: "React Fundamentals", time: "2 hours ago" },
    { trainee: "Bob Smith", action: "Started", course: "Node.js Backend", time: "4 hours ago" },
    { trainee: "Carol Davis", action: "Completed", course: "JavaScript Advanced", time: "1 day ago" },
    { trainee: "David Wilson", action: "Submitted", course: "Database Design Project", time: "2 days ago" },
    { trainee: "Eva Brown", action: "Completed", course: "HTML/CSS Basics", time: "3 days ago" },
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
                  <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Analytics</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Training Analytics</h2>
            <p className="text-muted-foreground">
              Monitor training performance and student progress across all programs.
            </p>
          </div>

          {/* Overall Statistics */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {overallStats.map((stat) => (
              <Card key={stat.title}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                  <stat.icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-600">{stat.change}</span> from last month
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {/* Course Performance */}
            <Card>
              <CardHeader>
                <CardTitle>Course Performance</CardTitle>
                <CardDescription>Enrollment and completion statistics by course</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {courseAnalytics.map((course, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-medium">{course.title}</h4>
                        <div className="flex items-center space-x-2">
                          <Badge variant="secondary">
                            {course.completed}/{course.enrolled} completed
                          </Badge>
                          <Badge variant="outline">⭐ {course.avgRating}</Badge>
                        </div>
                      </div>
                      <Progress value={course.avgProgress} className="h-2" />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>{course.avgProgress}% avg progress</span>
                        <span>{course.totalHours}h total content</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Top Performers */}
            <Card>
              <CardHeader>
                <CardTitle>Top Performers</CardTitle>
                <CardDescription>Students with highest completion rates and scores</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topPerformers.map((performer, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">{performer.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {performer.completedCourses} courses • {performer.totalHours}h
                        </p>
                      </div>
                      <div className="text-right">
                        <Badge variant="secondary">{performer.avgScore}% avg</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest student activities across all training programs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      {activity.action === "Completed" ? (
                        <Award className="h-5 w-5 text-green-600" />
                      ) : activity.action === "Started" ? (
                        <Play className="h-5 w-5 text-blue-600" />
                      ) : (
                        <BookOpen className="h-5 w-5 text-purple-600" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">
                        {activity.trainee} {activity.action.toLowerCase()} {activity.course}
                      </p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {activity.action}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
