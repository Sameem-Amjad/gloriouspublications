/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Covers are small local JPGs, and admins may paste a cover URL from any
    // host. Serving images as they are avoids running an open image proxy.
    unoptimized: true
  }
};

export default nextConfig;
