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
        const token = jwt.sign(userObject, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRY,
        });
        res.cookie(process.env.COOKIE_NAME, token, {
          httpOnly: true,
          maxAge: parseInt(process.env.JWT_EXPIRY, 10),
          signed: true, // Fixed typo
          secure: process.env.NODE_ENV === "production", // Set to true in production
        });

        res.locals.loggedInUser = userObject;
        return res.render("index");
      }
    }

    throw createError(401, "Login Failed!");
  } catch (error) {
    res.render("index", {
      data: {
        userName: req.body.username,
      },
      errors: {
        common: {
          msg: error.message,
        },
      },
    });
  }
}
