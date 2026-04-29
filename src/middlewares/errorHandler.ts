import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError.js";

/**
 * Global error handling middleware for the Express application.
 * Captures all errors thrown synchronously or passed sequentially via next().
 *
 * @param err The error object thrown (either custom AppError or native Error)
 * @param _req Express request object
 * @param res Express response object
 * @param _next Express next function mechanism (required for Express to detect this as an error handler)
 */
export function errorHandler(
  err: Error | AppError,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  // If the error is an expected domain/operational error (mapped by AppError)
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      valid: false,
      errorCode: err.errorCode,
      message: err.message,
    });
    return;
  }

  // If it's a completely unhandled exception (e.g., syntax/type error, memory issue)
  console.error("Unhandled Exception:", err.stack);
  res.status(500).json({ valid: false, message: "Internal server error" });
}
