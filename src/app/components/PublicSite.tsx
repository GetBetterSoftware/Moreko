import React from "react";
import MapSection from "./map";
import { 
  GraduationCap, 
  BookOpen, 
  MapPin,
  Trophy,
  Users,
  Settings,
  User,
  LogIn,
  Lock,
  Download,
  Calendar
} from "lucide-react";

interface PublicSiteProps {
  onAdminLogin: () => void;
  onUserLogin: () => void;
}

const PublicSite = ({ onAdminLogin, onUserLogin }: PublicSiteProps) => {
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

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-red-800 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <GraduationCap className="w-8 h-8" />
              <div>
                <h1 className="text-xl font-bold">Moreko High School</h1>
                <p className="text-red-200 text-sm">Excellence in Education</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={onUserLogin}
                className="border border-white text-red-800 px-3 py-1 rounded hover:bg-red-700 hover:text-white flex items-center"
              >
                <User className="w-4 h-4 mr-2" />
                Sign In
              </button>
              <button
                onClick={onAdminLogin}
                className="border border-white text-red-800 px-3 py-1 rounded hover:bg-red-700 hover:text-white flex items-center"
              >
                <Settings className="w-4 h-4 mr-2" />
                Admin
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-red-800 to-red-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            Welcome to Moreko High School
          </h2>
          <p className="text-xl md:text-2xl mb-8 text-red-100">
            {schoolInfo.motto}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={onUserLogin} 
              className="bg-white text-red-800 px-6 py-3 rounded text-lg font-semibold flex items-center justify-center hover:bg-gray-100"
            >
              <LogIn className="w-5 h-5 mr-2" />
              Join Our Digital Platform
            </button>
            <button
              className="border border-white text-white px-6 py-3 rounded text-lg font-semibold flex items-center justify-center hover:bg-white hover:text-red-800"
            >
              <BookOpen className="w-5 h-5 mr-2" />
              Learn More About Us
            </button>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Platform Access Notice */}
        <section className="mb-16 bg-gradient-to-r from-red-50 to-red-100 rounded-lg p-8 border-l-4 border-red-800">
          <div className="text-center">
            <Lock className="w-12 h-12 mx-auto text-red-800 mb-4" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Digital Platform Access</h2>
            <p className="text-gray-700 text-lg mb-6">
              Our digital magazine, news articles, downloadable resources, and communication features are available to registered students and parents only.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={onUserLogin}
                className="bg-red-800 px-6 py-3 rounded text-white font-semibold hover:bg-red-900 flex items-center justify-center"
              >
                <Users className="w-5 h-5 mr-2" />
                Register / Sign In
              </button>
            </div>
            <p className="text-sm text-gray-600 mt-4">
              Access news, digital library, newsletters, and stay connected with school updates
            </p>
          </div>
        </section>

        {/* About Our School */}
        <section className="mb-16">
          <h2 id="about" className="text-3xl font-bold text-gray-900 mb-8 text-center">About Moreko High School</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <MapPin className="w-6 h-6 mr-3 text-red-800" />
                <h3 className="text-lg font-semibold">School Information</h3>
              </div>
              <div className="space-y-4 text-gray-600">
                <div>
                  <h4 className="font-semibold text-gray-900">Address</h4>
                  <p>{schoolInfo.address}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Contact</h4>
                  <p>Phone: {schoolInfo.phone}</p>
                  <p>Email: {schoolInfo.email}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Principal</h4>
                  <p>{schoolInfo.principal}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Established</h4>
                  <p>{schoolInfo.established}</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <GraduationCap className="w-6 h-6 mr-3 text-red-800" />
                <h3 className="text-lg font-semibold">Our Mission</h3>
              </div>
              <p className="text-gray-700 leading-relaxed mb-4">
                Moreko High School is dedicated to providing quality education that nurtures academic excellence, 
                character development, and community leadership. We strive to prepare our learners for success 
                in higher education and meaningful careers.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Since {schoolInfo.established}, we have been a cornerstone of education in our community, 
                fostering a culture of learning, respect, and achievement.
              </p>
            </div>
          </div>
        </section>

        {/* School Achievements */}
        <section id="achievements" className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 flex items-center justify-center">
              <Trophy className="w-8 h-8 mr-3 text-red-800" />
              Our Achievements
            </h2>
            <p className="text-gray-600 mt-2">Celebrating excellence in academics and extracurricular activities</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((achievement, idx) => (
              <div key={idx} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold">{achievement.title}</h3>
                  <span className="text-2xl font-bold text-red-800">{achievement.year}</span>
                </div>
                <p className="text-gray-600">{achievement.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Platform Features Preview */}
        <section className="mb-16 bg-gray-50 rounded-lg p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">What's Available on Our Digital Platform</h2>
            <p className="text-gray-600 mt-2">Sign in to access these exclusive features</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

            <div className="bg-white p-6 text-center rounded-lg opacity-75">
              <div className="p-3 bg-red-100 rounded-lg mx-auto w-fit mb-4">
                <BookOpen className="w-8 h-8 text-red-800" />
              </div>
              <h3 className="font-semibold mb-2">Digital Library</h3>
              <p className="text-sm text-gray-600">Download study materials, exam papers, and educational resources</p>
              <Lock className="w-4 h-4 text-gray-400 mx-auto mt-2" />
            </div>

            <div className="bg-white p-6 text-center rounded-lg opacity-75">
              <div className="p-3 bg-red-100 rounded-lg mx-auto w-fit mb-4">
                <Calendar className="w-8 h-8 text-red-800" />
              </div>
              <h3 className="font-semibold mb-2">School News</h3>
              <p className="text-sm text-gray-600">Stay updated with latest announcements and school events</p>
              <Lock className="w-4 h-4 text-gray-400 mx-auto mt-2" />
            </div>

            <div className="bg-white p-6 text-center rounded-lg opacity-75">
              <div className="p-3 bg-red-100 rounded-lg mx-auto w-fit mb-4">
                <Users className="w-8 h-8 text-red-800" />
              </div>
              <h3 className="font-semibold mb-2">Communication</h3>
              <p className="text-sm text-gray-600">Receive SMS and email updates about important school matters</p>
              <Lock className="w-4 h-4 text-gray-400 mx-auto mt-2" />
            </div>

            <div className="bg-white p-6 text-center rounded-lg opacity-75">
              <div className="p-3 bg-red-100 rounded-lg mx-auto w-fit mb-4">
                <Download className="w-8 h-8 text-red-800" />
              </div>
              <h3 className="font-semibold mb-2">Newsletters</h3>
              <p className="text-sm text-gray-600">Access monthly newsletters and submit content for publication</p>
              <Lock className="w-4 h-4 text-gray-400 mx-auto mt-2" />
            </div>

          </div>
          <div className="text-center mt-8">
            <button
              onClick={onUserLogin}
              className="bg-red-800 hover:bg-red-900 text-white px-6 py-3 rounded text-lg font-semibold flex items-center justify-center mx-auto"
            >
              <LogIn className="w-5 h-5 mr-2" />
              Sign In to Access Platform
            </button>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-red-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <GraduationCap className="w-8 h-8" />
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
                <li>
                  <button 
                    onClick={onUserLogin} 
                    className="text-red-200 hover:text-white p-0 h-auto underline"
                  >
                    Digital Platform
                  </button>
                </li>
                <li><a href="#achievements" className="hover:text-white">Our Achievements</a></li>
                <li><a href="#about" className="hover:text-white">About Us</a></li>
                <li>
                  <button 
                    onClick={onAdminLogin} 
                    className="text-red-200 hover:text-white p-0 h-auto underline"
                  >
                    Admin Portal
                  </button>
                </li>
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
           <div className="mt-5"><MapSection/></div>
                 
          
          <div className="border-t border-red-700 mt-8 pt-8 text-center text-red-200">
            <p>&copy; 2024 Moreko High School. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PublicSite;
