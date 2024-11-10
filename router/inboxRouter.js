import express from "express";
import { addConversation, deleteCoversation, getInbox, getMessages, searchUser, sendMessage } from "../controller/inboxController.js";
import decorateHTML from "../middleware/common/decorateHTML.js";
import { checkLogin } from "../middleware/common/checkLogin.js";
import attachmentUpload from "../middleware/inbox/atachmentUpload.js";

const router = express.Router();

router.get("/", decorateHTML("Inbox"), checkLogin, getInbox);

router.post("/search", checkLogin, searchUser);

router.post("/conversation", checkLogin, addConversation);

router.get("/messages/:conversation_id", checkLogin, getMessages);

router.delete('/messages/:conversationId' , checkLogin, deleteCoversation)

router.post("/message/", checkLogin, attachmentUpload, sendMessage );



export default router;
