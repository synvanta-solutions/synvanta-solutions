import Navbar from "@/components/molecules/Navbar";
import Hero from "@/components/organisms/Hero";
import Products from "@/components/organisms/Products";
import PromoBanner from "@/components/atoms/PromoBanner";
import About from "@/components/organisms/About";
import Services from "@/components/organisms/Services";
import Process from "@/components/organisms/Process";
import Footer from "@/components/molecules/Footer";

export default function Home() {
  return (
    <>
      <PromoBanner />
      <Navbar />
      <Hero />
      <div id="products" className="scroll-mt-20">
        <Products />
      </div>
      <div id="process" className="scroll-mt-20">
        <Process />
      </div>
      <div id="about" className="scroll-mt-20">
        <About />
      </div>
      <div id="services" className="scroll-mt-20">
        <Services />
      </div>
      <Footer />
    </>
  );
}
