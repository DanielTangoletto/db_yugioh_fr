import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    formats: ["image/webp"],
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
        hostname: "upload.wikimedia.org",
      },
      {
        protocol: "https",
        hostname: "www.otk-expert.fr",
      },
      {
        protocol: "https",
        hostname: "images7.alphacoders.com",
      },
    ],
  },
};

export default nextConfig;
