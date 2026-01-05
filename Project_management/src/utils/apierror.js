class ApiError extends Error {
  constructor(
    statusCode,
    message = "Something went wrong",
    errors = [],
    stackTrace = "",
  ) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.data = null;
    this.success = false;
    this.errors = errors;
    if (stackTrace) {
      this.stackTrace = stackTrace;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
export default ApiError;
