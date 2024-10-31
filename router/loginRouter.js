import express from "express";

import { getLogin } from "../controller/loginController.js";
import decorateHTML from "../middleware/common/decorateHTML.js";

const router = express.Router();

router.get("/", decorateHTML, getLogin);

export default router;
