import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError.js";

export function errorHandler(
  err: Error | AppError,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      valid: false,
      errorCode: err.errorCode,
      message: err.message,
    });
    return;
  }

  console.error(err.stack);
  res.status(500).json({ valid: false, message: "Internal server error" });
}
