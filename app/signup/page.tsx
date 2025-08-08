'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { signup } from '@/app/actions/auth'
import { Leaf, ArrowLeft, Check, Loader2 } from 'lucide-react'
import { useAuth } from '@/components/auth-provider'
import { useRouter } from 'next/navigation'

export default function SignupPage() {
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [userType, setUserType] = useState('')
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!authLoading && user) {
      router.push('/dashboard')
    }
  }, [user, authLoading, router])

  async function handleSubmit(formData: FormData) {
    setLoading(true)
    setError('')
    
    // Append userType to formData
    formData.append('userType', userType);

    const result = await signup(formData)
    
    if (result?.error) {
      setError(result.error)
      setLoading(false)
    }
  }

  const features = [
    'Access to 10,000+ government schemes',
    'State and district-wise search',
    'Bank loan comparisons',
    'AI-powered recommendations',
    'Application tracking',
    'Expert support'
  ]

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-dpurpose-dark" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left side - Features */}
        <div className="hidden lg:block">
          <div className="flex items-center space-x-2 mb-6">
            <div className="w-10 h-10 bg-dpurpose-dark rounded-lg flex items-center justify-center">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-dpurpose-dark">DPurpose Foundation</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Empowering the Purposeful Hearts
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Brilliant ideas are everywhere, but access to funding, mentorship, and resources isn't. 
            We change that by connecting you with the right opportunities.
          </p>
          <div className="space-y-3">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="w-5 h-5 bg-dpurpose-dark rounded-full flex items-center justify-center">
                  <Check className="w-3 h-3 text-white" />
                </div>
                <span className="text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right side - Form */}
        <div className="w-full max-w-md mx-auto">
          <div className="text-center mb-8 lg:hidden">
            <Link href="/" className="inline-flex items-center text-sm text-gray-600 hover:text-dpurpose-dark mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-dpurpose-dark rounded-lg flex items-center justify-center">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-dpurpose-dark">DPurpose Foundation</span>
            </div>
          </div>

          <Card className="border-0 shadow-xl">
            <CardHeader className="space-y-1 pb-6">
              <CardTitle className="text-2xl text-center text-dpurpose-dark">Create Account</CardTitle>
              <CardDescription className="text-center">
                Join thousands who found their perfect funding
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form action={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter your full name"
                    required
                    className="focus:border-dpurpose-dark focus:ring-dpurpose-dark"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                    required
                    className="focus:border-dpurpose-dark focus:ring-dpurpose-dark"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Create a strong password"
                    required
                    className="focus:border-dpurpose-dark focus:ring-dpurpose-dark"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    required
                    className="focus:border-dpurpose-dark focus:ring-dpurpose-dark"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number (Optional)</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="Enter your phone number"
                    className="focus:border-dpurpose-dark focus:ring-dpurpose-dark"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="userType">I am a</Label>
                  <Select value={userType} onValueChange={setUserType}>
                    <SelectTrigger className="focus:border-dpurpose-dark focus:ring-dpurpose-dark">
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="entrepreneur">Entrepreneur</SelectItem>
                      <SelectItem value="startup">Startup Founder</SelectItem>
                      <SelectItem value="business_owner">Business Owner</SelectItem>
                      <SelectItem value="student">Student</SelectItem>
                      <SelectItem value="researcher">Researcher</SelectItem>
                      <SelectItem value="ngo">NGO Representative</SelectItem>
                      <SelectItem value="consultant">Consultant</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="organization">Organization (Optional)</Label>
                  <Input
                    id="organization"
                    name="organization"
                    type="text"
                    placeholder="Enter your organization name"
                    className="focus:border-dpurpose-dark focus:ring-dpurpose-dark"
                  />
                </div>
                
                {error && (
                  <div className="text-red-600 text-sm bg-red-50 p-3 rounded-md border border-red-200">
                    {error}
                  </div>
                )}

                <Button 
                  type="submit" 
                  className="w-full bg-dpurpose-dark hover:bg-dpurpose-dark/90 text-white"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating Account...
                    </>
                  ) : (
                    'Create Account'
                  )}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  Already have an account?{' '}
                  <Link href="/login" className="text-dpurpose-dark hover:underline font-medium">
                    Sign in
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="mt-8 text-center">
            <p className="text-xs text-gray-500">
              By creating an account, you agree to our{' '}
              <a href="#" className="text-dpurpose-dark hover:underline">Terms of Service</a>
              {' '}and{' '}
              <a href="#" className="text-dpurpose-dark hover:underline">Privacy Policy</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
