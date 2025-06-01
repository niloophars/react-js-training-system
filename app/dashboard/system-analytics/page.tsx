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
import { Users, TrendingUp, Server, Database, Activity, UserX, AlertTriangle, CheckCircle } from "lucide-react"

export default function SystemAnalyticsPage() {
  const systemStats = [
    {
      title: "System Uptime",
      value: "99.9%",
      change: "Last 30 days",
      trend: "up",
      icon: Server,
      color: "from-green-500 to-emerald-600",
      bgColor: "from-green-50 to-emerald-50",
    },
    {
      title: "Active Users",
      value: "156",
      change: "+12% this month",
      trend: "up",
      icon: Users,
      color: "from-blue-500 to-indigo-600",
      bgColor: "from-blue-50 to-indigo-50",
    },
    {
      title: "Database Size",
      value: "2.4 GB",
      change: "+180 MB this month",
      trend: "up",
      icon: Database,
      color: "from-purple-500 to-pink-600",
      bgColor: "from-purple-50 to-pink-50",
    },
    {
      title: "API Requests",
      value: "1.2M",
      change: "+8% from last month",
      trend: "up",
      icon: Activity,
      color: "from-cyan-500 to-blue-600",
      bgColor: "from-cyan-50 to-blue-50",
    },
  ]

  const userAnalytics = [
    {
      role: "Trainees",
      total: 124,
      active: 118,
      inactive: 6,
      growth: "+15%",
      avgSessionTime: "45 min",
    },
    {
      role: "Faculty",
      total: 12,
      active: 11,
      inactive: 1,
      growth: "+2%",
      avgSessionTime: "2.5 hrs",
    },
    {
      role: "Admins",
      total: 3,
      active: 3,
      inactive: 0,
      growth: "0%",
      avgSessionTime: "1.2 hrs",
    },
  ]

  const performanceMetrics = [
    {
      metric: "Page Load Time",
      value: "1.2s",
      target: "< 2s",
      status: "good",
      progress: 85,
    },
    {
      metric: "API Response Time",
      value: "180ms",
      target: "< 300ms",
      status: "good",
      progress: 92,
    },
    {
      metric: "Error Rate",
      value: "0.1%",
      target: "< 1%",
      status: "excellent",
      progress: 95,
    },
    {
      metric: "Memory Usage",
      value: "68%",
      target: "< 80%",
      status: "warning",
      progress: 68,
    },
  ]

  const systemEvents = [
    {
      event: "System Backup Completed",
      time: "2 hours ago",
      status: "success",
      details: "Daily backup completed successfully",
    },
    {
      event: "New User Registration",
      time: "4 hours ago",
      status: "info",
      details: "5 new trainees registered",
    },
    {
      event: "Database Optimization",
      time: "1 day ago",
      status: "success",
      details: "Query performance improved by 15%",
    },
    {
      event: "Security Scan",
      time: "2 days ago",
      status: "success",
      details: "No vulnerabilities detected",
    },
    {
      event: "Server Maintenance",
      time: "3 days ago",
      status: "warning",
      details: "Scheduled maintenance window completed",
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />
      case "error":
        return <UserX className="h-4 w-4 text-red-600" />
      default:
        return <Activity className="h-4 w-4 text-blue-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "excellent":
        return "text-green-600"
      case "good":
        return "text-blue-600"
      case "warning":
        return "text-yellow-600"
      case "poor":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
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
                  <BreadcrumbLink href="/dashboard?role=admin">Dashboard</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>System Analytics</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-6 p-6 pt-0">
          <div>
            <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              System Analytics
            </h2>
            <p className="text-muted-foreground">
              Monitor system performance, user activity, and infrastructure health.
            </p>
          </div>

          {/* System Statistics */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {systemStats.map((stat) => (
              <Card
                key={stat.title}
                className={`bg-gradient-to-br ${stat.bgColor} border-0 shadow-lg hover:shadow-xl transition-all duration-300`}
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-700">{stat.title}</CardTitle>
                  <div className={`p-2 rounded-lg bg-gradient-to-r ${stat.color}`}>
                    <stat.icon className="h-4 w-4 text-white" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <p className="text-xs text-gray-600">
                    <span className="text-green-600">{stat.change}</span>
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* User Analytics */}
            <Card className="bg-gradient-to-br from-white to-purple-50 border-purple-200">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  User Analytics
                </CardTitle>
                <CardDescription>User distribution and activity metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {userAnalytics.map((user, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-medium">{user.role}</h4>
                        <div className="flex items-center space-x-2">
                          <Badge variant="secondary">
                            {user.active}/{user.total} active
                          </Badge>
                          <Badge variant="outline" className="text-green-600">
                            {user.growth}
                          </Badge>
                        </div>
                      </div>
                      <Progress value={(user.active / user.total) * 100} className="h-2" />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Avg session: {user.avgSessionTime}</span>
                        <span>{user.inactive} inactive</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Performance Metrics */}
            <Card className="bg-gradient-to-br from-white to-indigo-50 border-indigo-200">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Performance Metrics
                </CardTitle>
                <CardDescription>System performance and health indicators</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {performanceMetrics.map((metric, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-medium">{metric.metric}</h4>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-bold">{metric.value}</span>
                          <Badge variant="outline" className={getStatusColor(metric.status)}>
                            {metric.status}
                          </Badge>
                        </div>
                      </div>
                      <Progress value={metric.progress} className="h-2" />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Target: {metric.target}</span>
                        <span>{metric.progress}% optimal</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* System Events */}
          <Card className="bg-gradient-to-br from-white to-gray-50 border-gray-200">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="h-5 w-5 mr-2" />
                Recent System Events
              </CardTitle>
              <CardDescription>Latest system activities and notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {systemEvents.map((event, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-4 p-3 rounded-lg bg-white/70 hover:bg-white transition-colors"
                  >
                    <div className="flex-shrink-0">{getStatusIcon(event.status)}</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">{event.event}</p>
                      <p className="text-sm text-gray-500">{event.details}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">{event.time}</p>
                    </div>
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
