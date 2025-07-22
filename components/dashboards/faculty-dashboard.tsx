"use client"

import { useEffect, useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Users,
  BookOpen,
  Clock,
  TrendingUp,
  Upload,
  Play,
  FileText,
} from "lucide-react"
import { motion } from "framer-motion"

const stats = [
  {
    title: "Total Trainees",
    value: "24",
    description: "Active learners",
    icon: Users,
    trend: "+12%",
    gradient: "from-sky-400 to-blue-500",
    bgGradient: "from-sky-50 to-blue-50",
  },
  {
    title: "Training Materials",
    value: "18",
    description: "Videos & Documents",
    icon: BookOpen,
    trend: "+3 this week",
    gradient: "from-blue-500 to-indigo-600",
    bgGradient: "from-blue-50 to-indigo-50",
  },
  {
    title: "Completion Rate",
    value: "87%",
    description: "Average completion",
    icon: TrendingUp,
    trend: "+5% from last month",
    gradient: "from-indigo-500 to-purple-600",
    bgGradient: "from-indigo-50 to-purple-50",
  },
  {
    title: "Hours Delivered",
    value: "156",
    description: "Total training hours",
    icon: Clock,
    trend: "+24 this month",
    gradient: "from-cyan-500 to-blue-600",
    bgGradient: "from-cyan-50 to-blue-50",
  },
]

const recentUploads = [
  { name: "React Fundamentals.mp4", type: "video", date: "2 hours ago", size: "245 MB" },
  { name: "JavaScript Basics.pdf", type: "document", date: "1 day ago", size: "12 MB" },
  { name: "Node.js Tutorial.mp4", type: "video", date: "3 days ago", size: "189 MB" },
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export default function FacultyDashboard() {
  const [pendingUsers, setPendingUsers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPending() {
      const res = await fetch("/api/admin/pending-users")
      const data = await res.json()
      setPendingUsers(data)
      setLoading(false)
    }
    fetchPending()
  }, [])

  async function handleApprove(userId: string) {
    const res = await fetch("/api/admin/approve-user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId }),
    })

    if (res.ok) {
      setPendingUsers((prev) => prev.filter((user) => user.id !== userId))
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        className="bg-gradient-to-r from-blue-600 via-sky-600 to-indigo-600 rounded-2xl p-6 text-white shadow-lg"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        whileHover={{ scale: 1.01 }}
      >
        <h2 className="text-3xl font-bold tracking-tight mb-2">Faculty Dashboard</h2>
        <p className="text-blue-100">
          Manage your training programs and track student progress.
        </p>
      </motion.div>

      {/* Stats */}
      <motion.div
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {stats.map((stat) => (
          <motion.div key={stat.title} variants={item}>
            <Card
              className={`bg-gradient-to-br ${stat.bgGradient} border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]`}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-700">{stat.title}</CardTitle>
                <div className={`p-2 rounded-lg bg-gradient-to-r ${stat.gradient}`}>
                  <stat.icon className="h-4 w-4 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <p className="text-xs text-gray-600 mb-2">{stat.description}</p>
                <Badge variant="secondary" className="bg-white/80 text-gray-700 hover:bg-white">
                  {stat.trend}
                </Badge>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Uploads & Actions */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Uploads */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="bg-gradient-to-br from-white to-blue-50 border-blue-200 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-gray-800 flex items-center">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center mr-3">
                  <Upload className="h-4 w-4 text-white" />
                </div>
                Recent Uploads
              </CardTitle>
              <CardDescription className="text-gray-600">
                Your latest training materials
              </CardDescription>
            </CardHeader>
            <CardContent>
              <motion.div className="space-y-4" variants={container} initial="hidden" animate="show">
                {recentUploads.map((upload, index) => (
                  <motion.div
                    key={index}
                    variants={item}
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center space-x-4 p-3 rounded-xl bg-white/70 hover:bg-white transition-colors cursor-pointer"
                  >
                    <div className="flex-shrink-0">
                      {upload.type === "video" ? (
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
                          <Play className="h-5 w-5 text-white" />
                        </div>
                      ) : (
                        <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center">
                          <FileText className="h-5 w-5 text-white" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{upload.name}</p>
                      <p className="text-sm text-gray-500">
                        {upload.date} • {upload.size}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="bg-gradient-to-br from-white to-indigo-50 border-indigo-200 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-gray-800 flex items-center">
                <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center mr-3">
                  <TrendingUp className="h-4 w-4 text-white" />
                </div>
                Quick Actions
              </CardTitle>
              <CardDescription className="text-gray-600">Common tasks and shortcuts</CardDescription>
            </CardHeader>
            <CardContent>
              <motion.div className="space-y-3" variants={container} initial="hidden" animate="show">
                {[
                  {
                    label: "Upload New Material",
                    icon: Upload,
                    gradient: "from-blue-500 to-sky-500",
                    border: "border-blue-200 hover:bg-blue-50",
                  },
                  {
                    label: "Manage Trainees",
                    icon: Users,
                    gradient: "from-blue-500 to-cyan-500",
                    border: "border-green-200 hover:bg-green-50",
                  },
                  {
                    label: "View Analytics",
                    icon: TrendingUp,
                    gradient: "from-blue-500 to-indigo-500",
                    border: "border-purple-200 hover:bg-purple-50",
                  },
                ].map(({ label, icon: Icon, gradient, border }, idx) => (
                  <motion.div
                    key={label}
                    variants={item}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex items-center justify-between p-4 border ${border} rounded-xl cursor-pointer transition-colors bg-white/70`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 bg-gradient-to-r ${gradient} rounded-lg flex items-center justify-center`}>
                        <Icon className="h-4 w-4 text-white" />
                      </div>
                      <span className="text-sm font-medium text-gray-800">{label}</span>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
