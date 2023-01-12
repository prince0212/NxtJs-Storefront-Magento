/** @type {import('next').NextConfig} */
const path = require("path");
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["b2c-community.local"],
  },
  env: {
    domain: "http://b2c-community.local:8800/",
    NEXT_JS_URL: "http://localhost:3000/",
  },
};

module.exports = nextConfig;
