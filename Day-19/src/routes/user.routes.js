const express = require("express");
const userContoller = require("../controllers/userController");
const identifyUser = require("../middleware/auth.middleware");
const userRouter = express.Router();

/**
 * api : POST /api/users/follow/:username
 * TO follow someone
 * access private and protected
 */
userRouter.post("/follow/:username", identifyUser, userContoller.followUserController);



module.exports = userRouter;
