import { redirect } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getCurrentUser } from "@/lib/auth"
import { logoutAction } from "@/app/actions/auth"
import { grantsData, loansData } from "@/lib/data"
import { TrendingUp, DollarSign, Clock, Bell, Search, BookOpen, Target, ArrowRight, LogOut } from "lucide-react"

export default async function DashboardPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/login")
  }

  // Get personalized recommendations (simplified logic)
  const recommendedGrants = grantsData.slice(0, 3)
  const recommendedLoans = loansData.slice(0, 3)

  const stats = [
    { label: "Available Grants", value: grantsData.length.toString(), icon: TrendingUp },
    { label: "Available Loans", value: loansData.length.toString(), icon: DollarSign },
    { label: "Applications", value: "0", icon: Clock },
    { label: "Notifications", value: "3", icon: Bell },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-dpurpose-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-dpurpose-gradient rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">DF</span>
              </div>
              <span className="text-xl font-bold text-dpurpose-dark">Dashboard</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">Welcome, {user.name}</span>
              <form action={logoutAction}>
                <Button
                  variant="outline"
                  className="border-dpurpose-light text-dpurpose-dark hover:bg-dpurpose-light hover:text-white bg-transparent"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </form>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-dpurpose-dark mb-2">Welcome back, {user.name}!</h1>
          <p className="text-gray-600">
            Here's your personalized funding dashboard with recommendations tailored for you.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="border-dpurpose-light">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                    <p className="text-2xl font-bold text-dpurpose-dark">{stat.value}</p>
                  </div>
                  <div className="w-12 h-12 bg-dpurpose-light rounded-lg flex items-center justify-center">
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <Card className="mb-8 border-dpurpose-light">
          <CardHeader>
            <CardTitle className="text-dpurpose-dark">Quick Actions</CardTitle>
            <CardDescription>Get started with finding your perfect funding</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link href="/grants">
                <Button className="w-full bg-dpurpose-gradient hover:opacity-90 h-12">
                  <Search className="w-4 h-4 mr-2" />
                  Search Grants
                </Button>
              </Link>
              <Link href="/loans">
                <Button className="w-full bg-dpurpose-gradient hover:opacity-90 h-12">
                  <DollarSign className="w-4 h-4 mr-2" />
                  Find Loans
                </Button>
              </Link>
              <Button
                variant="outline"
                className="w-full border-dpurpose-light text-dpurpose-dark hover:bg-dpurpose-light hover:text-white h-12 bg-transparent"
              >
                <Target className="w-4 h-4 mr-2" />
                Set Preferences
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recommended Grants */}
          <Card className="border-dpurpose-light">
            <CardHeader>
              <CardTitle className="text-dpurpose-dark flex items-center">
                <BookOpen className="w-5 h-5 mr-2" />
                Recommended Grants
              </CardTitle>
              <CardDescription>Government grants that match your profile</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recommendedGrants.map((grant) => (
                <div
                  key={grant.id}
                  className="border border-dpurpose-light rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gray-900">{grant.name}</h3>
                    <Badge className="bg-dpurpose-light text-white">{grant.category}</Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{grant.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-dpurpose-dark">{grant.amount}</span>
                    <Button size="sm" className="bg-dpurpose-gradient hover:opacity-90">
                      View Details
                      <ArrowRight className="w-3 h-3 ml-1" />
                    </Button>
                  </div>
                </div>
              ))}
              <Link href="/grants">
                <Button
                  variant="outline"
                  className="w-full border-dpurpose-light text-dpurpose-dark hover:bg-dpurpose-light hover:text-white bg-transparent"
                >
                  View All Grants
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Recommended Loans */}
          <Card className="border-dpurpose-light">
            <CardHeader>
              <CardTitle className="text-dpurpose-dark flex items-center">
                <DollarSign className="w-5 h-5 mr-2" />
                Recommended Loans
              </CardTitle>
              <CardDescription>Bank loans with competitive rates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recommendedLoans.map((loan) => (
                <div
                  key={loan.id}
                  className="border border-dpurpose-light rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gray-900">{loan.name}</h3>
                    <Badge
                      className={loan.bankType === "Public" ? "bg-dpurpose-light text-white" : "bg-gray-600 text-white"}
                    >
                      {loan.bankType}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{loan.description}</p>
                  <div className="flex justify-between items-center">
                    <div className="text-sm">
                      <span className="font-medium text-dpurpose-dark">{loan.amount}</span>
                      <span className="text-gray-500 ml-2">@ {loan.interestRate}</span>
                    </div>
                    <Button size="sm" className="bg-dpurpose-gradient hover:opacity-90">
                      View Details
                      <ArrowRight className="w-3 h-3 ml-1" />
                    </Button>
                  </div>
                </div>
              ))}
              <Link href="/loans">
                <Button
                  variant="outline"
                  className="w-full border-dpurpose-light text-dpurpose-dark hover:bg-dpurpose-light hover:text-white bg-transparent"
                >
                  View All Loans
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="mt-8 border-dpurpose-light">
          <CardHeader>
            <CardTitle className="text-dpurpose-dark">Recent Activity</CardTitle>
            <CardDescription>Your latest interactions and updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Account created successfully</p>
                  <p className="text-xs text-gray-500">Welcome to Dpurpose Foundation!</p>
                </div>
                <span className="text-xs text-gray-500">Just now</span>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">New grants available</p>
                  <p className="text-xs text-gray-500">3 new government schemes match your profile</p>
                </div>
                <span className="text-xs text-gray-500">2 hours ago</span>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Profile optimization tip</p>
                  <p className="text-xs text-gray-500">Complete your business details for better recommendations</p>
                </div>
                <span className="text-xs text-gray-500">1 day ago</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
