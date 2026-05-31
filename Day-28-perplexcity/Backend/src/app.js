// import morgan from "morgan"
// app.use(morgan("dev"))

import  express  from "express"
import cookieParser from "cookie-parser"
import cors from "cors"

import authRouter from "./Routes/auth.routes.js"
import chatRouter from "./routes/chat.routes.js"
import emailRoutes from "./routes/email.routes.js";

const app = express()

// Set request timeout to 65 seconds (slightly more than AI service timeout of 60s)
app.use((req, res, next) => {
    req.setTimeout(65000);
    res.setTimeout(65000);
    next();
});

app.use(cookieParser())
app.use(express.json())
app.use(cors({
    origin:[
  "http://localhost:5173",
  "http://localhost:5174",
    ],
    credentials:true,
    methods: ["GET","POST","PUT","DELETE"]
}))
/**
 * routes
 */
app.use("/api/auth", authRouter)
app.use("/api/chats", chatRouter)
app.use("/api/email", emailRoutes);

export default app
