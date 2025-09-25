"use client";
import React, { useEffect, useState } from 'react';

import { 
  FileText, 
  Download, 
  Clock, 
  CheckCircle,
  XCircle,
  PlusCircle, 
  LogOut, 
  BookOpen,
  BarChart3,
  MessageSquare,
  User,
  Save,
  X
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import styles from "@/components/styles/DashboardStyles.module.css";
import DashNavBar from './DashboardNav';
import DigitalLibrary from './DigitalLibrary';
import { useDatabase } from '@/context/Database';
import { useSession } from 'next-auth/react';
const voucher_codes = require("voucher-code-generator");

const generateCode = (prefix: string) => {
  return voucher_codes.generate({
    count: 1,
    prefix,
    length: 10,
    charset:"alphabetic"
  })[0].toUpperCase();
}

interface Stat {
  title: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

interface Download {
  name: string;
  date: string;
  size: string;
  type: string;
}

interface Article {
  id: string;
  title: string;
  status: 'approved' | 'pending' | 'declined';
  submittedAt: string;
  views: number;
  category: string;
  content?: string;
  reason?: string;
  grade?: string;
  author?: string;
}

interface NewArticle {
  title: string;
  category: string;
  paragraphs: string[];
  summary: string;
}

const AdminDashboard = () => {
  const {posts} = useDatabase();
  const {data: session } = useSession();

  const [activeView, setActiveView] = useState<string>('dashboard');
  const [showNewArticleForm, setShowNewArticleForm] = useState<boolean>(false);
  const [newArticle, setNewArticle] = useState<NewArticle>({
    title: '',
    category: '',
    paragraphs: [''],
    summary: ''
  });

 

  const [articles, setArticles] = useState<Article[]>()

  const stats: Stat[] = [
    { title: 'Total Downloads', value: '23', icon: Download, color: 'text-blue-600' },
    { title: 'Articles Posted', value: '8', icon: FileText, color: 'text-green-600' },
    { title: 'Pending Approval', value: '2', icon: Clock, color: 'text-orange-600' },
    { title: 'Approved Articles', value: '5', icon: CheckCircle, color: 'text-purple-600' }
  ];

  const downloads: Download[] = [
    { name: 'Term 2 Exam Guidelines.pdf', date: '2 days ago', size: '2.4 MB', type: 'PDF' },
    { name: 'Mathematics Study Notes.pdf', date: '1 week ago', size: '1.8 MB', type: 'PDF' },
    { name: 'Science Lab Manual.docx', date: '2 weeks ago', size: '3.2 MB', type: 'DOCX' },
    { name: 'History Assignment Template.pdf', date: '3 weeks ago', size: '890 KB', type: 'PDF' },
    { name: 'English Literature Notes.pdf', date: '1 month ago', size: '2.1 MB', type: 'PDF' }
  ];


  const handleSubmitArticle = async (): Promise<void> => {
    if (!newArticle.title || !newArticle.category || newArticle.paragraphs.some(p => p.trim() === '')) {
      alert('Please fill in all required fields and ensure all paragraphs have content');
      return;
    }

    const articleToAdd: Article = {
      ...newArticle,
      id: generateCode('ARTICLE-'),
      content: newArticle.paragraphs.join('\n\n'), // Convert paragraphs to content for display
      status: 'pending',
      submittedAt: new Date().toLocaleString(),
      views: 0,
      grade: (session?.user as { grade: string | undefined })?.grade || '',
      author: session?.user?.name || '',
      reason: ""
    };

    await fetch('/api/upload-article', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(articleToAdd)

    })
      setArticles([articleToAdd, ...posts]);
      setNewArticle({ title: '', category: '', paragraphs: [''], summary: '' });
      setShowNewArticleForm(false);

    // Show success message
    alert('Article submitted successfully! It will be reviewed shortly.');
  };

  const handleCancelArticle = (): void => {
    setNewArticle({ title: '', category: '', paragraphs: [''], summary: '' });
    setShowNewArticleForm(false);
  };

  const addParagraph = (): void => {
    setNewArticle({
      ...newArticle,
      paragraphs: [...newArticle.paragraphs, '']
    });
  };

  const removeParagraph = (index: number): void => {
    if (newArticle.paragraphs.length > 1) {
      const updatedParagraphs = newArticle.paragraphs.filter((_, i) => i !== index);
      setNewArticle({
        ...newArticle,
        paragraphs: updatedParagraphs
      });
    }
  };

  const updateParagraph = (index: number, value: string): void => {
    const lines = value.split('\n');
    if (lines.length > 6) {
      alert('Each paragraph is limited to 6 lines. Please split longer content into multiple paragraphs.');
      return;
    }
    
    const updatedParagraphs = [...newArticle.paragraphs];
    updatedParagraphs[index] = value;
    setNewArticle({
      ...newArticle,
      paragraphs: updatedParagraphs
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-orange-600" />;
      case 'declined':
        return <XCircle className="w-4 h-4 text-red-600" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-orange-100 text-orange-800';
      case 'declined':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const renderDownloadsView = (): React.ReactNode => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Download className="w-5 h-5 mr-2" />
            Recent Downloads
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {downloads.map((download, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center space-x-3">
                  <FileText className="w-8 h-8 text-blue-600" />
                  <div>
                    <h4 className="font-medium">{download.name}</h4>
                    <p className="text-sm text-gray-500">Downloaded {download.date} • {download.size}</p>
                  </div>
                </div>
                <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                  {download.type}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderNewsView = (): React.ReactNode => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">My Articles</h2>
        <Button 
          className="bg-red-800 hover:bg-red-900"
          onClick={() => setShowNewArticleForm(true)}
        >
          <PlusCircle className="w-4 h-4 mr-2" />
          New Article
        </Button>
      </div>

      {showNewArticleForm && (
        <Card>
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              Create New Article
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleCancelArticle}
              >
                <X className="w-4 h-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Title *</label>
                <Input
                  placeholder="Enter article title"
                  value={newArticle.title}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewArticle({...newArticle, title: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Category *</label>
                <Select 
                  value={newArticle.category} 
                  onValueChange={(value: string) => setNewArticle({...newArticle, category: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Academics">Academics</SelectItem>
                    <SelectItem value="Sports">Sports</SelectItem>
                    <SelectItem value="Arts">Arts</SelectItem>
                    <SelectItem value="Environment">Environment</SelectItem>
                    <SelectItem value="Technology">Technology</SelectItem>
                    <SelectItem value="Community">Community</SelectItem>
                    <SelectItem value="Events">Events</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Summary</label>
                <Textarea
                  placeholder="Brief summary of your article (optional)"
                  value={newArticle.summary}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNewArticle({...newArticle, summary: e.target.value})}
                  rows={2}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Article Content *</label>
                <div className="space-y-4">
                  {newArticle.paragraphs.map((paragraph, index) => (
                    <div key={index} className="border rounded-lg p-4 bg-gray-50">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700">
                          Paragraph {index + 1}
                        </span>
                        <div className="flex space-x-2">
                          {newArticle.paragraphs.length > 1 && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => removeParagraph(index)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <X className="w-3 h-3" />
                            </Button>
                          )}
                        </div>
                      </div>
                      <Textarea
                        placeholder={`Write paragraph ${index + 1} here... (Max 6 lines)`}
                        value={paragraph}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => updateParagraph(index, e.target.value)}
                        rows={4}
                        className="resize-none"
                      />
                      <div className="mt-1 text-xs text-gray-500">
                        Lines: {paragraph.split('\n').length}/6
                      </div>
                    </div>
                  ))}
                  
                  <Button
                    variant="outline"
                    onClick={addParagraph}
                    className="w-full border-dashed border-2 hover:bg-gray-50"
                  >
                    <PlusCircle className="w-4 h-4 mr-2" />
                    Add New Paragraph
                  </Button>
                </div>
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={handleCancelArticle}>
                  Cancel
                </Button>
                <Button className="bg-red-800 hover:bg-red-900" onClick={handleSubmitArticle}>
                  <Save className="w-4 h-4 mr-2" />
                  Submit Article
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Article Status Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {posts.map((article: any, index: number) => (
              <div key={index} className="p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      {getStatusIcon(article.status)}
                      <h4 className="font-medium">{article.title}</h4>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(article.status)}`}>
                        {article.status.charAt(0).toUpperCase() + article.status.slice(1)}
                      </span>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>Category: {article.category}</span>
                      <span>Submitted {article.submittedAt}</span>
                      {article.status === 'approved' && (
                        <span>{article.views} views</span>
                      )}
                    </div>
                    {article.status === 'declined' && article.reason && (
                      <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded text-sm text-red-700">
                        <strong>Reason:</strong> {article.reason}
                      </div>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">Edit</Button>
                    {article.status === 'approved' || article.status === 'published' && (
                      <Button variant="outline" size="sm">View</Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderContent = (): React.ReactNode => {
    switch (activeView) {
      case 'downloads':
        return renderDownloadsView();
      case 'news':
        return renderNewsView();
      case 'library':
        return <DigitalLibrary/>
      default:
        return (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ">
              {stats.map((stat, index) => (
                <Card key={index} className="hover:shadow-lg shadow-sm shadow-gray-100 transition-shadow border-1 border-none bg-white">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                    <stat.icon className={`h-4 w-4 ${stat.color}`} />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  
                  <Button 
                    onClick={() => setActiveView('library')}
                    variant="outline" 
                    className='border-none cursor-pointer shadow-md hover:shadow-sm h-20 bg-white hover:text-red-800 hover:bg-white'
                  >
                    <div className="text-center">
                      <BookOpen className="w-6 h-6 mx-auto mb-2" />
                      <span>Browse Library</span>
                    </div>
                  </Button>
                  
                  <Button 
                    onClick={() => {
                      setActiveView('news');
                      setShowNewArticleForm(true);
                    }} 
                    className='border-none cursor-pointer text-black shadow-md hover:shadow-sm h-20 bg-white hover:text-red-800 hover:bg-white'
                  >
                    <div className="text-center">
                      <PlusCircle className="w-6 h-6 mx-auto mb-2" />
                      <span>Submit Article</span>
                    </div>
                  </Button>

                  <Button 
                    onClick={() => setActiveView('downloads')} 
                    variant="outline" 
                    className='border-none cursor-pointer shadow-md hover:shadow-sm h-20 bg-white hover:text-red-800 hover:bg-white'
                  >
                    <div className="text-center ">
                      <Download className="w-6 h-6 mx-auto mb-2" />
                      <span>View Downloads</span>
                    </div>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm">Article "Inter-house Sports Day Results" was approved</span>
                    <span className="text-xs text-gray-500 ml-auto">3 days ago</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm">Downloaded "Term 2 Exam Guidelines.pdf"</span>
                    <span className="text-xs text-gray-500 ml-auto">2 days ago</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span className="text-sm">Submitted "Science Fair Innovation Showcase" for review</span>
                    <span className="text-xs text-gray-500 ml-auto">1 day ago</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="text-sm">Article "Student Council Election Campaign" needs revision</span>
                    <span className="text-xs text-gray-500 ml-auto">2 weeks ago</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );
    }
  };

  return (
    <div className={`${styles.styles} `}>
      {/* Header */}
      <DashNavBar />  

      <div className="max-w-screen mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-16">
        {/* Navigation */}
        <nav className="flex flex-wrap gap-2 mb-8">
          <Button
            variant={activeView === 'dashboard' ? 'default' : 'outline'}
            onClick={() => setActiveView('dashboard')}
            className={activeView === 'dashboard' ? 'bg-red-800 hover:bg-red-900 text-white' : 'border-none cursor-pointer shadow-md hover:shadow-sm'}
          >
            <BarChart3 className="w-4 h-4 mr-2" />
            Dashboard
          </Button>
          <Button
            variant={activeView === 'library' ? 'default' : 'outline'}
            onClick={() => setActiveView('library')}
            className={activeView === 'library' ? 'bg-red-800 hover:bg-red-900 text-white' : 'border-none cursor-pointer shadow-md hover:shadow-sm'}
          >
            <BookOpen className="w-4 h-4 mr-2" />
            Library
          </Button>
          <Button
            variant={activeView === 'news' ? 'default' : 'outline'}
            onClick={() => setActiveView('news')}
            className={activeView === 'news' ? 'bg-red-800 hover:bg-red-900 text-white' : 'border-none cursor-pointer shadow-md hover:shadow-sm'}
          >
            <FileText className="w-4 h-4 mr-2" />
            My Articles
          </Button>
          <Button
            variant={activeView === 'downloads' ? 'default' : 'outline'}
            onClick={() => setActiveView('downloads')}
            className={activeView === 'downloads' ? 'bg-red-800 hover:bg-red-900 text-white' : 'border-none cursor-pointer shadow-md hover:shadow-sm'}
          >
            <Download className="w-4 h-4 mr-2" />
            Downloads
          </Button>
        </nav>

        {/* Main Content */}
        {renderContent()}
      </div>
    </div>
  );
};

export default AdminDashboard;