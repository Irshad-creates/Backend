const express = require('express')
const { createPostController } = require('../controllers/post.controler')
const postRouter = express.Router()

/**
 * post  : /api/posts
 * req.body = {caption , image-file}
 */

postRouter.post("/", createPostController)

module.exports = postRouter