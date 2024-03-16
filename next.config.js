/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: { styledComponents: true },

  images: {
    domains: ["bodero-ecommence-admin.s3.amazonaws.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "yamaha-motor.com",
        port: "",
        pathname: "/images/**",
      },
    ],
  },
};

module.exports = nextConfig;
