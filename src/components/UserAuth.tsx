"use client";
import React, { useState } from 'react';

import { GraduationCap, User, Users } from 'lucide-react';
import { Card } from './ui/card';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';

interface UserAuthProps {
  onLogin: (user: { id: string; email: string; role: 'admin' | 'student' | 'parent'; name: string }) => void;
  onBack: () => void;
}

const UserAuth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    role: 'student' as 'student' | 'parent',
    phone: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isLogin) {
      // Mock login - in real app this would verify credentials
      if (formData.email === 'admin@moreko.edu.za' && formData.password === 'admin123') {
       
      } else {
        // Mock user login
        const role = formData.email.includes('parent') ? 'parent' : 'student';
       
      }
    } else {
      // Mock registration
     
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-white flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 shadow-lg">
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-red-800 rounded-full flex items-center justify-center mb-4">
            <GraduationCap className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Moreko High School</h1>
          <p className="text-gray-600 mt-2">{isLogin ? 'Sign In' : 'Create Account'}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
          </div>

          <Button type="submit" className="w-full bg-red-800 hover:bg-red-900">
            {isLogin ? 'Sign In' : 'Create Account'}
          </Button>
        </form>

        <div className="mt-6 text-center space-y-2">
          <Button
            variant="ghost"
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm text-gray-600"
          >
            {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
          </Button>
          <Button
            variant="ghost"
           
            className="text-sm text-gray-600"
          >
            ← Back to Main Site
          </Button>
        </div>

      </Card>
    </div>
  );
};

export default UserAuth;
