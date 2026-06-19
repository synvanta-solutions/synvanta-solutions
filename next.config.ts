import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: ["192.168.0.103", '127.0.0.1:3000'],
  images: {
    domains: ["images.unsplash.com", "images.shadcnspace.com", "picsum.photos"],
  },
};

export default nextConfig;
