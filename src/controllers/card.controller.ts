import { Request, Response, NextFunction } from "express";
import { validateCardNumber } from "../services/card.service.js";
import {
  ValidateCardRequest,
  ValidateCardResponse,
} from "../types/card.types.js";

export function validateCard(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  try {
    const { cardNumber } = req.body as ValidateCardRequest;

    if (!cardNumber || typeof cardNumber !== "string") {
      res.status(400).json({
        valid: false,
        message: "cardNumber is required and must be a string",
      });
      return;
    }

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
