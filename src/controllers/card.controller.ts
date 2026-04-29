import { Request, Response, NextFunction } from "express";
import { validateCardNumber } from "../services/card.service.js";
import { ValidateCardResponse } from "../types/card.types.js";
import { cardValidationSchema } from "../schemas/card.schema.js";
import { badRequest } from "../utils/AppError.js";

/**
 * Express controller logic for the POST /validate-card route.
 * Handles incoming request parsing, validation layer integration,
 * and HTTP response mapping.
 *
 * @param req Express Request object containing the payload in req.body
 * @param res Express Response object used to send back JSON
 * @param next Express NextFunction to pass errors to the global error handler
 */
export function validateCard(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  try {
    // 1. Validate the structure of the incoming request body using Zod schema
    const parsed = cardValidationSchema.safeParse(req.body);

    if (!parsed.success) {
      // 2. Map schema validation failures directly to a 400 Bad Request
      throw badRequest(parsed.error.issues[0].message);
    }

    const { cardNumber } = parsed.data;

    // 3. Perform the actual domain business logic (Luhn check)
    const valid = validateCardNumber(cardNumber);

    // 4. Construct the standard response payload
    const response: ValidateCardResponse = {
      valid,
      message: valid ? "Card number is valid" : "Card number is invalid",
    };

    // 5. Send success response back to the client
    res.status(200).json(response);
  } catch (err) {
    // 6. Forward any unexpected or thrown AppErrors to the global error handler middleware
    next(err);
  }
}
