const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")


async function registerUserController(req, res) {
    const {username , email, password} = req.body

    const isUserAlreadyExist =await userModel.findOne({
        $or:[
            {email},
            {username}
        ]
    })

    if (isUserAlreadyExist){
        return res.status(400).json({
            message : "user already exists"
        })
    }

    const hash = await bcrypt.hash(password ,10);

    const user = await userModel.create({
        username, 
        email,
        password:hash
    })

    const token = jwt.sign({
        id:user._id,
        username:user.username
    },process.env.JWT_SECRET,
    {expiresIn : "3d"})

    res.cookie("userToken",token)

    return res.status(201).json({
        message:"user register succesfully",
        user:{
            id: user._id,
            username:user.username,
            email :user.email
        }
    })
}

async function loginUserController(req, res){
    const {username,email, password} = req.body

    const user = await userModel.findOne({
        $or:[
            {email},
            {username}
        ]
    })

    if(!user){
        return res.status(400).json({
            message : "Invaild Credentials"
        })
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password)

    if(!isPasswordCorrect){
        return res.status(401).json({
            message:"Invaild Credentials"
        })
    }

    const token = jwt.sign({
        id:user._id,
        username: user.username
    },
    process.env.JWT_SECRET,
    {expiresIn:"3d"})

    res.cookie("userToken", token)

    return res.status(200).json({
        message: "user logged succesfully",
        user:{
            id:user._id,
            username:user.username,
            email:user.email
        }
    })
}



module.exports= {
    registerUserController,
    loginUserController
}