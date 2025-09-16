"use client";
import React, { useState } from 'react';

import { 
  GraduationCap, 
  BookOpen, 
  MapPin,
  Trophy,
  Users,
  LogIn,
  Lock,
  Download,
  Calendar,
  ImageIcon
} from 'lucide-react';

import styles from "@/components/styles/HomepageStyles.module.css"
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import Image from 'next/image';
import Link from 'next/link';
import NavBar from './NavBar';
import CalendarComponent from './Calendar';

interface PublicSiteProps {
  onAdminLogin: () => void;
  onUserLogin: () => void;
}

const HomePage = () => {

  const [showCalendar, setShowCalendar] = useState(false);

  const achievements = [
    {
      year: "2024",
      title: "Provincial Mathematics Olympiad - 1st Place",
      description: "Our Grade 11 team secured first place in the Limpopo Mathematics Olympiad"
    },
    {
      year: "2023", 
      title: "Best Performing Rural School Award",
      description: "Recognized by the Department of Education for outstanding academic performance"
    },
    {
      year: "2023",
      title: "Inter-School Debate Championship",
      description: "Won the regional debate championship for the third consecutive year"
    }
  ];

  const schoolInfo = {
    address: "123 Education Street, Moreko Village, Limpopo Province",
    phone: "(015) 123-4567",
    email: "info@morekohigh.edu.za",
    established: "1987",
    motto: "Excellence Through Education",
    principal: "Mrs. T. Mogale"
  };
   const newsArticles = [
    {
      id: 1,
      title: "School receives library grant",
      excerpt: "Moreko High School has been awarded a R50,000 grant to upgrade the school library with new books and digital resources.",
      date: "January 15, 2024",
      image: "/placeholder.svg"
    },
    {
      id: 2,
      title: "Grade 12 farewell celebration",
      excerpt: "Our Grade 12 learners celebrated their final year with a memorable farewell ceremony attended by staff, parents, and community members.",
      date: "January 10, 2024",
      image: "/placeholder.svg"
    },
    {
      id: 3,
      title: "Principal wins teacher's award",
      excerpt: "Mrs. Mogale has been recognized as Outstanding Educator of the Year at the provincial education awards ceremony.",
      date: "January 5, 2024",
      image: "/placeholder.svg"
    }
  ];

  const libraryResources = [
    {
      title: "June Revision Pack",
      description: "Mathematics and Science revision materials for Grades 10-12",
      type: "PDF",
      size: "2.3 MB"
    },
    {
      title: "2024 School Calendar",
      description: "Important dates, holidays, and school events for the year",
      type: "PDF",
      size: "1.1 MB"
    },
    {
      title: "Uniform Policy Guide",
      description: "Complete guidelines for school uniform requirements",
      type: "PDF",
      size: "0.8 MB"
    }
  ];

  const galleryHighlights = [
    { title: "Sports Day 2024", image: "/placeholder.svg" },
    { title: "Science Fair Winners", image: "/placeholder.svg" },
    { title: "Cultural Day Celebration", image: "/placeholder.svg" },
    { title: "Matric Results Celebration", image: "/placeholder.svg" }
  ];

 

  return (
    <>
    {
      showCalendar ? <CalendarComponent close={setShowCalendar}/> : null
    }
    <div className={`${styles.styles}`}>
      
      {/* Header */}
      <NavBar />
      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-red-800 to-red-600 flex flex-col items-center justify-center py-16 text-gray-100  min-h-70 mt-16">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            Welcome to Moreko High School
          </h2>
          <p className="text-xl md:text-2xl mb-8 text-red-100">
            {schoolInfo.motto}
          </p>
          <div className="flex flex-col sm:flex-row gap-7 justify-center">
            
             <Link href="/#about" className="bg-gray-100 text-red-800 hover:bg-gray-200 cursor-pointer rounded-md">
            <Button size="lg" variant="outline" className="border-gray-100 hover:bg-gray-100 text-red-800 cursor-pointer">
              <BookOpen className="w-5 h-5 mr-2" />
              Learn More About Us
            </Button>
            </Link>
          </div>
        </div>
      </section>

      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Platform Access Notice */}
        <section className="mb-16 bg-gradient-to-r from-red-50 to-red-100 rounded-lg p-8 border-l-4 border-red-800">
          <div className="text-center">
            <Lock className="w-12 h-12 mx-auto text-red-800 mb-4" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Digital Platform Access</h2>
            <p className="text-gray-700 text-lg mb-6">
              Our digital magazine, news articles, downloadable resources, and communication features are available to registered students and parents only.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register" className="bg-gray-100 text-red-800 hover:bg-gray-100 cursor-pointer" >
              <Button 
                size="lg" 
                className="bg-red-800 hover:bg-red-900 text-gray-100 cursor-pointer"
               
              >
                <Users className="w-5 h-5 mr-2" />
                Register / Sign In
              </Button>
              </Link>

               <Button className="bg-gray-50 text-red-800 hover:bg-gray-100 cursor-pointer"size="lg" onClick={() => setShowCalendar(true)}>
                <Calendar className="w-5 h-5 mr-2" />
                View School Calendar
              </Button>
            </div>
            <p className="text-sm text-gray-600 mt-4">
              Access news, digital library, newsletters, and stay connected with school updates
            </p>
          </div>
        </section>

   

        {/* About Our School */}
        <section className="mb-16" id="about">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">About Moreko High School</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-6">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="w-6 h-6 mr-3 text-red-800" />
                  School Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900">Address</h3>
                  <p className="text-gray-600">{schoolInfo.address}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Contact</h3>
                  <p className="text-gray-600">Phone: {schoolInfo.phone}</p>
                  <p className="text-gray-600">Email: {schoolInfo.email}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Principal</h3>
                  <p className="text-gray-600">{schoolInfo.principal}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Established</h3>
                  <p className="text-gray-600">{schoolInfo.established}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <GraduationCap className="w-6 h-6 mr-3 text-red-800" />
                  Our Mission
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Moreko High School is dedicated to providing quality education that nurtures academic excellence, 
                  character development, and community leadership. We strive to prepare our learners for success 
                  in higher education and meaningful careers.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Since {schoolInfo.established}, we have been a cornerstone of education in our community, 
                  fostering a culture of learning, respect, and achievement.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* School Achievements */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 flex items-center justify-center">
              <Trophy className="w-8 h-8 mr-3 text-red-800" />
              Our Achievements
            </h2>
            <p className="text-gray-600 mt-2">Celebrating excellence in academics and extracurricular activities</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((achievement, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{achievement.title}</CardTitle>
                    <span className="text-2xl font-bold text-red-800">{achievement.year}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{achievement.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Platform Features Preview */}
        <section className="mb-16 bg-white  rounded-lg p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">What's Available on Our Digital Platform</h2>
            <p className="text-gray-600 mt-2">Sign in to access these exclusive features</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                <Users className="w-8 h-8 text-red-800" />
              </div>
              <h3 className="font-semibold mb-2">Communication</h3>
              <p className="text-sm text-gray-600">Receive SMS and email updates about important school matters</p>
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
        </section>

        {/* Latest News Section */}
        <section className="mb-16 bg-white  rounded-lg p-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Latest News</h2>
            <Button className="bg-gray-100 text-red-800 hover:bg-gray-100 cursor-pointer">View All News</Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {newsArticles.map((article) => (
              <Card key={article.id} className="hover:shadow-lg transition-shadow">
                <div className="aspect-video bg-gray-200 rounded-t-lg flex items-center justify-center">
                  <ImageIcon className="w-12 h-12 text-gray-400" />
                </div>
                <CardHeader>
                  <CardTitle className="text-lg">{article.title}</CardTitle>
                  <p className="text-sm text-gray-500 flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {article.date}
                  </p>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{article.excerpt}</p>
                  <Button variant="link" className="p-0 mt-2 text-red-800 cursor-pointer">
                    Read More →
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

          {/* Gallery Highlights Section */}
        <section className="mb-16 bg-white  rounded-lg p-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Gallery Highlights</h2>
            <Button className="bg-gray-100 text-red-800 hover:bg-gray-100 cursor-pointer">View Full Gallery</Button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {galleryHighlights.map((item, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                <div className="aspect-square bg-gray-200 rounded-t-lg flex items-center justify-center">
                  <ImageIcon className="w-8 h-8 text-gray-400" />
                </div>
                <CardContent className="p-4">
                  <p className="text-sm font-medium text-center">{item.title}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>



      {/* Footer */}
      <footer className="bg-red-800 text-gray-100 py-12">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <Image src={"/images/LOGO.svg"} width={50} height={50} alt='LOGO'/>
                <div>
                  <h3 className="text-xl font-bold">Moreko High School</h3>
                  <p className="text-red-200">{schoolInfo.motto}</p>
                </div>
              </div>
              <p className="text-red-200">
                Committed to providing quality education and nurturing the leaders of tomorrow since {schoolInfo.established}.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-red-200">
                <li><Button variant="link"  className="text-red-200 hover:text-gray-100 p-0 h-auto cursor-pointer">Digital Platform</Button></li>
                <li><a href="#achievements" className="hover:text-gray-100">Our Achievements</a></li>
                <li><a href="#about" className="hover:text-gray-100">About Us</a></li>
                <li><Button variant="link"  className="text-red-200 hover:text-gray-100 p-0 h-auto cursor-pointer">Admin Portal</Button></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Information</h4>
              <div className="text-red-200 space-y-2">
                <p className="flex items-start">
                  <MapPin className="w-4 h-4 mr-2 mt-1 flex-shrink-0" />
                  {schoolInfo.address}
                </p>
                <p>Phone: {schoolInfo.phone}</p>
                <p>Email: {schoolInfo.email}</p>
                <p>Principal: {schoolInfo.principal}</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-red-700 mt-8 pt-8 text-center text-red-200">
            <p>&copy; 2024 Moreko High School. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
    </>
    
  );
};




export default HomePage;
