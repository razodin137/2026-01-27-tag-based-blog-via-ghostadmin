import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable static HTML export
  output: 'export',

  // For static export, we need to disable image optimization
  // since there's no server to optimize images on the fly
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'demo.ghost.io',
      },
      {
        protocol: 'https',
        hostname: 'static.ghost.org',
      },
      // Add your own Ghost domain here when ready:
      // {
      //   protocol: 'https',
      //   hostname: 'your-ghost-blog.com',
      // },
    ],
  },

  // Trailing slashes help with static hosting
  trailingSlash: true,
};

export default nextConfig;
