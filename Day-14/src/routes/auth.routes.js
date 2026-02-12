/**
 * routes for authentication
 */

const express = require('express')
const userModel = require('../models/user.model')
const authRoutes = express.Router()
const jwt = require('jsonwebtoken')
require('dotenv').config()
const crypto = require('crypto')

// registering
authRoutes.post('/register',async(req, res)=>{
    const { name, email, password } = req.body

    const isUserAlreadyExist = await userModel.findOne({ email })

    if(isUserAlreadyExist){
        return res.status(409).json({
            message : "this user already exists"
        })
    }

    const hash = crypto.createHash("md5").update(password).digest("hex")

    const user =await userModel.create({
        name, email, password:hash
    })

    const token = jwt.sign({
        id : user._id
    },process.env.JWT_SECRET)
    res.cookie("jwt_token", token, {
        httpOnly: true
    })


    res.status(201).json({
        message : "registered succesfully",
        user,
        token
    })
})

//login with email and password
authRoutes.post('/login', async (req, res)=>{
    const { email, password } = req.body

    const user = await userModel.findOne({ email })
    if(!user){
        return res.status(409).json({
            message : "this email doesnt exists"
        })
    }

    const isPasswordCorrect = user.password === crypto.createHash("md5").update(password).digest("hex")
    if(!isPasswordCorrect){
        return res.status(409).json({
            message : "this is invaild password"
        })
    }

    const token = jwt.sign({
        id : user._id
    },process.env.JWT_SECRET)
    res.cookie("jwt_token", token, {
        httpOnly: true
    })

    res.status(201).json({
        message :"user logined succesfully",
        user,
        token
    })

})

//getting user info by its token
authRoutes.get('/get-me',async(req, res)=>{
    const token = req.cookies.jwt_token
    
    if (!token) {
        return res.status(401).json({
            message: "No token provided"
        })
    }


    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    const user = await userModel.findById(decoded.id)

    res.json({
        name : user.name,
        password : user.password
    })
})

module.exports = authRoutes