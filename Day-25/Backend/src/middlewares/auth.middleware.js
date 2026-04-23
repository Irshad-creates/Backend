const blacklistModel = require("../models/blacklist.model");
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

async function authUser(req, res, next) {
  const token = req.cookies.userToken;

  if (!token) {
    return res.status(400).json({
      message: "token not found",
    });
  }

  const checkIfBlacllisted = await blacklistModel.findOne({
    token
  })

  if(checkIfBlacllisted){
    return res.status(400).json({
        message:"token is blacklisted"
    })
  }

  try {
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;
    next();

  } catch (error) {
    return res.status(400).json({
      message: "invaild token",
    });
  }
}


module.exports = {
    authUser
};
