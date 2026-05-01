import { Router } from "express";
import { registerUser } from "../controllers/authController.js";
import { RegisterValidator } from "../validators/auth.validator.js";

const authRouter = Router();

/**
 * register post /api/auth/register
 */
authRouter.post("/register",RegisterValidator, registerUser)

export default authRouter
