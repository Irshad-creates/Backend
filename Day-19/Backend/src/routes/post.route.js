const express = require('express')
const { createPostController, getPostController, getPostDetailsController, likePostController, getFeedController, unlikePostController } = require('../controllers/postController')
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



/**
 * @Routes Likes : post /api/like/:Postid
 * @description to like any post with id provided in the request params
 * 
 */
postRouter.post("/like/:postid", indentifyUser , likePostController)
postRouter.post("/unlike/:postid", indentifyUser , unlikePostController)


/**
 * @Routes GET : /api/post/feed
 * @description to get all the post a user
 * @private
 */
postRouter.get("/feed", indentifyUser, getFeedController)


module.exports = postRouter