/** @type {import('next').NextConfig} */
const securityHeaders = 
[
 {
    key: 'Referrer-Policy',
    value: 'origin'
  },
  /*
  {
    key: 'Access-Control-Allow-Origin',
    value: `${process.env.NEXT_ORIGIN}`
  },
  */
  {
    key: 'Access-Control-Allow-Headers',
    value: 'X-Requested-With,Content-Type, Accept, Access-Control-*, Referrer-Policy, Origin, Content-Security-Policy, Authorization, Tenant*, X-Tenant*, Strict-Transport-Security, X-Content-Type-Options, Feature-Policy, X-Frame-Options, Pragma, Cache-Control, X-XSS-Protection'
  },
  {
    key: 'Access-Control-Allow-Credentials',
    value: 'true'
  },
  {
    key: 'Access-Control-Allow-Methods',
    value: 'GET'
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  }
  ,
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'Feature-Policy',
    value: 'display-capture \'none\'; microphone \'none\'; geolocation \'none\''
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN'
  },
  {
    key: 'Pragma',
    value: 'no-cache'
  },
  {
    key: 'Cache-Control',
    value: 'private, no-cache, no-store, must-revalidate, max-age=0'
  },
  {
    key: 'X-XSS-Protection',
    value: '1'
  },
  /*
  {
    key: 'Content-Security-Policy',
    value: `base-uri 'self'; connect-src 'self'; frame-src 'self'; frame-ancestors 'self'; object-src 'none'; script-src 'self' 'unsafe-eval';`
  }
  */
];

const routes = [
  {
    source: '/api/:path*',
    destination: '/api/gateway/:path*'
  },
  //{
 //   source: '/HomePage',
 //   destination: '/'
 // }
];

module.exports = {
  reactStrictMode: true,
  poweredByHeader: false,
  compiler: {
    styledComponents: true
  },
 /*
  experimental: {
    concurrentFeatures: true,
    serverComponents: true,
  },
  */
  async headers() {
    return [
      {
        // Apply these headers to all routes in your application.
        //source: '/(.*)',
        source: '/:path*',
        headers: securityHeaders
      },
    ]
  },

  async rewrites() { return routes;}
};