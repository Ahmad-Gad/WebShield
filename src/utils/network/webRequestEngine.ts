import HttpRequestMethod from "../../enums/HttpRequestMethod";
import ResponseDetails from "../../interfaces/api/ResponseDetails";
import ResponseError, { GatewayTimeoutError, InternalServerError, ServiceUnavailableError } from "../../interfaces/api/ResponseError";

export const invokeWebRequest = async (
    uri:string, 
    method: HttpRequestMethod | string,
    body?: any | undefined | null,
    headers?: HeadersInit | string[][] | Record<string, string> | Headers) : Promise<any> => {
    try {
          const safeBody:any = [HttpRequestMethod.GET.toString(), HttpRequestMethod.PUT.toString()].indexOf(method) === -1? body : null;
          const res : Response = await fetch(uri,
          {
            method: method,
            body: safeBody,
            headers: headers as HeadersInit
          });
          
         const contentType = res.headers.get("content-type");
         const value: any = contentType && contentType.indexOf("application/json") !== -1 ? await res.json() : await res.text();
          const response: ResponseDetails<any> = 
          {
            success: true,
            status: 200,
            data: value
          };

        return response;
      } catch (err : ResponseError | any) {
        switch(err.code)
        {
          case "ECONNREFUSED":
          {
            err.statusCode = ServiceUnavailableError.statusCode;
            err.message = ServiceUnavailableError.message;
            break;
          }

          case "ETIMEDOUT":
          {
            err.statusCode = GatewayTimeoutError.statusCode;
            err.message = GatewayTimeoutError.message;
            break;
          }
          
          default:
          {
            err.statusCode = InternalServerError.statusCode;
            err.message = InternalServerError.message
            break;
          }
        }
  
        const response: ResponseDetails<any> = 
        {
          success: false,
          status: err.statusCode,
          error: err
        };

        return response;
      }
  };