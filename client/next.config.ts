import type { NextConfig } from "next";

require('dotenv').config({ path: '../.env' })

const nextConfig: NextConfig = {
  reactStrictMode: false
};

export default nextConfig;
