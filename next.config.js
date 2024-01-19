/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: { styledComponents: true },
  env: {
    BASE_URL: "http://localhost:3000",
    API_KEY: "AIzaSyA1_gLpX5-gmo_TAz80hLxF64U97QtUzWg",
  },
};

module.exports = nextConfig;
