// external imports
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url"; // Import for fileURLToPath
import cookieParser from "cookie-parser";

// local imports

import loginRouter from "./router/loginRouter.js";
import userRouter from "./router/userRouter.js";
import inboxRouter from "./router/inboxRouter.js";
import { notFound, errorHandler } from "./middleware/common/errorHandler.js";


dotenv.config();

// Ensure required environment variables are set
if (!process.env.MONGO_CONNECTION_STRING || !process.env.COOKIE_SECRET) {
  console.error("ERROR: Missing required environment variables.");
  process.exit(1); // Exit the application if required variables are missing
}

// Set up directory paths
const __filename = fileURLToPath(import.meta.url); // Get the current file path
const __dirname = path.dirname(__filename); // Get the directory name from the file path

// MongoDB Connection
async function connectionToMongoDB() {
  try {
    await mongoose.connect(`${process.env.MONGO_LOCAL_STRING}`);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1); // Exit the application if unable to connect to the database
  }
}

connectionToMongoDB();

const app = express();
const port = process.env.PORT || 3000; // Default port

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET)); // Use cookie parser with the secret

// Set EJS as the view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views")); // Specify the views directory

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));

// Routing

app.use("/", loginRouter);
app.use("/users", userRouter);
app.use("/inbox", inboxRouter);

// Error Handling
app.use(notFound); // Handle 404 errors
app.use(errorHandler); // Global error handler

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
