"use client";
import React, { useState } from 'react';
import { GraduationCap, User, Users } from 'lucide-react';

interface UserAuthProps {
  onLogin: (user: { id: string; email: string; role: 'admin' | 'student' | 'parent'; name: string }) => void;
  onBack: () => void;
}

const UserAuth = ({ onLogin, onBack }: UserAuthProps) => {
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
      if (formData.email === 'admin@moreko.edu.za' && formData.password === 'admin123') {
        onLogin({ id: '1', email: formData.email, role: 'admin', name: 'Administrator' });
      } else {
        const role = formData.email.includes('parent') ? 'parent' : 'student';
        onLogin({
          id: Date.now().toString(),
          email: formData.email,
          role,
          name: formData.name || 'User',
        });
      }
    } else {
      onLogin({
        id: Date.now().toString(),
        email: formData.email,
        role: formData.role,
        name: formData.name,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-red-800 rounded-full flex items-center justify-center mb-4">
            <GraduationCap className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Moreko High School</h1>
          <p className="text-gray-600 mt-2">{isLogin ? 'Sign In' : 'Create Account'}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
            <>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                <input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  className="w-full mt-1 border rounded-md p-2 focus:ring-red-500 focus:border-red-500"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">I am a:</label>
                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, role: 'student' })}
                    className={`flex-1 flex items-center justify-center px-4 py-2 border rounded-md ${
                      formData.role === 'student' ? 'bg-red-800 text-white' : 'border-gray-300 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <User className="w-4 h-4 mr-2" />
                    Student
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, role: 'parent' })}
                    className={`flex-1 flex items-center justify-center px-4 py-2 border rounded-md ${
                      formData.role === 'parent' ? 'bg-red-800 text-white' : 'border-gray-300 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Users className="w-4 h-4 mr-2" />
                    Parent
                  </button>
                </div>
              </div>

              {formData.role === 'parent' && (
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                  <input
                    id="phone"
                    type="tel"
                    placeholder="+27 81 234 5678"
                    className="w-full mt-1 border rounded-md p-2 focus:ring-red-500 focus:border-red-500"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              )}
            </>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="w-full mt-1 border rounded-md p-2 focus:ring-red-500 focus:border-red-500"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              className="w-full mt-1 border rounded-md p-2 focus:ring-red-500 focus:border-red-500"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-red-800 hover:bg-red-900 text-white font-semibold rounded-md"
          >
            {isLogin ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <div className="mt-6 text-center space-y-2">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm text-gray-600 hover:underline"
          >
            {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
          </button>
          <button
            onClick={onBack}
            className="text-sm text-gray-600 hover:underline block"
          >
            ← Back to Main Site
          </button>
        </div>

        {isLogin && (
          <div className="mt-4 p-3 bg-gray-50 rounded text-sm text-gray-600">
            <p><strong>Demo credentials:</strong></p>
            <p>Admin: admin@moreko.edu.za / admin123</p>
            <p>Or register as Student/Parent</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserAuth;
