// import morgan from "morgan"
// app.use(morgan("dev"))

import  express  from "express"
import cookieParser from "cookie-parser"
import cors from "cors"

import authRouter from "./Routes/auth.routes.js"
import chatRouter from "./routes/chat.routes.js"

const app = express()
app.use(cookieParser())
app.use(express.json())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
    methods: ["GET","POST","PUT","DELETE"]
}))
/**
 * routes
 */
app.use("/api/auth", authRouter)
app.use("/api/chats", chatRouter)
export default app