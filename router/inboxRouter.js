import express from "express";
import { getInbox } from "../controller/inboxController.js";

const router = express.Router();

router.get("/", getInbox);

export default router;
