import dotenv from "dotenv";
import express, { Application } from "express";
import cors from "cors";
import logger from "./misc/logger";
import { notFound } from "./middlewares/notFound";
import { errorHandler } from "./middlewares/errorHandler";
import appRouter from "./routes/index";
import { v2 as cloudinary } from "cloudinary";

dotenv.config();

// Initializes cloudinary with the API keys and secrets
logger.info(cloudinary.config().cloud_name);

// Initializes express app
const app: Application = express();

// Parser for data on body and sets the maximum packet limit to 50 mb
app.use(express.json({ limit: "50mb" }));

// Enables any browser to hit the server
app.use(cors());

// Routes
app.use(appRouter);

// Handles the incorrect routes and error
app.use(notFound);
app.use(errorHandler);

// Fetches the port number to serve the application
const PORT = process.env.PORT || 3000;

// Listens on the specified port
app.listen(PORT, () => {
  console.clear();
  logger.info(`Server is running on port ${PORT}`);
});
