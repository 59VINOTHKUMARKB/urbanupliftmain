'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useToast } from "@/components/ui/use-toast"
import { MapPin, Camera, AlertTriangle, Info } from 'lucide-react'

export default function CreateReportPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')
  const [location, setLocation] = useState('')
  const [severity, setSeverity] = useState(3)
  const [isAnonymous, setIsAnonymous] = useState(false)
  const [images, setImages] = useState<File[]>([])
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    // Simulating authentication check
    setTimeout(() => setIsAuthenticated(true), 1000)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})
    setIsSubmitting(true)

    // Validate form
    const newErrors: { [key: string]: string } = {}
    if (!title.trim()) newErrors.title = "Title is required"
    if (!category) newErrors.category = "Category is required"
    if (!description.trim()) newErrors.description = "Description is required"
    if (!location.trim()) newErrors.location = "Location is required"

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      setIsSubmitting(false)
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    await new Promise(resolve => setTimeout(resolve, 2000))

    toast({
      title: "Report Submitted",
      description: "Your issue has been successfully reported. Reference number: #12345",
    })

    setIsSubmitting(false)
    router.push('/user/id/dashboard')
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newImages = Array.from(e.target.files)
      if (images.length + newImages.length > 5) {
        toast({
          title: "Upload Limit Reached",
          description: "You can only upload a maximum of 5 images.",
          variant: "destructive",
        })
        return
      }
      setImages(prevImages => [...prevImages, ...newImages])
    }
  }

  const handleUseCurrentLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords
        setLocation(`Lat: ${latitude}, Long: ${longitude}`)
        toast({
          title: "Location Updated",
          description: "Your current location has been set.",
        })
      }, () => {
        toast({
          title: "Location Error",
          description: "Unable to get your current location. Please enter it manually.",
          variant: "destructive",
        })
      })
    } else {
      toast({
        title: "Geolocation Unavailable",
        description: "Your browser doesn't support geolocation. Please enter the location manually.",
        variant: "destructive",
      })
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Authentication Required</AlertTitle>
          <AlertDescription>
            Please sign in or sign up to report an issue.
          </AlertDescription>
        </Alert>
        <div className="mt-4 space-x-4">
          <Button onClick={() => router.push('/signin')}>Sign In</Button>
          <Button variant="outline" onClick={() => router.push('/signup')}>Sign Up</Button>
        </div>
      </div>
    )
  }

  return (
    <TooltipProvider>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Report an Issue</h1>
        
        <form onSubmit={handleSubmit}>
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Issue Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">
                  Title
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-4 w-4 inline-block ml-1 cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Provide a brief, descriptive title for the issue</p>
                    </TooltipContent>
                  </Tooltip>
                </Label>
                <Input
                  id="title"
                  placeholder="Enter a brief title for the issue"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
                {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select value={category} onValueChange={setCategory} required>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="roads">Roads</SelectItem>
                    <SelectItem value="sanitation">Sanitation</SelectItem>
                    <SelectItem value="lighting">Lighting</SelectItem>
                    <SelectItem value="parks">Parks</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                {errors.category && <p className="text-sm text-red-500">{errors.category}</p>}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Provide a detailed description of the issue"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
                {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
              </div>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Location</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="location">Address or Landmark</Label>
                <div className="flex">
                  <Input
                    id="location"
                    placeholder="Enter the location of the issue"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                    className="flex-grow"
                  />
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button type="button" variant="outline" className="ml-2" onClick={handleUseCurrentLocation}>
                        <MapPin className="h-4 w-4 mr-2" />
                        Use Current Location
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Click to use your current location</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                {errors.location && <p className="text-sm text-red-500">{errors.location}</p>}
              </div>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Additional Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="severity">Severity</Label>
                <div className="flex items-center space-x-4">
                  <Slider
                    id="severity"
                    min={1}
                    max={5}
                    step={1}
                    value={[severity]}
                    onValueChange={(value) => setSeverity(value[0])}
                    className="flex-grow"
                  />
                  <span className="font-bold">{severity}</span>
                </div>
                <p className="text-sm text-muted-foreground">1 = Low, 5 = Critical</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">
                  Upload Images
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-4 w-4 inline-block ml-1 cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>You can upload up to 5 images</p>
                    </TooltipContent>
                  </Tooltip>
                </Label>
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  multiple
                />
                {images.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {images.map((image, index) => (
                      <div key={index} className="relative">
                        <img
                          src={URL.createObjectURL(image)}
                          alt={`Uploaded image ${index + 1}`}
                          className="w-20 h-20 object-cover rounded"
                        />
                        <button
                          type="button"
                          className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                          onClick={() => setImages(images.filter((_, i) => i !== index))}
                        >
                          &times;
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="anonymous"
                  checked={isAnonymous}
                  onCheckedChange={setIsAnonymous}
                />
                <Label htmlFor="anonymous">Submit Anonymously</Label>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end space-x-4">
            <Button variant="outline" type="button" onClick={() => router.back()}>Cancel</Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Report"}
            </Button>
          </div>
        </form>
      </div>
    </TooltipProvider>
  )
}