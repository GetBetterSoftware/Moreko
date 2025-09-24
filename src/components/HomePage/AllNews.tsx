"use client";
import React, { useState } from 'react';
import { Calendar, Image, Search, Filter, Clock, User } from 'lucide-react';

interface NewsArticle {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  category: string;
  image: string;
  featured: boolean;
  readTime: number;
}

const newsArticles: NewsArticle[] = [
  {
    id: 1,
    title: "School receives R50,000 library grant for digital transformation",
    excerpt: "Moreko High School has been awarded a significant grant to upgrade the school library with new books, digital resources, and computer facilities.",
    content: "The Department of Education has awarded Moreko High School a substantial R50,000 grant to modernize our library facilities. This funding will be used to purchase new textbooks, digital learning resources, and upgrade computer systems. The project aims to enhance learning experiences for all students and prepare them for the digital age.",
    date: "January 15, 2024",
    author: "Mrs. Sarah Mogale",
    category: "Education",
    image: "/placeholder.svg",
    featured: true,
    readTime: 3
  },
  {
    id: 2,
    title: "Grade 12 farewell celebration marks end of an era",
    excerpt: "Our Grade 12 learners celebrated their final year with a memorable farewell ceremony attended by staff, parents, and community members.",
    content: "The annual Grade 12 farewell ceremony was held in the school hall, marking the end of an important chapter for our graduating class. Parents, teachers, and community members gathered to celebrate the achievements of our students and wish them well for their future endeavors.",
    date: "January 10, 2024",
    author: "Mr. John Mthembu",
    category: "Events",
    image: "/placeholder.svg",
    featured: false,
    readTime: 2
  },
  {
    id: 3,
    title: "Principal wins Outstanding Educator of the Year award",
    excerpt: "Mrs. Mogale has been recognized as Outstanding Educator of the Year at the provincial education awards ceremony.",
    content: "We are proud to announce that our principal, Mrs. Sarah Mogale, has been honored with the Outstanding Educator of the Year award at the Gauteng Provincial Education Awards. This recognition celebrates her dedication to educational excellence and community development.",
    date: "January 5, 2024",
    author: "School Communications",
    category: "Awards",
    image: "/placeholder.svg",
    featured: true,
    readTime: 2
  },
  {
    id: 4,
    title: "New science laboratory opens for Grade 10-12 students",
    excerpt: "The newly constructed science laboratory will provide hands-on learning opportunities for our senior students in physics, chemistry, and biology.",
    content: "After months of construction, our state-of-the-art science laboratory is now open for use. The facility features modern equipment and safety measures that will enhance practical learning for our Grade 10-12 students across all science subjects.",
    date: "December 20, 2023",
    author: "Dr. Thabo Motsepe",
    category: "Facilities",
    image: "/placeholder.svg",
    featured: false,
    readTime: 4
  },
  {
    id: 5,
    title: "Inter-school sports tournament brings home three trophies",
    excerpt: "Our athletics team excelled at the regional inter-school sports tournament, securing victories in soccer, netball, and athletics.",
    content: "Moreko High School athletes demonstrated exceptional skill and sportsmanship at the annual regional sports tournament. Our teams brought home trophies in boys' soccer, girls' netball, and mixed athletics, making the entire school community proud.",
    date: "December 15, 2023",
    author: "Coach Peter Ndlovu",
    category: "Sports",
    image: "/placeholder.svg",
    featured: false,
    readTime: 3
  },
  {
    id: 6,
    title: "Community outreach program helps 50 local families",
    excerpt: "Students and staff collaborated on a successful food drive that provided essential supplies to families in need during the holiday season.",
    content: "The school's annual community outreach program exceeded expectations this year, with students, teachers, and parents working together to collect and distribute food parcels to 50 families in our local community. The initiative demonstrates our commitment to ubuntu and community support.",
    date: "December 10, 2023",
    author: "Ms. Grace Khumalo",
    category: "Community",
    image: "/placeholder.svg",
    featured: false,
    readTime: 2
  },
  {
    id: 7,
    title: "Matric results show 15% improvement in pass rate",
    excerpt: "The 2023 matric class achieved an impressive 87% pass rate, representing significant improvement from previous years.",
    content: "We are delighted to announce that our 2023 matric students achieved an 87% pass rate, showing a remarkable 15% improvement from the previous year. This success is attributed to dedicated teaching, extra classes, and strong parent-school partnerships.",
    date: "January 20, 2024",
    author: "Mrs. Sarah Mogale",
    category: "Academic",
    image: "/placeholder.svg",
    featured: true,
    readTime: 3
  },
  {
    id: 8,
    title: "New computer lab equipped with 30 modern workstations",
    excerpt: "The ICT department has been upgraded with new computers and software to enhance digital literacy among all students.",
    content: "Thanks to generous donations from local businesses and government support, our new computer laboratory now features 30 modern workstations with updated software. This facility will significantly improve ICT education and prepare students for the digital economy.",
    date: "November 28, 2023",
    author: "Mr. David Sithole",
    category: "Technology",
    image: "/placeholder.svg",
    featured: false,
    readTime: 2
  }
];

const categories = ["All", "Education", "Events", "Awards", "Facilities", "Sports", "Community", "Academic"];

const AllNews: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);

  const filteredArticles = newsArticles.filter(article => {
    const matchesCategory = selectedCategory === "All" || article.category === selectedCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredArticles = filteredArticles.filter(article => article.featured);
  const regularArticles = filteredArticles.filter(article => !article.featured);

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
          <div className="aspect-video bg-gray-200 flex items-center justify-center">
            <Image className="w-16 h-16 text-gray-400" />
          </div>
          
          <div className="p-8">
            <div className="flex items-center gap-4 mb-4">
              <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
                {selectedArticle.category}
              </span>
              <div className="flex items-center text-gray-500 text-sm">
                <Clock className="w-4 h-4 mr-1" />
                {selectedArticle.readTime} min read
              </div>
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {selectedArticle.title}
            </h1>
            
            <div className="flex items-center text-gray-600 mb-6">
              <User className="w-4 h-4 mr-2" />
              <span className="mr-4">{selectedArticle.author}</span>
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
            {featuredArticles.map((article) => (
              <div key={article.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="aspect-video bg-gray-200 flex items-center justify-center">
                  <Image className="w-16 h-16 text-gray-400" />
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
                      {article.category}
                    </span>
                    <div className="flex items-center text-gray-500 text-sm">
                      <Clock className="w-4 h-4 mr-1" />
                      {article.readTime} min
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {article.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {article.excerpt}
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
            {regularArticles.map((article) => (
              <div key={article.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video bg-gray-200 flex items-center justify-center">
                  <Image className="w-12 h-12 text-gray-400" />
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium">
                      {article.category}
                    </span>
                    <div className="flex items-center text-gray-500 text-xs">
                      <Clock className="w-3 h-3 mr-1" />
                      {article.readTime} min
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                    {article.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {article.excerpt}
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