/**
 * Represents the incoming request payload for credit card validation.
 */
export interface ValidateCardRequest {
  /** The credit card number string consisting of digits (spaces or hyphens should be sanitized prior to validation) */
  cardNumber: string;
}

/**
 * Represents the response payload sent back to the client after validation.
 */
export interface ValidateCardResponse {
  /** True if the card passes the Luhn check, otherwise false */
  valid: boolean;
  /** A human-readable status message detailing the validation result */
  message: string;
}
