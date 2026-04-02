const express =require('express')
const userContoller = require('../controllers/userController')
const identifyUser = require("../middleware/auth.middleware")
const userRouter = express.Router()

/**
 * api : POST /api/users/follow/:userid
 * TO follow someone
 * access private and protected
 */
userRouter.post("/follow/:userid", identifyUser ,userContoller.followUserController)



module.exports = userRouter