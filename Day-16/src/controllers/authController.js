const userModel = require('../models/user.model')
const bycrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


async function registerController (req, res) {
    const { username, email, password, bio, profileImage } = req.body

    const isUserAlreadyExist =await  userModel.findOne({
        $or: [
            { username },{ email }
        ]
    })

    if(isUserAlreadyExist){
        return res.status(409).json({
            message : "user already exists " + (isUserAlreadyExist.email == email ?"email already exist":"username already exist")
        })
    }

    const hash =await bycrypt.hash(password, 10)

    const user =  await userModel.create({
        username,
        email, 
        password:hash,
        bio,
        profileImage        
    })

    /**
     * user ko respond me jwt token denge 
     * 
     */

    const token = jwt.sign({
        id : user._id
    },process.env.JWT_SECRET,
    { expiresIn : "1d"})

    res.cookie("token",token)

    res.status(200).json({
        message : "user registered succesfully",
        user,
        token
    })
}

async function loginController(req, res){
    const { username, email, password } = req.body

    const user = await userModel.findOne({
        $or : [
            {username : username},
            {email : email}
        ]
    })

    if(!user){
        return res.status(409).json({
            message : "user not found, register first"
        })
    }

    

    const isPasswordCorrect = await bycrypt.compare(password, user.password)
    
    if(!isPasswordCorrect){
        return res.status(409).json({
            message : "invaild password"
        })
    }

    const token = jwt.sign(
        {id : user._id},
        process.env.JWT_SECRET,
        {expiresIn : "1d"}
    )
    res.cookie("token",token)

    res.status(200).json({
        message : "user logined succesfully",
        user,
        token
    })
}

module.exports = {
    registerController,
    loginController
}