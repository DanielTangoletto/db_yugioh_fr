import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.lerepairedudragon.fr",
      },
      {
        protocol: "https",
        hostname: "www.cards-capital.com",
      },
      {
        protocol: "https",
        hostname: "www.play-in.com",
      },
      {
        protocol: "https",
        hostname: "static.wikia.nocookie.net",
      },
      {
        protocol: "https",
        hostname: "s3.duellinksmeta.com",
      },
      {
        protocol: "https",
        hostname: "steamuserimages-a.akamaihd.net",
      },
      {
        protocol: "https",
        hostname: "images.thenile.io",
      },
    ],
  },

};

export default nextConfig;
