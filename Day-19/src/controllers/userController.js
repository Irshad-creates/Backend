const followModel =require('../models/follow.model')


async function followUserController(req, res){

    const followerUsername  = req.user.username
    const followeeUsername = req.params.username

    const followRecord = await followModel.create({
        follower : followerUsername,
        followee : followerUsername
    })

    res.status(201).json({
        message : `you are following ${followeeUsername}`,
        follow : followRecord
    })

}

module.exports ={
    followUserController
}