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
  {
    id: 3,
    name: "Synvanta Essentials",
    description:
      "Premium e-commerce platform with curated products and seamless checkout",
    category: "E-Commerce Solutions",
    img: "/demo/ecommerce/tablet/list-tablet.png",
    gallery: [
      // Desktop
      {
        src: "/demo/ecommerce/cart-laptop.png",
        caption: "Shopping Cart",
        device: "desktop",
      },
      {
        src: "/demo/ecommerce/checkout-laptop.png",
        caption: "Order Review",
        device: "desktop",
      },
      {
        src: "/demo/ecommerce/product-info-laptop.png",
        caption: "Product Details",
        device: "desktop",
      },
      {
        src: "/demo/ecommerce/list-laptop.png",
        caption: "Products Catalog",
        device: "desktop",
      },
      // Tablet
      {
        src: "/demo/ecommerce/cart-laptop.png",
        caption: "Shopping Cart",
        device: "tablet",
      },
      {
        src: "/demo/ecommerce/tablet/checkout-tablet.png",
        caption: "Order Review",
        device: "tablet",
      },
      {
        src: "/demo/ecommerce/tablet/product-info-tablet.png",
        caption: "Product Details",
        device: "tablet",
      },
      {
        src: "/demo/ecommerce/tablet/list-tablet.png",
        caption: "Products Catalog",
        device: "tablet",
      },
      // Mobile
      {
        src: "/demo/ecommerce/mobile/cart-mobile.png",
        caption: "Shopping Cart",
        device: "mobile",
      },
      {
        src: "/demo/ecommerce/mobile/checkout-mobile.png",
        caption: "Order Review",
        device: "mobile",
      },
      {
        src: "/demo/ecommerce/mobile/product-info-mobile.png",
        caption: "Product Details",
        device: "mobile",
      },
      {
        src: "/demo/ecommerce/mobile/list-mobile.png",
        caption: "Products Catalog",
        device: "mobile",
      },
    ],
  },
];
