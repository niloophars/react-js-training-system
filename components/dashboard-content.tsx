"use client"

import dynamic from "next/dynamic"

interface DashboardContentProps {
  userRole: string
}

// Dynamically import dashboards (optional, but improves performance for large apps)
const AdminDashboard = dynamic(() => import("@/components/dashboards/admin-dashboard"))
const FacultyDashboard = dynamic(() => import("@/components/dashboards/faculty-dashboard"))
const TraineeDashboard = dynamic(() => import("@/components/dashboards/trainee-dashboard"))

export function DashboardContent({ userRole }: DashboardContentProps) {
  switch (userRole) {
    case "admin":
      return <AdminDashboard />
    case "faculty":
      return <FacultyDashboard />
    default:
      return <TraineeDashboard />
  }
}
