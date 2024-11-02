import { check, validationResult } from "express-validator"; // Import validators
import path, { dirname } from "path"; // Import path utilities
import { fileURLToPath } from "url"; // Utility to get the current file path
import createError from "http-errors"; // Error handling library
import { unlink } from "fs"; // File system module for file operations

import People from "../../model/people.js"; // Import People model

// Determine the current file path and directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Validation rules for adding a new user
export const addUserValidator = [
  // Validate and sanitize 'name' field
  check("name")
    .isLength({ min: 1 }) // Minimum length of 1 character
    .withMessage("Name must be at least 1 character long")
    .isAlpha("en-US", { ignore: " -" }) // Allow only letters, spaces, and hyphens
    .withMessage("Name must only contain letters")
    .trim(), // Trim whitespace from input

  // Validate and sanitize 'email' field
  check("email")
    .isEmail()
    .withMessage("Invalid email address")
    .trim()
    .custom(async (value) => {
      try {
        // Check if email is already in use
        const user = await People.findOne({ email: value });
        if (user) {
          throw createError("Email already in use");
        }
      } catch (error) {
        throw createError("An error occurred while checking the email.");
      }
    }),

  // Validate and sanitize 'mobile' field
  check("mobile")
    .isMobilePhone("bn-BD", { strictMode: true }) // Validate Bangladeshi mobile numbers
    .withMessage("Invalid mobile number")
    .custom(async (value) => {
      try {
        // Check if mobile number is already in use
        const user = await People.findOne({ mobile: value });
        if (user) {
          throw createError("Phone already in use");
        }
      } catch (error) {
        throw createError(
          "An error occurred while checking the mobile number."
        );
      }
    }),

  // Validate 'password' field
  check("password")
    .isStrongPassword() // Ensure password strength
    .withMessage(
      "Password must be strong. Include at least one uppercase letter, one number, and one symbol."
    ),
];

// Function to handle validation errors and delete any uploaded file if validation fails
export function addUserValidationResult(req, res, next) {
  const errors = validationResult(req); // Collect validation results
  const mappedErrors = errors.mapped(); // Map errors to an object
  console.log("Validation Errors:", mappedErrors);

  if (Object.keys(mappedErrors).length === 0) {
    // If there are no validation errors, proceed to the next middleware
    return next();
  }

  // If validation fails and a file was uploaded, delete the uploaded file
  if (req.files && req.files.length > 0) {
    const fileName = req.files[0].filename; // Get the uploaded file name
    const filePath = path.join(__dirname, "../public/uploads", fileName); // Construct the file path

    unlink(filePath, (err) => {
      if (err) {
        console.error("Failed to delete file:", err); // Log if file deletion fails
      } else {
        console.log(
          `File ${fileName} deleted successfully due to validation error.`
        );
      }
    });
  }

  // Respond with a 400 status (client error) and validation errors in JSON format
  res.status(400).json({
    errors: mappedErrors,
  });
}
