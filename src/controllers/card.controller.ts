import { Request, Response, NextFunction } from "express";
import { validateCardNumber } from "../services/card.service.js";
import { ValidateCardResponse } from "../types/card.types.js";
import { cardValidationSchema } from "../schemas/card.schema.js";
import { badRequest } from "../utils/AppError.js";

export function validateCard(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  try {
    const parsed = cardValidationSchema.safeParse(req.body);

    if (!parsed.success) {
      throw badRequest(parsed.error.issues[0].message);
    }

    const { cardNumber } = parsed.data;

    const valid = validateCardNumber(cardNumber);

    const response: ValidateCardResponse = {
      valid,
      message: valid ? "Card number is valid" : "Card number is invalid",
    };

    res.status(200).json(response);
  } catch (err) {
    next(err);
  }
}
