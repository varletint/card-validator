import { Router } from "express";
import { validateCard } from "../controllers/card.controller.js";

const router = Router();

/**
 * @route   POST /api/validate-card
 * @desc    Validates a credit card number using the Luhn algorithm
 * @access  Public
 */
router.post("/validate-card", validateCard);

export default router;
