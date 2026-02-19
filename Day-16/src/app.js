const express = require('express')
const app = express()
const authRouter = require('./routes/auth.routes')
const postRouter = require("./routes/post.routes")
const multer = require('multer')
const upload = multer({storage : multer.memoryStorage()})

app.use(express.json())

app.use("/api/auth",authRouter)
app.use("/api/posts",upload.single("image"),postRouter)






module.exports = app