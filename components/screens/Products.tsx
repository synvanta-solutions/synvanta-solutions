// Products.tsx — Server Component
// Product names, descriptions, and categories are rendered on the server
// inside an sr-only list (crawler-readable, visually hidden).
// The interactive fan carousel is deferred to ProductsCarousel (client).

import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";
import ProductsCarousel from "@/components/organisms/ProductsCarousel";

export type DeviceView = "desktop" | "tablet" | "mobile";

export interface ProductGalleryImage {
  src: string;
  caption?: string;
  device?: DeviceView; // Which device tab this image belongs to
}

export interface Product {
  id: number;
  name: string;
  description: string;
  category: string;
  img: string;
  gallery?: ProductGalleryImage[];
}

export const products: Product[] = [
  {
    id: 1,
    name: "Inventory Management",
    description: "Real-time stock tracking and automated alerts",
    category: "Business Systems",
    img: "/demo/inventory-system/tablet/light-main-page.webp",
    gallery: [
      // Desktop
      {
        src: "/demo/inventory-system/desktop/light-main-page.webp",
        caption: "Main Page",
        device: "desktop",
      },
      {
        src: "/demo/inventory-system/desktop/light-inventory-page.webp",
        caption: "Inventory Page",
        device: "desktop",
      },
      {
        src: "/demo/inventory-system/desktop/light-products-page.webp",
        caption: "Products Page",
        device: "desktop",
      },
      {
        src: "/demo/inventory-system/desktop/light-suppliers-page.webp",
        caption: "Suppliers Page",
        device: "desktop",
      },
      {
        src: "/demo/inventory-system/desktop/light-orders-page.webp",
        caption: "Orders Page",
        device: "desktop",
      },
      {
        src: "/demo/inventory-system/desktop/light-reports-page.webp",
        caption: "Reports Page",
        device: "desktop",
      },
      {
        src: "/demo/inventory-system/desktop/dark-main-page.webp",
        caption: "Main Page (Dark)",
        device: "desktop",
      },
      {
        src: "/demo/inventory-system/desktop/dark-inventory-page.webp",
        caption: "Inventory Page (Dark)",
        device: "desktop",
      },
      {
        src: "/demo/inventory-system/desktop/dark-products-page.webp",
        caption: "Products Page (Dark)",
        device: "desktop",
      },
      {
        src: "/demo/inventory-system/desktop/dark-suppliers-page.webp",
        caption: "Suppliers Page (Dark)",
        device: "desktop",
      },
      {
        src: "/demo/inventory-system/desktop/dark-orders-page.webp",
        caption: "Orders Page (Dark)",
        device: "desktop",
      },
      {
        src: "/demo/inventory-system/desktop/dark-reports-page.webp",
        caption: "Reports Page (Dark)",
        device: "desktop",
      },
      // Tablet
      {
        src: "/demo/inventory-system/tablet/light-main-page.webp",
        caption: "Main Page",
        device: "tablet",
      },
      {
        src: "/demo/inventory-system/tablet/light-inventory-page.webp",
        caption: "Inventory Page",
        device: "tablet",
      },
      {
        src: "/demo/inventory-system/tablet/light-products-page.webp",
        caption: "Products Page",
        device: "tablet",
      },
      {
        src: "/demo/inventory-system/tablet/light-suppliers-page.webp",
        caption: "Suppliers Page",
        device: "tablet",
      },
      {
        src: "/demo/inventory-system/tablet/light-orders-page.webp",
        caption: "Orders Page",
        device: "tablet",
      },
      {
        src: "/demo/inventory-system/tablet/light-reports-page.webp",
        caption: "Reports Page",
        device: "tablet",
      },
      {
        src: "/demo/inventory-system/tablet/dark-main-page.webp",
        caption: "Main Page (Dark)",
        device: "tablet",
      },
      {
        src: "/demo/inventory-system/tablet/dark-inventory-page.webp",
        caption: "Inventory Page (Dark)",
        device: "tablet",
      },
      {
        src: "/demo/inventory-system/tablet/dark-products-page.webp",
        caption: "Products Page (Dark)",
        device: "tablet",
      },
      {
        src: "/demo/inventory-system/tablet/dark-suppliers-page.webp",
        caption: "Suppliers Page (Dark)",
        device: "tablet",
      },
      {
        src: "/demo/inventory-system/tablet/dark-orders-page.webp",
        caption: "Orders Page (Dark)",
        device: "tablet",
      },
      {
        src: "/demo/inventory-system/tablet/dark-reports-page.webp",
        caption: "Reports Page (Dark)",
        device: "tablet",
      },
      // Mobile
      {
        src: "/demo/inventory-system/mobile/light-main-page.webp",
        caption: "Main Page",
        device: "mobile",
      },
      {
        src: "/demo/inventory-system/mobile/light-inventory-page.webp",
        caption: "Inventory Page",
        device: "mobile",
      },
      {
        src: "/demo/inventory-system/mobile/light-products-page.webp",
        caption: "Products Page",
        device: "mobile",
      },
      {
        src: "/demo/inventory-system/mobile/light-suppliers-page.webp",
        caption: "Suppliers Page",
        device: "mobile",
      },
      {
        src: "/demo/inventory-system/mobile/light-orders-page.webp",
        caption: "Orders Page",
        device: "mobile",
      },
      {
        src: "/demo/inventory-system/mobile/light-reports-page.webp",
        caption: "Reports Page",
        device: "mobile",
      },
      {
        src: "/demo/inventory-system/mobile/dark-main-page.webp",
        caption: "Main Page (Dark)",
        device: "mobile",
      },
      {
        src: "/demo/inventory-system/mobile/dark-inventory-page.webp",
        caption: "Inventory Page (Dark)",
        device: "mobile",
      },
      {
        src: "/demo/inventory-system/mobile/dark-products-page.webp",
        caption: "Products Page (Dark)",
        device: "mobile",
      },
      {
        src: "/demo/inventory-system/mobile/dark-suppliers-page.webp",
        caption: "Suppliers Page (Dark)",
        device: "mobile",
      },
      {
        src: "/demo/inventory-system/mobile/dark-orders-page.webp",
        caption: "Orders Page (Dark)",
        device: "mobile",
      },
      {
        src: "/demo/inventory-system/mobile/dark-reports-page.webp",
        caption: "Reports Page (Dark)",
        device: "mobile",
      },
    ],
  },
  {
    id: 2,
    name: "GIS Web System",
    description: "Interactive maps with geospatial data visualization",
    category: "Geospatial Solutions",
    img: "/demo/gis-system/tablet/sidebar-inactive.webp",
    gallery: [
      // Desktop
      {
        src: "/demo/gis-system/low-status.webp",
        caption: "Low Heatmap",
        device: "desktop",
      },
      {
        src: "/demo/gis-system/moderate-status.webp",
        caption: "Moderate Heatmap",
        device: "desktop",
      },
      {
        src: "/demo/gis-system/high-status.webp",
        caption: "High Heatmap",
        device: "desktop",
      },
      {
        src: "/demo/gis-system/very-high-status.webp",
        caption: "Very High Heatmap",
        device: "desktop",
      },
      // Tablet
      {
        src: "/demo/gis-system/tablet/sidebar-inactive.webp",
        caption: "Overview",
        device: "tablet",
      },
      {
        src: "/demo/gis-system/tablet/right-sidebar.webp",
        caption: "Filter Sidebar",
        device: "tablet",
      },
      {
        src: "/demo/gis-system/tablet/left-sidebar.webp",
        caption: "Municipality Details",
        device: "tablet",
      },
      // Mobile
      {
        src: "/demo/gis-system/mobile/sidebar-inactive.webp",
        caption: "Overview",
        device: "mobile",
      },
      {
        src: "/demo/gis-system/mobile/filter-active.webp",
        caption: "High Heatmap",
        device: "mobile",
      },
      {
        src: "/demo/gis-system/mobile/right-sidebar.webp",
        caption: "Municipality Details",
        device: "mobile",
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
