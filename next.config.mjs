/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["localhost"]
  },

  rewrites() {
    return [];
  }
};

export default nextConfig;
