/** @type {import('next').NextConfig} */
const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
];

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async headers() {
    return [
      { source: '/:path*', headers: securityHeaders },
      // Admin surfaces must never be framed by other sites (clickjacking protection).
      ...['/dashboard/:path*', '/login', '/register'].map((source) => ({
        source,
        headers: [{ key: 'Content-Security-Policy', value: "frame-ancestors 'self'" }],
      })),
      // The chatbot iframe is the one page designed to be embedded anywhere.
      {
        source: '/embed/:path*',
        headers: [{ key: 'Content-Security-Policy', value: 'frame-ancestors *' }],
      },
    ];
  },
};

export default nextConfig;
