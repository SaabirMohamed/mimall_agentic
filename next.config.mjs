/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['hailoride.com'],
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': '.',
    };
    return config;
  },
}

export default nextConfig
