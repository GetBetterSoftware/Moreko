"use client";
import React, { useState } from 'react';

import { 
  Upload, 
  Image as ImageIcon, 
  Trash2,
  Edit,
  Eye
} from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Label } from './ui/label';
import { Input } from './ui/input';

const GalleryManagement = () => {
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [galleries] = useState([
    {
      id: 1,
      title: "Sports Day 2024",
      description: "Annual sports day celebration with various athletic events",
      imageCount: 24,
      coverImage: "/placeholder.svg",
      date: "2024-01-15"
    },
    {
      id: 2,
      title: "Science Fair Winners",
      description: "Celebrating our talented science fair participants and winners",
      imageCount: 18,
      coverImage: "/placeholder.svg",
      date: "2024-01-10"
    },
    {
      id: 3,
      title: "Cultural Day Celebration",
      description: "Students showcasing their cultural heritage and traditions",
      imageCount: 32,
      coverImage: "/placeholder.svg",
      date: "2024-01-05"
    }
  ]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Gallery Management</h2>
          <p className="text-gray-600">Manage school event photos and galleries</p>
        </div>
        <Button 
          onClick={() => setShowUploadForm(!showUploadForm)} 
          className="bg-red-800 hover:bg-red-900"
        >
          <Upload className="w-4 h-4 mr-2" />
          Create Gallery
        </Button>
      </div>

      {/* Upload Form */}
      {showUploadForm && (
        <Card>
          <CardHeader>
            <CardTitle>Create New Gallery</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="galleryTitle">Gallery Title</Label>
                <Input id="galleryTitle" placeholder="Enter gallery title" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="eventDate">Event Date</Label>
                <Input id="eventDate" type="date" />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="galleryDescription">Description</Label>
              <textarea
                id="galleryDescription"
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Describe the event or gallery content..."
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="images">Upload Images</Label>
              <Input id="images" type="file" accept="image/*" multiple />
              <p className="text-sm text-gray-500">
                Select multiple images (JPG, PNG, GIF - Max 5MB each)
              </p>
            </div>
            
            <div className="flex space-x-4">
              <Button className="bg-red-800 hover:bg-red-900">Create Gallery</Button>
              <Button variant="outline" onClick={() => setShowUploadForm(false)}>Cancel</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Galleries Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {galleries.map((gallery) => (
          <Card key={gallery.id} className="hover:shadow-lg transition-shadow">
            <div className="aspect-video bg-gray-200 rounded-t-lg flex items-center justify-center">
              <ImageIcon className="w-12 h-12 text-gray-400" />
            </div>
            <CardContent className="p-4">
              <div className="mb-3">
                <h3 className="text-lg font-semibold mb-1">{gallery.title}</h3>
                <p className="text-sm text-gray-600">{gallery.description}</p>
              </div>
              
              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <span>{gallery.imageCount} photos</span>
                <span>{gallery.date}</span>
              </div>
              
              <div className="flex space-x-2">
                <Button size="sm" variant="outline" className="flex-1">
                  <Eye className="w-4 h-4 mr-1" />
                  View
                </Button>
                <Button size="sm" variant="outline">
                  <Edit className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default GalleryManagement;