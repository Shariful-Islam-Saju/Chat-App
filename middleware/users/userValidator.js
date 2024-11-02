import { check, validationResult } from "express-validator";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import createError from "http-errors";
import { unlink } from "fs";

import People from "../../model/people";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const addUserValidator = [
  check("name")
    .isLength({ min: 1 })
    .withMessage("Name must be at least 1 character long")
    .isAlpha("en-US", { ignore: " -" })
    .withMessage("Name must only contain letters")
    .trim(),

  check("email")
    .isEmail()
    .withMessage("Invalid email address")
    .trim()
    .custom(async (value) => {
      try {
        const user = await People.findOne({ email: value });
        if (user) {
          throw createError("Email already in use");
        }
      } catch (error) {
        throw createError(error.message);
      }
    }),

  check("mobile")
    .isMobilePhone("bn-BD", { strictMode: true })
    .withMessage("Invalid mobile number")
    .custom(async (value) => {
      try {
        const user = await People.findOne({ mobile: value });
        if (user) {
          throw createError("Phone already in use");
        }
      } catch (error) {
        throw createError(error.message);
      }
    }),

  check("password")
    .isStrongPassword()
    .withMessage(
      "Password must be at least 8 characters long, and must contain at least one uppercase letter"
    ),
];

export function addUserValidationResult(req, res, next) {
  const errors = validationResult(req);
  const mappedErrors = errors.mapped();

  if (Object.keys(mappedErrors).length === 0) {
    return next();
  }

  if (req.files.length > 0) {
    const fileName = req.files[0].filename;
    unlink(path.join(__dirname, `../public/uploads/${fileName}`), (err) => {
      if (err) {
        console.error(err);
      }
    });
  }

  res.status(500).json({
    errors: mappedErrors,
  });
}
