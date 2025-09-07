"use client";
import React, { useState } from 'react';

import { 
  User, 
  Bell, 
  FileText, 
  Send, 
  Settings,
  LogOut,
  Plus,
  Eye,
  Download
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Input } from './ui/input';

interface User {
  id: string;
  email: string;
  role: 'admin' | 'student' | 'parent';
  name: string;
}

interface UserDashboardProps {
  user: User;
  onLogout: () => void;
}

const UserDashboard = ({ user, onLogout }: UserDashboardProps) => {
  const [activeView, setActiveView] = useState('dashboard');
  const [subscriptions, setSubscriptions] = useState({
    sms: true,
    email: true
  });
  const [articleSubmission, setArticleSubmission] = useState({
    title: '',
    content: '',
    category: 'sports'
  });

  const [submissions] = useState([
    {
      id: '1',
      title: 'Inter-house Sports Results',
      status: 'pending',
      submittedAt: '2024-01-20',
      category: 'Sports'
    },
    {
      id: '2',
      title: 'Science Fair Achievements',
      status: 'approved',
      submittedAt: '2024-01-18',
      category: 'Academic'
    }
  ]);

  const handleSubmitArticle = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Article submitted:', articleSubmission);
    alert('Article submitted for review!');
    setArticleSubmission({ title: '', content: '', category: 'sports' });
  };

  const handleSubscriptionChange = (type: 'sms' | 'email') => {
    setSubscriptions(prev => ({ ...prev, [type]: !prev[type] }));
  };

  const renderContent = () => {
    switch (activeView) {
      case 'subscribe':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Communication Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">SMS Notifications</h3>
                    <p className="text-sm text-gray-600">Receive important updates via SMS</p>
                  </div>
                  <Button
                    variant={subscriptions.sms ? 'default' : 'outline'}
                    onClick={() => handleSubscriptionChange('sms')}
                  >
                    {subscriptions.sms ? 'Subscribed' : 'Subscribe'}
                  </Button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Email Newsletters</h3>
                    <p className="text-sm text-gray-600">Get newsletters and announcements via email</p>
                  </div>
                  <Button
                    variant={subscriptions.email ? 'default' : 'outline'}
                    onClick={() => handleSubscriptionChange('email')}
                  >
                    {subscriptions.email ? 'Subscribed' : 'Subscribe'}
                  </Button>
                </div>
              </div>
              
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Current subscriptions:</strong> You will receive notifications about school meetings, 
                  events, exam schedules, and important announcements.
                </p>
              </div>
            </CardContent>
          </Card>
        );

      case 'submit':
        if (user.role === 'parent') {
          return (
            <Card>
              <CardContent className="p-8 text-center">
                <FileText className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-semibold mb-2">Content Submission</h3>
                <p className="text-gray-600">Content submission is available for students only.</p>
              </CardContent>
            </Card>
          );
        }

        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Submit Article</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmitArticle} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Article Title</Label>
                    <Input
                      id="title"
                      placeholder="Enter article title"
                      value={articleSubmission.title}
                      onChange={(e) => setArticleSubmission({...articleSubmission, title: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <select
                      id="category"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      value={articleSubmission.category}
                      onChange={(e) => setArticleSubmission({...articleSubmission, category: e.target.value})}
                    >
                      <option value="sports">Sports</option>
                      <option value="academic">Academic</option>
                      <option value="cultural">Cultural</option>
                      <option value="community">Community</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="content">Article Content</Label>
                    <textarea
                      id="content"
                      rows={6}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      placeholder="Write your article content here..."
                      value={articleSubmission.content}
                      onChange={(e) => setArticleSubmission({...articleSubmission, content: e.target.value})}
                      required
                    />
                  </div>
                  
                  <Button type="submit" className="bg-red-800 hover:bg-red-900">
                    <Send className="w-4 h-4 mr-2" />
                    Submit for Review
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>My Submissions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {submissions.map((submission) => (
                    <div key={submission.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-medium">{submission.title}</h3>
                        <p className="text-sm text-gray-600">{submission.category} • {submission.submittedAt}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded text-xs ${
                          submission.status === 'approved' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {submission.status}
                        </span>
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Subscriptions</CardTitle>
                  <Bell className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {Object.values(subscriptions).filter(Boolean).length}
                  </div>
                  <p className="text-xs text-muted-foreground">Active notifications</p>
                </CardContent>
              </Card>

              {user.role === 'student' && (
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">My Articles</CardTitle>
                    <FileText className="h-4 w-4 text-green-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{submissions.length}</div>
                    <p className="text-xs text-muted-foreground">Submitted articles</p>
                  </CardContent>
                </Card>
              )}

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Downloads</CardTitle>
                  <Download className="h-4 w-4 text-purple-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">15</div>
                  <p className="text-xs text-muted-foreground">Resources downloaded</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Welcome, {user.name}!</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  You're logged in as a <strong>{user.role}</strong>. Use the navigation above to:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li>Manage your communication preferences</li>
                  {user.role === 'student' && <li>Submit articles for the school magazine</li>}
                  <li>Access the digital library and resources</li>
                  <li>Stay updated with school news and events</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-red-800 rounded-lg flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">Student Portal</h1>
                <p className="text-sm text-gray-500">{user.name} ({user.role})</p>
              </div>
            </div>
            <Button variant="outline" onClick={onLogout} className="flex items-center space-x-2">
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <nav className="flex space-x-4 mb-8">
          <Button
            variant={activeView === 'dashboard' ? 'default' : 'outline'}
            onClick={() => setActiveView('dashboard')}
            className={activeView === 'dashboard' ? 'bg-red-800 hover:bg-red-900' : ''}
          >
            <User className="w-4 h-4 mr-2" />
            Dashboard
          </Button>
          <Button
            variant={activeView === 'subscribe' ? 'default' : 'outline'}
            onClick={() => setActiveView('subscribe')}
            className={activeView === 'subscribe' ? 'bg-red-800 hover:bg-red-900' : ''}
          >
            <Bell className="w-4 h-4 mr-2" />
            Subscriptions
          </Button>
          {user.role === 'student' && (
            <Button
              variant={activeView === 'submit' ? 'default' : 'outline'}
              onClick={() => setActiveView('submit')}
              className={activeView === 'submit' ? 'bg-red-800 hover:bg-red-900' : ''}
            >
              <Plus className="w-4 h-4 mr-2" />
              Submit Article
            </Button>
          )}
        </nav>

        {renderContent()}
      </div>
    </div>
  );
};

export default UserDashboard;