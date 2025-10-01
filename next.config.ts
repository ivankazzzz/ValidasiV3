import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lkuksddrbsoutwboyhon.supabase.co',
      },
    ],
  },
};

export default nextConfig;
