const express = require('express')
const { createPostController, getPostController, getPostDetailsController } = require('../controllers/postController')
const postRouter = express.Router()
const indentifyUser = require("../middleware/auth.middleware")

/** */
postRouter.post("/",indentifyUser,createPostController)

/**
 * GET /api/post [ protected ]
 */
postRouter.get("/",indentifyUser,getPostController)

/**
 * GET - /api/posts/details/:postId
 * 
 * -return an details about specific post with the id. 
 * -also checks wheater the post belongs to the user that request came form
 */
postRouter.get("/details/:postId",indentifyUser,getPostDetailsController)

module.exports = postRouter