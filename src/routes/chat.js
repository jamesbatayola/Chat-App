import express from "express";
import { jwtAuth } from "../services/authentication/jwt.js";
import chatController from "../controllers/chat.js";

const router = express.Router();

router.get("/home", jwtAuth, chatController.getHome);

router.get("/addfriend", jwtAuth, chatController.getAddFriend);

export default router;
