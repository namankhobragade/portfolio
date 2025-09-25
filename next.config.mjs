/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'picsum.photos' },
      { protocol: 'https', hostname: 'i.pravatar.cc' },
    ],
  },
  allowedDevOrigins: [
    '9000-firebase-advance-profolio-1758816018892.cluster-y75up3teuvc62qmnwys4deqv6y.cloudworkstations.dev',
    'http://localhost:9003', // Updated to the correct port
  ],
};

export default nextConfig;
