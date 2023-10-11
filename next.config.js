/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "multilang-blog-directus.onrender.com",
        protocol: "https",
      },
    ],
  },
};

module.exports = nextConfig;
