import express from "express";

import { getLogin } from "../controller/loginController.js";

const router = express.Router();

router.get("/", getLogin);

export default router;
