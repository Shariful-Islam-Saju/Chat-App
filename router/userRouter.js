import express from "express";
import { addUser, deleteUser, getUser } from "../controller/userController.js";
import decorateHTML from "../middleware/common/decorateHTML.js";
import fileUpload from "../middleware/users/avatarUpload.js";
import {
  addUserValidationResult,
  addUserValidator,
} from "../middleware/users/userValidator.js";
import { checkLogin, requireRole } from "../middleware/common/checkLogin.js";

const router = express.Router();

router.get(
  "/",
  decorateHTML("User"),
  checkLogin,
  requireRole(["admin"]),
  getUser
);

router.post(
  "/",
  checkLogin,
  requireRole(["admin"]),
  fileUpload,
  addUserValidator,
  addUserValidationResult,
  addUser
);

router.delete("/:id", checkLogin, requireRole(["admin"]), deleteUser);

export default router;
