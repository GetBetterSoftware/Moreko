import React from "react";

import styles from "@/components/styles/HomepageStyles.module.css";
import NavBar from "./NavBar";
import Gallery from "./Gallery";
import Hero from "./Hero";
import PlatformAccess from "./PlatformAccess";
import About from "./About";
import Achievement from "./Achievement";
import PlatformFeatures from "./PlatformFeatures";
import LatestNews from "./LatestNews";
import Footer from "./Footer";

const HomePage = () => {
  return (
    <>
      <div className={`${styles.styles}`}>
        {/* Header */}
        <NavBar />
        {/* Hero Banner */}
        <section className="bg-gradient-to-r from-red-800 to-red-600 flex flex-col items-center justify-center py-16 text-gray-100  min-h-70 mt-16">
          <Hero />
        </section>

        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Platform Access Notice */}
          <section className="mb-16 bg-gradient-to-r from-red-50 to-red-100 rounded-lg p-8 border-l-4 border-red-800">
            <PlatformAccess />
          </section>

          {/* About Our School */}
          <section className="mb-5" id="about">
            <About />
          </section>

          {/* School Achievements */}
          <section className="mb-16">
            <Achievement />
          </section>

          {/* Platform Features Preview */}
          <section className="mb-16 bg-white  rounded-lg p-8">
            <PlatformFeatures />
          </section>

          {/* Latest News Section */}
          <section className="mb-16 bg-white  rounded-lg p-8">
            <LatestNews />
          </section>

          {/* Gallery Highlights Section */}
          <section className="mb-16 bg-white  rounded-lg p-8" id="gallery">
            <Gallery />
          </section>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
};

export default HomePage;
