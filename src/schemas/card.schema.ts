import { z } from "zod";

export const cardValidationSchema = z.object({
  cardNumber: z
    .string({
      message: "cardNumber is required and must be a string",
    })
    .min(1, "cardNumber cannot be empty"),
});
