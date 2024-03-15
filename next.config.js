/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: { styledComponents: true },
 
  images: {
    domains: ["yamaha-motor.com", "bodero-ecommence-admin.s3.amazonaws.com"],
  },
};

module.exports = nextConfig;
