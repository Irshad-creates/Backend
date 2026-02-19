const postRouter = require("../routes/post.routes");
require('dotenv').config()

const Imagekit = require("@imagekit/nodejs")
const { toFile } = require("@imagekit/nodejs")

const imagekit = new Imagekit({
    privatekey: process.env.IMAGEKIT_PRIVATE_KEY
})

async function createPostController (req, res) {
    // {caption, imgUrl}

    console.log(req.body, req.file)

    const file = await imagekit.files.upload({
        file :await toFile(Buffer.from(req.file.buffer), "files"),
        fileName : "test.jpg"
    })

    res.send(file)

}

module.exports = {
    createPostController
}