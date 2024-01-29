import { NextResponse } from 'next/server';
import type { NextRequest, NextFetchEvent } from 'next/server';


 export const middleware = (req: NextRequest, event: NextFetchEvent) => {
  const env:string = process.env.NODE_ENV;

  const nonce = Buffer.from(crypto.randomUUID()).toString('base64')
  const scriptSrc: string = env === 'development' || env === 'local' ? `'unsafe-eval' 'nonce-${nonce}'` : `'nonce-${nonce}'`;
  const ContentSecurityPolicy = `
  default-src 'unsafe-inline';
  style-src 'unsafe-inline' 'self' data:;
  style-src-elem 'unsafe-inline' 'self' data:;
  img-src 'self' data: 'unsafe-inline';
  frame-src 'self';
  frame-ancestors 'self';
  object-src 'none';
  connect-src 'self';
  script-src-elem 'self';
  base-uri 'self';
  script-src ${scriptSrc};
`;
//   script-src ${unsafeEval} ${req.nextUrl.host};
//`base-uri 'self'; default-src 'unsafe-inline'; style-src 'unsafe-inline'; img-src 'self' data: 'unsafe-inline'; connect-src 'self'; frame-src 'self'; frame-ancestors 'self'; object-src 'none'; script-src-elem 'self';`;
  const response = NextResponse.next();
  response.headers.set('Content-Security-Policy', ContentSecurityPolicy.replace(/\n/g, ''));
  response.headers.set('Referrer-Policy', 'origin');
  response.headers.set('Access-Control-Allow-Origin', req.nextUrl.origin);
  response.headers.set('Cache-Control', 'private, no-cache, no-store, must-revalidate, max-age=0');
  return response;
}
