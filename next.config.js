/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['three', '@react-three/fiber', '@react-three/drei'],
  reactStrictMode: false, // Turned off to avoid double-mount issues with Three.js initialization in dev
  images: {
    unoptimized: true, // Prevents layout-shift and Vercel optimization issues for static generation
  }
};

module.exports = nextConfig;
