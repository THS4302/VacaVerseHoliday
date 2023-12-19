/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    // Define your environment variables here
    SERVER_BASE_URL: process.env.SERVER_BASE_URL,
    // Add more variables as needed
  },
  images: {
    domains: ['res.cloudinary.com'],
  },
};

module.exports = nextConfig;
