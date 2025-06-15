import HeroSection from "./components/heroSection";
import ContactPage from "./components/contacts";
import About from "./components/about";


export default function Home() {
  return (
    <div className="flex flex-col items-center justify-start min-h-screen py-2">
        <HeroSection />
        
        <About/>
        <ContactPage/>
    </div>
  );
}
