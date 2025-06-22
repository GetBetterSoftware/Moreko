"use client";
import React, { useState } from 'react';

import { 
  PlusCircle, 
  Edit, 
  Trash2, 
  Eye,
  Calendar,
  Image as ImageIcon
} from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Label } from './ui/label';
import { Input } from './ui/input';

const NewsManagement = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [articles] = useState([
    {
      id: 1,
      title: "School receives library grant",
      excerpt: "Moreko High School has been awarded a R50,000 grant to upgrade the school library...",
      date: "2024-01-15",
      status: "published",
      views: 234
    },
    {
      id: 2,
      title: "Grade 12 farewell celebration",
      excerpt: "Our Grade 12 learners celebrated their final year with a memorable farewell ceremony...",
      date: "2024-01-10",
      status: "published",
      views: 156
    },
    {
      id: 3,
      title: "Principal wins teacher's award",
      excerpt: "Mrs. Mogale has been recognized as Outstanding Educator of the Year...",
      date: "2024-01-05",
      status: "draft",
      views: 0
    }
  ]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">News Management</h2>
          <p className="text-gray-600">Create and manage school news articles</p>
        </div>
        <Button 
          onClick={() => setShowAddForm(!showAddForm)} 
          className="bg-red-800 hover:bg-red-900"
        >
          <PlusCircle className="w-4 h-4 mr-2" />
          Add New Article
        </Button>
      </div>

      {/* Add Article Form */}
      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle>Create New Article</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Article Title</Label>
                <Input id="title" placeholder="Enter article title" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="date">Publication Date</Label>
                <Input id="date" type="date" />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="excerpt">Brief Excerpt</Label>
              <Input id="excerpt" placeholder="Short description of the article" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="content">Article Content</Label>
              <textarea
                id="content"
                rows={6}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Write your article content here..."
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="image">Featured Image</Label>
              <Input id="image" type="file" accept="image/*" />
            </div>
            
            <div className="flex space-x-4">
              <Button className="bg-red-800 hover:bg-red-900">Publish Article</Button>
              <Button variant="outline">Save as Draft</Button>
              <Button variant="ghost" onClick={() => setShowAddForm(false)}>Cancel</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Articles List */}
      <div className="grid gap-4">
        {articles.map((article) => (
          <Card key={article.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="text-lg font-semibold">{article.title}</h3>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      article.status === 'published' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {article.status}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-3">{article.excerpt}</p>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{article.date}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Eye className="w-4 h-4" />
                      <span>{article.views} views</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default NewsManagement;
