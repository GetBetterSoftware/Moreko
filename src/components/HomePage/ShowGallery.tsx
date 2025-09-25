"use client";
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { X, Eye, ArrowLeft, ArrowRight } from 'lucide-react';

interface GalleryItem {
  id: number;
  title: string;
  image: string;
  description?: string;
  category: string;
}

const galleryItems: GalleryItem[] = [
  { 
    id: 1, 
    title: "Sports Day 2024 - Athletics Track", 
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop",
    description: "Students competing in the 100m sprint during our annual athletics meet",
    category: "Sports"
  },
  { 
    id: 2, 
    title: "Science Fair Winner - Solar Panel Project", 
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&h=600&fit=crop",
    description: "Grade 11 student presenting their innovative solar energy project",
    category: "Academics"
  },
  { 
    id: 3, 
    title: "Cultural Day - Traditional Dance", 
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&h=600&fit=crop",
    description: "Students performing traditional South African dances in colorful attire",
    category: "Cultural"
  },
  { 
    id: 4, 
    title: "Matric Class of 2024 Graduation", 
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9d1?w=800&h=600&fit=crop",
    description: "Proud graduates celebrating their achievements with families",
    category: "Graduation"
  },
  { 
    id: 5, 
    title: "Annual Music Concert - School Orchestra", 
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop",
    description: "School orchestra performing at the annual music evening",
    category: "Arts"
  },
  { 
    id: 6, 
    title: "Art Exhibition - Student Paintings", 
    image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800&h=600&fit=crop",
    description: "Display of exceptional artwork by our talented art students",
    category: "Arts"
  },
  { 
    id: 7, 
    title: "Drama Club - Shakespeare Performance", 
    image: "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?w=800&h=600&fit=crop",
    description: "Students performing scenes from Romeo and Juliet",
    category: "Arts"
  },
  { 
    id: 8, 
    title: "Inter-School Chess Tournament", 
    image: "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?w=800&h=600&fit=crop",
    description: "Focused competitors during the regional chess championships",
    category: "Sports"
  },
  { 
    id: 9, 
    title: "Science Laboratory - Chemistry Experiment", 
    image: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=800&h=600&fit=crop",
    description: "Grade 10 students conducting chemistry experiments",
    category: "Academics"
  },
  { 
    id: 10, 
    title: "Soccer Team - Provincial Champions", 
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=600&fit=crop",
    description: "Our soccer team celebrating their provincial championship victory",
    category: "Sports"
  },
  { 
    id: 11, 
    title: "Library Reading Program", 
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=600&fit=crop",
    description: "Students participating in the annual reading challenge",
    category: "Academics"
  },
  { 
    id: 12, 
    title: "Heritage Day Celebration", 
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop",
    description: "Celebrating South African heritage with traditional foods and customs",
    category: "Cultural"
  },
  { 
    id: 13, 
    title: "Computer Lab - Coding Workshop", 
    image: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=800&h=600&fit=crop",
    description: "Students learning programming skills in our modern computer lab",
    category: "Academics"
  },
  { 
    id: 14, 
    title: "Netball Team Training", 
    image: "https://images.unsplash.com/photo-1594736797933-d0cb71b5a3b4?w=800&h=600&fit=crop",
    description: "School netball team during intensive training session",
    category: "Sports"
  },
  { 
    id: 15, 
    title: "Environmental Club Tree Planting", 
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&h=600&fit=crop",
    description: "Students planting trees as part of our environmental conservation program",
    category: "Community"
  },
  { 
    id: 16, 
    title: "Prize Giving Ceremony 2024", 
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop",
    description: "Annual awards ceremony recognizing academic and sporting achievements",
    category: "Awards"
  }
];

const categories = ["All", "Sports", "Academics", "Arts", "Cultural", "Graduation", "Community", "Awards"];

const ShowGallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  const filteredImages = selectedCategory === "All" 
    ? galleryItems 
    : galleryItems.filter(item => item.category === selectedCategory);

  const openModal = (item: GalleryItem) => {
    setSelectedImage(item);
    setCurrentImageIndex(filteredImages.findIndex(img => img.id === item.id));
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    const newIndex = direction === 'next' 
      ? (currentImageIndex + 1) % filteredImages.length
      : (currentImageIndex - 1 + filteredImages.length) % filteredImages.length;
    
    setCurrentImageIndex(newIndex);
    setSelectedImage(filteredImages[newIndex]);
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-6" id = "gallery">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">School Gallery</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Explore the vibrant moments and achievements from our school community. 
          From academic excellence to sporting triumphs, cultural celebrations to artistic expressions.
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {categories.map((category) => (
          <Button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full transition-colors ${
              selectedCategory === category
                ? 'bg-red-800 text-white hover:bg-red-900'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Results Count */}
      <div className="text-center mb-6">
        <p className="text-gray-600">
          Showing {filteredImages.length} image{filteredImages.length !== 1 ? 's' : ''}
          {selectedCategory !== "All" && ` in ${selectedCategory}`}
        </p>
      </div>
      
      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredImages.map((item) => (
          <Card key={item.id} className="hover:shadow-xl transition-all duration-300 cursor-pointer group">
            <div className="relative aspect-square bg-gray-200 rounded-t-lg overflow-hidden">
              <img 
                src={item.image} 
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const placeholder = document.createElement('div');
                  placeholder.className = 'w-full h-full flex items-center justify-center bg-gray-200';
                  placeholder.innerHTML = '<svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>';
                  target.parentElement?.appendChild(placeholder);
                }}
              />
              <div className="absolute inset-0  bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                <Button
                  onClick={() => openModal(item)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity bg-white text-gray-900 hover:bg-gray-100 rounded-full p-3"
                >
                  <Eye className="w-5 h-5" />
                </Button>
              </div>
              <div className="absolute top-2 right-2 bg-red-800 text-white px-2 py-1 rounded-full text-xs font-medium">
                {item.category}
              </div>
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">{item.title}</h3>
              <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredImages.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No images found in this category.</p>
        </div>
      )}

      {/* Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-opacity-90 flex items-center justify-center z-50 p-4">
          <div className="relative max-w-5xl max-h-full bg-white rounded-lg overflow-hidden">
            {/* Navigation Arrows */}
            {filteredImages.length > 1 && (
              <>
                <Button
                  onClick={() => navigateImage('prev')}
                  className="absolute left-4 top-1/2 -translate-y-1/2  bg-opacity-50 hover:bg-opacity-70 text-white rounded-full p-3 z-10"
                >
                  <ArrowLeft className="w-5 h-5" />
                </Button>
                <Button
                  onClick={() => navigateImage('next')}
                  className="absolute right-4 top-1/2 -translate-y-1/2  bg-opacity-50 hover:bg-opacity-70 text-white rounded-full p-3 z-10"
                >
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </>
            )}
            
            {/* Close Button */}
            <Button
              onClick={closeModal}
              className="absolute top-4 right-4 bg-red-800 hover:bg-red-900 text-white rounded-full p-2 z-10"
            >
              <X className="w-5 h-5" />
            </Button>

            <div className="relative">
              <img 
                src={selectedImage.image} 
                alt={selectedImage.title}
                className="w-full h-auto max-h-[70vh] object-contain"
              />
            </div>
            
            <div className="p-6 bg-white">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-2xl font-bold text-gray-900 flex-1">{selectedImage.title}</h3>
                <span className="bg-red-800 text-white px-3 py-1 rounded-full text-sm font-medium ml-4">
                  {selectedImage.category}
                </span>
              </div>
              {selectedImage.description && (
                <p className="text-gray-600 leading-relaxed">{selectedImage.description}</p>
              )}
              {filteredImages.length > 1 && (
                <p className="text-sm text-gray-500 mt-4">
                  Image {currentImageIndex + 1} of {filteredImages.length}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Backdrop click handler */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={closeModal}
        />
      )}
    </div>
  );
};

export default ShowGallery;