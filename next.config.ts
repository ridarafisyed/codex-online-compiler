import type { NextConfig } from "next";

const nextConfig = {
  webpack(config: any) {
    config.module.rules.push({
      test: /\.worker\.(ts|js)$/,
      use: { loader: "worker-loader" },
    });
    return config;
  },
};

module.exports = nextConfig;
