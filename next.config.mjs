/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'wp.tyronhayman.me',
          },
        ],
      },
};

export default nextConfig;
