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
  X,
  Upload,
  Image as ImageIcon,
  Trash2
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '@/components/ui/button';
import RenderNewsView from './RenderNewsView';
import DigitalLibrary from './DigitalLibrary';
import RenderDownloadsView from './RenderDownloadsView';
const voucher_codes = require("voucher-code-generator");

const RenderContent = ({ activeView , setActiveView,setShowNewArticleForm,stats=[]}:any): React.ReactNode => {
    switch (activeView) {
      case 'downloads':
        return <RenderDownloadsView downloads={[]} />;
      case 'news':
        return <RenderNewsView />;
      case 'library':
        return <DigitalLibrary/>
      default:
        return (
          <div className="space-y-8">
            {/* Stats Grid */}

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

export default RenderContent;