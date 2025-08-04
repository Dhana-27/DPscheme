import { redirect } from "next/navigation"
import { getCurrentUser } from "@/lib/auth"
import { logoutAction } from "@/app/actions/auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Search, TrendingUp, Clock, User, LogOut } from "lucide-react"

export default async function DashboardPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/login")
  }

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
              <span className="text-xl font-bold text-dpurpose-dark">Dpurpose Foundation</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <User className="w-5 h-5 text-dpurpose-dark" />
                <span className="text-dpurpose-dark font-medium">{user.name}</span>
              </div>
              <form action={logoutAction}>
                <Button
                  variant="outline"
                  size="sm"
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
          <p className="text-gray-600">Find the perfect grants and loans for your business needs.</p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Link href="/grants">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer border-dpurpose-light">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-dpurpose-gradient rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Search className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-dpurpose-dark mb-2">Search Grants</h3>
                <p className="text-sm text-gray-600">Find government grants by state and category</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/loans">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer border-dpurpose-light">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-dpurpose-gradient rounded-lg flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-dpurpose-dark mb-2">Search Loans</h3>
                <p className="text-sm text-gray-600">Explore loans from public and private banks</p>
              </CardContent>
            </Card>
          </Link>

          <Card className="hover:shadow-lg transition-shadow border-dpurpose-light">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-dpurpose-gradient rounded-lg flex items-center justify-center mx-auto mb-4">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-dpurpose-dark mb-2">Applications</h3>
              <p className="text-sm text-gray-600">Track your submitted applications</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow border-dpurpose-light">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-dpurpose-gradient rounded-lg flex items-center justify-center mx-auto mb-4">
                <User className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-dpurpose-dark mb-2">Profile</h3>
              <p className="text-sm text-gray-600">Update your business information</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Recommendations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="border-dpurpose-light">
            <CardHeader>
              <CardTitle className="text-dpurpose-dark">Recommended Grants</CardTitle>
              <CardDescription>Based on your profile and preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-l-4 border-dpurpose-light pl-4">
                <h4 className="font-semibold text-dpurpose-dark">PM Mudra Yojana</h4>
                <p className="text-sm text-gray-600 mb-2">Up to ₹10 Lakhs for business development</p>
                <Badge className="bg-dpurpose-light text-white">Central Government</Badge>
              </div>
              <div className="border-l-4 border-dpurpose-light pl-4">
                <h4 className="font-semibold text-dpurpose-dark">Startup India Seed Fund</h4>
                <p className="text-sm text-gray-600 mb-2">Up to ₹50 Lakhs for startups</p>
                <Badge className="bg-dpurpose-light text-white">Central Government</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="border-dpurpose-light">
            <CardHeader>
              <CardTitle className="text-dpurpose-dark">Recommended Loans</CardTitle>
              <CardDescription>Matching your business requirements</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-l-4 border-dpurpose-light pl-4">
                <h4 className="font-semibold text-dpurpose-dark">SBI Business Loan</h4>
                <p className="text-sm text-gray-600 mb-2">Up to ₹50 Lakhs at 8.5% - 12%</p>
                <Badge variant="secondary">Public Bank</Badge>
              </div>
              <div className="border-l-4 border-dpurpose-light pl-4">
                <h4 className="font-semibold text-dpurpose-dark">HDFC Women Entrepreneur Loan</h4>
                <p className="text-sm text-gray-600 mb-2">Up to ₹2 Crores at 9% - 14%</p>
                <Badge variant="secondary">Private Bank</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
