const followModel = require("../models/follow.model");
const userModel = require("../models/user.model");

async function followUserController(req, res) {
  const followerUsername = req.user.username;
  const followeeUsername = req.params.username;

  if (!followeeUsername) {
    return res.status(400).json({
      message: "followee username is required",
    });
  }

  if (followerUsername === followeeUsername) {
    return res.status(400).json({
      message: "you cannot follow yourself",
    });
  }

  const followeeUser = await userModel.findOne({ username: followeeUsername });

  if (!followeeUser) {
    return res.status(404).json({
      message: "user to follow not found",
    });
  }

  const existingFollow = await followModel.findOne({
    follower: followerUsername,
    followee: followeeUsername,
  });

  if (existingFollow) {
    return res.status(409).json({
      message: `you are already following ${followeeUsername}`,
    });
  }

  const followRecord = await followModel.create({
    follower: followerUsername,
    followee: followeeUsername,
  });

  res.status(201).json({
    message: `you are following ${followeeUsername}`,
    follow: followRecord,
  });
}


async function unfollowUserController(req, res){
  const followerUsername = req.user.username
  const followeeUsername = req.params.username

  const isUserAlreadyfollowing = await followModel.findOne({
    follower: followerUsername,
    followee : followeeUsername
  })

  if(!isUserAlreadyfollowing){
    return res.status(200).json({
      message : `you are not following  ${followeeUsername}`
    })
  }

  await followModel.findByIdAndDelete(isUserAlreadyfollowing._id)

  res.status(200).json({
    message : `you unfollowed ${followeeUsername}`
  })

}

module.exports = {  
  followUserController,
  unfollowUserController
};
