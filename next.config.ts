import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config) => {
    // This is to handle Node.js modules like 'fs', 'path', etc. in the browser
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      path: false,
      os: false,
      crypto: false,
    };
    return config;
  },
};

export default nextConfig;
