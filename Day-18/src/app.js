const express = require("express")
const authRouter = require("./routes/auth.route")
const postRouter = require("./routes/post.route")

const cookieParser = require('cookie-parser')
const app = express()

const multer = require('multer')
const upload = multer({storage : multer.memoryStorage()})

app.use(express.json())
app.use(cookieParser())

app.use('/api/auth',authRouter)
app.use('/api/posts',upload.single("image"),postRouter)


module.exports =app