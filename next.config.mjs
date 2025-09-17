
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
  },
  webpack(config) {
    config.externals.push({
      '@google-cloud/vertexai-preview':
        'commonjs @google-cloud/vertexai-preview',
      '@google-cloud/vertexai': 'commonjs @google-cloud/vertexai',
    });
    return config;
  },
};

export default nextConfig;
