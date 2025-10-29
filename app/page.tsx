'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Lock, Shield, Users, Calendar } from 'lucide-react';

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="mx-auto w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-700 rounded-3xl flex items-center justify-center shadow-xl mb-6">
            <Shield className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-slate-900 mb-4">
            POS License Management System
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Secure license verification and management for your POS mobile applications
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <Card className="border-2 hover:border-blue-200 transition-colors">
            <CardHeader>
              <Lock className="h-10 w-10 text-blue-600 mb-2" />
              <CardTitle>Secure Authentication</CardTitle>
              <CardDescription>
                Google OAuth and email/password authentication with JWT tokens
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-2 hover:border-blue-200 transition-colors">
            <CardHeader>
              <Users className="h-10 w-10 text-blue-600 mb-2" />
              <CardTitle>User Management</CardTitle>
              <CardDescription>
                Complete admin panel to manage users, roles, and permissions
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-2 hover:border-blue-200 transition-colors">
            <CardHeader>
              <Calendar className="h-10 w-10 text-blue-600 mb-2" />
              <CardTitle>License Control</CardTitle>
              <CardDescription>
                Set and manage expiration dates for user licenses
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        <div className="text-center">
          <Button
            size="lg"
            onClick={() => router.push('/login')}
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-lg px-8 py-6 shadow-lg"
          >
            <Lock className="mr-2 h-5 w-5" />
            Access Admin Panel
          </Button>
        </div>

        <div className="mt-16 p-8 bg-white rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">API Endpoints</h2>
          <div className="space-y-3 text-left">
            <div className="flex items-start gap-3">
              <code className="px-3 py-1 bg-slate-100 rounded text-sm font-mono">POST /api/auth/google</code>
              <span className="text-slate-600">Authenticate with Google ID token</span>
            </div>
            <div className="flex items-start gap-3">
              <code className="px-3 py-1 bg-slate-100 rounded text-sm font-mono">POST /api/auth/login</code>
              <span className="text-slate-600">Login with email and password</span>
            </div>
            <div className="flex items-start gap-3">
              <code className="px-3 py-1 bg-slate-100 rounded text-sm font-mono">GET /api/auth/verify</code>
              <span className="text-slate-600">Verify JWT token and get user data with expiry</span>
            </div>
            <div className="flex items-start gap-3">
              <code className="px-3 py-1 bg-slate-100 rounded text-sm font-mono">GET /api/admin/users</code>
              <span className="text-slate-600">Get all users (Admin only)</span>
            </div>
            <div className="flex items-start gap-3">
              <code className="px-3 py-1 bg-slate-100 rounded text-sm font-mono">PATCH /api/admin/users/[id]</code>
              <span className="text-slate-600">Update user details (Admin only)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
