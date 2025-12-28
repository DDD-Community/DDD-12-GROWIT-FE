import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  plugins: {
    '@tailwindcss/postcss': {},
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'growit-images.s3.ap-northeast-2.amazonaws.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
