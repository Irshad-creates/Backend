import  express  from "express"
import cookieParser from "cookie-parser"
import authRouter from "./Routes/auth.routes.js"

const app = express()
app.use(cookieParser())
app.use(express.json())

/**
 * routes
 */
app.use("/api/auth", authRouter)

export default app