import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Star, Zap, Crown } from "lucide-react"
import Link from "next/link"

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      {/* Header */}
      <header className="border-b border-green-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">DP</span>
            </div>
            <span className="font-bold text-xl text-green-800">SchemeConnect</span>
          </Link>
          <div className="flex items-center space-x-3">
            <Link href="/login">
              <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50 bg-transparent">
                Login
              </Button>
            </Link>
            <Link href="/signup">
              <Button className="bg-green-600 hover:bg-green-700">Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-green-100 text-green-800 border-green-200">Simple & Transparent Pricing</Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-green-900 mb-6">Choose Your Plan</h1>
          <p className="text-xl text-green-700 max-w-3xl mx-auto">
            Get unlimited access to our comprehensive database of grants and loans. Start your journey to financial
            success today.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Free Plan */}
          <Card className="border-green-200 hover:shadow-lg transition-shadow relative">
            <CardHeader className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Star className="h-6 w-6 text-green-600" />
              </div>
              <CardTitle className="text-green-900 text-2xl">Free</CardTitle>
              <div className="text-4xl font-bold text-green-600 mb-2">₹0</div>
              <CardDescription className="text-green-700">Perfect for exploring our platform</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center text-green-700">
                  <CheckCircle className="h-4 w-4 mr-3 text-green-600" />5 scheme searches per day
                </div>
                <div className="flex items-center text-green-700">
                  <CheckCircle className="h-4 w-4 mr-3 text-green-600" />
                  Basic search filters
                </div>
                <div className="flex items-center text-green-700">
                  <CheckCircle className="h-4 w-4 mr-3 text-green-600" />
                  Limited AI assistant queries
                </div>
                <div className="flex items-center text-green-700">
                  <CheckCircle className="h-4 w-4 mr-3 text-green-600" />
                  Email support
                </div>
              </div>
              <Button className="w-full bg-green-600 hover:bg-green-700 mt-6">Get Started Free</Button>
            </CardContent>
          </Card>

          {/* Monthly Plan */}
          <Card className="border-green-600 border-2 hover:shadow-lg transition-shadow relative">
            <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-green-600">Most Popular</Badge>
            <CardHeader className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Zap className="h-6 w-6 text-green-600" />
              </div>
              <CardTitle className="text-green-900 text-2xl">Monthly</CardTitle>
              <div className="text-4xl font-bold text-green-600 mb-2">
                ₹99
                <span className="text-lg font-normal text-green-700">/month</span>
              </div>
              <CardDescription className="text-green-700">Full access to all features</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center text-green-700">
                  <CheckCircle className="h-4 w-4 mr-3 text-green-600" />
                  Unlimited scheme searches
                </div>
                <div className="flex items-center text-green-700">
                  <CheckCircle className="h-4 w-4 mr-3 text-green-600" />
                  Advanced search filters
                </div>
                <div className="flex items-center text-green-700">
                  <CheckCircle className="h-4 w-4 mr-3 text-green-600" />
                  Full AI assistant access
                </div>
                <div className="flex items-center text-green-700">
                  <CheckCircle className="h-4 w-4 mr-3 text-green-600" />
                  Direct application links
                </div>
                <div className="flex items-center text-green-700">
                  <CheckCircle className="h-4 w-4 mr-3 text-green-600" />
                  Personalized recommendations
                </div>
                <div className="flex items-center text-green-700">
                  <CheckCircle className="h-4 w-4 mr-3 text-green-600" />
                  Priority email support
                </div>
                <div className="flex items-center text-green-700">
                  <CheckCircle className="h-4 w-4 mr-3 text-green-600" />
                  Scheme alerts & notifications
                </div>
              </div>
              <Button className="w-full bg-green-600 hover:bg-green-700 mt-6">Start Monthly Plan</Button>
            </CardContent>
          </Card>

          {/* Yearly Plan */}
          <Card className="border-green-200 hover:shadow-lg transition-shadow relative">
            <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-amber-500">Best Value</Badge>
            <CardHeader className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Crown className="h-6 w-6 text-green-600" />
              </div>
              <CardTitle className="text-green-900 text-2xl">Yearly</CardTitle>
              <div className="text-4xl font-bold text-green-600 mb-2">
                ₹1,500
                <span className="text-lg font-normal text-green-700">/year</span>
              </div>
              <div className="text-sm text-green-600 font-medium">Save ₹688 annually!</div>
              <CardDescription className="text-green-700">Everything in Monthly + exclusive perks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center text-green-700">
                  <CheckCircle className="h-4 w-4 mr-3 text-green-600" />
                  Everything in Monthly plan
                </div>
                <div className="flex items-center text-green-700">
                  <CheckCircle className="h-4 w-4 mr-3 text-green-600" />
                  Priority customer support
                </div>
                <div className="flex items-center text-green-700">
                  <CheckCircle className="h-4 w-4 mr-3 text-green-600" />
                  Early access to new features
                </div>
                <div className="flex items-center text-green-700">
                  <CheckCircle className="h-4 w-4 mr-3 text-green-600" />
                  Dedicated account manager
                </div>
                <div className="flex items-center text-green-700">
                  <CheckCircle className="h-4 w-4 mr-3 text-green-600" />
                  Custom scheme tracking
                </div>
                <div className="flex items-center text-green-700">
                  <CheckCircle className="h-4 w-4 mr-3 text-green-600" />
                  Monthly webinars & training
                </div>
                <div className="flex items-center text-green-700">
                  <CheckCircle className="h-4 w-4 mr-3 text-green-600" />
                  API access (coming soon)
                </div>
              </div>
              <Button className="w-full bg-green-600 hover:bg-green-700 mt-6">Start Yearly Plan</Button>
            </CardContent>
          </Card>
        </div>

        {/* FAQ Section */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-center text-green-900 mb-12">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-green-900 mb-2">Can I cancel my subscription anytime?</h3>
                <p className="text-green-700">
                  Yes, you can cancel your subscription at any time. You'll continue to have access until the end of
                  your billing period.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-green-900 mb-2">Is there a free trial available?</h3>
                <p className="text-green-700">
                  We offer a free plan with limited features. You can upgrade to a paid plan anytime to unlock full
                  access.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-green-900 mb-2">How often is the database updated?</h3>
                <p className="text-green-700">
                  Our database is updated daily with new schemes and changes to existing ones. You'll always have access
                  to the latest information.
                </p>
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-green-900 mb-2">What payment methods do you accept?</h3>
                <p className="text-green-700">
                  We accept all major credit cards, debit cards, UPI, net banking, and digital wallets.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-green-900 mb-2">Do you offer refunds?</h3>
                <p className="text-green-700">
                  We offer a 7-day money-back guarantee for all paid plans. Contact our support team if you're not
                  satisfied.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-green-900 mb-2">Is my data secure?</h3>
                <p className="text-green-700">
                  Yes, we use industry-standard encryption and security measures to protect your personal information
                  and data.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center bg-green-600 rounded-2xl p-12">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Find Your Perfect Scheme?</h2>
          <p className="text-green-100 mb-8 max-w-2xl mx-auto">
            Join thousands of users who have successfully found funding through our platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" className="bg-white text-green-600 hover:bg-green-50">
                Start Free Today
              </Button>
            </Link>
            <Link href="/search">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-green-600 bg-transparent"
              >
                Browse Schemes
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
