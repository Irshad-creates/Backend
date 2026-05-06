import { Router } from "express"
import { sendMessage } from "../controllers/chatController.js"
import { authUser } from "../middlewares/auth.middleware.js"

const chatRouter = Router()

chatRouter.post("/message",authUser, sendMessage)


export default chatRouter