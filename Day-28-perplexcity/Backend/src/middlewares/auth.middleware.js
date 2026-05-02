import jwt from 'jsonwebtoken'

export function authUser(req, res, next){
    const token =  req.cookies.userToken 

    if(!token){
        return  res.status(400).json({
            message:"unauthorized",
            success: false,
            err :"NO TOKEN FOUND "
        })
    }

    try {
        const decoded =  jwt.verify(token, process.env.JWT_SECRET)

        req.user = decoded

        next()


    } catch (error) {
        return res.status(400).json({
            message : "unauthorized",
            success: false,
            err :"NO TOKEN FOUND "
        })
    }
}