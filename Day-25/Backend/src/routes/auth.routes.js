const express = require("express")
const authController = require("../controllers/auth.controller")
const authMiddleware = require("../middlewares/auth.middleware")

/**
 * routes
 */
const router = express.Router()
router.post("/register",authController.registerUserController)
router.post("/login",authController.loginUserController)
router.get("/get-me",authMiddleware.authUser,authController.getMe)
router.get("/logout",authMiddleware.authUser,authController.logoutUser)


module.exports = router