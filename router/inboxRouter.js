import express from "express";
import { getInbox } from "../controller/inboxController.js";
import decorateHTML from "../middleware/common/decorateHTML.js";

const router = express.Router();

router.get("/", decorateHTML("Inbox"), getInbox);

export default router;
