import type { NextConfig } from "next";
import path from "path";

const BACKEND_URL = process.env.BACKEND_URL;
const nextConfig: NextConfig = {
  reactCompiler: true,

  turbopack: {
    root: path.join(__dirname),
  },

  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${BACKEND_URL}/:path*`, // ваш бэкенд
      },
    ];
  },
};

export default nextConfig;
