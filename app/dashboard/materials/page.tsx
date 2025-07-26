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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Upload,
  FileText,
  Video,
  ImageIcon,
  X,
  Plus,
  Play,
  Download,
  Edit,
  Trash2,
  Clock,
  Users,
  Send,
  Eye,
  BookOpen,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useSearchParams } from "next/navigation"
import { formatDate } from "@/lib/formatDate"


export default function TrainingMaterialsPage() {
  const searchParams = useSearchParams()
  const userRole = searchParams.get("role") || "faculty"

  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false)
  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false)
  const [selectedMaterial, setSelectedMaterial] = useState<string | null>(null)
  const [selectedTrainees, setSelectedTrainees] = useState<string[]>([])
  const [watchedMaterials, setWatchedMaterials] = useState<Set<string>>(new Set(["1", "3"]))
  const [assignedMaterials, setAssignedMaterials] = useState<Record<string, string[]>>({
    "1": ["trainee1", "trainee2", "trainee3"],
    "2": ["trainee1", "trainee3"],
    "3": ["trainee2", "trainee3"],
    "4": ["trainee1", "trainee2"],
  })

  const trainees = [
    { id: "trainee1", name: "Alice Johnson", email: "alice@example.com" },
    { id: "trainee2", name: "Bob Smith", email: "bob@example.com" },
    { id: "trainee3", name: "Carol Davis", email: "carol@example.com" },
    { id: "trainee4", name: "David Wilson", email: "david@example.com" },
    { id: "trainee5", name: "Eva Brown", email: "eva@example.com" },
  ]

  const existingMaterials = [
    {
      id: "1",
      title: "React Fundamentals",
      description: "Complete introduction to React concepts and components",
      category: "Programming",
      type: "video",
      duration: "45 min",
      size: "245 MB",
      uploadDate: "2024-05-20",
      downloads: 24,
      views: 156,
      instructor: "Dr. Smith",
    },
    {
      id: "2",
      title: "JavaScript ES6 Guide",
      description: "Modern JavaScript features and best practices",
      category: "Programming",
      type: "document",
      duration: "30 min",
      size: "12 MB",
      uploadDate: "2024-05-18",
      downloads: 18,
      views: 89,
      instructor: "Prof. Johnson",
    },
    {
      id: "3",
      title: "Node.js Backend Development",
      description: "Building scalable backend applications with Node.js",
      category: "Programming",
      type: "video",
      duration: "60 min",
      size: "189 MB",
      uploadDate: "2024-05-15",
      downloads: 32,
      views: 203,
      instructor: "Dr. Wilson",
    },
    {
      id: "4",
      title: "Database Design Principles",
      description: "Fundamentals of relational database design",
      category: "Database",
      type: "document",
      duration: "25 min",
      size: "8 MB",
      uploadDate: "2024-05-12",
      downloads: 15,
      views: 67,
      instructor: "Prof. Davis",
    },
  ]

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    setSelectedFiles((prev) => [...prev, ...files])
  }

  const removeFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsUploading(true)

    for (let i = 0; i <= 100; i += 10) {
      setUploadProgress(i)
      await new Promise((resolve) => setTimeout(resolve, 200))
    }

    setIsUploading(false)
    setUploadProgress(0)
    setSelectedFiles([])
    setIsUploadDialogOpen(false)
    alert("Material uploaded successfully!")
  }

  const handleAssignMaterial = () => {
    if (selectedMaterial && selectedTrainees.length > 0) {
      setAssignedMaterials((prev) => ({
        ...prev,
        [selectedMaterial]: [...(prev[selectedMaterial] || []), ...selectedTrainees],
      }))
      setSelectedTrainees([])
      setSelectedMaterial(null)
      setIsAssignDialogOpen(false)
      alert(`Material assigned to ${selectedTrainees.length} trainee(s)!`)
    }
  }

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

  const openAssignDialog = (materialId: string) => {
    setSelectedMaterial(materialId)
    setIsAssignDialogOpen(true)
  }

  const getFileIcon = (file: File) => {
    if (file.type.startsWith("video/")) return <Video className="h-4 w-4" />
    if (file.type.startsWith("image/")) return <ImageIcon className="h-4 w-4" />
    return <FileText className="h-4 w-4" />
  }

  const getMaterialIcon = (type: string) => {
    return type === "video" ? <Video className="h-5 w-5" /> : <FileText className="h-5 w-5" />
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  // Filter materials based on user role
  const availableMaterials =
    userRole === "faculty"
      ? existingMaterials
      : existingMaterials.filter(
          (material) => assignedMaterials[material.id]?.includes("trainee1"), // Assuming current user is trainee1
        )

  // Redirect trainees to their own materials page
  if (userRole === "trainee") {
    window.location.href = "/dashboard/my-trainings"
    return null
  }

  return (
    <SidebarProvider>
      <AppSidebar userRole={userRole} />
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
                  <BreadcrumbPage>
                    {userRole === "faculty" ? "Training Materials" : "My Assigned Materials"}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-6 p-6 pt-0">
          {/* Header Section */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {userRole === "faculty" ? "Training Materials" : "My Assigned Materials"}
              </h2>
              <p className="text-muted-foreground mt-2">
                {userRole === "faculty"
                  ? "Manage your training content library and assign materials to trainees"
                  : "Access your assigned training materials and track your progress"}
              </p>
            </div>
            {userRole === "faculty" && (
              <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg">
                    <Plus className="h-4 w-4 mr-2" />
                    Upload New Material
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      Upload Training Material
                    </DialogTitle>
                    <DialogDescription>
                      Add new videos, documents, and resources for your training program.
                    </DialogDescription>
                  </DialogHeader>

                  <form onSubmit={handleUpload} className="space-y-6 mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="title" className="text-sm font-medium">
                          Title
                        </Label>
                        <Input
                          id="title"
                          placeholder="Enter material title"
                          className="h-11 border-2 focus:border-blue-500 transition-colors"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="category" className="text-sm font-medium">
                          Category
                        </Label>
                        <Select required>
                          <SelectTrigger className="h-11 border-2 focus:border-blue-500">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="programming">Programming</SelectItem>
                            <SelectItem value="design">Design</SelectItem>
                            <SelectItem value="business">Business</SelectItem>
                            <SelectItem value="marketing">Marketing</SelectItem>
                            <SelectItem value="database">Database</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description" className="text-sm font-medium">
                        Description
                      </Label>
                      <Textarea
                        id="description"
                        placeholder="Describe what trainees will learn from this material"
                        rows={3}
                        className="border-2 focus:border-blue-500 transition-colors resize-none"
                      />
                    </div>

                    <div className="space-y-4">
                      <Label className="text-sm font-medium">Files</Label>
                      <div className="border-2 border-dashed border-blue-300 rounded-xl p-8 text-center hover:border-blue-400 transition-colors bg-gradient-to-br from-blue-50 to-purple-50">
                        <div className="flex flex-col items-center">
                          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mb-4">
                            <Upload className="h-8 w-8 text-white" />
                          </div>
                          <Label htmlFor="file-upload" className="cursor-pointer">
                            <span className="text-lg font-medium text-gray-900 block mb-2">
                              Drop files here or click to upload
                            </span>
                            <span className="text-sm text-gray-500">
                              Supports: MP4, AVI, MOV, PDF, DOC, PPT (Max 500MB per file)
                            </span>
                          </Label>
                          <Input
                            id="file-upload"
                            type="file"
                            multiple
                            accept=".mp4,.avi,.mov,.pdf,.doc,.docx,.ppt,.pptx"
                            onChange={handleFileSelect}
                            className="hidden"
                          />
                        </div>
                      </div>

                      {selectedFiles.length > 0 && (
                        <div className="space-y-3">
                          <Label className="text-sm font-medium">Selected Files</Label>
                          <div className="space-y-3">
                            {selectedFiles.map((file, index) => (
                              <div
                                key={index}
                                className="flex items-center justify-between p-4 border-2 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 hover:from-blue-50 hover:to-purple-50 transition-all"
                              >
                                <div className="flex items-center space-x-4">
                                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white">
                                    {getFileIcon(file)}
                                  </div>
                                  <div>
                                    <p className="font-medium text-gray-900">{file.name}</p>
                                    <p className="text-sm text-gray-500">{formatFileSize(file.size)}</p>
                                  </div>
                                </div>
                                <div className="flex items-center space-x-3">
                                  <Badge
                                    variant="secondary"
                                    className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700"
                                  >
                                    {file.type.split("/")[0]}
                                  </Badge>
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => removeFile(index)}
                                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                  >
                                    <X className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {isUploading && (
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm font-medium">
                          <span>Uploading...</span>
                          <span>{uploadProgress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div
                            className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-300"
                            style={{ width: `${uploadProgress}%` }}
                          ></div>
                        </div>
                      </div>
                    )}

                    <div className="flex justify-end space-x-4 pt-4">
                      <Button
                        type="button"
                        variant="outline"
                        className="border-2 hover:bg-gray-50"
                        onClick={() => setIsUploadDialogOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        disabled={selectedFiles.length === 0 || isUploading}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                      >
                        {isUploading ? "Uploading..." : "Upload & Publish"}
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            )}
          </div>

          {/* Assign Material Dialog */}
          <Dialog open={isAssignDialogOpen} onOpenChange={setIsAssignDialogOpen}>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle className="text-xl font-bold">Assign Material to Trainees</DialogTitle>
                <DialogDescription>
                  Select trainees to assign this material to. They will receive notifications and can track their
                  progress.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <Label className="text-sm font-medium">Select Trainees:</Label>
                <div className="grid grid-cols-1 gap-3 max-h-60 overflow-y-auto">
                  {trainees.map((trainee) => (
                    <div
                      key={trainee.id}
                      className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50"
                    >
                      <Checkbox
                        id={trainee.id}
                        checked={selectedTrainees.includes(trainee.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedTrainees([...selectedTrainees, trainee.id])
                          } else {
                            setSelectedTrainees(selectedTrainees.filter((id) => id !== trainee.id))
                          }
                        }}
                      />
                      <div className="flex-1">
                        <Label htmlFor={trainee.id} className="font-medium cursor-pointer">
                          {trainee.name}
                        </Label>
                        <p className="text-sm text-gray-500">{trainee.email}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-end space-x-3 pt-4">
                  <Button variant="outline" onClick={() => setIsAssignDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button
                    onClick={handleAssignMaterial}
                    disabled={selectedTrainees.length === 0}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Assign to {selectedTrainees.length} Trainee(s)
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          {/* Materials Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {availableMaterials.map((material) => {
              const isWatched = watchedMaterials.has(material.id)
              const assignedCount = assignedMaterials[material.id]?.length || 0

              return (
                <Card
                  key={material.id}
                  className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-blue-200 bg-gradient-to-br from-white to-gray-50"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                            material.type === "video"
                              ? "bg-gradient-to-r from-red-500 to-pink-500"
                              : "bg-gradient-to-r from-green-500 to-emerald-500"
                          } text-white`}
                        >
                          {getMaterialIcon(material.type)}
                        </div>
                        <div>
                          <CardTitle className="text-lg leading-tight">{material.title}</CardTitle>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge variant="secondary">{material.category}</Badge>
                            {isWatched && (
                              <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                                <Eye className="h-3 w-3 mr-1" />
                                Watched
                              </Badge>
                            )}
                            {userRole === "faculty" && assignedCount > 0 && (
                              <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">
                                <Users className="h-3 w-3 mr-1" />
                                {assignedCount} assigned
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-gray-600 line-clamp-2">{material.description}</p>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="space-y-1">
                        <p className="text-gray-500">Duration</p>
                        <p className="font-medium flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {material.duration}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-gray-500">Instructor</p>
                        <p className="font-medium">{material.instructor}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-gray-500">Views</p>
                        <p className="font-medium">{material.views}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-gray-500">Size</p>
                        <p className="font-medium">{material.size}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                  <p className="text-xs text-gray-500">
                    Uploaded {formatDate(material.uploadDate)}
                  </p>
                      <div className="flex space-x-1">
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0 hover:bg-blue-50">
                          <Play className="h-4 w-4 text-blue-600" />
                        </Button>
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0 hover:bg-green-50">
                          <Download className="h-4 w-4 text-green-600" />
                        </Button>
                        {userRole === "faculty" && (
                          <>
                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0 hover:bg-yellow-50">
                              <Edit className="h-4 w-4 text-yellow-600" />
                            </Button>
                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0 hover:bg-red-50">
                              <Trash2 className="h-4 w-4 text-red-600" />
                            </Button>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="pt-2 border-t space-y-2">
                      {userRole === "trainee" ? (
                        // Trainee: Watch Complete Button
                        isWatched ? (
                          <Button
                            onClick={() => markAsUnwatched(material.id)}
                            variant="outline"
                            className="w-full border-green-200 text-green-700 hover:bg-green-50"
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            Mark as Unwatched
                          </Button>
                        ) : (
                          <Button
                            onClick={() => markAsWatched(material.id)}
                            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white"
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            Mark as Watched Complete
                          </Button>
                        )
                      ) : (
                        // Faculty: Assign to Trainees Button
                        <Button
                          onClick={() => openAssignDialog(material.id)}
                          className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white"
                        >
                          <Send className="h-4 w-4 mr-2" />
                          Assign to Trainees
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {availableMaterials.length === 0 && userRole === "trainee" && (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Materials Assigned</h3>
              <p className="text-gray-500">Your instructor hasn't assigned any training materials yet.</p>
            </div>
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
