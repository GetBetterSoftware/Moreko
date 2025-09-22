import { BookOpen, Calendar, Download, Lock, LogIn, Users } from 'lucide-react';
import React from 'react';
import { Card } from '../ui/card';
import Link from 'next/link';
import { Button } from '../ui/button';

const PlatformFeatures = () => {
    return (
        <>
            <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">What's Available on Our Digital Platform</h2>
            <p className="text-gray-600 mt-2">Sign in to access these exclusive features</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="text-center p-6 opacity-75">
              <div className="p-3 bg-red-100 rounded-lg mx-auto w-fit mb-4">
                <BookOpen className="w-8 h-8 text-red-800" />
              </div>
              <h3 className="font-semibold mb-2">Digital Library</h3>
              <p className="text-sm text-gray-600">Download study materials, exam papers, and educational resources</p>
              <Lock className="w-4 h-4 text-gray-400 mx-auto mt-2" />
            </Card>

            <Card className="text-center p-6 opacity-75">
              <div className="p-3 bg-red-100 rounded-lg mx-auto w-fit mb-4">
                <Calendar className="w-8 h-8 text-red-800" />
              </div>
              <h3 className="font-semibold mb-2">School News</h3>
              <p className="text-sm text-gray-600">Stay updated with latest announcements and school events</p>
              <Lock className="w-4 h-4 text-gray-400 mx-auto mt-2" />
            </Card>

            <Card className="text-center p-6 opacity-75">
              <div className="p-3 bg-red-100 rounded-lg mx-auto w-fit mb-4">
                <Download className="w-8 h-8 text-red-800" />
              </div>
              <h3 className="font-semibold mb-2">Newsletters</h3>
              <p className="text-sm text-gray-600">Access monthly newsletters and submit content for publication</p>
              <Lock className="w-4 h-4 text-gray-400 mx-auto mt-2" />
            </Card>
          </div>

          <div className="text-center mt-8">
            <Link href="/login" className="hover:disabled">
            <Button size="lg"  className="bg-red-800 hover:bg-red-900 text-gray-100 cursor-pointer">
              <LogIn className="w-5 h-5 mr-2" />
              Sign In to Access Platform
            </Button>
            </Link>
          </div>
        </>
    );
}

export default PlatformFeatures;
