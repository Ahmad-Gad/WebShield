import HttpStatusCode from "../../enums/HttpStatusCode";

export default interface ResponseError
{
    message?: string;
    type?: string;
    code?: string;
    statusCode? : number;
    errno?: any;
};

export const BadRequestError : ResponseError = { statusCode: HttpStatusCode.Status400BadRequest, message: "Bad Request" };
export const UnauthorizedRequestError : ResponseError = { statusCode: HttpStatusCode.Status401Unauthorized, message: "Unauthorized Request" };
export const ForbiddenRequestError : ResponseError = { statusCode: HttpStatusCode.Status403Forbidden, message: "Forbidden Request" };
export const ResourceNotFoundError : ResponseError = { statusCode: HttpStatusCode.Status404NotFound};
export const MethodNotAllowedError : ResponseError = { statusCode: HttpStatusCode.Status405MethodNotAllowed, message: "HTTP Method Not Allowed"};
export const NotAcceptableError : ResponseError = { statusCode: HttpStatusCode.Status406NotAcceptable, message: "Not Acceptable"};
export const RequestTimeoutError : ResponseError = { statusCode: HttpStatusCode.Status408RequestTimeout, message: "Request Timeout"};
export const InternalServerError : ResponseError = { statusCode: HttpStatusCode.Status500InternalServerError, message: "Internal Server Error"};
export const BadGatewayError : ResponseError = { statusCode: HttpStatusCode.Status502BadGateway, message: "Bad Gateway/Invalid Response"};
export const ServiceUnderMaintenanceError : ResponseError = { statusCode: HttpStatusCode.Status503ServiceUnavailable, message: "The service is temporarily down for maintenance"};
export const GatewayTimeoutError : ResponseError = { statusCode: HttpStatusCode.Status504GatewayTimeout, message: "Gateway Request Timeout"};
export const ServiceUnavailableError : ResponseError = { statusCode: HttpStatusCode.Status523ServiceUnavailable, message: "Service Unavailable"};