const express = require("express")
const cookieParser = require('cookie-parser')
const multer = require('multer')
const upload = multer({storage : multer.memoryStorage()})
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    credentials:true,
    origin : "http://localhost:5173"
}))

/** require routes */
const authRouter = require("./routes/auth.route")
const postRouter = require("./routes/post.route")
const userRouter = require("./routes/user.routes")


/**using routes */
app.use('/api/auth',authRouter)
app.use('/api/posts',upload.single("image"),postRouter)
app.use('/api/users',userRouter)

module.exports =app
