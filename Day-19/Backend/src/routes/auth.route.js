const express = require('express')
const { registerController, loginController, getMeController } = require('../controllers/authController')
const authRouter =express.Router()
const identifyUser = require("../middleware/auth.middleware")

/**
 * register : /post
 */
authRouter.post('/register',registerController)

/**
 * login : /post
 */
authRouter.post('/login',loginController)


/**
 * Get-me : POST /api/auth/Get-me
 */
authRouter.get("/getMe", identifyUser , getMeController)

module.exports = authRouter