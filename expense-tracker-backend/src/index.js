import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { connectDB } from "./config/db.js";
import cors from "cors";
import morgan from "morgan";
import routes from "./routes/index.js";
import errorHandler from "./middleware/errorHandler.js";
import authMiddleware from "./middleware/auth.js";
import "express-async-errors";

const PORT = process.env.PORT || 5001;

const app = express();
app.use(cors());
app.use(express.json());
if (process.env.NODE_ENV !== "production") app.use(morgan("dev"));

app.use(authMiddleware);
app.use("/api", routes);

app.use(errorHandler);

const start = async () => {
  await connectDB();
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};

start().catch((err) => {
  console.error(err);
  process.exit(1);
});
