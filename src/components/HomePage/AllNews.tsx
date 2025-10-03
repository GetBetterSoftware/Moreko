"use client";
import React, { useState } from 'react';
import { Calendar, Image, Search, Filter, Clock, User, ImageIcon } from 'lucide-react';
import { useDatabase } from '@/context/Database';

interface NewsArticle {
  id: number;
  title: string;
  content: string;
  submittedAt: string;
  author: string;
  category: string;
  featuredImage: string;
  
}


const categories = ["All", "Education", "Events", "Awards", "Facilities", "Sports", "Community", "Academic"];

const AllNews: React.FC = () => {
  const {posts} = useDatabase();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);

  const filteredArticles = posts.filter((article: any) => {
    const matchesCategory = selectedCategory === "All" || article.category === selectedCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.content.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredArticles = filteredArticles.filter((article: any) => article.featured);
  const regularArticles = filteredArticles.filter((article: any) => !article.featured);

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
            <div className="flex items-center gap-4 mb-4">
              <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
                {selectedArticle.category}
              </span>
              <div className="flex items-center text-gray-500 text-sm">
                <Clock className="w-4 h-4 mr-1" />
              </div>
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {selectedArticle.title}
            </h1>
            
            <div className="flex items-center text-gray-600 mb-6">
              <User className="w-4 h-4 mr-2" />
              <span className="mr-4">{selectedArticle.author}</span>
              <Calendar className="w-4 h-4 mr-2" />
              <span>{selectedArticle.submittedAt}</span>
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
    <div className="max-w-7xl mx-auto p-6" id="news">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4 md:mb-0">Latest News</h1>
        
        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search news..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent w-full sm:w-64"
            />
          </div>
          
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent appearance-none bg-white"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Featured Articles */}
      {featuredArticles.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Featured News</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featuredArticles.map((article: any) => (
              <div key={article.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                 <div className="aspect-video bg-gray-200 flex items-center justify-center overflow-hidden">
                            {article.featuredImage ? (
                              <img 
                                src={article.featuredImage} 
                                alt={article.title}
                                className="w-full h-full object-fit"
                              />
                            ) : (
                              <ImageIcon className="w-16 h-16 text-gray-400" />
                            )}
                          </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
                      {article.category}
                    </span>
                    <div className="flex items-center text-gray-500 text-sm">
                      <Clock className="w-4 h-4 mr-1" />
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {article.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {article.content.slice(0,100)}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-gray-500 text-sm">
                      <Calendar className="w-4 h-4 mr-1" />
                      {article.date}
                    </div>
                    
                    <button
                      onClick={() => handleReadMore(article)}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                    >
                      Read More
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Regular Articles */}
      {regularArticles.length > 0 && (
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">All News</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularArticles.map((article: any) => (
              <div key={article.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video bg-gray-200 flex items-center justify-center overflow-hidden">
                            {article.featuredImage ? (
                              <img 
                                src={article.featuredImage} 
                                alt={article.title}
                                className="w-full h-full object-fit"
                              />
                            ) : (
                              <ImageIcon className="w-16 h-16 text-gray-400" />
                            )}
                          </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium">
                      {article.category}
                    </span>
                    <div className="flex items-center text-gray-500 text-xs">
                      <Clock className="w-3 h-3 mr-1" />
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                    {article.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {article.content.slice(0,100)}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-gray-500 flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      {article.submittedAt}
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
        </div>
      )}

      {/* No Results */}
      {filteredArticles.length === 0 && (
        <div className="text-center py-12">
          <Image className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No news found</h3>
          <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
        </div>
      )}
    </div>
  );
};

export default AllNews;