import express from "express";
import { getInbox } from "../controller/inboxController.js";
import decorateHTML from "../middleware/common/decorateHTML.js";

const router = express.Router();

router.get("/", decorateHTML, getInbox);

export default router;
