const express = require('express')
const userModel = require('../models/user.models')
const jwt = require('jsonwebtoken')
const authRoutes = express.Router()
const crypto = require('crypto')
require('dotenv').config()
// /api/auth/register
authRoutes.post('/register',async (req, res)=>{
    const { name, email, password } = req.body

    const isUserAlreadyExists = await userModel.findOne({ email })

    if(isUserAlreadyExists){
        return res.status(401).json({
            message : "user already exists with this email"
        })
    }

    const hash = crypto.createHash("md5").update(password).digest("hex")

    const user =await userModel.create({
        name, email, password: hash
    })
    const token = jwt.sign(
        {
            id : user._id,
            email : user.email
        },
        process.env.JWT_SECRET
    )

    res.cookie("JWT_TOKEN",token)

    res.status(201).json({
        message : "user created",
        user
    })


})

// /api/auth/protected
authRoutes.post('/protected',(req, res)=>{
     console.log(req.cookies)
    
    res.status(201).json({
        message : "cookies sent",
    })
})

// /api/auth/login
authRoutes.post('/login',async (req, res)=>{
    const { email, password} =req.body

    const user = await userModel.findOne({ email })

    if(!user){
        return res.status(401).json({
            message : "user with this email does not exist"
        }) 
    }

    const isPasswordCorrect =  user.password === crypto.createHash("md5").update(password).digest("hex")

    if(!isPasswordCorrect){
        return res.status(401).json({
            message : "invaild password"
        })        
    }

    const token = jwt.sign({
        id : user._id,
    },process.env.JWT_SECRET)
    res.cookie("JWT_TOKEN", token)

    res.status(200).json({
        message : "user logined",
        user
    })


})
module.exports = authRoutes