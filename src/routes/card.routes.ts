import { Router } from "express";
import { validateCard } from "../controllers/card.controller.js";

const router = Router();

router.post("/validate-card", validateCard);

export default router;
