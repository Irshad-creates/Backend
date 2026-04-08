const path = require("path")
require('dotenv').config({ path: path.resolve(__dirname, "../../.env") })

const Imagekit = require('@imagekit/nodejs/index.js')
const { toFile } = require("@imagekit/nodejs/index.js")
const postModel = require("../models/post.model")
const likeModel = require("../models/likes.model")

const imagekit= new Imagekit({
    privateKey : process.env.IMAGEKIT_PRIVATE_KEY
})

async function createPostController(req, res){
    if(!req.file){
        return res.status(400).json({
            message : "image file is required"
        })
    }

    const file = await imagekit.files.upload({
        file : await toFile(Buffer.from(req.file.buffer), "files"),
        fileName : "Test.jpg",
        folder:"Cohort-2-instaClone"
    })

    // res.send(file)

    const post  = await postModel.create({
        caption : req.body.caption,
        imgUrl : file.url,
        user : req.user.id
    })

    res.status(201).json({
        message : "post created succesfully",
        post
    })
}


async function getPostController(req, res){


    const userId = req.user.id

    const posts=await postModel.find({
        user : userId
    })

    res.status(200).json({
        message : "posts fetched succesfully",
        posts
    })
    
}

async function getPostDetailsController(req, res){

    const userId = req.user.id
    const postId = req.params.postId
    const post = await postModel.findById(postId)

    if(!post){
        return res.status(404).json({
            message : "post not found"
        })
    }

    const isValidUser = post.user.toString() === userId

    if(!isValidUser){
        return res.status(403).json({
            message : "Forbidden content, not your id"
        })
    }

    res.status(200).json({
        message : "post feteched successfully",
        post
    })
}


/**
 * LIKES APIS
 */
async function likePostController(req, res){
    const username = req.user.username
    const postid = req.params.postid

    const isAlreadyLiked = await likeModel.findOne({
        post : postid,
        user : username
    })

    if(isAlreadyLiked){
        return res.status(409).json({
            message : "post is already like"
        })
    }

    // await likeModel.findByIdAndUpdate(isAlreadyLiked._id)

    const post = await postModel.findById(postid)
    
    if(!post){
        return res.status(404).json({
            message : "post not found"
        })
    }

    const like = await likeModel.create({
        post : postid,
        user : username
    })
    
    res.status(201).json({
        message:"post liked",
        like
    })
}


/**
 * all post of a user / feed
 */
async function getFeedController(req, res){
    const post = await postModel.find().populate("user")

    res.status(200).json({
        message : "Post fetched successfully",
        post
    })
}

module.exports = {
    createPostController,
    getPostController,
    getPostDetailsController,
    likePostController,
    getFeedController
}
