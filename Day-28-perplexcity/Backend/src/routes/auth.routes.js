import { Router } from "express";
import { registerUser, verifyEmail, loginUser, getMe } from "../controllers/authController.js";
import { RegisterValidator, loginValidator } from "../validators/auth.validator.js";
import { authUser } from "../middlewares/auth.middleware.js"

const authRouter = Router();

/**
 * register post /api/auth/register
 */
authRouter.post("/register",RegisterValidator, registerUser)

/**
 * verify-email : get /api/auth/verify-email
 * @description : to verify email
 * @acesss : public,
 * @query : {token}
 * 
 */
authRouter.get("/verify-email",verifyEmail)

/**
 * login : post /api/auth/login
 */
authRouter.post("/login", loginValidator , loginUser)

authRouter.get("/getMe",authUser,getMe)

export default authRouter
