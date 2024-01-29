import crypto from 'crypto';
import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';
import Script from "next/script";

const cspHashOf = (text) : string => {
  const hash = crypto.createHash('sha256');
  hash.update(text);
  return `'sha256-${hash.digest('base64')}'`;
};

export default class MyDocument extends Document {
  render() {
    const commonCsp:string = "base-uri 'self'; default-src 'unsafe-inline'; style-src 'unsafe-inline' 'self' data:; style-src-elem 'unsafe-inline' 'self' data:; img-src 'self' data: 'unsafe-inline'; connect-src 'self'; frame-src 'self'; script-src-elem 'self'; object-src 'none';";
    const cspHash: string = cspHashOf(NextScript.getInlineScriptSource(this.props));
    let csp: string = `${commonCsp} script-src ${cspHash}`;

    if (process.env.NODE_ENV !== 'production') 
    {
        csp = `${commonCsp} script-src 'unsafe-eval'`;
    }

    return (
      <Html>
        <Head>
          <meta httpEquiv="Content-Security-Policy" content={csp} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
};