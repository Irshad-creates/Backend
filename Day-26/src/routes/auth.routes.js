import { Router } from "express";
import {userRegisteration} from "../controllers/authController.js"
import { registerValidator } from "../validation/authValidator.js";


const authRoutes = Router()


// /register : /api/auth/register
authRoutes.post("/register" ,registerValidator,userRegisteration)

export default authRoutes