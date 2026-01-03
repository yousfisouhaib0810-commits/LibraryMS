import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Image optimization for faster loading
  images: {
    formats: ['image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 year cache
  },

  // Enable compression
  compress: true,

  // Optimize production build
  productionBrowserSourceMaps: false,

  // Optimize package imports for smaller bundles
  experimental: {
    optimizePackageImports: ['framer-motion', 'lucide-react'],
  },
};

export default nextConfig;
