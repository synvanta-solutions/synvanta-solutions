import type { Metadata } from "next";
import Navbar from "@/components/molecules/Navbar";
import Hero from "@/components/screens/Hero";
import Products from "@/components/screens/Products";
import PromoBanner from "@/components/atoms/PromoBanner";
import About from "@/components/screens/About";
import Services from "@/components/screens/Services";
import Process from "@/components/screens/Process";
import Team from "@/components/screens/Team";
import Footer from "@/components/molecules/Footer";

// ── Page (Server Component — no "use client") ─────────────────────────────────
export default function Home() {
  return (
    <>
      <PromoBanner />
      <Navbar />

      {/* landmark regions help crawlers understand page structure */}
      <main>
        <Hero />

        <section
          id="products"
          aria-label="Our latest projects"
          className="scroll-mt-20"
        >
          <Products />
        </section>

        <section
          id="process"
          aria-label="How we build"
          className="scroll-mt-20"
        >
          <Process />
        </section>

        <Team />

        <section
          id="about"
          aria-label="About Synvanta"
          className="scroll-mt-20"
        >
          <About />
        </section>

        <section
          id="services"
          aria-label="Our services"
          className="scroll-mt-20"
        >
          <Services />
        </section>
      </main>

      <Footer />
    </>
  );
}
