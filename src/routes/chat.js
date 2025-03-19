import express from "express";
import { jwtAuth } from "../services/authentication/jwt.js";
import chatController from "../controllers/chat.js";

const router = express.Router();

router.get("/home", jwtAuth, chatController.getHome);

export default router;
