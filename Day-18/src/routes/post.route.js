const express = require('express')
const { createPostController, getPostController, getPostDetailsController } = require('../controllers/postController')
const postRouter = express.Router()


/** */
postRouter.post("/",createPostController)

/**
 * GET /api/post [ protected ]
 */
postRouter.get("/",getPostController)

/**
 * GET - /api/posts/details/:postId
 * 
 * -return an details about specific post with the id. 
 * -also checks wheater the post belongs to the user that request came form
 */
postRouter.get("/details/:postId",getPostDetailsController)

module.exports = postRouter