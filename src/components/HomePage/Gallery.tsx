"use client";
import React from 'react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { ImageIcon } from 'lucide-react';
import Link from 'next/link';
import { useDatabase } from '@/context/Database';



const Gallery = () => {
  const {galleryItems} = useDatabase();
    return (
        <>
            <div className="flex items-center justify-between mb-8">
                        <h2 className="text-3xl font-bold text-gray-900">Gallery Highlights</h2>
                        <Link href="gallery">
                          <Button className="bg-gray-100 text-red-800 hover:bg-gray-100 cursor-pointer">
                            View Full Gallery
                          </Button>
                        </Link>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {galleryItems.map((item: any, index: number) => (
                          <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                            <div className="aspect-square bg-gray-200 rounded-t-lg flex items-center justify-center">
                              <img src={item.imageUrl} alt={item.title} className='w-full h-full object-fit rounded-lg' />
                            </div>
                            <CardContent className="p-4">
                              <p className="text-sm font-medium text-center">{item.title}</p>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
        </>
    );
}

export default Gallery;
