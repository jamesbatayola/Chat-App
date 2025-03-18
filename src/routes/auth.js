import express from "express";

const router = express.Router();

import authController from "../controllers/auth.js";

// validator
import { validate } from "../services/validator/zod.js";

// schema
import { signupSchema, loginSchema } from "../services/validator/schema.js";

router.get("/login", authController.getLogin);

router.post("/login", validate(loginSchema), authController.postLogin);

router.get("/signup", authController.getSignup);

router.post("/signup", validate(signupSchema), authController.postSignup);

export default router;
