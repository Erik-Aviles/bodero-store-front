/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: { styledComponents: true },
  images: {
    loader: "custom",
    loaderFile:
      "./components/localLoader.js" ||
      "./components/awsS3Loader.js" ||
      "./components/boderoLoader.js.js",
  },
};

module.exports = nextConfig;
