import express from "express";
import { getUser } from "../controller/userController.js";
import decorateHTML from "../middleware/common/decorateHTML.js";

const router = express.Router();

router.get("/", decorateHTML, getUser);

export default router;
