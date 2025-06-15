import Image from "next/image";
import HeroSection from "./components/heroSection";
import ContactForm from "./components/contactForm";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <HeroSection />
        <ContactForm/>
    </div>
  );
}
