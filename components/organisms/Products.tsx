// Products.tsx — Server Component
// Product names, descriptions, and categories are rendered on the server
// inside an sr-only list (crawler-readable, visually hidden).
// The interactive fan carousel is deferred to ProductsCarousel (client).

import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";
import ProductsCarousel from "./ProductsCarousel";

export interface Product {
  id: number;
  name: string;
  description: string;
  category: string;
  img: string;
}

export const products: Product[] = [
  {
    id: 1,
    name: "E-Commerce Platform",
    description: "Full-featured online store with payment integration",
    category: "Web Development",
    img: "https://picsum.photos/seed/ecom/560/720",
  },
  {
    id: 2,
    name: "Inventory Management",
    description: "Real-time stock tracking and automated alerts",
    category: "Business Systems",
    img: "https://picsum.photos/seed/invent/560/720",
  },
  {
    id: 3,
    name: "AI Chatbot Solution",
    description: "Intelligent customer support automation",
    category: "AI Integration",
    img: "https://picsum.photos/seed/aichat/560/720",
  },
  {
    id: 4,
    name: "Mobile App Design",
    description: "User-centric iOS and Android experiences",
    category: "UI/UX Design",
    img: "https://picsum.photos/seed/mobileapp/560/720",
  },
  {
    id: 5,
    name: "Analytics Dashboard",
    description: "Data-driven insights with real-time metrics",
    category: "Business Intelligence",
    img: "https://picsum.photos/seed/analytic/560/720",
  },
];

const Products = () => {
  return (
    <section className="bg-background w-full overflow-x-hidden">
      <div className="py-6 sm:py-12 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
          <div className="flex flex-col gap-8 md:gap-16 lg:gap-20 items-center">
            {/* Header — server-rendered */}
            <div className="flex flex-col items-center gap-3 sm:gap-4 max-w-2xl px-4 sm:px-0">
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
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-center leading-[1.2] sm:leading-[1.1] tracking-tight px-2">
                Our Latest Projects
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed text-center px-4 max-w-md sm:max-w-2xl">
                Explore our portfolio of successful projects and innovative
                solutions we&apos;ve delivered.
              </p>
            </div>

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

            {/* Interactive fan carousel — client only */}
            <ProductsCarousel products={products} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Products;
