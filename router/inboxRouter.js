import express from "express";
import { addConversation, getInbox, getMessages, searchUser } from "../controller/inboxController.js";
import decorateHTML from "../middleware/common/decorateHTML.js";
import { checkLogin } from "../middleware/common/checkLogin.js";

const router = express.Router();

router.get("/", decorateHTML("Inbox"), checkLogin, getInbox);

router.post("/search", checkLogin, searchUser);

router.post("/conversation", checkLogin, addConversation);

router.post("/messages/:conversation_id", checkLogin, getMessages);

router.post("/message/", checkLogin);



export default router;
