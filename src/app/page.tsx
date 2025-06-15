import Image from "next/image";
import HeroSection from "./components/heroSection";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <HeroSection />
    </div>
  );
}
