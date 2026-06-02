// Products.tsx - Server Component
// Product names, descriptions, and categories are rendered on the server
// inside an sr-only list (crawler-readable, visually hidden).
// The interactive fan carousel is deferred to ProductsCarousel (client).

"use client";

import { motion, Variants, Easing } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";
import ProductsCarousel from "@/components/organisms/ProductsCarousel";
import { products } from "@/data/products";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { 
      duration: 0.6, 
      ease: "easeOut" as Easing // Type assertion for the ease string
    },
  },
};

const Products = () => {
  return (
    <section className="bg-background w-full overflow-x-hidden">
      <div className="py-12 sm:py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {/* LEFT COLUMN: Header Content */}
            <div className="lg:col-span-5 flex flex-col items-center lg:items-start space-y-6">
              <motion.div variants={itemVariants}>
                <Badge
                  variant="secondary"
                  className="w-fit text-[10px] sm:text-xs tracking-widest uppercase flex items-center gap-1 sm:gap-2"
                >
                  <Sparkles
                    className="h-3 w-3 sm:h-3.5 sm:w-3.5"
                    aria-hidden="true"
                  />
                  <span className="hidden sm:inline">Featured Work</span>
                  <span className="sm:hidden">Portfolio</span>
                </Badge>
              </motion.div>

              <motion.h2
                variants={itemVariants}
                className="text-2xl sm:text-4xl lg:text-5xl font-extrabold leading-[1.2] sm:leading-[1.1] tracking-tight"
              >
                Our Demo Projects
              </motion.h2>

              <motion.p
                variants={itemVariants}
                className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-md"
              >
                Explore the systems we've built — from business tools and GIS
                platforms to AI integrations and mobile apps. Real work,
                shipped.
              </motion.p>

              {/*
                Screen-reader / crawler list — always in the DOM, visually hidden.
                Ensures all product names and descriptions are indexed.
              */}
              <ul className="sr-only">
                {products.map((p) => (
                  <li key={p.id}>
                    <strong>{p.name}</strong> ({p.category}): {p.description}
                  </li>
                ))}
              </ul>
            </div>

            {/* RIGHT COLUMN: Carousel */}
            <motion.div 
              className="lg:col-span-7"
              variants={itemVariants}
            >
              <ProductsCarousel products={products} />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Products;