import Navbar from "@/components/layouts/Navbar";
import Hero from "@/components/layouts/Hero";
import PromoBanner from "@/components/layouts/PromoBanner";
import About from "@/components/layouts/About";
import Footer from "@/components/layouts/Footer";

export default function Home() {
  return (
    <>
      <PromoBanner />
      <Navbar />
      <Hero />
      <About />
      <Footer />
    </>
  );
}
