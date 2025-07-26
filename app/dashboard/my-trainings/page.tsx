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
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Play, FileText, Clock, Eye, User, CheckCircle } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function MyTrainingsPage() {
  const [watchedMaterials, setWatchedMaterials] = useState<Set<string>>(new Set(["1-1", "1-2", "1-3", "2-1", "2-2"]))

  const trainings = [
    {
      id: "1",
      title: "React Fundamentals",
      instructor: "Dr. Smith",
      progress: 75,
      totalMaterials: 5,
      watchedMaterials: 3,
      materials: [
        { id: "1-1", title: "Introduction to React", type: "video", duration: "15 min", watched: true },
        { id: "1-2", title: "Components and JSX", type: "video", duration: "20 min", watched: true },
        { id: "1-3", title: "Props and State", type: "video", duration: "25 min", watched: true },
        { id: "1-4", title: "Event Handling", type: "document", duration: "10 min", watched: false },
        { id: "1-5", title: "React Hooks", type: "video", duration: "30 min", watched: false },
      ],
    },
    {
      id: "2",
      title: "JavaScript Advanced",
      instructor: "Prof. Johnson",
      progress: 40,
      totalMaterials: 5,
      watchedMaterials: 2,
      materials: [
        { id: "2-1", title: "Async/Await", type: "video", duration: "18 min", watched: true },
        { id: "2-2", title: "Promises Deep Dive", type: "document", duration: "12 min", watched: true },
        { id: "2-3", title: "Closures and Scope", type: "video", duration: "22 min", watched: false },
        { id: "2-4", title: "Prototypes", type: "document", duration: "15 min", watched: false },
        { id: "2-5", title: "ES6 Modules", type: "video", duration: "20 min", watched: false },
      ],
    },
  ]

  const markAsWatched = (materialId: string) => {
    setWatchedMaterials((prev) => new Set([...prev, materialId]))
  }

  const markAsUnwatched = (materialId: string) => {
    setWatchedMaterials((prev) => {
      const newSet = new Set(prev)
      newSet.delete(materialId)
      return newSet
    })
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
                  <BreadcrumbPage>My Trainings</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div>
            <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              My Trainings
            </h2>
            <p className="text-muted-foreground">Access your assigned training materials and track your progress.</p>
          </div>

          <div className="space-y-6">
            {trainings.map((training) => (
              <Card key={training.id} className="bg-gradient-to-br from-white to-blue-50 border-blue-200">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-xl">{training.title}</CardTitle>
                      <CardDescription className="flex items-center gap-2 mt-1">
                        <User className="h-4 w-4" />
                        Instructor: {training.instructor}
                      </CardDescription>
                    </div>
                    <Badge variant="outline" className="bg-white border-blue-200 text-blue-700">
                      {training.watchedMaterials}/{training.totalMaterials} Watched
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{training.progress}%</span>
                    </div>
                    <Progress value={training.progress} className="h-2" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <h4 className="font-medium">Training Materials</h4>
                    <div className="grid gap-3">
                      {training.materials.map((material) => {
                        const isWatched = material.watched || watchedMaterials.has(material.id)
                        return (
                          <div
                            key={material.id}
                            className="flex items-center justify-between p-4 border rounded-lg bg-white/70 hover:bg-white transition-colors"
                          >
                            <div className="flex items-center space-x-3">
                              <div className="flex-shrink-0">
                                {material.type === "video" ? (
                                  <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg flex items-center justify-center">
                                    <Play className="h-5 w-5 text-white" />
                                  </div>
                                ) : (
                                  <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                                    <FileText className="h-5 w-5 text-white" />
                                  </div>
                                )}
                              </div>
                              <div>
                                <p className="text-sm font-medium">{material.title}</p>
                                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                                  <Clock className="h-3 w-3" />
                                  <span>{material.duration}</span>
                                  <Badge variant="secondary" className="text-xs">
                                    {material.type}
                                  </Badge>
                                  {isWatched && (
                                    <Badge className="bg-green-100 text-green-700 text-xs">
                                      <Eye className="h-3 w-3 mr-1" />
                                      Watched
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="outline" size="sm">
                                    {material.type === "video" ? "Watch" : "Read"}
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-4xl max-h-[80vh]">
                                  <DialogHeader>
                                    <DialogTitle>{material.title}</DialogTitle>
                                    <DialogDescription>
                                      {training.title} - {material.duration}
                                    </DialogDescription>
                                  </DialogHeader>
                                  <div className="space-y-4">
                                    {material.type === "video" ? (
                                      <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                                        <div className="text-center">
                                          <Play className="h-16 w-16 text-gray-400 mx-auto mb-2" />
                                          <p className="text-gray-600">Video Player</p>
                                          <p className="text-sm text-gray-500">
                                            {material.title} - {material.duration}
                                          </p>
                                        </div>
                                      </div>
                                    ) : (
                                      <div className="bg-gray-50 p-6 rounded-lg min-h-[400px]">
                                        <div className="text-center">
                                          <FileText className="h-16 w-16 text-gray-400 mx-auto mb-2" />
                                          <p className="text-gray-600">Document Viewer</p>
                                          <p className="text-sm text-gray-500">
                                            {material.title} - {material.duration}
                                          </p>
                                        </div>
                                      </div>
                                    )}
                                    <div className="flex justify-between items-center pt-4">
                                      {isWatched ? (
                                        <div className="flex items-center text-green-600">
                                          <CheckCircle className="h-5 w-5 mr-2" />
                                          <span className="font-medium">Watched Complete</span>
                                        </div>
                                      ) : (
                                        <div></div>
                                      )}
                                      <div className="flex space-x-2">
                                        {isWatched ? (
                                          <Button
                                            variant="outline"
                                            onClick={() => markAsUnwatched(material.id)}
                                            className="border-green-200 text-green-700 hover:bg-green-50"
                                          >
                                            <Eye className="h-4 w-4 mr-2" />
                                            Mark as Unwatched
                                          </Button>
                                        ) : (
                                          <Button
                                            onClick={() => markAsWatched(material.id)}
                                            className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white"
                                          >
                                            <Eye className="h-4 w-4 mr-2" />
                                            Mark as Watched Complete
                                          </Button>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </DialogContent>
                              </Dialog>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
