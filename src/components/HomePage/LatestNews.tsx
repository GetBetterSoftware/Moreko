"use client";
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Calendar, Image as ImageIcon, Clock, User } from 'lucide-react';
import Link from 'next/link';
import { useDatabase } from '@/context/Database';


interface NewsArticle {
  id: number;
  title: string;
  content: string;
  date: string;
  author?: string;
  category?: string;
  featuredImage?: string;
}

const LatestNews = () => {
  // @ts-ignore
  const { posts } = useDatabase();
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);

  // @ts-ignore
  const latestPosts = posts?.slice(0, 3) || [];

  const handleReadMore = (article: NewsArticle) => {
    setSelectedArticle(article);
  };

  const handleCloseArticle = () => {
    setSelectedArticle(null);
  };

  if (selectedArticle) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <button
          onClick={handleCloseArticle}
          className="mb-6 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
        >
          ← Back to News
        </button>
        
        <article className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="aspect-video bg-gray-200 flex items-center justify-center overflow-hidden">
            {selectedArticle.featuredImage ? (
              <img 
                src={selectedArticle.featuredImage} 
                alt={selectedArticle.title}
                className="w-full h-full object-fit"
              />
            ) : (
              <ImageIcon className="w-16 h-16 text-gray-400" />
            )}
          </div>
          
          <div className="p-8">
            {selectedArticle.category && (
              <div className="flex items-center gap-4 mb-4">
                <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
                  {selectedArticle.category}
                </span>
                <div className="flex items-center text-gray-500 text-sm">
                  <Clock className="w-4 h-4 mr-1" />
                </div>
              </div>
            )}
            
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {selectedArticle.title}
            </h1>
            
            <div className="flex items-center text-gray-600 mb-6">
              {selectedArticle.author && (
                <>
                  <User className="w-4 h-4 mr-2" />
                  <span className="mr-4">{selectedArticle.author}</span>
                </>
              )}
              <Calendar className="w-4 h-4 mr-2" />
              <span>{selectedArticle.date}</span>
            </div>
            
            <div className="prose max-w-none">
              <p className="text-lg text-gray-700 leading-relaxed">
                {selectedArticle.content}
              </p>
            </div>
          </div>
        </article>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Latest News</h2>
        <Link href="/latest-news">
          <Button
            variant="outline"
            size="sm"
            className="bg-gray-100 text-red-800 hover:bg-gray-100 cursor-pointer">
            View All News
          </Button>
        </Link>
      </div>
      
      {latestPosts.length === 0 ? (
        <div className="text-center py-12">
          <ImageIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No news available</h3>
          <p className="text-gray-500">Check back later for updates.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* @ts-ignore */}
          {latestPosts.map((article) => (
            <div key={article.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video bg-gray-200 flex items-center justify-center overflow-hidden">
                {article.featuredImage ? (
                  <img 
                    src={article.featuredImage} 
                    alt={article.title}
                    className="w-full h-full object-fit"
                  />
                ) : (
                  <ImageIcon className="w-12 h-12 text-gray-400" />
                )}
              </div>
              
              <div className="p-6">
                {article.category && (
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium">
                      {article.category}
                    </span>
                    <div className="flex items-center text-gray-500 text-xs">
                      <Clock className="w-3 h-3 mr-1" />
                    </div>
                  </div>
                )}
                
                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                  {article.title}
                </h3>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {article.content.substring(0, 100)}
                  {article.content.length > 100 ? '...' : ''}
                </p>
                
                <div className="flex items-center justify-between">
                  <p className="text-xs text-gray-500 flex items-center">
                    <Calendar className="w-3 h-3 mr-1" />
                    {article.date}
                  </p>
                  
                  <button
                    onClick={() => handleReadMore(article)}
                    className="text-red-600 hover:text-red-800 text-sm font-medium transition-colors"
                  >
                    Read More →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default LatestNews;