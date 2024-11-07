import express from "express";
import { addUser, deleteUser, getUser } from "../controller/userController.js";
import decorateHTML from "../middleware/common/decorateHTML.js";
import fileUpload from "../middleware/users/avatarUpload.js";
import {
  addUserValidationResult,
  addUserValidator,
} from "../middleware/users/userValidator.js";
import { checkLogin } from "../middleware/common/checkLogin.js";

const router = express.Router();

router.get("/", decorateHTML("User"), checkLogin, getUser);

router.post(
  "/",
  checkLogin,
  fileUpload,
  addUserValidator,
  addUserValidationResult,
  addUser
);

router.delete("/:id", deleteUser);

export default router;
