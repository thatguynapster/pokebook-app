/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ hostname: "raw.githubusercontent.com", pathname: "**" }],
  },
};

export default nextConfig;
