/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: { styledComponents: true },
  env: {
    BASE_URL: "http://localhost:3000",
  },
};

module.exports = nextConfig;
