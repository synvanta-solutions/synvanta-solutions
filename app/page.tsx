import Navbar from "@/components/layouts/Navbar";
import Hero from "@/components/layouts/Hero";
import Products from "@/components/layouts/Products";
import PromoBanner from "@/components/layouts/PromoBanner";
import About from "@/components/layouts/About";
import Services from "@/components/layouts/Services";
import Process from "@/components/layouts/Process";
import Footer from "@/components/layouts/Footer";

export default function Home() {
  return (
    <>
      <PromoBanner />
      <Navbar />
      <Hero />
      <div id="products" className="scroll-mt-20">
        <Products />
      </div>
      <div id="about" className="scroll-mt-20">
        <About />
      </div>
      <div id="services" className="scroll-mt-20">
        <Services />
      </div>
      <div id="process" className="scroll-mt-20">
        <Process />
      </div>
      <Footer />
    </>
  );
}
