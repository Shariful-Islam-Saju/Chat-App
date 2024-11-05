import express from "express";
import { getInbox } from "../controller/inboxController.js";
import decorateHTML from "../middleware/common/decorateHTML.js";
import { checkLogin } from "../middleware/common/checkLogin.js";

const router = express.Router();

router.get("/", decorateHTML("Inbox"), checkLogin, getInbox);

export default router;
