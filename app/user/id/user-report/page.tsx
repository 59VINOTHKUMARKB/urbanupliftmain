import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { AlertTriangle, CheckCircle, Clock, MapPin, ThumbsUp, MessageSquare, FileText, Award, TrendingUp, Eye } from 'lucide-react'

const userData = {
  name: "Jane Doe",
  avatar: "/placeholder.svg?height=100&width=100",
  totalReports: 25,
  resolvedReports: 18,
  totalUpvotes: 132,
  totalComments: 47,
  contributionLevel: "Silver",
  contributionProgress: 75,
  recentReports: [
    { id: 1, title: "Pothole on Main St", status: "Resolved", date: "2023-06-15", upvotes: 12 },
    { id: 2, title: "Broken streetlight", status: "In Progress", date: "2023-06-20", upvotes: 8 },
    { id: 3, title: "Graffiti in Central Park", status: "Pending", date: "2023-06-25", upvotes: 5 },
  ],
  reportsByCategory: [
    { name: 'Roads', count: 10 },
    { name: 'Lighting', count: 7 },
    { name: 'Parks', count: 5 },
    { name: 'Sanitation', count: 3 },
  ],
  monthlyActivity: [
    { month: 'Jan', reports: 2, resolved: 1 },
    { month: 'Feb', reports: 3, resolved: 2 },
    { month: 'Mar', reports: 4, resolved: 3 },
    { month: 'Apr', reports: 5, resolved: 4 },
    { month: 'May', reports: 6, resolved: 5 },
    { month: 'Jun', reports: 5, resolved: 3 },
  ],
}

const COLORS = ['bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-red-500']

export default function PersonalizedDashboard() {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'resolved': return 'bg-green-500'
      case 'in progress': return 'bg-blue-500'
      case 'pending': return 'bg-yellow-500'
      default: return 'bg-gray-500'
    }
  }

  const maxReports = Math.max(...userData.monthlyActivity.map(m => m.reports))
  const maxResolved = Math.max(...userData.monthlyActivity.map(m => m.resolved))

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Welcome back, {userData.name}!</h1>
        <Avatar className="h-16 w-16">
          <AvatarImage src={userData.avatar} alt={userData.name} />
          <AvatarFallback>{userData.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
        </Avatar>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reports</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userData.totalReports}</div>
            <Progress 
              value={(userData.resolvedReports / userData.totalReports) * 100} 
              className="mt-2"
            />
            <p className="text-xs text-muted-foreground mt-2">
              {userData.resolvedReports} resolved
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Upvotes</CardTitle>
            <ThumbsUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userData.totalUpvotes}</div>
            <p className="text-xs text-muted-foreground mt-2">
              On your reported issues
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Comments</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userData.totalComments}</div>
            <p className="text-xs text-muted-foreground mt-2">
              Across all your reports
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Contribution Level</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userData.contributionLevel}</div>
            <Progress 
              value={userData.contributionProgress} 
              className="mt-2"
            />
            <p className="text-xs text-muted-foreground mt-2">
              {userData.contributionProgress}% to next level
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Your Reports by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex h-64">
              {userData.reportsByCategory.map((category, index) => (
                <div key={index} className="flex flex-col items-center justify-end flex-1">
                  <div 
                    className={`w-full ${COLORS[index]} rounded-t`} 
                    style={{height: `${(category.count / Math.max(...userData.reportsByCategory.map(c => c.count))) * 100}%`}}
                  ></div>
                  <p className="text-xs mt-2">{category.name}</p>
                  <p className="text-xs font-bold">{category.count}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Your Monthly Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex h-64">
              {userData.monthlyActivity.map((month, index) => (
                <div key={index} className="flex flex-col items-center justify-end flex-1">
                  <div className="w-full flex justify-center space-x-1">
                    <div 
                      className="w-1/3 bg-blue-500 rounded-t" 
                      style={{height: `${(month.reports / maxReports) * 100}%`}}
                    ></div>
                    <div 
                      className="w-1/3 bg-green-500 rounded-t" 
                      style={{height: `${(month.resolved / maxResolved) * 100}%`}}
                    ></div>
                  </div>
                  <p className="text-xs mt-2">{month.month}</p>
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-4">
              <div className="flex items-center mr-4">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                <span className="text-xs">Reported</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                <span className="text-xs">Resolved</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your Recent Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {userData.recentReports.map((report) => (
              <div key={report.id} className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center space-x-4">
                  <Badge className={getStatusColor(report.status)}>{report.status}</Badge>
                  <div>
                    <p className="font-medium">{report.title}</p>
                    <p className="text-sm text-gray-500">{report.date}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <ThumbsUp className="h-4 w-4 mr-1 text-blue-500" />
                    <span className="text-sm">{report.upvotes}</span>
                  </div>
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    View
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}