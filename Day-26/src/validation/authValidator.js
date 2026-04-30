import { body,validationResult } from "express-validator";


const vaildate = (req, res, next)=>{
        const errors = validationResult(req)

        if(errors.isEmpty()){
            return next()
        }

        res.status(400).json({
            errors :errors.array()
        })
    }


export const registerValidator =[
body("username").isString().withMessage("username should be String"),
    body("email").isEmail().withMessage("email must be vaild"),
    body("password").isLength({min : 6,max :12 }).withMessage("password should be 6 character"),
    vaildate
]