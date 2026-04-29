import { z } from "zod";

/**
 * Zod schema for validating the incoming payload for the /validate-card endpoint.
 * Acts as a runtime boundary to ensure the request body matches the expected
 * ValidateCardRequest TypeScript interface before reaching the controller logic.
 */
export const cardValidationSchema = z.object({
  cardNumber: z
    .string({
      message: "cardNumber is required and must be a string",
    })
    .min(1, "cardNumber cannot be empty"),
});
