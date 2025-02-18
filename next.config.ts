import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    API_URL: "http://localhost:3000",
  },
  images: {
    domains: ["localhost"],
  },
};

export default nextConfig;
