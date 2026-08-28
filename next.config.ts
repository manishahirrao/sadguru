import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",          // Task 14.1 — full static export, no server-side routes
  trailingSlash: true,       // Ensures /menu/ works correctly on static hosts
  images: {
    unoptimized: true,       // Required for static export; images are pre-optimized manually (WebP)
  },
};

export default nextConfig;
