import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url"; // Import for fileURLToPath
import cookieParser from "cookie-parser";
const __filename = fileURLToPath(import.meta.url); // Get the current file path
const __dirname = path.dirname(__filename); // Get the directory name from the file path

dotenv.config();

async function connectionToMongoDB() {
  try {
    await mongoose.connect(process.env.MONGO_CONNECTION_STRING);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
}

connectionToMongoDB();

const app = express();
const port = process.env.PORT || 3000; // Default port

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set EJS as the view engine
app.set("view engine", "ejs");
app.set("views", "./views"); // Specify the views directory

// Serve static files from a 'public' directory
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser(process.env.COOKIE_SECRET));


// Routing 




//Error  Handling




app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
