/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // domains: [
    //   "m.media-amazon.com",
    //   "upload.wikimedia.org",
    //   "images.unsplash.com",
    // ],
    // remotePatterns: [
    //   {
    //     protocol: "https",
    //     hostname: "drive.google.com",
    //     pathname: "/uc**",
    //   },
    // ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Allows images from any HTTPS domain
      },
    ],
  },
};

export default nextConfig;
