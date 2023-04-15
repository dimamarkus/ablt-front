/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "localhost",
      process.env.STORAGE_BUCKET_URL,
    ],
  },
};

module.exports = nextConfig;
