/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.worker\.(ts|js)$/,
      use: { loader: "worker-loader" },
    });
    return config;
  },
};

export default nextConfig;
