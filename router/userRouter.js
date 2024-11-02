import express from "express";
import { getUser } from "../controller/userController.js";
import decorateHTML from "../middleware/common/decorateHTML.js";
import fileUpload from "../middleware/users/avatarUpload.js";
import { addUserValidationResult, addUserValidator } from "../middleware/users/userValidator.js";

const router = express.Router();

router.get("/", decorateHTML("User"), getUser);

router.post("/", fileUpload, addUserValidator, addUserValidationResult, );

export default router;
