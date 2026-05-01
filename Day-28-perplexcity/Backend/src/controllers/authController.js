import userModel from "../models/user.model.js"
import jwt from 'jsonwebtoken'
import { sendEmail } from "../services/mail.service.js"

export async function registerUser (req, res){
    
    const { username, email, password } =req.body

    const isAlreadyExist = await userModel.findOne({
        $or:[ { email, username }]
    })

    if(isAlreadyExist){
        return res.status(400).json({
            message:"User with this email or username already exist",
            success : false,
            err:"user already exists"
        })
    }

    const user = await userModel.create({ username, email, password })

    await sendEmail({
        to : email,
        subject : "Welcome to perplexity!",
        html : `
                <p>hii ${username},</p>
                <p>Thank you for registering at <strong>Perplexity by Irshad</strong>. we're exicted to have you as our user </p>
                <p>Best regards,<br>The Perplexity by IRSHAD</p>
        `
    }) 

    res.status(201).json({
        message:"user registered succesfully",
        success:true,
        user: {
            id: user._id,
            username: user.username,
            email : user.email
        }
    })
}