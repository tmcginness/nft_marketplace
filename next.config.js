/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: { ignoreDuringBuilds: true },
  images: {
    domains: ['ipfs.infura.io', 'teds-nft-marketplace.infura-ipfs.io'],
  },
};

module.exports = nextConfig;
