const express = require('express')
const { createPostController, getPostController } = require('../controllers/postController')
const postRouter = express.Router()


/** */
postRouter.post("/",createPostController)

/**
 * GET /api/post [ protected ]
 */
postRouter.get("/",getPostController)


module.exports = postRouter