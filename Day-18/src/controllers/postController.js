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
    console.log(req.body, req.file) 

    const token = req.cookies.token

    if(!token){
        return res.status(401).json({
            messgae: "token not found, unauthroized access"
        })
    }

    let decoded = null

    try{
    decoded= jwt.verify(token, process.env.JWT_SECRET)
    }catch(err){
        return res.status(401).json({
            message :"user not authorized "
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
        user : decoded.id
    })

    res.status(201).json({
        message : "post created succesfully",
        post
    })
}


async function getPostController(req, res){
    const token = req.cookies.token

    if(!token){
        return res.status(401).json({
            message : "token not found , unauthorized access"
        })
    }

    let decoded = null ;
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET)
    } catch (error) {
        return res.status(401).json({
            message : "invaild token , unauthorized access"
        })
    }


    const userId = decoded.id

    const posts = await postModel.find({
        user : userId  
    })

    res.status(200).json({
        message : "posts fetched succesfully",
        posts
    })

}

async function getPostDetailsController(req, res){
    const token = req.cookies.token 
    if(!token) {
        return res.status(401).json({
            message: "token invaild, unauthorized access"
        })
    }

    let decoded;
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET)
    } catch (error) {
       return res.status(401).json({
            message : "invaild token , unauthorized access"
        })
    }

    const userId = decoded.id
    const postId =req.params.postId
    const post = await postModel.findById(postId)

    if(!post){
        return res.status(404).json({
            message : "post not found"
        })
    }

    const isValidUser = post.user.toString() === userId

    if(!isValidUser){
        return res.status(403).json({
            message: "Forbidden content."
        })
    }

    res.status(200).json({
        message:"post fetched succesfully",
        post
    })

}

module.exports = {
    createPostController,
    getPostController,
    getPostDetailsController
}