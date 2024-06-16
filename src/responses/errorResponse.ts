class ErrorResponse extends Response {
  constructor(statusCode: number, body: Record<string, any>, opt?: Record<string, any>) {
    const options = {
      statusCode,
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST",
        "Cache-Control": opt?.cache
      }
    };
    super(JSON.stringify(body), options);
  }
}

export default ErrorResponse;