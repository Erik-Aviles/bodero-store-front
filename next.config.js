/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: { styledComponents: true },
  images: {
    loader: "custom",
    loaderFile:
      "./components/loaderes/localLoader.js" ||
      "./components/loaderes/awsS3Loader.js" ||
      "./components/loaderes/cloudinaryLoader.js",
  },
};

module.exports = nextConfig;
