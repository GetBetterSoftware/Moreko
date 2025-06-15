import HeroSection from "./components/heroSection";
import About from "./components/about";

export default function Home() {
  return (
    <div className="flex flex-col items-center min-h-screen py-2">
        <HeroSection />
        {/* <About/> */}
    </div>
  );
}
