
"use client"

import { GraduationCap, Home, Users, BookOpen, BarChart3, LogOut } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { supabase } from '@/lib/supabaseClient'



interface AppSidebarProps {
  userRole: string
}

export function AppSidebar({ userRole }: AppSidebarProps) {
  const router = useRouter()

  const facultyItems = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: Home,
    },
    {
      title: "Trainees",
      url: "/dashboard/trainees",
      icon: Users,
    },
    {
      title: "Training Materials",
      url: "/dashboard/materials",
      icon: BookOpen,
    },
    {
      title: "Analytics",
      url: "/dashboard/analytics",
      icon: BarChart3,
    },
  ]

  const traineeItems = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: Home,
    },
    {
      title: "My Trainings",
      url: "/dashboard/my-trainings",
      icon: BookOpen,
    },
    {
      title: "Progress",
      url: "/dashboard/progress",
      icon: BarChart3,
    },
  ]

  const adminItems = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: Home,
    },
    {
    title: "User Management",
    url: "/dashboard/users", // This is the missing page
    icon: Users,
  },
    {
      title: "Training Management",
      url: "/dashboard/training-management",
      icon: BookOpen,
    },
    {
      title: "System Analytics",
      url: "/dashboard/system-analytics",
      icon: BarChart3,
    },
  ]

  // Update the menuItems logic
  const menuItems = userRole === "admin" ? adminItems : userRole === "faculty" ? facultyItems : traineeItems





const handleLogout = async () => {
  await supabase.auth.signOut()
  router.push("/")
}

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariant = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 },
  }

  return (
    <Sidebar className="bg-gradient-to-b from-slate-50 to-blue-50 border-r border-blue-200">
      <SidebarHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <motion.div
          className="flex items-center gap-2 px-2 py-3"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
            <GraduationCap className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-semibold">TrainMaster</h2>
            <p className="text-xs text-blue-100 capitalize">{userRole === "admin" ? "Admin" : userRole} Portal</p>
          </div>
        </motion.div>
      </SidebarHeader>
      <SidebarContent className="bg-gradient-to-b from-white to-blue-50">
        <SidebarGroup>
          <SidebarGroupLabel className="text-blue-700 font-medium">Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <motion.div variants={container} initial="hidden" animate="show">
              <SidebarMenu>
                {menuItems.map((item, index) => (
                  <motion.div key={item.title} variants={itemVariant}>
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        asChild
                        className="hover:bg-blue-100 hover:text-blue-700 transition-all duration-300 transform hover:translate-x-1"
                      >
                        <a href={item.url} className="flex items-center gap-3">
                          <item.icon className="h-4 w-4" />
                          <span>{item.title}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </motion.div>
                ))}
              </SidebarMenu>
            </motion.div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="bg-gradient-to-r from-slate-100 to-blue-100 border-t border-blue-200">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={handleLogout}
              className="hover:bg-red-100 hover:text-red-700 transition-all duration-300 transform hover:translate-x-1"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
