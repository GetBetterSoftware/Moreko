"use client";
import React, { useState } from 'react';

import { 
  FileText, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Eye,
  User,
  Calendar
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';

const ContentApproval = () => {
  const [submissions, setSubmissions] = useState([
    {
      id: '1',
      title: 'Inter-house Sports Championship Results',
      content: 'Red House emerged victorious in this year\'s inter-house sports championship, followed closely by Blue House. The competition was fierce with record-breaking performances in athletics and swimming events...',
      author: 'Thabo Molefe',
      grade: '11A',
      category: 'Sports',
      submittedAt: '2024-01-22 14:30',
      status: 'pending'
    },
    {
      id: '2',
      title: 'Science Fair Innovation Showcase',
      content: 'Grade 10 students presented groundbreaking projects at the annual science fair. Notable innovations included a water purification system and solar-powered charging station designed by local students...',
      author: 'Nomsa Khumalo',
      grade: '10B',
      category: 'Academic',
      submittedAt: '2024-01-21 09:15',
      status: 'pending'
    },
    {
      id: '3',
      title: 'Cultural Heritage Day Celebrations',
      content: 'Students and staff celebrated South African diversity through traditional music, dance, and food. The event highlighted the rich cultural tapestry of our school community...',
      author: 'Sipho Mthembu',
      grade: '9C',
      category: 'Cultural',
      submittedAt: '2024-01-20 16:45',
      status: 'approved'
    },
    {
      id: '4',
      title: 'Environmental Club Tree Planting Initiative',
      content: 'The Environmental Club successfully planted 50 indigenous trees around the school grounds as part of our sustainability initiative...',
      author: 'Lesego Phiri',
      grade: '12A',
      category: 'Community',
      submittedAt: '2024-01-19 11:20',
      status: 'rejected'
    }
  ]);

  const [selectedSubmission, setSelectedSubmission] = useState(null);

  const handleApproval = (id: string, status: 'approved' | 'rejected') => {
    setSubmissions(prev => prev.map(sub => 
      sub.id === id ? { ...sub, status } : sub
    ));
    setSelectedSubmission(null);
    console.log(`Article ${id} ${status}`);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'approved':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'rejected':
        return <XCircle className="w-4 h-4 text-red-600" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const pendingCount = submissions.filter(sub => sub.status === 'pending').length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Content Approval</h2>
          <p className="text-gray-600">Review and approve student-submitted articles</p>
        </div>
        <div className="flex items-center space-x-2 px-4 py-2 bg-yellow-100 rounded-lg">
          <Clock className="w-5 h-5 text-yellow-600" />
          <span className="font-medium text-yellow-800">{pendingCount} pending approval</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Submitted Articles</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {submissions.map((submission) => (
                  <div key={submission.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-1">{submission.title}</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                          <span className="flex items-center">
                            <User className="w-4 h-4 mr-1" />
                            {submission.author} ({submission.grade})
                          </span>
                          <span className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {submission.submittedAt}
                          </span>
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                            {submission.category}
                          </span>
                        </div>
                        <p className="text-gray-700 line-clamp-2">{submission.content}</p>
                      </div>
                      <div className="flex items-center space-x-2 ml-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center ${getStatusColor(submission.status)}`}>
                          {getStatusIcon(submission.status)}
                          <span className="ml-1 capitalize">{submission.status}</span>
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                       
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        Review
                      </Button>
                      
                      {submission.status === 'pending' && (
                        <>
                          <Button
                            size="sm"
                            className="bg-green-600 hover:bg-green-700"
                            onClick={() => handleApproval(submission.id, 'approved')}
                          >
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleApproval(submission.id, 'rejected')}
                          >
                            <XCircle className="w-4 h-4 mr-1" />
                            Reject
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          {selectedSubmission ? (
            <Card>
              <CardHeader>
                <CardTitle>Article Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">SIZO DEVELOPS</h3>
                    <div className="text-sm text-gray-600 mb-4">
                      <p>By:Sizo</p>
                      <p>Category: This</p>
                      <p>Submitted: Date</p>
                    </div>
                  </div>
                  
                  <div className="prose prose-sm">
                    <p className="text-gray-700 leading-relaxed">This is the content that was here before</p>
                  </div>
                  
                  {"pending" === 'pending' && (
                    <div className="flex space-x-2 pt-4 border-t">
                      <Button
                        className="flex-1 bg-green-600 hover:bg-green-700"
                        onClick={() => handleApproval("334", 'approved')}
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Approve & Publish
                      </Button>
                      <Button
                        className="flex-1"
                        variant="destructive"
                        onClick={() => handleApproval("334", 'rejected')}
                      >
                        <XCircle className="w-4 h-4 mr-2" />
                        Reject
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <FileText className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-semibold mb-2">Select an Article</h3>
                <p className="text-gray-600">Choose an article from the list to review and preview it here.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContentApproval;
