import express from "express";
import { jwtAuth } from "../services/authentication/jwt.js";
import chatController from "../controllers/chat.js";

const router = express.Router();

router.get("/home", jwtAuth, chatController.getHome);

router.get("/friendRequest", jwtAuth, chatController.getFriendRequest);
router.post("/friendRequest/accept", jwtAuth, chatController.postAcceptRequest);

router.get("/searchfriend", jwtAuth, chatController.getSearchFriend);
router.post("/searchfriend", jwtAuth, chatController.postSearchFriend);

router.post("/addfriend", jwtAuth, chatController.postAddFriend);
router.post("/addfriend-cancel", jwtAuth, chatController.postCancelRequest);

export default router;
