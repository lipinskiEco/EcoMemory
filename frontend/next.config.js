/** @type {import('next').NextConfig} */
const webpack = require('webpack');

const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        '@react-native-async-storage/async-storage': false,
        'pino-pretty': false,
      };
      config.plugins.push(
        new webpack.IgnorePlugin({
          resourceRegExp: /^(pino-pretty|@react-native-async-storage\/async-storage)$/,
        })
      );
    }
    config.ignoreWarnings = [
      { module: /@metamask\/sdk/ },
      { module: /pino/ },
    ];
    return config;
  },
};

module.exports = nextConfig;
