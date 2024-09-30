import React from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronUp, MapPin, Eye } from 'lucide-react'

interface IssueCardProps {
  issue: {
    image: string
    location: string
    severity: string
    upvotes: number
    description: string
  }
}

export default function IssueCard({ issue }: IssueCardProps) {
  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'critical': return 'bg-red-500'
      case 'major': return 'bg-orange-500'
      case 'minor': return 'bg-yellow-500'
      default: return 'bg-blue-500'
    }
  }

  return (
    <Card className="bg-white shadow-lg hover:shadow-xl transition duration-300">
      <CardHeader className="p-0 relative">
        <img src={issue.image} alt={`Issue in ${issue.location}`} className="w-full h-48 object-cover rounded-t-lg" />
        <Badge className={`absolute top-2 right-2 ${getSeverityColor(issue.severity)}`}>
          {issue.severity}
        </Badge>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex items-center mb-2">
          <MapPin className="h-4 w-4 text-gray-500 mr-1" />
          <h2 className="text-xl font-semibold text-gray-800">{issue.location}</h2>
        </div>
        <p className="text-gray-600">{issue.description}</p>
      </CardContent>
      <CardFooter className="flex justify-between items-center p-4 bg-gray-50">
        <Button 
          variant="outline" 
          className="flex items-center gap-2 bg-white text-gray-800 border-gray-300 hover:bg-gray-100 hover:border-gray-400 transition-all duration-200 shadow-sm hover:shadow-md"
        >
          <ChevronUp className="h-5 w-5 text-gray-600" />
          <span className="font-semibold text-lg">{issue.upvotes}</span>
        </Button>
        <Button className="bg-gray-800 text-white hover:bg-gray-700 transition-colors duration-200">
          <Eye className="mr-2 h-4 w-4" />
          See More
        </Button>
      </CardFooter>
    </Card>
  )
}