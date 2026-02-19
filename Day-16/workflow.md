packages :
express, mongoose, dotenv 
cookie-parser , jsonwebtoken, bcryptjs
multer ,imagekit/nodejs


instagram project

=>authentication : 
    =>registeration (1. user ka data save , 2. token user ko de dena)
    =>login
    =>logout(token blacklisting)
    =>[OTP based registeration]

=>post :
    =>create
    =>can see the feed
    =>like post (collection type)
    => save post

        post will have: 
        {
            caption :string,
            imgUrl : string,
            user: user.id,
            createdAt : Date-time,

        }


=>user :
    =>follower
    =>following

    
    const Imagekit = require("@imagekit/nodejs")
const { toFile }= require("@imagekit/nodejs")
require('dotenv').config()
const imagekit = new Imagekit({
    privatekey: process.env['IMAGEKIT_PRIVATE_KEY']
})  

async function createPostController (req, res) {
    // {caption, imgUrl}

    const file =await imagekit.files.upload({
        file : await toFile(Buffer.from(req.file.buffer),"file"),
        fileName : "test",
    })

    res.send(file)

}