import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [25, 50, 70, 75],
  },
  experimental: {
    serverActions: {
      allowedOrigins: [
        "localhost:3000",
        "3flvd45z-3000.euw.devtunnels.ms", // ваш домен туннеля
        "*.devtunnels.ms", // все поддомены devtunnels
      ],
    },
  },
};

export default nextConfig;
