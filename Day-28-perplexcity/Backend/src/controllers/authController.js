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

    const emailVerificationToken = jwt.sign({
        email : user.email
    },process.env.JWT_SECRET)

    await sendEmail({
        to : email,
        subject : "Welcome to perplexity!",
        html : `
                <p>hii ${username},</p>
                <p>Thank you for registering at <strong>Perplexity by Irshad</strong>. we're exicted to have you as our user </p>
                <a href="http://localhost:3000/api/auth/verify-email?token=${emailVerificationToken}"> Verify Email</a>
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

export async function verifyEmail(req, res) {
    const {token} = req.query;
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        const user = await userModel.findOne({ email : decoded.email })

        if(!user){
            return res.status(400).json({
                message :"invaild token",
                success : false,
                err : "user not found"
            })
        }

        user.verified = true;
        await user.save();
        
        const html = `
                <h1>Email verified succesfully</h1>
                <p>Your Email is Verified. You can now log in to your account </p>
    
                <a href="http://localhost:3000/login">Go To Login</a>
            `
        
        return res.send(html);
    } catch (err) {
        return res.status(400).json({
            message : "invaild or expired token",
            success : false ,
            err : err.message
        })
    }
    

}

export async function loginUser(req, res) {
    const { email, password } = req.body

    const user =  await userModel.findOne({ email }) 

    if(!user){
        return res.status(400).json({
            message: "Invaild email or password",
            success: false,
            err : "user not found"
        })
    }

    const isPasswordMatched = await user.comparePassword(password)

    if(!isPasswordMatched){
        return res.status(400).json({
            message : "invaild email or password ",
            success : false,
            err : "invaild password"
        })
    }

    if(!user.verified){
        return res.status(400).json({
            message: "plase verify your email before loggin in",
            success : false,
            err : "email not verified"
        })
    }

    const token =  jwt.sign({
        id : user._id,
        username : user.username,
        email : user.email
    },process.env.JWT_SECRET,
    {expiresIn : "7d"}
)

    res.cookie("userToken", token)

    res.status(200).json({
        message : "user logined successfully ",
        success : true,
        user:{
            id : user._id,
            username : user.username,
            email : user.email
        }
    })
}

export async  function getMe(req, res){
    const userId = req.user.id

    const user  =  await userModel.findById(userId).select("-password");

    if(!user){
        return res.status(400).json({
            message: "user not found",
            success :false,
            err : "user not found"
        })
    }

    res.status(200).json({
        message: "user feteched successfully",
        success: true,
        user
    })
}