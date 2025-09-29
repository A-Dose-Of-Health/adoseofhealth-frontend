import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "static01.nyt.com",
      },
      {
        protocol: "https",
        hostname: "www.thelancet.com",
      },
      {
        protocol: "https",
        hostname: "digitalscholar.lsuhsc.edu",
      },
      {
      protocol: "https",
      hostname: "i.ytimg.com",
    },
    ],
  },
};

export default nextConfig;
