import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  pageExtensions: ['ts', 'tsx'],
  outputFileTracingRoot: __dirname,
  allowedDevOrigins: ['192.168.1.111:3000', 'localhost:3000', '127.0.0.1:3000'],
};

export default nextConfig;
