import express from "express";

import { getLogin, login, logout } from "../controller/loginController.js";
import decorateHTML from "../middleware/common/decorateHTML.js";
import {
  loginResult,
  loginValidator,
} from "../middleware/login/loginValidator.js";
import { redirectCheck } from "../middleware/common/checkLogin.js";

const router = express.Router();

const pageTitle = "Login";

router.get("/", decorateHTML(pageTitle), redirectCheck, getLogin);

router.post("/", decorateHTML(pageTitle), loginValidator, loginResult, login);

router.delete("/", logout);

export default router;
