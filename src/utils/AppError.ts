/**
 * Custom application error class that extends the built-in Error.
 * Used to differentiate between intended operational errors (like bad requests)
 * and unexpected programming errors (like null reference exemptions).
 */
export class AppError extends Error {
  public readonly statusCode: number;
  public readonly errorCode: string;
  public readonly isOperational: boolean;

  /**
   * @param message Human-readable error message
   * @param statusCode HTTP status code (e.g. 400, 404, 500)
   * @param errorCode Machine-readable error code for client-side matching
   * @param isOperational True if the error is a recognized application error
   */
  constructor(
    message: string,
    statusCode: number,
    errorCode: string,
    isOperational = true
  ) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);

    this.statusCode = statusCode;
    this.errorCode = errorCode;
    this.isOperational = isOperational;

    Error.captureStackTrace(this);
  }
}

/** Helper to throw a 400 Bad Request error */
export const badRequest = (message: string, errorCode = "BAD_REQUEST") =>
  new AppError(message, 400, errorCode);

/** Helper to throw a 401 Unauthorized error */
export const unauthorized = (message: string, errorCode = "UNAUTHORIZED") =>
  new AppError(message, 401, errorCode);

/** Helper to throw a 403 Forbidden error */
export const forbidden = (message: string, errorCode = "FORBIDDEN") =>
  new AppError(message, 403, errorCode);

/** Helper to throw a 404 Not Found error */
export const notFound = (resource: string, errorCode = "NOT_FOUND") =>
  new AppError(`${resource} not found.`, 404, errorCode);

/** Helper to throw a 500 Internal Server Error */
export const internalError = (
  message: string,
  errorCode = "INTERNAL_SERVER_ERROR"
) => new AppError(message, 500, errorCode);
