import express from "express";
import cardRoutes from "./routes/card.routes.js";
import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();

app.use(express.json());
app.use("/api", cardRoutes);
app.use(errorHandler);

export default app;
