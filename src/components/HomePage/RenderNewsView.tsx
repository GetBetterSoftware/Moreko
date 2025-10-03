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
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import styles from "@/components/styles/DashboardStyles.module.css";

import { useDatabase } from '@/context/Database';
import { useSession } from 'next-auth/react';
import { id } from 'date-fns/locale';
const voucher_codes = require("voucher-code-generator");


const RenderNewsView = (): React.ReactNode => {
    
  const [showNewArticleForm, setShowNewArticleForm] = useState<boolean>(false);
  const {data: session } = useSession();
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

interface ArticleImage {
  id: string;
  file: File;
  preview: string;
  caption: string;
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
  images?: ArticleImage[];
}

interface NewArticle {
  title: string;
  category: string;
  paragraphs: string[];
  summary: string;
  images: ArticleImage[];
}

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


    const generateCode = (prefix: string) => {
      return voucher_codes.generate({
        count: 1,
        prefix,
        length: 10,
        charset:"alphabetic"
      })[0].toUpperCase();
    }
    

    const [newArticle, setNewArticle] = useState<NewArticle>({
        title: '',
        category: '',
        paragraphs: [''],
        summary: '',
        images: []
      });
    
      const [articles, setArticles] = useState<Article[]>()
    

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const files = event.target.files;
    if (!files) return;

    const maxImages = 5;
    if (newArticle.images.length + files.length > maxImages) {
      alert(`You can only upload a maximum of ${maxImages} images per article.`);
      return;
    }

    const newImages: ArticleImage[] = [];
    
    Array.from(files).forEach((file) => {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please only upload image files.');
        return;
      }

      // Validate file size (5MB max)
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        alert('Image size should be less than 5MB.');
        return;
      }

      const imageId = generateCode('IMG-');
      const preview = URL.createObjectURL(file);
      
      newImages.push({
        id: imageId,
        file,
        preview,
        caption: ''
      });
    });

    setNewArticle({
      ...newArticle,
      images: [...newArticle.images, ...newImages]
    });

    // Clear the input
    event.target.value = '';
  };
    const updateImageCaption = (imageId: string, caption: string): void => {
    setNewArticle({
      ...newArticle,
      images: newArticle.images.map(img => 
        img.id === imageId ? { ...img, caption } : img
      )
    });
  };
      const removeImage = (imageId: string): void => {
    const imageToRemove = newArticle.images.find((img:{ id: string; preview: string; }) => img.id === imageId);
    if (imageToRemove) {
      URL.revokeObjectURL(imageToRemove.preview);
    }
    
    setNewArticle({
      ...newArticle,
      images: newArticle.images.filter((img:{ id: string; preview: string; }) => img.id !== imageId)
    });
  };

  const handleSubmitArticle = async (): Promise<void> => {
    if (!newArticle.title || !newArticle.category || newArticle.paragraphs.some((p: any) => p.trim() === '')) {
      alert('Please fill in all required fields and ensure all paragraphs have content');
      return;
    }

    if (newArticle.images.length === 0) {
      alert('Please upload at least one image for your article');
      return;
    }

    // Create FormData for file upload
    const formData = new FormData();
    
    const articleToAdd: any = {
      id: generateCode('ARTICLE-'),
      title: newArticle.title,
      category: newArticle.category,
      content: newArticle.paragraphs.join('\n\n'),
      summary: newArticle.summary,
      status: 'pending',
      submittedAt: new Date().toLocaleString(),
      views: 0,
      grade: (session?.user as { grade: string | undefined })?.grade || '',
      author: session?.user?.name || '',
      reason: ""
    };

    // Add article data
    formData.append('article', JSON.stringify(articleToAdd));
    
    // Add images and captions
    newArticle.images.forEach((image: any, index: any) => {
      formData.append(`image_${index}`, image.file);
      formData.append(`caption_${index}`, image.caption);
    });

    try {
      await fetch('/api/upload-article', {
        method: 'POST',
        body: formData
      });

      setArticles([articleToAdd, ...posts]);
      
      // Cleanup image previews
      newArticle.images.forEach((img: any) => URL.revokeObjectURL(img.preview));
      
      setNewArticle({ title: '', category: '', paragraphs: [''], summary: '', images: [] });
      setShowNewArticleForm(false);

      alert('Article submitted successfully! It will be reviewed shortly.');
    } catch (error) {
      console.error('Error submitting article:', error);
      alert('Error submitting article. Please try again.');
    }
  };

     const handleCancelArticle = (): void => {
    // Cleanup image previews
    newArticle.images.forEach((img: { preview: string; }) => URL.revokeObjectURL(img.preview));
    
    setNewArticle({ title: '', category: '', paragraphs: [''], summary: '', images: [] });
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
      const updatedParagraphs = newArticle.paragraphs.filter((_: any, i: any) => i !== index);
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

    const {posts} = useDatabase();
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

  return( <div className="space-y-6">
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
            <div className="space-y-6">
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

              {/* Image Upload Section */}
              <div>
                <label className="block text-sm font-medium mb-2">Images *</label>
                <div className="space-y-4">
                  {/* Upload Button */}
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                    <input
                      type="file"
                      id="image-upload"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <label
                      htmlFor="image-upload"
                      className="cursor-pointer flex flex-col items-center space-y-2"
                    >
                      <Upload className="w-8 h-8 text-gray-400" />
                      <div className="text-sm text-gray-600">
                        <span className="font-medium text-red-800 hover:text-red-900">Click to upload images</span>
                        <p className="text-xs text-gray-500 mt-1">
                          At least 1 image required. Maximum 5 images, up to 5MB each. Supported formats: JPG, PNG, GIF, WebP
                        </p>
                      </div>
                    </label>
                  </div>

                  {/* Image Previews */}
                  {newArticle.images.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {newArticle.images.map((image: any, index: number) => (
                        <div key={image.id} className="border rounded-lg p-4 bg-gray-50">
                          <div className="relative">
                            <img
                              src={image.preview}
                              alt={`Preview ${index + 1}`}
                              className="w-full h-48 object-cover rounded-lg"
                            />
                            <Button
                              variant="destructive"
                              size="sm"
                              className="absolute top-2 right-2"
                              onClick={() => removeImage(image.id)}
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                          <div className="mt-3">
                            <label className="block text-xs font-medium text-gray-700 mb-1">
                              Image Caption (Optional)
                            </label>
                            <Input
                              placeholder="Enter image caption..."
                              value={image.caption}
                              onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                                updateImageCaption(image.id, e.target.value)
                              }
                              className="text-sm"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Article Content *</label>
                <div className="space-y-4">
                  {newArticle.paragraphs.map((paragraph: string, index: number) => (
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
                      {article.images && article.images.length > 0 && (
                        <span className="flex items-center text-xs text-gray-500">
                          <ImageIcon className="w-3 h-3 mr-1" />
                          {article.images.length} image{article.images.length > 1 ? 's' : ''}
                        </span>
                      )}
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
)};

  export default RenderNewsView;