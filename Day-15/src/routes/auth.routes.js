const express = require('express')
const authController = require("../controllers/auth.controller")

const authRouter = express.Router()

// POST : /api/auth/register   
authRouter.post('/register', authController.registerController)

/**
 * user can login by :
 * email & password
 *      or
 * username & password
 */
authRouter.post('/login', authController.loginController)

module.exports = authRouter