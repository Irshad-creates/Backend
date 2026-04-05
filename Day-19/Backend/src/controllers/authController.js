const userModel = require("../models/user.model")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')




async function registerController(req, res) {
    const { username, email, password, bio, profileImage } = req.body

    const isUserAlreadyExist = await userModel.findOne({
        $or :[ {username}, {email}]
    })

    if(isUserAlreadyExist){
        return res.status(409).json({
            message : "user already exist" + (isUserAlreadyExist.email == email? "email already exist" : "username already exist")
        })
    }

    const hash = await bcrypt.hash(password, 10)

    const user = await userModel.create({
        username,
        email, 
        password:hash,
        bio,
        profileImage
    })

    const safeUser = user.toObject()
    delete safeUser.password

    /**
     * sending response with jwt_token 
     */

    const token = jwt.sign({
        id: user._id,
        username :user.username
    },process.env.JWT_SECRET,
    { expiresIn : "1d"})

    res.cookie("token",token)

    res.status(201).json({
        message : "user registered succesfully",
        user: safeUser,
        token
    })
}

async function loginController(req, res){
    const { username, email, password } = req.body

    const user =await userModel.findOne({
        $or : [
            {username : username},
            {email : email}
        ]
    })

    if(!user){
        return res.status(409).json({
            message: "user not found , register first"
        })
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password)

    if(!isPasswordCorrect){
        return res.status(409).json({
            message : "password is incorrect"
        })
    }

    const token = jwt.sign (
        {id : user._id,username:user.username},
        process.env.JWT_SECRET,
        {expiresIn : "1d"}
    )

    const safeUser = user.toObject()
    delete safeUser.password

    res.cookie("token",token)

    res.status(200).json({
        message:"user logined succesfully",
        user: safeUser,
        token
    })

}

module.exports = {
    registerController,
    loginController
}
