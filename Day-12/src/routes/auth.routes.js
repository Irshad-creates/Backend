const express = require('express')
const userModel = require('../models/user.model')
const jwt = require('jsonwebtoken')
const authRoutes = express.Router()
/**
 * /api/routes/register
 */
authRoutes.post('/register', async(req, res)=>{
    const {email, name, password} = req.body;

    const isUserAlreadyExists = await userModel.findOne({ email })
    if(isUserAlreadyExists){
        return res.status(400).json({
            message : "user already exists with this email"
        })
    }

    const user = await userModel.create({
        name, email, password
    });


    const token = jwt.sign(
        {
            id : user._id,
            email : user.email
        },
        process.env.JWT_SECRET
    )

    res.cookie("JWT_TOKEN",token)


    res.status(201).json({
        message: "user registered",
        user,
        token
    });

})


module.exports = authRoutes