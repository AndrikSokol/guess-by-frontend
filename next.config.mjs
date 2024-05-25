/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["localhost"]
  },
  i18n: {
    locales: ["en-US", "ru"],
    defaultLocale: "en-US"
  },
  rewrites() {
    return [
      //   {
      //     source: "/api/:path*",
      //     destination: "/:path*"
      //   }
    ];
  }
};

export default nextConfig;
