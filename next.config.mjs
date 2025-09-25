/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'picsum.photos' },
      { protocol: 'https', hostname: 'i.pravatar.cc' },
    ],
  },
  serverExternalPackages: [
    '@genkit-ai/googleai',
    'firebase-admin',
    'long',
    '@opentelemetry/api',
  ],
  experimental: {
    allowedDevOrigins: [
      '9000-firebase-advance-profolio-1758816018892.cluster-y75up3teuvc62qmnwys4deqv6y.cloudworkstations.dev',
      // Add other origins here if needed
    ],
  },
};

export default nextConfig;
