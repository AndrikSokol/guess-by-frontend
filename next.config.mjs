/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["localhost"]
  },
  // i18n: {
  //   locales: ["en", "ru"],
  //   defaultLocale: "en"
  // },
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
