import HttpRequestMethod from "../../enums/HttpRequestMethod";
import ResponseDetails from "../../interfaces/api/ResponseDetails";
import ResponseError from "../../interfaces/api/ResponseError";

 const externalApi = async (
  api:string, 
  method: HttpRequestMethod | string,
  body?: any | undefined | null,
  host?:string,
  headers?: HeadersInit) : Promise<ResponseDetails<any>> => 
  {
    let origin: string = host ?? global.window?.location?.origin ?? "http://localhost";
    
    if (origin && origin.endsWith("/"))
    {
      origin = origin.substring(0, origin.length - 1);
    }

    let plusHeaders : HeadersInit = 
    {
        'Referrer-Policy': 'same-origin',
        'externalApi':'externalApi',
        'Access-Control-Allow-Origin':  origin
    };

    if (headers) {
      plusHeaders = {...plusHeaders, ...headers};
    }

  try {
        if (api.startsWith('/'))
        {
          api = api.substring(1);
        }
        
        const apiRoute: string = `${origin}/api/${api}`;
        const res = await fetch(apiRoute,
        {
          method: method,
          headers: plusHeaders,
          body: body
        });
      
        const status: number = await res.status;
        if (status !== 200)
        {
          const jsonString: string = await res.text();
          const clientResponse: ResponseDetails<any> = JSON.parse(jsonString);
          clientResponse.status = status;
          return clientResponse;
        }

      const data = await res.json();
      return data;
    } catch (err : ResponseError | any) {
      err.statusCode = 500;
      const errorResponse: ResponseDetails<any> =
      {
        status: 500,
        success: false,
        error: err
      };

      return errorResponse;
    }
};

export default externalApi;