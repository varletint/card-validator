export class AppError extends Error {
  public readonly statusCode: number;
  public readonly errorCode: string;
  public readonly isOperational: boolean;

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

export const badRequest = (message: string, errorCode = "BAD_REQUEST") =>
  new AppError(message, 400, errorCode);
export const unauthorized = (message: string, errorCode = "UNAUTHORIZED") =>
  new AppError(message, 401, errorCode);
export const forbidden = (message: string, errorCode = "FORBIDDEN") =>
  new AppError(message, 403, errorCode);
export const notFound = (resource: string, errorCode = "NOT_FOUND") =>
  new AppError(`${resource} not found.`, 404, errorCode);
export const internalError = (
  message: string,
  errorCode = "INTERNAL_SERVER_ERROR"
) => new AppError(message, 500, errorCode);
