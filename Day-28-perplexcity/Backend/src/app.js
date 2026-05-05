import  express  from "express"
import cookieParser from "cookie-parser"
import authRouter from "./Routes/auth.routes.js"
// import cors from "cors"

const app = express()
app.use(cookieParser())
app.use(express.json())
// app.use(cors())
/**
 * routes
 */
app.use("/api/auth", authRouter)

export default app