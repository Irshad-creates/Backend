import  express  from "express"
import cookieParser from "cookie-parser"
import authRouter from "./Routes/auth.routes.js"
import cors from "cors"
// import morgan from "morgan"
const app = express()
app.use(cookieParser())
app.use(express.json())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
    methods: ["GET","POST","PUT","DELETE"]
}))
// app.use(morgan("dev"))
/**
 * routes
 */
app.use("/api/auth", authRouter)

export default app