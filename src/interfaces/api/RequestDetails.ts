import HttpRequestMethod from "../../enums/HttpRequestMethod";

export default interface RequestDetails
{
    absouluteUrl: string;
    method: HttpRequestMethod | string;
    relativeUrl: string;
    host: string;
    httpProtocol: 'http' | 'https';
    routeString: string;
    queryString: string;
    query: Partial<{
        [key: string]: string | string[];
    }>;
    body: any;
    cookies: {[key: string]: string;};
};