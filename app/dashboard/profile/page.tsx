"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { User, Mail, Calendar, MapPin, Phone, Edit, Save, X, Camera, Star, TrendingUp, Zap, Award } from "lucide-react"

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    name: "Quantum User",
    email: "user@qorscend.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    joinDate: "January 2024",
    role: "Quantum Developer",
    company: "Qorscend Technologies",
    bio: "Passionate quantum computing developer with expertise in quantum algorithms and quantum machine learning. Working on cutting-edge quantum applications and tools."
  })

  const [tempData, setTempData] = useState(profileData)

  const handleSave = () => {
    setProfileData(tempData)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setTempData(profileData)
    setIsEditing(false)
  }

  const handleInputChange = (field: string, value: string) => {
    setTempData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="space-y-8">
      {/* Enhanced Header */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 border border-blue-500/20 p-6">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-purple-600/5 to-pink-600/5" />
        <div className="relative flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Profile
            </h1>
            <p className="text-muted-foreground mt-2 text-lg">Manage your account settings and preferences</p>
          </div>
          <div className="flex gap-3">
            {!isEditing ? (
              <Button 
                onClick={() => setIsEditing(true)}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Edit className="mr-2 h-4 w-4" />
                Edit Profile
              </Button>
            ) : (
              <>
                <Button 
                  variant="outline" 
                  onClick={handleCancel}
                  className="border-gray-600 hover:bg-gray-800 transition-all duration-300"
                >
                  <X className="mr-2 h-4 w-4" />
                  Cancel
                </Button>
                <Button 
                  onClick={handleSave}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Enhanced Profile Card */}
        <div className="lg:col-span-1">
          <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-pink-600/10" />
            <CardHeader className="relative text-center pb-6">
              <div className="relative mx-auto w-36 h-36 mb-6">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full p-1">
                  <Avatar className="w-full h-full border-4 border-background">
                    <AvatarImage src="/placeholder-user.jpg" alt="Profile" />
                    <AvatarFallback className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-white">QU</AvatarFallback>
                  </Avatar>
                </div>
                <Button
                  size="sm"
                  className="absolute bottom-2 right-2 rounded-full w-10 h-10 p-0 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg"
                >
                  <Camera className="h-4 w-4" />
                </Button>
              </div>
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                {profileData.name}
              </CardTitle>
              <CardDescription className="text-lg text-blue-300/80 mt-2">
                {profileData.role}
              </CardDescription>
              <Badge className="mt-3 bg-gradient-to-r from-purple-600/20 to-pink-600/20 text-purple-300 border border-purple-500/30 px-4 py-1">
                {profileData.company}
              </Badge>
            </CardHeader>
            <CardContent className="relative space-y-4">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-800/30 hover:bg-gray-800/50 transition-all duration-300">
                <div className="p-2 rounded-full bg-blue-600/20">
                  <Mail className="h-4 w-4 text-blue-400" />
                </div>
                <span className="text-sm text-gray-300">{profileData.email}</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-800/30 hover:bg-gray-800/50 transition-all duration-300">
                <div className="p-2 rounded-full bg-green-600/20">
                  <Phone className="h-4 w-4 text-green-400" />
                </div>
                <span className="text-sm text-gray-300">{profileData.phone}</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-800/30 hover:bg-gray-800/50 transition-all duration-300">
                <div className="p-2 rounded-full bg-purple-600/20">
                  <MapPin className="h-4 w-4 text-purple-400" />
                </div>
                <span className="text-sm text-gray-300">{profileData.location}</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-800/30 hover:bg-gray-800/50 transition-all duration-300">
                <div className="p-2 rounded-full bg-pink-600/20">
                  <Calendar className="h-4 w-4 text-pink-400" />
                </div>
                <span className="text-sm text-gray-300">Joined {profileData.joinDate}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Profile Details */}
        <div className="lg:col-span-2 space-y-8">
          {/* Enhanced Personal Information */}
          <Card className="border-0 bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-purple-600/5 to-pink-600/5" />
            <CardHeader className="relative">
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Personal Information
              </CardTitle>
              <CardDescription className="text-lg text-gray-400">
                Update your personal details and contact information
              </CardDescription>
            </CardHeader>
            <CardContent className="relative space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="name" className="text-sm font-medium text-gray-300">Full Name</Label>
                  {isEditing ? (
                    <Input
                      id="name"
                      value={tempData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="bg-gray-800/50 border-gray-600 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300"
                    />
                  ) : (
                    <div className="text-sm py-3 px-4 bg-gray-800/30 rounded-lg border border-gray-700/50 text-gray-300">
                      {profileData.name}
                    </div>
                  )}
                </div>
                <div className="space-y-3">
                  <Label htmlFor="email" className="text-sm font-medium text-gray-300">Email</Label>
                  {isEditing ? (
                    <Input
                      id="email"
                      type="email"
                      value={tempData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="bg-gray-800/50 border-gray-600 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300"
                    />
                  ) : (
                    <div className="text-sm py-3 px-4 bg-gray-800/30 rounded-lg border border-gray-700/50 text-gray-300">
                      {profileData.email}
                    </div>
                  )}
                </div>
                <div className="space-y-3">
                  <Label htmlFor="phone" className="text-sm font-medium text-gray-300">Phone</Label>
                  {isEditing ? (
                    <Input
                      id="phone"
                      value={tempData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="bg-gray-800/50 border-gray-600 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300"
                    />
                  ) : (
                    <div className="text-sm py-3 px-4 bg-gray-800/30 rounded-lg border border-gray-700/50 text-gray-300">
                      {profileData.phone}
                    </div>
                  )}
                </div>
                <div className="space-y-3">
                  <Label htmlFor="location" className="text-sm font-medium text-gray-300">Location</Label>
                  {isEditing ? (
                    <Input
                      id="location"
                      value={tempData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      className="bg-gray-800/50 border-gray-600 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300"
                    />
                  ) : (
                    <div className="text-sm py-3 px-4 bg-gray-800/30 rounded-lg border border-gray-700/50 text-gray-300">
                      {profileData.location}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Enhanced Bio */}
          <Card className="border-0 bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm shadow-2xl">
            <CardHeader>
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Bio
              </CardTitle>
              <CardDescription className="text-lg text-gray-400">
                Tell us about yourself
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isEditing ? (
                <textarea
                  className="w-full min-h-[120px] p-4 border border-gray-600 rounded-lg bg-gray-800/50 text-gray-300 placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300 resize-none"
                  value={tempData.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  placeholder="Tell us about yourself..."
                />
              ) : (
                <div className="p-4 bg-gray-800/30 rounded-lg border border-gray-700/50">
                  <p className="text-gray-300 leading-relaxed">{profileData.bio}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Enhanced Account Statistics */}
          <Card className="border-0 bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm shadow-2xl">
            <CardHeader>
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Account Statistics
              </CardTitle>
              <CardDescription className="text-lg text-gray-400">
                Your activity and usage statistics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center p-4 rounded-xl bg-gradient-to-br from-blue-600/20 to-blue-800/20 border border-blue-500/30 hover:bg-gradient-to-br hover:from-blue-600/30 hover:to-blue-800/30 transition-all duration-300">
                  <div className="flex justify-center mb-2">
                    <div className="p-2 rounded-full bg-blue-600/30">
                      <Zap className="h-5 w-5 text-blue-400" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-blue-400">156</div>
                  <div className="text-sm text-gray-400">Jobs Run</div>
                </div>
                <div className="text-center p-4 rounded-xl bg-gradient-to-br from-purple-600/20 to-purple-800/20 border border-purple-500/30 hover:bg-gradient-to-br hover:from-purple-600/30 hover:to-purple-800/30 transition-all duration-300">
                  <div className="flex justify-center mb-2">
                    <div className="p-2 rounded-full bg-purple-600/30">
                      <Star className="h-5 w-5 text-purple-400" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-purple-400">23</div>
                  <div className="text-sm text-gray-400">Projects</div>
                </div>
                <div className="text-center p-4 rounded-xl bg-gradient-to-br from-green-600/20 to-green-800/20 border border-green-500/30 hover:bg-gradient-to-br hover:from-green-600/30 hover:to-green-800/30 transition-all duration-300">
                  <div className="flex justify-center mb-2">
                    <div className="p-2 rounded-full bg-green-600/30">
                      <TrendingUp className="h-5 w-5 text-green-400" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-green-400">89%</div>
                  <div className="text-sm text-gray-400">Success Rate</div>
                </div>
                <div className="text-center p-4 rounded-xl bg-gradient-to-br from-pink-600/20 to-pink-800/20 border border-pink-500/30 hover:bg-gradient-to-br hover:from-pink-600/30 hover:to-pink-800/30 transition-all duration-300">
                  <div className="flex justify-center mb-2">
                    <div className="p-2 rounded-full bg-pink-600/30">
                      <Award className="h-5 w-5 text-pink-400" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-pink-400">1.2k</div>
                  <div className="text-sm text-gray-400">Credits Used</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
