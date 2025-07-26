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
import {
  TrendingUp,
  Award,
  Clock,
  Target,
  BookOpen,
  CheckCircle,
  Calendar,
  BarChart3,
  Trophy,
  Star,
} from "lucide-react"
import { formatDate } from "@/lib/formatDate"


export default function ProgressPage() {
  const overallStats = {
    totalCourses: 3,
    completedCourses: 1,
    inProgressCourses: 2,
    totalHours: 45,
    completedHours: 28,
    averageScore: 87,
    streak: 12,
    certificates: 1,
  }

  const courses = [
    {
      id: "1",
      title: "React Fundamentals",
      instructor: "Dr. Smith",
      progress: 85,
      status: "in-progress",
      totalLessons: 12,
      completedLessons: 10,
      totalHours: 18,
      completedHours: 15,
      averageScore: 92,
      lastActivity: "2024-12-01",
      nextDeadline: "2024-12-15",
      achievements: ["First Assignment", "Perfect Attendance", "Quick Learner"],
    },
    {
      id: "2",
      title: "JavaScript Advanced",
      instructor: "Prof. Johnson",
      progress: 60,
      status: "in-progress",
      totalLessons: 15,
      completedLessons: 9,
      totalHours: 22,
      completedHours: 13,
      averageScore: 78,
      lastActivity: "2024-11-30",
      nextDeadline: "2024-12-20",
      achievements: ["Problem Solver"],
    },
    {
      id: "3",
      title: "HTML & CSS Basics",
      instructor: "Ms. Davis",
      progress: 100,
      status: "completed",
      totalLessons: 8,
      completedLessons: 8,
      totalHours: 12,
      completedHours: 12,
      averageScore: 95,
      lastActivity: "2024-11-25",
      nextDeadline: null,
      achievements: ["Course Completed", "High Achiever", "Perfect Score"],
      certificateEarned: true,
    },
  ]

  const recentAchievements = [
    { title: "Perfect Score", description: "Scored 100% on React Components Quiz", date: "2024-12-01", icon: Star },
    { title: "Quick Learner", description: "Completed 3 lessons in one day", date: "2024-11-30", icon: TrendingUp },
    { title: "Course Completed", description: "Finished HTML & CSS Basics", date: "2024-11-25", icon: Trophy },
    { title: "Problem Solver", description: "Solved 10 coding challenges", date: "2024-11-20", icon: Target },
  ]

  const weeklyProgress = [
    { week: "Week 1", hours: 8, score: 85 },
    { week: "Week 2", hours: 6, score: 90 },
    { week: "Week 3", hours: 7, score: 88 },
    { week: "Week 4", hours: 9, score: 92 },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-700 hover:bg-green-100"
      case "in-progress":
        return "bg-blue-100 text-blue-700 hover:bg-blue-100"
      default:
        return "bg-gray-100 text-gray-700 hover:bg-gray-100"
    }
  }

  const getProgressColor = (progress: number) => {
    if (progress === 100) return "bg-green-500"
    if (progress >= 75) return "bg-blue-500"
    if (progress >= 50) return "bg-yellow-500"
    return "bg-red-500"
  }

  return (
    <SidebarProvider>
      <AppSidebar userRole="trainee" />
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
                  <BreadcrumbPage>My Progress</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-6 p-6 pt-0">
          {/* Header Section */}
          <div>
            <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              My Learning Progress
            </h2>
            <p className="text-muted-foreground mt-2">Track your learning journey and achievements</p>
          </div>

          {/* Overall Statistics */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="bg-gradient-to-br from-white to-green-50 border-green-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-700">Courses Completed</CardTitle>
                <div className="p-2 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500">
                  <CheckCircle className="h-4 w-4 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">
                  {overallStats.completedCourses}/{overallStats.totalCourses}
                </div>
                <p className="text-xs text-gray-600">Total courses</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-white to-blue-50 border-blue-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-700">Learning Hours</CardTitle>
                <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500">
                  <Clock className="h-4 w-4 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{overallStats.completedHours}h</div>
                <p className="text-xs text-gray-600">of {overallStats.totalHours}h total</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-white to-purple-50 border-purple-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-700">Average Score</CardTitle>
                <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500">
                  <Award className="h-4 w-4 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{overallStats.averageScore}%</div>
                <p className="text-xs text-gray-600">Across all courses</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-white to-orange-50 border-orange-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-700">Learning Streak</CardTitle>
                <div className="p-2 rounded-lg bg-gradient-to-r from-orange-500 to-red-500">
                  <TrendingUp className="h-4 w-4 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{overallStats.streak}</div>
                <p className="text-xs text-gray-600">Days in a row</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {/* Course Progress */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BookOpen className="h-5 w-5 mr-2" />
                    Course Progress
                  </CardTitle>
                  <CardDescription>Your progress across all enrolled courses</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {courses.map((course) => (
                      <div key={course.id} className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">{course.title}</h4>
                            <p className="text-sm text-gray-500">Instructor: {course.instructor}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge className={getStatusColor(course.status)}>
                              {course.status === "completed" ? (
                                <>
                                  <CheckCircle className="h-3 w-3 mr-1" />
                                  Completed
                                </>
                              ) : (
                                <>
                                  <Clock className="h-3 w-3 mr-1" />
                                  In Progress
                                </>
                              )}
                            </Badge>
                            {course.certificateEarned && (
                              <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">
                                <Trophy className="h-3 w-3 mr-1" />
                                Certificate
                              </Badge>
                            )}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="text-gray-500">Lessons:</span>
                            <span className="ml-2 font-medium">
                              {course.completedLessons}/{course.totalLessons}
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-500">Hours:</span>
                            <span className="ml-2 font-medium">
                              {course.completedHours}h/{course.totalHours}h
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-500">Avg Score:</span>
                            <span className="ml-2 font-medium">{course.averageScore}%</span>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>Progress</span>
                            <span>{course.progress}%</span>
                          </div>
                          <Progress value={course.progress} className="h-2" />
                        </div>

                        {course.achievements.length > 0 && (
                          <div>
                            <p className="text-sm text-gray-500 mb-2">Achievements:</p>
                            <div className="flex flex-wrap gap-1">
                              {course.achievements.map((achievement) => (
                                <Badge key={achievement} variant="outline" className="text-xs">
                                  <Star className="h-3 w-3 mr-1" />
                                  {achievement}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}

                      {course.nextDeadline && (
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="h-4 w-4 mr-1" />
                          Next deadline: {formatDate(course.nextDeadline)}
                        </div>
                      )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Achievements & Weekly Progress */}
            <div className="space-y-6">
              {/* Recent Achievements */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Trophy className="h-5 w-5 mr-2" />
                    Recent Achievements
                  </CardTitle>
                  <CardDescription>Your latest accomplishments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentAchievements.map((achievement, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="p-2 rounded-lg bg-gradient-to-r from-yellow-400 to-orange-500">
                          <achievement.icon className="h-4 w-4 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium">{achievement.title}</p>
                          <p className="text-xs text-gray-500">{achievement.description}</p>
                          <p className="text-xs text-gray-400 mt-1">
                            {new Date(achievement.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Weekly Progress Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="h-5 w-5 mr-2" />
                    Weekly Progress
                  </CardTitle>
                  <CardDescription>Hours studied and average scores</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {weeklyProgress.map((week, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>{week.week}</span>
                          <span>
                            {week.hours}h • {week.score}%
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="space-y-1">
                            <div className="text-xs text-gray-500">Hours</div>
                            <Progress value={(week.hours / 10) * 100} className="h-1" />
                          </div>
                          <div className="space-y-1">
                            <div className="text-xs text-gray-500">Score</div>
                            <Progress value={week.score} className="h-1" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
