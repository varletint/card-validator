import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cardRoutes from "./routes/card.routes.js";
import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();

// --- Global Middlewares ---

// Sets security-related HTTP headers
app.use(helmet());

// Enables Cross-Origin Resource Sharing
app.use(cors());

// HTTP request logger for development
app.use(morgan("dev"));

// Parses incoming JSON payloads
app.use(express.json());

// --- Routes ---
app.use("/api", cardRoutes);

// --- Error Handling ---
// Global error boundary (must be the last middleware)
app.use(errorHandler);

export default app;
