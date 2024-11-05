import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import createError from "http-errors";
import People from "../model/people.js";

export function getLogin(req, res, next) {
  res.render("index");
}

export async function login(req, res, next) {
  try {
    const user = await People.findOne({
      $or: [{ email: req.body.username }, { mobile: req.body.username }],
    });

    if (user && user._id) {
      const isValidPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );

      if (isValidPassword) {
        const userObject = {
          name: user.name,
          email: user.email,
          mobile: user.mobile,
          role: "user",
        };

        // JWT signing and setting cookie
        const token = jwt.sign(userObject, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRY, // e.g., '1d' for 1 day, or a number in seconds
        });

        // Set cookie with maxAge in milliseconds
        res.cookie(process.env.COOKIE_NAME, token, {
          httpOnly: true,
          maxAge: process.env.JWT_EXPIRY, // Multiply by 1000 if JWT_EXPIRY is in seconds
          signed: true,
          secure: process.env.NODE_ENV === "production",
        });

        res.locals.loggedInUser = userObject;
        return res.redirect("/inbox"); // Redirect to inbox or another page upon success
      }
    }

    throw createError(401, "Invalid username or password"); // Specific error message for invalid credentials
  } catch (error) {
    res.render("index", {
      data: {
        username: req.body.username,
      },
      errors: {
        common: {
          msg: error.message,
        },
      },
    });
  }
}
