'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/components/auth-provider';
import { logout } from '@/app/actions/auth';
import { importDataFromGoogleDrive, importDataFromCsvUpload } from '@/app/actions/data';
import { getDashboardStats } from '@/lib/database';
import { useRouter } from 'next/navigation';
import { Home, Users, FileText, DollarSign, LogOut, Upload, FileUp, RefreshCw, Loader2, CheckCircle, XCircle, Leaf, ArrowRight, BarChart, Database, CloudUpload, AlertCircle } from 'lucide-react';

interface Stat {
  label: string;
  value: number;
  icon: React.ElementType;
  color: string;
}

export default function DashboardPage() {
  const { user, loading: authLoading, refreshUser } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState({ totalUsers: 0, totalSchemes: 0, totalLoans: 0 });
  const [dataImportLoading, setDataImportLoading] = useState(false);
  const [importMessage, setImportMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [googleDriveFileId, setGoogleDriveFileId] = useState('');
  const [csvUploadContent, setCsvUploadContent] = useState('');
  const [importDataType, setImportDataType] = useState<'schemes' | 'loans'>('schemes');

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user) {
      fetchStats();
    }
  }, [user]);

  const fetchStats = async () => {
    const fetchedStats = await getDashboardStats();
    setStats(fetchedStats);
  };

  const handleGoogleDriveImport = async () => {
    if (!googleDriveFileId) {
      setImportMessage({ type: 'error', text: 'Please enter a Google Drive File ID.' });
      return;
    }
    setDataImportLoading(true);
    setImportMessage(null);
    const result = await importDataFromGoogleDrive(googleDriveFileId, importDataType);
    if (result.success) {
      setImportMessage({ type: 'success', text: result.message });
      setGoogleDriveFileId('');
      fetchStats(); // Refresh stats after import
    } else {
      setImportMessage({ type: 'error', text: result.message });
    }
    setDataImportLoading(false);
  };

  const handleCsvUpload = async () => {
    if (!csvUploadContent) {
      setImportMessage({ type: 'error', text: 'Please paste CSV content.' });
      return;
    }
    setDataImportLoading(true);
    setImportMessage(null);
    const result = await importDataFromCsvUpload(csvUploadContent, importDataType);
    if (result.success) {
      setImportMessage({ type: 'success', text: result.message });
      setCsvUploadContent('');
      fetchStats(); // Refresh stats after import
    } else {
      setImportMessage({ type: 'error', text: result.message });
    }
    setDataImportLoading(false);
  };

  const dashboardStats: Stat[] = [
    { label: 'Total Users', value: stats.totalUsers, icon: Users, color: 'text-blue-600' },
    { label: 'Total Schemes', value: stats.totalSchemes, icon: FileText, color: 'text-green-600' },
    { label: 'Total Loans', value: stats.totalLoans, icon: DollarSign, color: 'text-purple-600' },
  ];

  if (authLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100">
        <Loader2 className="w-8 h-8 animate-spin text-dpurpose-dark" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center text-sm text-gray-600 hover:text-dpurpose-dark">
                <Home className="w-4 h-4 mr-2" />
                Home
              </Link>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-dpurpose-dark rounded-lg flex items-center justify-center">
                  <Leaf className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-dpurpose-dark">DPurpose Foundation</span>
              </div>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/grants" className="text-gray-700 hover:text-dpurpose-dark transition-colors">
                Grants
              </Link>
              <Link href="/loans" className="text-gray-700 hover:text-dpurpose-dark transition-colors">
                Loans
              </Link>
            </nav>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700 text-sm hidden md:block">
                Welcome, {user.name}!
              </span>
              <form action={logout}>
                <Button
                  type="submit"
                  variant="outline"
                  className="border-dpurpose-dark text-dpurpose-dark hover:bg-dpurpose-dark hover:text-white"
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
        {/* Dashboard Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-lg text-gray-600">Manage your profile and import data.</p>
        </div>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 bg-white border border-dpurpose-dark/20">
            <TabsTrigger value="profile" className="data-[state=active]:bg-dpurpose-dark data-[state=active]:text-white">
              <Users className="w-4 h-4 mr-2" />
              My Profile
            </TabsTrigger>
            <TabsTrigger value="data-import" className="data-[state=active]:bg-dpurpose-dark data-[state=active]:text-white">
              <Database className="w-4 h-4 mr-2" />
              Data Import
            </TabsTrigger>
            <TabsTrigger value="stats" className="data-[state=active]:bg-dpurpose-dark data-[state=active]:text-white">
              <BarChart className="w-4 h-4 mr-2" />
              Statistics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="mt-6">
            <Card className="border-dpurpose-dark/20 shadow-lg">
              <CardHeader>
                <CardTitle className="text-dpurpose-dark">User Profile</CardTitle>
                <CardDescription>View and manage your account information.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" value={user.name} readOnly className="bg-gray-50" />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" value={user.email} readOnly className="bg-gray-50" />
                </div>
                <div>
                  <Label htmlFor="userType">User Type</Label>
                  <Input id="userType" value={user.user_type || 'N/A'} readOnly className="bg-gray-50" />
                </div>
                {user.organization && (
                  <div>
                    <Label htmlFor="organization">Organization</Label>
                    <Input id="organization" value={user.organization} readOnly className="bg-gray-50" />
                  </div>
                )}
                <div>
                  <Label htmlFor="memberSince">Member Since</Label>
                  <Input id="memberSince" value={new Date(user.createdAt).toLocaleDateString()} readOnly className="bg-gray-50" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="data-import" className="mt-6">
            <Card className="border-dpurpose-dark/20 shadow-lg">
              <CardHeader>
                <CardTitle className="text-dpurpose-dark">Import Data</CardTitle>
                <CardDescription>Import schemes or loans data from Google Drive or CSV upload.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="importDataType">Data Type</Label>
                  <Select value={importDataType} onValueChange={(value: 'schemes' | 'loans') => setImportDataType(value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select data type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="schemes">Government Schemes</SelectItem>
                      <SelectItem value="loans">Bank Loans</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {importMessage && (
                  <div className={`flex items-center p-3 rounded-md border ${importMessage.type === 'success' ? 'bg-green-50 border-green-200 text-green-700' : 'bg-red-50 border-red-200 text-red-700'}`}>
                    {importMessage.type === 'success' ? <CheckCircle className="w-5 h-5 mr-2" /> : <AlertCircle className="w-5 h-5 mr-2" />}
                    <p className="text-sm">{importMessage.text}</p>
                  </div>
                )}

                {/* Google Drive Import */}
                <div className="space-y-4 border p-4 rounded-md bg-gray-50">
                  <h3 className="text-lg font-semibold flex items-center text-dpurpose-dark">
                    <CloudUpload className="w-5 h-5 mr-2" />
                    Import from Google Drive
                  </h3>
                  <p className="text-sm text-gray-600">
                    Enter the Google Drive File ID of your CSV file. Ensure the file is publicly accessible.
                  </p>
                  <div>
                    <Label htmlFor="googleDriveFileId">Google Drive File ID</Label>
                    <Input
                      id="googleDriveFileId"
                      placeholder="e.g., 1a2b3c4d5e6f7g8h9i0jklmn"
                      value={googleDriveFileId}
                      onChange={(e) => setGoogleDriveFileId(e.target.value)}
                      disabled={dataImportLoading}
                      className="focus:border-dpurpose-dark focus:ring-dpurpose-dark"
                    />
                  </div>
                  <Button
                    onClick={handleGoogleDriveImport}
                    disabled={dataImportLoading || !googleDriveFileId}
                    className="w-full bg-dpurpose-dark hover:bg-dpurpose-dark/90 text-white"
                  >
                    {dataImportLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Importing...
                      </>
                    ) : (
                      <>
                        <Upload className="mr-2 h-4 w-4" />
                        Import from Google Drive
                      </>
                    )}
                  </Button>
                </div>

                {/* CSV Upload */}
                <div className="space-y-4 border p-4 rounded-md bg-gray-50">
                  <h3 className="text-lg font-semibold flex items-center text-dpurpose-dark">
                    <FileUp className="w-5 h-5 mr-2" />
                    Upload CSV Content
                  </h3>
                  <p className="text-sm text-gray-600">
                    Paste the raw CSV content directly into the text area.
                  </p>
                  <div>
                    <Label htmlFor="csvContent">CSV Content</Label>
                    <Textarea
                      id="csvContent"
                      placeholder="Paste your CSV data here..."
                      rows={8}
                      value={csvUploadContent}
                      onChange={(e) => setCsvUploadContent(e.target.value)}
                      disabled={dataImportLoading}
                      className="focus:border-dpurpose-dark focus:ring-dpurpose-dark"
                    />
                  </div>
                  <Button
                    onClick={handleCsvUpload}
                    disabled={dataImportLoading || !csvUploadContent}
                    className="w-full bg-dpurpose-dark hover:bg-dpurpose-dark/90 text-white"
                  >
                    {dataImportLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Uploading...
                      </>
                    ) : (
                      <>
                        <FileUp className="mr-2 h-4 w-4" />
                        Upload CSV
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="stats" className="mt-6">
            <Card className="border-dpurpose-dark/20 shadow-lg">
              <CardHeader>
                <CardTitle className="text-dpurpose-dark">Platform Statistics</CardTitle>
                <CardDescription>Overview of data on the DPurpose Foundation platform.</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {dashboardStats.map((stat, index) => (
                  <Card key={index} className="text-center p-4 border-dpurpose-dark/10">
                    <CardContent className="flex flex-col items-center justify-center">
                      <div className={`p-3 rounded-full bg-gray-100 mb-3 ${stat.color}`}>
                        <stat.icon className="w-6 h-6" />
                      </div>
                      <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                      <div className="text-gray-600">{stat.label}</div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
