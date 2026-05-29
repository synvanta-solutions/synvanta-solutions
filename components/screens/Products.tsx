// Products.tsx — Server Component
// Product names, descriptions, and categories are rendered on the server
// inside an sr-only list (crawler-readable, visually hidden).
// The interactive fan carousel is deferred to ProductsCarousel (client).

import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";
import ProductsCarousel from "@/components/organisms/ProductsCarousel";

export interface Product {
  id: number;
  name: string;
  description: string;
  category: string;
  img: string;
  gallery?: { src: string; caption?: string }[]; // Optional gallery images
}

export const products: Product[] = [
  {
    id: 1,
    name: "E-Commerce Platform",
    description: "Full-featured online store with payment integration",
    category: "Web Development",
    img: "https://picsum.photos/seed/ecom/560/720",
    gallery: [
      { src: "https://picsum.photos/seed/ecom/560/720", caption: "Overview" },
      {
        src: "https://picsum.photos/seed/ecom1/1200/800",
        caption: "Product Listing",
      },
      {
        src: "https://picsum.photos/seed/ecom2/1200/800",
        caption: "Cart & Checkout",
      },
      {
        src: "https://picsum.photos/seed/ecom3/1200/800",
        caption: "Mobile View",
      },
    ],
  },
  {
    id: 2,
    name: "Inventory Management",
    description: "Real-time stock tracking and automated alerts",
    category: "Business Systems",
    img: "/demo/inventory-system/light-main-page.webp",
    gallery: [
      {
        src: "/demo/inventory-system/light-main-page.webp",
        caption: "Main Page",
      },
      {
        src: "/demo/inventory-system/light-inventory-page.webp",
        caption: "Inventory Page",
      },
      {
        src: "/demo/inventory-system/light-products-page.webp",
        caption: "Products Page",
      },
      {
        src: "/demo/inventory-system/light-supplier-page.webp",
        caption: "Suppliers Page",
      },
      {
        src: "/demo/inventory-system/light-orders-page.webp",
        caption: "Orders Page",
      },
      {
        src: "/demo/inventory-system/light-reports-page.webp",
        caption: "Reports Page",
      },
      {
        src: "/demo/inventory-system/dark-main-page.webp",
        caption: "Main Page (Dark Mode)",
      },
      {
        src: "/demo/inventory-system/dark-inventory-page.webp",
        caption: "Inventory Page (Dark Mode)",
      },
      {
        src: "/demo/inventory-system/dark-products-page.webp",
        caption: "Products Page (Dark Mode)",
      },
      {
        src: "/demo/inventory-system/dark-supplier-page.webp",
        caption: "Suppliers Page (Dark Mode)",
      },
      {
        src: "/demo/inventory-system/dark-orders-page.webp",
        caption: "Orders Page (Dark Mode)",
      },
      {
        src: "/demo/inventory-system/dark-reports-page.webp",
        caption: "Reports Page (Dark Mode)",
      },
    ],
  },
  {
    id: 3,
    name: "GIS Web System",
    description: "Interactive maps with geospatial data visualization",
    category: "AI Integration",
    img: "/demo/gis-system/high-status.webp",
    gallery: [
      { src: "/demo/gis-system/low-status.webp", caption: "Low Heatmap" },
      {
        src: "/demo/gis-system/moderate-status.webp",
        caption: "Moderate Heatmap",
      },
      {
        src: "/demo/gis-system/high-status.webp",
        caption: "High Heatmap",
      },
      {
        src: "/demo/gis-system/very-high-status.webp",
        caption: "Very High Heatmap ",
      },
    ],
  },
  {
    id: 4,
    name: "Mobile App Design",
    description: "User-centric iOS and Android experiences",
    category: "UI/UX Design",
    img: "https://picsum.photos/seed/mobileapp/560/720",
    gallery: [
      { src: "https://picsum.photos/seed/ecom/560/720", caption: "Overview" },
      {
        src: "https://picsum.photos/seed/ecom1/1200/800",
        caption: "Product Listing",
      },
      {
        src: "https://picsum.photos/seed/ecom2/1200/800",
        caption: "Cart & Checkout",
      },
      {
        src: "https://picsum.photos/seed/ecom3/1200/800",
        caption: "Mobile View",
      },
    ],
  },
  {
    id: 5,
    name: "Analytics Dashboard",
    description: "Data-driven insights with real-time metrics",
    category: "Business Intelligence",
    img: "https://picsum.photos/seed/analytic/560/720",
    gallery: [
      { src: "https://picsum.photos/seed/ecom/560/720", caption: "Overview" },
      {
        src: "https://picsum.photos/seed/ecom1/1200/800",
        caption: "Product Listing",
      },
      {
        src: "https://picsum.photos/seed/ecom2/1200/800",
        caption: "Cart & Checkout",
      },
      {
        src: "https://picsum.photos/seed/ecom3/1200/800",
        caption: "Mobile View",
      },
    ],
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
                Our Demo Projects
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed text-center px-4 max-w-md sm:max-w-2xl">
                Explore the systems we've built — from business tools and GIS
                platforms to AI integrations and mobile apps. Real work,
                shipped.
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
