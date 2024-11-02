import express from "express";
import { getUser } from "../controller/userController.js";
import decorateHTML from "../middleware/common/decorateHTML.js";
import fileUpload from "../middleware/users/avatarUpload.js";
import { check } from "express-validator";

const router = express.Router();

router.get("/", decorateHTML("User"), getUser);

router.post("/", fileUpload, [
  check("name")
    .isLength({ min: 1 })
    .withMessage("Name must be at least 1 character long"),
  check("email").isEmail().withMessage("Please enter a valid email address"),
]);

export default router;
