import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cardRoutes from "./routes/card.routes.js";
import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();

app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use("/api", cardRoutes);
app.use(errorHandler);

export default app;
