/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  async rewrites() {
    return [
      {
        source: "/quiz",
        destination: "/quiz/index.html",
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/images",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=9999999999, must-revalidate",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
