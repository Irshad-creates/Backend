const  express = require('express')
const { registerController, loginController } = require('../controllers/authController')
const userModel = require('../models/user.model')
const { JsonWebTokenError } = require('jsonwebtoken')



const authRouter = express.Router()

//post : /api/auth/register
authRouter.post('/register',registerController)

/**
//post : /api/auth/register
 * user can login by
    username / email & password
 */
authRouter.post("/login",loginController)

module.exports = authRouter