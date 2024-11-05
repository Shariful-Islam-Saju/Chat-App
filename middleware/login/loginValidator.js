import { check, validationResult } from "express-validator";

export const loginValidator = [
  check("username")
    .isLength({ min: 1 })
    .withMessage("Mobile Number or Email is Required!!!"),
  check("password").isLength({ min: 1 }).withMessage("Password Required"),
];

export const loginResult = (req, res, next) => {
  const errors = validationResult(req);
  const mappedErrors = errors.mapped();

  // Corrected condition
  if (Object.keys(mappedErrors).length === 0) {
    next();
  } else {
    res.render("index", {
      data: {
        username: req.body.username,
      },
      errors: mappedErrors,
    });
  }
};



