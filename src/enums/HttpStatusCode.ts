enum HttpStatusCode {
    Status400BadRequest = 400,
    Status401Unauthorized = 401,
    Status403Forbidden = 403,
    Status404NotFound = 404,
    Status405MethodNotAllowed = 405,
    Status406NotAcceptable = 406,
    Status408RequestTimeout = 408,
    Status500InternalServerError = 500,
    Status502BadGateway = 502,
    Status503ServiceUnavailable = 503,
    Status504GatewayTimeout = 504,
    Status523ServiceUnavailable = 523
  };

  export default HttpStatusCode;