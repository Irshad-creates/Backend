const userModel = require('../models/user.model')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')


/**
 * registration of user 
 */
async  function registerController (req, res){
    const { username, email, password, bio, profileImage } =req.body

    const isUserAlreadyExists = await userModel.findOne({
        $or: [
            { username },
            { email }
        ]
    })
    
    if(isUserAlreadyExists){
        res.status(409).json({
            message : "user already exists" + (isUserAlreadyExists.email  == 
                email ? "Email already exists" : "username already exists"
            ) 
        })
    }

    const hash = crypto.createHash("md5").update(password).digest("hex")

    const user = await userModel.create({
        username,
        email, 
        password:hash ,
        bio,
        profileImage 
    })
    /**
     * user ka data hona chaiye
     * aur data unique hona chaiye
     */
    const token = jwt.sign({
        id : user._id
    },process.env.JWT_SECRET,
    { expiresIn : "1d"})

    res.cookie("token",token)

    res.status(201).json({
        message : "user registered succesfully",
        user:{
            user : user.username , 
            email : user.email,
            profileImage : user.profileImage,
            Bio : user.bio
        }
    })
}


/**
 * login of user
 */

async function loginController (req, res){
    const { username, email, password } = req.body

    const user =await userModel.findOne({ 
        $or:[
            {
                username : username
            },
            {
                email : email
            }
        ]
    })
    if(!user){
        return res.status(409).json({
            message :"user not found "
        })
    }

    const hash = crypto.createHash("md5").update(password).digest("hex")


    const isPasswordCorrect = hash == user.password
    if(!isPasswordCorrect){
        return res.status(409).json({
            message : "the password is invaild, try again"
        })
    }

    const token = jwt.sign(
        {id: user._id},
        process.env.JWT_SECRET,
        {expiresIn : "1d"}
    )
    res.cookie("token",token)

    res.status(201).json({
        message :"user logined succesfuly",
        user :{
            username : user.username,
            email : user.email,
            bio: user.bio,
            profileImage : user.profileImage
        }
    })
}


module.exports = {
    registerController,
    loginController
}