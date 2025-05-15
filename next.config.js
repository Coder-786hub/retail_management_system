/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    // Make sure both environment variable names work
    VITE_OPENAI_KEY: process.env.VITE_OPENAI_KEY || process.env.OPENAI_API_KEY || process.env.NEXT_PUBLIC_OPENAI_KEY,
    NEXT_PUBLIC_OPENAI_KEY: process.env.NEXT_PUBLIC_OPENAI_KEY || process.env.VITE_OPENAI_KEY || process.env.OPENAI_API_KEY,
  },
};

module.exports = nextConfig;
