import { check } from "express-validator";
import People from "../../model/people";
import createError from "http-errors";
const validator = [
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
    .isMobilePhone("bn-BD", {
      strictMode: true,
    })
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
];
