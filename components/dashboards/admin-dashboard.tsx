"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, BookOpen, Clock, TrendingUp } from "lucide-react"
import { motion } from "framer-motion"

const stats = [
  {
    title: "Total Users",
    value: "156",
    description: "All system users",
    icon: Users,
    trend: "+8 this month",
    gradient: "from-purple-400 to-pink-500",
    bgGradient: "from-purple-50 to-pink-50",
  },
  {
    title: "Active Faculty",
    value: "12",
    description: "Teaching staff",
    icon: Users,
    trend: "+2 this month",
    gradient: "from-blue-500 to-indigo-600",
    bgGradient: "from-blue-50 to-indigo-50",
  },
  {
    title: "Total Trainees",
    value: "124",
    description: "Learning participants",
    icon: BookOpen,
    trend: "+15 this month",
    gradient: "from-green-500 to-emerald-600",
    bgGradient: "from-green-50 to-emerald-50",
  },
  {
    title: "System Uptime",
    value: "99.9%",
    description: "Last 30 days",
    icon: TrendingUp,
    trend: "Excellent",
    gradient: "from-cyan-500 to-blue-600",
    bgGradient: "from-cyan-50 to-blue-50",
  },
]

const recentActivities = [
  { action: "New Faculty", user: "Dr. Sarah Wilson", time: "2 hours ago", type: "user" },
  { action: "Course Created", user: "Prof. Johnson", time: "4 hours ago", type: "content" },
  { action: "System Update", user: "System", time: "1 day ago", type: "system" },
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

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <motion.div
        className="bg-gradient-to-r from-blue-600 via-sky-600 to-indigo-600 rounded-2xl p-6 text-white shadow-lg"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        whileHover={{ scale: 1.01 }}
      >
        <h2 className="text-3xl font-bold tracking-tight mb-2">Admin Dashboard</h2>
        <p className="text-blue-100">Manage the entire training system and monitor performance.</p>
      </motion.div>

      {/* Statistics */}
      <motion.div
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {stats.map((stat) => (
          <motion.div key={stat.title} variants={item}>
            <Card className={`bg-gradient-to-br ${stat.bgGradient} border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]`}>
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

      {/* Lower Section - Recent Activity & Actions */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent System Activity */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
          <Card className="bg-gradient-to-br from-white to-purple-50 border-purple-200 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-gray-800 flex items-center">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center mr-3">
                  <Clock className="h-4 w-4 text-white" />
                </div>
                Recent System Activity
              </CardTitle>
              <CardDescription className="text-gray-600">Latest system events and changes</CardDescription>
            </CardHeader>
            <CardContent>
              <motion.div className="space-y-4" variants={container} initial="hidden" animate="show">
                {recentActivities.map((activity, index) => (
                  <motion.div
                    key={index}
                    variants={item}
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center space-x-4 p-3 rounded-xl bg-white/70 hover:bg-white transition-colors cursor-pointer"
                  >
                    <div className="flex-shrink-0">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        activity.type === "user"
                          ? "bg-gradient-to-r from-blue-500 to-indigo-500"
                          : activity.type === "content"
                          ? "bg-gradient-to-r from-green-500 to-emerald-500"
                          : "bg-gradient-to-r from-purple-500 to-pink-500"
                      }`}>
                        <Users className="h-5 w-5 text-white" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">
                        {activity.action}: {activity.user}
                      </p>
                      <p className="text-sm text-gray-500">{activity.time}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Admin Actions */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
          <Card className="bg-gradient-to-br from-white to-indigo-50 border-indigo-200 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-gray-800 flex items-center">
                <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center mr-3">
                  <TrendingUp className="h-4 w-4 text-white" />
                </div>
                Quick Admin Actions
              </CardTitle>
              <CardDescription className="text-gray-600">Common administrative tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <motion.div className="space-y-3" variants={container} initial="hidden" animate="show">
                {[
                  { label: "Manage Users", gradient: "from-purple-500 to-pink-500", border: "border-purple-200" },
                  { label: "System Settings", gradient: "from-blue-500 to-indigo-500", border: "border-blue-200" },
                  { label: "View Reports", gradient: "from-green-500 to-emerald-500", border: "border-green-200" },
                ].map((action, idx) => (
                  <motion.div
                    key={idx}
                    variants={item}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex items-center justify-between p-4 border ${action.border} rounded-xl hover:bg-opacity-80 cursor-pointer transition-colors bg-white/70`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 bg-gradient-to-r ${action.gradient} rounded-lg flex items-center justify-center`}>
                        <Users className="h-4 w-4 text-white" />
                      </div>
                      <span className="text-sm font-medium text-gray-800">{action.label}</span>
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
