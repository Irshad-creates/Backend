const postRouter = require("../routes/post.route")
require('dotenv').config()
const jwt = require('jsonwebtoken')

const Imagekit = require('@imagekit/nodejs/index.js')
const { toFile } = require("@imagekit/nodejs/index.js")
const postModel = require("../models/post.model")

const imagekit= new Imagekit({
    privateKey : process.env.IMAGEKIT_PRIVATE_KEY
})

async function createPostController(req, res){



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

module.exports = {
    createPostController,
    getPostController,
    getPostDetailsController
}