import { NextApiRequest, NextApiResponse, NextPageContext } from "next";
import { emptyString } from "../extensions/constants";
import crypto from 'crypto';
import HttpStatusCode from "../../enums/HttpStatusCode";
import ResponseDetails from "../../interfaces/api/ResponseDetails";
import { BadRequestError, ForbiddenRequestError } from "../../interfaces/api/ResponseError";

export const isLegalRequest = (req: NextApiRequest) : boolean =>
{
    console.log('req.headers.origin', req.headers.origin);
    console.log('req.headers.referer', req.headers.referer);
    console.log('req.headers.host', req.headers.host);
    console.log('req.socket.remoteAddress', req.socket.remoteAddress);
    console.log('req.socket.localAddress', req.socket.localAddress);
    console.log('req.socket.localFamily', req.socket.localFamily);
    console.log('req.socket.address', req.socket.address());
    const remoteIpSplit:string[] = req.socket.remoteAddress.split(':');
    const localIpSplit:string[] = req.socket.localAddress.split(':');

    const remoteIp:string = remoteIpSplit[remoteIpSplit.length - 1];
    const localIp:string = localIpSplit[localIpSplit.length - 1];
    
    const refererDomain: string = req.headers.referer?.split('/')[2]?.toUpperCase()
    //if (remoteIp !== localIp || req.headers.referer === undefined || refererDomain !==  req.headers.host.toUpperCase())
    if (req.headers.referer === undefined || refererDomain !==  req.headers.host.toUpperCase())
    {
        return false;
    }

    return true;
};

export const returnForbiddenRequest = (res: NextApiResponse<any>) : void =>
{
    const response: ResponseDetails<any> =
    {
        success: false,
        status: HttpStatusCode.Status403Forbidden,
        error : ForbiddenRequestError
    };

    res.status(403).json(response);
};

export const returnBadRequest = (res: NextApiResponse<any>) : void =>
{
    const response: ResponseDetails<any> =
    {
        success: false,
        status: HttpStatusCode.Status400BadRequest,
        error : BadRequestError
    };

    res.status(400).json(response);
};


export const getApiHost = (context: NextPageContext) : string =>
{
    const protocol: string = context.req.socket.localPort === 443? "https" : "Http";
    const host: string = `${protocol}://${context.req.headers.host}`;
    return host;
};

export const setContextResponseHeaders = (context: NextPageContext, host: string) : void =>
{
    const env:string = process.env.NODE_ENV;
    const nonce: string = crypto.randomBytes(16).toString('base64');
    const scriptSrc: string = env === 'development' || env === 'local' ? `'unsafe-eval' 'nonce-${nonce}'` : `'nonce-${nonce}'`;
    const ContentSecurityPolicy = `
    default-src 'none';
    form-action 'self';
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
    context.res.setHeader('Cache-Control', 'private, no-cache, no-store, must-revalidate, max-age=0');
    context.res.setHeader('Content-Security-Policy', ContentSecurityPolicy.replace(/\n/g, '').replace(/\t/g, emptyString).replace("    ", emptyString));
    context.res.setHeader('Referrer-Policy', 'origin');
    context.res.setHeader('Access-Control-Allow-Origin', host);
    context.res.setHeader('Access-Control-Allow-Credentials', 'true');
};