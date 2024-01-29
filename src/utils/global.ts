import { NextApiRequest } from 'next';
import  EnvironmentLevel  from '../enums/EnvironmentLevel'
import RequestDetails from '../interfaces/api/RequestDetails';

export const getQueryStringValue = (parameter: string): any => {
  let queryString: string = window.location.search;
  if (!queryString || queryString === '') {
    return null;
  }

  queryString = queryString.substring(1);
  const queryCollection: string[] = queryString.split('&');
  for (const param of queryCollection) {
    const keyValuePair: string[] = param.split('=');
    if (keyValuePair[0].trim().toUpperCase() === parameter.toUpperCase()) {
      return keyValuePair[1].trim();
    }
  }

  return null;
};

const currentEnv:string = 'dev'; //To get from config/settings/enviornment!

export const CurrentHostEnvironment =
  EnvironmentLevel[
    EnvironmentLevel[
      currentEnv
    ] as keyof typeof EnvironmentLevel
  ];

  export const getRequestDetails = (req: NextApiRequest) : RequestDetails => {
    const query:  Partial<{
      [key: string]: string | string[];
  }> = req.query;

    const host:string = req.headers.host
    const socket:any = req.socket;
    const routeIndex:string[] = query.index as string[];
    let routeString:string = routeIndex?.join('/');
    let queryString:string = '';
    Object.entries(query).forEach(([key, value]) => {
        if (key !== 'index')
        {
            queryString += `${key}=${value}`;
        }
    });

    const httpProtocol: 'http' | 'https' =
    req.headers["x-forwarded-proto"] || socket.encrypted
      ? "https"
      : "http";

    if (routeString)
    {
      routeString = `/${routeString}`;
    };

    if (queryString)
    {
      queryString = `?${queryString}`;
    };

    const absouluteUrl:string = `${httpProtocol}://${host}${routeString}${queryString}`;

      const requestDetails: RequestDetails =
      {
        absouluteUrl: absouluteUrl,
        method: req.method,
        relativeUrl: req.url,
        host: host,
        httpProtocol: httpProtocol,
        routeString: routeString,
        queryString: queryString,
        query: query,
        body: req.body,
        cookies: req.cookies
      };

      return requestDetails;
};
  
export const getEnvVariableValue = (key: string): string => {
    return process.env[key];
}