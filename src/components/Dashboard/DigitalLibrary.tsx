"use client";
import React, { useState, useMemo } from 'react';
import styles from "@/components/styles/HomepageStyles.module.css";
import { 
  Search, 
  Download, 
  FileText, 
  Filter, 
  BookOpen, 
  Clock, 
  User, 
  Star,
  Eye,
  Calendar,
  Tag,
  Grid,
  List,
  ChevronDown,
  X
} from 'lucide-react';

interface LibraryResource {
  id: number;
  title: string;
  subject: string;
  grade: string;
  author: string;
  uploadDate: string;
  downloads: number;
  rating: number;
  size: string;
  type: string;
  description: string;
  tags: string[];
}

// Mock data for PDF resources
const libraryResources: LibraryResource[] = [
  {
    id: 1,
    title: "Advanced Mathematics Study Guide",
    subject: "Mathematics",
    grade: "Grade 12",
    author: "Dr. Smith",
    uploadDate: "2024-09-15",
    downloads: 245,
    rating: 4.8,
    size: "2.4 MB",
    type: "Study Guide",
    description: "Comprehensive guide covering calculus, algebra, and trigonometry for advanced mathematics students.",
    tags: ["Calculus", "Algebra", "Trigonometry"]
  },
  {
    id: 2,
    title: "Physics Laboratory Manual",
    subject: "Physics",
    grade: "Grade 11",
    author: "Prof. Johnson",
    uploadDate: "2024-09-10",
    downloads: 189,
    rating: 4.6,
    size: "5.2 MB",
    type: "Manual",
    description: "Complete laboratory manual with experiments, procedures, and safety guidelines.",
    tags: ["Laboratory", "Experiments", "Safety"]
  },
  {
    id: 3,
    title: "English Literature Analysis",
    subject: "English",
    grade: "Grade 10",
    author: "Ms. Williams",
    uploadDate: "2024-09-08",
    downloads: 156,
    rating: 4.7,
    size: "1.8 MB",
    type: "Analysis",
    description: "In-depth analysis of classic literature works with themes and character studies.",
    tags: ["Literature", "Analysis", "Themes"]
  },
  {
    id: 4,
    title: "Chemistry Periodic Table Reference",
    subject: "Chemistry",
    grade: "Grade 11",
    author: "Dr. Brown",
    uploadDate: "2024-09-12",
    downloads: 203,
    rating: 4.9,
    size: "890 KB",
    type: "Reference",
    description: "Detailed periodic table with element properties, atomic structures, and chemical data.",
    tags: ["Periodic Table", "Elements", "Properties"]
  },
  {
    id: 5,
    title: "History World War II Timeline",
    subject: "History",
    grade: "Grade 9",
    author: "Mr. Davis",
    uploadDate: "2024-09-05",
    downloads: 167,
    rating: 4.5,
    size: "3.1 MB",
    type: "Timeline",
    description: "Comprehensive timeline of World War II events with maps and historical context.",
    tags: ["WWII", "Timeline", "Maps"]
  },
  {
    id: 6,
    title: "Biology Cell Structure Guide",
    subject: "Biology",
    grade: "Grade 10",
    author: "Dr. Wilson",
    uploadDate: "2024-09-07",
    downloads: 178,
    rating: 4.8,
    size: "2.7 MB",
    type: "Study Guide",
    description: "Detailed guide on cell structures, organelles, and cellular processes with diagrams.",
    tags: ["Cells", "Organelles", "Diagrams"]
  },
  {
    id: 7,
    title: "Geography Climate Patterns",
    subject: "Geography",
    grade: "Grade 11",
    author: "Ms. Taylor",
    uploadDate: "2024-09-14",
    downloads: 134,
    rating: 4.4,
    size: "4.3 MB",
    type: "Study Material",
    description: "Study of global climate patterns, weather systems, and environmental factors.",
    tags: ["Climate", "Weather", "Environment"]
  },
  {
    id: 8,
    title: "Computer Science Programming Basics",
    subject: "Computer Science",
    grade: "Grade 12",
    author: "Mr. Anderson",
    uploadDate: "2024-09-11",
    downloads: 221,
    rating: 4.7,
    size: "3.8 MB",
    type: "Tutorial",
    description: "Introduction to programming concepts, algorithms, and coding best practices.",
    tags: ["Programming", "Algorithms", "Coding"]
  }
];

const subjects = ["All Subjects", "Mathematics", "Physics", "English", "Chemistry", "History", "Biology", "Geography", "Computer Science"];
const grades = ["All Grades", "Grade 9", "Grade 10", "Grade 11", "Grade 12"];
const types = ["All Types", "Study Guide", "Manual", "Analysis", "Reference", "Timeline", "Study Material", "Tutorial"];

type ViewMode = 'grid' | 'list';
type SortBy = 'recent' | 'popular'  | 'alphabetical';

const DigitalLibrary: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedSubject, setSelectedSubject] = useState<string>('All Subjects');
  const [selectedGrade, setSelectedGrade] = useState<string>('All Grades');
  const [selectedType, setSelectedType] = useState<string>('All Types');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [sortBy, setSortBy] = useState<SortBy>('recent');
  const [showFilters, setShowFilters] = useState<boolean>(false);

  // Filter and sort resources
  const filteredAndSortedResources = useMemo<LibraryResource[]>(() => {
    let filtered = libraryResources.filter((resource: LibraryResource) => {
      const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesSubject = selectedSubject === 'All Subjects' || resource.subject === selectedSubject;
      const matchesGrade = selectedGrade === 'All Grades' || resource.grade === selectedGrade;
      const matchesType = selectedType === 'All Types' || resource.type === selectedType;
      
      return matchesSearch && matchesSubject && matchesGrade && matchesType;
    });

    // Sort resources
    filtered.sort((a: LibraryResource, b: LibraryResource) => {
      switch (sortBy) {
        case 'popular':
          return b.downloads - a.downloads;
        case 'alphabetical':
          return a.title.localeCompare(b.title);
        case 'recent':
        default:
          return new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime();
      }
    });

    return filtered;
  }, [searchTerm, selectedSubject, selectedGrade, selectedType, sortBy]);

  const handleDownload = (resource: LibraryResource): void => {
    // Simulate download
    alert(`Downloading: ${resource.title}`);
    console.log('Downloading resource:', resource);
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const clearFilters = (): void => {
    setSearchTerm('');
    setSelectedSubject('All Subjects');
    setSelectedGrade('All Grades');
    setSelectedType('All Types');
  };

  interface ResourceCardProps {
    resource: LibraryResource;
    isListView?: boolean;
  }

  const ResourceCard: React.FC<ResourceCardProps> = ({ resource, isListView = false }) => (
    <div className={`bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border ${
      isListView ? 'flex items-center p-4' : 'p-6'
    }`}>
      {!isListView && (
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <FileText className="w-8 h-8 text-red-600" />
            <span className="text-sm px-2 py-1 bg-red-100 text-red-800 rounded-full font-medium">
              {resource.type}
            </span>
          </div>
        </div>
      )}

      <div className={`${isListView ? 'flex-1 flex items-center' : ''}`}>
        {isListView && (
          <div className="flex items-center space-x-4 mr-4">
            <FileText className="w-8 h-8 text-red-600" />
            <span className="text-sm px-2 py-1 bg-red-100 text-red-800 rounded-full font-medium">
              {resource.type}
            </span>
          </div>
        )}

        <div className={isListView ? 'flex-1' : ''}>
          <h3 className={`font-semibold text-gray-900 mb-2 ${isListView ? 'text-base' : 'text-lg'}`}>
            {resource.title}
          </h3>
          
          {!isListView && (
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
              {resource.description}
            </p>
          )}

          <div className={`flex flex-wrap gap-1 mb-4 ${isListView ? 'mb-2' : ''}`}>
            {resource.tags.map((tag: string, index: number) => (
              <span key={index} className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded">
                {tag}
              </span>
            ))}
          </div>

          <div className={`text-sm text-gray-500 space-y-1 ${isListView ? 'space-y-0 flex items-center space-x-4' : ''}`}>
            <div className="flex items-center">
              <User className="w-4 h-4 mr-1" />
              {resource.author}
            </div>
            <div className="flex items-center">
              <Tag className="w-4 h-4 mr-1" />
              {resource.subject} • {resource.grade}
            </div>
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              {formatDate(resource.uploadDate)}
            </div>
            <div className="flex items-center">
              <Download className="w-4 h-4 mr-1" />
              {resource.downloads} downloads • {resource.size}
            </div>
          </div>
        </div>

        {isListView && (
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
              <span className="text-sm font-medium">{resource.rating}</span>
            </div>
            <button
              onClick={() => handleDownload(resource)}
              className="flex items-center space-x-2 bg-red-800 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
            >
              <Download className="w-4 h-4" />
              <span>Download</span>
            </button>
          </div>
        )}
      </div>

      {!isListView && (
        <button
          onClick={() => handleDownload(resource)}
          className="w-full flex items-center justify-center space-x-2 bg-red-800 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition-colors mt-4"
        >
          <Download className="w-4 h-4" />
          <span>Download PDF</span>
        </button>
      )}
    </div>
  );

  return (
    <div className={`min-h-screen p-4 ${styles.styles}`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <BookOpen className="w-8 h-8 text-red-600" />
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Digital Library</h1>
                <p className="text-gray-600">Access study materials, guides, and resources</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button title='Grid View' 
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-red-100 text-red-600' : 'text-gray-400'}`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button title='List View'
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${viewMode === 'list' ? 'bg-red-100 text-red-600' : 'text-gray-400'}`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search resources, subjects, or topics..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex items-center justify-between overflow-x-auto">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                <Filter className="w-4 h-4" />
                <span>Filters</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
              </button>

              <div className="flex items-center space-x-4">
                <select
                  value={sortBy}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSortBy(e.target.value as SortBy)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                >
                  <option value="recent">Most Recent</option>
                  <option value="popular">Most Popular</option>
                  <option value="alphabetical">A to Z</option>
                </select>
                
              </div>
            </div>

            {showFilters && (
              <div className="bg-gray-50 p-4 rounded-lg border">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                    <select
                      value={selectedSubject}
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedSubject(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                    >
                      {subjects.map((subject: string) => (
                        <option key={subject} value={subject}>{subject}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Grade</label>
                    <select
                      value={selectedGrade}
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedGrade(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                    >
                      {grades.map((grade: string) => (
                        <option key={grade} value={grade}>{grade}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                    <select
                      value={selectedType}
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedType(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                    >
                      {types.map((type: string) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {(selectedSubject !== 'All Subjects' || selectedGrade !== 'All Grades' || selectedType !== 'All Types' || searchTerm) && (
                  <div className="mt-4 flex justify-end">
                    <button
                      onClick={clearFilters}
                      className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      <X className="w-4 h-4" />
                      <span>Clear Filters</span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Resources Grid/List */}
        {filteredAndSortedResources.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No resources found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search terms or filters</p>
            <button
              onClick={clearFilters}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className={
            viewMode === 'grid' 
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              : "space-y-4"
          }>
            {filteredAndSortedResources.map((resource: LibraryResource) => (
              <ResourceCard 
                key={resource.id} 
                resource={resource} 
                isListView={viewMode === 'list'} 
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DigitalLibrary;